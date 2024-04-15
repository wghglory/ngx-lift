import {Pipe, PipeTransform} from '@angular/core';

import {httpsPattern} from '../const';

@Pipe({
  name: 'isHttps',
  standalone: true,
})
export class IsHttpsPipe implements PipeTransform {
  transform(value: string): boolean {
    return httpsPattern.test(value);
  }
}
