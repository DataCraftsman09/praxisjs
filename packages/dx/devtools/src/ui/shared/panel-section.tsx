import type { Children } from "@verbose/shared";

export function PanelSection({
  label,
  children,
}: {
  label: string;
  children?: Children;
}) {
  return (
    <div class="border-b border-border">
      <div class="px-3 py-[4px] text-[9px] text-subtle font-bold tracking-[0.12em] uppercase bg-section border-b border-border">
        {label}
      </div>
      {children}
    </div>
  );
}
