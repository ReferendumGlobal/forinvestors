import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Shield, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import SeoHead from './SeoHead';
import MatchingInnovation from './MatchingInnovation';

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const { t } = useTranslation();

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative">
            <SeoHead
                title={t('seo.title')}
                description={t('seo.description')}
            />

            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1512850183-6d7990f42385?auto=format&fit=crop&q=80"
                        alt="Luxury Real Estate"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/80 via-midnight-950/60 to-midnight-950"></div>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 inline-block"
                    >
                        <Shield className="w-16 h-16 text-gold-500 mx-auto mb-6" strokeWidth={1} />
                        <h2 className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase mb-4">OFFMARKET INVESTS</h2>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
                        {t('hero.shield')}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-12"
                    >
                        <Trans i18nKey="hero.subtitle" />
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="investments"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent overflow-hidden rounded-none transition-all duration-300"
                        >
                            <div className="absolute inset-0 border border-gold-500/30 group-hover:border-gold-500 transition-colors duration-500"></div>
                            <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500"></div>
                            <span className="relative text-gold-400 font-serif text-lg tracking-wider group-hover:text-gold-300 transition-colors">
                                {t('hero.cta')}
                            </span>
                            <ChevronRight className="relative w-5 h-5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 z-20 hidden md:flex justify-center animate-bounce">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
                </div>
            </div>

            {/* Innovation Section */}
            <MatchingInnovation />
        </div>
    );
}
