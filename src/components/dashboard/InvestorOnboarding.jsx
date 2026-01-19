
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import InvestorDataForm from './InvestorDataForm';
import IdUpload from './IdUpload';
import ContractSign from './ContractSign';
import { CheckCircle, Building2, FileText, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { title: 'Investment Profile', icon: Building2 },
    { title: 'Identity Verification', icon: UserCircle },
    { title: 'Sign Mandate', icon: FileText }
];

export default function InvestorOnboarding() {
    const { user, profile } = useAuth();
    const [step, setStep] = useState(1);
    const [investorData, setInvestorData] = useState({});
    const [docs, setDocuments] = useState({});
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Hydrate from Leads (if user came from public form)
        const fetchLeadData = async () => {
            if (!user?.email) return;
            const { data } = await supabase
                .from('leads')
                .select('*')
                .eq('email', user.email)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                // Pre-fill data from the lead form
                setInvestorData(prev => ({
                    ...prev,
                    investmentCapacity: data.budget || '',
                    companyName: data.company_name || '',
                    address: data.target_location || '',
                    pof_url: data.message?.match(/https?:\/\/[^\s]+/)?.[0] // Try to extract POF URL if embedded in message
                }));
            }
        };
        fetchLeadData();
    }, [user]);

    const handleDataComplete = (data) => {
        setInvestorData(data);
        setStep(2);
    };

    const handleDocsUpload = (uploadedDocs) => {
        setDocuments(uploadedDocs); // { passport: url, etc }
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
                <h2 className="text-3xl font-bold text-white mb-4">You are all set!</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Your mandate has been signed. You now have full access to our exclusive opportunities.
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
                    <InvestorDataForm
                        initialData={investorData}
                        onComplete={handleDataComplete}
                    />
                )}
                {step === 2 && (
                    <IdUpload
                        onUploadComplete={handleDocsUpload}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <ContractSign
                        mode="onboarding"
                        contractType="buy_mandate"
                        user={user}
                        profile={profile}
                        criteria={investorData}
                        idUrl={docs.passport}
                        onSuccess={handleContractSigned}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div>
    );
}
