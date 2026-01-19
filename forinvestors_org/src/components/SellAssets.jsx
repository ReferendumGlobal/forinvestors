import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Globe, Briefcase, CheckCircle, Upload, Loader2, Send, AlertCircle } from 'lucide-react';
import SeoHead from './SeoHead';
import { supabase } from '../lib/supabase';
import ProcessSteps from './ProcessSteps';

export default function SellAssets() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        propertyDetails: '',
        location: '',
        price: '',
        dossierLink: '', // Replaces file upload
        saleByCompany: false,
        companyNif: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const benefits = t('sell_page.benefits', { returnObjects: true });

    const handleFileChange = (e) => {
        // Legacy file handler kept to avoid break, but not used in UI now
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Save to Supabase
            const { error: dbError } = await supabase.from('leads').insert([
                {
                    full_name: formState.name,
                    company_name: formState.companyName,
                    email: formState.email,
                    phone: formState.phone,
                    target_location: formState.location, // Mapping Location to target_location
                    budget: formState.price, // Mapping Price to budget (approx)
                    message: formState.propertyDetails,
                    role: 'seller', // Specific role for this page
                    intent: 'sell',
                    status: 'new',
                    source: 'sell_page'
                }
            ]);

            if (dbError) {
                console.error("Supabase Error (Non-blocking):", dbError);
                // Continue execution to ensure email is sent
            }

            // FormSubmit for email notification
            const formData = new FormData();
            formData.append('name', formState.name);
            formData.append('company_name', formState.companyName);
            formData.append('email', formState.email);
            formData.append('phone', formState.phone);
            formData.append('location', formState.location);
            formData.append('price', formState.price);
            formData.append('details', formState.propertyDetails);
            formData.append('_subject', 'Nueva Propiedad en Venta (Seller Lead)');
            formData.append('_template', 'table');
            formData.append('role', 'seller');

            if (formState.dossierLink) {
                formData.append('dossier_link', formState.dossierLink);
            }

            await fetch("https://formsubmit.co/ajax/urbinaagency@gmail.com", {
                method: "POST",
                body: formData
            });

            // Navigate to register
            navigate('/register?type=seller', {
                state: {
                    name: formState.name,
                    companyName: formState.companyName,
                    companyNif: formState.companyNif,
                    saleByCompany: formState.saleByCompany,
                    email: formState.email,
                    phone: formState.phone,
                    role: 'seller',
                    location: formState.location,
                    price: formState.price,
                    message: formState.propertyDetails,
                    dossierLink: formState.dossierLink
                }
            });
            // setSubmitted(true); // No longer showing local success message
        } catch (err) {
            console.error("Error submitting seller form:", err);
            setError(t('forms.status.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-midnight-950 min-h-screen pt-24 pb-20">
            <SeoHead
                title={t('seo.sell.title')}
                description={t('seo.sell.description')}
                routeKey="sell"
            />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Briefcase className="w-16 h-16 text-gold-500 mx-auto mb-6" strokeWidth={1} />
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        {t('sell_page.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('sell_page.subtitle')}
                    </p>
                </motion.div>
            </div>

            <div className="mb-20">
                <ProcessSteps variant="sellers" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Benefits / Why Us */}
                <div className="space-y-12">
                    <h2 className="text-3xl font-serif text-white mb-8 border-l-4 border-gold-500 pl-6">
                        {t('sell_page.why_us_title')}
                    </h2>

                    <div className="grid gap-8">
                        {Array.isArray(benefits) && benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-midnight-900/50 p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        {index === 0 ? <Shield className="text-gold-500" size={24} /> :
                                            index === 1 ? <Globe className="text-gold-500" size={24} /> :
                                                <CheckCircle className="text-gold-500" size={24} />}
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

                {/* Seller Form */}
                <div>
                    <div className="bg-midnight-900 border border-gold-500/20 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-serif text-white mb-2">{t('sell_page.form_title')}</h3>
                            <p className="text-gray-400 text-sm">{t('sell_page.form_subtitle')}</p>
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
                                <h3 className="text-2xl font-serif text-white mb-4">{t('sell_page.success_title')}</h3>
                                <p className="text-gray-300 leading-relaxed max-w-md mx-auto">
                                    {t('sell_page.success_desc')}
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-gold-400 hover:text-gold-300 hover:underline"
                                >
                                    {t('forms.buttons.send_another')}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.fullName')}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.companyName')}</label>
                                        <input
                                            type="text"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                            placeholder={t('forms.placeholders.company_example')}
                                            value={formState.companyName}
                                            onChange={e => setFormState({ ...formState, companyName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.email')}</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.phone')}</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.priceRange')}</label>
                                        <input
                                            type="text"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                            placeholder={t('forms.placeholders.capital_example')}
                                            value={formState.price}
                                            onChange={e => setFormState({ ...formState, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.targetLocation') || "Ubicación del Activo"}</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                        placeholder="Ciudad, País"
                                        value={formState.location}
                                        onChange={e => setFormState({ ...formState, location: e.target.value })}
                                    />
                                </div>

                                {/* Company Sale Toggle */}
                                <div className="bg-midnight-950/30 p-4 rounded-lg border border-white/5">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formState.saleByCompany}
                                            onChange={e => setFormState({ ...formState, saleByCompany: e.target.checked })}
                                            className="form-checkbox h-5 w-5 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500"
                                        />
                                        <span className="text-sm text-gray-300">Venta a nombre de Empresa</span>
                                    </label>

                                    {formState.saleByCompany && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Nombre de Empresa</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                                    value={formState.companyName}
                                                    onChange={e => setFormState({ ...formState, companyName: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">NIF / Tax ID (Opcional)</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                                    value={formState.companyNif}
                                                    onChange={e => setFormState({ ...formState, companyNif: e.target.value })}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.message')}</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                        placeholder={t('forms.placeholders.message_example')}
                                        value={formState.propertyDetails}
                                        onChange={e => setFormState({ ...formState, propertyDetails: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                                        Enlace al Dossier / Fotos <AlertCircle size={14} />
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                        placeholder="https://drive.google.com/..."
                                        value={formState.dossierLink}
                                        onChange={e => setFormState({ ...formState, dossierLink: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        * Indispensable adjuntar <strong>Referencia Catastral</strong> en el dossier.
                                    </p>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            {t('forms.buttons.processing')}
                                        </>
                                    ) : (
                                        <>
                                            {t('sell_page.hero_cta')} <Send size={18} />
                                        </>
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
