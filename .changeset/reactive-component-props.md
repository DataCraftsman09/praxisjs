---
"@praxisjs/jsx": minor
---

Component props now accept reactive getters in JSX. Any prop can be passed as a plain value (static) or as an arrow function (reactive) — the runtime tracks signal dependencies inside the getter and updates the DOM automatically.

```tsx
// static — read once at mount
<Counter value={this.count} />

// reactive — updates whenever this.count changes
<Counter value={() => this.count} />
```

This applies to both `StatelessComponent` (via the generic props interface) and `StatefulComponent` (via `@Prop()`, which already unwrapped getters at runtime — now the types reflect this).

**Changes:**

- `PropsOf<T>` now maps each prop key `K` to `Reactive<P[K]>` (`P[K] | (() => P[K])`), so the JSX type checker accepts getters for any component prop without requiring the component author to annotate them manually.
- `InstancePropsOf<C>` (used for `StatefulComponent` `@Prop()` inference) likewise wraps each inferred prop with `Reactive<>`.
- `Reactive<T>` is now exported from `@praxisjs/jsx` and `@praxisjs/jsx/jsx-runtime`.
