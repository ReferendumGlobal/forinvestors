
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowRight, Building, Users, Plus, Trash2 } from 'lucide-react';

export default function SellerDataForm({ initialData = {}, onComplete }) {
    const [loading, setLoading] = useState(false);

    // Property Data
    const [propertyData, setPropertyData] = useState({
        address: '',
        type: '',
        price: '', // Proposed price
        ...initialData.property
    });

    // Owners Data
    const [owners, setOwners] = useState(initialData.owners || [
        { name: '', idNumber: '', percent: 100, email: '' }
    ]);

    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({ ...prev, [name]: value }));
    };

    const handleOwnerChange = (index, field, value) => {
        const newOwners = [...owners];
        newOwners[index][field] = value;
        setOwners(newOwners);
    };

    const addOwner = () => {
        setOwners([...owners, { name: '', idNumber: '', percent: 0, email: '' }]);
    };

    const removeOwner = (index) => {
        if (owners.length > 1) {
            const newOwners = owners.filter((_, i) => i !== index);
            setOwners(newOwners);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if percentages sum to 100?
        const totalPercent = owners.reduce((acc, curr) => acc + Number(curr.percent), 0);
        if (Math.abs(totalPercent - 100) > 1) {
            alert(`Total ownership percentage is ${totalPercent}%. It must be 100%.`);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onComplete({ property: propertyData, owners });
        }, 500);
    };

    return (
        <div className="bg-midnight-800 p-6 rounded-xl border border-white/5 shadow-xl max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building className="text-gold-500" />
                Property & Ownership Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Property Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider border-b border-white/10 pb-2">
                        Asset Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Property Address</label>
                            <input
                                required
                                name="address"
                                value={propertyData.address}
                                onChange={handlePropertyChange}
                                placeholder="Street, Number, City, Zip, Country"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Property Type</label>
                            <select
                                name="type"
                                required
                                value={propertyData.type}
                                onChange={handlePropertyChange}
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            >
                                <option value="">Select Type...</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Building">Building</option>
                                <option value="Land">Land</option>
                                <option value="Luxury Residential">Luxury Villa/Apartment</option>
                                <option value="Winery">Winery</option>
                                <option value="Commercial">Commercial/Retail</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Target Sale Price (EUR)</label>
                            <input
                                required
                                name="price"
                                type="number"
                                value={propertyData.price}
                                onChange={handlePropertyChange}
                                placeholder="e.g. 1500000"
                                className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gold-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Owners Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <h3 className="text-sm font-medium text-gold-500 uppercase tracking-wider">
                            Legal Owners
                        </h3>
                        <button
                            type="button"
                            onClick={addOwner}
                            className="text-xs flex items-center gap-1 text-gold-500 hover:text-white transition-colors"
                        >
                            <Plus size={14} /> Add Owner
                        </button>
                    </div>

                    <div className="space-y-4">
                        {owners.map((owner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-midnight-900/50 p-4 rounded-lg border border-white/5 relative"
                            >
                                {owners.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOwner(index)}
                                        className="absolute top-2 right-2 text-red-500/50 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Owner Name {index + 1}</label>
                                        <input
                                            required
                                            value={owner.name}
                                            onChange={(e) => handleOwnerChange(index, 'name', e.target.value)}
                                            placeholder="Full Legal Name"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">ID / Passport</label>
                                        <input
                                            required
                                            value={owner.idNumber}
                                            onChange={(e) => handleOwnerChange(index, 'idNumber', e.target.value)}
                                            placeholder="Document Number"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Email (Optional)</label>
                                        <input
                                            type="email"
                                            value={owner.email}
                                            onChange={(e) => handleOwnerChange(index, 'email', e.target.value)}
                                            placeholder="Contact Email"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Ownership %</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={owner.percent}
                                            onChange={(e) => handleOwnerChange(index, 'percent', e.target.value)}
                                            placeholder="%"
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gold-500 text-midnight-950 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 transition-colors"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Continue to Documents'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
