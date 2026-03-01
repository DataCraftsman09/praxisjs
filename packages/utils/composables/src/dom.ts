import { signal, computed, effect } from "@praxisjs/core";
import type { Computed } from "@praxisjs/shared";

export function createRef(): { current: HTMLElement | null } {
  return { current: null };
}

export function useElementSize(ref: { current: HTMLElement | null }) {
  const width = signal(0);
  const height = signal(0);
  const observer = new ResizeObserver(([entry]) => {
    width.set(entry.contentRect.width);
    height.set(entry.contentRect.height);
  });
  effect(() => {
    if (ref.current) {
      observer.observe(ref.current);
      width.set(ref.current.offsetWidth);
      height.set(ref.current.offsetHeight);
    }
  });
  return {
    width: computed(() => width()),
    height: computed(() => height()),
    stop: () => { observer.disconnect(); },
  };
}

export function useWindowSize() {
  const width = signal(window.innerWidth);
  const height = signal(window.innerHeight);
  window.addEventListener("resize", () => {
    width.set(window.innerWidth);
    height.set(window.innerHeight);
  });
  return { width: computed(() => width()), height: computed(() => height()) };
}

export function useScrollPosition(target: HTMLElement | Window = window) {
  const x = signal(0);
  const y = signal(0);
  target.addEventListener("scroll", () => {
    x.set(
      target === window ? window.scrollX : (target as HTMLElement).scrollLeft,
    );
    y.set(
      target === window ? window.scrollY : (target as HTMLElement).scrollTop,
    );
  });
  return { x: computed(() => x()), y: computed(() => y()) };
}

export function useIntersection(
  ref: { current: HTMLElement | null },
  options?: IntersectionObserverInit,
): Computed<boolean> {
  const visible = signal(false);
  const observer = new IntersectionObserver(
    ([entry]) => { visible.set(entry.isIntersecting); },
    options,
  );
  effect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); };
  });
  return computed(() => visible());
}

export function useFocus(ref: {
  current: HTMLElement | null;
}): Computed<boolean> {
  const focused = signal(false);
  effect(() => {
    const el = ref.current;
    if (!el) return;
    const onFocus = () => { focused.set(true); };
    const onBlur = () => { focused.set(false); };
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);
    return () => {
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
    };
  });
  return computed(() => focused());
}
