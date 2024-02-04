import {Pipe, PipeTransform} from '@angular/core';

import {TranslationService} from '../services/translation.service';

/*
 * Used to check if a value on the screen is empty. If it's empty, will return
 * the localized "display.no.info.string"
 *
 * Takes a 'translateKey' argument that defaults to 'display.no.info.string'
 * Usage:
 *   string | noInfo : translateKey
 * Examples:
 *   {{ "" |  noInfo }}
 *   returns: the localized value of "display.no.info.string", the example value could be "-", "No Data" or else, depending on your requirements.
 *
 *   {{ "some text" |  noInfo }}
 *   returns: "some text"
 *
 *   {{ "" |  noInfo : "not.running" }}
 *   returns: the localized value of "not.running", it could be "Not Running". Please note that the actual value must be supplied by you.
 */
@Pipe({name: 'noInfo', standalone: true})
export class NoInfoPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: string | number, translateKey = 'display.no.info.string'): string {
    if (typeof value === 'number' && !isNaN(value)) {
      return String(value);
    }
    return value ? String(value) : this.translationService.translate(translateKey);
  }
}
