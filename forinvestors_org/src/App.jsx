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
import { useTranslation } from 'react-i18next';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';
import SeoHead from './components/SeoHead';
import { routeConfig, getCategoryFromSlug } from './routes';

function CategoryPage() {
  const { lang, slug } = useParams();
  const { t } = useTranslation();

  // Resolve categoryId from slug + lang
  const categoryId = getCategoryFromSlug(slug, lang);
  const currentCategory = categories[categoryId];

  // If no category resolved (invalid slug), return null or redirect
  // Ideally should be handled by a NotFound component or parent
  if (!currentCategory) return <Navigate to={`/${lang}`} replace />;

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
        routeKey={categoryId} // Pass categoryId for Hreflang generation
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
                {t('categories.inversiones.title') === 'Real Estate Investments' ? 'Investment From' : 'Inversión Desde'}
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
              {t('categories.inversiones.title') === 'Real Estate Investments' ? 'Key Features' : 'Características Clave'}
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
                  {t('categories.inversiones.title') === 'Real Estate Investments' ? 'Contact Agent' : 'Contactar Agente'} →
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
  const { lang, slug } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path matches any localized 'agencies' slug
  const agencySlugs = Object.values(routeConfig).map(config => config.agencies);
  const isAgencyPage = agencySlugs.some(slug => location.pathname.includes(`/${slug}`));

  const showGlobalContact = !isAgencyPage;

  useEffect(() => {
    const validLangs = ['es', 'en', 'zh', 'ru', 'ar', 'de', 'fr', 'pt', 'ja', 'hi'];

    // Safety check: specific protected routes should not be handled as langs
    if (lang === 'dashboard' || lang === 'admin') return;

    if (validLangs.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } else {
      navigate('/en', { replace: true });
    }
  }, [lang, i18n, navigate]);

  return (
    <div className="min-h-screen bg-midnight-950 text-gray-200 selection:bg-gold-500/30">
      <Navbar categories={categories} />
      <main className="pt-0 relative">
        <Outlet />
      </main>

      {/* Global Contact Section with POF Explanation */}
      {/* Global Contact Section with POF Explanation - Hidden on Agency Page */}
      {showGlobalContact && (
        <section id="contact" className="py-20 bg-midnight-900 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                {t('contact_global.title', 'Access Request & Proof of Funds')}
              </h2>
              <div className="bg-gold-500/10 border border-gold-500/30 p-6 rounded-xl max-w-3xl mx-auto backdrop-blur-sm">
                <p className="text-gold-400 text-lg font-light leading-relaxed">
                  {t('contact_global.explanation')}
                </p>
              </div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                {t('contact_global.subtitle', 'Complete the form below and attach your POF to receive the detailed dossier.')}
              </p>
            </div>
            <ContactForm categoryName="Global Footer Request" />
          </div>
        </section>
      )}

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
  // We need to render routes for all languages dynamically to support the localized slugs
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
              <Route path="users" element={<AdminPanel />} />
              <Route path="properties" element={<PropertyManager />} />
            </Route>

            {/* Public Website Routes */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route path="/:lang" element={<LanguageWrapper />}>
              <Route index element={<Home />} />
              {/* 
                    Dynamic Route Matching:
                    Because slug is specialized per language, we use a catch-all specific path parameter.
                    However, to avoid conflict, we can't just put `/:slug`. 
                    But the requirement is domain.com/:lang/:slug
                */}
              <Route path=":slug" element={<DynamicRouteHandler />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

// Intermediary component to route to the correct Page Component based on the slug
function DynamicRouteHandler() {
  const { lang, slug } = useParams();

  // Check if slug maps to a Category
  const categoryId = getCategoryFromSlug(slug, lang);
  if (categoryId) {
    return <CategoryPage />;
  }

  // Check fixed pages (Blog, Search, Agencies)
  const fixedRoutes = routeConfig[lang] || routeConfig['en'];
  if (slug === fixedRoutes.blog) return <Blog />;
  if (slug === fixedRoutes.search) return <PropertySearch />;
  if (slug === fixedRoutes.agencies) return <Agencies />;

  // fallback to home or 404
  return <Navigate to={`/${lang}`} replace />;
}

export default App;
