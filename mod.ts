export declare const N_: unique symbol;
export type N_ = typeof N_;

export type AnyShape =
  | Bool
  | Num
  | Str
  | Vec<AnyShape>
  | Struct<AnyShape[] | Record<string, AnyShape>>
  | Option<AnyShape>
  | Enum<([string] | [string, AnyShape])[]>;

export abstract class Shape<N> {
  declare [N_]: N;
}

export class Bool extends Shape<boolean> {}
export const bool = new Bool();

export class Num extends Shape<number> {}
export const num = new Num();

export class Str extends Shape<string> {}
export const str = new Str();

export class Vec<T> extends Shape<T[]> {
  constructor(readonly element: Shape<T>) {
    super();
  }
}

export class Struct<Fields extends AnyShape[] | Record<string, AnyShape>>
  extends Shape<{ [Key in keyof Fields]: Fields[Key] extends Shape<infer N> ? N : never }>
{
  constructor(readonly fields: Fields) {
    super();
  }
}

export class Option<N> extends Shape<N | undefined> {
  constructor(readonly some: Shape<N>) {
    super();
  }
}

export class Enum<Members extends ([string] | [string, AnyShape])[]> extends Shape<
  {
    [I in keyof Members]:
      & { type: Members[I][0] }
      & (Members[I] extends [string, Shape<infer N>] ? { value: N } : {});
  }[keyof Members]
> {
  constructor(readonly members: Members) {
    super();
  }
}
