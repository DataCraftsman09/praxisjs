import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

import { TYPE_META } from "../constants";

import type { TimelineEventType } from "@core/types";

@Component()
export class Badge extends StatelessComponent<{ type: TimelineEventType }> {
  render() {
    const meta = TYPE_META[this.props.type];
    return (
      <span
        class={`text-[9px] px-[6px] py-[2px] rounded font-bold uppercase tracking-[0.07em] shrink-0 ${meta.cls}`}
      >
        {meta.label}
      </span>
    );
  }
}
