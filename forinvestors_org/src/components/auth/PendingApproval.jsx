import React from 'react';
import { Shield, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function PendingApproval() {
    const { signOut, user, profile } = useAuth();

    return (
        <div className="min-h-screen bg-midnight-950 flex flex-col justify-center items-center px-4 relative">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-gold-500" />
                    <span className="text-white font-serif font-bold text-lg">URBINA</span>
                </Link>
                <button
                    onClick={signOut}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <LogOut size={18} className="mr-2" />
                    Cerrar Sesión
                </button>
            </div>

            <div className="max-w-md w-full bg-midnight-900/50 border border-gold-500/30 rounded-2xl p-8 text-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay"></div>

                <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Clock className="w-10 h-10 text-gold-500 animate-pulse" />
                </div>

                <h1 className="text-2xl font-serif text-white mb-4 relative z-10">
                    Solicitud Pendiente
                </h1>

                <div className="space-y-4 text-gray-300 relative z-10">
                    <p>
                        Hola <span className="text-gold-400 font-medium">{profile?.full_name || user?.email}</span>,
                    </p>
                    <p>
                        Tu solicitud de registro está siendo revisada por nuestro equipo de administración.
                    </p>
                    <div className="bg-midnight-950 p-4 rounded-lg border border-white/5 text-sm">
                        <p className="mb-2"><strong>Próximos Pasos:</strong></p>
                        <ul className="text-left list-disc list-inside space-y-1 text-gray-400">
                            <li>Revisión de documentación (DNI/POF/Dossier).</li>
                            <li>Aprobación manual por el administrador.</li>
                            <li>Recepción del <strong>Contrato Digital</strong> por email.</li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500">
                        Te notificaremos en breve a través de <strong>{user?.email}</strong>.
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Urbina Agency. All rights reserved.
            </div>
        </div>
    );
}
