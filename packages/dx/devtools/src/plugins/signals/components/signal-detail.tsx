import { PanelSection } from "@shared/panel-section";
import { SidePanel } from "@shared/side-panel";
import { time } from "@utils/format-time";
import { formatValue } from "@utils/format-value";

import type { SignalEntry } from "@core/types";

export function SignalDetail({ entry }: { entry: SignalEntry }) {
  return (
    <SidePanel width="260px">
      <PanelSection label="History">
        <div class="overflow-y-auto">
          {[...entry.history].reverse().map((h, i) => (
            <div
              key={String(i)}
              class="px-3 py-2 border-b border-border flex justify-between items-center gap-3"
            >
              <span class="font-mono text-[11px] text-text truncate">
                {formatValue(h.value)}
              </span>
              <span class="text-[10px] text-subtle shrink-0 tabular-nums">
                {time(h.timestamp, "ago")}
              </span>
            </div>
          ))}
          {entry.history.length === 0 && (
            <p class="px-3 py-6 text-[11px] text-subtle text-center">
              No history yet.
            </p>
          )}
        </div>
      </PanelSection>
    </SidePanel>
  );
}
