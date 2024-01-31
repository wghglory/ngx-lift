/**
 * Check if a value is empty.
 * @param {T | undefined | null} value - The value to check for emptiness.
 * @returns {boolean} - Returns true if the value is empty, otherwise false.
 */
export function isEmpty<T extends object | string | Array<unknown>>(value: T | undefined | null): value is null {
  if (value == null) return true;

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>).length === 0;
  }

  return false;
}
