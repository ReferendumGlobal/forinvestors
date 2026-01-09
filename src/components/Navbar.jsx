import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ categories, activeTab, setActiveTab }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-midnight-950/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('hotels')}>
                        {/* Logo / Brand Name */}
                        <span className="text-2xl font-serif text-gold-400 font-bold tracking-wider">FOR INVESTORS</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {Object.values(categories).map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`${activeTab === cat.id ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-300 hover:text-white'
                                        } px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-300`}
                                >
                                    {cat.id.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
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
                        className="md:hidden bg-midnight-900 border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {Object.values(categories).map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveTab(cat.id);
                                        setIsOpen(false);
                                    }}
                                    className={`${activeTab === cat.id ? 'text-gold-400' : 'text-gray-300'
                                        } block px-3 py-2 rounded-md text-base font-medium uppercase w-full text-left`}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
