/**
 * Adds startWith(null) for each source observable in combineLatest.
 */
import {combineLatest, Observable, startWith} from 'rxjs';

// Function overload for arrays of observables
export function combineLatestStartWithNull<T extends Observable<unknown>[]>(
  sources: T,
): Observable<{[K in keyof T]: T[K] extends Observable<infer U> ? U | null : never}>;

// Function overload for dictionaries of observables
export function combineLatestStartWithNull<T extends Record<string, Observable<unknown>>>(
  sources: T,
): Observable<{[K in keyof T]: T[K] extends Observable<infer U> ? U | null : never}>;

// Implementation of the operator
export function combineLatestStartWithNull<T>(
  sources: Array<Observable<T>> | Record<string, Observable<T>>,
): Observable<Array<T | null> | Record<string, T | null>> {
  if (Array.isArray(sources)) {
    // If sources is an array of observables
    return combineLatest(sources.map((obs$) => obs$.pipe(startWith(null))));
  } else if (typeof sources === 'object' && sources !== null) {
    // If sources is a dictionary of observables
    const observables: Record<string, Observable<T | null>> = {};

    for (const [key, value] of Object.entries(sources)) {
      observables[key] = value.pipe(startWith(null));
    }

    // Return the combined observable directly
    return combineLatest(observables);
  } else {
    throw new Error(
      `Invalid argument type. Please provide an array of observables or a dictionary of observables. Received: ${typeof sources}`,
    );
  }
}
