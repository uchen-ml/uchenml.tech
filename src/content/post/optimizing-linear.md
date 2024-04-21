---
publishDate: 2024-04-20T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Case Study - Optimizing Linear Layer
excerpt: This case study details the process of optimizing linear layer performance without breaking the core Uchen ML requirements.
category: Case Studies
tags:
  - c++
  - uchen ml
  - optimization
metadata:
  canonical: https://uchen-ml.tech/get-started-website-with-astro-tailwind-css
---

## Overview

As Uchen.ml is heading towards the public announcement and first demos, some low-hanging fruit needs to be picked in terms of optimizations. The most often used piece of any ML library is the linear layer as it is the most basic building block for any neural net. This post details the process of optimizing the code.

## Requirements

Uchen is designed for implementing ML solutions that can be easily
integrated into existing systems, with specific goals on Web Assembly, embedded and video games.

To maintain velocity and to avoid overcomplicating build and validation process, following constraints are in place:

- Only the C++20 standard library is used. ABSL dependency is there (logging, asserts and some utilities) but it is under consideration if its inclusion will remain mandatory.
- No compiler-specific optimizations, including pragmas, conditional compilations or intrinsics.
- No CPU architecture-specific optimizations. Particularly, no optimizations for one architecture that may be detrimental for others. Apple M2 and Intel Core CPUs are used to inform and direct the optimization efforts.
- Uchen is and will remain a CPU-only ML framework. There are no plans at this point to implement GPU or other acceleration support.

This constraints will be lifted as the deployment targets and actual requirements are better understood.

## Benchmark code

The benchmark runs inference through the linear layers of different configurations. Inputs are initialized to 0, parameters are initialized to random values outside the benchmark loop. Range of parameter values is between -1 and 1. Output values are not checked. float datatype is used for inputs and outputs

```c++
template <size_t Is, size_t Os, typename D = float>
static void BM_Linear(benchmark::State& state) {
  // Linear layer with Is inputs and Os outputs
  uchen::Linear<uchen::Vector<D, Is>, Os> layer;
  // zero-initialized input vector. This operation is O(n) to the number
  // of the inputs and may have a negligible impact on benchmark.
  uchen::Vector<D, Is> input;
  // Parameters are using the store filled with random values outside the loop.
  // This operation is O(1) to the number of parameters and has no impact
  // on benchmark.
  uchen::parameters_t<decltype(layer)> parameters(params->store());
  for (auto _ : state) {
    benchmark::DoNotOptimize(layer(input, parameters));
  }
}
```

## Hardware

Regular PCs are used. Note that the numbers can not be compared across
the architectures and this paper is only concerned with the relative gains
and not the absolute values.

```
Apple M2 Pro
  10 Cores
  L1 Data 64 KiB
  L1 Instruction 128 KiB
  L2 Unified 4096 KiB (x10)
```

```
Intel(R) Core(TM) i7-10700KF CPU @ 3.80GHz   3.79 GHz
  L1 Data 32 KiB (x8)
  L1 Instruction 32 KiB (x8)
  L2 Unified 256 KiB (x8)
  L3 Unified 16384 KiB (x1)
```

## Naive version

Linear layer runs the following operation to produce the output:
<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>y</mi><mi>j</mi></msub><mo>=</mo><msub><mi>b</mi><mi>j</mi></msub><mo>+</mo><mrow><munderover><mo movablelimits="false">&#x2211;</mo><mrow><mi>i</mi><mo> = 0</mo></mrow><mi>n</mi></munderover></mrow><msub><mi>w</mi><mrow><mi>j</mi><mi>i</mi></mrow></msub><msub><mi>x</mi><mi>i</mi></msub></mrow></math>

Which translated into the following C++ code:

```c++
  output_t operator()(const input_t& inputs,
                      const Parameters<parameter_count>& parameters) const {
    output_t outputs;
    constexpr size_t Is = input_t::elements;
    for (size_t output = 0; output < Outputs; ++output) {
      outputs[output] = parameters[output * (Is + 1) + Is];
      for (size_t input = 0; input < Is; ++input) {
        outputs[output] +=
            inputs[input] * parameters[output * (Is + 1) + input];
      }
    }
    return outputs;
  }
```

