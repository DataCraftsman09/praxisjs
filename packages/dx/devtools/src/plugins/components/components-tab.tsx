import { EmptyState } from "@shared/empty-state";

import { signal, effect, peek, onMount, onUnmount } from "@praxisjs/core";

import { ComponentDetail } from "./components/component-detail";
import { ComponentRow } from "./components/component-row";

import type { Registry } from "@core/registry";
import type { ComponentEntry, SignalEntry } from "@core/types";

export function ComponentsTab({ registry }: { registry: Registry }) {
  const components = signal<ComponentEntry[]>(registry.getComponents());
  const selectedId = signal<string | null>(null);
  const sigs = signal<SignalEntry[]>([]);

  const stopSigEffect = effect(() => {
    const id = selectedId();
    sigs.set(id ? registry.getSignalsByComponent(id) : []);
  });

  let handlers: Array<() => void> = [];
  onMount(() => {
    const refresh = () => {
      components.set(registry.getComponents());
      const id = peek(selectedId);
      if (id) sigs.set(registry.getSignalsByComponent(id));
    };
    handlers = [
      "component:registered",
      "component:render",
      "component:unmount",
      "lifecycle",
      "signal:registered",
      "signal:changed",
    ].map((ev) => registry.bus.on(ev, refresh));
  });

  onUnmount(() => {
    stopSigEffect();
    handlers.forEach((off) => {
      off();
    });
  });

  return (
    <div class="flex h-full overflow-hidden">
      <div class="flex-1 flex flex-col overflow-hidden min-w-0">
        <div class="flex items-center px-3 h-7 text-[9px] text-subtle font-bold tracking-[0.12em] uppercase border-b border-border bg-section gap-2 shrink-0">
          <span class="flex-1">Component</span>
          <span>Renders</span>
          <span class="w-12 text-right">Last</span>
        </div>

        <div class="flex-1 overflow-y-auto">
          {() =>
            components().length === 0 ? (
              <EmptyState message="No components tracked. Add @Trace() to component classes." />
            ) : (
              components().map((c) => (
                <ComponentRow
                  key={c.id}
                  entry={c}
                  selected={() => selectedId() === c.id}
                  onClick={() => {
                    selectedId.update((id) => (id === c.id ? null : c.id));
                  }}
                />
              ))
            )
          }
        </div>
      </div>

      {() => {
        const id = selectedId();
        const entry = id
          ? (components().find((c) => c.id === id) ?? null)
          : null;
        return entry ? (
          <ComponentDetail entry={entry} signals={sigs()} />
        ) : null;
      }}
    </div>
  );
}
