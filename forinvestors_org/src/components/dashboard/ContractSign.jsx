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
        ? `PARTNERSHIP AGREEMENT (AGENCY)
        
Between Urbina Agency and ${profile?.company_name || 'the Agency'}, it is agreed:
1. The Agency may publish its assets on the platform.
2. Urbina Agency will act as an intermediary...
[... Full legal text of agency agreement ...]`
        : `BUY / SELL MANDATE (INVESTOR)

Between Urbina Agency and ${profile?.full_name || 'the Investor'}, it is agreed:
1. The Investor grants a mandate for asset search...
2. The agreed commission will be X% of the final value...
[... Full legal text of investment mandate ...]`;

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
                setContractUrl(data.signature_url);
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
                        signature_url: signatureDataUrl,
                        signed_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            setSigned(true);
            setContractUrl(signatureDataUrl);

        } catch (err) {
            console.error('Error saving contract:', err);
            alert('Error saving signature. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white text-center p-10">Loading contract...</div>;

    if (signed) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-midnight-900 border border-green-500/30 rounded-xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-500/20 rounded-full text-green-500">
                        <CheckCircle size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Contract Signed Successfully</h2>
                <p className="text-gray-300 mb-8">
                    Your documentation is in order. Our compliance team will review your profile for final activation.
                </p>
                <div className="bg-white/5 p-4 rounded-lg inline-block text-left max-w-lg mx-auto w-full">
                    <p className="text-xs text-gray-500 uppercase mb-2">Registered Signature:</p>
                    <img src={contractUrl} alt="Signature" className="bg-white rounded p-2 h-20 border border-gray-600" />
                    <p className="text-xs text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
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
                        {profile?.role === 'agency' ? 'Partnership Agreement Signing' : 'Mandate Signing'}
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
                        Please read carefully and sign in the box below to complete your access request.
                    </p>
                </div>

                <SignaturePad onSave={handleSignatureSave} />
            </div>
        </div>
    );
}
