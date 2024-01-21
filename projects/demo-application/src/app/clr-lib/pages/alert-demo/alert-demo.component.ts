import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, PageContainerComponent} from 'clr-extension';

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
<clx-alert [error]="error" />

<clx-alert alertType="success" content="I'm a successful content" />
<clx-alert alertType="info" content="I'm a info content" />
<clx-alert alertType="warning" content="I'm a warning content" />
  `);

  standardSmallAlertCode = highlight(`
<clx-alert alertType="danger" content="I'm a small alert" [isSmall]="true" />
  `);

  appLevelAlertsCode = highlight(`
<clx-alert [error]="error" [isAppLevel]="true" />
<clx-alert
  alertType="success"
  content="I'm a successful content <a href='javascript:void(0)' class='btn btn-outline btn-sm'>View</a>"
  [isAppLevel]="true"
/>
<clx-alert alertType="info" content="I'm a info content" [isAppLevel]="true" />
<clx-alert alertType="warning" content="I'm a warning content" [isAppLevel]="true" />
    `);
}
