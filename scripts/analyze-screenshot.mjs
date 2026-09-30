import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const [imageArgument, ...promptParts] = process.argv.slice(2);

if (!imageArgument) {
    console.error('Usage: npm run screenshot:analyze -- <image-path> [prompt]');
    process.exit(2);
}

const imagePath = path.resolve(process.cwd(), imageArgument);
const prompt = promptParts.join(' ').trim() || [
    'Analisis screenshot game Creamy Sundae ini secara visual.',
    'Jelaskan elemen yang terlihat, posisi cup dan scoop, layering, ukuran, alignment,',
    'masalah yang tampak, lalu berikan saran perubahan kode yang konkret.'
].join(' ');

function parseEnvFile (text)
{
    const values = {};
    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (!match) continue;
        const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
        values[match[1]] = value;
    }
    return values;
}

let apiKey = process.env.ZROUTER_API_KEY;
if (!apiKey) {
    try {
        const envText = await fs.readFile(path.join(process.cwd(), '.env'), 'utf8');
        apiKey = parseEnvFile(envText).ZROUTER_API_KEY;
    } catch {
        // The error below gives a concise setup hint without exposing secret data.
    }
}

if (!apiKey) {
    console.error('ZROUTER_API_KEY is missing. Set it in the environment or project .env file.');
    process.exit(2);
}

let imageBuffer;
try {
    imageBuffer = await fs.readFile(imagePath);
} catch {
    console.error(`Could not read image file: ${imagePath}`);
    process.exit(2);
}

const extension = path.extname(imagePath).toLowerCase();
const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
};
const mimeType = mimeTypes[extension];

if (!mimeType) {
    console.error('Supported image formats: JPG, PNG, WEBP, GIF.');
    process.exit(2);
}

const maxImageBytes = 15 * 1024 * 1024;
if (imageBuffer.length > maxImageBytes) {
    console.error('Image exceeds the 15 MB limit. Resize or compress it before analysis.');
    process.exit(2);
}

console.log(`Analyzing ${path.basename(imagePath)} with zrouter/gpt-6-luna...`);

let response;
try {
    response = await fetch('https://api.zrouter.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-6-luna',
            messages: [{
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:${mimeType};base64,${imageBuffer.toString('base64')}`
                        }
                    }
                ]
            }]
        })
    });
} catch (error) {
    console.error(`Request to Zrouter failed: ${error.message}`);
    process.exit(1);
}

const responseText = await response.text();
let payload;
try {
    payload = JSON.parse(responseText);
} catch {
    console.error(`Zrouter returned a non-JSON response (HTTP ${response.status}).`);
    process.exit(1);
}

if (!response.ok) {
    const message = payload?.error?.message || `HTTP ${response.status}`;
    console.error(`Zrouter request failed: ${message}`);
    process.exit(1);
}

const content = payload?.choices?.[0]?.message?.content;
if (typeof content === 'string') {
    console.log(`\n${content}`);
} else if (Array.isArray(content)) {
    const text = content.map((part) => part.text).filter(Boolean).join('\n');
    console.log(`\n${text || JSON.stringify(content, null, 2)}`);
} else {
    console.error('Zrouter response did not contain a readable text answer.');
    process.exit(1);
}
