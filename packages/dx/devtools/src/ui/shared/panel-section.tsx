import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";
import type { Children } from "@praxisjs/shared";

@Component()
export class PanelSection extends StatelessComponent<{
  label: string;
  children?: Children;
}> {
  render() {
    return (
      <div class="border-b border-border">
        <div class="px-3 py-[4px] text-[9px] text-subtle font-bold tracking-[0.12em] uppercase bg-section border-b border-border">
          {this.props.label}
        </div>
        {this.props.children}
      </div>
    );
  }
}
