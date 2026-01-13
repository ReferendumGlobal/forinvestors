import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm({ categoryName, explanation }) {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        funds: '',
        targetLocation: '',
        intent: 'buy',
        requestAccess: true,
        message: '',
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState('Initiating secure transmission...');

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const messages = [
                "Encrypting documents...",
                "Uploading Proof of Funds to secure server...",
                "Verifying submission integrity...",
                "Finalizing transmission..."
            ];
            let i = 0;
            setLoadingText(messages[0]);

            const interval = setInterval(() => {
                i = (i + 1) % messages.length;
                setLoadingText(messages[i]);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [isSubmitting]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('funds', formState.funds);
        formData.append('targetLocation', formState.targetLocation);
        formData.append('intent', formState.intent === 'buy' ? 'Investment (Buy)' : 'Sale');
        formData.append('requestAccess', formState.requestAccess ? 'Yes' : 'No');
        formData.append('message', formState.message);
        formData.append('category', categoryName);
        formData.append('_subject', `New Investment Request: ${categoryName}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        if (formState.file) {
            formData.append('attachment', formState.file);
        }

        try {
            const response = await fetch("https://formsubmit.co/ajax/urbinaagency@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            // Try to parse JSON but don't fail if it's not JSON
            let result = {};
            const text = await response.text();
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.warn("Non-JSON response:", text);
            }

            if (response.ok) {
                setSubmitted(true);
                setFormState({
                    name: '',
                    email: '',
                    phone: '',
                    funds: '',
                    message: '',
                    file: null
                });
            } else {
                setError(result.message || "There was an error submitting the form. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-midnight-800 border border-gold-500/30 rounded-2xl p-8 text-center"
            >
                <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-gold-500" size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Request Sent</h3>
                <p className="text-gray-400">Thank you for contacting us. We have received your proof of funds and will analyze your profile shortly.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                    Send another request
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-midnight-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5 relative">
            <input type="hidden" name="_captcha" value="false" />

            {explanation && (
                <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4 mb-6">
                    <p className="text-gold-400 text-sm">{explanation}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Professional Email</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="john@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                    <input
                        type="tel"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="+34 633..."
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Capital to Invest (€)</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="Ex: 5,000,000"
                        value={formState.funds}
                        onChange={(e) => setFormState({ ...formState, funds: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Where do you want to invest?</label>
                <input
                    type="text"
                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="Ex: Madrid, Marbella, London..."
                    value={formState.targetLocation}
                    onChange={(e) => setFormState({ ...formState, targetLocation: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">What is your goal?</label>
                <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${formState.intent === 'buy' ? 'bg-gold-500/20 border-gold-500 text-white' : 'bg-midnight-900 border-white/10 text-gray-400 hover:border-gold-500/30'}`}>
                        <input
                            type="radio"
                            name="intent"
                            value="buy"
                            checked={formState.intent === 'buy'}
                            onChange={() => setFormState({ ...formState, intent: 'buy' })}
                            className="hidden"
                        />
                        <span className="font-medium">I want to Invest / Buy</span>
                    </label>
                    <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${formState.intent === 'sell' ? 'bg-gold-500/20 border-gold-500 text-white' : 'bg-midnight-900 border-white/10 text-gray-400 hover:border-gold-500/30'}`}>
                        <input
                            type="radio"
                            name="intent"
                            value="sell"
                            checked={formState.intent === 'sell'}
                            onChange={() => setFormState({ ...formState, intent: 'sell' })}
                            className="hidden"
                        />
                        <span className="font-medium">I want to Sell (Exclusive)</span>
                    </label>
                </div>
            </div>

            <div className="flex items-center space-x-3 bg-midnight-900/50 p-4 rounded-lg border border-white/5">
                <input
                    type="checkbox"
                    id="requestAccess"
                    checked={formState.requestAccess}
                    onChange={(e) => setFormState({ ...formState, requestAccess: e.target.checked })}
                    className="form-checkbox h-5 w-5 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500"
                />
                <label htmlFor="requestAccess" className="text-sm text-gray-300 cursor-pointer select-none">
                    I request access to the <strong className="text-gold-400">Private Platform</strong> to view exclusive opportunities.
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                    Proof of Funds (POF) Document <AlertCircle size={14} />
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg bg-midnight-900 hover:bg-midnight-800 transition-colors group cursor-pointer relative">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png,.doc,.docx"
                    />
                    <div className="space-y-1 text-center">
                        {formState.file ? (
                            <div className="flex flex-col items-center">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                <p className="text-sm text-gray-300 mt-2">{formState.file.name}</p>
                                <p className="text-xs text-gray-500">File uploaded successfully</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-gold-400">Upload a file</span>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Additional Message</label>
                <textarea
                    rows={4}
                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="Interested in properties in..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
            </div>

            {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <Loader2 className="mr-2 animate-spin" size={20} />
                            <span>Processing...</span>
                        </div>
                        <span className="text-xs font-normal mt-1 text-gold-100 opacity-90 animate-pulse">{loadingText}</span>
                    </div>
                ) : (
                    <>Send Request <Send size={18} className="ml-2" /></>
                )}
            </button>


        </form>
    );
}
