---
# Before optimizations:

----------------------------------------------------------------
Benchmark                      Time             CPU   Iterations
----------------------------------------------------------------
BM_Linear<100, 200>         1158 ns         1158 ns       598002
BM_Linear<2500, 8>          4962 ns         4962 ns       143316
BM_Linear<8, 2500>          1125 ns         1125 ns       620967
BM_Linear<4000, 2000>    1465987 ns      1465992 ns          477
BM_Linear<1000000, 8>    2916103 ns      2916114 ns          236
BM_Linear<8, 1000000>    2153195 ns      2153167 ns          325

After adding `__restrict` to the function parameters:

```c++
template <size_t Is>
  void Mul(const typename input_t::value_type* __restrict inputs,
           const float* __restrict p,
           typename input_t::value_type* __restrict outputs) const {
    for (size_t i = 0; i < Outputs; ++i) {
      outputs[i] = (*p++);
    }
    for (size_t i = 0; i < Is; ++i) {
      for (size_t j = 0; j < Outputs; ++j) {
        outputs[j] += (*p++) * inputs[i];
      }
    }
  }
```
----------------------------------------------------------------
Benchmark                      Time             CPU   Iterations
----------------------------------------------------------------
BM_Linear<100, 200>         1133 ns         1133 ns       560462
BM_Linear<2500, 8>          2142 ns         2142 ns       316415
BM_Linear<8, 2500>          1128 ns         1128 ns       625292
BM_Linear<4000, 2000>    1331811 ns      1331816 ns          480
BM_Linear<1000000, 8>    1482492 ns      1482496 ns          522
BM_Linear<8, 1000000>    2424402 ns      2424311 ns          271