import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const [name, ...promptParts] = process.argv.slice(2);

if (!name) {
    console.error('Usage: npm run assets:generate -- <asset-name> [prompt]');
    console.error('Example: npm run assets:generate -- customer_01 "cozy pixel art ice cream shop customer"');
    process.exit(2);
}

const prompt = promptParts.join(' ').trim() || [
    'original Creamy Sundae game asset, cozy colorful cute pixel art ice cream shop',
    'clear silhouette, warm brown outline, limited warm dessert palette, upper-left lighting',
    'transparent background, no text, no logo, no watermark'
].join(', ');

const width = Number(process.env.POLLINATIONS_WIDTH || 128);
const height = Number(process.env.POLLINATIONS_HEIGHT || 160);
const seed = process.env.POLLINATIONS_SEED || Math.floor(Math.random() * 1_000_000_000);
const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: 'true'
});
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;
const rawDir = path.join(process.cwd(), 'assets-work', 'raw');
const outputPath = path.join(rawDir, `${name}_${seed}.png`);

await fs.mkdir(rawDir, { recursive: true });
console.log(`Generating raw Pollinations asset: ${name}`);
console.log(`Prompt: ${prompt}`);

const response = await fetch(url);
if (!response.ok) {
    console.error(`Pollinations request failed: HTTP ${response.status}`);
    process.exit(1);
}

const buffer = Buffer.from(await response.arrayBuffer());
const pngBuffer = await sharp(buffer).png().toBuffer();
await fs.writeFile(outputPath, pngBuffer);
const metadata = await sharp(pngBuffer).metadata();

console.log(`Saved: ${path.relative(process.cwd(), outputPath)}`);
console.log(`Image: ${metadata.format}, ${metadata.width}x${metadata.height}, ${pngBuffer.length} bytes`);
console.log('Status: raw draft only; review, process, register, and validate before runtime use.');
