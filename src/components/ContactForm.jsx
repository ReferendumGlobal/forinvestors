import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm({ categoryName, explanation }) {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        funds: '',
        message: '',
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState('Iniciando transmisión segura...');

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const messages = [
                "Encriptando documentos...",
                "Subiendo Prueba de Fondos a servidor seguro...",
                "Verificando integridad del envío...",
                "Finalizando transmisión..."
            ];
            let i = 0;
            setLoadingText(messages[0]);

            const interval = setInterval(() => {
                i = (i + 1) % messages.length;
                setLoadingText(messages[i]);
            }, 4000); // Change message every 4 seconds

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
        formData.append('message', formState.message);
        formData.append('category', categoryName);
        formData.append('_subject', `Nueva solicitud de inversión: ${categoryName}`);
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

            // Try to parse JSON but don't fail if it's not JSON (e.g. if email was sent but response is weird)
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
                setError(result.message || "Hubo un error al enviar el formulario. Inténtelo de nuevo.");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Error de conexión. Compruebe su internet e inténtelo de nuevo.");
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
                <h3 className="text-2xl font-serif text-white mb-2">Solicitud Enviada</h3>
                <p className="text-gray-400">Hemos recibido su información y prueba de fondos correctamente. Nuestro equipo analizará su perfil y le contactará en breve.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                    Enviar otra solicitud
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-midnight-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5 relative">
            <input type="hidden" name="_captcha" value="false" />

            <input type="hidden" name="_captcha" value="false" />

            {explanation && (
                <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4 mb-6">
                    <p className="text-gold-400 text-sm">{explanation}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre Completo</label>
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Profesional</label>
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
                    <input
                        type="tel"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="+34 633..."
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Capital a Invertir (€)</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="Ej: 5.000.000"
                        value={formState.funds}
                        onChange={(e) => setFormState({ ...formState, funds: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                    Documento Prueba de Fondos (POF) <AlertCircle size={14} />
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
                                <p className="text-xs text-gray-500">Documento cargado correctamente</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-gold-400">Sube un archivo</span>
                                    <p className="pl-1">o arrastra y suelta</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG hasta 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Mensaje Adicional</label>
                <textarea
                    rows={4}
                    className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="Interesado en propiedades en la Costa del Sol..."
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
                            <span>Procesando...</span>
                        </div>
                        <span className="text-xs font-normal mt-1 text-gold-100 opacity-90 animate-pulse">{loadingText}</span>
                    </div>
                ) : (
                    <>Enviar Solicitud <Send size={18} className="ml-2" /></>
                )}
            </button>


        </form>
    );
}
