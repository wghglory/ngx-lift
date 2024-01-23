import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject, map} from 'rxjs';

import {Alert} from '../../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private sanitizer: DomSanitizer) {}

  private alertsBS = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsBS.asObservable().pipe(
    map((alerts) => {
      return alerts.map((alert) => ({
        ...alert,
        content: this.sanitizer.bypassSecurityTrustHtml(alert.content),
      }));
    }),
  );

  addAlert(alert: Alert) {
    this.alertsBS.next([alert, ...this.alertsBS.value]);

    this.registerEvent(alert);
  }

  deleteAlert(id: symbol) {
    const alert = this.alertsBS.value.find((alert) => alert.id === id);

    if (alert) {
      // TODO: https://github.com/vmware-clarity/ng-clarity/issues/1151
      this.unregisterEvent(alert);
      this.alertsBS.next(this.alertsBS.value.filter((alert) => alert.id !== id));
    }
  }

  clearAlerts() {
    this.alertsBS.value.forEach((alert) => {
      this.unregisterEvent(alert);
    });

    this.alertsBS.next([]);
  }

  /**
   * wait for the alert to be rendered in DOM and then register click event handler.
   * @param alert Alert to be registered
   */
  private registerEvent(alert: Alert) {
    setTimeout(() => {
      if (alert.targetId && alert.onTargetClick) {
        const element = document.getElementById(alert.targetId);
        element?.addEventListener('click', alert.onTargetClick, false);
      }
    }, 0);
  }

  /**
   * unregister the click event before deleting the alert
   * @param alert Alert to be unregistered
   */
  private unregisterEvent(alert: Alert) {
    if (alert.targetId && alert.onTargetClick) {
      const element = document.getElementById(alert.targetId);
      element?.removeEventListener('click', alert.onTargetClick, false);
    }
  }
}
