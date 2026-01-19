import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, MapPin, Euro, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MatchingEngine() {
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]);
    const [matches, setMatches] = useState({}); // { propertyId: [leads] }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Properties
            const { data: propsData } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            // Fetch Investor Leads
            const { data: leadsData } = await supabase
                .from('leads')
                .select('*')
                .neq('intent', 'sell') // Only investors/buyers
                .order('created_at', { ascending: false });

            setProperties(propsData || []);
            setLeads(leadsData || []);

            // Calculate Matches
            calculateMatches(propsData, leadsData);

        } catch (error) {
            console.error('Error fetching matching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateMatches = (props, leads) => {
        const newMatches = {};

        props.forEach(property => {
            const propertyMatches = leads.filter(lead => {
                let score = 0;

                // 1. Location Match (Simple substring check)
                if (lead.target_location && property.location) {
                    if (property.location.toLowerCase().includes(lead.target_location.toLowerCase()) ||
                        lead.target_location.toLowerCase().includes(property.location.toLowerCase())) {
                        score += 3;
                    }
                }

                return score > 0;
            });
            newMatches[property.id] = propertyMatches;
        });

        setMatches(newMatches);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-midnight-900 to-midnight-800 p-6 rounded-xl border border-gold-500/20">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Users className="text-gold-500" /> Matching Engine (Beta)
                </h2>
                <p className="text-gray-400 text-sm">
                    This system automatically cross-references your property inventory with investor demands based on location and key criteria.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {properties.map(property => {
                    const matchedLeads = matches[property.id] || [];
                    if (matchedLeads.length === 0) return null;

                    return (
                        <div key={property.id} className="bg-midnight-900 border border-white/5 rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-white/5 bg-midnight-950/50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                                        {property.images?.[0] ? <img src={property.images[0]} className="w-full h-full object-cover rounded-lg" /> : 'No Foto'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{property.title}</h3>
                                        <div className="flex gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {property.location}</span>
                                            <span className="flex items-center gap-1 text-gold-400"><Euro size={12} /> {parseInt(property.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-gold-500">{matchedLeads.length}</span>
                                    <p className="text-xs text-gray-500">Interested Investors</p>
                                </div>
                            </div>

                            <div className="divide-y divide-white/5">
                                {matchedLeads.map(lead => (
                                    <div key={lead.id} className="p-4 hover:bg-white/5 transition-colors flex justify-between items-center group">
                                        <div>
                                            <p className="font-medium text-gray-200 text-sm">{lead.full_name}</p>
                                            <p className="text-xs text-gray-500">{lead.email} • {lead.target_location}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${lead.status === 'contract_signed' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`}>
                                                {lead.status === 'contract_signed' ? 'Contract Signed' : 'No Contract'}
                                            </span>
                                            <button className="bg-gold-600 text-white text-xs px-3 py-1.5 rounded hover:bg-gold-700 flex items-center gap-1">
                                                Send Dossier <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {properties.length > 0 && Object.values(matches).every(m => m.length === 0) && (
                    <div className="text-center py-12 text-gray-400">
                        No automatic matches found between properties and current investors.
                    </div>
                )}
            </div>
        </div>
    );
}
