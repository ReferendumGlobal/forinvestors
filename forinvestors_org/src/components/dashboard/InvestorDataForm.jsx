
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowRight, MapPin, Building, DollarSign } from 'lucide-react';

export default function InvestorDataForm({ initialData = {}, onComplete }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Personal / Legal
        address: '',
        idNumber: '', // Passport or Tax ID
        signingPlace: '', // City where they are signing

        // Investment Criteria
        targetCountry: '',
        targetRegion: '',
        targetCity: '',
        propertyType: '',
        intendedUse: '',
        priceRange: '',
        targetReturn: '',
        otherCharacteristics: '',
        ...initialData
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                            <label className="block text-sm font-medium text-gray-400 mb-1">Target Country</label>
                            <input
                                name="targetCountry"
                                value={formData.targetCountry}
                                onChange={handleChange}
                                placeholder="e.g. Spain"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Region / State</label>
                            <input
                                name="targetRegion"
                                value={formData.targetRegion}
                                onChange={handleChange}
                                placeholder="e.g. Andalusia"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">City / Municipality</label>
                            <input
                                name="targetCity"
                                value={formData.targetCity}
                                onChange={handleChange}
                                placeholder="e.g. Marbella"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Property Type</label>
                            <select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            >
                                <option value="">Select Type...</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Land">Land</option>
                                <option value="Luxury Residential">Luxury Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Winery">Winery</option>
                                <option value="Other">Other</option>
                            </select>
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
                            <label className="block text-sm font-medium text-gray-400 mb-1">Price Range</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    name="priceRange"
                                    value={formData.priceRange}
                                    placeholder="Min. 1M - 5M EUR"
                                    className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 pl-9 text-white focus:ring-1 focus:ring-gold-500"
                                />
                            </div>
                        </div>
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
