# Creamy Sundae — Visual Style Guide

## 1. Purpose and reference status

This guide translates the uploaded Gemini-generated images into a consistent visual direction for future Creamy Sundae assets.

The uploaded images are **preference references**, not final production assets, exact character sheets, or assets to copy directly. They communicate the desired mood, composition, expression range, and visual language. New assets must be redrawn or generated as original project assets and then reviewed before entering `public/assets/`.

Reference sources currently available:

- Gameplay/shop screen reference: `screen or UI reference/Main screen atau lebih tepatnya game screen.jpg`.
- Character expression references: the Char 1, Char 2, and Char 3 files in `chars reference/`.
- Character and animation direction references: the `Preferensi ...` files in `chars reference/`.

The character reference is intentionally marked as approximate. Character identity, role, proportions, and final sprite design remain open decisions.

## 2. Target visual identity

### Keywords

```text
cozy · colorful · cute · friendly · dessert shop · readable · playful · pixel-inspired
```

The game should feel like operating a welcoming neighborhood ice-cream stand. The visual language should support quick decisions during the order/make/serve loop, especially on a touch screen.

### Pixel-art direction

- Use deliberate pixel clusters rather than smooth vector-like gradients.
- Prefer hard-edged color blocks and a limited palette.
- Use nearest-neighbor scaling for pixel assets.
- Avoid accidental anti-aliasing, blurry outlines, and mixed pixel densities.
- Keep important silhouettes recognizable at the smallest intended display size.
- Use stylized pixel art as the target; the current Phaser shapes remain valid prototype placeholders.

## 3. Shape language

- Use rounded, soft silhouettes for food, cups, buttons, and friendly characters.
- Use simple geometric construction: circles, rounded rectangles, cones, scoops, and chunky sign shapes.
- Avoid sharp or aggressive silhouettes except for small feedback accents such as alert marks.
- Food should look tactile and slightly oversized so it reads clearly in a busy counter scene.
- Characters should have a clear head/face silhouette and expressions readable without relying on tiny details.

## 4. Line and outline rules

- Use a dark warm brown outline instead of pure black for most objects.
- Suggested outline color: `#4A2810` or a nearby palette color.
- Use a consistent outline thickness within an asset family.
- For small sprites, use approximately 1–2 source pixels; for larger character sprites, use approximately 2–4 source pixels.
- Use a darker local shade for interior separation instead of outlining every decorative pixel.
- Do not mix a soft airbrushed outline with hard pixel-art objects.

## 5. Color direction

The palette should be warm and dessert-oriented. These are starting colors, not locked final values:

| Role | Color | Use |
|---|---|---|
| Warm outline | `#4A2810` | Object and character outline |
| Cocoa brown | `#8B5A3C` | Chocolate, wood, soda, text accents |
| Cream paper | `#FFF5D6` | Vanilla, cup, highlights |
| Strawberry pink | `#FFA6B6` | Strawberry, happy accents |
| Peach skin | `#F1C27D` | Character placeholder skin range |
| Shop cream | `#FDF6EC` | Panels and display case |
| Counter tan | `#E8C49D` | Wood/counter base |
| Warm pink | `#D9B8A0` | Header and shop accents |
| Success green | `#4CAF50` | Ready, served, positive feedback |
| Warning orange | `#FF9800` | Patience warning and attention |
| Failure red | `#F44336` | Customer upset and wrong order |
| Cola dark | `#3D1D11` | Cola drink |
| Lemon yellow | `#FBC02D` | Lemon drink |

Guidelines:

- Keep most scenes warm and low-contrast enough that order text remains readable.
- Reserve saturated green, orange, and red for gameplay feedback.
- Add highlights with a lighter version of the local material color; do not use white highlights everywhere.
- A final palette should be consolidated after the first approved asset batch.

## 6. Materials and lighting

- Use one consistent light direction for the full game, recommended from upper-left.
- Vanilla: warm cream base, soft tan shadow, small pale highlight.
- Chocolate: cocoa base, deeper brown shadow, restrained warm highlight.
- Strawberry: pink base, berry-red shadow, pale pink highlight.
- Paper cup: cream base with a warm rim and subtle side shadow.
- Waffle cone: golden tan base with a darker diamond pattern and warm shadow.
- Wood/counter: tan base with brown edge bands; keep texture sparse at gameplay scale.
- Metal/soda station: limited cool gray accents may contrast with the warm shop palette.

## 7. UI and screen direction

The target long-term gameplay screen is the uploaded reference `screen or UI reference/Main screen atau lebih tepatnya game screen.jpg`. This is a visual direction, not a pixel-perfect layout specification. The existing prototype screen remains useful for validating the order/make/serve loop while the art and counter are migrated in deliberate steps.

### Long-term target screen

