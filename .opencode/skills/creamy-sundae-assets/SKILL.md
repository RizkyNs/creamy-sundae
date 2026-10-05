---
name: creamy-sundae-assets
description: Use when creating, reviewing, processing, registering, or integrating Creamy Sundae game assets. Follow the project's pixel-art style guide, asset staging workflow, provenance rules, and Phaser manifest/checker requirements.
---

# Creamy Sundae Asset Workflow

Use this skill for any asset task in the Creamy Sundae repository, including AI-generated asset review, pixel-art production, sprite states, UI art, customer expressions, containers, toppings, stations, and animation frames.

## Source of truth

Before creating or modifying an asset, read:

1. `assets-work/prompts/STYLE_GUIDE.md` — visual direction and production rules.
2. `assets-work/prompts/REFERENCE_INDEX.md` — uploaded preference references.
3. `public/assets/ASSET_GUIDELINES.md` — runtime conventions.
4. `src/game/data/assets.js` — existing runtime registry and Phaser keys.
5. The relevant Phaser scene/system that consumes the asset.

The Gemini-generated images under `assets-work/prompts/` are preference references only. They are not final artwork, exact character sheets, or runtime files. Use them to guide mood, composition, silhouette, palette, expression range, and layout direction. Do not copy them into `public/assets/` or treat approximate character references as locked specifications.

## Asset lifecycle

```text
preference/reference
  ↓
visual analysis and prompt/specification
  ↓
assets-work/raw/              # generated/imported source; local and ignored
  ↓
review for artifacts, license, silhouette, transparency, and consistency
  ↓
assets-work/reviewed/
  ↓
crop, cleanup, resize, nearest-neighbor normalization
  ↓
assets-work/processed/
  ↓
copy approved runtime PNG to public/assets/
  ↓
register in src/game/data/assets.js
  ↓
npm run assets:check
  ↓
integrate and visually verify in Phaser
```

Never place an unreviewed generated image directly in `public/assets/`. Never commit secrets, API keys, or assets with unclear usage rights.

## Visual rules

- Target: cozy, colorful, cute, friendly, readable seaside dessert-shop pixel art.
- Prefer hard-edged pixel clusters, limited palette, nearest-neighbor scaling, and no accidental anti-aliasing.
- Use warm dark-brown outlines instead of pure black for most objects; suggested outline is `#4A2810`.
- Use consistent upper-left lighting, silhouette language, outline thickness, and pixel density within an asset family.
- Keep important silhouettes readable at gameplay size.
- Food and containers may be chunky and slightly oversized for touch readability.
- UI must preserve order, station, patience, and Serve readability.
- Modal overlays must render above gameplay objects and block interaction behind them.

Starting palette:

```text
outline   #4A2810    cocoa     #8B5A3C
cream     #FFF5D6    strawberry #FFA6B6
skin      #F1C27D    panel     #FDF6EC
counter   #E8C49D    header    #D9B8A0
success   #4CAF50    warning   #FF9800
failure   #F44336    cola      #3D1D11
lemon     #FBC02D
```

These are prototype direction values, not final locked art decisions.

## Runtime conventions

- Runtime object and character art should be transparent PNG unless there is a concrete reason to use another format.
- Use lowercase `snake_case` filenames.
- Small icon/ingredient: 32×32 or 48×48.
- Cup, cone, topping: 48×48 or 64×64.
- Station/decor: 96×96 to 192×192.
- Customer portrait/full sprite: use one shared canvas and anchor across states; current prototype customer states use 128×160.
- Every animation frame in a family must use the same canvas dimensions and anchor.
- Keep editable/source files in `assets-work/processed/` and runtime copies in `public/assets/`.
- Register every runtime file in `src/game/data/assets.js` with key, path, category, status, source, and license/provenance.
- Use one Phaser key per runtime asset; never create duplicate keys.

## AI-generated assets

If an image-generation API or MCP tool is available:

1. Write an original prompt using the style guide; do not request a copy of a reference image.
2. Specify transparent background, no text, no watermark, desired canvas, pixel-art direction, lighting, outline, and state.
3. Save raw output to `assets-work/raw/`.
4. Review anatomy, artifacts, accidental text, background remnants, consistency, and permitted usage.
5. Process the image to the required canvas and nearest-neighbor scale.
6. Record generator/source and license/terms in the manifest or companion metadata.

For the repository's keyless Pollinations draft path, use:

```bash
npm run assets:generate -- customer_01 "original cozy pixel art ice cream shop customer, transparent background, no text, no watermark"
```

The command saves a timestamp/seeded PNG to ignored `assets-work/raw/`. Pollinations output is a raw draft and may have a background, artifacts, text, or inconsistent anatomy; it must not be copied directly to `public/assets/` without review and processing.

If no image-generation tool is available, do not claim procedural SVG/PNG artwork is AI-generated. Clearly label it as original project artwork or prototype procedural artwork.

## Customer state assets

For customer expressions, keep the same character silhouette, clothing, hair, anchor, and canvas. Change facial/pose signals rather than redesigning the character between states. The current expression direction is:

```text
neutral → happy
neutral → impatient → angry
```

Customer role, name, identity, and final proportions remain open unless the user explicitly locks them.

## Validation checklist

Before calling an asset complete:

- [ ] Role/state and filename are clear.
- [ ] Asset follows `STYLE_GUIDE.md`.
- [ ] Transparency and crop are correct.
- [ ] Canvas, anchor, and pixel density match its family.
- [ ] Source/generator and license/provenance are documented.
- [ ] Approved runtime copy is in `public/assets/`.
- [ ] Asset is registered in `src/game/data/assets.js`.
- [ ] `npm run assets:check` passes.
- [ ] `npm run build` passes when loader or runtime code changed.
- [ ] Asset is visually checked in the actual Phaser scene.
- [ ] Documentation is updated if a new asset family, state, or design decision was added.

## Commands

From the project root:

```bash
npm run assets:check
npm run build
```

For screenshot analysis, use the repository fallback when a vision-capable OpenCode attachment path is unavailable:

```bash
npm run screenshot:analyze -- "path/to/screenshot.png" "Your visual review prompt"
```

The command reads `ZROUTER_API_KEY` from the environment or ignored local `.env`. Never print or commit the key.

## Definition of done

An asset task is complete only after the asset is visually suitable for its current prototype status, registered, validated, integrated where requested, and documented. A `prototype-approved` asset is not final art and must not be described as final art.
