import { EmptyState } from "@shared/empty-state";
import { SearchInput } from "@shared/search-input";

import { signal, onMount, onUnmount } from "@verbose/core";

import { SignalDetail } from "./components/signal-detail";
import { SignalRow } from "./components/signal-row";

import type { Registry } from "@core/registry";
import type { SignalEntry } from "@core/types";

export function SignalsTab({ registry }: { registry: Registry }) {
  const signals = signal<SignalEntry[]>(registry.getSignals());
  const search = signal("");
  const selectedId = signal<string | null>(null);

  let handlers: Array<() => void> = [];
  onMount(() => {
    handlers = [
      registry.bus.on("signal:registered", () => {
        signals.set(registry.getSignals());
      }),
      registry.bus.on("signal:changed", () => {
        signals.set(registry.getSignals());
      }),
    ];
  });

  onUnmount(() => {
    handlers.forEach((off) => {
      off();
    });
  });

  return (
    <div class="flex h-full overflow-hidden">
      <div class="flex-1 flex flex-col overflow-hidden min-w-0">
        <div class="px-3 py-2 border-b border-border bg-bg shrink-0">
          <SearchInput
            placeholder="Search signals…"
            onInput={(v) => {
              search.set(v);
            }}
          />
        </div>

        <div class="grid grid-cols-[1.2fr_0.8fr_1fr_auto] items-center px-3 h-7 text-[9px] text-subtle font-bold tracking-[0.12em] uppercase border-b border-border bg-section gap-2 shrink-0">
          <span>Signal</span>
          <span>Component</span>
          <span>Value</span>
          <span>Age</span>
        </div>

        <div class="flex-1 overflow-y-auto">
          {() => {
            const q = search().toLowerCase();
            const filtered =
              q === ""
                ? signals()
                : signals().filter(
                    (s) =>
                      s.label.toLowerCase().includes(q) ||
                      s.componentName.toLowerCase().includes(q),
                  );

            if (filtered.length === 0) {
              return (
                <EmptyState
                  message={
                    signals().length === 0
                      ? "No signals tracked. Add @Debug() on top of @State() properties."
                      : "No signals match your search."
                  }
                />
              );
            }

            return filtered.map((s) => (
              <SignalRow
                key={s.id}
                entry={s}
                selected={selectedId() === s.id}
                onClick={() => {
                  selectedId.update((id) => (id === s.id ? null : s.id));
                }}
              />
            ));
          }}
        </div>
      </div>

      {() => {
        const id = selectedId();
        const entry = id ? (signals().find((s) => s.id === id) ?? null) : null;
        return entry ? <SignalDetail entry={entry} /> : null;
      }}
    </div>
  );
}
