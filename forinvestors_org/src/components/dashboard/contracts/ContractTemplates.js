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

    // --- AGENCY AGREEMENT (ALWAYS ENGLISH AS PER NEW REQUIREMENT) ---
    if (contractType === 'agency_collaboration') {
        const ag = data.agencyData || {};

        return `# REAL ESTATE AGENCY COLLABORATION AGREEMENT

## PARTIES

On one part,

**URBINA AGENCY LLC**, with the following details (hereinafter, *URBINA AGENCY*):

* Company Name: **URBINA AGENCY LLC**
* Registered Office: **New Mexico, USA**
* Legal Representative (CEO): **(System Admin)**
* Bank Account (IBAN/Account): 
${bankDetails}

And on the other part,

**THE PARTNER AGENCY**, with the following details (hereinafter, *THE PARTNER AGENCY*):

* Company Name: **${ag.companyName || '____________________'}**
* Tax ID: **${ag.taxId || '____________________'}**
* Registered Office: **${ag.address || '____________________'}**
* Legal Representative: **${ag.repName || '____________________'}**
* ID Number: **${ag.repId || '____________________'}**
* Bank Account (IBAN): **${ag.accountNumber || '____________________'}**
* Bank Name: **${ag.bankName || '____________________'}**
* SWIFT/BIC: **${ag.swiftCode || '____________________'}**

Both parties, acknowledging sufficient legal capacity to contract, agree to subscribe to this **Real Estate Agency Collaboration Agreement**, which shall be governed by the following:

---

## CLAUSES

### FIRST. OBJECT OF THE CONTRACT

The object of this contract is to regulate the commercial collaboration between URBINA AGENCY and THE PARTNER AGENCY for the **marketing and sale of real estate assets**, both their own and those of third parties, through a commission splitting system and operational cooperation.

### SECOND. ASSET CONTRIBUTION

1. **URBINA AGENCY** may contribute to the collaboration:
   * Properties under sales management.
   * Buyers.
   * Investors.
   * Both for its own assets and for those contributed by THE PARTNER AGENCY.

2. **THE PARTNER AGENCY** shall contribute and make available to the collaboration **all real estate assets it has under sales management** and which it decides to upload to the platform **[www.topoffmarket.com](http://www.topoffmarket.com)**, managed by URBINA AGENCY.

3. Uploading an asset to the platform implies **automatic acceptance of the commission split** established in this contract, without the need for additional agreements for each asset.

### THIRD. SALES MANAGEMENT

1. THE PARTNER AGENCY shall be the **exclusive party responsible for the comprehensive sales management** of the assets it contributes, including, but not limited to:
   * Property visits.
   * Relationship with the property owner.
   * Document management.
   * Negotiation and closing of the operation.

2. URBINA AGENCY shall act as an **opportunity channeler**, connecting the buyer or investor with THE PARTNER AGENCY.

### FOURTH. ASSET PUBLICATION CONDITIONS

For each real estate asset that THE PARTNER AGENCY uploads to the **topoffmarket.com** platform, it must mandatorily indicate:
* Selling price of the asset.
* Commission percentage signed with the owner.
* Confirmation that it holds a valid sales mandate.

The veracity of this data shall be the exclusive responsibility of THE PARTNER AGENCY.

### FIFTH. COMMISSION SPLIT (PARTNER AGENCY ASSETS)

1. In the event that an asset contributed by THE PARTNER AGENCY is sold thanks to a buyer or investor contributed by URBINA AGENCY:
   * The total commission shall be that agreed with the owner.
   * Said commission shall be split at **50% for each party**.

2. Once the sale is formalized, THE PARTNER AGENCY must:
   * Mark the asset as **"sold"** on the platform.
   * Indicate the **final sale price**.
   * Pay URBINA AGENCY **50% of the corresponding commission**.

3. The payment must be made via bank transfer to the account indicated by URBINA AGENCY, within a **maximum period of 15 BUSINESS DAYS** from the collection of the commission by THE PARTNER AGENCY.

### SIXTH. COMMISSION SPLIT (URBINA AGENCY ASSETS)

1. In the event that THE PARTNER AGENCY intermediates in the sale of an asset for which **URBINA AGENCY has a signed sales mandate with the owner**:
   * The total commission shall be that agreed with the owner.
   * Said commission shall be split at **50% for each party**.

2. URBINA AGENCY commits to pay THE PARTNER AGENCY the **50% of the commission** corresponding to it within a **maximum period of 15 BUSINESS DAYS** from the effective collection of the commission.

3. The payment shall be made via bank transfer to the account indicated by THE PARTNER AGENCY above.

### SEVENTH. CONFIDENTIALITY

Both parties commit to maintaining the **strictest confidentiality** regarding commercial, economic, and strategic information to which they have access as a consequence of this collaboration.

### EIGHTH. NON-EXCLUSIVITY

This contract does not imply exclusivity between the parties, and both may collaborate with third parties, provided that the commitments assumed in this contract are not violated.

### NINTH. DURATION

This contract shall have an **indefinite** duration, entering into vigor on the date of its signature.

Either party may unilaterally terminate it at any time by written notification to the other party with a minimum notice of **30 days**.

### TENTH. TERMINATION

The contract may be terminated by either party in case of:
* Serious breach of the obligations established herein.
* Mutual agreement.
* Unilateral decision with notice as established in the previous clause.

Operations initiated prior to termination must respect the agreed commission split.

### ELEVENTH. APPLICABLE LAW AND JURISDICTION

This contract shall be governed by the applicable legislation in the **State of New Mexico (United States)**.

The parties expressly submit to the jurisdiction of the **Courts and Tribunals of the State of New Mexico**, waiving any other jurisdiction that might correspond to them.

---

And in proof of conformity, both parties sign this contract.

**Online Signature on ${formattedDate}**

**URBINA AGENCY LLC**                   | **THE PARTNER AGENCY**
Signed: (System Digital Signature)   | Signed: (Digital Signature)
Name: System Administrator           | Name: **${ag.repName || ''}**
Position: CEO                        | Position: Representative
    `;
    }

    return "";
};
