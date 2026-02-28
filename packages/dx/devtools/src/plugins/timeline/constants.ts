import type { TimelineEventType } from '../../core/types';

export type Filter = TimelineEventType | 'all';

export const TYPE_META: Record<
  TimelineEventType,
  { label: string; cls: string }
> = {
  'signal:change':    { label: 'signal',    cls: 'text-[#9b90e6] bg-[rgba(155,144,230,0.14)]' },
  'component:render': { label: 'render',    cls: 'text-[#4ade80] bg-[rgba(74,222,128,0.12)]' },
  'component:mount':  { label: 'mount',     cls: 'text-[#0ea57a] bg-[rgba(14,165,122,0.14)]' },
  'component:unmount':{ label: 'unmount',   cls: 'text-[#dc2626] bg-[rgba(220,38,38,0.14)]' },
  lifecycle:          { label: 'lifecycle', cls: 'text-[#d97706] bg-[rgba(217,119,6,0.14)]' },
  'method:call':      { label: 'method',    cls: 'text-[#7c6dd6] bg-[rgba(124,109,214,0.14)]' },
};

export const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'signal:change', label: 'Signals' },
  { value: 'component:render', label: 'Renders' },
  { value: 'component:mount', label: 'Mount' },
  { value: 'lifecycle', label: 'Lifecycle' },
  { value: 'method:call', label: 'Methods' },
];
