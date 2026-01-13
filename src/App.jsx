import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';
import { categories } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';
import { HashRouter, Routes, Route, Navigate, useLocation, useParams, Outlet, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import PropertySearch from './components/PropertySearch';
import Agencies from './components/Agencies';
import { useTranslation } from 'react-i18next';
import './i18n';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import SeoHead from './components/SeoHead';

function CategoryPage({ categoryId }) {
  const currentCategory = categories[categoryId];
  const { t } = useTranslation();
  // Get features as array. t returns object/array if returnObjects: true
  const features = t(`categories.${categoryId}.features`, { returnObjects: true });

  return (
    <motion.div
      key={categoryId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <SeoHead
        title={`${t(`categories.${categoryId}.title`)} | Urbina Agency`}
        description={t(`categories.${categoryId}.description`)}
      />
      <div className="relative min-h-[60vh] h-auto flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={currentCategory.image}
            alt={t(`categories.${categoryId}.title`)}
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <currentCategory.icon size={32} className="text-gold-400" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {t(`categories.${categoryId}.title`)}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t(`categories.${categoryId}.description`)}
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="px-8 py-4 bg-gold-600/10 border border-gold-500/30 rounded-xl backdrop-blur-md">
              <span className="block text-sm text-gold-400 uppercase tracking-widest mb-1">
                {t('categories.investments.title') === 'Inversiones Inmobiliarias' ? 'Inversión Desde' : 'Investment From'}
              </span>
              <span className="text-2xl md:text-3xl font-serif text-white">{t(`categories.${categoryId}.priceRange`)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-serif text-white mb-6 border-l-4 border-gold-500 pl-6">
              {t(`categories.${categoryId}.title`)}
            </h3>
            <div className="prose prose-lg prose-invert text-gray-400">
              <p className="leading-relaxed">
                {t(`categories.${categoryId}.longDescription`)}
              </p>
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gold-400 font-medium italic">
                "{t(`categories.${categoryId}.details`)}"
              </p>
            </div>
          </div>

          <div className="bg-midnight-900/50 p-8 rounded-2xl border border-white/5">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="text-gold-500" />
              {t('categories.investments.title') === 'Inversiones Inmobiliarias' ? 'Características Clave' : 'Key Features'}
            </h4>
            <ul className="space-y-4">
              {Array.isArray(features) && features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-midnight-900"></div>
                  ))}
                </div>
                <button className="text-sm text-gold-400 hover:text-white transition-colors font-medium">
                  {t('categories.investments.title') === 'Inversiones Inmobiliarias' ? 'Contactar Agente' : 'Contact Agent'} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LanguageWrapper() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const validLangs = ['es', 'en', 'zh', 'ru', 'ar', 'de', 'fr', 'pt', 'ja', 'hi'];

    // Safety check: specific protected routes should not be handled as langs
    if (lang === 'dashboard' || lang === 'admin') return;

    if (validLangs.includes(lang)) {
      i18n.changeLanguage(lang);
      // Handle RTL for Arabic
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } else {
      // Invalid lang, redirect to default (es)
      // We can't easily redirect here inside the render as it might cause loops if not careful,
      // but the route matching /:lang *should* catch it.
      navigate('/es', { replace: true });
    }
  }, [lang, i18n, navigate]);

  return (
    <div className="bg-midnight-950 min-h-screen flex flex-col font-sans text-white selection:bg-gold-500/30 selection:text-white">
      <Navbar categories={categories} />
      <main className="pt-0 relative">
        <Outlet />
      </main>

      {/* Global Contact Section with POF Explanation */}
      <section id="contact" className="py-20 bg-midnight-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              {t('contact_global.title', 'Solicitud de Acceso & Prueba de Fondos')}
            </h2>
            <div className="bg-gold-500/10 border border-gold-500/30 p-6 rounded-xl max-w-3xl mx-auto backdrop-blur-sm">
              <p className="text-gold-400 text-lg font-light leading-relaxed">
                {t('contact_global.explanation')}
              </p>
            </div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              {t('contact_global.subtitle', 'Complete el siguiente formulario y adjunte su POF para recibir el dossier detallado.')}
            </p>
          </div>
          <ContactForm categoryName="Global Footer Request" />
        </div>
      </section>

      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ContractSign from './components/dashboard/ContractSign';
import AdminPanel from './components/dashboard/AdminPanel';
import PropertyManager from './components/dashboard/PropertyManager';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Auth & Dashboard Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="contracts" element={<ContractSign />} />
              <Route path="admin" element={<AdminPanel />} />
              <Route path="users" element={<AdminPanel />} /> {/* Redirect users nav to Admin Panel */}
              <Route path="properties" element={<PropertyManager />} />
            </Route>

            {/* Public Website Routes */}
            <Route path="/:lang" element={<LanguageWrapper />}>
              <Route index element={<Home />} />
              <Route path="inversiones" element={<CategoryPage categoryId="investments" />} />
              <Route path="hoteles" element={<CategoryPage categoryId="hotels" />} />
              <Route path="terrenos" element={<CategoryPage categoryId="land" />} />
              <Route path="lujo" element={<CategoryPage categoryId="luxury" />} />
              <Route path="bodegas" element={<CategoryPage categoryId="wineries" />} />
              <Route path="blog" element={<Blog />} />
              <Route path="agencias" element={<Agencies />} />
              <Route path="search" element={<PropertySearch />} />
            </Route>
            <Route path="/" element={<Navigate to="/es" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
