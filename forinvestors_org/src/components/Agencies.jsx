import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, PieChart, Building2, Lock, ArrowRight } from 'lucide-react';
import SeoHead from './SeoHead';
import { useTranslation } from 'react-i18next';
import AgencyContactForm from './AgencyContactForm';
import ProcessSteps from './ProcessSteps';

export default function Agencies() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-midnight-950 pt-32 pb-20">
            <SeoHead title={t('seo.agencies.title')} description={t('seo.agencies.description')} routeKey="agencies" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block p-3 mb-6 rounded-full bg-gold-500/10 border border-gold-500/30"
                    >
                        <Handshake className="text-gold-500 w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-sans font-bold text-white mb-6"
                    >
                        {t('agencies_page.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
                    >
                        {t('agencies_page.subtitle')}
                    </motion.p>

                    {/* User Access Button placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="flex justify-center"
                    >
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-gold-500/50 text-gold-400 px-8 py-3 rounded-full font-medium transition-all backdrop-blur-sm group">
                            <Lock size={18} />
                            {t('agencies_page.access_button')}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-3">{t('agencies_page.disclaimer')}</p>
                </div>


                <div className="mb-20">
                    <ProcessSteps variant="agencies" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Value Props */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-2xl font-serif text-gold-500 mb-4">{t('agencies_page.collaboration_model')}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {t('agencies_page.collaboration_text_1').split('**Alianza**').map((part, i, arr) =>
                                    i === 0 ? <React.Fragment key={i}>{part}<strong className="text-white">Alianza</strong></React.Fragment> : part
                                )}
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed mt-4">
                                {t('agencies_page.collaboration_text_2')}
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                                {(t('agencies_page.benefits_list', { returnObjects: true }) || []).map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-6">
                            <div className="flex gap-4 p-4 bg-midnight-900/50 rounded-xl border border-white/5">
                                <Users className="text-gold-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">{t('agencies_page.verified_demand_title')}</h4>
                                    <p className="text-gray-400 text-sm">{t('agencies_page.verified_demand_text')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-midnight-900/50 rounded-xl border border-white/5">
                                <Building2 className="text-gold-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">{t('agencies_page.global_exposure_title')}</h4>
                                    <p className="text-gray-400 text-sm">{t('agencies_page.global_exposure_text')}</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* New Agency Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-midnight-800/80 backdrop-blur-md rounded-2xl border border-gold-500/20 p-1">
                            <div className="bg-midnight-950/50 rounded-xl p-6 md:p-8">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white">{t('agencies_page.form_title')}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{t('agencies_page.form_subtitle')}</p>
                                </div>
                                <AgencyContactForm explanation={t('agencies_page.form_explanation')} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
