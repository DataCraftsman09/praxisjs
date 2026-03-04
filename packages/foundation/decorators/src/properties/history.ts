import { type HistoryElement, history } from "@praxisjs/core";

export type WithHistory<T, K extends keyof T> = Record<`${string & K}History`, HistoryElement<T[K]>>;

export function History(limit = 50) {
  return function (target: object, propertyKey: string): void {
    const historyKey = `${propertyKey}History`;
    const histories = new WeakMap<object, HistoryElement<unknown>>();

    Object.defineProperty(target, historyKey, {
      get(this: Record<string, unknown>): HistoryElement<unknown> {
        if (!histories.has(this)) {
          const source = () => this[propertyKey];

          const h = history(source as () => unknown, limit);

          const originalUndo = () => { h.undo(); };
          const originalRedo = () => { h.redo(); };

          h.undo = () => {
            const prev = h.values()[h.values().length - 2];
            if (prev === undefined) return;
            originalUndo();
            this[propertyKey] = prev;
          };

          h.redo = () => {
            originalRedo();
            this[propertyKey] = h.current();
          };

          histories.set(this, h);
        }
        return histories.get(this) as HistoryElement<unknown>;
      },
      enumerable: false,
      configurable: true,
    });
  };
}
