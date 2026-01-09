import { Hotel, LandPlot, Building2, Star, Grape } from 'lucide-react';

export const categories = {
    hoteles: {
        id: 'hoteles',
        icon: Hotel,
        title: 'Inversión en Hoteles',
        description: 'Disponemos de una exclusiva selección de activos hoteleros en las principales zonas turísticas de España, Europa y destinos mundiales. Desde hoteles boutique hasta grandes complejos resots.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Rentabilidades garantizadas y oportunidades de gestión o rebranding.'
    },
    terrenos: {
        id: 'terrenos',
        icon: LandPlot,
        title: 'Terrenos Finalistas y en Desarrollo',
        description: 'Suelo urbano, urbanizable y rústico en ubicaciones estratégicas para desarrollo residencial, comercial o logístico.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
        details: 'Oportunidades listadas para inicio inmediato de obras o gestión urbanística.'
    },
    promotores: {
        id: 'promotores',
        icon: Building2,
        title: 'Proyectos para Promotores Inmobiliarios',
        description: 'Colaboramos con fondos y promotoras para la adquisición de edificios para rehabilitar, obras paradas y carteras de activos adjudicados.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Activos off-market con alto potencial de revalorización.'
    },
    lujo: {
        id: 'lujo',
        icon: Star,
        title: 'Propiedades de Lujo',
        description: 'Villas singulares, áticos en ubicaciones prime y fincas históricas. El máximo exponente de la exclusividad residencial.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        details: 'Privacidad absoluta y ubicaciones irrepetibles.'
    },
    bodegas: {
        id: 'bodegas',
        icon: Grape,
        title: 'Bodegas y Viñedos',
        description: 'Inversiones en el sector vitivinícola. Bodegas con denominación de origen, masías con viñedos y centros de producción.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Tradición y rentabilidad en las mejores regiones vinícolas.'
    }
};
