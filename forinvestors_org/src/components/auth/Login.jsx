import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/dashboard');
        } catch (err) {
            setError(err.message === 'Invalid login credentials'
                ? 'Invalid credentials. Please check your email and password.'
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/dashboard/reset-password`,
            });
            if (error) throw error;
            alert('Password reset link sent! Check your email.');
            setMode('login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [mode, setMode] = useState('login'); // 'login' or 'forgot'

    if (mode === 'forgot') {
        return (
            <div className="min-h-screen bg-midnight-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Reset Password</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-midnight-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
                        <form className="space-y-6" onSubmit={handleForgotPassword}>
                            {error && <div className="text-red-400 text-center">{error}</div>}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Email</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="bg-midnight-950 block w-full border border-white/10 rounded-md py-3 px-4 text-white focus:ring-gold-500 focus:border-gold-500" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700">
                                {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                            </button>
                            <button type="button" onClick={() => setMode('login')} className="w-full text-center text-sm text-gray-400 hover:text-white mt-2">
                                Back to Login
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-midnight-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-start mb-4">
                    <Link to="/" className="text-sm text-gold-500 hover:text-gold-400 flex items-center gap-2">
                        ← Back to Home
                    </Link>
                </div>
                <Link to="/" className="flex justify-center mb-6">
                    <Shield className="h-12 w-12 text-gold-500" />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Platform Access
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Exclusive for Partners and Verified Agencies
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-midnight-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10"
                >
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Corporate Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-midnight-950 block w-full pl-10 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-midnight-950 block w-full pl-10 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <button type="button" onClick={() => setMode('forgot')} className="font-medium text-gold-500 hover:text-gold-400">
                                    Forgot password?
                                </button>
                            </div>
                        </div>

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
                                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-midnight-950 text-gray-400">Not a member yet?</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Link
                                to="/register?type=investor"
                                className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-md shadow-sm bg-midnight-900 text-sm font-medium text-white hover:bg-midnight-800 transition-colors"
                            >
                                <span className="sr-only">Sign up for</span> Investor
                            </Link>
                            <Link
                                to="/register?type=agency"
                                className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-md shadow-sm bg-midnight-900 text-sm font-medium text-white hover:bg-midnight-800 transition-colors"
                            >
                                <span className="sr-only">Sign up for</span> Agency
                            </Link>
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/sell" className="text-sm text-gold-500 hover:text-gold-400">
                                Looking to sell a property?
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
