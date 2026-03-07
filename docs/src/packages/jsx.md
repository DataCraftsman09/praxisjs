# @praxisjs/jsx

::: warning Bugs and broken features
This package may have bugs or partially broken functionality. If you run into something, feel free to [open an issue or contribute on GitHub](https://github.com/praxisjs-org/praxisjs).
:::

::: code-group

```sh [npm]
npm install @praxisjs/jsx
```

```sh [pnpm]
pnpm add @praxisjs/jsx
```

```sh [yarn]
yarn add @praxisjs/jsx
```

:::

JSX runtime and TypeScript type definitions. Configure your project to use this package as the JSX import source.

## Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@praxisjs/jsx"
  }
}
```

With this configuration, TypeScript automatically imports `jsx` and `jsxs` from `@praxisjs/jsx/jsx-runtime` — no explicit imports needed in component files.

---

## Runtime Functions

These are used by the TypeScript JSX transform and generally not called directly.

### `jsx(type, props)`

Mounts a DOM element or class component and returns the resulting `Node | Node[]`. Called by the JSX transform for single-child elements.

### `jsxs(type, props)`

Alias of `jsx`, called for elements with multiple children.

### `Fragment`

Symbol for grouping elements without a DOM wrapper.

```tsx
<>
  <p>First</p>
  <p>Second</p>
</>

// desugars to:
jsx(Fragment, { children: [...] })
```

---

## JSX Types

### `JSX.Element`

All JSX expressions resolve to `Node | Node[]`.

### Reactive props

All HTML element attributes and component props accept either a plain value or an arrow function (getter). The behavior depends on how you pass the value:

| Syntax | Behavior |
| --- | --- |
| `value={this.count}` | **Static** — evaluated once at mount, never updates |
| `value={() => this.count}` | **Reactive** — re-evaluated whenever the signal changes |

When a getter is provided, the runtime wraps it in a reactive effect and re-applies the value automatically.

```tsx
// static — read once at mount, never updates
<div class="box" />
<Counter value={this.count} />

// reactive — updates whenever the signal changes
<div class={() => theme()} />
<Counter value={() => this.count} />
```

This works for both HTML elements and class components. For `StatefulComponent`, the `@Prop()` decorator unwraps the getter transparently — `this.value` inside the component always returns the current value regardless of how the parent passed it.

### `JSX.IntrinsicElements`

Full type coverage for HTML elements. All elements share the base `HTMLAttributes` interface.

**Universal attributes:**

| Attribute             | Type                                        |
| --------------------- | ------------------------------------------- |
| `id`                  | `Reactive<string>`                          |
| `class` / `className` | `Reactive<string>`                          |
| `style`               | `Reactive<string \| CSSStyleDeclaration>`   |
| `key`                 | `string \| number`                          |
| `ref`                 | `(el: HTMLElement) => void`                 |
| `tabIndex`            | `Reactive<number>`                          |
| `title`               | `Reactive<string>`                          |
| `hidden`              | `Reactive<boolean>`                         |
| `draggable`           | `Reactive<boolean>`                         |
| `role`                | `Reactive<string>`                          |

**Accessibility (`aria-*`):**

| Attribute          | Type                                         |
| ------------------ | -------------------------------------------- |
| `aria-label`       | `Reactive<string>`                           |
| `aria-hidden`      | `Reactive<boolean \| "true" \| "false">`     |
| `aria-expanded`    | `Reactive<boolean \| "true" \| "false">`     |
| `aria-checked`     | `Reactive<boolean \| "true" \| "false" \| "mixed">` |
| `aria-disabled`    | `Reactive<boolean \| "true" \| "false">`     |
| `aria-selected`    | `Reactive<boolean \| "true" \| "false">`     |
| `aria-controls`    | `Reactive<string>`                           |
| `aria-describedby` | `Reactive<string>`                           |
| `aria-labelledby`  | `Reactive<string>`                           |

**Event handlers:**

| Handler            | Event           |
| ------------------ | --------------- |
| `onClick`          | `MouseEvent`    |
| `onDblClick`       | `MouseEvent`    |
| `onMouseDown`      | `MouseEvent`    |
| `onMouseUp`        | `MouseEvent`    |
| `onMouseEnter`     | `MouseEvent`    |
| `onMouseLeave`     | `MouseEvent`    |
| `onMouseMove`      | `MouseEvent`    |
| `onContextMenu`    | `MouseEvent`    |
| `onKeyDown`        | `KeyboardEvent` |
| `onKeyUp`          | `KeyboardEvent` |
| `onKeyPress`       | `KeyboardEvent` |
| `onFocus`          | `FocusEvent`    |
| `onBlur`           | `FocusEvent`    |
| `onChange`         | `Event`         |
| `onInput`          | `InputEvent`    |
| `onSubmit`         | `SubmitEvent`   |
| `onReset`          | `Event`         |
| `onDragStart`      | `DragEvent`     |
| `onDragEnd`        | `DragEvent`     |
| `onDragOver`       | `DragEvent`     |
| `onDrop`           | `DragEvent`     |
| `onTouchStart`     | `TouchEvent`    |
| `onTouchEnd`       | `TouchEvent`    |
| `onTouchMove`      | `TouchEvent`    |
| `onScroll`         | `Event`         |
| `onWheel`          | `WheelEvent`    |
| `onAnimationEnd`   | `AnimationEvent`   |
| `onTransitionEnd`  | `TransitionEvent`  |

**Element-specific attributes:**

| Element      | Extra props                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `button`     | `type`, `disabled`, `form`, `name`, `value`                               |
| `input`      | `type`, `value`, `placeholder`, `disabled`, `checked`, `name`, `min`, `max`, `step`, `required`, `readOnly`, `multiple`, `accept`, `autoComplete`, `autoFocus` |
| `form`       | `action`, `method`, `encType`, `noValidate`, `target`, `name`             |
| `a`          | `href`, `target`, `rel`, `download`                                       |
| `img`        | `src`, `alt`, `width`, `height`, `loading`, `decoding`                    |
| `label`      | `for` / `htmlFor`, `form`                                                 |
| `select`     | `value`, `multiple`, `size`, `disabled`, `required`, `name`               |
| `option`     | `value`, `selected`, `disabled`, `label`                                  |
| `textarea`   | `value`, `placeholder`, `rows`, `cols`, `disabled`, `required`, `readOnly`, `name`, `autoFocus`, `resize` |
| `th`         | `colSpan`, `rowSpan`, `scope`                                             |
| `td`         | `colSpan`, `rowSpan`                                                      |

**Supported HTML elements:**

`div`, `span`, `p`, `h1`–`h6`, `button`, `input`, `form`, `ul`, `ol`, `li`, `a`, `img`, `section`, `header`, `main`, `footer`, `nav`, `article`, `aside`, `label`, `select`, `option`, `textarea`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `pre`, `code`, `strong`, `em`, `small`, `hr`, `br`

Any unknown element falls back to `HTMLAttributes` via the index signature.

---

## Example

```tsx
@Component()
class Card extends StatefulComponent {
  @Prop() title = "";
  @Slot() default?: Children;

  render() {
    return (
      <div class="card">
        <h2>{() => this.title}</h2>
        {this.default}
      </div>
    );
  }
}
```
