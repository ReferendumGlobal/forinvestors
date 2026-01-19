export const getContractContent = (contractType, data, lang = 'en') => {
    // Helper to format date based on locale
    const formattedDate = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isSpanish = lang === 'es';

    // Headers & Labels
    const labels = {
        parties: isSpanish ? "REUNIDOS" : "PARTIES",
        recitals: isSpanish ? "EXPONEN" : "RECITALS",
        clauses: isSpanish ? "CLÁUSULAS" : "CLAUSES",
        online_mode: isSpanish ? "En Modalidad Online, a" : "In Online Mode, on",
        sign_place: isSpanish ? "En" : "In",
        urbina_desc: isSpanish
            ? "** URBINA AGENCY LLC **, una compañía debidamente constituida y registrada en el Estado de Nuevo México, Estados Unidos de América..."
            : "** URBINA AGENCY LLC **, a company duly incorporated and registered in the State of New Mexico, United States of America...",
        client: isSpanish ? "EL CLIENTE" : "THE CLIENT",
        owners: isSpanish ? "LOS PROPIETARIOS" : "THE OWNERS",
        agency: isSpanish ? "URBINA AGENCY LLC" : "URBINA AGENCY LLC",
        partner: isSpanish ? "LA AGENCIA COLABORADORA" : "PARTNER AGENCY",
        system_signed: isSpanish ? "[Firmado por Sistema][Ver Firma Abajo]" : "[System Signed][See Signature Below]"
    };

    // Bank Details (Common) - Could be localized if needed
    const bankDetails = `
**Beneficiary**: URBINA AGENCY LLC

**For International Transfers:**
*   **SWIFT / BIC**: CLNOUS66
*   **Account Number**: 692101525685

**For Domestic US Transfers:**
*   **Routing Number (ABA)**: 091017138
*   **Account Number**: 692101525685
`;

    // --- BUY MANDATE ---
    if (contractType === 'buy_mandate') {
        const criteria = data.criteria || {};
        const clientName = data.profile?.full_name || "Client Name";
        const clientID = criteria?.idNumber || "ID/Passport";
        const clientAddress = criteria?.address || "Address";
        const capacity = criteria?.investmentCapacity || "TBD";
        const signingPlace = criteria?.signingPlace || (isSpanish ? "Online" : "Online");

        // Purpose Text
        let purposeText = "";
        const profiles = criteria?.searchProfiles || [];

        if (profiles.length > 0) {
            purposeText = profiles.map((p, i) => `
**${isSpanish ? 'Perfil' : 'Profile'} ${i + 1}**:
* ${isSpanish ? 'Ubicación' : 'Location'}: **${p.country || 'Any'}** - **${p.region || ''}**
* ${isSpanish ? 'Tipo' : 'Type'}: **${p.type || 'Any'}**
* ${isSpanish ? 'Precio' : 'Price'}: **${p.priceRange || 'Any'}**
* ${isSpanish ? 'Detalles' : 'Specifics'}: **${p.other || 'None'}**
`).join('\n');
        } else {
            purposeText = `
* ${isSpanish ? 'País' : 'Country'}: ** "${criteria?.targetCountry || 'Any'}" **
* ${isSpanish ? 'Rango de Precio' : 'Price range'}: ** "${criteria?.priceRange || 'Any'}" **
* ${isSpanish ? 'Tipo de Propiedad' : 'Property type'}: ** "${criteria?.propertyType || 'Any'}" **
`;
        }

        const title = isSpanish ? "# MANDATO DE BÚSQUEDA DE INVERSIÓN INMOBILIARIA" : "# PROPERTY SEARCH MANDATE AGREEMENT FOR INVESTMENT";
        const dateLine = `** ${labels.sign_place} ${signingPlace}, ${isSpanish ? 'a' : 'on'} ${formattedDate}**`;

        const p1_obj = isSpanish
            ? "1. Objeto del acuerdo (Mandato de Búsqueda)"
            : "1. Purpose of the agreement (Search Mandate)";
        const p1_text = isSpanish
            ? "EL CLIENTE otorga a URBINA AGENCY un mandato para identificar oportunidades que cumplan los siguientes criterios:"
            : "THE CLIENT grants URBINA AGENCY a mandate to identify opportunities meeting the following criteria:";

        const p3_term = isSpanish ? "3. Duración" : "3. Term";
        const p3_val = isSpanish ? "** SEIS (6) MESES **, renovación automática salvo aviso." : "** SIX (6) MONTHS **, automatic termination unless renewed.";

        const p5_fee = isSpanish ? "5. Honorarios de URBINA AGENCY" : "5. URBINA AGENCY’s fee";
        const p5_val = isSpanish ? "** SIETE POR CIENTO (7 %) ** del precio de adquisición + impuestos." : "** SEVEN PERCENT (7 %) ** of acquisition price + taxes.";

        const p6_pay = isSpanish ? "6. Instrucciones de Pago" : "6. Payment Instructions";

        return `${title}

        ${dateLine}

## ${labels.parties}

${isSpanish ? 'De una parte,' : 'On the one hand,'}

${labels.urbina_desc} (operating through ** [forinvestors.org](http://www.forinvestors.org)**).

            ${isSpanish ? 'Y de otra parte' : 'And on the other hand'},

** "${clientName}" **, ${isSpanish ? 'identificado con' : 'identified with'} ** "${clientID}" **, ${isSpanish ? 'con domicilio en' : 'with registered address at'} ** "${clientAddress}" **, ${isSpanish ? 'en adelante' : 'hereinafter referred to as'} ** "${labels.client}" **.

## ${labels.recitals}

    1. ${labels.client} ${isSpanish ? 'está interesado en la' : 'is interested in the'} ** ${isSpanish ? 'búsqueda y análisis de oportunidades de inversión inmobiliaria' : 'search and analysis of real estate investment opportunities'} **, ${isSpanish ? 'validada por una Capacidad de Inversión total de' : 'validated by a total declared Investment Capacity of'} ** ${capacity}**.
    2. URBINA AGENCY...

## ${labels.clauses}

### ${p1_obj}
${p1_text}

${purposeText}

### ${p3_term}
        ${p3_val}

### ${p5_fee}
        ${p5_val}

### ${p6_pay}
${isSpanish ? 'Todos los honorarios se abonarán a la siguiente cuenta:' : 'All fees shall be paid to the following account:'}
${bankDetails}

...


** ${labels.agency} **               ** ${labels.client} **
        ${labels.system_signed}
    `;
    }

    // --- SALE MANDATE ---
    if (contractType === 'sale_mandate') {
        const property = data.sellerData?.property || {};
        const owners = data.sellerData?.owners || [];
        const ownersList = owners.map(o => `** ${o.name}** (ID: ${o.idNumber}, ${o.percent}%)`).join(isSpanish ? ' y ' : ' and ');

        const title = isSpanish ? "# MANDATO DE VENTA EN EXCLUSIVA" : "# EXCLUSIVE SALES MANAGEMENT MANDATE";

        return `${title}

        ** ${labels.online_mode} ${formattedDate}**

## ${labels.parties}

        ** URBINA AGENCY LLC ** (${isSpanish ? 'La Agencia' : 'The Agency'})...
    ${isSpanish ? 'Y' : 'And'}
        ** ${labels.owners} **: ${ownersList}, ${isSpanish ? 'propietarios legales de la propiedad en' : 'legal owners of the property at'} ** ${property.address || 'TBD'}**.

## ${labels.clauses}

### 1. ${isSpanish ? 'Objeto' : 'Object'}
${isSpanish ? 'MANDATO EXCLUSIVO para gestionar la venta de la Propiedad.' : 'EXCLUSIVE MANDATE to manage the sale of the Property.'}
** ${isSpanish ? 'Precio Objetivo' : 'Target Price'} **: €${property.price || 'TBD'}.

### 2. ${isSpanish ? 'Duración y Exclusividad' : 'Term & Exclusivity'}
        ** ${isSpanish ? 'SEIS (6) MESES' : 'SIX (6) MONTHS'} **. ${isSpanish ? 'Exclusividad Estricta.' : 'Strict Exclusivity.'}

### 3. ${isSpanish ? 'Colaboración' : 'Collaboration'}
${isSpanish ? 'URBINA AGENCY autorizada a colaborar con agencias de la red.' : 'URBINA AGENCY Authorized to collaborate with network agencies.'}

### 4. ${isSpanish ? 'Honorarios (Comisión)' : 'Fees (Commission)'}
        ** ${isSpanish ? 'SIETE POR CIENTO (7 %)' : 'SEVEN PERCENT (7 %)'} ** ${isSpanish ? 'del precio de venta + IVA.' : 'of sale price + VAT.'}
${isSpanish ? 'Pagadero en ** 15 días hábiles **.' : 'Payable within ** 15 business days **.'}

### 5. ${isSpanish ? 'Datos de Pago' : 'Payment Details'}
${bankDetails}

...


** ${labels.agency} **               ** ${labels.owners} **
        ${labels.system_signed}
    `;
    }

    // --- AGENCY AGREEMENT ---
    if (contractType === 'agency_collaboration') {
        const ag = data.agencyData || {};
        const vat = ag.vatPercent ? `${ag.vatPercent}%` : 'applicable taxes';

        const title = isSpanish ? "# ACUERDO DE COLABORACIÓN ENTRE AGENCIAS" : "# AGENCY COLLABORATION AGREEMENT";

        return `${title}

        ** ${labels.online_mode} ${formattedDate}**

## ${labels.parties}

        ** URBINA AGENCY LLC ** (${isSpanish ? 'Propietario de la Plataforma' : 'Platform Owner'})...
    ${isSpanish ? 'Y' : 'And'}
        ** ${ag.companyName || (isSpanish ? 'AGENCIA COLABORADORA' : 'PARTNER AGENCY')}** (${isSpanish ? 'El Colaborador' : 'The Partner'}), ${isSpanish ? 'NIF' : 'Tax ID'} ** ${ag.taxId}**, ${isSpanish ? 'representada por' : 'represented by'} ** ${ag.repName}** (${ag.repId}).

## ${labels.recitals}
                ? 'Ambas entidades están facultadas para gestionar transacciones inmobiliarias y desean colaborar a través de ** [topoffmarket.com](https://topoffmarket.com)**.'
                : 'Both entities are empowered to manage real estate transactions and wish to collaborate via ** [topoffmarket.com](https://topoffmarket.com)**.'}

## ${labels.clauses}


### 1. ${isSpanish ? 'Objeto y Roles de las Partes' : 'Object & Roles of the Parties'}
${isSpanish
                ? 'El presente acuerdo establece los términos de colaboración para la compraventa de activos inmobiliarios, bajo los siguientes roles definidos:'
                : 'This agreement establishes the terms of collaboration for the sale of real estate assets, under the following defined roles:'}

* **Urbina Agency (Plataforma):** ${isSpanish
                ? 'Provee la infraestructura tecnológica, conexión con **COMPRADORES/INVERSORES** cualificados y aporta **PROPIEDADES** de su propia cartera.'
                : 'Provides the technological infrastructure, connection with qualified **BUYERS/INVESTORS**, and contributes **PROPERTIES** from its own portfolio.'}
* **${ag.companyName || 'El Colaborador'} (Gestión):** ${isSpanish
                ? 'Aporta **PROPIEDADES** y se encarga de la **GESTIÓN INTEGRAL DE LA VENTA** (visitas, documentación) tanto de sus propiedades como de las asignadas por Urbina Agency.'
                : 'Provides **PROPERTIES** and handles the **COMPREHENSIVE SALE MANAGEMENT** (visits, documentation) for both their own properties and those assigned by Urbina Agency.'}

### 2. ${isSpanish ? 'Obligaciones Específicas' : 'Specific Obligations'}
**${isSpanish ? 'El Colaborador' : 'The Partner'}:**
* ${isSpanish
                ? 'Gestionará las visitas, documentación legal, due diligence y relación directa con la propiedad/vendedor en TODAS las operaciones compartidas.'
                : 'Shall manage visits, legal documentation, due diligence, and direct relationship with the property/seller in ALL shared operations.'}
* ${isSpanish
                ? 'Actuará como gestor principal en el terreno para las propiedades aportadas por Urbina Agency.'
                : 'Shall act as the main ground manager for properties contributed by Urbina Agency.'}

**Urbina Agency:**
* ${isSpanish
                ? 'Pondrá en contacto a compradores potenciales con El Colaborador a través de la tecnología de la Plataforma.'
                : 'Shall connect potential buyers with The Partner through the Platform technology.'}

### 3. ${isSpanish ? 'Duración' : 'Duration'}
**${isSpanish ? 'INDEFINIDA' : 'INDEFINITE'}**. ${isSpanish
                ? 'Hasta que una de las partes cese su actividad en la Plataforma.'
                : 'Until either party ceases their activity on the Platform.'}

### 4. ${isSpanish ? 'Honorarios y Reparto (SHARED COMMISSION)' : 'Fees & Commission Split (SHARED COMMISSION)'}
${isSpanish
                ? 'Basado en el modelo: **Colaborador (Propiedad + Gestión) + Urbina (Comprador + Tecnología)**.'
                : 'Based on the model: **Partner (Property + Management) + Urbina (Buyer + Tech)**.'}

${isSpanish
                ? 'El reparto de los honorarios netos totales percibidos de la operación será:'
                : 'The split of the total net fees received from the operation shall be:'}

** ${isSpanish ? 'CINCUENTA POR CIENTO (50 %)' : 'FIFTY PERCENT (50 %)'} ** -> **Urbina Agency**
** ${isSpanish ? 'CINCUENTA POR CIENTO (50 %)' : 'FIFTY PERCENT (50 %)'} ** -> **${ag.companyName || 'Partner'}**

*${isSpanish ? `(Más IVA/Impuestos aplicables: ${vat})` : `(Plus applicable VAT/Taxes: ${vat})`}*

### 5. ${isSpanish ? 'Instrucciones de Pago' : 'Payment Instructions'}
${isSpanish
                ? 'La parte que reciba los fondos (Depositario) transferirá el 50% a la otra parte (Beneficiario) en un plazo máximo de **15 DÍAS HÁBILES**.'
                : 'The party receiving the funds (Depositary) shall transfer the 50% to the other party (Beneficiary) within a maximum of **15 BUSINESS DAYS**.'}

**${isSpanish ? 'Pagos a Urbina Agency:' : 'Payments to Urbina Agency:'}**
${bankDetails}

**${isSpanish ? `Pagos a ${ag.companyName || 'El Colaborador'}:` : `Payments to ${ag.companyName || 'The Partner'}:`}**
* **Bank Name**: ${ag.bankName || '_________________'}
* **Account/IBAN**: ${ag.accountNumber || '_________________'}
* **SWIFT/BIC**: ${ag.swiftCode || '_________________'}

...


** ${labels.agency} **               ** ${labels.partner} **
        ${labels.system_signed}
    `;
    }

    return "";
};
