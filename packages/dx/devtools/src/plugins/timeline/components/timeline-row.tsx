import { time } from "@utils/format-time";

import { signal } from "@praxisjs/core";

import { Badge } from "./badge";

import type { TimelineEntry } from "@core/types";

export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const open = signal(false);
  const hasData = Object.keys(entry.data).length > 0;

  return (
    <div class="border-b border-border">
      <div
        onClick={() => {
          if (hasData) open.update((v) => !v);
        }}
        class={`flex items-center gap-2 px-3 py-2 transition-colors duration-100 ${
          hasData ? "cursor-pointer hover:bg-section" : "cursor-default"
        }`}
      >
        <span class="text-subtle text-[10px] w-10 shrink-0 text-right tabular-nums font-mono">
          {time(entry.timestamp)}
        </span>
        <Badge type={entry.type} />
        <span class="flex-1 text-text font-mono text-[11px] truncate">
          {entry.label}
        </span>
        {hasData && (
          <span class="text-subtle text-[11px] shrink-0 w-4 text-center">
            {() => (open() ? "▾" : "▸")}
          </span>
        )}
      </div>

      {() =>
        open() && hasData ? (
          <div class="px-3 py-2 pl-[56px] font-mono text-[11px] bg-section border-t border-border">
            {Object.entries(entry.data).map(([k, v]) => (
              <div key={k} class="flex gap-3 py-[3px]">
                <span class="text-accent shrink-0">{k}:</span>
                <span class="text-muted truncate">
                  {typeof v === "object"
                    ? JSON.stringify(v)
                    : String(v as unknown)}
                </span>
              </div>
            ))}
          </div>
        ) : null
      }
    </div>
  );
}
