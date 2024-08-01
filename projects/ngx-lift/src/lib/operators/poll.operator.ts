/* eslint-disable @typescript-eslint/no-explicit-any */
import {catchError, EMPTY, exhaustMap, map, merge, Observable, of, share, startWith, timer} from 'rxjs';

import {AsyncState} from '../models';

/**
 * Polls data at a specified interval and can be triggered manually.
 *
 * @template Data - The type of the data emitted by the polling function.
 * @template Input - The type of the input parameter used to build polling parameters.
 * @param {object} options - The configuration options for polling.
 * @param {number} options.interval - The interval in milliseconds between each poll.
 * @param {(params: any) => Observable<Data>} options.pollingFn - A function that returns an Observable emitting the polled data.
 * @param {(input: Input | null) => any} [options.paramsBuilder] - An optional function that builds parameters for the polling function based on the input.
 * @param {Observable<Input>} [options.trigger] - An optional Observable that triggers a manual poll.
 * @returns {Observable<AsyncState<Data>>} An Observable emitting objects representing the state of the asynchronous operation.
 */
export function poll<Data, Input>(options: {
  interval: number;
  pollingFn: (params: any) => Observable<Data>;
  paramsBuilder?: (input: Input | null) => any;
  trigger?: Observable<Input>;
}): Observable<AsyncState<Data>> {
  let latestInput: Input | null = null;

  return merge(options.trigger || EMPTY, timer(0, options.interval)).pipe(
    exhaustMap((input) => {
      let params: any;

      const isManualTrigger = typeof input !== 'number';
      if (isManualTrigger) {
        latestInput = input;
      }
      if (options.paramsBuilder) {
        params = options.paramsBuilder(latestInput);
      }

      const isFirstRequest = input === 0;
      const shouldShowLoading = isManualTrigger || isFirstRequest;

      let observable = options.pollingFn(params).pipe(
        map((data) => ({loading: false, error: null, data})),
        catchError((error) => of({loading: false, error, data: null})),
      );

      if (shouldShowLoading) {
        observable = observable.pipe(startWith({loading: true, error: null, data: null}));
      }

      return observable;
    }),
    share(),
  );
}
