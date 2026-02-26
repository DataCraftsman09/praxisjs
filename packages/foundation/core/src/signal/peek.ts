import type { Computed, Signal } from "@verbose/shared";

import { activeEffect, runEffect } from "./effect";

export function peek<T>(source: Signal<T> | Computed<T> | (() => T)): T {
  const prev = activeEffect;
  runEffect(null);
  try {
    return source();
  } finally {
    runEffect(prev);
  }
}
