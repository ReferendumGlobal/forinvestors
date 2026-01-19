import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Loader2, ArrowRight, Building2, Upload, CheckCircle } from 'lucide-react';

export default function AgencyDataForm({ initialData = {}, onComplete }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [idFile, setIdFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [agencyData, setAgencyData] = useState({
        companyName: initialData.companyName || '',
        taxId: initialData.taxId || '',
        vatPercent: initialData.vatPercent || '',
        address: initialData.address || '',
        repName: initialData.repName || '',
        repId: initialData.repId || '',
        email: initialData.email || '',
        idUrl: initialData.idUrl || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgencyData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setIdFile(e.target.files[0]);
            setUploadSuccess(false);
        }
    };

    const uploadDocument = async () => {
        if (!idFile || !user) return null;

        const fileExt = idFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}_passport.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('user-documents')
            .upload(fileName, idFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('user-documents')
            .getPublicUrl(fileName);

        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setUploading(true);

        try {
            let finalIdUrl = agencyData.idUrl;

            // Upload new file if selected
            if (idFile) {
                finalIdUrl = await uploadDocument();
                setUploadSuccess(true);
            }

            // Update state with URL
            const finalData = { ...agencyData, idUrl: finalIdUrl };

            // Allow small delay for UX
            setTimeout(() => {
                onComplete(finalData);
            }, 500);

        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading document: " + error.message);
            setLoading(false);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-midnight-800 p-6 rounded-xl border border-white/5 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building2 className="text-gold-500" />
                Agency Registration Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Agency / Company Name</label>
                            <input
                                required
                                name="companyName"
                                value={agencyData.companyName}
                                onChange={handleChange}
                                placeholder="Real Estate SL"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Tax ID (CIF/NIF/EIN)</label>
                            <input
                                required
                                name="taxId"
                                value={agencyData.taxId}
                                onChange={handleChange}
                                placeholder="B-12345678"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">VAT / Tax % (e.g. 21%)</label>
                            <input
                                required
                                name="vatPercent"
                                value={agencyData.vatPercent}
                                onChange={handleChange}
                                placeholder="21"
                                type="number"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Official Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={agencyData.email}
                                onChange={handleChange}
                                placeholder="info@agency.com"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Head Office Address</label>
                            <input
                                required
                                name="address"
                                value={agencyData.address}
                                onChange={handleChange}
                                placeholder="Legal Address"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Bank Details for Commissions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Bank Name</label>
                            <input
                                required
                                name="bankName"
                                value={agencyData.bankName || ''}
                                onChange={handleChange}
                                placeholder="Bank Name"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Account Number / IBAN</label>
                            <input
                                required
                                name="accountNumber"
                                value={agencyData.accountNumber || ''}
                                onChange={handleChange}
                                placeholder="ES12 3456..."
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">SWIFT / BIC Code</label>
                            <input
                                required
                                name="swiftCode"
                                value={agencyData.swiftCode || ''}
                                onChange={handleChange}
                                placeholder="SWFTID..."
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Legal Representative
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Representative Name</label>
                            <input
                                required
                                name="repName"
                                value={agencyData.repName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Rep. ID Number</label>
                            <input
                                required
                                name="repId"
                                value={agencyData.repId}
                                onChange={handleChange}
                                placeholder="ID / Passport"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Upload Representative ID (Passport/DNI)
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer bg-midnight-950 border border-white/10 hover:border-gold-500 rounded-lg py-2 px-4 flex items-center gap-2 transition-colors">
                                    <Upload size={18} className="text-gold-500" />
                                    <span className="text-sm text-gray-300">Choose File...</span>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                {idFile && (
                                    <span className="text-sm text-green-400 flex items-center gap-1">
                                        <CheckCircle size={14} /> {idFile.name}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Accepted: PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            required
                            name="confirmMinimum"
                            className="mt-1 form-checkbox h-5 w-5 text-gold-500 rounded border-white/20 bg-midnight-950 focus:ring-gold-500"
                        />
                        <div className="text-sm">
                            <span className="font-bold text-white block mb-1">Portfolio Value Confirmation</span>
                            <span className="text-gray-300">
                                I verify that our agency primarily deals with assets and investments valued above <strong className="text-gold-400">1,000,000 €</strong>.
                            </span>
                        </div>
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 bg-gold-500 text-midnight-950 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 transition-colors disabled:opacity-50"
                    >
                        {loading || uploading ? <Loader2 className="animate-spin" /> : 'Continue to Agreement'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </form >
        </div >
    );
}
