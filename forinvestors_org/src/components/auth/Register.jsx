import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Shield, User, Building, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [companyName, setCompanyName] = useState(''); // For Agencies
    const [searchParams] = useSearchParams();

    // Default to investor if not specified, but check params
    const typeParam = searchParams.get('type');
    const [role, setRole] = useState(typeParam === 'agency' ? 'agency' : 'investor');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Update role if URL param changes
    useEffect(() => {
        if (typeParam === 'agency' || typeParam === 'investor') {
            setRole(typeParam);
        }
    }, [typeParam]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign Up Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                        company_name: role === 'agency' ? companyName : null,
                        status: 'pending' // Default to pending for manual approval
                    },
                    emailRedirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (authError) throw authError;

            // 2. Check if session exists (Email Confirmation might be enabled)
            if (authData.session) {
                navigate('/dashboard');
            } else {
                // User created but not signed in (needs verification)
                alert('Registration successful! Please check your email to confirm your account before logging in.');
                navigate('/login');
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message || "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-midnight-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center mb-6">
                    <Shield className="h-12 w-12 text-gold-500" />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Access Request
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Join Urbina Agency as {role === 'agency' ? 'Partner Agency' : 'Qualified Investor'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-midnight-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10"
                >
                    {/* Role Toggles */}
                    <div className="flex rounded-md bg-midnight-950 p-1 mb-6 border border-white/5">
                        <button
                            type="button"
                            onClick={() => setRole('investor')}
                            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${role === 'investor'
                                ? 'bg-gold-600 text-white shadow'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <User size={16} className="mr-2" /> Investor
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('agency')}
                            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${role === 'agency'
                                ? 'bg-gold-600 text-white shadow'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Building size={16} className="mr-2" /> Agency
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        {role === 'agency' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <label className="block text-sm font-medium text-gray-300">Agency Name</label>
                                <input
                                    type="text"
                                    required={role === 'agency'}
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                                />
                            </motion.div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <span className="flex items-center">
                                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm font-medium text-gold-500 hover:text-gold-400">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
