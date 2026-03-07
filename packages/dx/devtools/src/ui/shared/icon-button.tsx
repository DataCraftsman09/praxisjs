import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";
import type { ComponentElement } from "@praxisjs/shared";

interface IconButtonProps {
  title?: string;
  active?: boolean | (() => boolean);
  icon: ComponentElement;
  onClick: () => void;
}

@Component()
export class IconButton extends StatelessComponent<IconButtonProps> {
  render() {
    const { title, active, icon: Icon, onClick } = this.props;
    return (
      <button
        title={title}
        onClick={onClick}
        class={() => {
          const isActive = typeof active === "function" ? active() : active;
          return `w-[22px] h-[22px] flex items-center justify-center rounded-md text-[11px] cursor-pointer transition-colors duration-150 ${
            isActive
              ? "text-accent bg-soft color-white"
              : "text-subtle hover:color-muted hover:bg-section"
          }`;
        }}
      >
        <Icon />
      </button>
    );
  }
}
