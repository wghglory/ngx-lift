import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  translate(translations: Record<string, Record<string, string>>, key: string, lang?: string): string {
    // Check if the current language is supported
    if (!(navigator.language in translations)) {
      console.warn(`Sorry, ${navigator.language} is not supported yet.`);
    }

    // Check if the translation for the given key exists in the current language
    if (!translations[navigator.language]?.[key]) {
      console.warn(`Sorry, ${key} is not translated yet.`);
    }

    // Return the translated string for the given key in the current language
    // if not, fallback to english
    return translations[lang || navigator.language]?.[key] || translations['en']?.[key];
  }
}
