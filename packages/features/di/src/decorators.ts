import { container, type Container, Token, type Constructor, type InjectableOptions  } from "./container";

export function Injectable(options: InjectableOptions = {}) {
  return function (value: Constructor, _context: ClassDecoratorContext): void {
    container.register(value, options);
  };
}

export function Inject<T>(dep: Constructor<T> | Token<T>) {
  return function (_value: undefined, context: ClassFieldDecoratorContext): void {
    const cache = new WeakMap<object, T>();
    const propertyKey = String(context.name);

    context.addInitializer(function (this: unknown) {
      Object.defineProperty(this, context.name, {
        get(this: object): T {
          if (!cache.has(this)) {
            let resolved: T;
            try {
              resolved = container.resolve(dep as Constructor<T>);
            } catch (err) {
              throw new Error(
                `[Inject] Failed to resolve "${
                  dep instanceof Token
                    ? dep.toString()
                    : (dep as Constructor).name
                }" in "${(this as { constructor: { name: string } }).constructor.name}.${propertyKey}": ${(err as Error).message}`,
              );
            }
            cache.set(this, resolved);
          }
          return cache.get(this) as T;
        },

        set(_value: unknown): void {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[Inject] "${propertyKey}" is managed by the DI container and cannot be assigned directly.`,
            );
          }
        },

        enumerable: true,
        configurable: true,
      });
    });
  };
}

export function InjectContainer() {
  return function (_value: undefined, context: ClassFieldDecoratorContext): void {
    context.addInitializer(function (this: unknown) {
      Object.defineProperty(this, context.name, {
        get() {
          return container;
        },
        enumerable: true,
        configurable: true,
      });
    });
  };
}

export function useService<T>(dep: Constructor<T> | Token<T>): T {
  return container.resolve(dep as Constructor<T>);
}

export function createScope(configure?: (c: Container) => void): Container {
  const child = container.createChild();
  configure?.(child);
  return child;
}
