import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Brain, Globe, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const steps = [
        {
            icon: Users,
            key: '1',
            color: 'text-indigo-400'
        },
        {
            icon: Brain,
            key: '2',
            color: 'text-purple-400'
        },
        {
            icon: Shield,
            key: '3',
            color: 'text-emerald-400'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Hero Section */}
            <section className="relative pt-52 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-200">
                            {t('about.hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {t('about.hero.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Legacy Section - "The Shadows" */}
            <section className="py-20 px-6 bg-slate-950 relative border-t border-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <Shield className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">{t('about.legacy.title')}</h2>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                            {t('about.legacy.description')}
                        </p>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-2xl blur-2xl" />
                        <div className="relative bg-slate-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-6 bg-slate-950/50 rounded-xl border border-white/5">
                                    <span className="block text-4xl font-bold text-white mb-2">40+</span>
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">Years</span>
                                </div>
                                <div className="text-center p-6 bg-slate-950/50 rounded-xl border border-white/5">
                                    <span className="block text-4xl font-bold text-white mb-2">100%</span>
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">Off-Market</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Evolution Section - "The Light of AI" */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-950/20" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="max-w-6xl mx-auto relative z-10 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-4 border border-indigo-500/20">
                            {t('about.mission.title')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            {t('about.evolution.title')}
                        </h2>
                        <p className="text-xl text-indigo-200/80 max-w-3xl mx-auto">
                            {t('about.evolution.description')}
                        </p>
                    </motion.div>
                </div>

                {/* How It Works Grid */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-900/40 p-8 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-slate-900/60 transition-colors group"
                        >
                            <div className={`p-4 bg-slate-950 rounded-xl inline-block mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                                <step.icon className={`w-8 h-8 ${step.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {t(`about.how_it_works.steps.${step.key}.title`)}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {t(`about.how_it_works.steps.${step.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-slate-950 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        {t('about.mission.description')}
                    </h2>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/investments"
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                        >
                            {t('hero.cta')} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
