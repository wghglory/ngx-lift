import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ClarityModule} from '@clr/angular';

import {TranslationService} from '../../services/translation.service';
import {alertsTranslations} from './alerts.l10n';
import {AlertsService} from './alerts.service';

@Component({
  selector: 'clx-alerts',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  private alertsService = inject(AlertsService);
  private translationService = inject(TranslationService);

  alerts$ = this.alertsService.alerts$;

  onCloseAlert(id: symbol) {
    this.alertsService.deleteAlert(id);
  }

  get closeButtonAriaLabel() {
    return this.translationService.translate(alertsTranslations, 'close');
  }
}
