export interface HistoryEntry {
  value: unknown;
  timestamp: number;
}

export interface SignalEntry {
  id: string;
  label: string;
  componentId: string;
  componentName: string;
  value: unknown;
  history: HistoryEntry[];
  changedAt: number;
}

export interface LifecycleEvent {
  hook: string;
  timestamp: number;
}

export interface ComponentEntry {
  id: string;
  name: string;
  renderCount: number;
  lastRenderDuration: number;
  mountedAt: number;
  status: 'mounted' | 'unmounted';
  lifecycle: LifecycleEvent[];
}

export type TimelineEventType =
  | 'signal:change'
  | 'component:render'
  | 'component:mount'
  | 'component:unmount'
  | 'lifecycle'
  | 'method:call';

export interface TimelineEntry {
  id: string;
  type: TimelineEventType;
  label: string;
  timestamp: number;
  data: Record<string, unknown>;
}
