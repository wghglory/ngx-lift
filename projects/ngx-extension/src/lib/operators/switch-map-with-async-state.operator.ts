import {HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, OperatorFunction, scan, startWith, switchMap} from 'rxjs';

import {AsyncState} from '../models/async-state.model';

/**
 * Custom RxJS operator that uses switchMap to handle asynchronous operations and
 * transforms the emitted values into an AsyncState object.
 *
 * @template T - The type of data emitted by the observable returned by the observableFunction.
 * @template K - The type of value emitted by the source observable.
 * @template E - The type of error that can be encountered during the asynchronous operation.
 *
 * @param {function(K): Observable<T>} observableFunction - A function that takes a value emitted by the source
 * observable and returns an observable representing an asynchronous operation.
 *
 * @returns {OperatorFunction<K, AsyncState<T, E>>} - An RxJS operator that transforms the source observable into
 * an observable of AsyncState objects.
 *
 * @throws {TypeError} Will throw an error if observableFunction is not a function.
 *
 * @example
 * // Usage of the switchMapWithAsyncState operator
 * const source$ = new BehaviorSubject<number>(1);
 *
 * const asyncOperation = (value: number) => {
 *   return of(value * 2).pipe(delay(1000));
 * };
 *
 * const result$ = source$.pipe(switchMapWithAsyncState(asyncOperation));
 * result$.subscribe((state) => {
 *   console.log(state); // Outputs AsyncState objects with loading, data, and error properties.
 * });
 */
export function switchMapWithAsyncState<T, K, E = HttpErrorResponse>(
  observableFunction: (value: K) => Observable<T>,
): OperatorFunction<K, AsyncState<T, E>> {
  return (source: Observable<K>) =>
    source.pipe(
      switchMap((value) =>
        observableFunction(value).pipe(
          map((data) => ({data, loading: false, error: null})),
          catchError((error: E) => of({error, loading: false, data: null})),
          startWith({error: null, loading: true, data: null}),
        ),
      ),
      // Combines the emitted AsyncState objects into a cumulative state
      scan((state: AsyncState<T, E>, change: AsyncState<T, E>) => ({...state, ...change})),
    );
}
