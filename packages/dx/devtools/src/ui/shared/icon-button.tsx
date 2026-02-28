import type { Component } from "@verbose/shared";

export function IconButton({
  title,
  active,
  icon: Icon,
  onClick,
}: {
  title?: string;
  active?: boolean | (() => boolean);
  icon: Component;
  onClick: () => void;
}) {
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
