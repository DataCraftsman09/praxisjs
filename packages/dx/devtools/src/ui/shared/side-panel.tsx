import type { Children } from "@verbose/shared";

export function SidePanel({
  children,
  width = "280px",
}: {
  children?: Children;
  width?: string;
}) {
  return (
    <div
      class="shrink-0 border-l border-border flex flex-col overflow-hidden"
      style={{ width }}
    >
      {children}
    </div>
  );
}
