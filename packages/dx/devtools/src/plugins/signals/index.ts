import { SignalsTab } from "./signals-tab";

import type { DevtoolsPlugin } from "@plugins/types";

export const SignalsPlugin: DevtoolsPlugin = {
  id: "signals",
  label: "Signals",
  component: SignalsTab,
};
