import type { FunctionComponent } from "@verbose/shared";

import type { Registry } from "@core/registry";

export interface DevtoolsPlugin {
  id: string;
  label: string;
  setup?: (registry: Registry) => void;
  component: FunctionComponent<{ registry: Registry }>;
}
