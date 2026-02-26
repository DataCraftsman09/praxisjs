export type Effect = () => void;

export let activeEffect: Effect | null = null;
const effectStack: Effect[] = [];

export function track(effect: Effect) {
  const subscriber = effect;
  effectStack.push(subscriber);
  activeEffect = subscriber;
  try {
    subscriber();
  } finally {
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1] || null;
  }
}

export function runEffect(effect: Effect | null) {
  activeEffect = effect;
}

type Cleanup = (() => void) | undefined;

export function effect(fn: () => Cleanup) {
  let cleanup: Cleanup;

  const wrappedEffect = () => {
    cleanup?.();
    const prevEffect = activeEffect;
    activeEffect = wrappedEffect;
    try {
      cleanup = fn();
    } finally {
      activeEffect = prevEffect;
    }
  };

  wrappedEffect();

  return () => {
    cleanup?.();
  };
}
