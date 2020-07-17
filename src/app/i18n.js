import i18next from 'i18next';
import ICU from 'i18next-icu';
import middleware from 'i18next-http-middleware';

import locale_en from 'locale/en.json';
import locale_vn from 'locale/vn.json';
import locale_cn from 'locale/cn.json';
import locale_ar from 'locale/ar.json';

import { SUPPORTED_LANGUAGE_CODES } from './core/constants/ui-state.constant';

const langResources = {
  [SUPPORTED_LANGUAGE_CODES.ENGLISH]: {
    translation: locale_en
  },
  [SUPPORTED_LANGUAGE_CODES.VIETNAMESE]: {
    translation: locale_vn
  },
  [SUPPORTED_LANGUAGE_CODES.CHINESE_SIMPLIFY]: {
    translation: locale_cn
  },
  [SUPPORTED_LANGUAGE_CODES.ARABIC]: {
    translation: locale_ar
  }
};

i18next
  .use(ICU)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: SUPPORTED_LANGUAGE_CODES.ENGLISH,
    lng: SUPPORTED_LANGUAGE_CODES.ENGLISH,
    interpolation: { escapeValue: false },
    resources: langResources,
    preload: Object.keys(SUPPORTED_LANGUAGE_CODES)
  });

export default i18next;