
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Building, Users, FileText, LogOut, Menu, X } from 'lucide-react';
import InvestorOnboarding from './InvestorOnboarding';
import SellerOnboarding from './SellerOnboarding';
import AgencyOnboarding from './AgencyOnboarding';
import PendingApproval from '../auth/PendingApproval';

export default function DashboardLayout() {
    const { user, profile, loading: authLoading, signOut } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [hasContract, setHasContract] = useState(false);
    const [checkingContract, setCheckingContract] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Check contract if user is investor, seller, or agency
        if (user && ['investor', 'seller', 'agency'].includes(profile?.role)) {
            checkContract();
        } else {
            setCheckingContract(false);
        }
    }, [user, profile]);

    const checkContract = async () => {
        try {
            const { data, error } = await supabase
                .from('contracts')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle();

            if (data) setHasContract(true);
        } catch (err) {
            console.error(err);
        } finally {
            setCheckingContract(false);
        }
    };

    if (authLoading || checkingContract) return (
        <div className="min-h-screen bg-midnight-950 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
    );

    if (!user) return <Navigate to="/login" />;

    // 0. PENDING APPROVAL CHECK
    // Only block if explicitly pending. If 'approved' (default for old users?) or null, proceed.
    // Assuming new flow sets 'pending'.
    if (user.user_metadata?.status === 'pending' || profile?.status === 'pending') {
        return <PendingApproval />;
    }

    // --- ONBOARDING ROUTING ---

    // 1. INVESTOR
    if (profile?.role === 'investor' && !hasContract) {
        return (
            <div className="min-h-screen bg-midnight-950 flex flex-col">
                <header className="bg-midnight-900 border-b border-white/5 h-16 flex items-center justify-between px-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="text-white font-serif font-bold text-lg">URBINA</span>
                    </Link>
                    <button onClick={signOut} className="text-gray-400 hover:text-white text-sm">
                        Sign Out
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <InvestorOnboarding />
                </main>
            </div>
        );
    }

    // 2. SELLER
    if (profile?.role === 'seller' && !hasContract) {
        return (
            <div className="min-h-screen bg-midnight-950 flex flex-col">
                <header className="bg-midnight-900 border-b border-white/5 h-16 flex items-center justify-between px-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="text-white font-serif font-bold text-lg">URBINA</span>
                    </Link>
                    <button onClick={signOut} className="text-gray-400 hover:text-white text-sm">
                        Sign Out
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <SellerOnboarding />
                </main>
            </div>
        );
    }

    // 3. AGENCY
    if (profile?.role === 'agency' && !hasContract) {
        return (
            <div className="min-h-screen bg-midnight-950 flex flex-col">
                <header className="bg-midnight-900 border-b border-white/5 h-16 flex items-center justify-between px-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="text-white font-serif font-bold text-lg">URBINA</span>
                    </Link>
                    <button onClick={signOut} className="text-gray-400 hover:text-white text-sm">
                        Sign Out
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <AgencyOnboarding />
                </main>
            </div>
        );
    }

    // Navigation items based on role
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'agency', 'investor', 'seller'] },
        { name: 'Admin Panel', path: '/dashboard/admin', icon: Shield, roles: ['admin'] },
        { name: 'Users', path: '/dashboard/users', icon: Users, roles: ['admin'] },
        { name: 'Properties', path: '/dashboard/properties', icon: Building, roles: ['admin', 'agency', 'seller'] },
        { name: 'Opportunities', path: '/dashboard/opportunities', icon: Building, roles: ['investor'] },
        { name: 'Contracts', path: '/dashboard/contracts', icon: FileText, roles: ['admin', 'agency', 'investor', 'seller'] },
    ];

    const filteredNav = navItems.filter(item => item.roles.includes(profile?.role));

    return (
        <div className="min-h-screen bg-midnight-950 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-midnight-900 border-r border-white/5 transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
                    <Link to="/" className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="text-white font-serif font-bold text-lg">URBINA</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-4 py-6 space-y-1">
                    {filteredNav.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-gold-500/10 text-gold-500'
                                : 'text-gray-400 hover:bg-midnight-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
                    <div className="flex items-center px-4 py-3 mb-2">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-bold">
                                {profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white truncate max-w-[120px]">{profile?.full_name || 'User'}</p>
                            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-midnight-900 border-b border-white/5 lg:hidden">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="text-white font-medium">Dashboard</span>
                        <div className="w-6" /> {/* Spacer */}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
