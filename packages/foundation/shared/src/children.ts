export const flattenChildren = (children: unknown, out: unknown[] = []): unknown[] => {
  if (Array.isArray(children)) {
    for (const child of children) {
      flattenChildren(child, out);
    }
  } else {
    out.push(children);
  }
  return out;
};
