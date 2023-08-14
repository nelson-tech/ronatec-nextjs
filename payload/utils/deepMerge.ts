/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...(target as any) }
  if (isObject(target) && isObject(source)) {
    Object.keys(source as object).forEach((key) => {
      if (isObject((source as any)[key])) {
        // @ts-expect-error
        if (!(key in target)) {
          Object.assign(output, { [key]: (source as any)[key] })
        } else {
          output[key] = deepMerge((target as any)[key], (source as any)[key])
        }
      } else {
        Object.assign(output, { [key]: (source as any)[key] })
      }
    })
  }

  return output
}
