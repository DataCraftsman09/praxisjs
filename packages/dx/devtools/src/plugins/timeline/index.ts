import { TimelineTab } from "./timeline-tab";

import type { DevtoolsPlugin } from "@plugins/types";

export const TimelinePlugin: DevtoolsPlugin = {
  id: "timeline",
  label: "Timeline",
  component: TimelineTab,
};
