import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {pki} from 'node-forge';

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
  @Input() certificate?: pki.Certificate;
  @Input() certificateStatus?: CertificateStatus;

  @Input() hash?: {md5: string; sha1: string};

  constructor(private translationService: TranslationService) {
    translationService.loadTranslationsForComponent('certificate', certificateTranslations);
  }
}