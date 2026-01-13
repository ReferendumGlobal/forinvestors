
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowRight, Building2, UserCircle } from 'lucide-react';

export default function AgencyDataForm({ initialData = {}, onComplete }) {
    const [loading, setLoading] = useState(false);

    const [agencyData, setAgencyData] = useState({
        companyName: initialData.companyName || '',
        taxId: initialData.taxId || '', // CIF/NIF
        address: initialData.address || '',
        repName: initialData.repName || '',
        repId: initialData.repId || '',
        email: initialData.email || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgencyData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onComplete(agencyData);
        }, 500);
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
                        disabled={loading}
                        className="flex items-center gap-2 bg-gold-500 text-midnight-950 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 transition-colors"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Continue to Agreement'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </form >
        </div >
    );
}
