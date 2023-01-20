# @gopher.js/defer

Defer is a wrapper for your functions that tried to implement a similar way to `defer` keyword in go.

## Installation

with npm

```sh
npm install @gopher.js/defer
```

with yarn

```sh
yarn add @gopher.js/defer
```

## Usage

Defer comes with 2 wrapper functions:

- withDefer
- withDeferAsync

Every time you call defer, the function passed is added to a stack. After the wrapper function completes,
the wrapper starts popping the stack functions and calling them in the reverse order they were inserted.

### With Defer

```js
const { withDefer } = require('@gopher.js/defer')

const result = withDefer((defer) => {
  defer(function() {console.log("this will print third")})
  defer(function() {console.log("this will print second")})
  console.log("I will print before all others")
  return 1 + 2;
})
console.log("This will print at the end. Result:", result)
```

### With Defer Async

```js
const { withDeferAsync } = require('@gopher.js/defer')

// inside an async function
const result = await withDeferAsync(async (defer) => {
  defer(() => new Promise((resolve) => {
    console.log("this will print third")
    resolve();
  }))
  defer(() => new Promise((resolve) => {
    console.log("this will print second")
    resolve();
  }))
  console.log("I will print before all others")
  return 1 + 2;
})
console.log("This will print at the end. Result:", result)
```

What if a promise rejects?

The function will throw an error
