import {of} from 'rxjs';
import {take} from 'rxjs/operators';

import {AsyncState} from '../models';
import {poll} from './poll.operator';

describe('poll', () => {
  let mockApiCall: jasmine.Spy;
  let mockParamsBuilder: jasmine.Spy;

  beforeEach(() => {
    mockApiCall = jasmine.createSpy('apiCall').and.returnValue(of('Mocked Data'));
    mockParamsBuilder = jasmine.createSpy('paramsBuilder').and.returnValue({param: 'value'});
  });

  it('should call apiCall with correct params and return data', (done) => {
    const interval = 1000;
    const trigger = of(null); // Mocking a trigger observable emitting once

    poll({interval, apiCall: mockApiCall, paramsBuilder: mockParamsBuilder, trigger})
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({loading: true, error: null, data: null}); // Initial loading state
      });

    setTimeout(() => {
      expect(mockApiCall).toHaveBeenCalledWith({param: 'value'}); // Ensure apiCall is called with correct params
      done();
    }, interval + 50);
  });

  it('should handle initial trigger emissions', (done) => {
    const interval = 1000;
    const trigger = of('trigger');

    poll({interval, apiCall: mockApiCall, paramsBuilder: mockParamsBuilder, trigger})
      .pipe(take(1))
      .subscribe((state: AsyncState<unknown, Error>) => {
        expect(state).toEqual({loading: true, error: null, data: null}); // Initial loading state
      });

    setTimeout(() => {
      expect(mockApiCall).toHaveBeenCalledWith({param: 'value'}); // Ensure apiCall is called with correct params
      done();
    }, interval + 50);
  });
});
