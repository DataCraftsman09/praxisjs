import { signal, computed } from "@praxisjs/core";
import type { Signal, Computed } from "@praxisjs/shared";

export function useClipboard(resetDelay = 2000) {
  const copied = signal(false);
  const content = signal("");
  async function copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      content.set(text);
      copied.set(true);
      setTimeout(() => { copied.set(false); }, resetDelay);
    } catch {
      console.warn("[useClipboard] Falha ao copiar");
    }
  }
  return {
    copy,
    copied: computed(() => copied()),
    content: computed(() => content()),
  };
}

export function useGeolocation(options?: PositionOptions) {
  const lat = signal<number | null>(null);
  const lng = signal<number | null>(null);
  const error = signal<GeolocationPositionError | null>(null);
  const loading = signal(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      lat.set(pos.coords.latitude);
      lng.set(pos.coords.longitude);
      loading.set(false);
    },
    (err) => {
      error.set(err);
      loading.set(false);
    },
    options,
  );
  return {
    lat: computed(() => lat()),
    lng: computed(() => lng()),
    error: computed(() => error()),
    loading: computed(() => loading()),
  };
}

export function useTimeAgo(
  source:
    | Signal<Date | number>
    | Computed<Date | number>
    | (() => Date | number),
  locale = "pt-BR",
): Computed<string> {
  const read = typeof source === "function" ? source : source;
  const tick = signal(Date.now());
  setInterval(() => { tick.set(Date.now()); }, 60_000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  return computed(() => {
    void tick();
    const diff = new Date(read() as Date).getTime() - Date.now();
    const abs = Math.abs(diff);
    if (abs < 60_000) return rtf.format(Math.round(diff / 1000), "second");
    if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), "minute");
    if (abs < 86_400_000)
      return rtf.format(Math.round(diff / 3_600_000), "hour");
    if (abs < 2_592_000_000)
      return rtf.format(Math.round(diff / 86_400_000), "day");
    return rtf.format(Math.round(diff / 2_592_000_000), "month");
  });
}

export interface PaginationOptions {
  total: number;
  pageSize: number;
  initial?: number;
}

export function usePagination(
  options: PaginationOptions | (() => PaginationOptions),
) {
  const getOpts = typeof options === "function" ? options : () => options;
  const _page = signal(getOpts().initial ?? 1);
  const totalPages = computed(() =>
    Math.ceil(getOpts().total / getOpts().pageSize),
  );
  const page = computed(() => Math.min(_page(), totalPages()));
  const offset = computed(() => (page() - 1) * getOpts().pageSize);
  const hasNext = computed(() => page() < totalPages());
  const hasPrev = computed(() => page() > 1);
  return {
    page,
    totalPages,
    offset,
    hasNext,
    hasPrev,
    pageSize: computed(() => getOpts().pageSize),
    pages: computed(() =>
      Array.from({ length: totalPages() }, (_, i) => i + 1),
    ),
    next() {
      if (hasNext()) _page.update((p) => p + 1);
    },
    prev() {
      if (hasPrev()) _page.update((p) => p - 1);
    },
    goTo(p: number) {
      _page.set(Math.max(1, Math.min(p, totalPages())));
    },
    first() {
      _page.set(1);
    },
    last() {
      _page.set(totalPages());
    },
  };
}
