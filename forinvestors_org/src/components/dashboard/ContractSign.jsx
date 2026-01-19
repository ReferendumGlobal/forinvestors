import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SignaturePad from './SignaturePad';
import { FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useTranslation } from 'react-i18next';
import { getContractContent } from './contracts/ContractTemplates';

export default function ContractSign({ mode = 'standalone', contractType = 'buy_mandate', criteria, sellerData, agencyData, idUrl, onSuccess, onBack }) {
    const { profile, user } = useAuth();
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [existingSignature, setExistingSignature] = useState(null);
    const contractRef = useRef(null);
    const { t, i18n } = useTranslation();

    // Common Date
    const today = new Date();
    const formattedDate = today.toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        checkExistingContract();
    }, []);

    const checkExistingContract = async () => {
        try {
            const { data, error } = await supabase
                .from('contracts')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setExistingSignature(data.signature_url);
                setSigned(true);
            }
        } catch (err) {
            // No contract found
        } finally {
            setLoading(false);
        }
    };

    const handleSignatureSave = async (signatureDataUrl) => {
        setLoading(true);
        try {
            // Generate contract text with current language persistence
            const contractText = getContractContent(contractType, { criteria, sellerData, agencyData, profile }, i18n.language);

            // Build insert data based on type
            const insertData = {
                user_id: user.id,
                type: contractType,
                signature_url: signatureDataUrl,
                signed_at: new Date().toISOString(),
                contract_text: contractText,
            };

            // Store specific metadata in 'criteria' JSONB column
            if (contractType === 'buy_mandate') insertData.criteria = criteria;
            else if (contractType === 'sale_mandate') insertData.criteria = sellerData;
            else if (contractType === 'agency_collaboration') insertData.criteria = agencyData;

            // Handle ID URL for investors (others uploaded separately)
            if (idUrl) insertData.id_url = idUrl;

            const { error } = await supabase
                .from('contracts')
                .insert([insertData]);

            if (error) throw error;

            setSigned(true);
            setExistingSignature(signatureDataUrl);
            if (onSuccess) onSuccess();

        } catch (err) {
            console.error('Error saving contract:', err);
            alert(`Error saving signature: ${err.message || err.error_description || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const element = contractRef.current;
        const opt = {
            margin: 10,
            filename: `Urbina_Agency_Contract_${contractType}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    if (loading) return <div className="text-white text-center p-10"><Loader2 className="animate-spin inline mr-2" /> {t('dashboard.contracts.loading', 'Loading contract...')}</div>;

    if (signed && mode === 'standalone') {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-midnight-900 border border-green-500/30 rounded-xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-500/20 rounded-full text-green-500">
                        <CheckCircle size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{t('dashboard.contracts.active_title', 'Agreement Active')}</h2>
                <div className="bg-white/5 p-4 rounded-lg inline-block text-left max-w-lg mx-auto w-full">
                    <img src={existingSignature} alt="Signature" className="bg-white rounded p-2 h-20 border border-gray-600 mb-2" />
                    <p className="text-xs text-gray-400">{t('dashboard.contracts.signed_on', 'Signed on')} {formattedDate}</p>
                </div>

                {/* Download Section */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-gray-400 mb-4">{t('dashboard.contracts.download_copy', 'Download your copy of the agreement:')}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-6 rounded-lg inline-flex items-center gap-2"
                    >
                        <FileText size={18} /> {t('dashboard.contracts.view_download_pdf', 'View & Download PDF')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <FileText className="text-gold-500" size={28} />
                        <h1 className="text-2xl font-bold text-white">
                            {contractType === 'sale_mandate' ? t('dashboard.contracts.title_sale', 'Exclusive Sales Mandate') :
                                contractType === 'agency_collaboration' ? t('dashboard.contracts.title_agency', 'Agency Collaboration Agreement') :
                                    t('dashboard.contracts.title_search', 'Property Search Mandate')}
                        </h1>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="text-gold-400 hover:text-white flex items-center gap-2 text-sm"
                    >
                        <Download size={16} /> {t('dashboard.contracts.download_pdf', 'Download PDF')}
                    </button>
                </div>

                <div
                    ref={contractRef}
                    className="bg-white text-black p-8 rounded shadow-inner h-[500px] overflow-y-auto font-serif text-sm leading-relaxed mb-8 relative"
                >
                    {/* Watermark/Header for PDF */}
                    <div className="hidden print:block mb-4 text-center border-b pb-4">
                        <h1 className="text-2xl font-bold">URBINA AGENCY LLC</h1>
                        <p className="text-xs text-gray-500">Official Document</p>
                    </div>

                    <div className="whitespace-pre-wrap font-serif" dangerouslySetInnerHTML={{ __html: getContractContent(contractType, { criteria, sellerData, agencyData, profile }, i18n.language).replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>') }} />

                    {/* Signature Append for PDF generation if needed */}
                    {existingSignature && (
                        <div className="mt-8 border-t pt-4">
                            <p>{t('dashboard.contracts.signed_by_client', 'Signed by Client:')}</p>
                            <img src={existingSignature} className="h-16" />
                        </div>
                    )}
                </div>

                {!signed && (
                    <>
                        <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg mb-8 flex gap-3">
                            <AlertCircle className="text-yellow-500 shrink-0" />
                            <p className="text-sm text-gray-300">
                                {t('dashboard.contracts.agreement_warning', 'By signing below, you acknowledge and agree to the terms herein.')}
                            </p>
                        </div>

                        <SignaturePad onSave={handleSignatureSave} />
                    </>
                )}

                {onBack && (
                    <button onClick={onBack} className="mt-4 text-gray-500 hover:text-white text-sm">
                        {t('dashboard.contracts.back_step', 'Back to Previous Step')}
                    </button>
                )}
            </div>
        </div>
    );
}
