import type { ComponentConstructor } from "./types/children";

export const isComponent = (source: unknown): source is ComponentConstructor => {
  return typeof source === "function" && "__isComponent" in source;
};
