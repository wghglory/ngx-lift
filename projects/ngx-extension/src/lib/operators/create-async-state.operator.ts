import {HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, pipe, startWith, tap, UnaryFunction} from 'rxjs';

import {AsyncState} from '../models/async-state.model';

/**
 * Custom operator for API calls with loading, error, and data states.
 *
 * Usage 1: Simple 1 request
 * data$ = this.shopService.products$.pipe(
 *   createAsyncState(
 *     res => console.log('Side effect if success: ' + res),
 *     error => console.error('Side effect if error: ' + error.message)
 *   )
 * );
 *
 * Usage 2: Dependent request
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
 * @param callback Successful callback (side effect), e.g., close dialog
 * @param errorCallback Error callback, e.g., send toast alert
 */
export function createAsyncState<T>(
  callback?: (source: T) => void,
  errorCallback?: (error: HttpErrorResponse) => void,
): UnaryFunction<Observable<T>, Observable<AsyncState<T>>> {
  return pipe(
    map((data) => ({loading: false, error: null, data})),
    tap({
      next: (res) => callback?.(res.data),
      error: (err) => errorCallback?.(err),
    }),
    startWith({loading: true, error: null, data: null}),
    // retry(1), // if you want to add retry
    catchError((error) => of({loading: false, error, data: null})),
  );
}
