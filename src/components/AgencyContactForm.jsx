import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AgencyContactForm() {
    const [formState, setFormState] = useState({
        agencyName: '',
        taxId: '',
        contactPerson: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        propertiesCount: '',
        priceRangeFrom: '',
        priceRangeTo: '',
        propertyTypes: [],
        message: '',
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState('Iniciando transmisión segura...');

    const propertyTypeOptions = [
        "Hoteles",
        "Suelo para construir",
        "Fincas",
        "Bodegas",
        "Explotaciones Agrícolas",
        "Ganaderas",
        "Edificios",
        "Propiedades de Lujo"
    ];

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormState({ ...formState, file: e.target.files[0] });
        }
    };

    const handleCheckboxChange = (type) => {
        if (formState.propertyTypes.includes(type)) {
            setFormState({ ...formState, propertyTypes: formState.propertyTypes.filter(t => t !== type) });
        } else {
            setFormState({ ...formState, propertyTypes: [...formState.propertyTypes, type] });
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const messages = [
                "Encriptando documentos...",
                "Subiendo Cartera a servidor seguro...",
                "Verificando integridad del envío...",
                "Finalizando transmisión..."
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
        formData.append('agencyName', formState.agencyName);
        formData.append('taxId', formState.taxId);
        formData.append('contactPerson', formState.contactPerson);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('location', `${formState.city}, ${formState.country}`);
        formData.append('propertiesCount', formState.propertiesCount);
        formData.append('priceRange', `${formState.priceRangeFrom} - ${formState.priceRangeTo}`);
        formData.append('propertyTypes', formState.propertyTypes.join(', '));
        formData.append('message', formState.message);
        formData.append('_subject', `Nueva Solicitud de AGENCIA: ${formState.city}`);
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
                    contactPerson: '',
                    email: '',
                    phone: '',
                    city: '',
                    country: '',
                    propertiesCount: '',
                    priceRangeFrom: '',
                    priceRangeTo: '',
                    propertyTypes: [],
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
                <h3 className="text-2xl font-serif text-white mb-2">Solicitud de Colaboración Enviada</h3>
                <p className="text-gray-400">Hemos recibido su solicitud. Nuestro equipo legal le enviará el contrato de colaboración para activar su acceso.</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre de Agencia</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.agencyName}
                        onChange={(e) => setFormState({ ...formState, agencyName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">NIF / CIF / Tax ID</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.taxId}
                        onChange={(e) => setFormState({ ...formState, taxId: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Persona de Contacto</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.contactPerson}
                        onChange={(e) => setFormState({ ...formState, contactPerson: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Profesional</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
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
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nº Propiedades en Exclusiva</label>
                    <input
                        type="number"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.propertiesCount}
                        onChange={(e) => setFormState({ ...formState, propertiesCount: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ciudad</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.city}
                        onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">País</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.country}
                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Rango de Precios (€)</label>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Desde"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.priceRangeFrom}
                        onChange={(e) => setFormState({ ...formState, priceRangeFrom: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Hasta"
                        className="w-full bg-midnight-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        value={formState.priceRangeTo}
                        onChange={(e) => setFormState({ ...formState, priceRangeTo: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tipos de Propiedad en Cartera</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypeOptions.map((type) => (
                        <label key={type} className="flex items-center space-x-2 bg-midnight-900/50 p-3 rounded-lg border border-white/5 cursor-pointer hover:border-gold-500/30 transition-colors">
                            <input
                                type="checkbox"
                                checked={formState.propertyTypes.includes(type)}
                                onChange={() => handleCheckboxChange(type)}
                                className="form-checkbox h-4 w-4 text-gold-500 rounded border-gray-600 bg-midnight-950 focus:ring-gold-500"
                            />
                            <span className="text-sm text-gray-300">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                    Dossier Corporativo / Ejemplo de Cartera <AlertCircle size={14} />
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
                                <p className="text-xs text-gray-500">Archivo listo</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-gold-400">Subir archivo</span>
                                    <p className="pl-1">o arrastrar</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, hasta 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <Loader2 className="mr-2 animate-spin" size={20} />
                            <span>Procesando solicitud...</span>
                        </div>
                        <span className="text-xs font-normal mt-1 text-gold-100 opacity-90 animate-pulse">{loadingText}</span>
                    </div>
                ) : (
                    <>Solicitar Colaboración <Send size={18} className="ml-2" /></>
                )}
            </button>
        </form>
    );
}
