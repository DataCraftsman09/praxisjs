import { time } from "@utils/format-time";
import { formatValue } from "@utils/format-value";

import type { SignalEntry } from "@core/types";

export function SignalRow({
  entry,
  selected,
  onClick,
}: {
  entry: SignalEntry;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      class={`relative grid grid-cols-[1.2fr_0.8fr_1fr_auto] items-center px-3 py-2 cursor-pointer border-b border-border transition-colors duration-100 ${
        selected ? "bg-selected" : "hover:bg-section"
      }`}
    >
      {selected && (
        <span class="absolute left-0 top-0 bottom-0 w-[2px] bg-accent rounded-r" />
      )}
      <span class="text-accent font-mono text-[11px] truncate pl-1">
        {entry.label}
      </span>
      <span class="text-muted text-[11px] truncate">{entry.componentName}</span>
      <span class="text-text font-mono text-[11px] truncate">
        {formatValue(entry.value)}
      </span>
      <span class="text-subtle text-[10px] text-right tabular-nums">
        {time(entry.changedAt, "ago")}
      </span>
    </div>
  );
}
