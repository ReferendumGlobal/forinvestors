import { Hotel, LandPlot, Building2, Star, Grape, TrendingUp } from 'lucide-react';

export const categories = {
    investments: {
        id: 'investments',
        icon: TrendingUp,
        title: 'Inversiones Inmobiliarias',
        description: 'Gestión integral de carteras de inversión. Detectamos oportunidades de alto rendimiento en el mercado inmobiliario global.',
        longDescription: 'Nuestra división de Inversiones Inmobiliarias no solo busca activos, sino que diseña estrategias de capital. Analizamos tendencias de mercado, ciclos económicos y oportunidades de revalorización para ofrecer productos que encajen con el perfil de riesgo y retorno de inversores institucionales y family offices.',
        priceRange: 'Desde 1M€ hasta 500M€',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Estrategias a medida: Core, Value-Add y Opportunistic.',
        features: [
            'Análisis macroeconómico y de mercado local.',
            'Due Diligence técnica, legal y financiera exhaustiva.',
            'Estructuración de vehículos de inversión.',
            'Gestión de activos (Asset Management) post-adquisición.'
        ]
    },
    hotels: {
        id: 'hotels',
        icon: Hotel,
        title: 'Hoteles a la Venta',
        description: 'Selección exclusiva de activos hoteleros en las principales zonas turísticas de España, Europa y destinos mundiales.',
        longDescription: 'El sector hotelero es la joya de nuestra corona. Disponemos de acceso directo a propietarios de cadenas hoteleras, hoteles boutique independientes y resorts de lujo que operan "off-market". Buscamos activos con potencial de reposicionamiento, contratos de gestión flexibles o rentabilidades estabilizadas en ubicaciones irreplicables.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Oportunidades de gestión, franquicia o compra pura.',
        features: [
            'Hoteles urbanos en capitales europeas (Madrid, París, Londres).',
            'Resorts vacacionales en primera línea de playa (Baleares, Costa del Sol).',
            'Edificios con licencia hotelera para reformar.',
            'Sale & Leaseback con operadores de primer nivel.'
        ]
    },
    land: {
        id: 'land',
        icon: LandPlot,
        title: 'Terrenos a la Venta',
        description: 'Suelo finalista, urbanizable y rústico en ubicaciones estratégicas para grandes desarrollos.',
        longDescription: 'La base de cualquier gran proyecto es la tierra. Nuestra cartera de suelos incluye parcelas finalistas listas para solicitar licencia (Ready-to-build), desarrollos urbanísticos a medio plazo y grandes extensiones de suelo rústico para proyectos de energía renovable o uso agropecuario. Verificamos rigurosamente la situación urbanística de cada metro cuadrado.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
        details: 'Suelo residencial, logístico, comercial y terciario.',
        features: [
            'Suelo residencial para promociones de obra nueva.',
            'Suelo logístico en nudos de comunicación estratégicos.',
            'Suelo terciario para centros comerciales u oficinas.',
            'Gestión urbanística y juntas de compensación.'
        ]
    },
    luxury: {
        id: 'luxury',
        icon: Star,
        title: 'Propiedades de Lujo a la Venta',
        description: 'Villas singulares y áticos en ubicaciones prime. El máximo exponente de la exclusividad residencial.',
        longDescription: 'Entendemos el lujo no solo como un precio, sino como una experiencia de vida. Nuestra selección "Propiedades de Lujo" incluye las residencias más exclusivas del mercado: villas en La Zagaleta, áticos en el Barrio de Salamanca o mansiones históricas en la Costa Azul. Privacidad, seguridad y diseño arquitectónico sin compromisos.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        details: 'Activos residenciales Prime y Ultra-Prime.',
        features: [
            'Villas de autor con seguridad privada 24h.',
            'Áticos con vistas panorámicas en centros financieros.',
            'Fincas de recreo y palacetes históricos.',
            'Servicios de conserjería y gestión de estilo de vida.'
        ]
    },
    wineries: {
        id: 'wineries',
        icon: Grape,
        title: 'Bodegas a la Venta',
        description: 'Inversiones en el sector vitivinícola: bodegas con D.O., viñedos y centros de producción.',
        longDescription: 'Invertir en una bodega es invertir en cultura, historia y tierra. Ofrecemos oportunidades en las regiones vinícolas más prestigiosas (Rioja, Ribera del Duero, Burdeos, Napa Valley). Desde bodegas familiares con marca consolidada hasta grandes centros de producción a granel, analizamos la capacidad productiva y el valor de marca.',
        priceRange: 'Desde 1M€ hasta 150M€',
        image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        details: 'Activos productivos con valor inmobiliario y de marca.',
        features: [
            'Bodegas con Denominación de Origen Calificada.',
            'Viñedos centenarios en plena producción.',
            'Instalaciones de enoturismo y hoteles bodega.',
            'Marcas de vino con distribución internacional.'
        ]
    }
};

export const blogPosts = [
    {
        id: 1,
        title: "Tendencias Inmobiliarias 2026: El Auge del 'Build to Rent'",
        excerpt: "Analizamos cómo los grandes fondos están rotando sus carteras hacia activos residenciales flexibles en las principales capitales europeas.",
        date: "12 Oct 2025",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "5 min lectura"
    },
    {
        id: 2,
        title: "Inversión Hotelera: ¿Rebranding o Gestión Directa?",
        excerpt: "Claves para maximizar el RevPAR en activos hoteleros costeros mediante estrategias de reposicionamiento de marca.",
        date: "28 Sep 2025",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "8 min lectura"
    },
    {
        id: 3,
        title: "Suelo Logístico: El Nuevo Oro Negro",
        excerpt: "La demanda de espacios de última milla está disparando las valoraciones de suelo industrial en los anillos metropolitanos de Madrid y Barcelona.",
        date: "15 Sep 2025",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        readTime: "6 min lectura"
    }
];

export const faqs = [
    {
        question: "¿Qué tipo de inversores pueden acceder a su cartera?",
        answer: "Trabajamos exclusivamente con inversores cualificados, Family Offices y fondos institucionales capaces de acreditar solvencia para operaciones desde 1M€."
    },
    {
        question: "¿Por qué requieren una Prueba de Fondos (POF) antes de ver detalles?",
        answer: "Para proteger la confidencialidad de nuestros vendedores y activos off-market. Solo compartimos información sensible (ubicación exacta, métricas) con compradores verificados."
    },
    {
        question: "¿Gestionan la Golden Visa para inversores extracomunitarios?",
        answer: "Sí. Contamos con un departamento legal especializado en tramitar la residencia por inversión (Golden Visa) para clientes que adquieren activos superiores a 500.000€."
    },
    {
        question: "¿Cobran honorarios al comprador o al vendedor?",
        answer: "Depende del mandato. En operaciones off-market directas, nuestros honorarios suelen estar incluidos en el precio de venta o pactados mediante mandato de compra (buy-side mandate)."
    }
];
