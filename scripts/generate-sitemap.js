import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://parainversores.com';

const LANGUAGES = ['es', 'en', 'zh', 'ru', 'ar', 'de', 'fr', 'pt', 'ja', 'hi'];

const STATIC_ROUTES = [
    '', // Home
    'investments',
    'hotels',
    'land',
    'luxury',
    'wineries',
    'blog',
    'agencias',
    'sell',
    'search'
];

const LOCATIONS = [
    'madrid',
    'barcelona',
    'valencia',
    'sevilla',
    'malaga',
    'alicante',
    'marbella',
    'mallorca',
    'ibiza',
    'canarias',
    'bilbao',
    'san-sebastian',
    'zaragoza',
    'murcia',
    'palma',
    'tenerife',
    'gran-canaria',
    'costa-del-sol',
    'costa-brava',
    'sitges'
];

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Static Routes for all languages
    LANGUAGES.forEach(lang => {
        STATIC_ROUTES.forEach(route => {
            const url = `${BASE_URL}/${lang}${route ? '/' + route : ''}`;
            xml += `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });
    });

    // 2. Dynamic Property Search Routes (SEO Landing Pages)
    LANGUAGES.forEach(lang => {
        LOCATIONS.forEach(location => {
            const url = `${BASE_URL}/${lang}/properties/${location}`;
            xml += `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
        });
    });

    xml += `
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated at ${outputPath}`);
}

generateSitemap();
