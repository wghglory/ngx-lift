import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input, OnChanges, SimpleChanges} from '@angular/core';
import {certificateIcon, ClarityIcons} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';
import {pki} from 'node-forge';

import {TranslatePipe} from '../../pipes/translate.pipe';
import {TranslationService} from '../../services/translation.service';
import {certificateTranslations} from './certificate.l10n';
import {CertificateStatus} from './certificate.model';
import {CertificateService} from './certificate.service';
import {CertificateComponent} from './certificate/certificate.component';

ClarityIcons.addIcons(certificateIcon);

@Component({
  selector: 'cll-certificate-signpost',
  standalone: true,
  imports: [ClarityModule, CommonModule, TranslatePipe, CertificateComponent],
  templateUrl: './certificate-signpost.component.html',
  styleUrls: ['./certificate-signpost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateSignpostComponent implements OnChanges {
  private translationService = inject(TranslationService);
  private certificateService = inject(CertificateService);

  position = input<
    | 'top-left'
    | 'top-middle'
    | 'top-right'
    | 'right-top'
    | 'right-middle'
    | 'right-bottom'
    | 'bottom-right'
    | 'bottom-middle'
    | 'bottom-left'
    | 'left-bottom'
    | 'left-middle'
    | 'left-top'
  >('right-middle');
  showIcon = input(true);
  pemEncoded = input(false); // encode pem string or not
  pem = input.required<string>();

  constructor() {
    this.translationService.loadTranslationsForComponent('certificate', certificateTranslations);
  }

  certificate?: pki.Certificate;
  certificateStatus?: CertificateStatus;
  hash = {
    md5: '',
    sha1: '',
  };
  hasError = false;

  get certificateStatusClass() {
    return this.certificateStatus?.status === 'danger'
      ? 'text-danger'
      : this.certificateStatus?.status === 'warning'
        ? 'text-warning'
        : 'text-success';
  }

  /**
   * Returns the status of a certificate based on its expiration date.
   *
   * @param {pki.Certificate} certificate - The certificate to check the status of.
   * @return {CertificateStatus} The status of the certificate, including label text, label class, status, and shape.
   */
  private getCertificateStatus(certificate: pki.Certificate): CertificateStatus {
    const daysDiff = this.certificateService.getDayDifferences(certificate.validity.notAfter);

    if (daysDiff < 0) {
      return {
        labelText: this.translationService.translate('certificate.expired'),
        labelClass: 'label-danger',
        status: 'danger',
        shape: 'error-standard',
      };
    } else if (daysDiff <= 30) {
      return {
        labelText: this.translationService.translate('certificate.expiresIn', `${daysDiff}`),
        labelClass: 'label-warning',
        status: 'warning',
        shape: 'exclamation-triangle',
      };
    } else {
      return {
        labelText: this.translationService.translate('certificate.valid'),
        labelClass: 'label-success',
        status: 'success',
        shape: 'success-standard',
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      this.hasError = false;

      const pem = changes['pem'].currentValue;
      const pemEncoded = changes['pemEncoded']?.currentValue || false;

      this.hash = this.certificateService.getCertificateHashes(pem, pemEncoded);

      this.certificate = this.certificateService.getCertificateFromPem(pem, pemEncoded);
      this.certificateStatus = this.getCertificateStatus(this.certificate);
    } catch (error: unknown) {
      console.error((<Error>error).message, 'error');
      this.hasError = true;

      this.certificateStatus = {
        labelText: `${error}`,
        labelClass: 'label-danger',
        status: 'danger',
        shape: 'error-standard',
      };
    }
  }
}
