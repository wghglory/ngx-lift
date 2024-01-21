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
