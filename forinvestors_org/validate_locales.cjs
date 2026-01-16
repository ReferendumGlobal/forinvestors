const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const enContent = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const requiredKeys = ['agencies_page', 'forms'];

fs.readdirSync(localesDir).forEach(file => {
    if (file === 'en.json' || !file.endsWith('.json')) return;

    try {
        const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
        const missing = [];

        requiredKeys.forEach(key => {
            if (!content[key]) {
                missing.push(key);
            } else {
                // Check subkeys for agencies_page
                if (key === 'agencies_page') {
                    const enSubKeys = Object.keys(enContent.agencies_page);
                    const localSubKeys = Object.keys(content.agencies_page);
                    enSubKeys.forEach(subKey => {
                        if (!localSubKeys.includes(subKey)) {
                            missing.push(`agencies_page.${subKey}`);
                        }
                    });
                }
            }
        });

        if (missing.length > 0) {
            console.log(`File ${file} is missing keys:`, missing);
        } else {
            console.log(`File ${file} is OK.`);
        }
    } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
    }
});
