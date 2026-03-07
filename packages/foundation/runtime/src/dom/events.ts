import type { Scope } from "../scope";

export function addEvent(
  el: Element,
  eventName: string,
  handler: EventListener,
  scope: Scope,
): void {
  el.addEventListener(eventName, handler);
  scope.add(() => { el.removeEventListener(eventName, handler); });
}
