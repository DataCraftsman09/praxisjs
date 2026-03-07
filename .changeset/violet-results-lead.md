---
"@praxisjs/decorators": minor
"@praxisjs/runtime": minor
"create-praxisjs": minor
"@praxisjs/core": minor
"@praxisjs/jsx": minor
"@praxisjs/devtools": minor
"@praxisjs/shared": minor
"@praxisjs/motion": minor
"@praxisjs/router": minor
"@praxisjs/store": minor
"@praxisjs/fsm": minor
"@praxisjs/di": minor
"@praxisjs/composables": patch
"@praxisjs/concurrent": minor
---

**Refactor decorator system and component architecture across PraxisJS packages**

- Replaced legacy decorator signatures (`constructor`, `target`, `propertyKey`, method descriptor) with the standard TC39 decorator context API (`ClassDecoratorContext`, `ClassFieldDecoratorContext`, `ClassMethodDecoratorContext`) across `@praxisjs/decorators`, `@praxisjs/store`, `@praxisjs/concurrent`, `@praxisjs/router`, `@praxisjs/motion`, `@praxisjs/di`, and `@praxisjs/fsm`.
- Introduced `StatefulComponent` and `StatelessComponent` as the new base classes, replacing the deprecated `BaseComponent`/`Function Component` pattern, across `@praxisjs/core`, `@praxisjs/runtime`, `@praxisjs/devtools`, and templates.
- Implemented core rendering functionality in `@praxisjs/runtime` (`mountChildren`, `mountComponent`, reactive scope management) and removed the deprecated `renderer.ts`.
- Refactored `@praxisjs/jsx` to delegate rendering to `@praxisjs/runtime` and improved type safety with `flattenChildren` and `isComponent` utilities.
- Updated internal module structure with new `internal` exports in `package.json` files for shared utilities and types.
- Removed `experimentalDecorators`/`emitDecoratorMetadata` from `tsconfig.json` in favor of native decorator support.
