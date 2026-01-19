export const routeConfig = {
    es: {
        investments: 'inversiones',
        hotels: 'hoteles',
        land: 'terrenos',
        luxury: 'lujo',
        wineries: 'bodegas',
        blog: 'blog',
        agencies: 'agencias',
        search: 'buscar',
        sell: 'vender'
    },
    en: {
        investments: 'investments',
        hotels: 'hotels',
        land: 'land',
        luxury: 'luxury',
        wineries: 'wineries',
        blog: 'blog',
        agencies: 'for-agencies',
        search: 'search',
        sell: 'sell'
    },
    fr: {
        investments: 'investissements',
        hotels: 'hotels',
        land: 'terrains',
        luxury: 'luxe',
        wineries: 'vignobles',
        blog: 'blog',
        agencies: 'agences',
        search: 'recherche',
        sell: 'vendre'
    },
    de: {
        investments: 'investitionen',
        hotels: 'hotels',
        land: 'grundstucke',
        luxury: 'luxus',
        wineries: 'weinguter',
        blog: 'blog',
        agencies: 'agenturen',
        search: 'suche',
        sell: 'verkaufen'
    },
    ru: {
        investments: 'investitsii',
        hotels: 'oteli',
        land: 'zemlya',
        luxury: 'elitnaya',
        wineries: 'vinodelni',
        blog: 'blog',
        agencies: 'agentstva',
        search: 'poisk',
        sell: 'prodat'
    },
    zh: {
        investments: 'touzi',
        hotels: 'jiudian',
        land: 'tudi',
        luxury: 'haozhai',
        wineries: 'jiuzhuang',
        blog: 'blog',
        agencies: 'jigou',
        search: 'sousuo',
        sell: 'chushou'
    },
    ar: {
        investments: 'istithmarat',
        hotels: 'fanadiq',
        land: 'aradi',
        luxury: 'fakhama',
        wineries: 'khoroum',
        blog: 'blog',
        agencies: 'wakalat',
        search: 'bahth',
        sell: 'bay'
    },
    pt: {
        investments: 'investimentos',
        hotels: 'hoteis',
        land: 'terrenos',
        luxury: 'luxo',
        wineries: 'vinicolas',
        blog: 'blog',
        agencies: 'agencias',
        search: 'busca',
        sell: 'vender'
    },
    ja: {
        investments: 'toushi',
        hotels: 'hoteru',
        land: 'tochi',
        luxury: 'gokajou',
        wineries: 'wainari',
        blog: 'blog',
        agencies: 'dairiten',
        search: 'kensaku',
        sell: 'baikyaku'
    },
    hi: {
        investments: 'nivesh',
        hotels: 'hotel',
        land: 'zamin',
        luxury: 'vilasita',
        wineries: 'wineries',
        blog: 'blog',
        agencies: 'agencies',
        search: 'khoj',
        sell: 'bechen'
    }
};

// Map localized slugs to English keys (the internal ID)
const slugToKeyMap = {
    // ES
    'inversiones': 'investments',
    'hoteles': 'hotels',
    'terrenos': 'land',
    'lujo': 'luxury',
    'bodegas': 'wineries',
    'agencias': 'agencies',
    'buscar': 'search',
    'vender': 'sell',
    // FR
    'investissements': 'investments',
    'terrains': 'land',
    'luxe': 'luxury',
    'vignobles': 'wineries',
    'agences': 'agencies',
    'recherche': 'search',
    'vendre': 'sell',
    // DE
    'investitionen': 'investments',
    'grundstucke': 'land',
    'luxus': 'luxury',
    'weinguter': 'wineries',
    'agenturen': 'agencies',
    'suche': 'search',
    'verkaufen': 'sell',
    // RU
    'investitsii': 'investments',
    'oteli': 'hotels',
    'zemlya': 'land',
    'elitnaya': 'luxury',
    'vinodelni': 'wineries',
    'agentstva': 'agencies',
    'poisk': 'search',
    'prodat': 'sell',
    // ZH
    'touzi': 'investments',
    'jiudian': 'hotels',
    'tudi': 'land',
    'haozhai': 'luxury',
    'jiuzhuang': 'wineries',
    'jigou': 'agencies',
    'sousuo': 'search',
    'chushou': 'sell',
    // AR
    'istithmarat': 'investments',
    'fanadiq': 'hotels',
    'aradi': 'land',
    'fakhama': 'luxury',
    'khoroum': 'wineries',
    'wakalat': 'agencies',
    'bahth': 'search',
    'bay': 'sell',
    // PT
    'investimentos': 'investments',
    'hoteis': 'hotels',
    'luxo': 'luxury',
    'vinicolas': 'wineries',
    'busca': 'search',
    // JA
    'toushi': 'investments',
    'hoteru': 'hotels',
    'tochi': 'land',
    'gokajou': 'luxury',
    'wainari': 'wineries',
    'dairiten': 'agencies',
    'kensaku': 'search',
    'baikyaku': 'sell',
    // HI
    'nivesh': 'investments',
    'hotel': 'hotels',
    'zamin': 'land',
    'vilasita': 'luxury',
    'khoj': 'search',
    'bechen': 'sell'
};

// Helper: Get category ID from slug (reverse lookup)
export const getCategoryFromSlug = (slug, lang) => {
    // Direct map lookup (fastest and most robust)
    if (slugToKeyMap[slug]) return slugToKeyMap[slug];

    // Fallback: check if slug matches an English key directly (for English or defaults)
    const enRoutes = routeConfig['en'];
    const enKey = Object.keys(enRoutes).find(key => enRoutes[key] === slug);
    if (enKey) return enKey;

    // Fallback: check current lang config
    const langRoutes = routeConfig[lang] || routeConfig['en'];
    return Object.keys(langRoutes).find(key => langRoutes[key] === slug);
};

// Helper: Get slug from category ID
export const getSlugFromCategory = (catId, lang) => {
    const langRoutes = routeConfig[lang] || routeConfig['en'];
    return langRoutes[catId] || catId;
};
