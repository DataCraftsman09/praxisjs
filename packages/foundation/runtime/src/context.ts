import type { Scope } from "./scope";

let _currentScope: Scope | null = null;

export function getCurrentScope(): Scope {
  if (!_currentScope) {
    throw new Error(
      "[PraxisJS] jsx() called outside of a render context. Make sure to call render() with a factory function.",
    );
  }
  return _currentScope;
}

export function runInScope<T>(scope: Scope, fn: () => T): T {
  const prev = _currentScope;
  _currentScope = scope;
  try {
    return fn();
  } finally {
    _currentScope = prev;
  }
}
