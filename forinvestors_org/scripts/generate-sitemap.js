
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://topoffmarket.com';
const LANGUAGES = ['es', 'en', 'fr', 'de', 'ru', 'zh', 'ar', 'pt', 'ja', 'hi'];

// Core pages (excluding dynamic IDs which would need database access, but including static routes)
const ROUTES = [
    '',              // Home
    'investments',
    'hotels',
    'land',
    'luxury',
    'wineries',
    'blog',
    'agencias',
    'sell',
    'search',
    'login',
    'register'
];

// Special routes that might not be localized or handled differently? 
// No, seemingly all handled by /:lang based on App.jsx

const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

    // 1. Root/Default URL (usually redirects to /es but good to index)
    xml += `  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

    // 2. Iterate all languages and routes
    LANGUAGES.forEach(lang => {
        ROUTES.forEach(route => {
            const urlPath = route ? `${lang}/${route}` : `${lang}`;
            const fullUrl = `${BASE_URL}/${urlPath}`;

            // Priority: Home > Categories > Others
            let priority = '0.8';
            if (route === '') priority = '1.0';
            else if (['login', 'register'].includes(route)) priority = '0.5';

            xml += `  <url>
    <loc>${fullUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>`;

            // Add hreflang links for this specific route across all other languages
            LANGUAGES.forEach(altLang => {
                if (altLang !== lang) {
                    const altPath = route ? `${altLang}/${route}` : `${altLang}`;
                    xml += `
    <xhtml:link 
        rel="alternate" 
        hreflang="${altLang}" 
        href="${BASE_URL}/${altPath}" />`;
                }
            });

            xml += `
  </url>
`;
        });
    });

    xml += `</urlset>`;

    const publicDir = path.join(__dirname, '../public');
    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log(`✅ Sitemap generated at ${path.join(publicDir, 'sitemap.xml')} with ${LANGUAGES.length * ROUTES.length + 1} URLs.`);
};

generateSitemap();
