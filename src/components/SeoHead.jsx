import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SeoHead({ title, description, image }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <Helmet>
            <html lang={lang} dir={dir} />
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Dynamic OpenGraph */}
            <meta property="og:locale" content={lang} />
        </Helmet>
    );
}
