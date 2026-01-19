
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const ASSET_TYPES = [
    'hotels',
    'wineries',
    'agricultural',
    'livestock',
    'mansions',
    'castles',
    'penthouses',
    'office_buildings',
    'apartment_buildings',
    'urban_land',
    'dev_land',
    'casinos',
    'football_clubs',
    'islands',
    'sports_clubs',
    'garages',
    'businesses'
];

export default function ContactForm({ categoryName, explanation }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        funds: '',
        targetLocation: '',
        intent: 'buy',
        requestAccess: true,
        message: '',
        selectedAssets: [],
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState(t('forms.loading.encrypting'));

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    const handleAssetToggle = (asset) => {
        setFormState(prev => {
            const newAssets = prev.selectedAssets.includes(asset)
                ? prev.selectedAssets.filter(a => a !== asset)
                : [...prev.selectedAssets, asset];
            return { ...prev, selectedAssets: newAssets };
        });
    };

    useEffect(() => {
        if (isSubmitting) {
            const messages = [
                t('forms.loading.encrypting'),
                t('forms.loading.uploading'),
                t('forms.loading.verifying'),
                t('forms.loading.finalizing')
            ];
            let i = 0;
            setLoadingText(messages[0]);

            const interval = setInterval(() => {
                i = (i + 1) % messages.length;
                setLoadingText(messages[i]);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [isSubmitting, t]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Format selected assets for display
        const interests = formState.selectedAssets.map(a => t(`forms.assets.${a}`)).join(', ');
        const finalMessage = `Interests: ${interests}\n\nMessage: ${formState.message}`;

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('company_name', formState.companyName);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('funds', formState.funds);
        formData.append('targetLocation', formState.targetLocation);
        formData.append('interests', interests);
        formData.append('intent', formState.intent === 'buy' ? 'Investment (Buy)' : 'Sale');
        formData.append('requestAccess', formState.requestAccess ? 'Yes' : 'No');
        formData.append('message', formState.message);
        formData.append('category', categoryName);
        formData.append('_subject', `New Investment Request: ${categoryName}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        if (formState.file) {
            formData.append('attachment', formState.file);
        }

        try {
            let fileUrl = null;

            // 1. Upload File to Supabase Storage (if present)
            if (formState.file) {
                const fileExt = formState.file.name.split('.').pop();
                const fileName = `leads_pof/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('documents') // Ensure this bucket exists or use 'user-documents' if that is the one
                    .upload(fileName, formState.file);

                if (uploadError) {
                    console.error("Upload error:", uploadError);
                    // Continue without file or show error? Let's log but continue lead creation for now
                } else {
                    // Get Public URL
                    const { data: publicUrlData } = supabase.storage
                        .from('documents')
                        .getPublicUrl(fileName);

                    fileUrl = publicUrlData.publicUrl;
                }
            }

            // 1b. Save to Supabase (Leads Table)
            const { error: dbError } = await supabase.from('leads').insert([
                {
                    full_name: formState.name,
                    company_name: formState.companyName,
                    email: formState.email,
                    phone: formState.phone,
                    budget: formState.funds,
                    target_location: formState.targetLocation,
                    intent: formState.intent,
                    request_access: formState.requestAccess,

                    role: 'investor',
                    status: 'new',
                    // Assuming 'metadata' or 'notes' column exists for extra data if schema is strict
                    // If pof_url column exists excellent, if not we append to message
                    message: fileUrl ? `${finalMessage}\n\n[POF Document]: ${fileUrl}` : finalMessage
                }
            ]);

            if (dbError) console.error("Error saving lead:", dbError);

            // 2. Send Email via FormSubmit
            // Append POF link to message for email too
            if (fileUrl) {
                formData.set('message', `${formState.message}\n\nPOF Link: ${fileUrl}`);
            }

            const response = await fetch("https://formsubmit.co/ajax/urbinaagency@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            // Try to parse JSON but don't fail if it's not JSON
            let result = {};
            const text = await response.text();
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.warn("Non-JSON response:", text);
            }

            if (response.ok) {
                // Navigate to register with pre-filled state
                navigate('/register', {
                    state: {
                        name: formState.name,
                        companyName: formState.companyName,
                        email: formState.email,
                        phone: formState.phone,
                        role: formState.intent === 'buy' ? 'investor' : 'seller',
                        message: formState.message,
                        fileUrl: fileUrl // Pass the uploaded POF url if any
                    }
                });
            } else {
                setError(result.message || t('forms.status.error'));
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError(t('forms.status.connection_error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-midnight-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5 relative">
            <input type="hidden" name="_captcha" value="false" />

            {explanation && (
                <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4 mb-6">
                    <p className="text-gold-400 text-sm">{explanation}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.name')}</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder={t('forms.placeholders.name_example')}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.companyNameOptional')}</label>
                    <input
                        type="text"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder={t('forms.placeholders.company_example')}
                        value={formState.companyName}
                        onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.email')}</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder={t('forms.placeholders.email_example')}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.phone')}</label>
                    <input
                        type="tel"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder={t('forms.placeholders.phone_example')}
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.capital')}</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="Min. 1,000,000 €"
                        value={formState.funds}
                        onChange={(e) => setFormState({ ...formState, funds: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.targetLocation')}</label>
                    <input
                        type="text"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder={t('forms.placeholders.location_example')}
                        value={formState.targetLocation}
                        onChange={(e) => setFormState({ ...formState, targetLocation: e.target.value })}
                    />
                </div>
            </div>

            {/* Asset Type Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">{t('forms.labels.interested_assets')}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ASSET_TYPES.map((asset) => (
                        <label
                            key={asset}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${formState.selectedAssets.includes(asset)
                                ? 'bg-gold-500/20 border-gold-500 text-white'
                                : 'bg-midnight-950 border-white/10 text-gray-400 hover:border-white/30'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={formState.selectedAssets.includes(asset)}
                                onChange={() => handleAssetToggle(asset)}
                                className="hidden"
                            />
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${formState.selectedAssets.includes(asset) ? 'border-gold-500 bg-gold-500' : 'border-gray-500'
                                }`}>
                                {formState.selectedAssets.includes(asset) && <CheckCircle size={12} className="text-midnight-950" />}
                            </div>
                            <span className="text-xs md:text-sm">{t(`forms.assets.${asset}`)}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Intent Hidden - Always Buy/Invest */}
            <input type="hidden" name="intent" value="buy" />

            {/* Company Search Details (Always visible, Optional) */}
            <div className="bg-midnight-950/30 p-4 rounded-lg border border-white/5 mb-4 space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formState.isCompany}
                        onChange={e => setFormState({ ...formState, isCompany: e.target.checked })}
                        className="h-5 w-5 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500 accent-gold-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-300 font-medium">Mandato a nombre de Empresa (Marcar si procede)</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">NIF / Tax ID (Opcional)</label>
                        <input
                            type="text"
                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                            placeholder="G-12345678"
                            value={formState.companyNif}
                            onChange={e => setFormState({ ...formState, companyNif: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-3 bg-midnight-900/50 p-4 rounded-lg border border-white/5">
                <input
                    type="checkbox"
                    id="requestAccess"
                    checked={formState.requestAccess}
                    onChange={(e) => setFormState({ ...formState, requestAccess: e.target.checked })}
                    className="form-checkbox h-5 w-5 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500"
                />
                <label htmlFor="requestAccess" className="text-sm text-gray-300 cursor-pointer select-none">
                    {t('forms.labels.request_access')} <strong className="text-gold-400">{t('forms.labels.private_platform')}</strong> {t('forms.labels.view_exclusive')}
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                    {t('forms.labels.pof')} <AlertCircle size={14} />
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg bg-midnight-900 hover:bg-midnight-800 transition-colors group cursor-pointer relative">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png,.doc,.docx"
                    />
                    <div className="space-y-1 text-center">
                        {formState.file ? (
                            <div className="flex flex-col items-center">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                <p className="text-sm text-gray-300 mt-2">{formState.file.name}</p>
                                <p className="text-xs text-gray-500">{t('forms.buttons.file_ready')}</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-gold-400">{t('forms.buttons.upload_file')}</span>
                                    <p className="pl-1">{t('forms.buttons.or_drag')}</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t('forms.labels.message')}</label>
                <textarea
                    rows={4}
                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder={t('forms.placeholders.message_example')}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
            </div>

            {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <Loader2 className="mr-2 animate-spin" size={20} />
                            <span>{t('forms.buttons.processing')}</span>
                        </div>
                        <span className="text-xs font-normal mt-1 text-gold-100 opacity-90 animate-pulse">{loadingText}</span>
                    </div>
                ) : (
                    <>{t('forms.buttons.send_request')} <Send size={18} className="ml-2" /></>
                )}
            </button>


        </form>
    );
}
