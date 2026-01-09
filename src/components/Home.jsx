import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Key, FileText } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Office vibe"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-950/80 to-midnight-950"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block p-3 mb-6 border border-gold-500/30 rounded-full bg-gold-500/10 backdrop-blur-md">
                            <Shield className="w-8 h-8 text-gold-500" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                            El Arte de la <span className="text-gold-400">Discreción</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-12"
                    >
                        "Nuestros clientes nos entregan secretos valiosos en forma de inversiones. Nosotros les devolvemos negocios exitosos de contenido clasificado, que solo se desclasifica en forma de titulares de prensa celebrando su éxito."
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/hoteles"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1"
                        >
                            Acceder al Portafolio <ChevronRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Legacy Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500/50"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gold-500/5 rounded-2xl transform rotate-3"></div>
                        <div className="relative bg-midnight-900 border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-2xl font-serif text-gold-400 mb-6">Un Legado de Honor</h3>
                            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                                <p>
                                    La tradición de Urbina Agency no nace en los mercados, sino en el honor y el servicio. Nuestro ADN proviene de <strong>Francisco y Angelita Urbina</strong>, mis abuelos, quienes cimentaron los valores de familia y palabra.
                                </p>
                                <p>
                                    Y de mi bisabuelo, <strong>José María Urbina</strong>, alto cargo militar y miembro de la <strong>CIA</strong>. De él aprendimos que la información más valiosa es la que se protege, y que el éxito de una misión depende de la precisión y el silencio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-900/20 rounded-xl flex items-center justify-center border border-gold-500/20">
                                <Key className="w-6 h-6 text-gold-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Secretos Valiosos</h4>
                                <p className="text-gray-400">Tratamos cada intención de inversión como información clasificada de alto nivel. Su identidad y sus objetivos están blindados.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-900/20 rounded-xl flex items-center justify-center border border-gold-500/20">
                                <FileText className="w-6 h-6 text-gold-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Éxito Desclasificado</h4>
                                <p className="text-gray-400">El único rastro que dejamos es el éxito. Transformamos estrategias privadas en resultados públicos que hablan por sí mismos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
