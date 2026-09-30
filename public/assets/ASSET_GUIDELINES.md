# Asset Guidelines

## Style target

- 2D colorful, cozy, cute, casual.
- Prototype boleh memakai bentuk dasar; asset final diarahkan ke pixel art/stylized 2D.
- Gunakan outline dan arah cahaya yang konsisten.
- Pertahankan palet warna hangat dengan aksen vanilla, chocolate, strawberry, cola, dan lemon.
- Referensi Gemini di `assets-work/prompts/` adalah preferensi visual, bukan asset final atau spesifikasi karakter yang terkunci.
- Detail lengkap bahasa visual, karakter, UI, pixel art, dan workflow produksi ada di `assets-work/prompts/STYLE_GUIDE.md`.

## Runtime conventions

- PNG dengan transparency untuk objek dan karakter.
- Gunakan nama lowercase dengan underscore, misalnya `container_paper_cup.png`.
- Asset kecil: 32x32 atau 48x48.
- Asset sedang: 64x64 atau 96x96.
- Customer: 96x128 atau 128x160.
- Semua frame satu animasi harus memiliki ukuran canvas yang sama dan anchor yang konsisten.
- Daftarkan setiap asset runtime di `src/game/data/assets.js`.
- Asset prototype-approved saat ini: `container-paper-cup`, `container-waffle-cone`, tiga flavor scoop, `topping-sprinkles`, `topping-cherry`, `drink-cola-cup`, dan `drink-lemon-cup`; semuanya berupa PNG pixel-art dengan outline tegas dan palette hangat.

## Provenance

Setiap asset dari luar atau generator harus memiliki catatan source dan license di manifest. Jangan memasukkan asset ke runtime jika lisensinya belum jelas.
