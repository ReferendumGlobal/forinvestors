
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import SellerDataForm from './SellerDataForm';
import SellerDocsUpload from './SellerDocsUpload';
import ContractSign from './ContractSign';
import { CheckCircle, Shield, FileText, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { title: 'Property & Owners', icon: Building },
    { title: 'Documentation', icon: Shield },
    { title: 'Sign Mandate', icon: FileText }
];

export default function SellerOnboarding() {
    const { user, profile } = useAuth();
    const [step, setStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState({
        property: {},
        owners: [],
        docs: {}
    });
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleDataComplete = (data) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleDocsComplete = (docs) => {
        setOnboardingData(prev => ({ ...prev, docs: docs }));
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
                <h2 className="text-3xl font-bold text-white mb-4">Mandate Signed Successfully!</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Your property search mandate is now active.
                    We are verifying your documents and will start matching your asset with our investors immediately.
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
            <div className="flex justify-between items-center mb-12 relative z-10 max-w-3xl mx-auto">
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
                    <SellerDataForm
                        initialData={onboardingData}
                        onComplete={handleDataComplete}
                    />
                )}
                {step === 2 && (
                    <SellerDocsUpload
                        userId={user?.id}
                        owners={onboardingData.owners}
                        onComplete={handleDocsComplete}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <ContractSign
                        mode="onboarding"
                        contractType="sale_mandate" // Tell ContractSign to use Sale template
                        user={user}
                        profile={profile}
                        sellerData={{
                            property: onboardingData.property,
                            owners: onboardingData.owners,
                            docs: onboardingData.docs
                        }}
                        onSuccess={handleContractSigned}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div>
    );
}
