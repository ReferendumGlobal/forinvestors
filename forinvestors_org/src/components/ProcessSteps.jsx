import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle, Upload, Search, Users, Handshake, CreditCard, PieChart } from 'lucide-react';

export default function ProcessSteps({ variant = 'agencies' }) {
    const { t } = useTranslation();

    const icons = {
        FileText,
        CheckCircle,
        Upload,
        Search,
        Users,
        Handshake,
        CreditCard,
        PieChart
    };

    const stepsData = t(`steps.${variant}`, { returnObjects: true });
    const steps = Array.isArray(stepsData) ? stepsData : [];

    return (
        <section className="py-10 bg-midnight-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-sans font-bold text-white mb-6"
                    >
                        {t(`steps.${variant}_title`)}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        {t(`steps.${variant}_subtitle`)}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/30 to-gold-500/0"></div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 ${variant === 'agencies' ? 'lg:grid-cols-2 max-w-5xl mx-auto' : 'lg:grid-cols-4'} gap-8 lg:gap-12`}>
                        {steps.map((step, index) => {
                            const Icon = icons[step.icon] || FileText;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-midnight-800 border border-gold-500/30 flex items-center justify-center text-gold-500 font-bold text-sm z-20">
                                        {index + 1}
                                    </div>

                                    <div className="bg-midnight-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl h-full hover:border-gold-500/30 transition-all duration-300 group-hover:-translate-y-2">
                                        <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                                            <Icon className="text-gold-400 w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
