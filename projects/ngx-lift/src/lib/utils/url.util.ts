import {fqdnRegex, httpsPattern, ipRegex, urlPattern} from '../const';

/**
 * Check if host is IP
 * @param host new URL(your-url).host
 * @returns true if host is a IP
 */
export function isIP(host: string) {
  return ipRegex.test(host);
}

/**
 * Check if host is FQDN
 * @param host new URL(your-url).host
 * @returns true if host is a FQDN
 */
export function isFQDN(host: string) {
  return fqdnRegex.test(host);
}

/**
 * Check if url is valid
 * @param url
 * @returns true if valid
 */
export function isURL(url: string) {
  return urlPattern.test(url);
}

/**
 * Check if a url starts with https, the url must be a valid url.
 * @param url
 * @returns true if it's a https valid url
 */
export function isHttps(url: string) {
  return httpsPattern.test(url);
}
