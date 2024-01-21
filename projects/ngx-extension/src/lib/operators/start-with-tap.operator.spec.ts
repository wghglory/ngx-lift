import {last, Observable, of} from 'rxjs';

import {startWithTap} from './start-with-tap.operator';

describe('startWithTap', () => {
  it('calls the callback function and switches to the source observable', (done) => {
    const callbackSpy = jasmine.createSpy('callback');
    const source$ = of('data');

    source$.pipe(startWithTap(callbackSpy)).subscribe({
      next: (value) => {
        expect(callbackSpy).toHaveBeenCalled();
        expect(value).toBe('data');
        done();
      },
    });
  });

  it('works with an observable that emits multiple values', (done) => {
    const callbackSpy = jasmine.createSpy('callback');
    const source$ = of(1, 2, 3);

    source$.pipe(last(), startWithTap(callbackSpy)).subscribe({
      next: (value) => {
        expect(callbackSpy).toHaveBeenCalled();
        expect(value).toBe(3);
        done();
      },
    });
  });

  it('works with an observable that throws an error', (done) => {
    const callbackSpy = jasmine.createSpy('callback');
    const error = new Error('Test Error');
    const source$ = new Observable((observer) => {
      observer.error(error);
    });

    source$.pipe(startWithTap(callbackSpy)).subscribe({
      error: (err) => {
        expect(callbackSpy).toHaveBeenCalled();
        expect(err).toBe(error);
        done();
      },
    });
  });
});
