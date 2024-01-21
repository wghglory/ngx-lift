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
 * Adds startWith(null) for each Subject in combineLatest when the second parameter startWithNullForAll is false.
 * When startWithNullForAll is true, each observable will startWith null.
 * @param sources Observables to be passed in combineLatest
 * @param startWithNullForAll If true, all source observables will startWith null
 * @returns combineLatest operator with Subject pipe(startWith(null))
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
