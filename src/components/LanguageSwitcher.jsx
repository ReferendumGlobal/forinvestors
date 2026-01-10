import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

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
        // Replace the current language segment in the URL with the new one
        // Assumption: URL is always /:lang/...
        // If we are at /es/hoteles, and switch to en, go to /en/hoteles.

        // Simple regex replacement for safety if we strictly follow /:lang scheme
        const currentPath = location.pathname;
        const parts = currentPath.split('/');
        // parts[0] is empty, parts[1] is 'es' (or 'en' etc)
        if (parts.length > 1) {
            parts[1] = newLangCode;
        } else {
            // specific case if root /
            parts.push(newLangCode);
        }
        const newPath = parts.join('/');

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
                    <div className="absolute right-0 mt-2 w-48 bg-midnight-950 border border-white/10 rounded-xl shadow-xl z-50 py-1 max-h-[80vh] overflow-y-auto">
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
