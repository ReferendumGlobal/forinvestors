import { Hotel, LandPlot, Building2, Star, Grape } from 'lucide-react';

export const categories = {
    hotels: {
        id: 'hotels',
        icon: Hotel,
        title: 'Hotel Investments',
        description: 'Exclusive selection of hotel assets in prime tourist destinations worldwide. From boutique hotels to large resort complexes.',
        priceRange: 'From €2M to €300M',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Guaranteed yields and management or rebranding opportunities.'
    },
    land: {
        id: 'land',
        icon: LandPlot,
        title: 'Prime Land Development',
        description: 'Urban, buildable, and rustic land in strategic locations for residential, commercial, or logistics development.',
        priceRange: 'From €2M to €300M',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
        details: 'Ready-to-build opportunities or land management projects.'
    },
    developers: {
        id: 'developers',
        icon: Building2,
        title: 'Projects for Developers',
        description: 'We collaborate with funds and developers for the acquisition of buildings for rehabilitation, stalled works, and portfolios of adjudicated assets.',
        priceRange: 'From €2M to €300M',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Off-market assets with high appreciation potential.'
    },
    luxury: {
        id: 'luxury',
        icon: Star,
        title: 'Ultra-Luxury Properties',
        description: 'Unique villas, penthouses in prime locations, and historic estates. The pinnacle of residential exclusivity.',
        priceRange: 'From €2M to €300M',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        details: 'Absolute privacy and unrepeatable locations.'
    },
    wineries: {
        id: 'wineries',
        icon: Grape,
        title: 'Vineyards & Wineries',
        description: 'Investments in the wine sector. Wineries with designation of origin, farmhouses with vineyards, and production centers.',
        priceRange: 'From €2M to €300M',
        image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Tradition and profitability in the best wine regions.'
    }
};
