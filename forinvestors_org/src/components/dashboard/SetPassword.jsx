
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SetPassword({ onComplete }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            if (onComplete) onComplete();
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto bg-midnight-900 border border-white/5 p-8 rounded-xl shadow-2xl"
        >
            <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-4">
                    <Lock className="text-gold-500" size={24} />
                </div>
                <h2 className="text-2xl font-serif text-white mb-2">Secure Your Account</h2>
                <p className="text-gray-400 text-sm">
                    Please set a password to access your account directly in the future.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-midnight-950 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    {loading ? 'Updating...' : 'Set Password & Continue'}
                </button>
            </form>
        </motion.div>
    );
}
