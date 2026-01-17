import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Key, Building2, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ServicesSection() {
    const { t } = useTranslation();
    const { lang } = useParams();

    const services = [
        {
            id: 'investors',
            icon: TrendingUp,
            link: `/${lang}/investments`,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
        },
        {
            id: 'owners',
            icon: Key,
            link: `/${lang}/sell`,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
        },
        {
            id: 'agencies',
            icon: Building2,
            link: `/${lang}/agencias`,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <section className="py-24 bg-midnight-900 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
                        {t('services.title')}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif text-white font-bold">
                        {t('services.subtitle')}
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-xl bg-midnight-950 border border-white/10 hover:border-gold-500/50 transition-all duration-500"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={service.image}
                                    alt={t(`services.${service.id}.title`)}
                                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent" />
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-midnight-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 group-hover:border-gold-500/50 group-hover:bg-gold-500/10 transition-colors duration-300">
                                    <service.icon className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
                                </div>

                                <h4 className="text-2xl font-serif text-white mb-4">
                                    {t(`services.${service.id}.title`)}
                                </h4>

                                <p className="text-gray-400 mb-8 leading-relaxed max-w-sm flex-grow">
                                    {t(`services.${service.id}.desc`)}
                                </p>

                                <Link
                                    to={service.link}
                                    className="inline-flex items-center gap-2 text-gold-400 text-sm tracking-widest uppercase hover:text-white transition-colors group-hover:translate-x-1 duration-300"
                                >
                                    {t(`services.${service.id}.cta`)}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
