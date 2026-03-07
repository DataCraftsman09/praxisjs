import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

import type { ComponentEntry } from "@core/types";

@Component()
export class StatusDot extends StatelessComponent<{
  status: ComponentEntry["status"];
}> {
  render() {
    const { status } = this.props;
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
}
