/* eslint-disable @typescript-eslint/no-explicit-any */
import {Signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {
  catchError,
  EMPTY,
  exhaustMap,
  from,
  isObservable,
  map,
  merge,
  Observable,
  of,
  share,
  startWith,
  timer,
} from 'rxjs';

import {AsyncState} from '../models';
import {isPromise} from '../utils/is-promise.util';

/**
 * Polls data at a specified interval and can be triggered manually.
 *
 * @template Data - The type of the data emitted by the polling function.
 * @template Input - The type of the input parameter used to build polling parameters.
 * @param {object} options - The configuration options for polling.
 * @param {number} options.interval - The interval in milliseconds between each poll.
 * @param {(params: any) => Observable<Data> | Data} options.pollingFn - A function that returns an Observable, Promise, or primitive value.
 * @param {Observable<Input> | Signal<Input>} [options.forceRefresh] - An optional Observable or Signal that triggers a manual refresh of the polling function.
 * @param {(input: Input) => any} [options.paramsBuilder] - An optional function that builds parameters for the polling function based on the input. The value emitted by the forceRefresh observable will serve as the parameter.
 * @returns {Observable<AsyncState<Data>>} An Observable emitting objects representing the state of the asynchronous operation.
 */
export function poll<Data>(options: {
  interval: number;
  pollingFn: (params: any) => Observable<Data> | Promise<Data> | Data;
  initialValue?: any;
}): Observable<AsyncState<Data>>;

// forceRefresh output is the pollingFn params' input
export function poll<Data, Input>(options: {
  interval: number;
  pollingFn: (params: Input) => Observable<Data> | Promise<Data> | Data;
  forceRefresh: Observable<Input> | Signal<Input>;
  initialValue?: any;
}): Observable<AsyncState<Data>>;

// paramsBuilder exists, forceRefresh output is the paramsBuilder params' input
export function poll<Data, Input>(options: {
  interval: number;
  pollingFn: (params: any) => Observable<Data> | Promise<Data> | Data;
  forceRefresh: Observable<Input> | Signal<Input>;
  paramsBuilder: (input: Input) => any;
  initialValue?: any;
}): Observable<AsyncState<Data>>;

export function poll<Data, Input>(options: {
  interval: number;
  pollingFn: (params: any) => Observable<Data> | Promise<Data> | Data;
  forceRefresh?: Observable<Input> | Signal<Input>;
  paramsBuilder?: (input: Input) => any;
  initialValue?: any;
}): Observable<AsyncState<Data>> {
  const timerEmitValue = '__timer__emission__';
  const timer$ = timer(0, options.interval).pipe(map((i) => `${timerEmitValue}${i}`));

  const trigger$ =
    options.forceRefresh === undefined
      ? EMPTY
      : isObservable(options.forceRefresh)
        ? options.forceRefresh
        : toObservable(options.forceRefresh);

  let inputByForceRefresh: Input | undefined = undefined; // if forceRefresh is not provided, input will be undefined

  return merge(trigger$, timer$).pipe(
    exhaustMap((input) => {
      // input can be either by forceRefresh or timer
      const isTimerTrigger = typeof input === 'string' && input.includes(timerEmitValue);
      const isManualTrigger = !isTimerTrigger;
      if (isManualTrigger) {
        inputByForceRefresh = input as Input;
      }

      // build params by input
      // if paramsBuilder is provided, params will be the value of this function call
      // if paramsBuilder is not provided, params will be the value emitted by the forceRefresh
      const params = options.paramsBuilder ? options.paramsBuilder(inputByForceRefresh as Input) : inputByForceRefresh;

      // NOTE: using exhaustMap will NOT emit ${timerEmitValue}0 if forceRefresh is not provided
      // using concatMap will emit ${timerEmitValue}0 if forceRefresh is not provided
      const isFirstRequest = input === `${timerEmitValue}0`; // timer first emission when forceRefresh is not provided

      const fnResult = options.pollingFn(params);
      const fnResult$ = isObservable(fnResult) ? fnResult : isPromise(fnResult) ? from(fnResult) : of(fnResult);

      let observable$ = fnResult$.pipe(
        map((data) => ({loading: false, error: null, data})),
        catchError((error) => of({loading: false, error, data: null})),
      );

      if (isFirstRequest) {
        observable$ = observable$.pipe(startWith(options.initialValue ?? {loading: true, error: null, data: null}));
      }
      if (isManualTrigger) {
        observable$ = observable$.pipe(startWith({loading: true, error: null, data: null}));
      }

      return observable$;
    }),
    share(),
  );
}
