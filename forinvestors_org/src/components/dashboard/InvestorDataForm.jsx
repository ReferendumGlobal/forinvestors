
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowRight, MapPin, Building, DollarSign, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Same list as ContactForm for consistency
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

export default function InvestorDataForm({ initialData = {}, onComplete }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    // Ensure propertyType is an array for multi-select
    const safeInitialData = {
        ...initialData,
        propertyType: Array.isArray(initialData.propertyType) ? initialData.propertyType : (initialData.propertyType ? [initialData.propertyType] : [])
    };

    const [formData, setFormData] = useState({
        // Personal / Legal
        address: '',
        idNumber: '', // Passport or Tax ID
        signingPlace: '', // City where they are signing

        // Investment Criteria
        targetCountry: '',
        targetRegion: '',
        targetCity: '',
        propertyType: [], // Array for multi-select
        intendedUse: '',
        priceRange: '', // We will treat this as the specific numeric budget
        targetReturn: '',
        otherCharacteristics: '',
        ...safeInitialData
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAssetToggle = (assetKey) => {
        setFormData(prev => {
            const currentAssets = prev.propertyType || [];
            if (currentAssets.includes(assetKey)) {
                return { ...prev, propertyType: currentAssets.filter(a => a !== assetKey) };
            } else {
                return { ...prev, propertyType: [...currentAssets, assetKey] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate processing or validation
        setTimeout(() => {
            setLoading(false);
            onComplete(formData);
        }, 500);
    };

    return (
        <div className="bg-midnight-800 p-6 rounded-xl border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building className="text-gold-500" />
                Investment Profile & Legal Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Legal Identity */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Legal Information (For Contract)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Legal Address</label>
                            <input
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street, City, Zip, Country"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">ID / Passport / Tax ID Number</label>
                            <input
                                required
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                placeholder="e.g. 12345678A"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Signing Location (City)</label>
                            <input
                                required
                                name="signingPlace"
                                value={formData.signingPlace}
                                onChange={handleChange}
                                placeholder="e.g. Madrid"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Investment Criteria */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Investment Mandate Criteria
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Target Country <span className="text-gold-500">*</span></label>
                            <input
                                required
                                name="targetCountry"
                                value={formData.targetCountry}
                                onChange={handleChange}
                                placeholder="e.g. Spain"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Region / State <span className="text-xs text-gray-600">(Optional)</span></label>
                            <input
                                name="targetRegion"
                                value={formData.targetRegion}
                                onChange={handleChange}
                                placeholder="e.g. Andalusia"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">City / Municipality <span className="text-xs text-gray-600">(Optional)</span></label>
                            <input
                                name="targetCity"
                                value={formData.targetCity}
                                onChange={handleChange}
                                placeholder="e.g. Marbella"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>

                    {/* Multi-Select Assets */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">Target Asset Types</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-midnight-950/50 p-4 rounded-lg border border-white/5">
                            {ASSET_TYPES.map((asset) => (
                                <label
                                    key={asset}
                                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-all ${formData.propertyType.includes(asset)
                                            ? 'text-gold-400'
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.propertyType.includes(asset) ? 'border-gold-500 bg-gold-500' : 'border-gray-600'
                                        }`}>
                                        {formData.propertyType.includes(asset) && <CheckCircle size={12} className="text-midnight-950" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.propertyType.includes(asset)}
                                        onChange={() => handleAssetToggle(asset)}
                                        className="hidden"
                                    />
                                    <span className="text-xs">{t(`forms.assets.${asset}`, asset)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Maximum Investment Budget
                                <span className="block text-xs text-red-400 mt-1">* Must not exceed Proof of Funds amount</span>
                            </label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="number"
                                    name="priceRange"
                                    value={formData.priceRange}
                                    onChange={handleChange}
                                    placeholder="e.g. 1000000"
                                    className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 pl-9 text-white focus:ring-1 focus:ring-gold-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Intended Use</label>
                            <input
                                name="intendedUse"
                                value={formData.intendedUse}
                                onChange={handleChange}
                                placeholder="e.g. Residential, Commercial, Mixed..."
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Target Return (%)</label>
                            <input
                                name="targetReturn"
                                value={formData.targetReturn}
                                onChange={handleChange}
                                placeholder="e.g. 5% - 8%"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Other Relevant Characteristics</label>
                        <textarea
                            name="otherCharacteristics"
                            value={formData.otherCharacteristics}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Specific requirements, preferred zones, deal breakers..."
                            className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gold-500 text-midnight-950 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 transition-colors"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Continue to ID Upload'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