Given _n_ inputs and _m_ outputs, parameters layout is:
Parameters are a flat array in the following format (n is a number of inputs, m is the number of outputs):
<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>
<mo form="prefix" stretchy="false">{</mo>
<msub><mi>w</mi><mrow><mn>00</mn></mrow></msub>
<mo separator="true">, ... ,</mo><msub><mi>w</mi><mrow><mn>0</mn><mi>n</mi></mrow></msub><mo separator="true">,</mo><msub><mi>b</mi><mn>0</mn></msub><mo separator="true">,</mo><msub><mi>w</mi><mrow><mn>1</mn><mn>0</mn></mrow></msub><mo separator="true">, ... ,</mo><msub><mi>w</mi><mrow><mi>m</mi><mi>n</mi></mrow></msub><mo separator="true">,</mo><msub><mi>b</mi><mi>m</mi></msub><mo form="postfix" stretchy="false">}</mo></mrow></math>

### Benchmark Results:

| <inputs, outputs> | Parameter Count | i7-10700KF | Apple M2 Pro |
| :--------: | :--------: | :--------: | :----------: |
| <100, 200> |   20,200   | 13,645 ns  |   6882 ns    |
| <2500, 8>  |   20,008   | 17,086 ns  |  16,307 ns   |
| <8, 2500>  |   22,500   |  5032 ns   |   2177 ns    |

Note that the number of operations (memory reads, stores and arithmetic) is directly correlated to the number of parameters so all the models were set up to have roughly the same number of them.

Intel architecture shows approximately 3.4x spread between the best case scenario (number outputs drastically exceeds number of inputs) and worst case scenario (number of inputs is much greater then the number of outputs). Apple ARM implementation showed 7.5x spread.

# Transposed iteration order

The first optimization is to change the iteration order. Instead of iterating over the outputs and then over the inputs, we iterate over the inputs and then over the outputs. This change allows for better cache utilization and reduces the number of cache misses.

```c++
  output_t operator()(
      const input_t& inputs,
      const Parameters<(Input::elements + 1) * Outputs>& parameters) const {
    auto it = parameters.begin();
    output_t outputs;
    for (size_t i = 0; i < outputs.size(); i++) {
      outputs[i] = *it++;
    }
    for (auto input : inputs) {
      for (auto& output : outputs) {
        output += (*it++) * input;
      }
    }
    return outputs;
  }
```

Note that the code uses a linear iteration over the parameters, making the memory
access pattern more predictable and cache-friendly.

Parameters layout is as follows (n is a number of inputs, m is the number of outputs):
<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>
<mo form="prefix" stretchy="false">{</mo>
<msub><mi>b</mi><mn>0</mn></msub><mo separator="true">, ... ,</mo><msub><mi>b</mi><mn>m</mn></msub>
<mo separator="true">,</mo><msub><mi>w</mi><mrow><mn>0</mn><mn>0</mn></mrow></msub><mo separator="true">, ... ,</mo><msub><mi>w</mi><mrow><mn>0</mn><mi>n</mi></mrow></msub><mo separator="true">,</mo><msub><mi>w</mi><mrow><mn>1</mn><mn>0</mn></mrow></msub><mo separator="true">, ... ,</mo><msub><mi>w</mi><mrow><mi>m</mi><mn>0</mn></mrow></msub><mo form="postfix" stretchy="false">}</mo></mrow></math>

### Benchmark Results:

| <inputs, outputs> | i7-10700KF | Apple M2 Pro |
| :--------: | :--------: | :--------: |
| 100, 200 | 1880 ns | 1326 ns |
| 2500, 8 | 5611ns | 11,124 ns |
| 8, 2500 | 2015 ns | 1354 ns |

Number of inputs has a significant negative impact on the performance as it
adds an extra memory load.

## Compile for the specific CPU

By default, the compiler generates the code that works on most CPUs. This
precludes usage of some newer instructions that have a significant impact
on the performance. To test this, I pass `-march=native` to the compiler which
makes it target my current CPU. I am using Bazel, so the invocation looked like
this (`-g` is for including debugging symbols as I use `gdb` to look at
the assembly code):

