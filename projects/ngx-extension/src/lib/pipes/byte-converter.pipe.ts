import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'byteConverter',
  standalone: true,
})
export class ByteConverterPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '-';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return this.formatNumber(value) + ' ' + units[unitIndex];
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {maximumFractionDigits: 2}).format(value);
  }
}

/**
 * import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

// Register the 'en' locale
registerLocaleData(localeEn);

@NgModule({
  // ...
  providers: [{ provide: LOCALE_ID, useValue: 'en' }],
})
export class AppModule {}
 */
