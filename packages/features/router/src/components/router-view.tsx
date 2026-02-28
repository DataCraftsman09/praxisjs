import type { VNode } from "@verbose/shared";

import { useRouter } from "../router";

export function RouterView(): VNode {
  const router = useRouter();

  return (
    <div data-router-view="true">
      {() => {
        const Component = router.currentComponent();
        return Component ? <Component /> : null;
      }}
    </div>
  );
}
