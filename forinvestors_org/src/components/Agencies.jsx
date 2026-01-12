import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, PieChart, Send, CheckCircle, Upload, Loader2, Building2 } from 'lucide-react';
import SeoHead from './SeoHead';
import { useTranslation } from 'react-i18next';

export default function Agencies() {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        agencyName: '',
        email: '',
        phone: '',
        propertyType: '',
        message: '',
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('agencyName', formState.agencyName);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('propertyType', formState.propertyType);
        formData.append('message', formState.message);
        formData.append('_subject', `New Agency Collaboration: ${formState.agencyName}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        if (formState.file) {
            formData.append('attachment', formState.file);
        }

        try {
            const response = await fetch("https://formsubmit.co/ajax/urbinaagency@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setSubmitted(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-midnight-950 pt-32 pb-20">
            <SeoHead title={`${t('nav.agencies')} | Urbina Agency`} description="We collaborate with agencies that have singular assets. We bring the final investor." routeKey="agencies" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
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
                        For Real Estate Agencies
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        We collaborate with agencies that have singular assets. We bring the final investor.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Value Props */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-900/20 border border-gold-500/20 flex items-center justify-center">
                                <Users className="text-gold-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">High-Level Investors</h3>
                                <p className="text-gray-400">We work with Family Offices and investment funds that don't waste time. If the asset fits, we close the deal.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-900/20 border border-gold-500/20 flex items-center justify-center">
                                <PieChart className="text-gold-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">50% Commission Split</h3>
                                <p className="text-gray-400">We believe in fair play and long-term relationships. We split fees 50/50 on all jointly closed operations.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-900/20 border border-gold-500/20 flex items-center justify-center">
                                <Building2 className="text-gold-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Off-Market & Discretion</h3>
                                <p className="text-gray-400">We protect your mandate. Your properties will not be published on portals, only presented to qualified buyers.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Agency Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {submitted ? (
                            <div className="bg-midnight-800 border border-gold-500/30 rounded-2xl p-12 text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                                <h3 className="text-2xl font-sans text-white mb-4">Proposal Sent</h3>
                                <p className="text-gray-400 mb-8">Our acquisitions team will review your proposal and contact you if it fits our investors' criteria.</p>
                                <button onClick={() => setSubmitted(false)} className="text-gold-400 hover:text-white transition-colors">Send another property</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-midnight-800/50 backdrop-blur-md p-8 rounded-2xl border border-white/5 space-y-6">
                                <h3 className="text-2xl font-sans text-white mb-6">Share Property / Mandate</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Agency / Agent</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.agencyName}
                                            onChange={e => setFormState({ ...formState, agencyName: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none"
                                            placeholder="Agency Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none"
                                            placeholder="+1..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Professional Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none"
                                        placeholder="agent@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Property Type</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.propertyType}
                                        onChange={e => setFormState({ ...formState, propertyType: e.target.value })}
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none"
                                        placeholder="E.g., 4* Hotel in Ibiza, Land in Miami..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Dossier / Teaser (PDF)</label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 hover:bg-midnight-900 transition-colors text-center cursor-pointer">
                                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
                                        {formState.file ? (
                                            <span className="text-gold-400 flex items-center justify-center gap-2"><CheckCircle size={16} /> {formState.file.name}</span>
                                        ) : (
                                            <span className="text-gray-500 flex items-center justify-center gap-2"><Upload size={16} /> Attach file (Optional)</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message / Key Details</label>
                                    <textarea
                                        rows={3}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none"
                                        placeholder="Briefly describe the opportunity..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Send Proposal <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
