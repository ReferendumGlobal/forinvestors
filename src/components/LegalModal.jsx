import React from 'react';
import { X, FileText, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose, section }) {
    if (!isOpen) return null;

    const content = {
        terms: {
            title: "Términos y Condiciones",
            icon: FileText,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p><strong>1. Identificación de la Empresa</strong></p>
                    <p>Este sitio web es propiedad y está operado por <strong>Urbina Agency LLC</strong>, con número de identificación fiscal (EIN) <strong>61-2276664</strong>. Nuestra dirección registrada es: <strong>7345 W SAND LAKE RD STE 210 OFFICE 7997 ORLANDO, FL, 32819 - UNITED STATES</strong>.</p>

                    <p><strong>2. Uso del Sitio</strong></p>
                    <p>El acceso a nuestra cartera de inversiones está reservado exclusivamente para inversores cualificados. La información contenida en este sitio web es de carácter confidencial.</p>
                </div>
            )
        },
        privacy: {
            title: "Política de Privacidad",
            icon: Shield,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p>En <strong>Urbina Agency LLC</strong>, nos comprometemos a proteger su privacidad.</p>
                    <p>La información personal y financiera que nos proporcione, incluyendo documentos de Prueba de Fondos (POF), será tratada con la más estricta confidencialidad y utilizada únicamente para verificar su solvencia y presentarle oportunidades de inversión adecuadas.</p>
                    <p>No compartimos sus datos con terceros sin su consentimiento explícito, salvo cuando sea estrictamente necesario para la formalización de una operación inmobiliaria.</p>
                </div>
            )
        },
        disclaimer: {
            title: "Aviso Legal y Descargo de Responsabilidad",
            icon: AlertTriangle,
            text: (
                <div className="space-y-4 text-gray-300">
                    <p>La información presentada en este sitio web tiene fines informativos y no constituye una oferta vinculante de venta ni asesoramiento financiero.</p>
                    <p>Todas las inversiones inmobiliarias conllevan riesgos. Los precios y la disponibilidad de los activos están sujetos a cambios sin previo aviso. Recomendamos encarecidamente realizar una Due Diligence legal y financiera independiente antes de cualquier transacción.</p>
                    <p><strong>Urbina Agency LLC</strong> actúa como intermediario y facilitador, no como asesor financiero regulado.</p>
                </div>
            )
        }
    };

    const currentContent = content[section] || content.terms;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-midnight-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-midnight-900 border border-gold-500/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl"
                >
                    <div className="sticky top-0 bg-midnight-900/95 backdrop-blur border-b border-white/5 p-6 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <currentContent.icon className="text-gold-500" size={24} />
                            <h2 className="text-xl font-serif font-bold text-white">{currentContent.title}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        {currentContent.text}

                        <div className="mt-8 pt-6 border-t border-white/5 text-xs text-gray-500 text-center">
                            © {new Date().getFullYear()} Urbina Agency LLC. Todos los derechos reservados.
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
