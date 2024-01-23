// Mock TranslationService
export class MockTranslationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  translate(translations: Record<string, Record<string, string>>, key: string): string {
    // Implement as needed for testing
    return 'TranslatedText';
  }
}
