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
