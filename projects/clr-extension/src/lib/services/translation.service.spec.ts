import {TestBed} from '@angular/core/testing';

import {TranslationService} from './translation.service';

describe('TranslationService', () => {
  let translationService: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    translationService = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(translationService).toBeTruthy();
  });

  it('should translate a key when the language is supported', () => {
    const translations = {
      'en-US': {greeting: 'Hello'},
      'es-ES': {greeting: 'Hola'},
    };

    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');

    const translatedString = translationService.translate(translations, 'greeting');

    expect(translatedString).toBe('Hello');
  });

  it('should throw an error when the language is not supported', () => {
    const translations = {
      'en-US': {greeting: 'Hello'},
      'es-ES': {greeting: 'Hola'},
    };

    spyOnProperty(navigator, 'language', 'get').and.returnValue('fr-FR');

    expect(() => translationService.translate(translations, 'greeting')).toThrowError(
      'Sorry, fr-FR is not supported yet.',
    );
  });

  it('should throw an error when the translation for the key does not exist', () => {
    const translations = {
      'en-US': {greeting: 'Hello'},
      'es-ES': {greeting: 'Hola'},
    };

    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');

    expect(() => translationService.translate(translations, 'missingKey')).toThrowError(
      'Sorry, missingKey is not translated yet.',
    );
  });
});
