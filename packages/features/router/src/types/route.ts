export type RouteParams = Record<string, string>;
export type RouteQuery = Record<string, string>;

export interface RouteLocation {
  path: string;
  params: RouteParams;
  query: RouteQuery;
  hash: string;
}

export type RouteComponent =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | (new (...args: any[]) => any) // class component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => any); // function component

export interface LazyRouteComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (): Promise<{ default: new (...args: any[]) => any }>;
  readonly __isLazy: true;
}

export interface RouteDefinition {
  path: string;
  component: RouteComponent | LazyRouteComponent;
  children?: RouteDefinition[];
  beforeEnter?: (
    to: RouteLocation,
    from: RouteLocation | null,
  ) => boolean | string | Promise<boolean | string>;
}

export interface CompiledRoute {
  definition: RouteDefinition;
  regex: RegExp;
  paramNames: string[];
}
