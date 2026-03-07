import { Registry } from "../core/registry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyConstructor = new (...args: any[]) => any;

/**
 * Instruments a component class to report renders and lifecycle events
 * to the devtools panel.
 *
 * @Trace()
 * @Component()
 * class MyComponent extends StatefulComponent { ... }
 */
export function Trace() {
  return function <T extends AnyConstructor>(constructor: T, _context: ClassDecoratorContext): T {
    const name = constructor.name;
    const registry = Registry.instance;
    const proto = constructor.prototype as Record<string, unknown>;

    // ── render() ──────────────────────────────────────────────────────────
    const originalRender = proto.render as
      | ((...args: unknown[]) => unknown)
      | undefined;

    if (originalRender) {
      proto.render = function (this: object, ...args: unknown[]) {
        const start = performance.now();
        const result = originalRender.call(this, ...args);
        const duration = performance.now() - start;
        registry.recordRender(this, duration);
        return result;
      };
    }

    // ── onBeforeMount – register the component instance ───────────────────
    const originalOnBeforeMount = proto.onBeforeMount as
      | ((...args: unknown[]) => unknown)
      | undefined;

    proto.onBeforeMount = function (this: object, ...args: unknown[]) {
      registry.registerComponent(this, name);
      registry.recordLifecycle(this, "onBeforeMount");
      return originalOnBeforeMount?.call(this, ...args);
    };

    // ── remaining lifecycle hooks ─────────────────────────────────────────
    const hooks = [
      "onMount",
      "onUnmount",
      "onBeforeUpdate",
      "onUpdate",
      "onAfterUpdate",
    ] as const;

    for (const hook of hooks) {
      const original = proto[hook] as
        | ((...args: unknown[]) => unknown)
        | undefined;

      proto[hook] = function (this: object, ...args: unknown[]) {
        registry.recordLifecycle(this, hook);
        return original?.call(this, ...args);
      };
    }

    return constructor;
  };
}
