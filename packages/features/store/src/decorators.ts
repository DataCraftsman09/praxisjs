const storeRegistry = new Map<new (...args: unknown[]) => unknown, unknown>();

export function Store() {
  return function (value: new (...args: unknown[]) => unknown, _context: ClassDecoratorContext): void {
    storeRegistry.set(value, null);
  };
}

export function UseStore(StoreConstructor: new () => unknown) {
  return function (_value: undefined, context: ClassFieldDecoratorContext): void {
    const cache = new WeakMap<object, unknown>();

    context.addInitializer(function (this: unknown) {
      Object.defineProperty(this, context.name, {
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
    });
  };
}
