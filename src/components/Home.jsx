import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Key, FileText } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            {/* Mobile: pt-24 (6rem=96px) is enough to clear 80px header + space. Desktop pt-32. */}
            <div className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="International Business"
                        className="w-full h-full object-cover opacity-30 invert-[.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-950/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
                    <div className="max-w-3xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-gold-500/30 rounded-full bg-gold-900/30 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-gold-400 animate-pulse"></span>
                                <span className="text-sm font-medium text-gold-300 tracking-wider uppercase">Global Investment</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-sans font-bold text-white mb-8 leading-tight tracking-tight">
                                The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">Discretion</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mb-12 border-l-4 border-gold-500 pl-6"
                        >
                            "We work with a portfolio that is <strong>not published on real estate portals</strong> but is of high quality. Our clients entrust us with valuable secrets, and we return successful businesses."
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                to="/investments"
                                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1 active:scale-95 touch-manipulation"
                            >
                                Enter Portfolio <ChevronRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Legacy Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500/50"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gold-500/5 rounded-2xl transform rotate-3"></div>
                        <div className="relative bg-midnight-900 border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-2xl font-serif text-gold-400 mb-6">A Legacy of Honor</h3>

                            <div className="mb-8 flex justify-center gap-4">
                                <div className="relative w-1/2 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute inset-0 border-2 border-gold-500/20 translate-x-2 translate-y-2 rounded-lg"></div>
                                    <img
                                        src="/grandparents.jpg"
                                        alt="Francisco and Angelita Urbina"
                                        className="rounded-lg shadow-2xl sepia-[0.3] grayscale-[0.2] border border-white/10"
                                    />
                                    <p className="text-xs text-center text-gray-500 mt-2 font-serif italic">Francisco & Angelita Urbina</p>
                                </div>
                                <div className="relative w-1/3 transform rotate-3 hover:rotate-0 transition-transform duration-500 mt-8">
                                    <div className="absolute inset-0 border-2 border-gold-500/20 translate-x-2 translate-y-2 rounded-full"></div>
                                    <img
                                        src="/legacy_coin.jpg"
                                        alt="Jose Maria Urbina Legacy"
                                        className="rounded-full shadow-2xl sepia-[0.5] grayscale-[0.2] border border-white/10 aspect-square object-cover"
                                    />
                                    <p className="text-xs text-center text-gray-500 mt-2 font-serif italic">J.M. Urbina Legacy</p>
                                </div>
                            </div>

                            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                                <p>
                                    The tradition of Urbina Agency is not born in the market, but in honor and service. Our DNA comes from <strong>Francisco and Angelita Urbina</strong> (pictured), my grandparents, who built the foundations of family and integrity.
                                </p>
                                <p>
                                    And from my great-grandfather, <strong>Jose Maria Urbina</strong>, a high-ranking military officer. From him, we learned that the most valuable information is that which is protected, and that the success of a mission depends on precision and silence.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-900/20 rounded-xl flex items-center justify-center border border-gold-500/20">
                                <Key className="w-6 h-6 text-gold-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Valuable Secrets</h4>
                                <p className="text-gray-400">We treat every investment intention as high-level classified information. Your identity and objectives are armored.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-900/20 rounded-xl flex items-center justify-center border border-gold-500/20">
                                <FileText className="w-6 h-6 text-gold-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Declassified Success</h4>
                                <p className="text-gray-400">The only trace we leave is success. We transform private strategies into public results that speak for themselves.</p>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
}
