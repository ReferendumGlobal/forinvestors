import React, { useState } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Get current active tab from URL path (remove leading /)
    // Default to 'hoteles' if root path
    const currentPath = location.pathname.replace('/', '') || 'hoteles';

    return (
        <nav className="fixed w-full z-50 bg-midnight-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                                <span className="text-midnight-950 font-serif font-bold text-2xl">U</span>
                            </div>
                            <div className="hidden md:block">
                                <span className="block text-white font-serif tracking-widest text-lg leading-none">URBINA</span>
                                <span className="block text-gold-500 text-xs tracking-[0.2em] leading-none">AGENCY</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {Object.values(categories).map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/${category.id}`}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === category.id
                                        ? 'text-gold-400 bg-white/5 border border-white/5'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {category.title}
                                </Link>
                            ))}
                            <Link
                                to="/blog"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPath === 'blog'
                                    ? 'text-gold-400 bg-white/5 border border-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Blog
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors cursor-pointer">
                            <Globe size={18} />
                            <span className="text-sm">ES</span>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        // Fix: precise positioning below navbar (h-20 = 5rem = 80px)
                        className="md:hidden fixed top-20 left-0 w-full bg-midnight-950 border-b border-white/5 shadow-2xl overflow-y-auto max-h-[calc(100vh-5rem)]"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {Object.values(categories).map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/${category.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === category.id
                                        ? 'text-gold-400 bg-white/5'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <category.icon size={20} className={currentPath === category.id ? 'text-gold-500' : 'text-gray-500'} />
                                        {category.title}
                                    </div>
                                </Link>
                            ))}
                            <Link
                                to="/blog"
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-4 rounded-md text-base font-medium ${currentPath === 'blog'
                                    ? 'text-gold-400 bg-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-gold-500 w-5 flex justify-center">•</span>
                                    Blog
                                </div>
                            </Link>
                            <div className="border-t border-white/10 mt-4 pt-4 px-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Globe size={18} />
                                    <span>ES</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
