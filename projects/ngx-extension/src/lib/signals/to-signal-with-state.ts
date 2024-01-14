import {HttpErrorResponse} from '@angular/common/http';
import {computed, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, Observable, of} from 'rxjs';

/**
 * Generates three signals from an observable, similar to the createAsyncState operator.
 * Used mainly for the initial GET request.
 *
 * @param {Observable<T | null>} obs$ - The observable to convert to a signal with state.
 * @param {any} initialValue - The initial value for the signal state.
 * @template T - The type of data emitted by the observable.
 * @template E - The type of error (defaults to HttpErrorResponse).
 * @returns {{
 *   loading: Signal<boolean>;
 *   error: Signal<E | null>;
 *   data: Signal<T | null>;
 * }} - The signal with state object containing loading, error, and data signals.
 */
export function toSignalWithState<T, E = HttpErrorResponse>(
  obs$: Observable<T | null>,
  initialValue = {loading: true, error: null, data: null},
): {
  loading: Signal<boolean>;
  error: Signal<E | null>;
  data: Signal<T | null>;
} {
  const source = toSignal(
    obs$.pipe(
      map((data) => ({loading: false, error: null, data})),
      catchError((error: E) => of({loading: false, error, data: null})),
    ),
    {initialValue},
  );

  const loading = computed(() => source().loading);
  const data = computed(() => source().data);
  const error = computed(() => source().error);

  return {loading, data, error};
}
