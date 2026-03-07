import { SVG_NAMESPACE, SVG_TAGS } from "./constants";

export function createElement(tag: string): HTMLElement | SVGElement {
  return SVG_TAGS.has(tag)
    ? (document.createElementNS(SVG_NAMESPACE, tag))
    : document.createElement(tag);
}
