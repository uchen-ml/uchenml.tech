---
publishDate: 2024-06-20T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Open Source C++ Stack
excerpt: C++ is a beautiful and powerful language, but it does have its sharp edges. This article details open-source projects that help writing and maintaining projects in this language.
category: Engineering
tags:
  - c++
  - uchen.ml
  - developement
metadata:
  canonical: https://uchenml.tech/cpp-stack/
---
## Overview

C++ often carries a reputation for being "unsafe" and "complex,"
a characterization that I find unjustified based on my extensive experience
with the language. Over the years, I worked on projects such as Chromium, Node,
and gRPC — each of which is not only successful but also ubiquitous and subject
to rigorous scrutiny. Additionally, I have explored other major C++ codebases
like Unreal Engine and various internal projects. I am amazed by the feats of
software engineering that C++ enables.

Many projects I have been involved with have a strong "Google DNA," either
originating from Google or receiving significant contributions from Google
engineers. Over years, Google accumulated a wealth of expertise in writing
C++ - and it is eager to share it with the world.

This article touches on some of the most important open-source projects that
I am using to build UchenML. There is definitely a learning curve with adopting
these tools and approaches, but I can not really imagine writing performant
and maintainable C++ code without them.

All these projects work great together. Still, you can pick and choose the ones
that fit your needs best.

## Google C++ Style Guide

