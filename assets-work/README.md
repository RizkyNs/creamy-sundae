# Asset Work Area

Folder kerja untuk membuat dan memproses asset sebelum dipakai runtime.

```text
assets-work/
├── prompts/    # Prompt dan referensi pembuatan asset
├── raw/        # Hasil mentah; di-ignore oleh Git
├── reviewed/   # Hasil yang sudah lolos review visual
├── processed/  # Hasil crop/resize/optimasi sebelum dipindah ke public/assets
└── rejected/   # Hasil yang tidak dipakai; di-ignore oleh Git
```

Asset runtime yang sudah disetujui harus dipindahkan ke `public/assets/`, didaftarkan di `src/game/data/assets.js`, lalu diperiksa dengan:

```bash
npm run assets:check
```

Jangan menaruh API key, secret, atau asset berlisensi tidak jelas di folder ini.

Referensi visual yang sudah diunggah dicatat di `prompts/REFERENCE_INDEX.md`. Folder referensi tetap menjadi bahan desain dan tidak otomatis dianggap sebagai asset runtime.

`prompts/STYLE_GUIDE.md` menerjemahkan referensi Gemini menjadi aturan produksi: target pixel-art, bentuk, outline, palet awal, UI, karakter, ukuran sprite, workflow AI, provenance, dan definition of done.

Workflow ini juga tersedia sebagai project skill portable di `.opencode/skills/creamy-sundae-assets/SKILL.md`. File tersebut ikut Git sehingga dapat dipakai setelah clone repository di workspace OpenCode lain.
