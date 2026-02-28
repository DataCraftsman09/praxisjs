import { SidePanel } from "@shared/side-panel";
import { formatValue } from "@utils/format-value";

import { DetailRow } from "./detail-row";
import { DetailSection } from "./detail-section";
import { StatusDot } from "./status-dot";

import type { ComponentEntry, SignalEntry } from "@core/types";

export function ComponentDetail({
  entry,
  signals,
}: {
  entry: ComponentEntry;
  signals: SignalEntry[];
}) {
  return (
    <SidePanel>
      <div class="px-3 py-2 border-b border-border flex items-center gap-2 bg-bg shrink-0">
        <StatusDot status={entry.status} />
        <span class="text-accent font-mono text-[11px] font-semibold truncate pl-1">
          &lt;{entry.name}&gt;
        </span>
      </div>

      <div class="flex-1 overflow-y-auto">
        <DetailSection label="Stats">
          <DetailRow k="renders" v={String(entry.renderCount)} />
          <DetailRow
            k="last render"
            v={`${entry.lastRenderDuration.toFixed(3)}ms`}
          />
          <DetailRow k="status" v={entry.status} />
        </DetailSection>

        {signals.length > 0 && (
          <DetailSection label="State">
            {signals.map((s) => (
              <DetailRow
                key={s.id}
                k={s.label}
                v={formatValue(s.value)}
                signal
              />
            ))}
          </DetailSection>
        )}

        {entry.lifecycle.length > 0 && (
          <DetailSection label="Lifecycle">
            {[...entry.lifecycle]
              .reverse()
              .slice(0, 20)
              .map((ev, i) => (
                <div
                  key={String(i)}
                  class="px-3 py-2 flex justify-between items-center border-b border-border"
                >
                  <span class="text-[11px] text-text font-mono">{ev.hook}</span>
                  <span class="text-[10px] text-subtle tabular-nums">
                    {new Date(ev.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
          </DetailSection>
        )}
      </div>
    </SidePanel>
  );
}
