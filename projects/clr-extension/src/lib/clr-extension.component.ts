import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'clx-clr-extension',
  standalone: true,
  imports: [],
  template: ` <p>clr-extension works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrExtensionComponent {}
