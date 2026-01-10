import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqs } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-20 bg-midnight-950 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-white mb-4 flex items-center justify-center gap-3">
                        <HelpCircle className="text-gold-500" /> Preguntas Frecuentes
                    </h2>
                    <p className="text-gray-400">Todo lo que necesita saber antes de invertir con nosotros.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-midnight-900/50 hover:bg-midnight-900 transition-colors">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-medium text-gray-200">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-gold-500 flex-shrink-0 ml-4" />
                                ) : (
                                    <ChevronDown className="text-gray-500 flex-shrink-0 ml-4" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
