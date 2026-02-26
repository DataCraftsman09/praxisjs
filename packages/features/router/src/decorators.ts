export function Route(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T extends new (...args: any[]) => any>(constructor: T): T {
    Object.defineProperty(constructor, "__routePath", {
      value: path,
      writable: false,
      configurable: false,
    });
    return constructor;
  };
}
