import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

@Component()
export class EmptyState extends StatelessComponent<{ message: string }> {
  render() {
    return (
      <div class="flex flex-col items-center justify-center gap-2 py-12">
        <span class="text-subtle text-[20px] leading-none select-none font-mono">
          —
        </span>
        <p class="text-subtle text-[11px] text-center leading-relaxed max-w-[200px]">
          {this.props.message}
        </p>
      </div>
    );
  }
}
