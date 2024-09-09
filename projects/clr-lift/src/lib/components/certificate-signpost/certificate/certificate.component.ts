import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {X509Certificate} from '@peculiar/x509';

import {TranslatePipe} from '../../../pipes/translate.pipe';
import {TranslationService} from '../../../services/translation.service';
import {certificateTranslations} from '../certificate.l10n';
import {CertificateStatus} from '../certificate.model';

@Component({
  selector: 'cll-certificate',
  standalone: true,
  imports: [ClarityModule, TranslatePipe, CommonModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateComponent {
  private translationService = inject(TranslationService);

  certificate = input.required<X509Certificate>();
  certificateStatus = input.required<CertificateStatus>();

  hash = input.required<
    | {
        sha1: string;
        sha256: string;
      }
    | undefined
  >();

  constructor() {
    this.translationService.loadTranslationsForComponent('certificate', certificateTranslations);
  }
}
