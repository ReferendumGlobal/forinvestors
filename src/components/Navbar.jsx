import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    // Get current path relative to language
    // location.pathname is like /es/blog
    const pathParts = location.pathname.split('/');
    // pathParts[0] = "", pathParts[1] = "es", pathParts[2] = "blog"
    const currentPath = pathParts[2] || ''; // 'blog', 'agencias', or empty for home

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className="fixed w-full z-50 bg-midnight-950/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 group">
                            <Logo className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2 xl:gap-8">
                        <div className="flex items-center gap-1 bg-white/5 rounded-2xl p-2 border border-white/5 backdrop-blur-sm">
                            {Object.entries(categories).map(([key, category]) => (
                                <Link
                                    key={key}
                                    to={key}
                                    className={`px-2 xl:px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 whitespace-normal text-center max-w-[120px] leading-tight ${currentPath === key
                                        ? 'bg-gold-500 text-midnight-950 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {t(`nav.${key}`)}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 xl:gap-4">
                            <Link
                                to="search"
                                className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === 'search'
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.search')}
                            </Link>
                            <Link
                                to="blog"
                                className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === 'blog'
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.blog')}
                            </Link>
                            <Link
                                to="agencias"
                                className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === 'agencias'
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.agencies')}
                            </Link>
                            <Link
                                to="sell"
                                className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === 'sell'
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t('nav.sell')}
                            </Link>

                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-midnight-950"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                {t('nav.access')}
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
                            to={key}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === key
                                ? 'text-gold-400 bg-white/5 border-l-2 border-gold-500 pl-2'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <category.icon size={18} className={currentPath === key ? 'text-gold-500' : 'text-gray-500'} />
                                {t(`nav.${key}`)}
                            </div>
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2"></div>
                    <Link
                        to="search"
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === 'search'
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
                        to="blog"
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === 'blog'
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
                        to="agencias"
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === 'agencias'
                            ? 'text-gold-400 bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">•</span>
                            {t('nav.agencies')}
                        </div>
                    </Link>
                    <Link
                        to="sell"
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === 'sell'
                            ? 'text-gold-400 bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">•</span>
                            {t('nav.sell')}
                        </div>
                    </Link>
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-4 rounded-md text-base font-medium text-gold-400 bg-gold-500/10 border border-gold-500/30 mt-2"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gold-500 w-5 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </span>
                            {t('nav.access')}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
