import {Injectable} from '@angular/core';
import {X509Certificate} from '@peculiar/x509';
import {differenceInDays} from 'ngx-lift';

/**
 * pem example:
 *
-----BEGIN CERTIFICATE-----
MIIEBDCCAuygAwIBAgIDAjppMA0GCSqGSIb3DQEBBQUAMEIxCzAJBgNVBAYTAlVT
MRYwFAYDVQQKEw1HZW9UcnVzdCBJbmMuMRswGQYDVQQDExJHZW9UcnVzdCBHbG9i
YWwgQ0EwHhcNMTMwNDA1MTUxNTU1WhcNMTUwNDA0MTUxNTU1WjBJMQswCQYDVQQG
EwJVUzETMBEGA1UEChMKR29vZ2xlIEluYzElMCMGA1UEAxMcR29vZ2xlIEludGVy
bmV0IEF1dGhvcml0eSBHMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
AJwqBHdc2FCROgajguDYUEi8iT/xGXAaiEZ+4I/F8YnOIe5a/mENtzJEiaB0C1NP
VaTOgmKV7utZX8bhBYASxF6UP7xbSDj0U/ck5vuR6RXEz/RTDfRK/J9U3n2+oGtv
h8DQUB8oMANA2ghzUWx//zo8pzcGjr1LEQTrfSTe5vn8MXH7lNVg8y5Kr0LSy+rE
ahqyzFPdFUuLH8gZYR/Nnag+YyuENWllhMgZxUYi+FOVvuOAShDGKuy6lyARxzmZ
EASg8GF6lSWMTlJ14rbtCMoU/M4iarNOz0YDl5cDfsCx3nuvRTPPuj5xt970JSXC
DTWJnZ37DhF5iR43xa+OcmkCAwEAAaOB+zCB+DAfBgNVHSMEGDAWgBTAephojYn7
qwVkDBF9qn1luMrMTjAdBgNVHQ4EFgQUSt0GFhu89mi1dvWBtrtiGrpagS8wEgYD
VR0TAQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAQYwOgYDVR0fBDMwMTAvoC2g
K4YpaHR0cDovL2NybC5nZW90cnVzdC5jb20vY3Jscy9ndGdsb2JhbC5jcmwwPQYI
KwYBBQUHAQEEMTAvMC0GCCsGAQUFBzABhiFodHRwOi8vZ3RnbG9iYWwtb2NzcC5n
ZW90cnVzdC5jb20wFwYDVR0gBBAwDjAMBgorBgEEAdZ5AgUBMA0GCSqGSIb3DQEB
BQUAA4IBAQA21waAESetKhSbOHezI6B1WLuxfoNCunLaHtiONgaX4PCVOzf9G0JY
/iLIa704XtE7JW4S615ndkZAkNoUyHgN7ZVm2o6Gb4ChulYylYbc3GrKBIxbf/a/
zG+FA1jDaFETzf3I93k9mTXwVqO94FntT0QJo544evZG0R0SnU++0ED8Vf4GXjza
HFa9llF7b1cq26KqltyMdMKVvvBulRP/F/A8rLIQjcxz++iPAsbw+zOzlTvjwsto
WHPbqCRiOwY1nQ2pM714A5AuTHhdUDqB1O6gyHA43LL5Z/qHQF1hwFGPa4NrzQU6
yuGnBXj8ytqU0CwIPX4WecigUCAkVDNx
-----END CERTIFICATE-----
 */

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  /**
   * Calculates the difference in days between the given certificate expiration date and the current date.
   *
   * @param {string} certNotAfterDate - The expiration date of the certificate in string format. this.certificate?.validity.notAfter
   * @param {Date} [referenceDate=new Date()] - The reference date to calculate the difference from. Defaults to the current date.
   * @return {number} The difference in days between the certificate expiration date and the reference date.
   */
  getDayDifferences(certNotAfterDate: Date, referenceDate = new Date()) {
    return differenceInDays(new Date(certNotAfterDate), referenceDate);
  }

  parseCertificate(raw: string, pemEncoded = false) {
    const decodedPem = pemEncoded ? atob(raw) : raw;
    try {
      return new X509Certificate(decodedPem);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getFingerprints(cert: X509Certificate) {
    try {
      // Get the raw DER encoding of the certificate.
      const sha256Buffer = await cert.getThumbprint('SHA-256');
      const sha1Buffer = await cert.getThumbprint('SHA-1');

      // Convert the buffers to hexadecimal strings.
      const sha256 = this.toHex(sha256Buffer);
      const sha1 = this.toHex(sha1Buffer);

      return {sha256, sha1};
    } catch (error) {
      return {sha256: '', sha1: ''};
    }
  }

  private toHex(buffer: ArrayBuffer) {
    // https://github.com/PeculiarVentures/x509/discussions/34
    return Array.from(new Uint8Array(buffer), (v) => v.toString(16).padStart(2, '0').toUpperCase()).join(':');
  }
}
