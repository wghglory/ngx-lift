import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageContainerComponent, TooltipModule} from 'clr-lift';

import {CalloutComponent} from '../../../../../../clr-lift/src/public-api';
import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent, TooltipModule, CalloutComponent, PageContainerComponent],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {
  importCode = highlight(`import {TooltipModule, TooltipComponent, TooltipDirective} from 'clr-lift'`);

  basicTooltipCode = highlight(`
<a href="javascript:void(0)" cllTooltip="This is our cllTooltip text">Basic Tooltip 1</a>

<a href="javascript:void(0)" cllTooltip cllTooltipContent="This is our cllTooltip text" [cllTooltipHideDelay]="500" [cllTooltipWidth]="100">
  Basic Tooltip 2
</a>
    `);

  templateRefCode = highlight(`
<a
  href="javascript:void(0)"
  cllTooltip
  [cllTooltipContent]="ref"
  [cllTooltipContentContext]="{$implicit: 'TemplateRef Example', value: '❤️'}"
  [cllTooltipWidth]="350"
  [cllTooltipPosition]="'tooltip-top-right'"
>
  Ref
</a>
<ng-template #ref let-data let-value="value">
  {{ 'A great tooltip:' }} {{ data }} {{ value }}
  <button class="btn btn-primary btn-sm">GO</button>
</ng-template>
    `);

  componentRefCode = highlight(`
@Component({
  template: \`
  <a
    *ngIf="alertComponent"
    href="javascript:void(0)"
    cllTooltip
    [cllTooltipContent]="alertComponent"
    [cllTooltipWidth]="600"
    [cllTooltipHideDelay]="2000"
  >
    Component Ref
  </a>
  \`
})

export class DemoComponent {
  private appRef = inject(ApplicationRef);

  alertComponent?: ComponentRef<AlertComponent>;

  ngOnInit() {
    const environmentInjector = this.appRef.injector;
    this.alertComponent = createComponent(AlertComponent, { environmentInjector });
    this.alertComponent.setInput('content', 'i am from alert component');
    this.alertComponent.hostView.detectChanges();
  }
}`);
}
