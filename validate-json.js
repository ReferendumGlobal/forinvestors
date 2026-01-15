import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = ['src/locales/es.json', 'src/locales/en.json'];

files.forEach(file => {
    const filePath = path.resolve(__dirname, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        console.log(`✅ ${file} is VALID JSON`);
    } catch (e) {
        console.error(`❌ ${file} is INVALID JSON:`, e.message);
    }
});
