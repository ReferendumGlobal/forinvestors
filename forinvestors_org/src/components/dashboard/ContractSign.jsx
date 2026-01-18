
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SignaturePad from './SignaturePad';
import { FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContractSign({ mode = 'standalone', contractType = 'buy_mandate', criteria, sellerData, agencyData, idUrl, onSuccess, onBack }) {
    const { profile, user } = useAuth();
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contractUrl, setContractUrl] = useState(null);
    const [existingSignature, setExistingSignature] = useState(null);

    // Common Date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // BANK DETAILS (Confidential)
    const BANK_DETAILS = `
**Beneficiary**: URBINA AGENCY LLC

**For International Transfers:**
*   **SWIFT / BIC**: CLNOUS66
*   **Account Number**: 692101525685

**For Domestic US Transfers:**
*   **Routing Number (ABA)**: 091017138
*   **Account Number**: 692101525685
`;

    // --- TEMPLATE GENERATORS ---

    const generateBuyMandate = () => {
        const signingPlace = criteria?.signingPlace || "Online";
        const clientName = profile?.full_name || "Client Name";
        const clientID = criteria?.idNumber || "ID/Passport";
        const clientAddress = criteria?.address || "Address";
        const capacity = criteria?.investmentCapacity || "TBD";

        // Handle Multiple Profiles
        let purposeText = "";
        const profiles = criteria?.searchProfiles || [];

        if (profiles.length > 0) {
            purposeText = profiles.map((p, i) => `
**Profile ${i + 1}**:
* Location: **${p.country || 'Any'}** - **${p.region || ''}**
* Property Type: **${p.type || 'Any'}**
* Price Range: **${p.priceRange || 'Any'}**
* Specifics: **${p.other || 'None'}**
`).join('\n');
        } else {
            // Fallback for old single format
            purposeText = `
* Country: **"${criteria?.targetCountry || 'Any'}"**
* Price range: **"${criteria?.priceRange || 'Any'}"**
* Property type: **"${criteria?.propertyType || 'Any'}"**
`;
        }

        return `# PROPERTY SEARCH MANDATE AGREEMENT FOR INVESTMENT

**In ${signingPlace}, on ${formattedDate}**

## PARTIES

On the one hand,

**URBINA AGENCY LLC**, a company duly incorporated and registered in the State of New Mexico, United States of America... (operating through **[forinvestors.org](http://www.forinvestors.org)**).

And on the other hand,

**"${clientName}"**, identified with **"${clientID}"**, with registered address at **"${clientAddress}"**, hereinafter referred to as **"THE CLIENT"**.

## RECITALS

1. THE CLIENT is interested in the **search and analysis of real estate investment opportunities**, validated by a total declared Investment Capacity of **${capacity}**.
2. URBINA AGENCY professionally engages in the identification of assets...

## CLAUSES

### 1. Purpose of the agreement (Search Mandate)
THE CLIENT grants URBINA AGENCY a mandate to identify opportunities meeting the following criteria:

${purposeText}

### 3. Term
**SIX (6) MONTHS**, automatic termination unless renewed.

### 5. URBINA AGENCY’s fee
**SEVEN PERCENT (7%)** of acquisition price + taxes.

### 6. Payment Instructions
All fees shall be paid to the following account:
${BANK_DETAILS}

...


**URBINA AGENCY LLC**               **THE CLIENT**
[System Signed]                     [See Signature Below]
`;
    };

    const generateSaleMandate = () => {
        const property = sellerData?.property || {};
        const owners = sellerData?.owners || [];
        const ownersList = owners.map(o => `**${o.name}** (ID: ${o.idNumber}, ${o.percent}%)`).join(' and ');

        return `# EXCLUSIVE SALES MANAGEMENT MANDATE

**In Online Mode, on ${formattedDate}**

## PARTIES

**URBINA AGENCY LLC** (The Agency)...
And
**THE OWNERS**: ${ownersList}, legal owners of the property at **${property.address || 'TBD'}**.

## CLAUSES

### 1. Object
EXCLUSIVE MANDATE to manage the sale of the Property.
**Target Price**: €${property.price || 'TBD'}.

### 2. Term & Exclusivity
**SIX (6) MONTHS**. Strict Exclusivity.

### 3. Collaboration
URBINA AGENCY Authorized to collaborate with network agencies.

### 4. Fees (Commission)
**SEVEN PERCENT (7%)** of sale price + VAT.
Payable within **15 business days**.

### 5. Payment Details
${BANK_DETAILS}

...


**URBINA AGENCY LLC**               **THE OWNERS**
[System Signed]                     [See Signature Below]
`;
    };

    const generateAgencyAgreement = () => {
        const ag = agencyData || {};

        return `# AGENCY COLLABORATION AGREEMENT

**In Online Mode, on ${formattedDate}**

## PARTIES

**URBINA AGENCY LLC** (Platform Owner)...
And
**${ag.companyName || 'PARTNER AGENCY'}** (The Partner), Tax ID **${ag.taxId}**, represented by **${ag.repName}** (${ag.repId}).

## RECITALS
Both entities are empowered to manage real estate transactions and wish to collaborate via **[forinvestors.org](http://www.forinvestors.org)**.

## CLAUSES

### 1. Object
Mutual collaboration for the sale of real estate assets.
* The Partner uploads properties to the Platform -> Deemed as shared collaboration.
* Urbina Agency provides Investors for said properties.

### 2. Duration
**INDEFINITE**. Valid until either party terminates their account on the Platform.

### 3. Obligations
The Partner MUST upload the specific "Sales Mandate" and "Commission Agreement" for each property they list on the Platform.

### 4. Fees & Commission Split
In the event of a successful sale where the Buyer is introduced by Urbina Agency/Platform:
**FIFTY PERCENT (50%)** of the total commission received by The Partner from the seller.
Plus applicable taxes.

### 5. Payment Terms
The Partner shall pay Urbina Agency within **15 Business Days** of receiving their commission.
Payment to:
${BANK_DETAILS}

...

**URBINA AGENCY LLC**               **PARTNER AGENCY**
[System Signed]                     [See Signature Below]
`;
    };

    const getContractContent = () => {
        if (contractType === 'sale_mandate') return generateSaleMandate();
        if (contractType === 'agency_collaboration') return generateAgencyAgreement();
        return generateBuyMandate();
    };

    useEffect(() => {
        checkExistingContract();
    }, []);

    const checkExistingContract = async () => {
        try {
            const { data, error } = await supabase
                .from('contracts')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setExistingSignature(data.signature_url);
                setSigned(true);
            }
        } catch (err) {
            // No contract found
        } finally {
            setLoading(false);
        }
    };

    const handleSignatureSave = async (signatureDataUrl) => {
        setLoading(true);
        try {
            const contractText = getContractContent();

            // Build insert data based on type
            const insertData = {
                user_id: user.id,
                type: contractType,
                signature_url: signatureDataUrl,
                signed_at: new Date().toISOString(),
                contract_text: contractText,
            };

            // Store specific metadata in 'criteria' JSONB column
            if (contractType === 'buy_mandate') insertData.criteria = criteria;
            else if (contractType === 'sale_mandate') insertData.criteria = sellerData;
            else if (contractType === 'agency_collaboration') insertData.criteria = agencyData;

            // Handle ID URL for investors (others uploaded separately)
            if (idUrl) insertData.id_url = idUrl;

            const { error } = await supabase
                .from('contracts')
                .insert([insertData]);

            if (error) throw error;

            setSigned(true);
            setExistingSignature(signatureDataUrl);
            if (onSuccess) onSuccess();

        } catch (err) {
            console.error('Error saving contract:', err);
            alert('Error saving signature. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white text-center p-10"><Loader2 className="animate-spin inline mr-2" /> Loading contract...</div>;

    if (signed && mode === 'standalone') {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-midnight-900 border border-green-500/30 rounded-xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-500/20 rounded-full text-green-500">
                        <CheckCircle size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement Active</h2>
                <div className="bg-white/5 p-4 rounded-lg inline-block text-left max-w-lg mx-auto w-full">
                    <img src={existingSignature} alt="Signature" className="bg-white rounded p-2 h-20 border border-gray-600 mb-2" />
                    <p className="text-xs text-gray-400">Signed on {formattedDate}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-midnight-800 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-gold-500" size={28} />
                    <h1 className="text-2xl font-bold text-white">
                        {contractType === 'sale_mandate' ? 'Exclusive Sales Mandate' :
                            contractType === 'agency_collaboration' ? 'Agency Collaboration Agreement' :
                                'Property Search Mandate'}
                    </h1>
                </div>

                <div className="bg-white text-black p-8 rounded shadow-inner h-[500px] overflow-y-auto font-serif text-sm leading-relaxed mb-8">
                    <div className="whitespace-pre-wrap font-serif" dangerouslySetInnerHTML={{ __html: getContractContent().replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>') }} />
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg mb-8 flex gap-3">
                    <AlertCircle className="text-yellow-500 shrink-0" />
                    <p className="text-sm text-gray-300">
                        By signing below, you acknowledge and agree to the terms herein.
                    </p>
                </div>

                <SignaturePad onSave={handleSignatureSave} />

                {onBack && (
                    <button onClick={onBack} className="mt-4 text-gray-500 hover:text-white text-sm">
                        Back to Previous Step
                    </button>
                )}
            </div>
        </div>
    );
}
