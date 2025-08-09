import { languages } from '#config/i18n';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import FetchBackend from 'i18next-fetch-backend';
import { initReactI18next } from 'react-i18next';
import xior from 'xior';

i18next
  .use(FetchBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      supportedLngs: languages.map((item) => item.value),
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      detection: {
        // order and from where user language should be detected
        order: ['navigator', 'cookie', 'localStorage', 'querystring', 'path', 'subdomain'],

        // keys or params to lookup language from
        lookupQuerystring: 'locale',
        lookupCookie: 'locale',
        lookupLocalStorage: 'locale',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,

        caches: ['localStorage', 'cookie'],
      },
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

i18next.on('languageChanged', (lng) => {
  xior.defaults.headers['Accept-Language'] = lng;
});
