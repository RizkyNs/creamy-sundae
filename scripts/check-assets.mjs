import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const publicAssetDir = path.join(publicDir, 'assets');
const manifestPath = path.join(root, 'src', 'game', 'data', 'assets.js');
const manifestSource = await fs.readFile(manifestPath, 'utf8');
const assetMatches = [...manifestSource.matchAll(/key:\s*'([^']+)'[\s\S]*?file:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'/g)];
const assets = assetMatches.map(([, key, file, type]) => ({ key, file, type }));
const errors = [];
const keys = new Set();

for (const asset of assets) {
    if (keys.has(asset.key)) {
        errors.push(`duplicate Phaser key: ${asset.key}`);
    }
    keys.add(asset.key);

    const filePath = path.join(publicAssetDir, asset.file);
    try {
        await fs.access(filePath);
    } catch {
        errors.push(`${asset.key}: missing file ${asset.file}`);
        continue;
    }

    if (asset.type === 'image') {
        try {
            const metadata = await sharp(filePath).metadata();
            if (!metadata.width || !metadata.height) {
                errors.push(`${asset.key}: image has no dimensions`);
            }
            console.log(`✓ ${asset.key} (${metadata.format}, ${metadata.width}x${metadata.height})`);
        } catch (error) {
            errors.push(`${asset.key}: unreadable image (${error.message})`);
        }
    } else {
        console.log(`✓ ${asset.key} (${asset.type})`);
    }
}

const publicImages = await fg('**/*.{png,jpg,jpeg,webp,gif}', {
    cwd: publicAssetDir,
    onlyFiles: true
});
const registeredFiles = new Set(assets.map((asset) => asset.file));
const unregistered = publicImages.filter((file) => !registeredFiles.has(file));

for (const file of unregistered) {
    console.warn(`⚠ unregistered public asset: ${file}`);
}

if (assets.length === 0) {
    errors.push('manifest has no registered assets');
}

if (errors.length > 0) {
    console.error('\nAsset check failed:');
    errors.forEach((error) => console.error(`✗ ${error}`));
    process.exit(1);
}

console.log(`\nAsset check passed: ${assets.length} registered asset(s).`);
