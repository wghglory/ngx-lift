import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageContainerComponent, SpinnerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [SpinnerComponent, PageContainerComponent, CodeBlockComponent],
  templateUrl: './spinner-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerDemoComponent {
  importCode = highlight(`
import {SpinnerComponent} from 'clr-extension';

@Component({
  standalone: true,
  imports: [SpinnerComponent],
})
export class YourComponent { }
  `);

  defaultCode = highlight(`<clx-spinner />`);
  middleSizeCode = highlight(`<clx-spinner [size]="'md'" />`);
  smallSizeCode = highlight(`<clx-spinner [size]="'sm'" />`);
  alignLeftCode = highlight(`<clx-spinner [isCenter]="false" />`);
  customClassCode = highlight(`<clx-spinner [isCenter]="false" class="px-10 inline-block bg-sky-50" />`);
}
