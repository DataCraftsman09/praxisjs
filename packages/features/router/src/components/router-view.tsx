import { computed } from "@verbose/core";
import type { VNode } from "@verbose/shared";

import { useRouter } from "../router";

export function RouterView(): VNode {
  const router = useRouter();

  const view = computed(() => {
    const component = router.currentComponent();
    if (!component) return null;
    return (component as () => VNode)();
  });

  return (<div data-router-view="true">{() => view()}</div>);
}
