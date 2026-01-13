import React from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../data';
import SeoHead from './SeoHead';

const CategoryPage = ({ categoryId }) => {
    const { t } = useTranslation();
    const currentCategory = categories[categoryId];

    if (!currentCategory) return null;

    const featuresData = t(`categories.${categoryId}.features`, { returnObjects: true });
    const features = Array.isArray(featuresData) ? featuresData : [];

    return (
        <>
            <SeoHead
                title={t(`categories.${categoryId}.title`)}
                description={t(`categories.${categoryId}.description`)}
            />
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={currentCategory.image}
                        alt={t(`categories.${categoryId}.title`)}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-900/60" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="w-16 h-16 mx-auto bg-gold-500 rounded-full flex items-center justify-center mb-6 text-navy-900">
                        <currentCategory.icon size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        {t(`categories.${categoryId}.title`)}
                    </h1>
                    <p className="text-xl text-gray-200">
                        {t(`categories.${categoryId}.description`)}
                    </p>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-20 bg-navy-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-6">
                                {t(`categories.${categoryId}.shortTitle`)}
                            </h2>
                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                {t(`categories.${categoryId}.longDescription`)}
                            </p>
                            <div className="bg-navy-800 p-6 rounded-lg border border-gold-500/20">
                                <p className="text-gold-500 font-semibold mb-2">
                                    {t('forms.labels.priceRange')}
                                </p>
                                <p className="text-2xl text-white">
                                    {t(`categories.${categoryId}.priceRange`)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gold-500 text-lg mb-6 font-medium">
                                {t(`categories.${categoryId}.details`)}
                            </p>
                            <ul className="space-y-4">
                                {Array.isArray(features) && features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryPage;
