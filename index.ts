export function withDefer<T>(fn: (defer: ((args: any) => any)) => T): T {
  const deferred: (() => unknown)[] = [];
  const defer = function (fn: (...args: any) => unknown) {
    deferred.push(fn);
  }
  const result = fn(defer);
  deferred.reverse().forEach((fn) => fn());
  return result;
}

export async function withDeferAsync<T>(fn: (defer: ((args: any) => any)) => Promise<T>): Promise<T> {
  const deferred: (() => Promise<unknown> | unknown)[] = [];
  const defer = function (fn: (...args: any) => void) {
    deferred.push(fn);
  }
  const result = await fn(defer);
  deferred.reverse();
  for (let i = 0; i < deferred.length; i++) {
    await deferred[i]();
  }
  return result;
}

// withDefer((defer) => {
//   const a = "1";
//   const b = 2;
//   function closeSomething(x, y) {
//     console.log(x, y)
//   }
//   defer(function() {
//     closeSomething(a, b);
//   })
//   doSomething();

// })

