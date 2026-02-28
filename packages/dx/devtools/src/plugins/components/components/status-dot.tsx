import type { ComponentEntry } from "@core/types";

export function StatusDot({ status }: { status: ComponentEntry["status"] }) {
  return (
    <span
      class={`inline-block w-[6px] h-[6px] rounded-full shrink-0 ${status === "mounted" ? "bg-success" : "bg-subtle"}`}
      style={
        status === "mounted"
          ? { boxShadow: "0 0 6px rgba(14,165,122,0.7)" }
          : undefined
      }
    />
  );
}
