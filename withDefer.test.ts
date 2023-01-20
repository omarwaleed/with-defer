import { withDefer, withDeferAsync } from '.';

describe("defer", () => {
  it("should defer execution of a sync function", () => {
    const fn = jest.fn();
    const deferred = jest.fn();
    const inputs: string[] = [];
    const result = withDefer(function(defer) {
      defer(deferred);
      defer(() => inputs.push("1"));
      defer(() => inputs.push("2"));
      defer(() => inputs.push("3"));
      defer(() => inputs.push("4"));
      fn();
      return true;
    })
    expect(result).toBe(true);
    expect(inputs).toEqual(["4", "3", "2", "1"]);
    expect(fn).toHaveBeenCalled();
    expect(deferred).toHaveBeenCalled();
  });

  it("should defer execution of an sync function with parameters", async () => {
    let sum: number = 0;
    function add(a: number, b: number) {
      sum += a + b;
    }
    const result = withDefer(function(defer) {
      defer(() => add(1, 2));
      return true;
    });
    expect(result).toBe(true);
    expect(sum).toBe(3);
  });

  it("should defer execution of an async function", async () => {
    const fn = jest.fn();
    const afn = jest.fn();
    let deferredOut = 0;
    const deferred = () => new Promise((resolve) => setTimeout(() => {
      console.log("running deferred promise"); deferredOut = 1; resolve(true)
    }, 100));
    const result = await withDeferAsync(async function(defer) {
      defer(deferred);
      fn();
      await new Promise((resolve) => setTimeout(() => resolve(afn()), 100));
      return "async";
    })
    expect(result).toBe("async");
    expect(fn).toHaveBeenCalled();
    expect(afn).toHaveBeenCalled();
    expect(deferredOut).toBe(1);
  });

  it("should defer execution of an async function with reject to throw error", async () => {
    const fn = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve(true), 100)));
    const afn = jest.fn();
    const deferred = () => new Promise((resolve, reject) => setTimeout(() => {
      console.log("running deferred promise"); reject(new Error("test error"))
    }, 100));
    await expect(withDeferAsync(async function(defer) {
      defer(deferred);
      await fn();
      await new Promise((resolve) => setTimeout(() => resolve(afn()), 100));
      return "async";
    })).rejects.toThrow("test error");
    expect(fn).toHaveBeenCalled();
    expect(afn).toHaveBeenCalled();
  });
});