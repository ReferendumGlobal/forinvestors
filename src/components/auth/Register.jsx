import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { Shield, User, Building, Loader2, ArrowRight, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const preFilledData = location.state || {};

    const [email, setEmail] = useState(preFilledData.email || '');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(preFilledData.fullName || preFilledData.name || '');
    const [companyName, setCompanyName] = useState(preFilledData.companyName || '');
    const [phone, setPhone] = useState(preFilledData.phone || '');

    // New Fields
    const [entityType, setEntityType] = useState('individual'); // 'individual' or 'company'
    const [legalRepresentative, setLegalRepresentative] = useState('');
    const [idFile, setIdFile] = useState(null);
    const [dossierLink, setDossierLink] = useState(preFilledData.dossierLink || ''); // Google Drive link
    const [vatPercentage, setVatPercentage] = useState(''); // New VAT field
    const [companyNif, setCompanyNif] = useState(preFilledData.companyNif || '');

    // Default to investor if not specified, but check params or pre-filled role
    const typeParam = searchParams.get('type');
    const [role, setRole] = useState(typeParam || preFilledData.role || 'investor'); // 'investor', 'seller', 'agency'

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Update role if URL param changes
    useEffect(() => {
        if (typeParam === 'agency' || typeParam === 'investor' || typeParam === 'seller') {
            setRole(typeParam);
        }
    }, [typeParam]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let idDocumentUrl = null;

            // 1. Upload ID Document if present
            if (idFile) {
                const fileExt = idFile.name.split('.').pop();
                const fileName = `id_docs/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('documents')
                    .upload(fileName, idFile);

                if (uploadError) throw new Error("Error uploading ID document: " + uploadError.message);

                // Get Public URL (or keep private and use signed URLs for admin... assuming public for MVP/Demo ease or bucket triggers)
                // Better to use private, but for now let's assume the bucket is private and we store the path
                const { data: publicUrlData } = supabase.storage
                    .from('documents')
                    .getPublicUrl(fileName);
                idDocumentUrl = publicUrlData.publicUrl;
            }

            // 2. Sign Up Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                        phone: phone,
                        company_name: entityType === 'company' || role === 'agency' ? companyName : null,
                        company_nif: companyNif,
                        entity_type: entityType,
                        vat_percentage: vatPercentage,
                        legal_representative: legalRepresentative,
                        id_document_url: idDocumentUrl,
                        dossier_link: dossierLink,
                        status: 'pending', // Default status for new advanced flow
                        onboarding_message: preFilledData.message || ''
                    }
                }
            });

            if (authError) throw authError;

            // 3. Success -> Redirect
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-midnight-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center mb-6">
                    <Shield className="h-12 w-12 text-gold-500" />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Solicitud de Acceso
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Únase a Urbina Agency como {role === 'agency' ? 'Agencia Partner' : role === 'seller' ? 'Propietario / Vendedor' : 'Inversor Cualificado'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-midnight-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10"
                >
                    {/* Role Toggles */}
                    <div className="flex rounded-md bg-midnight-950 p-1 mb-6 border border-white/5">
                        <button
                            type="button"
                            onClick={() => setRole('investor')}
                            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${role === 'investor'
                                ? 'bg-gold-600 text-white shadow'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <User size={16} className="mr-2" /> Inversor
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('seller')}
                            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${role === 'seller'
                                ? 'bg-gold-600 text-white shadow'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <User size={16} className="mr-2" /> Vendedor
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('agency')}
                            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${role === 'agency'
                                ? 'bg-gold-600 text-white shadow'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Building size={16} className="mr-2" /> Agencia
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        {/* Entity Type Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Entidad</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="entityType"
                                        value="individual"
                                        checked={entityType === 'individual'}
                                        onChange={() => setEntityType('individual')}
                                        className="form-radio text-gold-600 focus:ring-gold-500 bg-midnight-950 border-white/10"
                                    />
                                    <span className="ml-2 text-gray-300">Persona Física</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="entityType"
                                        value="company"
                                        checked={entityType === 'company'}
                                        onChange={() => setEntityType('company')}
                                        className="form-radio text-gold-600 focus:ring-gold-500 bg-midnight-950 border-white/10"
                                    />
                                    <span className="ml-2 text-gray-300">Empresa</span>
                                </label>
                            </div>
                        </div>

                        {/* Company Name (Conditional) */}
                        {(entityType === 'company' || role === 'agency') && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <label className="block text-sm font-medium text-gray-300">Nombre de la Empresa / Agencia</label>
                                <input
                                    type="text"
                                    required
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                                />
                            </motion.div>
                        )}

                        {/* Legal Representative */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Representante Legal</label>
                            <input
                                type="text"
                                required
                                value={legalRepresentative}
                                onChange={(e) => setLegalRepresentative(e.target.value)}
                                className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                            />
                        </div>

                        {/* ID Document Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gold-400 mb-2 flex items-center gap-2">
                                DNI / Pasaporte del Representante <AlertCircle size={14} />
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg bg-midnight-950 hover:bg-midnight-900 transition-colors group cursor-pointer relative">
                                <input
                                    type="file"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setIdFile(e.target.files[0])}
                                    accept=".pdf,.jpg,.png"
                                />
                                <div className="space-y-1 text-center">
                                    {idFile ? (
                                        <div className="flex flex-col items-center">
                                            <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                                            <p className="text-sm text-gray-300 mt-2">{idFile.name}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                            <div className="flex text-sm text-gray-400 justify-center">
                                                <span className="font-medium text-gold-400">Subir Documento</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Dossier Link (For Sellers/Agencies) */}
                        {(role === 'seller' || role === 'agency') && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <label className="block text-sm font-medium text-gold-400 flex items-center gap-2">
                                    Enlace a Fotos/Dossier (Google Drive/Dropbox) <AlertCircle size={14} />
                                </label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://drive.google.com/..."
                                    value={dossierLink}
                                    onChange={(e) => setDossierLink(e.target.value)}
                                    className="mt-1 bg-midnight-950 block w-full pl-3 pr-3 py-3 border border-white/10 rounded-md leading-5 text-white placeholder-gray-500 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Requerido: +15 fotos o vídeo tour para validación.</p>
                            </motion.div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <span className="flex items-center">
                                        Crear Cuenta <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm font-medium text-gold-500 hover:text-gold-400">
                            ¿Ya tiene cuenta? Iniciar Sesión
                        </Link>
                    </div>
                </motion.div>
            </div >
        </div >
    );
}
