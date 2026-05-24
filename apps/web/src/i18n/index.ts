import { DICT, DEFAULT_LOCALE, LOCALES, type Dict, type Locale } from './dict';

export { DICT, DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Dict, type Locale } from './dict';

/**
 * Resolve the current locale from Astro.currentLocale (which Astro sets
 * based on the matched route) and fall back to the default.
 */
export function getLocale(currentLocale: string | undefined): Locale {
  if (currentLocale && (LOCALES as readonly string[]).includes(currentLocale)) {
    return currentLocale as Locale;
  }
  return DEFAULT_LOCALE;
}

export function getDict(locale: Locale): Dict {
  return DICT[locale];
}

/**
 * Convert a path to its localized variant.
 *
 *   localizePath('/', 'ko')          // -> '/ko/'
 *   localizePath('/gallery/', 'ko')  // -> '/ko/gallery/'
 *   localizePath('/', 'en')          // -> '/'
 *
 * Assumes the default locale (en) has no prefix.
 */
export function localizePath(path: string, locale: Locale): string {
  // Normalize: ensure leading slash, drop any existing locale prefix.
  let p = path.startsWith('/') ? path : `/${path}`;
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (p === `/${l}` || p === `/${l}/`) {
      p = '/';
      break;
    }
    if (p.startsWith(`/${l}/`)) {
      p = p.slice(`/${l}`.length);
      break;
    }
  }
  if (locale === DEFAULT_LOCALE) return p;
  return p === '/' ? `/${locale}/` : `/${locale}${p}`;
}
