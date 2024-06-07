---
publishDate: 2024-04-25T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Case Study - Test Driven Development
excerpt: Test Driven Development (TDD) continues to ignite debates within the developer community. In this article, I share my experiences and insights gained from implementing TDD in various projects.
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

Implement a REST API endpoint according to the specification provided by a partner company. Partner software will query the endpoint to obtain an information from our systems to streamline customer experience.

### Challenges

- Specification had a significant amount of details and it was not clear if we had all the information our partner expected or in the same format.
- It was not clear if the kind of access was always in line with our security and privacy policies.
- It was clear that the information had to come from multiple sources inside of our company and it was difficult to estimate how readily the data was available.

### Approach

The service code that was implementing the API was split into multiple layer and
engineered in several components. There was a component that was packaging
a response according to the customer specification, internal component that was
aggregating and sanitizing the data (e.g. converting the codes between internal
conventions and the partner specifications, normalizing addresses, etc).
Connectors to each internal datasource were also factored into independent
components. Request processing and validation was also a separate component.

The first test implemented was directly calling the endpoint implementation with
a mock request and checking the response. The implementation began with
returning a hardcoded response and then gradually adding more and more logic.
E.g. hardcoded customer address would be extracted into a component that talks
to the customer service and then separate unit level tests would be written for
that component. Unit level tests were focused on a single component and were
mocking all the dependencies. E.g. unit tests for the customer service connector
would mock the network layer and directly check the requests sent to
the customer service. Mock responses would be fed into the connector to verify
the logic, including validation and error propagation.

### Highlights

- Project was broken up into multiple independent components that could be developed independently.
- Most components required a significant amount of discussions with stakeholders (e.g. developers of the services, data owners, security and privacy teams) and being able to carry said discussions in parallel significantly sped up the project.
- Tests naturally forced component boundaries and helped to identify the interfaces between the components.

### Outcome

The project was delivered on time and no was promptly accepted by the partner.

## Uchen

## Conclusion

Improves code design, easier to refactor, better test coverage.

### Practices

- Cleanup aggressively, avoid duplication
- Do not predict the code
- Auto rerun
- Disabled test cases serve as TODOs
