import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getSlugFromCategory, routeConfig } from '../routes';

export default function SeoHead({ title, description, image, routeKey }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const domain = 'https://forinvestors.org'; // Production domain

    // Generate Hreflang tags
    const renderHreflangs = () => {
        const supportedLangs = Object.keys(routeConfig);
        return supportedLangs.map(code => {
            let path = `/${code}`;
            if (routeKey) {
                const slug = getSlugFromCategory(routeKey, code);
                if (slug) {
                    path += `/${slug}`;
                }
            }
            return (
                <link
                    key={code}
                    rel="alternate"
                    hreflang={code}
                    href={`${domain}${path}`}
                />
            );
        });
    };

    return (
        <Helmet>
            <html lang={lang} dir={dir} />
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Dynamic OpenGraph */}
            <meta property="og:locale" content={lang} />
            {image && <meta property="og:image" content={image} />}

            {/* Hreflang Tags for SEO */}
            {renderHreflangs()}

            {/* x-default (usually English) */}
            <link rel="alternate" hreflang="x-default" href={`${domain}/en${routeKey ? '/' + getSlugFromCategory(routeKey, 'en') : ''}`} />
        </Helmet>
    );
}
