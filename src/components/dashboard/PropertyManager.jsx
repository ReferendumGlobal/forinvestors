import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Building, Plus, Search, Filter, X, Save, Upload, MapPin, Euro, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyManager() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        property_type: 'hotel',
        commission_percentage: '',
        is_exclusive: false,
        dossier_url: '',
        images: [] // TODO: Handle image upload
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (property = null) => {
        if (property) {
            setEditingProperty(property);
            setFormData({
                title: property.title,
                description: property.description,
                price: property.price,
                location: property.location,
                property_type: property.property_type,
                commission_percentage: property.commission_percentage,
                is_exclusive: property.is_exclusive,
                dossier_url: property.dossier_url,
                images: property.images || []
            });
        } else {
            setEditingProperty(null);
            setFormData({
                title: '',
                description: '',
                price: '',
                location: '',
                property_type: 'hotel',
                commission_percentage: '',
                is_exclusive: false,
                dossier_url: '',
                images: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const propertyData = {
                ...formData,
                owner_id: user.id
            };

            let error;
            if (editingProperty) {
                const { error: updateError } = await supabase
                    .from('properties')
                    .update(propertyData)
                    .eq('id', editingProperty.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('properties')
                    .insert([propertyData]);
                error = insertError;
            }

            if (error) throw error;

            setIsModalOpen(false);
            fetchProperties();
        } catch (error) {
            console.error('Error saving property:', error);
            alert('Error saving property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Building className="text-gold-500" />
                    Properties
                </h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> New Property
                </button>
            </div>

            {/* Filters Bar Placeholder */}
            <div className="bg-midnight-800 p-4 rounded-xl border border-white/5 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                    />
                </div>
                <button className="bg-midnight-700 text-gray-300 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-midnight-600">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Properties List */}
            {loading && !isModalOpen ? (
                <div className="text-center py-12 text-gray-400">Loading properties...</div>
            ) : properties.length === 0 ? (
                <div className="text-center py-12 bg-midnight-800/50 rounded-xl border border-white/5">
                    <Building className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white">No properties found</h3>
                    <p className="text-gray-400 mt-2">Add your first property to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map(p => (
                        <div key={p.id} className="bg-midnight-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/50 transition-colors group">
                            <div className="h-48 bg-gray-700 relative">
                                {p.images && p.images.length > 0 ? (
                                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(p)}
                                        className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm"
                                    >
                                        <FileText size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-white mb-2 truncate">{p.title}</h3>
                                <div className="flex justify-between text-sm text-gray-400 mb-2">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {p.location}</span>
                                    <span className="text-gold-400 font-medium">{parseInt(p.price).toLocaleString()} €</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="bg-midnight-950 px-2 py-1 rounded border border-white/10 uppercase">{p.property_type.replace('_', ' ')}</span>
                                    {p.is_exclusive && <span className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded border border-gold-500/20">Exclusive</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-midnight-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="sticky top-0 bg-midnight-900/95 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
                                <h3 className="text-xl font-bold text-white">
                                    {editingProperty ? 'Edit Property' : 'New Property'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Public Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                            placeholder="e.g. Boutique Hotel in Historical Center"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Price (€)</label>
                                        <div className="relative">
                                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                            <input
                                                type="number"
                                                required
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-midnight-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                            <input
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full bg-midnight-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Asset Type</label>
                                        <select
                                            value={formData.property_type}
                                            onChange={e => setFormData({ ...formData, property_type: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                        >
                                            <option value="hotel">Hotel</option>
                                            <option value="building">Building</option>
                                            <option value="land">Land</option>
                                            <option value="commercial">Commercial Space</option>
                                            <option value="luxury_residential">Luxury Residential</option>
                                            <option value="winery">Winery</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Commission (%)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.commission_percentage}
                                            onChange={e => setFormData({ ...formData, commission_percentage: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                            placeholder="3.0"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                            placeholder="Key property details..."
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Dossier URL (Drive/Dropbox/PDF)</label>
                                        <input
                                            type="url"
                                            value={formData.dossier_url}
                                            onChange={e => setFormData({ ...formData, dossier_url: e.target.value })}
                                            className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-gold-500 focus:border-gold-500"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="exclusive"
                                            checked={formData.is_exclusive}
                                            onChange={e => setFormData({ ...formData, is_exclusive: e.target.checked })}
                                            className="rounded border-gray-600 bg-midnight-950 text-gold-500 focus:ring-gold-500"
                                        />
                                        <label htmlFor="exclusive" className="text-gray-300">Exclusive Mandate</label>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                    >
                                        <Save size={18} /> {loading ? 'Saving...' : 'Save Property'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
