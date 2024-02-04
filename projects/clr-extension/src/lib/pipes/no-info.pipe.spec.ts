import {TestBed} from '@angular/core/testing';

import {TranslationService} from '../services/translation.service';
import {NoInfoPipe} from './no-info.pipe';

describe('NoInfoPipe', () => {
  let pipe: NoInfoPipe;
  let translationService: Partial<TranslationService>;

  beforeEach(() => {
    translationService = {
      translate: (key: string) => {
        if (key === 'display.no.info.string') return '-';
        if (key === 'not.running') return 'Not Running';
        return '';
      },
    };

    TestBed.configureTestingModule({
      providers: [NoInfoPipe, {provide: TranslationService, useValue: translationService}],
    });

    pipe = TestBed.inject(NoInfoPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same string if not empty', () => {
    expect(pipe.transform('some text')).toEqual('some text');
  });

  it('should return the default translated string for empty string', () => {
    const defaultValue = '-';
    expect(pipe.transform('')).toEqual(defaultValue);
  });

  it('should return custom translated string for empty string with custom key', () => {
    const customKey = 'not.running';
    expect(pipe.transform('', customKey)).toEqual('Not Running');
  });

  it('should return string representation of number if value is a number', () => {
    expect(pipe.transform(123)).toEqual('123');
  });

  it('should handle number zero correctly', () => {
    expect(pipe.transform(0)).toEqual('0');
  });
});
