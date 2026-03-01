import { EmptyState } from "@shared/empty-state";

import { signal, onMount, onUnmount } from "@praxisjs/core";

import { TimelineRow } from "./components/timeline-row";
import { FILTERS, type Filter } from "./constants";

import type { Registry } from "@core/registry";
import type { TimelineEntry } from "@core/types";

export function TimelineTab({ registry }: { registry: Registry }) {
  const entries = signal<TimelineEntry[]>(registry.getTimeline());
  const filter = signal<Filter>("all");
  const paused = signal(false);

  let handlers: Array<() => void> = [];
  onMount(() => {
    handlers = [
      registry.bus.on("timeline:push", () => {
        if (!paused()) entries.set(registry.getTimeline());
      }),
    ];
  });

  onUnmount(() => {
    handlers.forEach((off) => {
      off();
    });
  });

  return (
    <div class="flex flex-col h-full overflow-hidden">
      <div class="flex items-center gap-[3px] px-2 py-2 border-b border-border bg-bg shrink-0 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              filter.set(f.value);
            }}
            class={() =>
              filter() === f.value
                ? "text-[11px] px-2 py-[3px] rounded cursor-pointer font-sans bg-soft text-accent font-semibold"
                : "text-[11px] px-2 py-[3px] rounded cursor-pointer font-sans text-muted hover:text-text hover:bg-section transition-colors duration-150"
            }
          >
            {f.label}
          </button>
        ))}

        <div class="flex-1" />

        <button
          onClick={() => {
            if (paused()) entries.set(registry.getTimeline());
            paused.update((v) => !v);
          }}
          class={() =>
            `text-[11px] px-2 py-[3px] rounded cursor-pointer font-sans border border-border transition-colors duration-150 ${
              paused() ? "text-warn border-warn" : "text-muted hover:text-text"
            }`
          }
        >
          {() => (paused() ? "Resume" : "Pause")}
        </button>

        <button
          onClick={() => {
            entries.set([]);
          }}
          class="text-[11px] px-2 py-[3px] rounded cursor-pointer font-sans border border-border text-muted hover:text-text transition-colors duration-150"
        >
          Clear
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        {() => {
          const f = filter();
          const filtered =
            f === "all"
              ? entries()
              : entries().filter(
                  (e) =>
                    e.type === f ||
                    (f === "component:mount" && e.type === "component:unmount"),
                );

          if (filtered.length === 0) {
            return (
              <EmptyState message="No events yet. Interact with your app to see the timeline." />
            );
          }

          return [...filtered]
            .reverse()
            .map((e) => <TimelineRow key={e.id} entry={e} />);
        }}
      </div>
    </div>
  );
}
