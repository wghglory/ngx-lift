import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-ngx-lift',
  standalone: true,
  imports: [],
  template: ` <p>ngx-lift works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtensionComponent {}
