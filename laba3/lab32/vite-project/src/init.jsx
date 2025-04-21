import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en';
import ruTranslations from './locales/ru';

const initializeI18n = () => {
  const i18nInstance = i18n.createInstance();
  
  i18nInstance
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations },
        ru: { translation: ruTranslations }
      },
      lng: localStorage.getItem('language') || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      pluralization: {
        languages: ['ru', 'en'],
        function(value, lng) {
          if (lng === 'ru') {
            if (value === 0) return 'zero';
            if (value % 10 === 1 && value % 100 !== 11) return 'one';
            if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return 'few';
            if (value % 10 === 0 || [5, 6, 7, 8, 9].includes(value % 10) || [11, 12, 13, 14].includes(value % 100)) return 'many';
            return 'other';
          }
          if (lng === 'en') {
            if (value === 0) return 'zero';
            if (value === 1) return 'one';
            return 'other';
          }
          return 'other';
        }
      }
    });

  return i18nInstance;
};

export default initializeI18n;