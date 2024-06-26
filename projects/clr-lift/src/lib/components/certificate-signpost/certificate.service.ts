import {Injectable} from '@angular/core';
import {differenceInDays} from 'ngx-lift';
import {md, pki} from 'node-forge';

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
   * Calculates the MD5 and SHA1 hashes of a certificate.
   *
   * @param {string} pem - The certificate.
   * @param {boolean} [pemEncoded=true] - Indicates whether the PEM string is already encoded.
   * @return {{md5: string, sha1: string}} - An object containing the MD5 and SHA1 hashes of the certificate.
   */
  getCertificateHashes(pem: string, pemEncoded = true) {
    const decodedPem = pemEncoded ? atob(pem) : pem;

    const md5 = md.md5.create();
    const sha1 = md.sha1.create();

    const csrBytes = pki.pemToDer(decodedPem).getBytes();

    md5.update(csrBytes, 'raw');
    sha1.update(csrBytes, 'raw');

    return {
      md5: md5.digest().toHex().toUpperCase(),
      sha1: sha1.digest().toHex().toUpperCase(),
    };
  }

  /**
   * Retrieves a certificate object from a PEM-encoded string.
   *
   * @param {string} pem - The PEM-encoded string representing the certificate.
   * @param {boolean} [pemEncoded=true] - Indicates whether the PEM string is already encoded.
   * @return {pki.Certificate} The certificate object parsed from the PEM string.
   */
  getCertificateFromPem(pem: string, pemEncoded = true) {
    const decodedPem = pemEncoded ? atob(pem) : pem;
    return pki.certificateFromPem(decodedPem);
  }

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
}
