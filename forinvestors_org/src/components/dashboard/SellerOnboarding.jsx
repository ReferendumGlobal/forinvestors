
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SellerDataForm from './SellerDataForm';
import SellerDocsUpload from './SellerDocsUpload';
import ContractSign from './ContractSign';
import { CheckCircle, Building2, FileText, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { title: 'Property & Owners', icon: Building2 },
    { title: 'Documentation', icon: UploadCloud },
    { title: 'Sign Mandate', icon: FileText }
];

export default function SellerOnboarding() {
    const { user, profile } = useAuth();
    const [step, setStep] = useState(1);
    const [sellerData, setSellerData] = useState({});
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Hydrate from Leads (if user came from public Sell page)
        const fetchLeadData = async () => {
            if (!user?.email) return;
            const { data } = await supabase
                .from('leads')
                .select('*')
                .eq('email', user.email)
                .eq('role', 'seller')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setSellerData(prev => ({
                    ...prev,
                    property: {
                        address: data.target_location || '', // Using target_location as address/location
                        price: data.budget || '', // Using budget as price
                        type: data.message || '', // Details often contain type
                    },
                    owners: [
                        { name: data.full_name || '', email: data.email || '', percent: '100', idNumber: '' }
                    ]
                }));
            }
        };
        fetchLeadData();
    }, [user]);

    const handleDataComplete = (data) => {
        setSellerData(prev => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleDocsComplete = (docsData) => {
        setSellerData(prev => ({ ...prev, docs: docsData }));
        setStep(3);
    };

    const handleContractSigned = async () => {
        setCompleted(true);
    };

    if (completed) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 px-4">
                <div className="bg-green-500/20 p-6 rounded-full inline-block mb-8">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Mandate Active!</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Your property is now under exclusive management.
                    We will begin the marketing process immediately.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-gold-500 text-midnight-950 px-8 py-3 rounded-lg font-bold hover:bg-gold-400 transition-all"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Stepper */}
            <div className="flex justify-center items-center gap-10 mb-12 relative z-10">
                {STEPS.map((s, i) => {
                    const stepNum = i + 1;
                    const isActive = step === stepNum;
                    const isDone = step > stepNum;

                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${isActive ? 'border-gold-500 bg-gold-500/20 text-gold-500' :
                                    isDone ? 'border-green-500 bg-green-500/20 text-green-500' :
                                        'border-gray-700 bg-midnight-900 text-gray-500'
                                }`}>
                                {isDone ? <CheckCircle size={24} /> : <s.icon size={24} />}
                            </div>
                            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                {s.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Content */}
            <div className="transition-all duration-300">
                {step === 1 && (
                    <SellerDataForm
                        initialData={sellerData}
                        onComplete={handleDataComplete}
                    />
                )}
                {step === 2 && (
                    <SellerDocsUpload
                        sellerData={sellerData}
                        onComplete={handleDocsComplete}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <ContractSign
                        mode="onboarding"
                        contractType="sale_mandate"
                        user={user}
                        profile={profile}
                        sellerData={sellerData} // Pass all data including docs urls
                        onSuccess={handleContractSigned}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div>
    );
}
