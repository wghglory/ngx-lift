import {combineLatest, Observable, startWith, Subject} from 'rxjs';

export function combineLatestEager<T extends Observable<unknown>[]>(
  sources: T,
  startWithNullForAll?: boolean,
): Observable<{[K in keyof T]: T[K] extends Observable<infer U> ? U | null : never}>;

export function combineLatestEager<T extends Record<string, Observable<unknown>>>(
  sources: T,
  startWithNullForAll?: boolean,
): Observable<{[K in keyof T]: T[K] extends Observable<infer U> ? U | null : never}>;

/**
 * Combines multiple observables into a single observable emitting an array or dictionary
 * of the latest values from each source observable.
 * Adds startWith(null) for each Subject in combineLatest when the second parameter startWithNullForAll is false.
 * When startWithNullForAll is true, each observable will startWith null.
 *
 * @template T - The type of the data in the observables.
 *
 * @param {Array<Observable<T>> | Record<string, Observable<T>>} sources -
 *   An array of observables or a dictionary of observables to be combined.
 *
 * @param {boolean} [startWithNullForAll=false] -
 *   Determines whether to start each observable with a `null` value.
 *
 * @returns {Observable<Array<T | null> | Record<string, T | null>>} -
 *   An observable emitting an array or dictionary of the latest values from each source observable.
 *
 * @throws {Error} -
 *   Throws an error if the provided argument is not an array of observables or a dictionary of observables.
 */
export function combineLatestEager<T>(
  sources: Array<Observable<T>> | Record<string, Observable<T>>,
  startWithNullForAll = false,
): Observable<Array<T | null> | Record<string, T | null>> {
  if (Array.isArray(sources)) {
    // If sources is an array of observables
    return combineLatest(
      sources.map((obs$) => {
        if (startWithNullForAll) {
          return obs$.pipe(startWith(null));
        } else {
          // Check if obs$ is a Subject, if true, apply startWith(null)
          return obs$ instanceof Subject ? obs$.pipe(startWith(null)) : obs$;
        }
      }),
    );
  } else if (typeof sources === 'object' && sources !== null) {
    // If sources is a dictionary of observables
    const observables: Record<string, Observable<T | null>> = {};

    for (const [key, value] of Object.entries(sources)) {
      if (startWithNullForAll) {
        observables[key] = value.pipe(startWith(null));
      } else {
        // Check if obs$ is a Subject, if true, apply startWith(null)
        observables[key] = value instanceof Subject ? value.pipe(startWith(null)) : value;
      }
    }

    return combineLatest(observables);
  } else {
    throw new Error(
      `Invalid argument type. Please provide an array of observables or a dictionary of observables. Received: ${typeof sources}`,
    );
  }
}
