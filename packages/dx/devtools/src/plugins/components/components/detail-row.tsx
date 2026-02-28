export function DetailRow({
  k,
  v,
  signal: isSignal,
}: {
  k: string;
  v: string;
  signal?: boolean;
}) {
  return (
    <div class="flex justify-between items-center px-3 py-2 border-b border-border gap-3">
      <span
        class={`text-[11px] font-mono shrink-0 ${isSignal ? "text-accent" : "text-muted"}`}
      >
        {k}
      </span>
      <span class="text-[11px] text-text font-mono truncate text-right">
        {v}
      </span>
    </div>
  );
}
