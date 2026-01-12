import React from 'react';
import { X, FileText, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose, section }) {
    if (!isOpen) return null;

    const content = {
        terms: {
            title: "Terms & Conditions",
            icon: FileText,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p><strong>1. Company Identification</strong></p>
                    <p>This website is owned and operated by <strong>Urbina Agency LLC</strong>, with tax identification number (EIN) <strong>61-2276664</strong>. Our registered address is: <strong>7345 W SAND LAKE RD STE 210 OFFICE 7997 ORLANDO, FL, 32819 - UNITED STATES</strong>.</p>

                    <p><strong>2. Site Usage</strong></p>
                    <p>Access to our investment portfolio is reserved exclusively for qualified investors. The information contained on this website is confidential.</p>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            icon: Shield,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p>At <strong>Urbina Agency LLC</strong>, we are committed to protecting your privacy.</p>
                    <p>The personal and financial information you provide, including Proof of Funds (POF) documents, will be treated with the strictest confidentiality and used solely to verify your solvency and present you with suitable investment opportunities.</p>
                    <p>We do not share your data with third parties without your explicit consent, except when strictly necessary for the formalization of a real estate transaction.</p>
                </div>
            )
        },
        disclaimer: {
            title: "Legal Notice & Disclaimer",
            icon: AlertTriangle,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p>The information presented on this website is for informational purposes and does not constitute a binding offer of sale or financial advice.</p>
                    <p>All real estate investments carry risks. Prices and availability of assets are subject to change without prior notice. We strongly recommend conducting independent legal and financial Due Diligence prior to any transaction.</p>
                    <p><strong>Urbina Agency LLC</strong> acts as an intermediary and facilitator, not as a regulated financial advisor.</p>
                </div>
            )
        }
    };

    const currentContent = content[section] || content.terms;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-midnight-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-midnight-900 border border-gold-500/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl"
                >
                    <div className="sticky top-0 bg-midnight-900/95 backdrop-blur border-b border-white/5 p-6 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <currentContent.icon className="text-gold-500" size={24} />
                            <h2 className="text-xl font-serif font-bold text-white">{currentContent.title}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        {currentContent.text}

                        <div className="mt-8 pt-6 border-t border-white/5 text-xs text-gray-500 text-center">
                            © {new Date().getFullYear()} Urbina Agency LLC. All rights reserved.
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
