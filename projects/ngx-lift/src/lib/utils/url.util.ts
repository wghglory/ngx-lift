import {fqdnRegex, httpsPattern, ipRegex, urlPattern} from '../const';

export function isIP(ip: string) {
  return ipRegex.test(ip);
}

export function isFQDN(fqdn: string) {
  return fqdnRegex.test(fqdn);
}

export function isURL(url: string) {
  return urlPattern.test(url);
}

export function isHttps(url: string) {
  return httpsPattern.test(url);
}
