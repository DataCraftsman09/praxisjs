# PraxisJS

> **⚠️ Experimental** — PraxisJS is in early beta. The API is unstable and subject to breaking changes without notice. Not recommended for production use.

A signal-driven frontend framework written in TypeScript. PraxisJS combines fine-grained reactivity with class components and decorators, shipping a complete first-party ecosystem for building web applications.

**[Documentation](https://praxisjs.org/)** · [GitHub](https://github.com/praxisjs-org/praxisjs)

## Packages

### Foundation

| Package                | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `@praxisjs/core`       | Signals, computed values, effects, and async resources                       |
| `@praxisjs/decorators` | Class component decorators (`@Component`, `@State`, `@Prop`, `@Watch`, etc.) |
| `@praxisjs/jsx`        | JSX runtime                                                                  |
| `@praxisjs/runtime`    | Rendering engine                                                             |
| `@praxisjs/shared`     | Shared types and utilities                                                   |

### Features

| Package            | Description                |
| ------------------ | -------------------------- |
| `@praxisjs/router` | Client-side router         |
| `@praxisjs/store`  | State management           |
| `@praxisjs/motion` | Animations and transitions |
| `@praxisjs/di`     | Dependency injection       |
| `@praxisjs/fsm`    | Finite state machines      |

### Utils

| Package                 | Description           |
| ----------------------- | --------------------- |
| `@praxisjs/composables` | Composition utilities |
| `@praxisjs/concurrent`  | Concurrency control   |

### DX

| Package                 | Description      |
| ----------------------- | ---------------- |
| `@praxisjs/vite-plugin` | Vite integration |

## Development

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

```sh
pnpm install

# build all packages
pnpm build

# build by layer
pnpm build:foundation
pnpm build:features
pnpm build:utils
pnpm build:dx

# run docs
pnpm docs:dev

# typecheck
pnpm typecheck

# lint
pnpm lint
```

## Contributing

PraxisJS is a personal project, built out of curiosity and a desire to explore framework design from the ground up. Contributions are welcome — whether it's bug reports, ideas, or pull requests. Feel free to open an issue to discuss anything before diving in.

## License

[MIT](./LICENSE)
