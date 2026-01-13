import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHome() {
    const { profile } = useAuth();

    if (!profile) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">
                Welcome, {profile.full_name || 'Partner'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                    <h3 className="text-gray-400 text-sm font-medium uppercase">Account Status</h3>
                    <p className={`mt-2 text-2xl font-bold ${profile.status === 'approved' ? 'text-green-500' :
                            profile.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                        {profile.status === 'approved' ? 'Active' :
                            profile.status === 'pending' ? 'Pending Approval' : 'Rejected'}
                    </p>
                </div>
                {/* More widgets can go here */}
            </div>

            {profile.status === 'pending' && (
                <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg">
                    <h4 className="text-yellow-500 font-bold mb-2">Account under Review</h4>
                    <p className="text-gray-300 text-sm">
                        Your profile is being reviewed by our compliance team.
                        Once your POF is verified and contract signed, full access will be granted.
                    </p>
                </div>
            )}
        </div>
    );
}
