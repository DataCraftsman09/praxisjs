import { ComponentsTab } from "./components-tab";

import type { DevtoolsPlugin } from "@plugins/types";

export const ComponentsPlugin: DevtoolsPlugin = {
  id: "components",
  label: "Components",
  component: ComponentsTab,
};
