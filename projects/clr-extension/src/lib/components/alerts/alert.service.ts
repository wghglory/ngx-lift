import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject, map} from 'rxjs';

import {Alert, RequiredAlert} from './alert.type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private sanitizer: DomSanitizer) {}

  private alertsBS = new BehaviorSubject<RequiredAlert[]>([]);
  alerts$ = this.alertsBS.asObservable().pipe(
    map((alerts) => {
      return alerts.map((alert) => ({
        ...alert,
        content: this.sanitizer.bypassSecurityTrustHtml(alert.content),
      }));
    }),
  );

  addAlert(alert: Alert) {
    const newAlert = this.createAlert(alert);

    this.alertsBS.next([newAlert, ...this.alertsBS.value]);

    this.registerEvent(newAlert);

    return newAlert;
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
  private registerEvent(alert: RequiredAlert) {
    setTimeout(() => {
      if (alert.targetSelector && alert.onTargetClick) {
        const element = document.querySelector(alert.targetSelector);
        element?.addEventListener('click', alert.onTargetClick, false);
      }
    }, 2000);
  }

  /**
   * unregister the click event before deleting the alert
   * @param alert Alert to be unregistered
   */
  private unregisterEvent(alert: RequiredAlert) {
    if (alert.targetSelector && alert.onTargetClick) {
      const element = document.getElementById(alert.targetSelector);
      element?.removeEventListener('click', alert.onTargetClick, false);
    }
  }

  private createAlert(alert: Alert): RequiredAlert {
    return {
      id: Symbol(),
      content: alert.content,
      alertType: alert.alertType ?? 'danger',
      isAppLevel: alert.isAppLevel ?? true,
      targetSelector: alert.targetSelector,
      onTargetClick: alert.onTargetClick,
    };
  }
}
