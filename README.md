# Creamy Sundae

Creamy Sundae adalah prototype game 2D casual cooking/time-management tentang mengelola gerai es krim. Pemain menerima pesanan, membuat es krim dan minuman, melayani customer sebelum kesabarannya habis, lalu mendapatkan uang dan tip.

## Teknologi

- Phaser 4.0.0
- Vite 6.3.x
- JavaScript ES Modules
- Target: browser desktop dan mobile/touch

Prototype saat ini menggunakan bentuk dasar Phaser (`rectangle`, `circle`, dan `text`) agar gameplay dapat divalidasi sebelum aset pixel art final dibuat.

Target jangka panjang visual gameplay adalah referensi gerai es krim tepi pantai di `assets-work/prompts/screen or UI reference/`. Saat ini referensi tersebut menjadi arah desain untuk backdrop, awning, display kaca, soda station, inventory counter, dan HUD; prototype belum mengimplementasikan seluruh tampilannya.

## Gameplay yang tersedia

1. Customer muncul dengan order.
2. Pemain membuat satu atau beberapa scoop es krim dengan drag-and-drop.
3. Pemain dapat membuat minuman Cola atau Lemon.
4. Resep divalidasi sebagai `KEEP BUILDING`, `ORDER READY`, atau `WRONG ORDER`.
5. Pesanan yang benar dapat disajikan.
6. Pemain memperoleh pendapatan dasar dan tip berdasarkan sisa kesabaran customer.
7. Customer berikutnya muncul sampai antrean hari selesai.
8. Rekap akhir hari memungkinkan memulai hari berikutnya.

Rasa yang tersedia: Vanilla, Chocolate, dan Strawberry. Order dapat berupa scoop tunggal, minuman saja, atau kombinasi beberapa scoop dan minuman. Ketiga scoop flavor memakai prototype PNG pixel-art. Jika tiga scoop masuk ke cup, susunannya berbentuk segitiga: scoop pertama kiri bawah, scoop kedua kanan bawah, scoop ketiga atas tengah; bagian atas ketiganya tetap terlihat di atas rim tanpa menutupi badan cup.

Batch asset berikutnya sekarang tersedia di registry: waffle cone, sprinkles, cherry, asset gelas kosong/Cola/Lemon, dan body Soda Fountain. Tombol station serta gelas minuman memakai asset, dan pemilihan Cola/Lemon menampilkan animasi stream singkat; cone dan topping menunggu integrasi ke sistem order/container.

Customer prototype `customer-01` memiliki empat expression state (neutral, happy, impatient, angry) pada PNG 128×160 yang lebih detail. Potret mengikuti sisa patience dan berubah happy saat order berhasil disajikan.

Serve action stays visually disabled (`BUILD ORDER`) until recipe validation reaches `ORDER READY`. The cup label/status and scoop position are arranged to fit inside the display panel.

## Status project

Sudah tersedia: main menu, layout counter, cup dan scoop drag-and-drop, tiga flavor, station minuman, order dan validasi resep, serve order, uang dan tip, customer queue, patience, siklus hari dengan rekapitulasi, serta modal shop upgrades di akhir hari.

Upgrade prototype yang tersedia: Patient Customers (+5 detik patience per level), Charming Service (+25% nilai tip per level), dan Shop Decor (mengubah tampilan counter). Upgrade dibeli dengan saldo dan memiliki level maksimum prototype.

Belum tersedia: save/load, cone vs cup variants, topping dan saus, alur menyendok realistis, aset pixel art final, audio, dan polish visual.

Harga, jumlah customer, durasi kesabaran, dan angka progresi lainnya masih merupakan **temporary prototype values**, bukan keputusan desain final.

## Struktur penting

```text
src/
├── main.js
└── game/
    ├── main.js
    └── scenes/
        ├── Boot.js
        ├── Preloader.js
        ├── MainMenu.js
        ├── Game.js       # Gameplay prototype saat ini
        └── GameOver.js
```

Sebagian besar logika gameplay masih berada di `src/game/scenes/Game.js`. Pemisahan ke systems/data/objects dilakukan ketika kompleksitas fitur membutuhkannya.

## Asset pipeline

- Runtime assets berada di `public/assets/`, dikelompokkan menurut kategori.
- Registry asset dan Phaser keys dikelola di `src/game/data/assets.js`.
- `Preloader` memuat image runtime dari registry tersebut.
- File mentah dan file yang ditolak dari proses pembuatan disimpan lokal di `assets-work/raw/` dan `assets-work/rejected/` (di-ignore Git).
- Gunakan `npm run assets:check` untuk memastikan file terdaftar tersedia, image terbaca, key unik, dan mendeteksi asset runtime yang belum didaftarkan.
- Standar gaya, dimensi, penamaan, dan provenance ada di `public/assets/ASSET_GUIDELINES.md`.

Tooling asset saat ini menggunakan `sharp` untuk membaca metadata/dimensi gambar dan `fast-glob` untuk menemukan file asset. Small approved batch pertama berisi prototype PNG pixel-art `container-paper-cup` dan `ingredient-vanilla-scoop`. Cup dan vanilla scoop ini sudah dipakai di gameplay; Chocolate dan Strawberry masih placeholder bentuk dasar.

## Screenshot visual analysis

Analyze a local screenshot using the configured Zrouter vision model and an optional custom prompt:

```bash
npm run screenshot:analyze -- "assets-work/prompts/screenshot.jpg" "Periksa apakah scoop tertutup cup dan sarankan posisi yang lebih baik."
```

If no prompt is provided, the script asks for a general gameplay visual review. It reads `ZROUTER_API_KEY` from the environment or local ignored `.env`; the key is never printed. Supported files: JPG, PNG, WEBP, GIF up to 15 MB.

## Menjalankan project

Dari `/root/creamy-sundae`:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 8080
```

Build production:

```bash
npm run build
```

Untuk development melalui mapping VPS yang tercatat, gunakan `http://139.99.122.214:20043` jika server berjalan pada port 8080.

Jika gameplay belum menampilkan label `ASSET BUILD: PNG PROTOTYPE`, browser masih menerima versi lama. Pastikan Vite dijalankan dari checkout terbaru pada VPS dan port 8080:

```bash
git pull --ff-only origin main
npm run dev -- --host 0.0.0.0 --port 8080
```

## Dokumentasi lanjutan

- `AGENTS.md` — aturan kerja, status milestone, dan roadmap.
- `HANDOVER.md` — kondisi teknis dan panduan melanjutkan project.
- `SESSION_CONTEXT.md` — kronologi perubahan dan audit status terbaru.
