---
publishDate: 2024-06-20T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Open Source C++ Stack
excerpt: C++ is a beautiful and powerful language, but it does have its sharp edges. This article details open-source projects that help writing great C++ code and have some fun along the way.
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

Frankly speaking, I can not recommend this to everyone. It is an amazing build
system, modelled after Google's internal system that proved it's success over
and over again. 

I have used it for ages, so I find it trivial to setup and my productivity is
destroyed if I do not have super-fast rebuild or
[ibazel](https://github.com/bazelbuild/bazel-watcher) in my command line.

Bazel build files are easy to read and author, it has also native support for
many languages and platforms. Its particular strength is its very fast and
very efficient caching. It can interactively rebuild and rerun tests even on
bigger C++ projects, like gRPC.

Bazel makes it trivial to build Protobuf libraries, works support multiple
languages and most libraries I mention below are trivial to add to a Bazel
project. I also have ready to go snippets that help me running sanitizelrs like
ASAN.

## Utility Library: Abseil

[abseil.io](https://abseil.io/)

A lot of changes introduced in C++11 have been originally developed as a part
of Boost library. I had my run-ins with Boost and I found it huge and a tad
unwieldy. I do enjoy Abseil.

Abseil provide a large number of utilities across multiple categories. Some 
utilities have already become a part of C++ library, like `std::string_view` or
`std::optional`. Some utilities may or may not eventually become a part of the
standard library (my favourite is `absl::Cleanup` that seems to be similar to
`std::scope_exit`). A large number of utilities are still out of scope for the
standard library.

I heavily rely on following parts of Abseil:
- [Command Line Flags](https://abseil.io/docs/cpp/guides/flags)
- [Logging](https://abseil.io/docs/cpp/guides/logging)
- [String Utilities](https://abseil.io/docs/cpp/guides/strings)

Many classes in UchenML are augmented with `AbslStringify` which allows for very
easy tracing and debugging.

I would also like to point out the [C++ Tips](https://abseil.io/tips/) section
that I would consider an essential reading for any C++ developer, on par with
the Google C++ Style Guide.

## Testing: Google Test

## Benchmarking: Google Benchmark

## Linters/Sanitizers

## Serialization: Protobuf

## RPC: gRPC

## Portable SIMD: Highway

## Fuzzing