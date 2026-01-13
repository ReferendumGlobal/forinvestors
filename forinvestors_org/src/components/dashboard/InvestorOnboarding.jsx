
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import InvestorDataForm from './InvestorDataForm';
import IdUpload from './IdUpload';
import ContractSign from './ContractSign';
import { CheckCircle, Shield, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { title: 'Profile & Criteria', icon: User },
    { title: 'Identity Verify', icon: Shield },
    { title: 'Sign Mandate', icon: FileText }
];

export default function InvestorOnboarding() {
    const { user, profile } = useAuth();
    const [step, setStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState({
        criteria: {},
        idUrl: null
    });
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already has contract, if so, maybe redirect to dashboard home or show success?
        // For now, we assume this component is rendered because the user needs to onboard.
    }, []);

    const handleCriteriaComplete = (data) => {
        setOnboardingData(prev => ({ ...prev, criteria: data }));
        setStep(2);
    };

    const handleUploadComplete = (url) => {
        setOnboardingData(prev => ({ ...prev, idUrl: url }));
        setStep(3);
    };

    const handleContractSigned = async () => {
        setCompleted(true);
        // Maybe wait a bit then redirect
        // navigate('/dashboard');
    };

    if (completed) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 px-4">
                <div className="bg-green-500/20 p-6 rounded-full inline-block mb-8">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">You are all set!</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Your mandate has been signed and your profile is verified.
                    We are now cross-referencing your criteria with our off-market assets.
                    You will be notified immediately when a match is found.
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
            <div className="flex justify-between items-center mb-12 relative z-10">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10"></div>
                {STEPS.map((s, i) => {
                    const stepNum = i + 1;
                    const isActive = step === stepNum;
                    const isDone = step > stepNum;

                    return (
                        <div key={i} className="flex flex-col items-center bg-midnight-950 px-4">
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
                        initialData={onboardingData.criteria}
                        onComplete={handleCriteriaComplete}
                    />
                )}
                {step === 2 && (
                    <IdUpload
                        userId={user?.id}
                        onComplete={handleUploadComplete}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <ContractSign
                        mode="onboarding"
                        user={user}
                        profile={profile}
                        criteria={onboardingData.criteria}
                        idUrl={onboardingData.idUrl}
                        onSuccess={handleContractSigned}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div>
    );
}
