import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';

import {TranslationService} from '../../services/translation.service';
import {alertTranslations} from './alert.l10n';
import {AlertService} from './alert.service';

@Component({
  selector: 'clx-alert-container',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertContainerComponent {
  alerts$ = this.alertService.alerts$;

  get closeButtonAriaLabel() {
    return this.translationService.translate(alertTranslations, 'close');
  }

  constructor(
    private alertService: AlertService,
    private translationService: TranslationService,
  ) {}

  onCloseAlert(id: symbol) {
    this.alertService.deleteAlert(id);
  }
}
