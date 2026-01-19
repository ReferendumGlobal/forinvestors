import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Globe, Briefcase, CheckCircle, Upload, Loader2, Send, AlertCircle } from 'lucide-react';
import SeoHead from './SeoHead';
import { supabase } from '../lib/supabase';
import ProcessSteps from './ProcessSteps';

export default function AgencyContactForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        priceRangeFrom: '',
        priceRangeTo: '',
        propertyTypes: [],
        message: '',
        dossierLink: '' // Changed from file to link
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState(t('forms.loading.encrypting'));

    const propertyTypeKeys = [
        "hotels",
        "land",
        "fincas",
        "wineries",
        "agricultural",
        "livestock",
        "buildings",
        "luxury"
    ];

    const benefits = t('agency_page.benefits', { returnObjects: true });

    const handleCheckboxChange = (key) => {
        if (formState.propertyTypes.includes(key)) {
            setFormState({ ...formState, propertyTypes: formState.propertyTypes.filter(t => t !== key) });
        } else {
            setFormState({ ...formState, propertyTypes: [...formState.propertyTypes, key] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setLoadingText(t('forms.loading.encrypting'));

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase.from('leads').insert([
                {
                    full_name: formState.contactPerson,
                    company_name: formState.companyName,
                    email: formState.email,
                    phone: formState.phone,
                    role: 'agency',
                    status: 'new',
                    message: formState.message,
                    source: 'agency_page',
                    details: {
                        website: formState.website,
                        property_types: formState.propertyTypes,
                        price_range: `${formState.priceRangeFrom} - ${formState.priceRangeTo}`,
                        dossier_link: formState.dossierLink
                    }
                }
            ]);

            if (dbError) throw dbError;

            // 2. Send email via FormSubmit
            const formData = new FormData();
            formData.append('company_name', formState.companyName);
            formData.append('contact_person', formState.contactPerson);
            formData.append('email', formState.email);
            formData.append('phone', formState.phone);
            formData.append('website', formState.website);
            formData.append('property_types', formState.propertyTypes.join(', '));
            formData.append('price_range', `${formState.priceRangeFrom} - ${formState.priceRangeTo}`);
            formData.append('message', formState.message);
            formData.append('_subject', 'Nueva Agencia Interesada (Agency Lead)');
            formData.append('_template', 'table');
            formData.append('role', 'agency');

            if (formState.dossierLink) {
                formData.append('dossier_link', formState.dossierLink);
            }

            await fetch("https://formsubmit.co/ajax/urbinaagency@gmail.com", {
                method: "POST",
                body: formData
            });

            // Navigate to register
            navigate('/register?type=agency', {
                state: {
                    name: formState.contactPerson,
                    companyName: formState.companyName,
                    email: formState.email,
                    phone: formState.phone,
                    role: 'agency',
                    website: formState.website,
                    message: formState.message,
                    dossierLink: formState.dossierLink
                }
            });

        } catch (err) {
            console.error("Error submitting agency form:", err);
            setError(t('forms.status.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-midnight-950 min-h-screen pt-24 pb-20">
            <SeoHead
                title={t('seo.agencies.title')}
                description={t('seo.agencies.description')}
                routeKey="agencies"
            />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Briefcase className="w-16 h-16 text-gold-500 mx-auto mb-6" strokeWidth={1} />
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        {t('agency_page.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('agency_page.subtitle')}
                    </p>
                </motion.div>
            </div>

            <div className="mb-20">
                <ProcessSteps variant="agencies" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

                {/* Benefits Section - Full Width Grid */}
                <div className="space-y-8 text-center">
                    <h2 className="text-3xl font-serif text-white mb-8 inline-block border-b-4 border-gold-500 pb-2">
                        {t('agency_page.why_partner_title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Array.isArray(benefits) && benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-midnight-900/50 p-8 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors text-left"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle className="text-gold-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Agency Form - Centered & Wide */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-midnight-900 border border-gold-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-black/50">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                        <div className="mb-10 text-center">
                            <h3 className="text-3xl font-serif text-white mb-3">{t('agency_page.form_title')}</h3>
                            <p className="text-gray-400">{t('agency_page.form_subtitle')}</p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-500" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-4">{t('forms.status.success')}</h3>
                                <p className="text-gray-300 leading-relaxed max-w-md mx-auto">
                                    {t('agency_page.success_desc')}
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-gold-400 hover:text-gold-300 hover:underline"
                                >
                                    {t('forms.buttons.send_another')}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.companyName')}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                            value={formState.companyName}
                                            onChange={e => setFormState({ ...formState, companyName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.website')}</label>
                                        <input
                                            type="url"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                            placeholder="https://"
                                            value={formState.website}
                                            onChange={e => setFormState({ ...formState, website: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.contactPerson')}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                            value={formState.contactPerson}
                                            onChange={e => setFormState({ ...formState, contactPerson: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.phone')}</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.email')}</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('forms.labels.propertyTypes')}</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {propertyTypeKeys.map(key => (
                                            <label key={key} className="flex items-center space-x-3 cursor-pointer group p-3 bg-midnight-950/50 rounded-lg border border-white/5 hover:border-gold-500/30 transition-all">
                                                <input
                                                    type="checkbox"
                                                    checked={formState.propertyTypes.includes(key)}
                                                    onChange={() => handleCheckboxChange(key)}
                                                    className="h-4 w-4 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500 accent-gold-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-300 group-hover:text-gold-400 transition-colors">{t(`forms.agency_types.${key}`)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Link to Dossier - Replaces File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                                        Enlace al Dossier / Cartera (Google Drive) <AlertCircle size={14} />
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                        placeholder="https://drive.google.com/..."
                                        value={formState.dossierLink}
                                        onChange={e => setFormState({ ...formState, dossierLink: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        * Indispensable adjuntar enlace a la cartera de activos (con referencias catastrales).
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.message')}</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                                        placeholder={t('forms.placeholders.message_example')}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="flex items-center">
                                                <Loader2 className="mr-2 animate-spin" size={20} />
                                                <span>{t('forms.buttons.processing')}</span>
                                            </div>
                                            <span className="text-xs font-normal mt-1 text-white/80">{loadingText}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-lg">
                                            <span>{t('forms.buttons.send_request')}</span>
                                            <Send className="ml-2" size={20} />
                                        </div>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
