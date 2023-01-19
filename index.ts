export function defer<T>(fn: (defer: ((args: any) => any)) => T): T {
  const deferred: (() => unknown)[] = [];
  const defer = function (fn: (...args: any) => unknown) {
    deferred.push(fn);
  }
  const result = fn(defer);
  deferred.reverse().forEach((fn) => fn?.());
  return result;
}

export async function deferAsync<T>(fn: (defer: ((args: any) => any)) => Promise<T>): Promise<T> {
  const deferred: (() => Promise<unknown> | unknown)[] = [];
  const defer = function (fn: (...args: any) => void) {
    deferred.push(fn);
  }
  const result = await fn(defer);
  deferred.reverse();
  for (let i = 0; i < deferred.length; i++) {
    await deferred[i]?.();
  }
  return result;
}
