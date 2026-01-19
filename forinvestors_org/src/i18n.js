import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import es from './locales/es.json';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';
import hi from './locales/hi.json';

const resources = {
    es: { translation: es },
    en: { translation: en },
    zh: { translation: zh },
    ru: { translation: ru },
    ar: { translation: ar },
    de: { translation: de },
    fr: { translation: fr },
    pt: { translation: pt },
    ja: { translation: ja },
    hi: { translation: hi },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en', // Default to English for forinvestors.org
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            checkWhitelist: true,
            caches: ['localStorage']
        },
        supportedLngs: ['es', 'en', 'zh', 'ru', 'ar', 'de', 'fr', 'pt', 'ja', 'hi'],
    });

export default i18n;
