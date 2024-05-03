---
publishDate: 2024-04-25T00:00:00Z
author: Eugene Ostroukhov
authorLink: https://www.linkedin.com/in/eostroukhov/
title: Case Study - Test Driven Development
excerpt: Test Driven Development (TDD) still seems to spark debates in developer community. This article details my experience and learnings from applying it in past projects.
category: Case Studies
tags:
  - case study
  - general
  - process
metadata:
  canonical: https://uchen-ml.tech/test-driven
---

## Overview

Test Driven Development (TDD) is a software development process where tests are
implemented before the actual code. Implementation progress is then informed by
the test status.

### TDD vs Automated Testing vs Unit Testing

There seems to be some confusion between "automated testing", "unit testing" and
"TDD". I'd like to clarify the terminology this way:

- **Automated Testing** is a general term for any testing that is performed by running a special software and does not require operator involvement. There are many different type of automated testing, depending on the scope of testing (unit/integration) or the metrics (correctness/security/load/benchmarking).

- **Unit Testing** is a type of (usually) automated testing that focuses on smallest independent logical units of the code. Tests can be written at any time, before or after the code.

- **Test Driven Development** is a practice of designing and implementing tests before the code is written. Tests are usually automated though in some
cases they can be manual as well. Tests can be on any granularity level.

### Practices

- Cleanup aggressively, avoid duplication
- Auto rerun
- Disabled test cases serve as TODOs

## Partner API Endpoint

### Problem Statement

Implement a REST API endpoint according to the specification provided by a partner company. Partner software will query the endpoint to obtain an information from our systems to streamline customer experience.

### Challenges

- Specification had a significant amount of details and it was not clear if we had all the information our partner expected or in the same format.
- It was not clear if the kind of access was always in line with our security and privacy policies.
- It was clear that the information had to come from multiple sources inside of our company and it was difficult to estimate how readily the data was available.

### Approach

The service code that was implementing the API was split into multiple layer and engineered in several components. There was a component that was packaging a respond according to the customer specification, internal component that was aggregating and sanitizing the data (e.g. converting the codes between internal conventions and the partner specifications, normalizing addresses, etc). Connector to each internal datasource was factored into separate components as well.

Each component had its own unit testing suite. 

## Node.Js Inspector Server

## Uchen

## Unsuccessful: UI Development

## Conclusion

Improves code design, easier to refactor, better test coverage.

