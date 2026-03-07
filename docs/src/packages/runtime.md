# @praxisjs/runtime

::: warning Bugs and broken features
This package may have bugs or partially broken functionality. If you run into something, feel free to [open an issue or contribute on GitHub](https://github.com/praxisjs-org/praxisjs).
:::

::: code-group

```sh [npm]
npm install @praxisjs/runtime
```

```sh [pnpm]
pnpm add @praxisjs/runtime
```

```sh [yarn]
yarn add @praxisjs/runtime
```

:::

DOM rendering engine. Mounts JSX output as native DOM nodes and keeps them reactive via scoped effects.

## `render(factory, container)`

Mounts a component tree into a DOM container. Takes a factory function (not a node directly) so the root scope is established before JSX runs.

Returns a cleanup function that unmounts the tree and clears the container.

```ts
import { render } from "@praxisjs/runtime";

const unmount = render(() => <App />, document.getElementById("app")!);

// later:
unmount();
```

---

## `Scope`

Tracks reactive effects and cleanup callbacks tied to a component or render boundary. When a scope is disposed, all its effects are stopped and cleanup callbacks are called.

```ts
import { Scope } from "@praxisjs/runtime";
```

| Method              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `effect(fn)`        | Runs `fn` as a reactive effect, tracked by this scope    |
| `add(cleanup)`      | Registers a manual cleanup callback                      |
| `fork()`            | Creates a child scope; disposed automatically with parent |
| `dispose()`         | Stops all effects and runs all cleanups                  |

---

## `runInScope(scope, fn)`

Executes `fn` inside a given scope, making it the active scope for any JSX or `getCurrentScope()` calls within.

```ts
import { runInScope, getCurrentScope } from "@praxisjs/runtime";

runInScope(scope, () => {
  // getCurrentScope() returns `scope` here
});
```

## `getCurrentScope()`

Returns the currently active `Scope`. Throws if called outside of a render context.

---

## `mountElement(tag, props, scope)`

Creates and returns a DOM element for the given tag, applying props and registering event listeners on the provided scope.

```ts
import { mountElement } from "@praxisjs/runtime";
```

Used internally by the JSX transform. Reactive prop values (arrow functions) are wrapped in scoped effects and update automatically when their signals change.

## `mountComponent(ctor, props, parentScope)`

Instantiates a class component, runs its lifecycle, and returns the mounted `Node[]`.

```ts
import { mountComponent } from "@praxisjs/runtime";
```

### Component lifecycle (mount)

1. Component instantiated with `props`; slots populated via `initSlots`
2. `onBeforeMount()` called
3. `render()` called inside a forked scope — result mounted to DOM
4. `onMount()` called (via `queueMicrotask`)
5. On scope dispose: `onUnmount()` called and scope cleaned up

On error thrown inside `render()`: `onError(e)` is called with the caught `Error`.

---

## Prop behaviour

| Prop type          | Behaviour                                                    |
| ------------------ | ------------------------------------------------------------ |
| Static value       | Set once at mount                                            |
| Arrow function     | Wrapped in a scoped effect; re-applied when signals change   |
| `ref`              | Called immediately with the DOM element                      |
| `htmlFor`          | Mapped to the `for` attribute                                |
| `class`/`className`| Sets the `class` attribute                                   |
| `style` (object)   | Merged into `el.style`                                       |
| `style` (string)   | Set as the `style` attribute                                 |
| `checked`, `value`, `disabled`, `selected` | Assigned as DOM properties |

---

## Event mapping

JSX event props are mapped to native DOM events and removed automatically when the scope is disposed:

| JSX prop           | DOM event       |
| ------------------ | --------------- |
| `onClick`          | `click`         |
| `onDblClick`       | `dblclick`      |
| `onChange`         | `change`        |
| `onInput`          | `input`         |
| `onSubmit`         | `submit`        |
| `onReset`          | `reset`         |
| `onKeyDown`        | `keydown`       |
| `onKeyUp`          | `keyup`         |
| `onKeyPress`       | `keypress`      |
| `onFocus`          | `focus`         |
| `onBlur`           | `blur`          |
| `onMouseDown`      | `mousedown`     |
| `onMouseUp`        | `mouseup`       |
| `onMouseEnter`     | `mouseenter`    |
| `onMouseLeave`     | `mouseleave`    |
| `onMouseMove`      | `mousemove`     |
| `onContextMenu`    | `contextmenu`   |
| `onScroll`         | `scroll`        |
| `onWheel`          | `wheel`         |
| `onDragStart`      | `dragstart`     |
| `onDragEnd`        | `dragend`       |
| `onDragOver`       | `dragover`      |
| `onDrop`           | `drop`          |
| `onTouchStart`     | `touchstart`    |
| `onTouchEnd`       | `touchend`      |
| `onTouchMove`      | `touchmove`     |
| `onAnimationEnd`   | `animationend`  |
| `onTransitionEnd`  | `transitionend` |
