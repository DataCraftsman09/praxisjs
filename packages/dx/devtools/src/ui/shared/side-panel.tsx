import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";
import type { Children } from "@praxisjs/shared";

@Component()
export class SidePanel extends StatelessComponent<{
  children?: Children;
  width?: string;
}> {
  render() {
    const { children, width = "280px" } = this.props;
    return (
      <div
        class="shrink-0 border-l border-border flex flex-col overflow-hidden"
        style={{ width }}
      >
        {children}
      </div>
    );
  }
}
