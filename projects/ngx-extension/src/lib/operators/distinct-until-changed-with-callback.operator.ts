import {Observable, OperatorFunction, Subscriber, TeardownLogic} from 'rxjs';

/**
 * Returns an OperatorFunction that filters out consecutive values from the source Observable
 * if they are equal according to the provided compare function.
 * When a value is emitted that is different from the previous value,
 * the onChangeCallback function is called with the new value.
 * The OperatorFunction also emits the new value to the subscriber.
 *
 * @param {function} onChangeCallback - A callback function that accepts the new value
 *        when it is different from the previous value.
 * @param {function} comparator - A function that compares two values of type T
 *        and returns true if they are equal, false otherwise.
 * @return {OperatorFunction} An OperatorFunction that filters out consecutive equal values
 *         and calls the onChangeCallback function.
 *
 * Example 1:
 * const source$ = new Observable<number>((observer) => {
 *   observer.next(1);
 *   observer.next(2);
 *   observer.next(2);
 *   observer.next(3);
 *   observer.next(3);
 *   observer.next(4);
 *   observer.next(5);
 *   observer.complete();
 * });
 *
 * const distinctUntilChangedWithCallback$ = source$.pipe(
 *   distinctUntilChangedWithCallback(
 *     (value) => console.log(`Value changed to: ${value}`),
 *     (prev, curr) => prev === curr,
 *   ),
 * );
 * distinctUntilChangedWithCallback$.subscribe((res) => console.log(res));
 *
 *
 * Example 2:
 * distinctUntilChangedWithCallback<RDEValue<OseInstance>[]>(
 *   () => {
 *     this.store.dispatch(
 *       addToast({
 *         toast: {
 *           type: VmwToastType.SUCCESS,
 *           title: this.l10nService.getMessage('STATUS_CHANGE'),
 *           description: this.l10nService.getMessage('STATUS_CHANGE_DESC'),
 *         },
 *       }),
 *     );
 *   },
 *   (prev, current) =>
 *     prev.every((prevInstance, index) => instanceComparator(prevInstance.entity, current[index].entity)),
 * );
 */
export function distinctUntilChangedWithCallback<T>(
  onChangeCallback: (currentValue: T) => void,
  comparator: (previousValue: T, currentValue: T) => boolean = (prev, curr) => prev === curr,
): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    new Observable<T>((subscriber: Subscriber<T>): TeardownLogic => {
      let hasFirstValue = false;
      let previousValue: T;

      const subscription = source.subscribe({
        next: (currentValue: T) => {
          if (hasFirstValue) {
            if (!comparator(previousValue, currentValue)) {
              onChangeCallback(currentValue);
              previousValue = currentValue;
              subscriber.next(currentValue);
            }
          } else {
            previousValue = currentValue;
            hasFirstValue = true;
            subscriber.next(currentValue);
          }
        },
        error: (err: unknown) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });

      return () => subscription.unsubscribe();
    });
}
