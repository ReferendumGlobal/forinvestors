
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SignaturePad from './SignaturePad';
import { FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContractSign({ mode = 'standalone', contractType = 'buy_mandate', criteria, sellerData, idUrl, onSuccess, onBack }) {
    const { profile, user } = useAuth();
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contractUrl, setContractUrl] = useState(null);
    const [existingSignature, setExistingSignature] = useState(null);

    // Common Date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // --- TEMPLATE GENERATORS ---

    const generateBuyMandate = () => {
        const signingPlace = criteria?.signingPlace || "Online";
        const clientName = profile?.full_name || criteria?.companyName || "Client Name";
        const clientID = criteria?.idNumber || "ID/Passport";
        const clientAddress = criteria?.address || "Address";
        const actingEntity = criteria?.companyName || "N/A";

        return `# PROPERTY SEARCH MANDATE AGREEMENT FOR INVESTMENT

**In ${signingPlace}, on ${formattedDate}**

## PARTIES

On the one hand,

**URBINA AGENCY LLC**, a company duly incorporated and registered in the State of New Mexico, United States of America, with Employer Identification Number (E.I.N.) **61-2276664**, having its business address at **7345 W Sand Lake Rd, Ste 210, Office 7997, Orlando, FL 32819, United States**, hereinafter referred to as **"URBINA AGENCY"**, acting in its own name and right, and operating through its proprietary digital investment platform **[www.forinvestors.org](http://www.forinvestors.org)**.

And on the other hand,

**"${clientName}"**, identified with **"${clientID}"**, with registered address at **"${clientAddress}"**, acting in its own name and right or on behalf of the entity **"${actingEntity}"**, hereinafter referred to as **"THE CLIENT"**.

Both parties, recognizing each other’s legal capacity to enter into this agreement,

## RECITALS

1. THE CLIENT is interested in the **search and analysis of real estate investment opportunities**, with no obligation to purchase.
2. URBINA AGENCY professionally engages in the **identification, analysis, and presentation of real estate assets for investors**, using its digital platform **[www.forinvestors.org](http://www.forinvestors.org)**.
3. The parties wish to formalize their relationship through this **Property Search Mandate Agreement**, which shall be governed by the following:

## CLAUSES

### 1. Purpose of the agreement

THE CLIENT hereby grants URBINA AGENCY a **search mandate** to identify and present real estate investment opportunities that, as far as possible, meet the following criteria:

* Country: **"${criteria?.targetCountry || 'Any'}"**
* Region / State / Province: **"${criteria?.targetRegion || 'Any'}"**
* City or Municipality: **"${criteria?.targetCity || 'Any'}"**
* Property type: **"${criteria?.propertyType || 'Any'}"**
* Intended use: **"${criteria?.intendedUse || 'Any'}"**
* Price range: **"${criteria?.priceRange || 'Any'}"**
* Target return (if applicable): **"${criteria?.targetReturn || 'N/A'}"**
* Other relevant characteristics: **"${criteria?.otherCharacteristics || 'None'}"**

These criteria are **indicative only** and shall not be considered binding.

---

### 2. Platform and process

All search activities, asset presentations, communications, and exchanges of information shall be carried out **exclusively through the platform owned by URBINA AGENCY LLC**, accessible at **[www.forinvestors.org](http://www.forinvestors.org)**, unless expressly agreed otherwise in writing.

---

### 3. Term of the mandate

This agreement shall have a duration of **SIX (6) MONTHS**, starting from the date of signature.

Upon expiration, the agreement shall automatically terminate unless expressly renewed in writing by both parties.

---

### 4. Nature of the mandate and no obligation to purchase

1. This agreement is **non-exclusive** and does **not impose any obligation to purchase** on THE CLIENT.
2. THE CLIENT shall **always retain final decision-making authority** regarding whether or not to acquire any asset presented by URBINA AGENCY.
3. The presentation of investment opportunities does not create any commitment unless and until THE CLIENT voluntarily decides to proceed with an acquisition.

---

### 5. URBINA AGENCY’s fee

1. Should THE CLIENT ultimately acquire a real estate asset presented by URBINA AGENCY during the term of this mandate or within **twelve (12) months after its expiration**, URBINA AGENCY shall be entitled to a fee equal to:

**SEVEN PERCENT (7%)** of the final acquisition price of the asset,

**plus any applicable taxes**, where relevant.

2. The fee shall become due and payable upon execution of the purchase agreement or any binding document leading to the acquisition of the asset.

3. Payment of the fee shall be made to URBINA AGENCY LLC using the following bank details:

* **For international wire transfers (outside the United States):**
  Account Number: **692101525685**
  SWIFT Code: **CLNOUS66**

* **For domestic transfers within the United States:**
  Account Number: **692101525685**
  Routing Number: **121145307**

---

### 6. Obligations of URBINA AGENCY

URBINA AGENCY undertakes to:

* Act in good faith and with professional diligence.
* Analyze and present opportunities aligned with THE CLIENT’s investment profile.
* Provide available and relevant information regarding the assets presented.

URBINA AGENCY does **not guarantee** profitability, appreciation, or investment success.

---

### 7. Obligations of the client

THE CLIENT undertakes to:

* Provide accurate information regarding its investment criteria.
* Clearly communicate decisions concerning the assets presented.
* Pay the agreed fee in the event of an acquisition.

---

### 8. Confidentiality

Neither party shall disclose confidential information without consent.

---

### 10. Governing law and jurisdiction

This agreement shall be governed by the laws of New Mexico, USA.

---

**URBINA AGENCY LLC**
Signature: _[Digitally Signed by System]_

**THE CLIENT**
Signature: _[See Digital Signature Below]_
Name: **"${clientName}"**
`;
    };

    const generateSaleMandate = () => {
        const property = sellerData?.property || {};
        const owners = sellerData?.owners || [];
        const ownersList = owners.map(o => `**${o.name}** (ID: ${o.idNumber}, Ownership: ${o.percent}%)`).join(' and ');

        return `# EXCLUSIVE SALES MANAGEMENT MANDATE

**In Online Mode, on ${formattedDate}**

## PARTIES

**URBINA AGENCY LLC** (The Agency), operating **[forinvestors.org](http://www.forinvestors.org)**.

And

**THE OWNERS**: ${ownersList}, legal owners of the property located at **${property.address || 'TBD'}**.

## RECITALS

1. THE OWNERS are the legal holders of the property described above.
2. URBINA AGENCY manages a database of investors through **forinvestors.org**.

## CLAUSES

### 1. Object
THE OWNERS grant URBINA AGENCY an **EXCLUSIVE MANDATE** to manage the sale of the Property.
**Target Price**: €${property.price || 'TBD'} (Subject to offers).

### 2. Term & Exclusivity
Duration: **SIX (6) MONTHS** from signature.
Exclusivity: The Owners agree NOT to market the property through other intermediaries during this period.
Exclusivity does NOT prevent the Owners from selling directly if the buyer does NOT come from Urbina Agency, BUT for 6 months Urbina is the sole *agency* mandated. (Or "Strict Exclusivity" if preferred. Assuming standard strict agency exclusivity).

### 3. Collaboration Authorization
URBINA AGENCY is expressly authorized to **delegate or collaborate with other real estate agencies** within the **forinvestors.org** network to facilitate the sale. Urbina Agency will share its commission with such collaborators, at no extra cost to THE OWNERS.

### 4. Fees (Commission)
In the event of a successful sale:
**SEVEN PERCENT (7%)** of the final sale price + VAT/Taxes.
Payable within **15 business days** of the Deed of Sale (Escritura Publica).

### 5. Account for Payment
Bank transfers to URBINA AGENCY LLC:
* **For international wire transfers (outside the United States):**
  Account Number: **692101525685**
  SWIFT Code: **CLNOUS66**

---

IN WITNESS WHEREOF, the parties sign this agreement.

**URBINA AGENCY LLC**
Signature: _[Digitally Signed by System]_

**THE OWNERS**
All owners listed above signify their agreement through the representative signature below.

Signature: _[See Digital Signature Below]_
`;
    };

    const getContractContent = () => {
        if (contractType === 'sale_mandate') return generateSaleMandate();
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
            // Data to save
            const insertData = {
                user_id: user.id,
                type: contractType,
                signature_url: signatureDataUrl,
                signed_at: new Date().toISOString(),
                contract_text: contractText,
                criteria: contractType === 'buy_mandate' ? criteria : sellerData,
                id_url: contractType === 'buy_mandate' ? idUrl : null // Seller docs are uploaded separately
            };

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
                <h2 className="text-2xl font-bold text-white mb-4">Mandate Active</h2>
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
                        {contractType === 'sale_mandate' ? 'Exclusive Sales Mandate' : 'Property Search Mandate'}
                    </h1>
                </div>

                <div className="bg-white text-black p-8 rounded shadow-inner h-[500px] overflow-y-auto font-serif text-sm leading-relaxed mb-8">
                    <div className="whitespace-pre-wrap font-serif" dangerouslySetInnerHTML={{ __html: getContractContent().replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>') }} />
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg mb-8 flex gap-3">
                    <AlertCircle className="text-yellow-500 shrink-0" />
                    <p className="text-sm text-gray-300">
                        By signing below, you acknowledge and agree to the terms, including exclusivity and fees.
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
