import {ClrDatagridStateInterface} from '@clr/angular';
import {isEqual} from 'lodash-es';
import {debounce, distinctUntilChanged, map, Observable, pairwise, pipe, startWith, timer, UnaryFunction} from 'rxjs';

/**
 * RxJS operator for handling Clarity Datagrid state in observables.
 * Delays emission based on filter changes to simulate typeahead.
 * @returns {UnaryFunction<Observable<ClrDatagridStateInterface | null>, Observable<ClrDatagridStateInterface>>}
 */
export function dgState(): UnaryFunction<
  Observable<ClrDatagridStateInterface | null>,
  Observable<ClrDatagridStateInterface>
> {
  return pipe(
    // Prepare old and new states filters in order to delay.
    pairwise(),
    // Only emit when filter changes. Use timer(500) to defer and simulate typeahead.
    debounce(([prev, curr]) => (isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500))),
    map(([, curr]) => curr),
    // If prev and curr state are the same, no need to emit. E.g., filter was 'a', user types 'aa', and quickly rolls back to 'a'.
    distinctUntilChanged(isEqual),
  );
}

/**
 * RxJS operator for handling Clarity Datagrid state in observables with refresh option.
 * Delays emission based on filter changes to simulate typeahead.
 * @returns {UnaryFunction<Observable<ClrDatagridStateInterface>, Observable<ClrDatagridStateInterface>>}
 */
export function dgStore(): UnaryFunction<Observable<ClrDatagridStateInterface>, Observable<ClrDatagridStateInterface>> {
  return pipe(
    // Prepare old and new states filters in order to delay.
    pairwise(),
    // Only emit when filter changes. Use timer(500) to defer and simulate typeahead.
    debounce(([prev, curr]) => (isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500))),
    map(([, curr]) => curr),
    // Allow refresh with the same state, so remove distinctUntilChanged here.
    startWith({page: {from: -1, to: -1, size: 10, current: 1}}),
  );
}
