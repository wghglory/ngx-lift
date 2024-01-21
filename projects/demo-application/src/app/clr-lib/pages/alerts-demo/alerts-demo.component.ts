import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Alert, AlertsComponent, AlertsService, PageContainerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-alerts-demo',
  standalone: true,
  imports: [AlertsComponent, PageContainerComponent, CodeBlockComponent],
  templateUrl: './alerts-demo.component.html',
  styleUrl: './alerts-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsDemoComponent implements OnInit {
  alertsService = inject(AlertsService);

  ngOnInit() {
    this.alertsService.addAlert(
      new Alert('This is a danger alert! You can delete this alert by clicking the close button.'),
    );
    this.alertsService.addAlert(
      new Alert('warning alert! You can delete this alert by clicking the close button.', 'warning'),
    );
    this.alertsService.addAlert(
      new Alert('I am an info alert. You can delete this alert by clicking the close button.', 'info'),
    );
  }

  addAlert() {
    this.alertsService.addAlert(new Alert(`New alert added on ${new Date()}`, 'success'));
  }

  clearAlerts() {
    this.alertsService.clearAlerts();
  }

  htmlCode = highlight(`
<clr-main-container>
  <clx-alerts />
  <clr-header></clr-header>
</clr-main-container>
  `);

  tsCode = highlight(`
addAlert() {
  // You can pass 'danger', 'info', 'success', 'warning' for the 2nd parameter as the alert type.
  this.alertsService.addAlert(new Alert('New alert added', 'success'));
}

clearAlerts() {
  this.alertsService.clearAlerts();
}
  `);

  alertModelCode = highlight(`
export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export class Alert {
  constructor(content: string, alertType: AlertType = 'danger', isAppLevel = true) {
    this.content = content;
    this.alertType = alertType;
    this.id = Symbol();
    this.isAppLevel = isAppLevel;
  }

  id: symbol;
  content: string;
  alertType: AlertType;
  isAppLevel: boolean;
}
    `);
}
