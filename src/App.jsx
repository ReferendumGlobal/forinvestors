import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';
import { categories } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, Outlet, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import PropertySearch from './components/PropertySearch';
import Agencies from './components/Agencies';
import ProcessSteps from './components/ProcessSteps';
import CategoryPage from './components/CategoryPage';
import { useTranslation } from 'react-i18next';
import './i18n';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import SeoHead from './components/SeoHead';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ContractSign from './components/dashboard/ContractSign';
import AdminPanel from './components/dashboard/AdminPanel';
import PropertyManager from './components/dashboard/PropertyManager';

// CategoryPage imported from components

function LanguageWrapper() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const showGlobalContact = !location.pathname.includes('/agencias') && !location.pathname.includes('/agencies');

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
      {showGlobalContact && (
        <>
          <ProcessSteps variant="investors" />
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
        </>
      )}

      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
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
              <Route path="investments" element={<CategoryPage categoryId="investments" />} />
              <Route path="hotels" element={<CategoryPage categoryId="hotels" />} />
              <Route path="land" element={<CategoryPage categoryId="land" />} />
              <Route path="luxury" element={<CategoryPage categoryId="luxury" />} />
              <Route path="wineries" element={<CategoryPage categoryId="wineries" />} />
              <Route path="blog" element={<Blog />} />
              <Route path="agencias" element={<Agencies />} />
              <Route path="search" element={<PropertySearch />} />
              <Route path="*" element={<Navigate to="." replace />} />
            </Route>
            <Route path="/" element={<Navigate to="/es" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
