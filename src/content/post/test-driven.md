---
publishDate: 2024-04-25T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Case Study - TDD in Node.js Inspector Server and Other Projects
excerpt: Test Driven Development (TDD) is still seems to be controversial. This article explores the application of TDD in real world projects
category: Case Studies
tags:
  - case study
  - general
  - process
metadata:
  canonical: https://uchen-ml.tech/test-driven
---

## Overview

Test Driven Development (TDD) is a software development methodology where tests are written before the actual code. The progress of implementation is then guided by the status of these tests.

There is often confusion between the terms "automated testing," "unit testing," and "TDD." To clarify:

- **Automated Testing** refers to any testing performed by specialized software without requiring manual intervention. This includes various types of testing, depending on the scope (unit/integration) or the metrics being evaluated (correctness, security, load, benchmarking).

- **Unit Testing** is a subset of automated testing that focuses on the smallest, independent logical units of code. These tests can be created at any stage of development, whether before or after the code is written.

- **Test Driven Development (TDD)** is a practice where tests are designed and implemented before writing the actual code. While these tests are typically automated, they can also be manual in some cases. TDD can be applied at any level of granularity.

## Node.js Inspector Server

### Problem Statement

The goal was to transition Node.js to utilize a new V8 debugging API and expose a WebSocket endpoint compatible with the Chrome DevTools protocol. This required ensuring a smooth ecosystem transition and providing tools vendors with a clear migration path.

### Challenges

- The implementation needed to reside in the core Node.js binary, adhering to strict performance and security requirements.
- The low-level C++ code had to run on all platforms supported by Node.js.
- Rebuilding the Node.js binary is a time-consuming process that can significantly impact developer productivity.
- I was initially unfamiliar with `libuv` and the internals of Node.js.

### Approach

The initial focus was on creating a WebSocket server in C++ to run outside the V8 engine on a separate thread. This design ensured that the server would continue running even when V8 was paused at a breakpoint, and it also minimized the impact on profiling data of the user code.

To avoid a full rebuild of the Node.js binary during development, the server implementation was initially contained within the test code. As the codebase evolved, it was split into multiple source files and gradually integrated into the core Node.js code.

The current C++ test suite includes:

- [test_inspector_socket_server.cc](https://github.com/nodejs/node/blob/main/test/cctest/test_inspector_socket_server.cc): Tests the server, including socket listening, HTTP protocol support, and potential error states.
- [test_inspector_socket.cc](https://github.com/nodejs/node/blob/main/test/cctest/test_inspector_socket.cc): WebSocket protocol tests with a focus on edge cases and error handling.

One interesting aspect of `libuv` was that the tests were single-threaded, greatly simplifying the implementation of the test suite. This was a fun coding challenge and crucial for catching hard-to-reproduce bugs and regressions, especially those caused by differences in `libuv` behavior across platforms.

Once the server was stable and inspector integration began, tests were written in JavaScript using the WebSocket protocol. These tests were not strictly "unit tests," as V8 inspector already had significant testing coverage in the core V8, and duplicating it would have increased maintenance without adding much value.

Later, a JavaScript API was introduced by community demand, making it even easier to write tests in JavaScript, particularly to cover Node-specific protocol extensions such as [tracing](https://github.com/nodejs/node/blob/main/test/parallel/test-inspector-tracing-domain.js) or [workers](https://github.com/nodejs/node/blob/main/test/parallel/test-worker-debug.js).

### Highlights

The transition to the new protocol was completed ahead of schedule, allowing the legacy protocol to be deprecated and removed altogether. The integration underwent several deep reworks without disrupting the ecosystem, including the addition of support for worker threads. In all cases, new test cases were added to ensure stability.

A significant flakiness in Inspector tests prompted a deep refactor ([PR](https://github.com/nodejs/node/pull/21182)), improving the performance and stability of the entire DevTools protocol.

At least one [test case](https://github.com/nodejs/node/pull/25455) was added to justify keeping code in the native C++ part after contributors proposed moving it to JavaScript.

The community identified several potential security vulnerabilities, leading to the addition of tests to prevent regressions.

## Partner API Endpoint

### Problem Statement

The task was to implement a REST API endpoint according to the specifications provided by a partner company. Their software would query this endpoint to obtain information from our systems, streamlining the customer experience.

### Challenges

- The specification required a large amount of the data points, raising concerns about whether we had all the required information or if it was in the expected format.
- There were uncertainties about whether the requested access complied with our security and privacy policies.
- The necessary information had to be sourced from multiple internal systems, and it was unclear how readily available this data was.

### Approach

The service code implementing the API was divided into multiple layers and engineered into several components:

- **Response Packaging**: A component to format the response according to the partner’s specifications.
- **Data Aggregation and Sanitization**: An internal component to aggregate data and ensure it was sanitized (e.g., converting internal codes to the partner’s specifications, normalizing addresses).
- **Data Source Connectors**: Independent components to connect to each internal data source.
- **Request Processing and Validation**: A separate component to handle request validation and processing.

The first test involved directly calling the endpoint implementation with a mock request and checking the response. The initial implementation returned a hardcoded response, which was then gradually enhanced with more logic. E.g. a code that returns a hardcoded customer address would be replaced with a component that retrieved the address from the customer service. Unit tests were created for each component, focusing on mocking dependencies to verify logic, validation, and error propagation. For example, unit tests for the customer service connector mocked the network layer to directly check requests sent to the customer service, and mock responses were used to validate the connector’s logic, both in a happy path and in error scenarios.

### Highlights

- The project codebase was split into clear maintainable components, enabling parallel development, including discussions with the teams responsible for each data source.
- Significant discussions with stakeholders (e.g., service developers, data owners, security, and privacy teams) were necessary, and we were able to start these discussions sooner which reduce the risk of delays.
- Testing provided with plenty of examples that were really useful in communications. For example, when discussing the data format with the partner, we could provide examples of the data we were sending, which helped clarify the requirements.

The project was delivered on time and promptly accepted by the partner.

## UchenML

### Problem Statement

This project began as an attempt to build deep learning models that could be easily
deployed in specific scenarios. It was developed alongside learning the theory 
of deep neural network training. Both the external API and internal implementation 
were in constant flux, with significant rewrites anticipated.

### Approach

Each component started as a test case. For example, each gradient calculator began in the test class, with all numbers verified against values returned by the PyTorch implementation. As the framework matured, the underlying math of the stacked components grew increasingly complex, making the tests essential for detecting subtle issues. Extensive rework often required benchmarks to justify code changes. Writing test cases helped refine the framework's API.

### Highlights

The project continues to evolve, despite extended breaks in development. Test cases have been invaluable for catching new issues early, including identifying when new APIs are too cumbersome for unconsidered use cases.

## Conclusion

I consider TDD the essential practice for delivering maintainable software. The test
cases may serve as a way to track the implementation progress, help onboard new team
members, and provide a safety net for future changes.

### My TDD Best Practices

- Avoid duplicate test cases. Cleanup aggressively. Too many unnecessary tests can be a huge maintenance burden.
- Test behaviors not the implementation. Use higher level APIs and data that mimics the real-world usage.
- Use a tool that reruns the tests in the IDE on file save. E.g. `jest --watch` or `ibazel`
- Do not add `TODO` comments in the code. Add disabled or failing tests instead.
