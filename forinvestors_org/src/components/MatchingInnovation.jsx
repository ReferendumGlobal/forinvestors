import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Cpu, ShieldCheck, Zap, Network } from 'lucide-react';

export default function MatchingInnovation() {
    const { t } = useTranslation();

    const features = [
        {
            icon: Cpu,
            key: 'algo'
        },
        {
            icon: ShieldCheck,
            key: 'privacy'
        },
        {
            icon: Zap,
            key: 'speed'
        }
    ];

    return (
        <section className="py-24 bg-midnight-950 relative overflow-hidden">
            {/* Tech Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
                            {t('innovation.subtitle')}
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mb-6">
                            {t('innovation.title')}
                        </h3>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t('innovation.description')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-gold-500/30 transition-all duration-300 group"
                        >
                            <div className="mb-6 inline-block p-4 bg-midnight-900 rounded-lg group-hover:bg-gold-500/10 transition-colors">
                                <feature.icon className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-serif text-white mb-4">
                                {t(`innovation.features.${feature.key}.title`)}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t(`innovation.features.${feature.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-midnight-900 to-midnight-800 border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gold-500/5 skew-x-12 transform translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h4 className="text-2xl font-serif text-white mb-2">BigInvestors.net Engine™</h4>
                            <p className="text-gray-400 max-w-xl">
                                {t('innovation.engine_text')}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-gold-400">
                            <Network className="w-12 h-12" strokeWidth={1} />
                            <div className="text-left">
                                <div className="text-3xl font-bold font-mono">98.5%</div>
                                <div className="text-xs uppercase tracking-wider">Match Accuracy</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
