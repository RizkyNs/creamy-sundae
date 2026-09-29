# Visual Reference Index

These files are design references only. They are not runtime game assets and must not be loaded by Phaser directly.

## Screen / UI reference

- `screen or UI reference/Main screen atau lebih tepatnya game screen.jpg`
  - Reference type: gameplay/shop screen layout.
  - File format: JPEG.
  - Resolution: 1080×608.
  - Status: preference reference; not approved production art.

## Character references

Folder: `chars reference/`

### Character expression references

- `Char 1 ekspresi senang.png`
- `Char 1 ekspresi sangat senang.png`
- `Char 1 ekspresi hampir marah.png`
- `Char 1 ekspresi marah.png`
- `Char 2, ekspresi senang.png`
- `Char 2, ekspresi hampir marah.png`
- `Char 2, ekspresi marah.png`
- `Char 3 senang.png`
- `Char 3 hampir marah.png`
- `Char 3 marah.png`

### Character and animation direction references

- `Preferensi chars (belum akurat).jpg`
- `Preferensi animasi 1 (belum pasti).png`
- `Preferensi animasi 2(belum pasti).png`
- `Preferensi animasi 3 (belum pasti).png`

The character images are currently marked as approximate preferences, not final character specifications. Their gameplay role, names, proportions, sprite dimensions, and final visual style still need confirmation before production assets are generated.

## Intended use

1. Use the screen reference to extract layout, visual hierarchy, colors, and interaction zones.
2. Use the character references to define expression states and customer feedback states.
3. Create a style guide and one approved test asset before generating a full asset set.
4. Copy only reviewed and approved runtime assets to `public/assets/`.
5. Register approved runtime assets in `src/game/data/assets.js` and run `npm run assets:check`.

The detailed translation from these preferences into production rules is maintained in `STYLE_GUIDE.md` in this folder.
