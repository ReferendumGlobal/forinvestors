import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHome() {
    const { profile } = useAuth();

    if (!profile) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">
                Bienvenido, {profile.full_name || 'Socio'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                    <h3 className="text-gray-400 text-sm font-medium uppercase">Estado de Cuenta</h3>
                    <p className={`mt-2 text-2xl font-bold ${profile.status === 'approved' ? 'text-green-500' :
                            profile.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                        {profile.status === 'approved' ? 'Activo' :
                            profile.status === 'pending' ? 'Pendiente de Aprobación' : 'Rechazado'}
                    </p>
                </div>
                {/* More widgets can go here */}
            </div>

            {profile.status === 'pending' && (
                <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg">
                    <h4 className="text-yellow-500 font-bold mb-2">Cuenta en Revisión</h4>
                    <p className="text-gray-300 text-sm">
                        Su perfil está siendo revisado por nuestro equipo de compliance.
                        Una vez verificado su POF y firmado el contrato, tendrá acceso completo.
                    </p>
                </div>
            )}
        </div>
    );
}
