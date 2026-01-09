import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Home from './components/Home';
import { categories } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function CategoryPage({ categoryId }) {
  const currentCategory = categories[categoryId];

  return (
    <motion.div
      key={categoryId} // Key ensures remount/animation on change
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {/* Padding top is handled by main container, but we need extra spacing because of fixed navbar overlap on inner pages if not careful. 
            However, Home handles its own hero. Category page needs the hero top spacing. 
            The Navbar is fixed h-20. The Hero is 60vh. 
        */}

      {/* Hero Section for Category */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={currentCategory.image}
            alt={currentCategory.title}
            className="w-full h-full object-cover opacity-40 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <currentCategory.icon size={32} className="text-gold-400" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {currentCategory.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="px-8 py-4 bg-gold-600/10 border border-gold-500/30 rounded-xl backdrop-blur-md">
              <span className="block text-sm text-gold-400 uppercase tracking-widest mb-1">Inversión Desde</span>
              <span className="text-2xl md:text-3xl font-serif text-white">{currentCategory.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Grid */}
      <div className="py-20 bg-midnight-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-midnight-800 border border-white/5">
              <ShieldCheck className="h-10 w-10 text-gold-500 mb-6" />
              <h3 className="text-xl font-serif text-white mb-3">Seguridad Jurídica</h3>
              <p className="text-gray-400">Auditoría legal completa (Due Diligence) disponible para cada activo en cartera.</p>
            </div>
            <div className="p-8 rounded-2xl bg-midnight-800 border border-white/5">
              <TrendingUp className="h-10 w-10 text-gold-500 mb-6" />
              <h3 className="text-xl font-serif text-white mb-3">Alta Rentabilidad</h3>
              <p className="text-gray-400">Seleccionamos activos con potencial de revalorización y yields superiores a la media del mercado.</p>
            </div>
            <div className="p-8 rounded-2xl bg-midnight-800 border border-white/5">
              <Handshake className="h-10 w-10 text-gold-500 mb-6" />
              <h3 className="text-xl font-serif text-white mb-3">Trato Directo</h3>
              <p className="text-gray-400">Gestión personal con la propiedad y mandatos directos, sin cadenas de intermediarios.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Form Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Acceso al Dossier de Inversión</h2>
            <div className="space-y-6 text-lg text-gray-400">
              <p>
                Debido a la naturaleza confidencial de nuestros activos {categoryId === 'developers' ? 'off-market ' : ''}, así como la exclusividad de nuestros mandatos de venta, requerimos un proceso de verificación previo.
              </p>
              <p className="flex items-start gap-3">
                <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                <span>Solo facilitamos información detallada (ubicación exacta, métricas financieras, tasaciones) a inversores cualificados.</span>
              </p>
              <p className="flex items-start gap-3">
                <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                <span>Es <strong>imprescindible</strong> aportar Prueba de Fondos (POF) o Carta de Intención Bancaria por el valor del activo de interés.</span>
              </p>
              <p className="flex items-start gap-3">
                <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                <span>Una vez validada su solvencia, recibirá el dossier completo y organizaremos una visita privada.</span>
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold-900/10 border border-gold-500/20 rounded-xl">
              <h4 className="text-gold-400 font-bold mb-2">Aviso Importante</h4>
              <p className="text-sm text-gold-100/80">
                Nuestra cartera incluye activos con valor hasta la cifra acreditada en su prueba de fondos. Nos tomamos muy en serio la privacidad de nuestros vendedores y compradores.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl blur opacity-20"></div>
            <ContactForm categoryName={currentCategory.title} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-midnight-950 text-gray-200 selection:bg-gold-500/30">
      <Navbar categories={categories} />

      <main className="pt-0 relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/hoteles" element={<CategoryPage categoryId="hoteles" />} />
            <Route path="/terrenos" element={<CategoryPage categoryId="terrenos" />} />
            <Route path="/promotores" element={<CategoryPage categoryId="promotores" />} />
            <Route path="/lujo" element={<CategoryPage categoryId="lujo" />} />
            <Route path="/bodegas" element={<CategoryPage categoryId="bodegas" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
