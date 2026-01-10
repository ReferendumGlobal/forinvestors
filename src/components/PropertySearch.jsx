import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';

// Helper component for counting animation
function CountingLabel({ onComplete, labelAvailable }) {
    const [count, setCount] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const intervalTime = 50; // Update every 50ms
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            // Random number between 1 and 50
            setCount(Math.floor(Math.random() * 50) + 1);

            if (currentStep >= steps) {
                clearInterval(timer);
                setFinished(true);
                if (onComplete) onComplete();
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    if (finished) {
        return <span className="text-xl text-gold-400 uppercase">{labelAvailable}</span>;
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

    const [results, setResults] = useState([]);

    // Cities where we show specific numbers (mock)
    const TIER_1_CITIES = ['madrid', 'barcelona', 'paris', 'london', 'londres', 'dubai', 'new york', 'miami', 'marbella', 'ibiza', 'mallorca', 'milan', 'roma', 'berlin', 'munich'];
    const CATEGORIES = ['hoteles', 'inversiones', 'terrenos', 'lujo', 'bodegas'];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!location.trim()) return;

        setSearching(true);
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
        }, 1500);
    };

    const handleRequest = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
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
                {hasSearched && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto bg-midnight-800/50 backdrop-blur-md border border-gold-500/30 rounded-2xl p-8 md:p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-500 w-8 h-8" />
                        </div>

                        <h3 className="text-3xl font-serif text-white mb-4">
                            {t('search.results_found')} <span className="text-gold-400">{location}</span>
                        </h3>

                        <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                            {t('search.cta_text')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                            {results.map((item) => (
                                <div key={item.id} className="bg-midnight-950 p-6 rounded-xl border border-white/5">
                                    <Building className="text-gold-500 mb-3 w-6 h-6" />
                                    <div className="text-2xl font-bold text-white mb-1">
                                        <CountingLabel labelAvailable={t('search.available_multiple')} />
                                    </div>
                                    <div className="text-sm text-gray-400 leading-tight">
                                        {t(`nav.${item.id}`)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!showForm ? (
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-midnight-950 font-bold py-4 px-12 rounded-lg transition-all duration-300 text-lg uppercase tracking-wider"
                            >
                                {t('search.cta_button')} <ArrowRight className="w-5 h-5" />
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
                    </motion.div>
                )}
            </div>
        </div>
    );
}