```bash
bazel run -c opt --cxxopt="-g" --cxxopt="-march=native" //benchmark:linear
```

### Benchmark Results (Intel only):

| <inputs, outputs> | i7-10700KF |
| :--------: | :--------: |
|100, 200 | 1203 ns|
|2500, 8 |  4871 ns|
|8, 2500 |  1080 ns|

This "optimization" shows pretty solid across the board. Ultimately, it will be
up to embedders to decide the CPU target to compile for.

## A bigger layer

With the numbers in single digit microseconds, it seems reasonable to increase
the size of the linear layer to see what impact it has on the performance.

### Benchmark Results (Intel only):

| <inputs, outputs> | i7-10700KF |
| :--------: | :--------: |
| 100, 200 | 1180 ns |
| 2500, 8 | 5056 ns |
| 8, 2500 | 1148 ns |
| 4000, 2000 | 1496652 ns |
| 1000000, 8 | 2986400 ns |
| 8, 1000000 | 2185253 ns |

The worst case is "only" 2x slower than the best case.

## Using SIMD intrinsics directly

As mentioned above, SIMD intrinsics are not considered (i.e. Web Assembly still
has no support for them). However, it is still interesting to see what
the performance gains could be if we tried them. I did not use AVX as data
alignment is not supported yet, though this will change soon.

```c++
  output_t operator()(
      const input_t& inputs,
      const Parameters<(Input::elements + 1) * Outputs>& parameters) const {
    auto it = parameters.begin();
    output_t outputs;
    for (size_t i = 0; i < outputs.size(); i++) {
      outputs[i] = (*it++);
    }
    for (size_t i = 0; i < Input::elements; i += 4) {
      __m128 input = _mm_loadu_ps(&(*inputs.begin()) + i);
      for (size_t j = 0; j < Outputs; ++j) {
        // Parameters are accessed in the wrong order - this is a bug!
        // This code is for benchmark only.
        __m128 parameters = _mm_load_ps(&(*it));
        __m128 product = _mm_dp_ps(input, parameters, 0xf1);
        it += 4;
        outputs[j] += _mm_cvtss_f32(product);
      }
    }
    return outputs;
  }
};
```

### Benchmark Results (Intel only):

| <inputs, outputs> | i7-10700KF |
| :--------: | :--------: |
|100, 200 |5765 ns |
|2500, 8 |5955 ns |
|8, 2500 |5761 ns |
|4000, 2000 |2783286 ns |
|1000000, 8 |2964343 ns |
|8, 1000000 |3214760 ns |

"Good" cases worsened, which shows that the updated code is ran. Shape of
the data is known at compile time when using Uchen so the compilers make
informed decisions about vectorization and other optimizations and it looks
like competing with them is an unnecessary exercise.

Manually unrolling the loop yields similar results:

```c++
  output_t operator()(
      const input_t& inputs,
      const Parameters<(Input::elements + 1) * Outputs>& parameters) const {
    auto it = parameters.begin();
    output_t outputs;
    for (size_t i = 0; i < outputs.size(); i++) {
      outputs[i] = (*it++);
    }
    for (auto input : inputs) {
      for (size_t i = 0; i < Outputs; i++) {
        outputs[i++] += (*it++) * input;
        outputs[i++] += (*it++) * input;
        outputs[i++] += (*it++) * input;
        outputs[i] += (*it++) * input;
      }
    }
    return outputs;
  }
```
| <inputs, outputs> | i7-10700KF |
| :--------: | :--------: |
| 100, 200 | 6523 ns |
| 2500, 8 | 5088 ns |
| 8, 2500 | 6763 ns |
| 4000, 2000 | 3226969 ns |
| 1000000, 8 | 2918274 ns |
| 8, 1000000 | 3734533 ns |

## Conclusion

At this point it looks like the performance on this granularity is pretty close
to the practical limit for _a single core_. Next article will detail
multi-threading and the memory alignment (particularly, dealing with the number
of parameters not divisible by 8).

The backpropagation optimizations and Uchen's approach to the memory management
will also be detailed in the future articles.