---
publishDate: 2024-11-30T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Avoid std::vector::reserve
excerpt: std::vector::reserve usually seems like a sensible optimization. It usually is not...
category: Engineering
image: ~/assets/images/reserve-benchmark.png
tags:
  - c++
  - uchen.ml
  - optimization
metadata:
  canonical: https://uchenml.tech/no-reserve/
---
## Overview

The `reserve` method of `std::vector` might seem like a no-brainer optimization.
It is supposed to preallocate memory for the vector so that it doesn’t have
to reallocate memory as new elements are added. This should make it faster,
right? Well, not quite. In this post, I’ll explain why you should avoid
using `reserve` in most cases. I’ll also discuss specific scenarios
where `reserve` is commonly used and why it might not be a good idea.

I’ve included the benchmark code on Godbolt, so you can check it out yourself.
Unfortunately, it fails to run there (likely due to memory usage), but you can
copy the code and run it locally. [Godbolt link](https://t.co/DZAj9SnYZS).

## 1. Vector length is known at compile time

`std::vector` is a dynamic array, designed for cases where the array size is
unknown at compile time. If the size is known at compile time, you should use
`std::array`. Unlike `std::vector`, `std::array` stores its elements inline,
avoiding allocations altogether.

```cpp
struct ChairWithFourLegs {
    std::array<Leg, 4> legs;
};
```

## 2. Vector length is known at a runtime but not at the compile time

Often, the number of elements is known when the vector is created. A common
pattern is to create an empty vector and immediately call `reserve`
to preallocate memory. This requires adding elements using `push_back` or
`emplace_back`. However, even though we know there’s sufficient memory, each 
addition will still perform the checks.

In such cases, a better approach is to create a vector with default-initialized
elements and assign values using the subscript operator:

```cpp
template <size_t Count>
void BM_CreateWithReserve(benchmark::State& state) {
  for (auto _ : state) {
    std::vector<int> a;
    a.reserve(Count);
    for (size_t i = 0; i < Count; ++i) {
      a.emplace_back(i);
    }
    benchmark::DoNotOptimize(a[20]);
  }
}

template <size_t Count>
void BM_CreateWithSize(benchmark::State& state) {
  for (auto _ : state) {
    std::vector<int> a(Count);
    for (size_t i = 0; i < Count; ++i) {
      a[i] = i;
    }
    benchmark::DoNotOptimize(a[20]);
  }
}
```

On my machine, `reserve` is 30–50% slower:

|Benchmark | Time | CPU | Iterations|
|-|-|-|-|
| BM_CreateWithReserve<100> | 41.9 ns | 46.1 ns | 15160914 |
| BM_CreateWithReserve<10000> | 2530 ns | 2782 ns | 255213 |
| BM_CreateWithReserve<1000000> | 394688 ns | 434023 ns | 1619 |
| BM_CreateWithSize<100> | 30.3 ns | 32.3 ns | 21564511 |
| BM_CreateWithSize<10000> | 1812 ns | 1936 ns | 359189 |
| BM_CreateWithSize<1000000> | 190924 ns | 205347 ns | 3433 |

## 3. Adding elements to existing vector

Another common use case is adding multiple elements to an existing vector. For
instance, when receiving data in batches on a server, you may want to append
the data to a vector. The intuitive solution might be to `reserve` memory for
the elements before appending them.

However, this is surprisingly slower than appending elements without
reserving memory. By default, vectors allocate extra memory as elements are
added, reducing the need for frequent reallocations. This gives vector
operations an amortized complexity of O(1). When you call `reserve`,
the complexity becomes O(n), even though it saves a small amount of memory.

```cpp
template <size_t BatchSize>
void BM_Add1MBatchNoReserve(benchmark::State& state) {
  for (auto _ : state) {
    std::vector<int> a;
    for (size_t i = 0; i < 1'000'000; i += BatchSize) {
      for (size_t j = 0; j < BatchSize; ++j) {
        a.emplace_back(i + j);
      }
    }
    benchmark::DoNotOptimize(a[20]);
  }
}

template <size_t BatchSize>
void BM_Add1MBatchReserve(benchmark::State& state) {
  for (auto _ : state) {
    std::vector<int> a;
    for (size_t i = 0; i < 1'000'000; i += BatchSize) {
      a.reserve(i + BatchSize);
      for (size_t j = 0; j < BatchSize; ++j) {
        a.emplace_back(i + j);
      }
    }
    benchmark::DoNotOptimize(a[20]);
  }
}
```

The negative impact of `reserve` is especially noticeable with smaller batch sizes:

|Benchmark | Time | CPU | Iterations|
|-|-|-|-|
| BM_Add1MBatchReserve<100> | 590754271 ns | 649627700 ns | 1 |
| BM_Add1MBatchReserve<1000> | 64903617 ns | 71371330 ns | 10 |
| BM_Add1MBatchReserve<100000> | 2114290 ns | 2324970 ns | 286 |
| BM_Add1MBatchNoReserve<100> | 1514745 ns | 1665702 ns | 404 |
| BM_Add1MBatchNoReserve<1000> | 1446501 ns | 1590648 ns | 436 |
| BM_Add1MBatchNoReserve<100000> | 1450612 ns | 1594837 ns | 440 |

## Conclusion

The simple advice: don’t use `reserve`. The nuanced advice: measure performance
for your specific use case, then decide.
