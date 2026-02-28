type Handler<T = unknown> = (payload: T) => void;

export class EventBus {
  private readonly handlers = new Map<string, Set<Handler>>();

  on<T = unknown>(event: string, handler: Handler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    (this.handlers.get(event) as Set<Handler>).add(handler as Handler);
    return () => this.handlers.get(event)?.delete(handler as Handler);
  }

  emit(event: string, payload: unknown): void {
    this.handlers.get(event)?.forEach((h) => {
      h(payload);
    });
  }
}
