
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Globe, Users } from 'lucide-react';
import SeoHead from './SeoHead';

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="bg-midnight-950 min-h-screen pt-20">
            <SeoHead
                title={`${t('nav.about')} | Enter OffMarket`}
                description={t('about.description_1')}
            />
            {/* Legacy Section extracted from Home */}
            <div className="py-24 md:py-32 relative bg-midnight-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-sm overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                                    alt="Urbina Family Legacy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gold-900/20 mix-blend-multiply"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-midnight-900 border border-gold-500/30 p-6 flex flex-col justify-center items-center text-center backdrop-blur-md">
                                <Award className="w-8 h-8 text-gold-500 mb-2" />
                                <span className="text-4xl font-serif text-white font-bold">1920</span>
                                <span className="text-xs text-gold-400 uppercase tracking-widest mt-1">Est. Origins</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 border-l-4 border-gold-500 pl-6">
                                {t('legacy.title')}
                            </h2>
                            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                                <p>
                                    {t('legacy.text1')}
                                </p>
                                <p>
                                    {t('legacy.text2')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                <div className="group p-6 border border-white/5 hover:border-gold-500/30 transition-colors bg-white/5 backdrop-blur-sm">
                                    <Globe className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-white font-serif text-xl mb-2">{t('legacy.secrets_title')}</h3>
                                    <p className="text-sm text-gray-400">{t('legacy.secrets_text')}</p>
                                </div>
                                <div className="group p-6 border border-white/5 hover:border-gold-500/30 transition-colors bg-white/5 backdrop-blur-sm">
                                    <Users className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-white font-serif text-xl mb-2">{t('legacy.success_title')}</h3>
                                    <p className="text-sm text-gray-400">{t('legacy.success_text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
