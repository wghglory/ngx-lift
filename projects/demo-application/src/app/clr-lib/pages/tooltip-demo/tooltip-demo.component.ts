import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageContainerComponent, TooltipModule} from 'clr-lift';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent, TooltipModule, PageContainerComponent],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {
  importCode = highlight(`import {TooltipModule, TooltipComponent, TooltipDirective} from 'clr-lift'`);

  basicTooltipCode = highlight(`
<span cllTooltip="This is our cllTooltip text">Hover 1</span>

<span cllTooltip cllTooltipContent="This is our cllTooltip text" [cllTooltipHideDelay]="500" [cllTooltipWidth]="100">
  Hover 2
</span>
    `);

  refTemplateCode = highlight(`
<span
  cllTooltip
  [cllTooltipContent]="ref"
  [cllTooltipWidth]="100"
  [cllTooltipHideDelay]="2000"
  [cllTooltipPosition]="'tooltip-top-right'"
>
  Ref
</span>
<ng-template #ref> Ref template <button (click)="go()" class="btn btn-primary btn-sm">GO</button> </ng-template>
    `);

  componentRefCode = highlight(`
@Component({
  template: \`
  <span
    *ngIf="alertComponent"
    cllTooltip
    [cllTooltipContent]="alertComponent"
    [cllTooltipWidth]="600"
    [cllTooltipHideDelay]="2000"
  >
    Component Ref
  </span>
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
