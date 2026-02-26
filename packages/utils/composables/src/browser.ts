import { signal, computed } from "@verbose/core";
import type { Computed } from "@verbose/shared";

export function useMediaQuery(query: string): Computed<boolean> {
  const mql = window.matchMedia(query);
  const matches = signal(mql.matches);
  mql.addEventListener("change", (e: MediaQueryListEvent) =>
    { matches.set(e.matches); },
  );
  return computed(() => matches());
}

export function useColorScheme() {
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isLight = computed(() => !isDark());
  return { isDark, isLight };
}

export function useMouse() {
  const x = signal(0);
  const y = signal(0);
  window.addEventListener("mousemove", (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  });
  return { x: computed(() => x()), y: computed(() => y()) };
}

export function useKeyCombo(combo: string): Computed<boolean> {
  const parts = combo.toLowerCase().split("+");
  const pressed = signal(false);
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const ctrl = parts.includes("ctrl") ? e.ctrlKey : true;
    const shift = parts.includes("shift") ? e.shiftKey : true;
    const alt = parts.includes("alt") ? e.altKey : true;
    const key = parts.find(
      (p) => !["ctrl", "shift", "alt", "meta"].includes(p),
    );
    if (ctrl && shift && alt && (!key || e.key.toLowerCase() === key))
      pressed.set(true);
  });
  window.addEventListener("keyup", () => { pressed.set(false); });
  return computed(() => pressed());
}

export function useIdle(timeout = 60_000): Computed<boolean> {
  const idle = signal(false);
  let timer: ReturnType<typeof setTimeout>;
  const reset = () => {
    idle.set(false);
    clearTimeout(timer);
    timer = setTimeout(() => { idle.set(true); }, timeout);
  };
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((e) =>
    { window.addEventListener(e, reset, { passive: true }); },
  );
  reset();
  return computed(() => idle());
}
