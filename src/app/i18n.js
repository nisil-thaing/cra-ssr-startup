import i18next from 'i18next';
import ICU from 'i18next-icu';
import middleware from 'i18next-http-middleware';

import locale_en from 'locale/en.json';
import locale_vn from 'locale/vn.json';
import locale_cn from 'locale/cn.json';
import locale_ar from 'locale/ar.json';

const langResources = {
  en: {
    translation: locale_en
  },
  vn: {
    translation: locale_vn
  },
  cn: {
    translation: locale_cn
  },
  ar: {
    translation: locale_ar
  }
};

i18next
  .use(ICU)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: { escapeValue: false },
    resources: langResources,
    preload: ['en', 'vn', 'cn', 'ar']
  });

export default i18next;