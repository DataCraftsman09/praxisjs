# @praxisjs/shared

Type definitions shared across all PraxisJS packages. You generally don't install this directly — it is a peer dependency pulled in by the other packages.

## Signal Types

### `Signal<T>`

A readable and writable reactive value.

```ts
import type { Signal } from "@praxisjs/shared";
```

| Member      | Signature                                    | Description                               |
| ----------- | -------------------------------------------- | ----------------------------------------- |
| `()`        | `() => T`                                    | Read the current value                    |
| `set`       | `(value: T) => void`                         | Replace the value                         |
| `update`    | `(updater: (prev: T) => T) => void`          | Derive next value from previous           |
| `subscribe` | `(effect: (value: T) => void) => () => void` | Subscribe to changes, returns unsubscribe |

### `Computed<T>`

A read-only reactive value derived from other signals.

```ts
import type { Computed } from "@praxisjs/shared";
```

| Member      | Signature                                    | Description                               |
| ----------- | -------------------------------------------- | ----------------------------------------- |
| `()`        | `() => T`                                    | Read the current value                    |
| `subscribe` | `(effect: (value: T) => void) => () => void` | Subscribe to changes, returns unsubscribe |

---

## Children Types

### `Children`

Any value that can appear as a JSX child.

```ts
import type { Children } from "@praxisjs/shared";

type Children = Primitive | Node | ReactiveChildren | Children[];

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type ReactiveChildren = () => RenderedValue | RenderedValue[] | ReactiveChildren[];
```

Reactive children (arrow functions) are re-evaluated automatically when their signal dependencies change.

### `ComponentElement`

Type alias for any class constructor whose instances expose a `render()` method. Used when typing route definitions, dynamic component registries, or higher-order decorators.

```ts
import type { ComponentElement } from "@praxisjs/shared";

type ComponentElement = new (...args: any[]) => ComponentInstance;
```
