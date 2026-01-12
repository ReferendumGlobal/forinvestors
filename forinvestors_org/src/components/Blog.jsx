import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SeoHead from './SeoHead';
import { useTranslation } from 'react-i18next';

export default function Blog() {
    const { t } = useTranslation();

    if (!blogPosts || blogPosts.length === 0) return (
        <div className="min-h-screen pt-32 pb-20 bg-midnight-950 text-center text-white">
            <SeoHead title={`${t('nav.blog')} | Urbina Agency`} description={t('search.subtitle')} routeKey="blog" />
            <h1 className="text-2xl">Coming Soon</h1>
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 bg-midnight-950">
            <SeoHead title={`${t('nav.blog')} | Urbina Agency`} description={t('search.subtitle')} routeKey="blog" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6">Market Insights</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        In-depth analysis of market trends, off-market opportunities, and global investment strategies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-midnight-900 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all hover:-translate-y-1 shadow-lg hover:shadow-gold-500/10 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100 invert-[.05]"
                                />
                                <div className="absolute top-4 right-4 bg-midnight-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gold-400 font-medium">
                                    Analysis
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-sans font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <button className="inline-flex items-center text-gold-500 font-medium text-sm hover:gap-2 transition-all">
                                    Read full article <ArrowRight size={16} className="ml-1" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
