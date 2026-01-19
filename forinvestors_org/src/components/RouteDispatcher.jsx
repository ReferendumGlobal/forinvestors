import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCategoryFromSlug } from '../routes';
import CategoryPage from './CategoryPage';
import Agencies from './Agencies';
import SellAssets from './SellAssets';
import PropertySearch from './PropertySearch';
import Blog from './Blog';

export default function RouteDispatcher() {
    const { lang, slug } = useParams();

    // Safety check for lang
    if (!lang) return <Navigate to="/es" replace />;

    const categoryId = getCategoryFromSlug(slug, lang);

    if (!categoryId) {
        // If slug doesn't match any category, redirect to home or 404
        // For now, redirect to localized home
        return <Navigate to={`/${lang}`} replace />;
    }

    switch (categoryId) {
        case 'investments':
        case 'hotels':
        case 'land':
        case 'luxury':
        case 'wineries':
            return <CategoryPage categoryId={categoryId} />;
        case 'agencies':
            return <Agencies />;
        case 'sell':
            return <SellAssets />;
        case 'search':
            return <PropertySearch />;
        case 'blog':
            return <Blog />;
        default:
            return <Navigate to={`/${lang}`} replace />;
    }
}
