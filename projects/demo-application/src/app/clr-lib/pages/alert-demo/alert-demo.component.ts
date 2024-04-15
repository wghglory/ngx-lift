import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, PageContainerComponent} from 'clr-lift';

import {highlight} from '../../../shared/utils/highlight.util';
import {CodeBlockComponent} from './../../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [AlertComponent, PageContainerComponent, CodeBlockComponent, ClarityModule],
  templateUrl: './alert-demo.component.html',
  styleUrl: './alert-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
  error = new HttpErrorResponse({
    error: {message: 'angular http error response'},
  });

  standardAlertsCode = highlight(`
<!-- error is instance of HttpErrorResponse -->
<cll-alert [error]="error" />

<cll-alert alertType="success" content="I'm a successful content" />
<cll-alert alertType="info" content="I'm a info content" />
<cll-alert alertType="warning" content="I'm a warning content" />
  `);

  standardSmallAlertCode = highlight(`
<cll-alert alertType="danger" content="I'm a small alert" [isSmall]="true" />
  `);

  appLevelAlertsCode = highlight(`
<cll-alert [error]="error" [isAppLevel]="true" />
<cll-alert
  alertType="success"
  content="I'm a successful content <a href='javascript:void(0)' class='btn btn-outline btn-sm'>View</a>"
  [isAppLevel]="true"
/>
<cll-alert alertType="info" content="I'm a info content" [isAppLevel]="true" />
<cll-alert alertType="warning" content="I'm a warning content" [isAppLevel]="true" />
    `);
}
