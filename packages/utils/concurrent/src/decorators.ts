import { pool } from "./pool";
import { queue } from "./queue";
import { task } from "./task";

export function Task() {
  return function (
    value: (...args: unknown[]) => Promise<unknown>,
    context: ClassMethodDecoratorContext,
  ): void {
    const methodKey = String(context.name);

    context.addInitializer(function (this: unknown) {
      const self = this as Record<string, unknown>;
      const t = task(value.bind(this));
      self[`${methodKey}_loading`] = t.loading;
      self[`${methodKey}_error`] = t.error;
      self[`${methodKey}_lastResult`] = t.lastResult;
      self[methodKey] = (...args: unknown[]) => t(...args);
    });
  };
}

export function Queue() {
  return function (
    value: (...args: unknown[]) => Promise<unknown>,
    context: ClassMethodDecoratorContext,
  ): void {
    const methodKey = String(context.name);

    context.addInitializer(function (this: unknown) {
      const self = this as Record<string, unknown>;
      const q = queue(value.bind(this));
      self[`${methodKey}_loading`] = q.loading;
      self[`${methodKey}_pending`] = q.pending;
      self[`${methodKey}_error`] = q.error;
      self[methodKey] = (...args: unknown[]) => q(...args);
    });
  };
}

export function Pool(concurrency: number) {
  return function (
    value: (...args: unknown[]) => Promise<unknown>,
    context: ClassMethodDecoratorContext,
  ): void {
    const methodKey = String(context.name);

    context.addInitializer(function (this: unknown) {
      const self = this as Record<string, unknown>;
      const p = pool(concurrency, value.bind(this));
      self[`${methodKey}_loading`] = p.loading;
      self[`${methodKey}_active`] = p.active;
      self[`${methodKey}_pending`] = p.pending;
      self[`${methodKey}_error`] = p.error;
      self[methodKey] = (...args: unknown[]) => p(...args);
    });
  };
}
