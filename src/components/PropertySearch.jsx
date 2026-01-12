import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, Building, CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';

// Helper component for counting animation
function CountingLabel({ onComplete, labelAvailable }) {
    const [count, setCount] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const duration = 2500; // Reduced to 2.5s for better UX
        const intervalTime = 30;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setCount(Math.floor(Math.random() * 99) + 1);

            if (currentStep >= steps) {
                clearInterval(timer);
                setFinished(true);
                if (onComplete) onComplete();
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    if (finished) {
        return (
            <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xl text-gold-400 uppercase drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
            >
                {labelAvailable}
            </motion.span>
        );
    }

    return <span>{count}</span>;
}

export default function PropertySearch() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [searching, setSearching] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [prizeWon, setPrizeWon] = useState(false);
    const resultsRef = useRef(null);

    const [results, setResults] = useState([]);

    // SPANISH keys for parainversores.com (matches es.json)
    const CATEGORIES = ['hoteles', 'inversiones', 'terrenos', 'lujo', 'bodegas'];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!location.trim()) return;

        setSearching(true);
        setHasSearched(false);
        setPrizeWon(false);

        // Simulate API call
        setTimeout(() => {
            // Show all categories
            const selectedCategories = CATEGORIES;

            const newResults = selectedCategories.map(cat => ({
                id: cat,
                count: 'available'
            }));

            setResults(newResults);
            setSearching(false);
            setHasSearched(true);
            setShowForm(false); // Reset form visibility on new search

            // Scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

        }, 1500);
    };

    return (
        <div className="min-h-screen bg-midnight-950 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block p-3 mb-6 rounded-full bg-gold-500/10 border border-gold-500/30"
                    >
                        <Search className="text-gold-500 w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-6 font-bold"
                    >
                        {t('search.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        {t('search.subtitle')}
                    </motion.p>
                </div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-0 bg-gold-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                        <div className="relative flex items-center bg-midnight-900 border border-white/10 rounded-full p-2 pr-2 shadow-2xl focus-within:border-gold-500/50 transition-colors">
                            <MapPin className="ml-4 text-gold-500 w-6 h-6 flex-shrink-0" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder={t('search.placeholder')}
                                className="w-full bg-transparent border-none text-white text-lg px-4 py-3 focus:outline-none placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={searching}
                                className="bg-gold-500 hover:bg-gold-400 text-midnight-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 disabled:opacity-70 flex items-center gap-2"
                            >
                                {searching ? '...' : t('search.button')}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Results Section */}
                <div ref={resultsRef}>
                    <AnimatePresence>
                        {hasSearched && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="max-w-4xl mx-auto bg-midnight-800/50 backdrop-blur-md border border-gold-500/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                            >
                                {/* Prize Effect Background */}
                                {prizeWon && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-gold-500/5 z-0"
                                    />
                                )}

                                <div className="relative z-10 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-500 w-8 h-8" />
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-3xl font-serif text-white mb-4">
                                        {t('search.results_found')} <span className="text-gold-400">{location}</span>
                                    </h3>

                                    <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                                        {t('search.cta_text')}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                                        {results.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`p-6 rounded-xl border transition-colors ${prizeWon ? 'bg-midnight-900 border-gold-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]' : 'bg-midnight-950 border-white/5'}`}
                                            >
                                                <Building className={`mb-3 w-6 h-6 ${prizeWon ? 'text-gold-400' : 'text-gold-500'}`} />
                                                <div className="text-2xl font-bold text-white mb-1 h-8 flex items-center">
                                                    <CountingLabel
                                                        labelAvailable={t('search.available_multiple')}
                                                        onComplete={() => index === results.length - 1 && setPrizeWon(true)}
                                                    />
                                                </div>
                                                <div className="text-sm text-gray-400 leading-tight">
                                                    {t(`nav.${item.id}`)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {!showForm ? (
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="inline-flex items-center gap-2 bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-midnight-950 font-bold py-4 px-12 rounded-lg transition-all duration-300 text-lg uppercase tracking-wider relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {t('search.cta_button')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            {prizeWon && (
                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3 }}
                                                    className="absolute inset-0 bg-white/20 skew-x-12"
                                                />
                                            )}
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-8 text-left max-w-2xl mx-auto"
                                        >
                                            <ContactForm categoryName={`Búsqueda Off-Market: ${location}`} />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
