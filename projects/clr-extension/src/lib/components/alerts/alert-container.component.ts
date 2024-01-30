import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';

import {TranslatePipe} from '../../pipes/translate.pipe';
import {TranslationService} from '../../services/translation.service';
import {alertTranslations} from './alert.l10n';
import {AlertService} from './alert.service';

@Component({
  selector: 'clx-alert-container',
  standalone: true,
  imports: [CommonModule, ClarityModule, TranslatePipe],
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertContainerComponent {
  alerts$ = this.alertService.alerts$;

  constructor(
    private alertService: AlertService,
    private translationService: TranslationService,
  ) {
    translationService.loadTranslationsForComponent('alert', alertTranslations);
  }

  onCloseAlert(id: symbol) {
    this.alertService.deleteAlert(id);
  }
}
