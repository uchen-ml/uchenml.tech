---
publishDate: 2024-08-01T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: The C++ Memory Tour
excerpt: In this beginner-friendly article we take a look how memory works in C++. Assembly or C++ knowledge is not required.
category: Engineering
tags:
  - c++
  - uchen.ml
  - developement
metadata:
  canonical: https://uchenml.tech/cpp-memory/
---
## Overview
It looks like C++ memory management often terrifies people coming from other languages. The goal of this article
is to demonstrate what actually happens under the hood. I will also try to explain how this matches
with what other languages do.

This is meant like an easy to follow guide and is in no way an in-depth dive. It focuses more on the "memory model"
(e.g. how the memory behaves from a software developer point of view) and not on details like cache lines or page tables.
Mostly, the goal is not to say "it depends" too often. 

I feel like this article should be helpful in understanding better how to write performant code, but it is not an
optimization guide.

I will use [Compiler Explorer](https://godbolt.org/) to show the assembly code. This article does not expect assembly
knowledge and will summarize what happens in the code samples.

## Start simple

Let's plug this snippet in the compiler explorer:

```cpp
int add() {
  int a = 1;
  int b = 2;
  return a + b;
}
```
Disassembly output:
```asm
add(int, int):
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-4], edi
        mov     DWORD PTR [rbp-8], esi
        mov     edx, DWORD PTR [rbp-4]
        mov     eax, DWORD PTR [rbp-8]
        add     eax, edx
        pop     rbp
        ret
```
Looks so much longer and so much complex. The trick is that those are smallest 