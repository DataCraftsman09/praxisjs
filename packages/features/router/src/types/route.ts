export type RouteParams = Record<string, string>;
export type RouteQuery = Record<string, string>;

export interface RouteLocation {
  path: string;
  params: RouteParams;
  query: RouteQuery;
  hash: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteComponent = new (...args: any[]) => any;

export interface RouteDefinition {
  path: string;
  component: RouteComponent;
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
