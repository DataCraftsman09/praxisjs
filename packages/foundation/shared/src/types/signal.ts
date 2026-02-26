export interface Computed<T> {
  (): T;
  subscribe(effect: (value: T) => void): () => void;
}

export interface Signal<T> {
  (): T;
  set(value: T): void;
  update(updater: (prev: T) => T): void;
  subscribe(effect: (value: T) => void): () => void;
}
