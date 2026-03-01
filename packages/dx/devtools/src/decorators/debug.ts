import { Registry } from "../core/registry";

export interface DebugOptions {
  label?: string;
}

// Duck-type check: callable with .subscribe but no .set → Computed
interface TrackedComputed {
  (): unknown;
  subscribe: (fn: (value: unknown) => void) => () => void;
}

function isComputed(value: unknown): value is TrackedComputed {
  return (
    typeof value === "function" &&
    typeof (value as unknown as Record<string, unknown>).subscribe ===
      "function" &&
    !("set" in (value as object))
  );
}

interface ComputedSlot {
  computed: TrackedComputed;
  unsub: () => void;
}

/**
 * Tracks state, computed values, and methods in the devtools panel.
 *
 * On @State() properties (stacked):
 *   @Debug()
 *   @State() count = 0;
 *
 * On computed class fields:
 *   @Debug()
 *   doubled = computed(() => this.count * 2);
 *
 * On methods:
 *   @Debug()
 *   increment() { ... }
 */
export function Debug(options: DebugOptions = {}) {
  return function (
    target: object,
    key: string,
    descriptor?: PropertyDescriptor,
  ): void {
    const componentName = (target.constructor as { name: string }).name;
    const label = options.label ?? key;

    // ── Method decorator ─────────────────────────────────────────────────
    if (descriptor && typeof descriptor.value === "function") {
      const original = descriptor.value as (...args: unknown[]) => unknown;

      descriptor.value = function (this: object, ...args: unknown[]) {
        const start = performance.now();
        let result: unknown;
        let threw = false;

        try {
          result = original.apply(this, args);
        } catch (err) {
          threw = true;
          result = err;
          throw err;
        } finally {
          const duration = performance.now() - start;
          Registry.instance.recordMethodCall(
            this,
            label,
            args,
            threw ? `throw ${String(result)}` : result,
            duration,
            componentName,
          );
        }

        return result;
      };

      return;
    }

    const existingDesc = Object.getOwnPropertyDescriptor(target, key);

    // ── Property decorator (wrapping @State()) ───────────────────────────
    if (existingDesc?.get && existingDesc.set) {
      const originalGet = existingDesc.get.bind(existingDesc);
      const originalSet = existingDesc.set.bind(existingDesc);
      const initialized = new WeakSet();

      Object.defineProperty(target, key, {
        get(this: object) {
          return originalGet.call(this) as unknown;
        },
        set(this: object, newValue: unknown) {
          if (!initialized.has(this)) {
            initialized.add(this);
            originalSet.call(this, newValue);
            Registry.instance.registerSignal(
              this,
              label,
              newValue,
              componentName,
            );
          } else {
            const oldValue: unknown = originalGet.call(this);
            originalSet.call(this, newValue);
            Registry.instance.updateSignal(this, label, newValue, oldValue);
          }
        },
        enumerable: true,
        configurable: true,
      });

      return;
    }

    // ── Computed class field ──────────────────────────────────────────────
    // No existing descriptor means it's a plain class field (e.g. `doubled = computed(...)`).
    // Intercept the assignment so we can subscribe to the computed's value changes.
    const slots = new WeakMap<object, ComputedSlot>();

    Object.defineProperty(target, key, {
      get(this: object) {
        return slots.get(this)?.computed;
      },
      set(this: object, value: unknown) {
        // Clean up previous subscription on re-assignment
        slots.get(this)?.unsub();

        if (!isComputed(value)) {
          console.warn(
            `[PraxisJS DevTools] @Debug() on "${componentName}.${key}": ` +
              `expected a computed() value but got ${typeof value}. Skipping.`,
          );
          return;
        }

        // subscribe() calls the callback immediately (synchronously), so we
        // use a flag to skip the first call and register via registerSignal instead.
        let skipFirst = true;
        let prevValue = value();

        const unsub = value.subscribe((newValue) => {
          if (skipFirst) {
            skipFirst = false;
            return;
          }
          Registry.instance.updateSignal(this, label, newValue, prevValue);
          prevValue = newValue;
        });

        slots.set(this, { computed: value, unsub });
        Registry.instance.registerSignal(this, label, prevValue, componentName);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
