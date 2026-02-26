export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type ReactiveChildren = Primitive | VNode | VNode[] | ReactiveChildren[];

export type Children = Primitive | VNode | ReactiveChildren | Children[];

export interface VNode {
  type: string | ComponentConstructor | FunctionComponent;
  props: Record<string, unknown>;
  children: Children[];
  key?: string | number;
}

export type FunctionComponent<P = {}> = (
  props: P & { children?: Children[] },
) => VNode | null;

export interface ComponentConstructor<P = {}> {
  new (props: P): ComponentInstance;
  isComponent: true;
}

export interface ComponentInstance {}
