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
      new Alert('warning alert! You can delete this alert by clicking the close button.', {alertType: 'warning'}),
    );
    this.alertsService.addAlert(
      new Alert('I am an info alert. You can delete this alert by clicking the close button.', {alertType: 'info'}),
    );
    this.alertsService.addAlert(
      new Alert(
        'Alert with a button. <button type="button" class="btn btn-sm btn-outline" id="click-target">Click Me</button>',
        {alertType: 'info', targetSelector: '#click-target', onTargetClick: this.clickMe},
      ),
    );
  }

  addAlert() {
    this.alertsService.addAlert(new Alert(`New alert added on ${new Date()}`, {alertType: 'success'}));
  }

  clearAlerts() {
    this.alertsService.clearAlerts();
  }

  clickMe() {
    alert('You did it correctly!');
  }

  htmlCode = highlight(`
<clr-main-container>
  <clx-alerts />
  <clr-header></clr-header>
</clr-main-container>
  `);

  tsCode = highlight(`
addAppLevelAlert() {
  // You can pass 'danger', 'info', 'success', 'warning' for the alert type.
  this.alertsService.addAlert(new Alert('New app-level alert added', {alertType: 'success'}));
}

addStandardAlert() {
  this.alertsService.addAlert(new Alert('New standard alert added', {alertType: 'success', isAppLevel: false}));
}

clearAlerts() {
  this.alertsService.clearAlerts();
}
  `);

  advancedCode = highlight(`
this.alertsService.addAlert(
  new Alert(
    'Alert with a button. <button type="button" class="btn btn-sm btn-outline" class="click-target">Click Me</button>',
    {alertType: 'info', targetSelector: '.click-target', onTargetClick: this.clickMe},
  ),
);

clickMe() {
  alert('You did it correctly!');
}
  `);
}
