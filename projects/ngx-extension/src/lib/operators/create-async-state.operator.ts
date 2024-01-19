import {HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, Observer, of, pipe, startWith, tap, UnaryFunction} from 'rxjs';

import {AsyncState} from '../models/async-state.model';

/**
 * createAsyncState transforms an Observable of type T into an Observable of AsyncState<T>.
 * AsyncState<T> represents the loading, error, and data states for asynchronous operations.
 *
 * @param observerOrNextForOrigin An optional parameter that can be a partial TapObserver<T> or a function
 *                                to handle the next value or error in the original Observable.
 * @returns UnaryFunction<Observable<T>, Observable<AsyncState<T>>> A function that takes an Observable of type T
 *          and returns an Observable of AsyncState<T>.
 *
 * Usage 1: Simple request
 * data$ = this.shopService.products$.pipe(
 *   createAsyncState({
 *    next: res => console.log('Side effect if success: ' + res),
 *    error: error => console.error('Side effect if error: ' + error.message)
 *   })
 * );
 *
 * Usage 2: Dependent requests
 * data$ = firstCall$.pipe(
 *   switchMap(() => this.shopService.products$),
 *   createAsyncState()
 * );
 *
 * Another implementation thought when refreshing the data: instead of startWith, `merge of` emit as the trigger
 *
 * subject.pipe(
 *   switchMap(() => merge(
 *     of({ loading: true, error: null, data: null }),
 *     this.service.apiCall().pipe(
 *       map(data => ({ loading: false, error: null, data })),
 *       tap({
 *         next: res => callback?.(res.data),
 *         error: err => errorCallback?.(err),
 *       }),
 *       catchError(error => of({ loading: false, error, data: null })),
 *     ),
 *   ))
 * )
 *
 */
export function createAsyncState<T>(
  // TODO: change Observer to TapObserver for rxjs
  observerOrNextForOrigin?: Partial<Observer<T>> | ((value: T) => void),
): UnaryFunction<Observable<T>, Observable<AsyncState<T>>> {
  return pipe(
    tap(observerOrNextForOrigin),
    map((data) => ({loading: false, error: null, data})),
    startWith({loading: true, error: null, data: null}),
    // retry(1), // if you want to add retry
    catchError((error: HttpErrorResponse) => of({loading: false, error, data: null})),
  );
}
