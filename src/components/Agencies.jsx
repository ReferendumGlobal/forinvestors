import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, PieChart, Building2, Lock, ArrowRight } from 'lucide-react';
import SeoHead from './SeoHead';
import { useTranslation } from 'react-i18next';
import AgencyContactForm from './AgencyContactForm';

export default function Agencies() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-midnight-950 pt-32 pb-20">
            <SeoHead title={`${t('nav.agencies')} | Urbina Agency`} description="Colaboramos con agencias que tienen activos singulares. Únete a la Alianza Global." routeKey="agencies" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block p-3 mb-6 rounded-full bg-gold-500/10 border border-gold-500/30"
                    >
                        <Handshake className="text-gold-500 w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-sans font-bold text-white mb-6"
                    >
                        Alianza Global para Agencias
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
                    >
                        Únase a la mayor red mundial de agencias independientes. Centralizamos la demanda de grandes capitales.
                    </motion.p>

                    {/* User Access Button placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="flex justify-center"
                    >
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-gold-500/50 text-gold-400 px-8 py-3 rounded-full font-medium transition-all backdrop-blur-sm group">
                            <Lock size={18} />
                            Acceso Partners (Agencias e Inversores)
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-3">* Acceso restringido. Requiere activación manual tras firma de contrato.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Value Props */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-2xl font-serif text-gold-500 mb-4">Modelo de Colaboración</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                No somos un portal, somos una **Alianza**. Firmamos un acuerdo de colaboración que protege su mandato y garantiza un reparto justo de comisiones (50/50) en cada operación cerrada conjuntamente.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed mt-4">
                                Una vez firmado el contrato, se le dará acceso a nuestra plataforma privada donde podrá:
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                                <li>Subir su cartera de inmuebles exclusivos visibles solo para inversores verificados.</li>
                                <li>Recibir solicitudes automatizadas de inversores que coincidan con sus activos.</li>
                                <li>Acceder a nuestra lista de "Buscados" (Wanted) por Gran Capital.</li>
                            </ul>
                        </div>

                        <div className="grid gap-6">
                            <div className="flex gap-4 p-4 bg-midnight-900/50 rounded-xl border border-white/5">
                                <Users className="text-gold-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">Demanda Verificada</h4>
                                    <p className="text-gray-400 text-sm">Le aportamos compradores que ya han pasado la Prueba de Fondos (POF).</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-midnight-900/50 rounded-xl border border-white/5">
                                <Building2 className="text-gold-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white">Exposición Global</h4>
                                    <p className="text-gray-400 text-sm">Sus activos locales viajarán directamente a despachos en Dubái, Nueva York y Londres.</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* New Agency Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-midnight-800/80 backdrop-blur-md rounded-2xl border border-gold-500/20 p-1">
                            <div className="bg-midnight-950/50 rounded-xl p-6 md:p-8">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white">Solicitar Acceso a la Alianza</h3>
                                    <p className="text-gray-400 text-sm mt-1">Complete el perfil para recibir el contrato de colaboración.</p>
                                </div>
                                <AgencyContactForm explanation="Introduzca los datos de su agencia para verificar su elegibilidad. Nos pondremos en contacto para formalizar el mandato de venta compartido." />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
