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
    const [contractContent, setContractContent] = useState('');
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (profile?.role) {
            setRole(profile.role);
        }
    }, [profile]);

    useEffect(() => {
        if (!role) return;

        let contractText = '';
        if (role === 'agency') {
            contractText = `CONTRATO DE COLABORACIÓN (AGENCIA)
            
Entre Big Investors y ${profile?.company_name || 'la Agencia'}, se acuerda:

1. Ambas partes colaborarán en la comercialización de activos.
2. Big Investors actuará como intermediario principal.
3. Se respetará la confidencialidad de los clientes compartidos.
4. Honorarios compartidos al 50% en operaciones conjuntas.`;
        } else if (role === 'seller') {
            contractText = `HOJA DE ENCARGO DE VENTA (EXCLUSIVA)

Entre Big Investors y ${profile?.full_name || 'el Propietario'}, se acuerda:

1. El Propietario encarga a Big Investors la gestión de venta en EXCLUSIVA de su propiedad.
2. El precio de venta acordado es el reflejado en la ficha del activo.
3. Los honorarios de Big Investors serán del 3% + IVA sobre el precio final.
4. Confidencialidad: Big Investors se compromete a no publicar la propiedad en portales abiertos.`;
        } else {
            // Investor
            contractText = `MANDATO DE COMPRA / VENTA (INVERSOR)

Entre Big Investors y ${profile?.full_name || 'el Inversor'}, se acuerda:

1. El Inversor reconoce el carácter confidencial de la información recibida.
2. Se compromete a no contactar directamente con la propiedad sin la intermediación de Big Investors.
3. En caso de compra, los honorarios de Big Investors serán del 3% coste compra venta abonado por la parte vendedora.`;
        }
        setContractContent(contractText);
        checkExistingContract();
    }, [role, profile]);

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
                        type: profile?.role === 'agency' ? 'collaboration' :
                            profile?.role === 'seller' ? 'sales_mandate' : 'buy_mandate',
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
                        {profile?.role === 'agency' ? 'Firma de Acuerdo de Colaboración' :
                            profile?.role === 'seller' ? 'Firma de Hoja de Encargo' :
                                'Firma de Mandato'}
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
