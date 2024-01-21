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
  }

  deleteAlert(id: symbol) {
    this.alertsBS.next(this.alertsBS.value.filter((alert) => alert.id !== id));
  }

  clearAlerts() {
    this.alertsBS.next([]);
  }
}
