import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Users, FileText, CheckCircle, XCircle, Mail, Loader2, AlertTriangle, GitMerge } from 'lucide-react';
import MatchingEngine from './MatchingEngine';

export default function AdminPanel() {
    const { profile } = useAuth();
    const [leads, setLeads] = useState([]);
    const [users, setUsers] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'users', 'contracts'

    useEffect(() => {
        if (profile?.role === 'admin') {
            fetchData();
        }
    }, [profile]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Leads
            const { data: leadsData } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });
            setLeads(leadsData || []);

            // 2. Fetch Profiles (Users)
            const { data: profilesData } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });
            setUsers(profilesData || []);

            // 3. Fetch Contracts
            const { data: contractsData } = await supabase
                .from('contracts')
                .select('*, profiles(full_name, email)')
                .order('signed_at', { ascending: false });
            setContracts(contractsData || []);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (lead) => {
        // Here we would ideally trigger a Cloud Function to send an email.
        // For MVP, we'll just update status and alert the admin to send the link manually.
        const { error } = await supabase
            .from('leads')
            .update({ status: 'invited' })
            .eq('id', lead.id);

        if (!error) {
            const roleParam = lead.role || (lead.intent === 'sell' ? 'seller' : 'investor');
            alert(`Marcado como invitado. Envía este link a ${lead.email}:\n\nhttps://parainversores.com/#/register?email=${encodeURIComponent(lead.email)}&type=${roleParam}`);
            fetchData();
        }
    };

    const handleApproveUser = async (userId) => {
        const { error } = await supabase
            .from('profiles')
            .update({ status: 'approved' })
            .eq('id', userId);

        if (!error) fetchData();
    };

    if (!profile || profile.role !== 'admin') {
        return <div className="p-10 text-center text-red-500">Access Denied</div>;
    }

    if (loading) return <div className="p-10 text-center text-gold-500"><Loader2 className="animate-spin inline mr-2" /> Loading Admin Data...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <AlertTriangle className="text-red-500" /> Admin Control Center
            </h1>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-white/10 mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('leads')}
                    className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'leads' ? 'border-b-2 border-gold-500 text-gold-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Leads / Solicitudes ({leads.length})
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'users' ? 'border-b-2 border-gold-500 text-gold-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Usuarios Registrados ({users.length})
                </button>
                <button
                    onClick={() => setActiveTab('contracts')}
                    className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'contracts' ? 'border-b-2 border-gold-500 text-gold-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Contratos Firmados ({contracts.length})
                </button>
                <button
                    onClick={() => setActiveTab('matching')}
                    className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'matching' ? 'border-b-2 border-gold-500 text-gold-500' : 'text-gray-400 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <GitMerge size={16} /> Matching
                    </div>
                </button>
            </div>

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
                <div className="bg-midnight-900 rounded-lg border border-white/10 overflow-hidden">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-midnight-950">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email/Tel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Intención</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-midnight-900 divide-y divide-white/5">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">{lead.full_name}</div>
                                        <div className="text-xs text-gray-500">{lead.target_location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{lead.email}</div>
                                        <div className="text-xs text-gray-500">{lead.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.intent === 'buy' ? 'bg-green-100/10 text-green-400' : 'bg-blue-100/10 text-blue-400'}`}>
                                            {lead.intent === 'buy' ? 'Comprar' : 'Vender'}
                                        </span>
                                        {lead.request_access && (
                                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100/10 text-gold-400">
                                                Acceso
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.status === 'invited' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {lead.status !== 'invited' && (
                                            <button
                                                onClick={() => handleInvite(lead)}
                                                className="text-gold-500 hover:text-gold-400 flex items-center justify-end gap-1 w-full"
                                            >
                                                <Mail size={16} /> Invitar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
                <div className="bg-midnight-900 rounded-lg border border-white/10 overflow-hidden">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-midnight-950">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-midnight-900 divide-y divide-white/5">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">{u.full_name}</div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{u.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.status === 'approved' ? 'bg-green-100/10 text-green-400' :
                                            u.status === 'rejected' ? 'bg-red-100/10 text-red-400' :
                                                'bg-yellow-100/10 text-yellow-400'
                                            }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {u.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleApproveUser(u.id)}
                                                    className="text-green-500 hover:text-green-400"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button className="text-red-500 hover:text-red-400">
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* CONTRACTS TAB */}
            {activeTab === 'contracts' && (
                <div className="bg-midnight-900 rounded-lg border border-white/10 overflow-hidden">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-midnight-950">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Firmado Por</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Firma</th>
                            </tr>
                        </thead>
                        <tbody className="bg-midnight-900 divide-y divide-white/5">
                            {contracts.map((c) => (
                                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {new Date(c.signed_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">{c.profiles?.full_name || 'Usuario desconocido'}</div>
                                        <div className="text-xs text-gray-500">{c.profiles?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                                        {c.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <img src={c.signature_url} alt="Firma" className="h-8 inline-block bg-white rounded p-1" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* MATCHING ENGINE TAB */}
            {activeTab === 'matching' && (
                <MatchingEngine />
            )}
        </div>
    );
}
