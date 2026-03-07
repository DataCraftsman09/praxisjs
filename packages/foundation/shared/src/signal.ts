
export function isSignal(source: unknown): boolean {
  return typeof source === "function" && "__isSignal" in source;
}

export function isComputed(source: unknown) {
  return typeof source === "function" && "__isComputed" in source;
}

export function isReactive(source: unknown) {
  return isComputed(source) || isSignal(source);
}
