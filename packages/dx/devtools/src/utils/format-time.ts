export function time(ts: number, prefix?: string): string {
  const localPrefix = prefix ? ` ${prefix}` : "";
  const diff = Date.now() - ts;
  if (diff < 1000) return `${diff.toString()}ms${localPrefix}`;
  if (diff < 60_000) return `${(diff / 1000).toFixed(1)}s${localPrefix}`;
  return `${Math.floor(diff / 60_000).toString()}m${localPrefix}`;
}