- Cozy seaside ice-cream stand with a bright beach visible behind the service counter.
- A scalloped awning and warm wooden framing establish the shop silhouette.
- A glass ice-cream display is the central visual anchor, with distinct flavor tubs and a visible scoop tool.
- Waffle cones, paper cups, prepared sundaes, and drink containers are arranged as readable service inventory along the counter.
- Soda dispensers sit in a distinct station zone.
- A compact player/profile and progression HUD sits at the top, with money/currency separated from the working area.
- Audrey is the player/menu mascot reference; customer identities and roles remain separate until explicitly decided.

The target reference includes a beach, shop architecture, and inventory composition that are not implemented yet. Build toward it through staged asset batches and layout updates; do not claim the current prototype already matches it.

### UI priorities

1. Customer and current order must be understood first.
2. Work stations and ingredient choices must be easy to locate.
3. Validation status and Serve action must be visually dominant when relevant.
4. Money, day, and patience should remain visible without competing with the order.
5. Decorative elements must never cover interactive targets or reduce text contrast.
6. Modal scenes/components must render above all game-world visuals and block both clicks and drags behind the overlay.

### UI treatment

- Use warm cream panels with dark brown borders.
- Use rounded/chunky buttons with large touch targets.
- Keep one primary action color for serving or continuing.
- Use consistent panel padding and corner treatment.
- Use icon plus text when an action may be ambiguous.
- Maintain a minimum practical touch target of roughly 44 CSS pixels where possible.

## 8. Character direction

The uploaded character expressions establish a useful customer feedback range:

```text
senang → sangat senang → hampir marah → marah
```

### Character requirements

- Expressions must read at a glance at gameplay size.
- Keep face, hair, clothing, and silhouette stable between emotion frames.
- Change eyebrows, eyes, mouth, cheek color, and small pose accents before changing the entire design.
- Happy states may use brighter eyes, lifted mouth corners, blush, or a small bounce accent.
- Almost-angry states should communicate impatience without looking hostile.
- Angry states can use red feedback accents, tense eyebrows, and a stronger pose while retaining the cute tone.
- Customer identity should remain distinct through silhouette, hair, clothing color, or accessory—not only skin tone.

### Open decisions

- Whether the referenced characters are customer variants, menu mascots, or both.
- Final names and personality traits.
- Final body proportions and sprite dimensions.
- Whether the animation references define idle/serve reactions or a future scooping character animation.

Until these decisions are made, use neutral labels such as `customer_01`, `customer_02`, and `customer_03`.

## 9. Asset production standards

### Recommended source and runtime sizes

| Asset family | Source canvas | Runtime guidance |
|---|---:|---|
| Small ingredient/icon | 32×32 or 48×48 | Preserve nearest-neighbor scaling |
| Cup, cone, topping | 48×48 or 64×64 | Center the interaction silhouette |
| Station/decor | 96×96 to 192×192 | Split into reusable pieces where useful |
| Customer portrait | 96×96 or 128×128 | Consistent face anchor |
| Customer full sprite | 96×128 or 128×160 | Same feet/base anchor across frames |
| Animation frame | Same as base sprite | Never change canvas size between frames |

These are starting standards. A final target resolution should be confirmed after one test asset is integrated in the actual game canvas.

### File rules

- Runtime object/character art: PNG with transparency.
- Use lowercase `snake_case` filenames.
- One asset, one purpose; avoid embedding multiple unrelated objects in one image.
- Keep animation frames in a dedicated folder and use numbered suffixes: `_000`, `_001`, `_002`.
- Register every runtime asset in `src/game/data/assets.js`.
- Include source/generator and license/provenance metadata in the registry or its companion record.

## 10. AI-generated reference and asset workflow

```text
Gemini preference reference
        ↓
visual analysis and style notes
        ↓
original prompt for a new asset
        ↓
raw generation in assets-work/raw/
        ↓
visual review for silhouette, transparency, and consistency
        ↓
crop / resize / cleanup in assets-work/processed/
        ↓
approved runtime asset in public/assets/
        ↓
manifest registration
        ↓
npm run assets:check
        ↓
Phaser integration and in-game review
```

The reference image itself must not be treated as a production sprite. AI-generated output must be reviewed for artifacts, accidental text, inconsistent anatomy, background remnants, and license/terms suitability.

## 11. Definition of done for an asset

An asset is ready for runtime only when:

- Its role and state are named.
- It follows the palette, outline, lighting, and pixel-density rules.
- The silhouette reads at the intended game scale.
- Transparency and crop are correct.
- Animation frames share a canvas and anchor when applicable.
- The source/generator and usage permission are documented.
- It is copied to `public/assets/`.
- It is registered in `src/game/data/assets.js`.
- `npm run assets:check` passes.
- It has been visually checked in the Phaser scene.

## 12. First approved asset batch

Do not generate the full asset library yet. First approve a small style test:

1. Paper cup.
2. Vanilla scoop.
3. One neutral customer portrait.
4. One happy and one almost-angry expression frame.
5. One small counter/decor element.

After this batch is integrated and reviewed in-game, freeze the palette, sprite scale, outline thickness, and anchor conventions before expanding to cone, toppings, customer variants, and scooping animation.
