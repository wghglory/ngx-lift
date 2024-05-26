import {assertInInjectionContext, inject, type Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, type Params} from '@angular/router';
import {map} from 'rxjs';

/**
 * Injects the params from the current route.
 * If a key is provided, returns the value of that key.
 * If a transform function is provided, returns the result of the function.
 * Otherwise, returns the entire params object.
 *
 * @example
 * const userId = injectParams('id'); // Returns the value of the 'id' param
 * const userId = injectParams(p => p['id'] as string); // Returns the 'id' param using a custom transform function
 * const params = injectParams(); // Returns the entire params object
 *
 * @param keyOrTransform OPTIONAL The key of the param to return, or a transform function to apply to the params object
 */
export function injectParams(): Signal<Params>;
export function injectParams(key: string): Signal<string | null>;
export function injectParams<T>(transform: (params: Params) => T): Signal<T>;
export function injectParams<T>(keyOrTransform?: string | ((params: Params) => T)): Signal<T | Params | string | null> {
  assertInInjectionContext(injectParams);

  const route = inject(ActivatedRoute);
  const params = route.snapshot.params;

  if (typeof keyOrTransform === 'function') {
    return toSignal(route.params.pipe(map(keyOrTransform)), {initialValue: keyOrTransform(params)});
  }

  const getParam = (params: Params) => (keyOrTransform ? params?.[keyOrTransform] ?? null : params);

  return toSignal(route.params.pipe(map(getParam)), {initialValue: getParam(params)});
}