[GitHub](https://google.github.io/styleguide/cppguide.html)

This is the very core of the "Google DNA" in C++ development. Thanks to projects
following the set of common conventions I feel comfortable when I need to dive
into something new.

This guide does not only cover the identation width 
([2 spaces](https://google.github.io/styleguide/cppguide.html#Spaces_vs._Tabs))
or how to name the files (
[Should be all lowercase and can include underscores (_) or dashes (-)](https://google.github.io/styleguide/cppguide.html#File_Names)) but also goes deep into the language
feature usage where it will provide a rationale for the choice.

I think the most controversial convention is the "ban" on exceptions.
"[We do not use C++ exceptions](https://google.github.io/styleguide/cppguide.html#Exceptions)".
This is something that is hard to accept coming from other languages. Still,
turns out, exceptions are not that essential. Some Google-influenced languages
(such as Go) do great without them and C++ codebases like Chromium or gRPC
prove C++ can be written without exceptions as well.

I consistently refer people inside or outside Google to this guide, as
an easiest way to boost the quality of their C++ code.

## Bazel

[bazel.build](https://bazel.build/)

This is a build system based on Google internal build system Blaze. It is a
proven solution that is capable of handling huge polyglot codebases. 

Bazel build files are written in Starlark language that is extensible, easy to
read and author. Its particular strength is its very fast and very efficient
caching that relies on checksums and not just the timestamps. I use it daily on
bigger C++ projects, like gRPC.

One thing the Bazel is missing is a powerful ecosystem. It is very easy to
bring a new library into a project that uses CMake or Makefile but figuring
out how to integrate a new library into Bazel can be a challenge.

Most libraries below are Bazel-compatible, where integrating them into a project
is only a matter of adding a few lines to the module file.

Here is Uchen.ML module file:
```python
'''
Uchen core - ML framework
'''
module(name = "uchen-core", version = "0.1", compatibility_level = 1)
bazel_dep(name = "abseil-cpp", version = "20240116.2")

bazel_dep(name = "googletest", version = "1.14.0")
git_override(
    module_name = "googletest",
    remote = "https://github.com/google/googletest.git",
    commit = "1d17ea141d2c11b8917d2c7d029f1c4e2b9769b2",
)

bazel_dep(name = "google_benchmark", version = "1.8.3")
git_override(
    module_name = "google_benchmark",
    remote = "https://github.com/google/benchmark.git",
    commit = "447752540c71f34d5d71046e08192db181e9b02b",
)

# Dev dependencies
bazel_dep(name = "hedron_compile_commands", dev_dependency = True)
git_override(
    module_name = "hedron_compile_commands",
    remote = "https://github.com/hedronvision/bazel-compile-commands-extractor.git",
    commit = "a14ad3a64e7bf398ab48105aaa0348e032ac87f8",
)
```

## Utility Library: Abseil

[abseil.io](https://abseil.io/)

A lot of changes introduced in C++11 have been originally developed as a part
of Boost library. I had my run-ins with Boost and I found it huge and a tad
unwieldy. Abseil, on the other hand is very modern and unobtrusive.

Abseil provide a large number of utilities across multiple categories. Some 
utilities have already become a part of C++ library, like `std::string_view` or
`std::optional` (Abseil will use the standard library version if available).
Some utilities may or may not eventually become a part of the standard library
(my favourite is `absl::Cleanup` that seems to be similar to
`std::scope_exit`). A large number of utilities are still out of scope for the
standard library.

I heavily rely on the following parts of Abseil:
- [Command Line Flags](https://abseil.io/docs/cpp/guides/flags)
- [Logging](https://abseil.io/docs/cpp/guides/logging)
- [String Utilities](https://abseil.io/docs/cpp/guides/strings) - like string join, format, and such.

Many classes in UchenML are augmented with `AbslStringify` which allows for very
easy tracing and debugging.

I would also like to point out the [C++ Tips](https://abseil.io/tips/) section
that I would consider an essential reading for any C++ developer, on par with
the Google C++ Style Guide.

## Testing: Google Test

[Google Test](https://google.github.io/googletest/)

My impression is that Google Test is the most popular C++ testing framework and
I often see it used in projects outside Google. Not really much to add.

I would definitely recommend to also take a look at GMock. GMock provides some
[matchers](https://google.github.io/googletest/reference/matchers.html) that can
also be used for regular assertions. E.g., this is how contents of
the collection can be checked ignoring the order:
```cpp
EXPECT_THAT(collection, ::testing::UnorderedElementsAre(1, 2, 3));
```

## Benchmarking: Google Benchmark

[GitHub](https://github.com/google/benchmark)

Makes writting benchmarks very addictive. I have to cleanup benchmarks all
the time. Benchmarks are essential when trying to be performance-conscious.
Modern CPUs and compilers are very complex and reasoning about performance
is not always straightforward. 

## Linters

Linters keep the code base consistent and help to catch a lot of issues and even
bugs way before the compiler is ran. [Clang-Tidy](https://clang.llvm.org/extra/clang-tidy/)
is the one I am relying on. [IWYU](https://include-what-you-use.org/) is really
helpful in keeping the includes clean, reducing number of dependencies and
reducing the build times.

## Sanitizers

Sanitizers detect and troubleshoot issues that are difficult to debug, such as
memory leaks, concurrency issues, and undefined behavior. [ASAN](https://clang.llvm.org/docs/AddressSanitizer.html)
is the one I am using the most. This is the contents of the `.bazelrc` set adds
a special Bazel config so ASAN can be ran at any time on any target by adding
`--config=asan` to the build command:
```bash
build:asan --strip=never
build:asan --copt=-fsanitize=address
build:asan --copt=-O0
build:asan --copt=-fno-omit-frame-pointer
build:asan --copt=-DGPR_NO_DIRECT_SYSCALLS
build:asan --copt=-DADDRESS_SANITIZER  # used by absl
build:asan --linkopt=-fsanitize=address
build:asan --action_env=ASAN_OPTIONS=detect_leaks=1:color=always
```

Other sanitizers worth mentioning are:
- [TSAN](https://clang.llvm.org/docs/ThreadSanitizer.html)
- [MSAN](https://clang.llvm.org/docs/MemorySanitizer.html)
- [UBSAN](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html)
- [Fuzzer](https://llvm.org/docs/LibFuzzer.html)

## Serialization: Protobuf

[protobuf.dev](https://protobuf.dev/)

This is a language-agnostic serialization library that is much faster than JSON
and provides way more compact representation. There are several implementations
with different features and trade offs. [μpb](https://github.com/protocolbuffers/protobuf/tree/main/upb)
is a very lightweight C++ implemantion that uses arena allocations.

Protobufs have a large number of features that are very useful in practice:
- Reflection API
- JSON serialization
- Text serialization (makes it very tempting to use protobufs as a configuration
  format)

## RPC: gRPC

[grpc.io](https://grpc.io/)

Disclamer: I am working on gRPC full-time so I may be biased.

gRPC is another open-source effort that was informed and inspired by Google
internal architecture. It is a proven solution (most Google Cloud APIs are
implemented in gRPC) and is used by projects like TensorFlow, Firebase and
many others (e.g. Bazel uses it for distributed build support).

This is what gRPC offers that is not readily available in REST:
- Strongly typed API with codegen support for most popular languages
- Streaming support, including bi-directional streaming
- Client and server side load balancing
- Authentication and authorization support
- A lot of configuration options for things like timeouts, retries, etc.
- Built-in support for tracing and monitoring


## Portable SIMD: Highway

[GitHub](https://github.com/google/highway)

One can not utilize the full power of modern CPUs without using SIMD
instructions. Highway library provides a portable way to use SIMD instructions
across different platforms, making leveraging SIMD much more practical.


