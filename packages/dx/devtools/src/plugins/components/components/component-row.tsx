import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

import { StatusDot } from "./status-dot";

import type { ComponentEntry } from "@core/types";

@Component()
export class ComponentRow extends StatelessComponent<{
  entry: ComponentEntry;
  selected: () => boolean;
  onClick: () => void;
}> {
  render() {
    const { entry, selected, onClick } = this.props;
    return (
      <div
        onClick={onClick}
        class={() =>
          `relative flex items-center gap-2 px-3 py-2 cursor-pointer border-b border-border transition-colors duration-100 ${
            selected() ? "bg-selected" : "hover:bg-section"
          }`
        }
      >
        {() =>
          selected() && (
            <span class="absolute left-0 top-0 bottom-0 w-[2px] bg-accent rounded-r" />
          )
        }
        <StatusDot status={entry.status} />
        <span class="text-accent font-mono text-[11px] flex-1 truncate pl-1">
          &lt;{entry.name}&gt;
        </span>
        <span class="text-muted text-[11px] tabular-nums">
          ×{entry.renderCount}
        </span>
        <span
          class={`text-[10px] tabular-nums w-12 text-right ${entry.lastRenderDuration > 16 ? "text-warn" : "text-subtle"}`}
        >
          {entry.lastRenderDuration.toFixed(1)}ms
        </span>
      </div>
    );
  }
}
