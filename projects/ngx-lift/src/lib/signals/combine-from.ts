/* eslint-disable @typescript-eslint/no-explicit-any */
import {assertInInjectionContext, computed, Injector, isSignal, Signal, untracked} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {
  combineLatest,
  distinctUntilChanged,
  from,
  identity,
  isObservable,
  ObservableInput,
  ObservableInputTuple,
  OperatorFunction,
  startWith,
} from 'rxjs';

export type ObservableSignalInput<T> = ObservableInput<T> | Signal<T>;

// pick from ToSignalOptions
export type CombineFromOptions<T> = {
  readonly injector?: Injector;
  readonly initialValue?: T | null;
};

type ObservableSignalInputTuple<T> = {
  [K in keyof T]: ObservableSignalInput<T[K]> | (() => T[K]);
};

export function combineFrom<Input extends readonly unknown[], Output = Input>(
  sources: readonly [...ObservableSignalInputTuple<Input>],
  operator?: OperatorFunction<Input, Output>,
  options?: CombineFromOptions<Output>,
): Signal<Output>;

export function combineFrom<Input extends readonly unknown[], Output = Input>(
  sources: readonly [...ObservableSignalInputTuple<Input>],
  options?: CombineFromOptions<Input>,
): Signal<Output>;

export function combineFrom<Input extends object, Output = Input>(
  sources: ObservableSignalInputTuple<Input>,
  operator?: OperatorFunction<Input, Output>,
  options?: CombineFromOptions<Output>,
): Signal<Output>;

export function combineFrom<Input extends object, Output = Input>(
  sources: ObservableSignalInputTuple<Input>,
  options?: CombineFromOptions<Input>,
): Signal<Output>;

/**
 * Combines multiple `Observable` or `Signal` sources into a `Signal` that emits their values. It's like combineLatest.
 *
 * @param {ObservableSignalInputTuple} sources - Array or object of `Observable` or `Signal` values
 * @param {OperatorFunction} [operator] - Operator to apply to the combined values
 * @param {CombineFromOptions} [options] - Options including `initialValue` and `injector`
 * @returns Signal emitting the combined values
 *
 * @example
 * ```ts
 * export class Component {
 *  private readonly userService = inject(UserService);
 *  page = signal(2);
 *
 *  data = combineFrom(
 *    [this.page, this.userService.users$],
 *    pipe(
 *      switchMap(([page, users]) => this.dataService.getData(page, users)),
 *      startWith([])
 *    )
 *  );
 * }
 * ```
 */
export function combineFrom<Input = any, Output = Input>(...args: any[]): Signal<Output> {
  assertInInjectionContext(combineFrom);

  const {normalizedSources, hasInitValue, operator, options} = normalizeArgs<Input, Output>(args);

  const ret: Signal<Output> = hasInitValue
    ? toSignal(combineLatest(normalizedSources).pipe(operator), {
        initialValue: options!.initialValue!,
        injector: options?.injector,
      })
    : toSignal(combineLatest(normalizedSources).pipe(operator), {
        injector: options?.injector,
        requireSync: true,
      });

  return ret;
}

function normalizeArgs<Input, Output>(
  args: any[],
): {
  normalizedSources: ObservableInputTuple<Input>;
  operator: OperatorFunction<Input, Output>;
  hasInitValue: boolean;
  options: CombineFromOptions<Output> | undefined;
} {
  if (!args || args.length < 1 || typeof args[0] !== 'object') {
    throw new TypeError('combineFrom needs sources');
  }

  const hasOperator = typeof args[1] === 'function';

  if (args.length === 3 && !hasOperator) {
    throw new TypeError('combineFrom needs a pipe operator as the second argument');
  }

  // pass sources and options
  if (!hasOperator) {
    // add identity function to args at index 1as operator function as x=>x
    args.splice(1, 0, identity);
  }

  // if no operator passed, identity will be operator
  const [sources, operator, options] = args;

  const hasInitValue = options?.initialValue !== undefined;

  const normalizedSources = Object.entries(sources).reduce(
    (acc, [keyOrIndex, source]) => {
      if (isSignal(source)) {
        acc[keyOrIndex] = toObservable(source, {injector: options?.injector}).pipe(
          // toObservable doesn't immediately emit initialValue of the signal
          startWith(untracked(source)),
        );
      } else if (isObservable(source)) {
        acc[keyOrIndex] = source.pipe(distinctUntilChanged());
      } else if (typeof source === 'function') {
        // seldom use: pass function like () => 5
        const computedRes = computed(source as () => unknown);
        acc[keyOrIndex] = toObservable(computedRes, {injector: options?.injector}).pipe(startWith(source()));
      } else {
        // seldom use: pass promise, Map, array, etc that from accepts
        acc[keyOrIndex] = from(source as any).pipe(distinctUntilChanged());
      }
      return acc;
    },
    (Array.isArray(sources) ? [] : {}) as any,
  );

  return {normalizedSources, operator, hasInitValue, options};
}
