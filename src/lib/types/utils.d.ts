type Shift<T extends any[]> = ((...t: T) => any) extends (
  first: any,
  ...rest: infer Rest
) => any
  ? Rest
  : never

type ShiftUnion<P extends PropertyKey, T extends any[]> = T extends any[]
  ? T[0] extends P
    ? Shift<T>
    : never
  : never

type DeepRequired<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> &
      Required<{
        [K in Extract<keyof T, P[0]>]: NonNullable<
          DeepRequired<T[K], ShiftUnion<K, P>>
        >
      }>
  : T

type PathsToStringArray<T extends string> =
  T extends `${infer Head}.${infer Tail}`
    ? [...PathsToStringArray<Head>, ...PathsToStringArray<Tail>]
    : [T]

type DeepNull<T, P extends string> = DeepRequired<T, PathsToStringArray<P>>

type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? partial<T[K]> : T[K]
}
