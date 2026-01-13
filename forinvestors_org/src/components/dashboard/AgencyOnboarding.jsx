
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AgencyDataForm from './AgencyDataForm';
import ContractSign from './ContractSign';
import { CheckCircle, Building2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { title: 'Agency Details', icon: Building2 },
    { title: 'Collaboration Agreement', icon: FileText }
];

export default function AgencyOnboarding() {
    const { user, profile } = useAuth();
    const [step, setStep] = useState(1);
    const [agencyData, setAgencyData] = useState({});
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleDataComplete = (data) => {
        setAgencyData(data);
        setStep(2);
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
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Network!</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Your Collaboration Agreement is signed and active.
                    You can now upload your portfolio to start matching with our investors.
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
                    <AgencyDataForm
                        initialData={agencyData}
                        onComplete={handleDataComplete}
                    />
                )}
                {step === 2 && (
                    <ContractSign
                        mode="onboarding"
                        contractType="agency_collaboration"
                        user={user}
                        profile={profile}
                        agencyData={agencyData} // Pass the collected data
                        onSuccess={handleContractSigned}
                        onBack={() => setStep(1)}
                    />
                )}
            </div>
        </div>
    );
}
