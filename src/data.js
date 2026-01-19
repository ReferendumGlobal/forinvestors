import { Hotel, LandPlot, Building2, Star, Grape, TrendingUp } from 'lucide-react';

export const categories = {
    investments: {
        id: 'investments',
        icon: TrendingUp,
        title: 'Real Estate Investments',
        description: 'Comprehensive investment portfolio management. We detect high-yield opportunities in the global real estate market.',
        longDescription: 'Our Real Estate Investments division does not just seek assets; it designs capital strategies. We analyze market trends, economic cycles, and appreciation opportunities to offer products that fit the risk and return profile of institutional investors and family offices.',
        priceRange: 'From €1M to €500M',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Tailored strategies: Core, Value-Add, and Opportunistic.',
        features: [
            'Macroeconomic and local market analysis.',
            'Exhaustive technical, legal, and financial Due Diligence.',
            'Structuring of investment vehicles.',
            'Post-acquisition Asset Management.'
        ]
    },
    hotels: {
        id: 'hotels',
        icon: Hotel,
        title: 'Hotels for Sale',
        description: 'Exclusive selection of hotel assets in prime tourist destinations in Spain, Europe, and worldwide.',
        longDescription: 'The hotel sector is the jewel in our crown. We have direct access to owners of hotel chains, independent boutique hotels, and luxury resorts operating "off-market". We look for assets with repositioning potential, flexible management contracts, or stabilized yields in unrepeatable locations.',
        priceRange: 'From €1M to €150M',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Management, franchise, or pure purchase opportunities.',
        features: [
            'Urban hotels in European capitals (Madrid, Paris, London).',
            'Holiday resorts on the beachfront (Balearics, Costa del Sol).',
            'Buildings with hotel licenses for renovation.',
            'Sale & Leaseback with top-tier operators.'
        ]
    },
    land: {
        id: 'land',
        icon: LandPlot,
        title: 'Land for Sale',
        description: 'Finalist, buildable, and rustic land in strategic locations for large developments.',
        longDescription: 'The foundation of any great project is land. Our land portfolio includes finalist plots ready for license application (Ready-to-build), medium-term urban developments, and large tracts of rustic land for renewable energy projects or agricultural use. We rigorously verify the urban planning status of every square meter.',
        priceRange: 'From €1M to €150M',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
        details: 'Residential, logistical, commercial, and tertiary land.',
        features: [
            'Residential land for new construction developments.',
            'Logistics land in strategic communication hubs.',
            'Tertiary land for shopping centers or offices.',
            'Urban planning management and compensation boards.'
        ]
    },
    luxury: {
        id: 'luxury',
        icon: Star,
        title: 'Luxury Properties for Sale',
        description: 'Unique villas and penthouses in prime locations. The pinnacle of residential exclusivity.',
        longDescription: 'We understand luxury not just as a price, but as a living experience. Our "Luxury Properties" selection includes the most exclusive residences on the market: villas in La Zagaleta, penthouses in the Salamanca district, or historic mansions on the French Riviera. Absolute privacy, security, and architectural design without compromise.',
        priceRange: 'From €1M to €150M',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        details: 'Prime and Ultra-Prime residential assets.',
        features: [
            'Designer villas with 24h private security.',
            'Penthouses with panoramic views in financial centers.',
            'Recreational estates and historic palaces.',
            'Concierge and lifestyle management services.'
        ]
    },
    wineries: {
        id: 'wineries',
        icon: Grape,
        title: 'Wineries for Sale',
        description: 'Investments in the wine sector: wineries with D.O., vineyards, and production centers.',
        longDescription: 'Investing in a winery is investing in culture, history, and land. We offer opportunities in the most prestigious wine regions (Rioja, Ribera del Duero, Bordeaux, Napa Valley). From family wineries with established brands to large bulk production centers, we analyze production capacity and brand value.',
        priceRange: 'From €1M to €150M',
        image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Productive assets with real estate and brand value.',
        features: [
            'Wineries with Qualified Designation of Origin.',
            'Centenary vineyards in full production.',
            'Wine tourism facilities and winery hotels.',
            'Wine brands with international distribution.'
        ]
    }
};

export const blogPosts = [
    {
        id: 1,
        title: "Real Estate Trends 2026: The Rise of 'Build to Rent'",
        excerpt: "Analyzing how major funds are rotating portfolios towards flexible residential assets in key European capitals.",
        date: "Oct 12, 2025",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Hotel Investment: Rebranding or Direct Management?",
        excerpt: "Keys to maximizing RevPAR in coastal hotel assets through brand repositioning strategies.",
        date: "Sep 28, 2025",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "Logistics Land: The New Black Gold",
        excerpt: "Demand for last-mile spaces is skyrocketing industrial land valuations in metropolitan rings worldwide.",
        date: "Sep 15, 2025",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "6 min read"
    }
];

export const faqs = [
    {
        question: "What type of investors can access your portfolio?",
        answer: "We work exclusively with qualified investors, Family Offices, and institutional funds capable of proving solvency for operations starting from €1M."
    },
    {
        question: "Why do you require Proof of Funds (POF) before seeing details?",
        answer: "To protect the confidentiality of our sellers and off-market assets. We only share sensitive information (exact location, metrics) with verified buyers."
    },
    {
        question: "Do you handle Golden Visa for non-EU investors?",
        answer: "Yes. We have a legal department specialized in processing residence by investment (Golden Visa) for clients acquiring assets over €500,000."
    },
    {
        question: "Do you charge fees to the buyer or the seller?",
        answer: "It depends on the mandate. In direct off-market operations, our fees are usually included in the sales price or agreed upon via a buy-side mandate."
    }
];
