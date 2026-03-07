import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

@Component()
export class DetailRow extends StatelessComponent<{
  k: string;
  v: string;
  signal?: boolean;
}> {
  render() {
    const { k, v, signal: isSignal } = this.props;
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
}
