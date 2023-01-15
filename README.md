# Defer.js

Defer.js is a wrapper for your functions that tried to implement a similar way to `defer` keyword in go.

## Installation

with npm

```sh
npm install defer_js
```

with yarn

```sh
yarn add defer_js
```

## Usage

Defer comes with 2 functions:

- withDefer
- withDeferAsync

### With Defer

```js
const { withDefer } = require('defer_js')

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
const { withDeferAsync } = require('defer_js')

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
