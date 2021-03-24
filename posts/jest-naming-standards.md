---
title: Jest Testing Standards
description: My opinions of standards teams should adopt when using Jest.
date: 2020-03-24
tags:
  - programming
layout: layouts/post.njk
---

It feels like coding standard opinions are never popular. However, good standards are a [force multiplier](https://ardalis.com/becoming-a-developer-team-force-multiplier/) for development teams. There is a great deal of great information online on how unit tests should be written. Unsurprisingly these have informed my own opinions on the topic. So, I'll share my opinions on standards as it relates to Jest.

Jest really is the, "delightful JavaScript Testing Framework with a focus on simplicity", its creators have described it to be! As a result, teams should leverage as many of the defaults as possible and only divert when necessary.

# File Names and Locations

It is important to be consistent with how test fixtures are named and where they are located. This helps developers quickly locate the code they are trying to use.

I recommend all test fixtures be located in a `__tests__` directory adjecent to their corresponding implemenation file. Additionally, all test fixtures should be named with `.test.` preceeding the file extension. The file extension should match the file extention used by the related file.

**Good Example**

```
- App
  - /__tests__
    - App.test.jsx
  - App.jsx
  - /components
    - /__tests__
      - component1.test.js
      - component2.test.ts
    - component1.js
    - component2.ts
```

# Naming Conventions within Test Fixtures

Good, consistent, standards within a test fixture are also force multipliers. They help developers read, write, and debug tests more quickly.

[Roy Osherove](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html) provides fantastic insights into using the following naming convention for all unit test: `UnitOfWork_StateUnderTest_ExpectedBehavior`. This convention works very well for C# and NUnit, and related languges and testing frameworks. One downside to this convention is that descriptive test names can becoming very long, often times difficult to read.

Luckly, Jest's `describe` and `it` functions allow us to use Roy's concept, but place each portion of the nameing convention on its own line. The result is test blocks which are very easy to read and reason about! I recommend all unit tests use the following standard. While there is some level of nesting, the code is very easy to reason about and provides excellent reports from Jest when test cases fail.

**Example**

```javascript
// should match the name of the file, minus .test.ext
describe("testFixture", () => {
  // most often this will be the name of the function being tested
  describe("unitOfWork", () => {
    // Describes the state of the input values.
    // Each valid test case for unit of work should have its own
    // corresponding pair of `describe` and `it` methods.
    describe("stateUnderTest", () => {
      // describes the expected result
      it("expectedResult", () => {
        // Test Code here
      });
    });
  });
});
```

## Simple Real World Example

Consider the following very simple real world example...

**util.js**

```javascript
export function add(number1, number2) {
  returns number1 + number2;
}

export function add(number1, number2) {
  returns number1 + number2;
}
```

**util.test.js**

```javascript
describe("util", () => {
  describe("add", () => {
    describe("given 1 and 2", () => {
      it("returns 3", () => {
        // Test Code here
      });
    });
    describe("given 1 and 2", () => {
      it("returns 3", () => {
        // Test Code here
      });
    });
  });

  describe("subtract", () => {
    describe("given 3 and 1", () => {
      it("returns 2", () => {
        // Test Code here
      });
    });
  });
});
```

[Roy Osherove naming standars for unit tests](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html)
