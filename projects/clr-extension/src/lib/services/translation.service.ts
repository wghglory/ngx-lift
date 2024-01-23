import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  translate(translations: Record<string, Record<string, string>>, key: string): string {
    // Check if the current language is supported
    if (!(navigator.language in translations)) {
      throw new Error(`Sorry, ${navigator.language} is not supported yet.`);
    }

    // Check if the translation for the given key exists in the current language
    if (!translations[navigator.language]?.[key]) {
      throw new Error(`Sorry, ${key} is not translated yet.`);
    }

    // Return the translated string for the given key in the current language
    return translations[navigator.language][key];
  }
}
