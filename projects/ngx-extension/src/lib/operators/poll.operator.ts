import {catchError, EMPTY, exhaustMap, map, merge, Observable, of, share, startWith, timer} from 'rxjs';

import {AsyncState} from '../models';

/**
 * Polls the API at a specified interval, handling the triggering of requests and building parameters.
 *
 * @param {Object} options - The options object containing interval, apiCall, paramsBuilder, and trigger
 * @param {number} options.interval - The interval at which to poll the API
 * @param {(params: Record<string, unknown>) => Observable<Data>} options.apiCall - The function to call the API
 * @param {(input: Input | null) => Record<string, unknown>} [options.paramsBuilder] - The function to build parameters based on input
 * @param {Observable<Input>} [options.trigger] - The trigger observable for initiating requests
 * @return {Observable<AsyncState<Data>>} An observable emitting the async state of the API data
 */
export function poll<Data, Input>(options: {
  interval: number;
  apiCall: (params: Record<string, unknown>) => Observable<Data>;
  paramsBuilder?: (input: Input | null) => Record<string, unknown>;
  trigger?: Observable<Input>;
}): Observable<AsyncState<Data>> {
  let latestInput: Input | null = null;

  return merge(options.trigger || EMPTY, timer(0, options.interval)).pipe(
    exhaustMap((input) => {
      let params: Record<string, unknown> = {};

      const triggeredByObservable = typeof input !== 'number';
      if (triggeredByObservable) {
        latestInput = input;
      }
      if (options.paramsBuilder) {
        params = options.paramsBuilder(latestInput);
      }

      const isFirstRequest = input === 0;
      const shouldShowLoading = triggeredByObservable || isFirstRequest;

      let observable = options.apiCall(params).pipe(
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
