export const routeConfig = {
    es: {
        investments: 'inversiones',
        hotels: 'hoteles',
        land: 'terrenos',
        luxury: 'lujo',
        wineries: 'bodegas',
        blog: 'blog',
        agencies: 'agencias',
        search: 'buscar'
    },
    en: {
        investments: 'investments',
        hotels: 'hotels',
        land: 'land',
        luxury: 'luxury',
        wineries: 'wineries',
        blog: 'blog',
        agencies: 'for-agencies',
        search: 'search'
    },
    fr: {
        investments: 'investissements',
        hotels: 'hotels',
        land: 'terrains',
        luxury: 'luxe',
        wineries: 'vignobles',
        blog: 'blog',
        agencies: 'agences',
        search: 'recherche'
    },
    de: {
        investments: 'investitionen',
        hotels: 'hotels',
        land: 'grundstucke',
        luxury: 'luxus',
        wineries: 'weinguter',
        blog: 'blog',
        agencies: 'agenturen',
        search: 'suche'
    },
    ru: {
        investments: 'investitsii',
        hotels: 'oteli',
        land: 'zemlya',
        luxury: 'elitnaya',
        wineries: 'vinodelni',
        blog: 'blog',
        agencies: 'agentstva',
        search: 'poisk'
    },
    zh: {
        investments: 'touzi',
        hotels: 'jiudian',
        land: 'tudi',
        luxury: 'haozhai',
        wineries: 'jiuzhuang',
        blog: 'blog',
        agencies: 'jigou',
        search: 'sousuo'
    },
    ar: {
        investments: 'istithmarat',
        hotels: 'fanadiq',
        land: 'aradi',
        luxury: 'fakhama',
        wineries: 'khoroum',
        blog: 'blog',
        agencies: 'wakalat',
        search: 'bahth'
    },
    pt: {
        investments: 'investimentos',
        hotels: 'hoteis',
        land: 'terrenos',
        luxury: 'luxo',
        wineries: 'vinicolas',
        blog: 'blog',
        agencies: 'agencias',
        search: 'busca'
    },
    ja: {
        investments: 'toushi',
        hotels: 'hoteru',
        land: 'tochi',
        luxury: 'gokajou',
        wineries: 'wainari',
        blog: 'blog',
        agencies: 'dairiten',
        search: 'kensaku'
    },
    hi: {
        investments: 'nivesh',
        hotels: 'hotel',
        land: 'zamin',
        luxury: 'vilasita',
        wineries: 'wineries',
        blog: 'blog',
        agencies: 'agencies',
        search: 'khoj'
    }
};

// Helper: Get category ID from slug (reverse lookup)
export const getCategoryFromSlug = (slug, lang) => {
    const langRoutes = routeConfig[lang] || routeConfig['en'];
    return Object.keys(langRoutes).find(key => langRoutes[key] === slug);
};

// Helper: Get slug from category ID
export const getSlugFromCategory = (catId, lang) => {
    const langRoutes = routeConfig[lang] || routeConfig['en'];
    return langRoutes[catId] || catId;
};
