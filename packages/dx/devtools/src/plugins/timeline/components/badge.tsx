import { TYPE_META } from "../constants";

import type { TimelineEventType } from "@core/types";

export function Badge({ type }: { type: TimelineEventType }) {
  const meta = TYPE_META[type];
  return (
    <span
      class={`text-[9px] px-[6px] py-[2px] rounded font-bold uppercase tracking-[0.07em] shrink-0 ${meta.cls}`}
    >
      {meta.label}
    </span>
  );
}
