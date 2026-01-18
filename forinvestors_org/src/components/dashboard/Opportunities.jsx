import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Building, MapPin, Euro, ArrowRight, Lock, Eye, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Opportunities() {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        if (user) fetchMatches();
    }, [user]);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            // 1. Get User's Investment Criteria from Contract
            const { data: contractData } = await supabase
                .from('contracts')
                .select('criteria')
                .eq('user_id', user.id)
                .eq('type', 'buy_mandate')
                .maybeSingle();

            if (!contractData || !contractData.criteria) {
                setLoading(false);
                return;
            }

            const criteria = contractData.criteria;

            // Normalize criteria locations
            let targetLocations = [];
            if (criteria.searchProfiles && Array.isArray(criteria.searchProfiles)) {
                targetLocations = criteria.searchProfiles.map(p => p.country?.toLowerCase()).filter(Boolean);
                // Also add regions if present
                criteria.searchProfiles.forEach(p => {
                    if (p.region) targetLocations.push(p.region.toLowerCase());
                });
            } else if (criteria.targetLocation) {
                targetLocations.push(criteria.targetLocation.toLowerCase());
            } else if (criteria.targetCountry) {
                targetLocations.push(criteria.targetCountry.toLowerCase());
            }

            // 2. Fetch All Properties
            const { data: properties } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (!properties) {
                setMatches([]);
                return;
            }

            // 3. Match Logic (Client-side simple matching)
            const matchedProps = properties.filter(p => {
                if (!p.location) return false;
                const propLoc = p.location.toLowerCase();
                // Check if any target location is contained in property location OR vice versa
                return targetLocations.some(target =>
                    propLoc.includes(target) || target.includes(propLoc)
                );
            });

            setMatches(matchedProps);

        } catch (error) {
            console.error('Error fetching opportunities:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Building className="text-gold-500" /> My Opportunities
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Exclusive off-market assets matching your signed mandate criteria.
                    </p>
                </div>
                <div className="bg-midnight-800 px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-2xl font-bold text-gold-500">{matches.length}</span>
                    <span className="text-xs text-gray-500 ml-2">Active Matches</span>
                </div>
            </header>

            {matches.length === 0 ? (
                <div className="text-center py-20 bg-midnight-900 rounded-xl border border-white/5 border-dashed">
                    <div className="w-16 h-16 bg-midnight-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                        <Building size={32} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">No Matches Yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        We are actively scouting assets that match your criteria. You will be notified when a new property is added that fits your profile.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {matches.map(property => (
                        <motion.div
                            layoutId={property.id}
                            key={property.id}
                            onClick={() => setSelectedProperty(property)}
                            className="bg-midnight-900 border border-white/10 rounded-xl overflow-hidden hover:border-gold-500/50 transition-colors cursor-pointer group"
                        >
                            <div className="aspect-video relative overflow-hidden bg-gray-800">
                                {property.images?.[0] ? (
                                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-600">
                                        <Building size={48} opacity={0.5} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 bg-midnight-950/80 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs text-gold-400 flex items-center gap-1">
                                    <Lock size={12} /> Confidential
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{property.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {property.location}</span>
                                    <span className="flex items-center gap-1 text-gold-400"><Euro size={14} /> {parseInt(property.price).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                    {property.description || "No description available."}
                                </p>
                                <div className="flex items-center text-gold-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                    View Full Dossier <ArrowRight size={16} className="ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PROPERTY DETAIL MODAL */}
            <AnimatePresence>
                {selectedProperty && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProperty(null)}
                    >
                        <motion.div
                            layoutId={selectedProperty.id}
                            className="bg-midnight-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedProperty.images?.[0]}
                                className="w-full h-64 object-cover"
                                alt={selectedProperty.title}
                            />

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProperty.title}</h2>
                                        <p className="text-gold-400 text-xl font-serif">€{parseInt(selectedProperty.price).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProperty(null)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Close
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                    <div className="col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><FileText size={18} /> Asset Overview</h3>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                {selectedProperty.description}
                                            </p>
                                        </div>

                                        {/* Dynamic Features from JSON if available */}
                                        {selectedProperty.features && (
                                            <div>
                                                <h3 className="text-white font-bold mb-2">Key Features</h3>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {Object.entries(selectedProperty.features).map(([key, value]) => (
                                                        <li key={key} className="text-sm text-gray-400 flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                                                            <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                                                            <span className="text-white">{value}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                                            <h4 className="text-white font-bold mb-4">Private Dossier</h4>
                                            <div className="space-y-4">
                                                <p className="text-xs text-gray-500">
                                                    You have access to this confidential information because you have an active Search Mandate.
                                                </p>
                                                <button className="w-full bg-gold-600 hover:bg-gold-700 text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                                    <Download size={16} /> Download Full PDF
                                                </button>
                                                <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold text-sm transition-colors border border-white/10">
                                                    Request Visit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
