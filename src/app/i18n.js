import i18next from 'i18next';
import ICU from 'i18next-icu';

import locale_en from 'locale/en.json';
import locale_vn from 'locale/vn.json';
import locale_cn from 'locale/cn.json';
import locale_ar from 'locale/ar.json';

i18next
  .use(ICU)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: { escapeValue: false },
    resources: {
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
    }
  });

export default i18next;