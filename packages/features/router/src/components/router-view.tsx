import { StatelessComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";

import { useRouter } from "../router";

@Component()
export class RouterView extends StatelessComponent {
  render() {
    const router = useRouter();

    return (
      <div data-router-view="true">
        {() => {
          const RouteComponent = router.currentComponent();
          return RouteComponent ? <RouteComponent /> : null;
        }}
      </div>
    );
  }
}
