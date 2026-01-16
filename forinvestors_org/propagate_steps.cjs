const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const enContent = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const sellersSteps = enContent.steps.sellers;
const sellersTitle = enContent.steps.sellers_title;
const sellersSubtitle = enContent.steps.sellers_subtitle;

fs.readdirSync(localesDir).forEach(file => {
    if (file === 'en.json' || !file.endsWith('.json')) return;

    try {
        const filePath = path.join(localesDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Ensure 'steps' object exists
        if (!content.steps) content.steps = {};

        // Add sellers steps if missing
        if (!content.steps.sellers) {
            console.log(`Adding sellers steps to ${file}...`);
            content.steps.sellers = sellersSteps;
            content.steps.sellers_title = sellersTitle;
            content.steps.sellers_subtitle = sellersSubtitle;

            // Write back to file
            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
        } else {
            console.log(`Sellers steps already exist in ${file}.`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
});
