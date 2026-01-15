import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer() {
    const [legalModalOpen, setLegalModalOpen] = useState(false);
    const [legalSection, setLegalSection] = useState('terms');

    const openLegal = (section) => {
        setLegalSection(section);
        setLegalModalOpen(true);
    };

    return (
        <>
            <footer className="bg-midnight-950 border-t border-white/10 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-white mb-4">PARA INVERSORES</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Especialistas en la gestión de activos inmobiliarios de alto valor. Conectamos capital privado con oportunidades de inversión exclusivas en España, Europa y en todo el mundo.
                            </p>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                                Operado por Big Investors
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-serif font-bold text-gold-400 mb-4">Contacto Corporativo</h3>
                            <ul className="space-y-4">

                                <li className="flex items-start text-gray-400">
                                    <MapPin className="flex-shrink-0 h-5 w-5 text-gold-500 mr-3 mt-1" />
                                    <span className="text-sm leading-relaxed">
                                        7345 W SAND LAKE RD STE 210<br />
                                        OFFICE 7997<br />
                                        ORLANDO, FL, 32819<br />
                                        UNITED STATES
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-serif font-bold text-gold-400 mb-4">Legal</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li><button onClick={() => openLegal('terms')} className="hover:text-white transition-colors text-left">Términos y Condiciones</button></li>
                                <li><button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors text-left">Política de Privacidad</button></li>
                                <li><button onClick={() => openLegal('disclaimer')} className="hover:text-white transition-colors text-left">Aviso Legal</button></li>
                                <li className="pt-2 text-xs text-gray-600">EIN: 61-2276664</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            &copy; {new Date().getFullYear()} Big Investors. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full text-gold-400 hover:text-white hover:bg-gold-500 transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full text-gold-400 hover:text-white hover:bg-gold-500 transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full text-gold-400 hover:text-white hover:bg-gold-500 transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer >

            <LegalModal
                isOpen={legalModalOpen}
                onClose={() => setLegalModalOpen(false)}
                section={legalSection}
            />
        </>
    );
}
