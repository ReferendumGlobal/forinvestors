import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getCategoryFromSlug, getSlugFromCategory } from '../routes';

const languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useParams(); // Current lang param
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    const handleLanguageChange = (newLangCode) => {
        // Smart Redirect:
        // 1. Identify current 'key' (category or page ID) from current slug + current lang
        // 2. Resolve 'newSlug' for that 'key' in new lang

        const currentPath = location.pathname;
        const parts = currentPath.split('/');
        // path: /es/inversiones -> parts: ['', 'es', 'inversiones']
        const currentSlug = parts[2];

        let newPath = `/${newLangCode}`;

        if (currentSlug) {
            // Find key (e.g. 'investments') using current lang decoding
            const activeKey = getCategoryFromSlug(currentSlug, lang || 'en');

            if (activeKey) {
                // Get new slug (e.g. 'investments' for en)
                const newSlug = getSlugFromCategory(activeKey, newLangCode);
                newPath = `/${newLangCode}/${newSlug}`;
            } else {
                // Fallback: if we can't map it, just go to root of new lang
                // or optionally keep slug if it happened to be universal?
                // Safest is root to avoid 404s
                newPath = `/${newLangCode}`;
            }
        }

        navigate(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
            >
                <Globe size={16} />
                <span className="hidden sm:inline">{currentLang.label}</span>
                <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-midnight-950 border border-white/10 rounded-xl shadow-xl z-[100] py-1 max-h-[80vh] overflow-y-auto">
                        {languages.map((lng) => (
                            <button
                                key={lng.code}
                                onClick={() => handleLanguageChange(lng.code)}
                                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${i18n.language === lng.code ? 'text-gold-400 bg-white/5' : 'text-gray-300'}`}
                            >
                                <span className="text-lg">{lng.flag}</span>
                                <span>{lng.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
