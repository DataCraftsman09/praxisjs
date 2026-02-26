import type { Computed, Signal } from "./types/signal";

export function isSignal<T>(
  source: Signal<T> | Computed<T> | (() => T),
): boolean {
  return typeof (source as Signal<T>).set === "function";
}
