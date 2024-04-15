import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageContainerComponent, SpinnerComponent} from 'clr-lift';

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
import {SpinnerComponent} from 'clr-lift';

@Component({
  standalone: true,
  imports: [SpinnerComponent],
})
export class YourComponent { }
  `);

  defaultCode = highlight(`<cll-spinner />`);
  middleSizeCode = highlight(`<cll-spinner [size]="'md'" />`);
  smallSizeCode = highlight(`<cll-spinner [size]="'sm'" />`);
  alignLeftCode = highlight(`<cll-spinner [isCenter]="false" />`);
  customClassCode = highlight(`<cll-spinner [isCenter]="false" class="px-10 inline-block" />`);
}
