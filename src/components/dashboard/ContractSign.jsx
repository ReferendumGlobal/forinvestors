import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SignaturePad from './SignaturePad';
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContractSign() {
    const { profile, user } = useAuth();
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contractUrl, setContractUrl] = useState(null);

    // Contract text content based on role
    const contractContent = profile?.role === 'agency'
        ? `CONTRATO DE COLABORACIÓN (AGENCIA)
        
Entre Urbina Agency y ${profile?.company_name || 'la Agencia'}, se acuerda:
1. La Agencia podrá publicar sus activos en la plataforma.
2. Urbina Agency actuará como intermediario...
[... Texto legal completo del contrato de agencia ...]`
        : `MANDATO DE COMPRA / VENTA (INVERSOR)

Entre Urbina Agency y ${profile?.full_name || 'el Inversor'}, se acuerda:
1. El Inversor otorga mandato para la búsqueda de activos...
2. La comisión pactada será del X% sobre el valor final...
[... Texto legal completo del contrato de inversión ...]`;

    useEffect(() => {
        checkExistingContract();
    }, []);

    const checkExistingContract = async () => {
        try {
            const { data, error } = await supabase
                .from('contracts')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setSigned(true);
                setContractUrl(data.signature_url); // In this MVP we treat signature_url as the proof
            }
        } catch (err) {
            // No contract found
        } finally {
            setLoading(false);
        }
    };

    const handleSignatureSave = async (signatureDataUrl) => {
        setLoading(true);
        try {
            // 1. Insert into contracts table
            const { error } = await supabase
                .from('contracts')
                .insert([
                    {
                        user_id: user.id,
                        type: profile?.role === 'agency' ? 'collaboration' : 'buy_mandate',
                        signature_url: signatureDataUrl, // Storing base64 directly for MVP simplicity
                        signed_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            // 2. Update profile status (optional, maybe wait for admin to act based on contract?)
            // We'll keep status as 'pending' until Admin manually approves in the Users Panel.

            setSigned(true);
            setContractUrl(signatureDataUrl);

        } catch (err) {
            console.error('Error saving contract:', err);
            alert('Error al guardar la firma. Por favor intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white text-center p-10">Cargando contrato...</div>;

    if (signed) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-midnight-900 border border-green-500/30 rounded-xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-500/20 rounded-full text-green-500">
                        <CheckCircle size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Contrato Firmado Correctamente</h2>
                <p className="text-gray-300 mb-8">
                    Su documentación está en regla. Nuestro equipo de compliance revisará su perfil para la activación final.
                </p>
                <div className="bg-white/5 p-4 rounded-lg inline-block text-left max-w-lg mx-auto w-full">
                    <p className="text-xs text-gray-500 uppercase mb-2">Firma Registrada:</p>
                    <img src={contractUrl} alt="Firma" className="bg-white rounded p-2 h-20 border border-gray-600" />
                    <p className="text-xs text-gray-500 mt-2">Fecha: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-gold-500" size={28} />
                    <h1 className="text-2xl font-bold text-white">
                        {profile?.role === 'agency' ? 'Firma de Acuerdo de Colaboración' : 'Firma de Mandato'}
                    </h1>
                </div>

                <div className="bg-white text-black p-8 rounded shadow-inner h-96 overflow-y-auto font-serif text-sm leading-relaxed mb-8">
                    <pre className="whitespace-pre-wrap font-serif">
                        {contractContent}
                    </pre>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg mb-8 flex gap-3">
                    <AlertCircle className="text-yellow-500 shrink-0" />
                    <p className="text-sm text-gray-300">
                        Por favor, lea atentamente y firme en el recuadro inferior para completar su solicitud de acceso.
                    </p>
                </div>

                <SignaturePad onSave={handleSignatureSave} />
            </div>
        </div>
    );
}
