import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AlertsComponent, AlertsService, PageContainerComponent} from 'clr-extension';

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
    this.alertsService.addAlert({
      content: 'This is a danger alert! You can delete this alert by clicking the close button.',
    });
    this.alertsService.addAlert({
      content: 'warning alert! You can delete this alert by clicking the close button.',
      alertType: 'warning',
    });
    this.alertsService.addAlert({
      content: 'I am an info alert. You can delete this alert by clicking the close button.',
      alertType: 'info',
    });
    this.alertsService.addAlert({
      content:
        'Alert with a button. <button type="button" class="btn btn-sm btn-outline" id="click-target">Click Me</button>',
      alertType: 'info',
      targetSelector: '#click-target',
      onTargetClick: this.clickMe,
    });
  }

  addAlert() {
    this.alertsService.addAlert({content: `New alert added on ${new Date()}`, alertType: 'success'});
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
  // You can pass 'danger', 'info', 'success', 'warning' for the alertType.
  this.alertsService.addAlert({
    content: 'New app-level alert added.',
    alertType: 'success',
  });
}

addStandardAlert() {
  this.alertsService.addAlert({
    content: 'New standard alert added.',
    alertType: 'success',
    isAppLevel: false,
  });
}

clearAlerts() {
  this.alertsService.clearAlerts();
}
  `);

  advancedCode = highlight(`
this.alertsService.addAlert({
  content: 'Alert with a button. <button type="button" class="btn btn-sm btn-outline" id="click-target">Click Me</button>',
  alertType: 'info',
  targetSelector: '#click-target',
  onTargetClick: this.clickMe,
});

clickMe() {
  alert('You did it correctly!');
}
  `);
}
