const storeRegistry = new Map<new (...args: unknown[]) => unknown, unknown>();

export function Store() {
  return function <T extends new (...args: unknown[]) => unknown>(constructor: T): T {
    storeRegistry.set(constructor, null);
    return constructor;
  };
}

export function UseStore(StoreConstructor: new () => unknown) {
  const cache = new WeakMap<object, unknown>();

  return function (target: object, propertyKey: string | symbol): void {
    Object.defineProperty(target, propertyKey, {
      get(this: object): unknown {
        if (!cache.has(this)) {
          if (
            !storeRegistry.has(StoreConstructor) ||
            storeRegistry.get(StoreConstructor) === null
          ) {
            storeRegistry.set(StoreConstructor, new StoreConstructor());
          }
          cache.set(this, storeRegistry.get(StoreConstructor));
        }
        return cache.get(this);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
