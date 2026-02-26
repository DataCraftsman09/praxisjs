import { signal, effect } from "@verbose/core";

type StoreState = Record<string, unknown>;
type StoreMethods<S> = Record<string, (this: S, ...args: unknown[]) => unknown>;
type StoreDefinition<S extends StoreState, M extends StoreMethods<S>> = S & M;

export function createStore<S extends StoreState, M extends StoreMethods<S>>(
  definition: StoreDefinition<S, M>,
) {
  const initialState: S = {} as S;
  const methods: Record<string, (this: S, ...args: unknown[]) => unknown> = {};

  for (const [key, value] of Object.entries(definition)) {
    if (typeof value === "function") methods[key] = value as (this: S, ...args: unknown[]) => unknown;
    else (initialState as Record<string, unknown>)[key] = value;
  }

  const signals: Record<string, ReturnType<typeof signal>> = {};
  for (const [key, value] of Object.entries(initialState)) {
    signals[key] = signal(value);
  }

  const store = new Proxy({} as object, {
    get(_t, key: string | symbol) {
      if (typeof key !== "string") return undefined;
      if (key in methods)
        return (...args: unknown[]): unknown => methods[key].call(store, ...args);
      if (key === "$subscribe") return subscribe;
      if (key === "$reset") return reset;
      if (key === "$patch") return patch;
      if (key === "$state") return getState;
      if (key in signals) return signals[key]();
      const desc = Object.getOwnPropertyDescriptor(definition, key);
      if (desc?.get) return desc.get.call(store) as unknown;
      return undefined;
    },
    set(_t, key: string | symbol, value: unknown) {
      if (typeof key !== "string") return false;
      if (key in signals) {
        signals[key].set(value);
        return true;
      }
      return false;
    },
  }) as unknown as StoreDefinition<S, M>;

  function getState(): S {
    const s = {} as S;
    for (const k of Object.keys(signals)) (s as Record<string, unknown>)[k] = signals[k]();
    return s;
  }

  function subscribe(fn: (state: S) => void): () => void {
    return effect(() => { fn(getState()); });
  }

  function reset(): void {
    for (const [k, v] of Object.entries(initialState)) signals[k].set(v);
  }

  function patch(partial: Partial<S>): void {
    for (const [k, v] of Object.entries(partial)) {
      if (k in signals) signals[k].set(v);
    }
  }

  return () => store;
}
