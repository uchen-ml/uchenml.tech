---
publishDate: 2024-06-20T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Open Source C++ Stack
excerpt: C++ is a beautiful and powerful language, but it does have its sharp edges. This article details open-source projects to reduce the number of cuts.
category: Engineering
image: ~/assets/images/absl.png
tags:
  - c++
  - uchen.ml
  - developement
metadata:
  canonical: https://uchenml.tech/cpp-stack/
---
## Overview

C++ is often labeled as "unsafe" and "complex," but I find these critiques
unjustified. My experience working on major projects like Chromium, Node,
and gRPC — each a non-trivial codebase deployed on millions of devices, both
virtual and physical, and subject to rigorous scrutiny—has shown me the true
power and reliability of C++. Let's not forget the remarkable engineering feats
made possible by C++, such as Unreal Engine. Even Linux and Git, both written
in C (arguably even less "safe" than C++), stand as testaments to the robust
potential of these languages.

There is a trick to writing C++ code in a scalable way. I would call it "write
C++ the Google way". Google has been using C++ for decades and has accumulated a
wealth of expertise in writing C++ code that is safe, performant,
and maintainable. And that expertise is readily available on GitHub.

In this article, I want to introduce you to some open-source projects that make
writing C++ code enjoyable. These projects are designed to work seamlessly
together, yet you can pick and choose the ones that best fit your needs.

## Google C++ Style Guide: Lingua Franca

[Explore the Guide on GitHub](https://google.github.io/styleguide/cppguide.html)

The Google C++ Style Guide explains how to make C++ code beautiful. This
comprehensive set of conventions ensures consistency across projects, making it
easier for developers to dive into new codebases with confidence.

The guide goes beyond mere stylistic choices like indentation width
([2 spaces](https://google.github.io/styleguide/cppguide.html#Spaces_vs._Tabs))
or file naming conventions ([all lowercase, with underscores (_) or dashes (-)](https://google.github.io/styleguide/cppguide.html#File_Names)).
It delves deep into language features and provides the rationale behind each
decision, offering a clear path to writing high-quality, maintainable C++ code.

Perhaps the most controversial convention in the guide is the "ban" on
exceptions. "[We do not use C++ exceptions](https://google.github.io/styleguide/cppguide.html#Exceptions)"
is a rule that can be hard to accept for developers coming from other languages.
Yet, exceptions are not as essential as they might seem.
Languages like Go thrive without them, and C++ projects like Chromium and gRPC
demonstrate that robust and efficient code can be written without exceptions.

I frequently recommend this guide to developers both inside and outside Google
as the simplest way to elevate the quality of their C++ code. By adhering to
these well-established conventions, anyone can write C++ "the Google way" and
enjoy the benefits of safer, more maintainable, and performant code.

## Bazel: If You Build It, They Will Come

[Discover Bazel](https://bazel.build/)

Bazel is a build system inspired by Google's internal build system. Thousands of
engineers at Google use Blaze daily to build countless projects, written not
only in C++ but also in Java, Python, Go, other languages.

Bazel highlights:
- **Starlark Language**: Bazel build files are written in Starlark, a language
that is both extensible and easy to read. This simplicity makes it approachable
for new users and powerful enough for complex build configurations.
- **Efficient Caching**: One of Bazel's standout features is its efficient
caching mechanism, which relies on checksums rather than timestamps. This
results in significantly faster and more reliable builds, a feature I rely on
daily for large C++ projects like gRPC.
- **Dependency Tracking**: Bazel excels in dependency tracking, minimizing the
size of build artifacts and speeding up the build process. This feature ensures
that only the necessary components are rebuilt, saving valuable time and resources.
- **Powerful Query Language**: Bazel includes a robust query language that
allows developers to analyze the build graph, providing deep insights into the
build process and helping to optimize it further.

Bazel makes it trivial to build Protobuf libraries, supports multiple
languages and most libraries I mention below are trivial to add to a Bazel
project, just look at Uchen.ML module file:

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
    remote =
      "https://github.com/hedronvision/bazel-compile-commands-extractor.git",
    commit = "a14ad3a64e7bf398ab48105aaa0348e032ac87f8",
)
```

## Abseil: Utilities

[abseil.io](https://abseil.io/)

Abseil provides a wide array of utilities across various categories. Some of
these utilities, such as `absl::string_view` and `absl::optional`, have already
been adopted into the standard C++ library, with Abseil seamlessly using
the standard versions when available. Other utilities, like my favorite
`absl::Cleanup`, seem to be on track to being standartize late (see
`std::scope_exit`). Many utilities in Abseil remain beyond the current scope
of the standard library, offering unique functionalities that enhance
C++ development.

I heavily rely on the following parts of Abseil for my projects:

- **[Command Line Flags](https://abseil.io/docs/cpp/guides/flags)**: Simplifies the management of command line arguments.
- **[Logging](https://abseil.io/docs/cpp/guides/logging)**: Provides robust logging capabilities.
- **[String Utilities](https://abseil.io/docs/cpp/guides/strings)**: Includes utilities for string joining, formatting, and more.

Many classes in UchenML are augmented with `AbslStringify` which allows for very
easy tracing and debugging.

I would also like to point out the [C++ Tips](https://abseil.io/tips/) section
that I would consider an essential reading for any C++ developer, on par with
the Google C++ Style Guide.

## Google Test: Industry Standard

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

Writing benchmarks can be a fun and enlightening process, though it's easy to
get caught up in the quest for better numbers. Despite this, benchmarks are
crucial for performance-conscious development. Modern CPUs and compilers are
highly complex, making performance reasoning anything but straightforward.

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

Disclamer: I am working on gRPC full-time so I am biased.

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
