import {catchError, map, Observable, of, OperatorFunction, scan, startWith, switchMap} from 'rxjs';

import {AsyncState} from '../models/async-state.model';

/**
 * Operator that performs a switchMap operation on the source Observable,
 * calling the provided observableFunction with the emitted values.
 * It transforms the emitted values into AsyncState objects.
 *
 * @param observableFunction A function that takes a value emitted by the source Observable
 *                           and returns an Observable of the desired type (T).
 * @returns An RxJS operator function that transforms source values into AsyncState objects.
 */
export function switchMapWithAsyncState<T, K>(
  observableFunction: (value: K) => Observable<T>,
): OperatorFunction<K, AsyncState<T>> {
  return (source: Observable<K>) =>
    source.pipe(
      switchMap((value) =>
        observableFunction(value).pipe(
          map((data) => ({data, loading: false, error: null})),
          catchError((error) => of({error, loading: false, data: null})),
          startWith({error: null, loading: true, data: null}),
        ),
      ),
      // Combines the emitted AsyncState objects into a cumulative state
      scan((state: AsyncState<T>, change: AsyncState<T>) => ({...state, ...change})),
    );
}
