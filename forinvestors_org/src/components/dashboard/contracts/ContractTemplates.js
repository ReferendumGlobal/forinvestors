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

### 1. ${isSpanish ? 'Objeto' : 'Object'}
${isSpanish ? 'Colaboración mutua para la venta de activos inmobiliarios.' : 'Mutual collaboration for the sale of real estate assets.'}
* ${isSpanish ? 'El Colaborador sube propiedades a la Plataforma -> Considerado colaboración compartida.' : 'The Partner uploads properties to the Platform -> Deemed as shared collaboration.'}
* ${isSpanish ? 'Urbina Agency aporta Inversores para dichas propiedades (o viceversa).' : 'Urbina Agency provides Investors for said properties (or vice-versa).'}

### 2. ${isSpanish ? 'Duración' : 'Duration'}
        ** ${isSpanish ? 'INDEFINIDA' : 'INDEFINITE'} **. ${isSpanish ? 'Válido hasta que una de las partes dé de baja su cuenta en la Plataforma.' : 'Valid until either party terminates their account on the Platform.'}

### 3. ${isSpanish ? 'Obligaciones' : 'Obligations'}
${isSpanish
                ? 'El Colaborador DEBE subir el "Mandato de Venta" y "Acuerdo de Comisión" específicos para cada propiedad que liste en la Plataforma.'
                : 'The Partner MUST upload the specific "Sales Mandate" and "Commission Agreement" for each property they list on the Platform.'}

### 4. ${isSpanish ? 'Honorarios y Reparto de Comisión' : 'Fees & Commission Split'}
${isSpanish
                ? 'Independientemente de quién sea el titular de la propiedad (Urbina Agency o El Colaborador), la comisión se repartirá de la siguiente manera:'
                : 'Regardless of who holds the property listing (Urbina Agency or The Partner), the commission shall be split as follows:'}

** ${isSpanish ? 'CINCUENTA POR CIENTO (50 %)' : 'FIFTY PERCENT (50 %)'} ** ${isSpanish ? 'de la comisión neta total para cada parte.' : 'of the total net commission for each party.'}
${isSpanish ? `Más impuestos aplicables/IVA (${vat}).` : `Plus applicable taxes/VAT (${vat}).`}

${isSpanish
                ? 'El reparto se aplica tanto si Urbina Agency presenta al comprador para una propiedad del Colaborador, como si el Colaborador presenta al comprador para una propiedad de Urbina Agency.'
                : 'This split applies whether Urbina Agency introduces the buyer for the Partner\'s property, or the Partner introduces the buyer for Urbina Agency\'s property.'}

### 5. ${isSpanish ? 'Condiciones de Pago' : 'Payment Terms'}
${isSpanish
                ? 'La parte que reciba la comisión completa del vendedor/comprador (el "Depositario") deberá abonar el 50% correspondiente a la otra parte (el "Beneficiario") dentro de los ** 15 días hábiles ** posteriores al cobro.'
                : 'The party receiving the full commission from the seller/buyer (the "Depositary") shall pay the corresponding 50% to the other party (the "Beneficiary") within ** 15 Business Days ** of receipt.'}

${isSpanish ? 'Pago a Urbina Agency (si aplica):' : 'Payment to Urbina Agency (if applicable):'}
${bankDetails}

...


** ${labels.agency} **               ** ${labels.partner} **
        ${labels.system_signed}
    `;
    }

    return "";
};
