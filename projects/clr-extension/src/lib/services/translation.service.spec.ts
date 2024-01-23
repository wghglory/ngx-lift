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

  it('should translate a key in a specified language', () => {
    const translations = {
      'en-US': {
        greeting: 'Hello',
      },
      'es-ES': {
        greeting: 'Hola',
      },
    };

    const result = translationService.translate(translations, 'greeting', 'es-ES');

    expect(result).toBe('Hola');
  });

  it('should handle unsupported language gracefully', () => {
    spyOn(console, 'warn');

    const translations = {
      en: {greeting: 'Hello'},
      'es-ES': {greeting: 'Hola'},
    };

    spyOnProperty(navigator, 'language', 'get').and.returnValue('fr-FR');

    const result = translationService.translate(translations, 'greeting');

    expect(console.warn).toHaveBeenCalledWith('Sorry, fr-FR is not supported yet.');
    expect(result).toBe('Hello');
  });

  it('should throw an error when the translation for the key does not exist', () => {
    spyOn(console, 'warn');

    const translations = {
      en: {greeting: 'Hello'},
      'es-ES': {greeting: 'Hola'},
    };

    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');

    const result = translationService.translate(translations, 'missingKey');

    expect(console.warn).toHaveBeenCalledWith('Sorry, missingKey is not translated yet.');
    expect(result).toBeUndefined();
  });
});
