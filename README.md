# @gopher.js/Defer

Defer.js is a wrapper for your functions that tried to implement a similar way to `defer` keyword in go.

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

Defer comes with 2 functions:

- defer
- deferAsync

### With Defer

```js
const { defer } = require('@gopher.js/defer')

const result = defer((defer) => {
  defer(function() {console.log("this will print third")})
  defer(function() {console.log("this will print second")})
  console.log("I will print before all others")
  return 1 + 2;
})
console.log("This will print at the end. Result:", result)
```

### With Defer Async

```js
const { deferAsync } = require('@gopher.js/defer')

// inside an async function
const result = await deferAsync(async (defer) => {
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
