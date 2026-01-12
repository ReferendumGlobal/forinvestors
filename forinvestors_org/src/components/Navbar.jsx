import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { getSlugFromCategory, getCategoryFromSlug, routeConfig } from '../routes';

export default function Navbar({ categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { lang } = useParams(); // Get lang from URL
    const { t } = useTranslation();

    const pathParts = location.pathname.split('/');
    // pathParts[1] is lang, pathParts[2] is slug
    const currentSlug = pathParts[2] || '';

    // Resolve current category from slug to highlight correctly
    const currentCategory = getCategoryFromSlug(currentSlug, lang);
    // Also check static pages
    const currentStaticPage = Object.entries(routeConfig[lang] || routeConfig['en']).find(([key, slug]) => slug === currentSlug)?.[0];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to get slug for any key (category or static)
    const getLink = (key) => {
        return getSlugFromCategory(key, lang);
    };

    const isActive = (key) => {
        return currentCategory === key || currentStaticPage === key;
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-midnight-950/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to={`/${lang}`} className="flex-shrink-0 group">
                            <Logo className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        <div className="flex items-center gap-1 bg-white/5 rounded-2xl p-2 border border-white/5 backdrop-blur-sm">
                            {Object.entries(categories).map(([key, category]) => (
                                <Link
                                    key={key}
                                    to={getLink(key)}
                                    className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 whitespace-normal text-center max-w-[120px] leading-tight ${isActive(key)
                                        ? 'bg-gold-500 text-midnight-950 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {t(`nav.${key}`)}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 lg:gap-4">
                            <Link
                                to={getLink('search')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('search')
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.search')}
                            </Link>
                            <Link
                                to={getLink('blog')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('blog')
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.blog')}
                            </Link>
                            <Link
                                to={getLink('agencies')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('agencies')
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.agencies')}
                            </Link>

                            <div className="h-6 w-px bg-white/10 mx-1"></div>

                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute w-full bg-midnight-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2">
                    {Object.entries(categories).map(([key, category]) => (
                        <Link
                            key={key}
                            to={getLink(key)}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-4 rounded-md text-base font-medium ${isActive(key)
                                ? 'text-gold-400 bg-white/5 border-l-2 border-gold-500 pl-2'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <category.icon size={18} className={isActive(key) ? 'text-gold-500' : 'text-gray-500'} />
                                {t(`nav.${key}`)}
                            </div>
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2"></div>
                    <Link
                        to={getLink('search')}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${isActive('search')
                            ? 'text-gold-400 bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">•</span>
                            {t('nav.search')}
                        </div>
                    </Link>
                    <Link
                        to={getLink('blog')}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${isActive('blog')
                            ? 'text-gold-400 bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">•</span>
                            {t('nav.blog')}
                        </div>
                    </Link>
                    <Link
                        to={getLink('agencies')}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${isActive('agencies')
                            ? 'text-gold-400 bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">•</span>
                            {t('nav.agencies')}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
