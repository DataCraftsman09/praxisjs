# Stateless Component Anatomy

A stateless PraxisJS component is a TypeScript class that extends `StatelessComponent<T>`. It receives strongly-typed props and renders purely from them — no `@State`, no `@Watch`, no internal signal ownership. This guide walks through each part.

## Overview

```tsx
import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";
import type { Children } from "@praxisjs/shared";

interface UserCardProps {
  name: string;
  avatarUrl: string;
  role?: string;
  onClick?: () => void;
  children?: Children;
}

@Component()
class UserCard extends StatelessComponent<UserCardProps> {
  // ── Lifecycle ────────────────────────────────────────────────────────────
  onMount() {
    console.log("UserCard mounted:", this.props.name);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  render() {
    const { name, avatarUrl, role, onClick, children } = this.props;

    return (
      <div class="card" onClick={onClick}>
        <img src={avatarUrl} alt={name} />
        <div class="card-body">
          <h2>{name}</h2>
          {role && <span class="role">{role}</span>}
          {children}
        </div>
      </div>
    );
  }
}
```

---

## Each part explained

### 1. `StatelessComponent<T>`

The generic parameter `T` defines the shape of the props object. TypeScript enforces that every parent passing `<UserCard />` provides the required fields.

```ts
import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

interface BadgeProps {
  label: string;
  color?: string;
}

@Component()
class Badge extends StatelessComponent<BadgeProps> {
  render() {
    return (
      <span style={() => `color: ${this.props.color ?? "inherit"}`}>
        {this.props.label}
      </span>
    );
  }
}
```

If no generic is passed (`extends StatelessComponent`) the props default to `{}` and `this.props` is an empty object.

---

### 2. Props — `this.props`

All values from the parent are available via `this.props`. There are no decorators — just plain property access.

```ts
const { name, role, onClick } = this.props;
```

Props are resolved each time `render()` runs, so they always reflect the current parent values.

::: tip Static vs reactive props
The parent can pass either a plain value or a getter to any prop:

```tsx
// static — evaluated once when the parent renders, never updates
<Badge label={this.text} />

// reactive — re-evaluated whenever this.text changes
<Badge label={() => this.text} />
```

Because `StatelessComponent` has no internal signal system, `this.props.label` inside the component holds whatever the parent passed. When passing the value through to JSX children, the renderer handles functions reactively — no re-render of the component is needed.
:::

---

### 3. Children

Pass `children?: Children` in the props interface to accept child content.

```tsx
interface PanelProps {
  title: string;
  children?: Children;
}

@Component()
class Panel extends StatelessComponent<PanelProps> {
  render() {
    return (
      <section class="panel">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </section>
    );
  }
}

// Usage:
<Panel title="Details">
  <p>Some content here.</p>
</Panel>;
```

---

### 4. Reactive output

`render()` runs **once** on mount. To make part of the output reactive, wrap it in an arrow function — the runtime tracks signal reads inside it and updates only that DOM node.

```tsx
// static — the value is read once at mount, never updates
<span>{this.props.label}</span>

// reactive — updates whenever the signal the parent passed changes
<span>{() => this.props.label}</span>
```

When the parent passes a signal as a prop, pass it through as an arrow function:

```tsx
@Component()
class ProgressBar extends StatelessComponent<{
  value: number | (() => number);
}> {
  render() {
    return (
      <div class="bar">
        <div
          style={() =>
            `width: ${typeof this.props.value === "function" ? this.props.value() : this.props.value}%`
          }
        />
      </div>
    );
  }
}
```

---

### 5. Lifecycle

`StatelessComponent` supports the same lifecycle hooks as `StatefulComponent`:

| Method            | When it runs                           |
| ----------------- | -------------------------------------- |
| `onBeforeMount()` | Before first render                    |
| `onMount()`       | After first DOM insertion              |
| `onUnmount()`     | When removed from DOM                  |
| `onError(err)`    | On uncaught error inside the component |

```ts
onMount() {
  console.log("mounted with props:", this.props);
}

onUnmount() {
  console.log("unmounted");
}
```

---

### 6. Composing with utilities

Composables from `@praxisjs/composables` return signals that work as reactive children:

```tsx
import { createRef, useElementSize } from "@praxisjs/composables";
import { Component } from "@praxisjs/decorators";
import { StatelessComponent } from "@praxisjs/core";

@Component()
class SizeDisplay extends StatelessComponent {
  ref = createRef();
  size = useElementSize(this.ref);

  render() {
    return (
      <div ref={this.ref}>
        {() => `${this.size.width()}×${this.size.height()}px`}
      </div>
    );
  }
}
```

---

## Stateless vs Stateful

| Feature         | `StatelessComponent<T>` | `StatefulComponent`  |
| --------------- | ----------------------- | -------------------- |
| Props           | `this.props` (typed)    | `@Prop()` decorator  |
| Internal state  | ✗                       | `@State()` decorator |
| Watchers        | ✗                       | `@Watch()`           |
| Emitted events  | ✗                       | `@Emit()`            |
| Commands        | ✗                       | `@OnCommand()`       |
| Named slots     | ✗ (only `children`)     | `@Slot()`            |
| Lifecycle hooks | ✓                       | ✓                    |
| Composables     | ✓                       | ✓                    |

Use `StatelessComponent` for purely presentational components — lists, badges, cards, icons, layout wrappers. Use `StatefulComponent` when you need internal reactive state, watchers, events, or named slots.
