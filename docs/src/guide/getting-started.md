# Getting Started

Verbose is a signal-driven frontend framework built with TypeScript. It provides fine-grained reactivity, class components with decorators, and a complete ecosystem of first-party packages.

::: warning Experimental
Verbose is under active development. APIs are unstable and subject to breaking changes at any time. Not recommended for production use. [See project status →](/project-status)
:::

## The right amount of verbose

The name is intentional. Verbose was designed around the idea that code should be **explicit by default** — not terse to the point of hiding intent, and not ceremonious for the sake of it. The goal is the ideal level of verbosity: enough to make structure visible, patterns enforceable, and onboarding straightforward.

Decorators like `@State`, `@Prop`, and `@Watch` aren't boilerplate — they're declarations. They make the contract of a component readable at a glance, help teams agree on patterns, and give tooling a clear surface to work with.

Reactivity is **explicit, fine-grained, and TypeScript-native**. Signals propagate changes directly to the DOM nodes that care about them — no reconciliation pass, no diffing overhead.

## Automatic setup

Run `create-verbose` to generate a new project with TypeScript, Vite, JSX, and all dependencies already configured.

::: code-group

```sh [npm]
npm create verbose@latest
```

```sh [pnpm]
pnpm create verbose
```

```sh [yarn]
yarn create verbose
```

```sh [bun]
bun create verbose
```

:::

You can also pass the project name as an argument to skip the first prompt:

```sh
npm create verbose@latest my-app
```

The CLI will then ask which template to use:

| Template | Includes |
| -------- | -------- |
| Minimal | `@verbose/core`, `@verbose/decorators`, `@verbose/jsx`, `@verbose/runtime` |
| With Router | Minimal + `@verbose/router` |
| Full | Router + `@verbose/store`, `@verbose/di`, `@verbose/composables`, `@verbose/concurrent`, `@verbose/devtools` |

Once the project is created, install dependencies and start the dev server:

```sh
cd my-app
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with HMR enabled via `@verbose/vite-plugin`.

---

## Manual setup

Prefer to configure everything yourself? Install only the packages you need.

### Installation

::: code-group

```sh [npm]
npm install @verbose/core @verbose/jsx @verbose/runtime @verbose/decorators
npm install -D @verbose/vite-plugin
```

```sh [pnpm]
pnpm add @verbose/core @verbose/jsx @verbose/runtime @verbose/decorators
pnpm add -D @verbose/vite-plugin
```

```sh [yarn]
yarn add @verbose/core @verbose/jsx @verbose/runtime @verbose/decorators
yarn add -D @verbose/vite-plugin
```

:::

### Project setup

Configure Vite to use the Verbose plugin:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { verbose } from "@verbose/vite-plugin";

export default defineConfig({
  plugins: [verbose({ hmr: true })],
});
```

Configure TypeScript to use the Verbose JSX runtime:

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@verbose/jsx"
  }
}
```

### Your first component

```tsx
import { Component, State, Prop } from "@verbose/decorators";
import { BaseComponent } from "@verbose/core";

@Component()
class Counter extends BaseComponent {
  @Prop() initialCount = 0;
  @State() count = 0;

  increment() {
    this.count++;
  }

  render() {
    return (
      <div>
        <p>Count: {this.count}</p>
        <button onClick={() => this.increment()}>Increment</button>
      </div>
    );
  }
}
```

### Mounting the app

```ts
import { render } from '@verbose/runtime'

render(<Counter initialCount={0} />, document.getElementById('app')!)
```

---

## Package overview

| Package                              | Purpose                                                         |
| ------------------------------------ | --------------------------------------------------------------- |
| [core](/packages/core)               | Reactive primitives: `signal`, `computed`, `effect`, `resource` |
| [composables](/packages/composables) | DOM and browser composition utilities                           |
| [decorators](/packages/decorators)   | Class decorators for components                                 |
| [jsx](/packages/jsx)                 | JSX runtime and type definitions                                |
| [runtime](/packages/runtime)         | VNode rendering engine                                          |
| [store](/packages/store)             | Reactive state management                                       |
| [router](/packages/router)           | Client-side routing                                             |
| [motion](/packages/motion)           | Animations: tweens, springs, keyframes                          |
| [fsm](/packages/fsm)                 | Finite state machines                                           |
| [concurrent](/packages/concurrent)   | Async concurrency control                                       |
| [di](/packages/di)                   | Dependency injection container                                  |
| [vite-plugin](/packages/vite-plugin) | Vite integration                                                |
| [devtools](/packages/devtools)       | In-app developer tools panel                                    |
