import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Shield, Award, Users, Globe, Cpu } from 'lucide-react';
// ...
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 inline-block"
                    >
                        <Cpu className="w-16 h-16 text-gold-500 mx-auto mb-6" strokeWidth={1} />
                        <h2 className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase mb-4">AI REAL ESTATE INTELLIGENCE</h2>
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
                </div >

    <div className="absolute bottom-10 left-0 right-0 z-20 hidden md:flex justify-center animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
    </div>
            </div >

    {/* Innovation Section */ }
    < MatchingInnovation />



    {/* Legacy Section */ }
    < div className = "py-24 md:py-32 relative bg-midnight-950" >
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
            </div >
        </div >
    );
}
