import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { categories } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('hotels'); // Default to first category

  const currentCategory = categories[activeTab];

  return (
    <div className="min-h-screen bg-midnight-950 text-gray-200 selection:bg-gold-500/30">
      <Navbar categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Section for Category */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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
                    <span className="block text-sm text-gold-400 uppercase tracking-widest mb-1">Investments From</span>
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
                    <h3 className="text-xl font-serif text-white mb-3">Legal Security</h3>
                    <p className="text-gray-400">Complete legal audit (Due Diligence) available for every asset in the portfolio.</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-midnight-800 border border-white/5">
                    <TrendingUp className="h-10 w-10 text-gold-500 mb-6" />
                    <h3 className="text-xl font-serif text-white mb-3">High Profitability</h3>
                    <p className="text-gray-400">We select assets with high appreciation potential and yields superior to the market average.</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-midnight-800 border border-white/5">
                    <Handshake className="h-10 w-10 text-gold-500 mb-6" />
                    <h3 className="text-xl font-serif text-white mb-3">Direct Deal</h3>
                    <p className="text-gray-400">Personal management with owners and direct mandates, without chains of intermediaries.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content & Form Section */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Investment Dossier Access</h2>
                  <div className="space-y-6 text-lg text-gray-400">
                    <p>
                      Due to the confidential nature of our {activeTab === 'developers' ? 'off-market ' : ''}assets, as well as the exclusivity of our sales mandates, we require a prior verification process.
                    </p>
                    <p className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                      <span>We only provide detailed information (exact location, financial metrics, appraisals) to qualified investors.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                      <span>It is <strong>essential</strong> to provide Proof of Funds (POF) or a Bank Letter of Intent for the value of the asset of interest.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0 text-gold-500 mt-1" />
                      <span>Once your solvency is validated, you will receive the full dossier and we will organize a private viewing.</span>
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-gold-900/10 border border-gold-500/20 rounded-xl">
                    <h4 className="text-gold-400 font-bold mb-2">Important Notice</h4>
                    <p className="text-sm text-gold-100/80">
                      Our portfolio includes assets with value up to the figure accredited in your proof of funds. We take the privacy of our sellers and buyers very seriously.
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
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
