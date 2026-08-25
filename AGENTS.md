# Handoff — Creamy Sundae

**Project:** Creamy Sundae  
**Genre:** 2D casual cooking / time-management / ice cream shop  
**Platform awal:** Web browser, dengan target desktop + mobile/touch  
**Framework:** Phaser 4  
**Bundler:** Vite  
**Language:** JavaScript  
**Repository:** https://github.com/RizkyNs/creamy-sundae  
**Branch:** `main`

## Tujuan proyek

Membangun game 2D tentang mengelola gerai es krim.

Gameplay inti:

Customer datang
    ↓
Customer memberikan order
    ↓
Pemain memilih bahan
    ↓
Pemain membuat es krim sesuai order
    ↓
Pemain menambahkan topping / komponen lain
    ↓
Pemain menyajikan pesanan
    ↓
Pesanan divalidasi
    ↓
Pemain mendapat uang / score
    ↓
Customer pergi
    ↓
Customer berikutnya

Game harus terasa seperti **menjaga gerai**, bukan sekadar game matching atau puzzle.

---

# Target desain gameplay

Core loop yang diinginkan:

ORDER
  ↓
MAKE
  ↓
VALIDATE
  ↓
SERVE
  ↓
REWARD
  ↓
NEXT CUSTOMER

Progression jangka panjang:

Hari
 ↓
Pendapatan
 ↓
Upgrade gerai
 ↓
Flavor baru
 ↓
Topping baru
 ↓
Customer lebih kompleks
 ↓
Order lebih sulit
 ↓
Hari berikutnya

---

# Konsep visual

Target visual awal:

- 2D
- colorful
- cozy
- casual
- cute
- cocok untuk browser/mobile
- kemungkinan besar akhirnya menggunakan pixel art / stylized 2D

Namun **prototype awal sengaja tidak menggunakan asset final**.

Saat ini visual gameplay dibuat memakai:

- `rectangle`
- `circle`
- `text`

Tujuannya agar gameplay bisa divalidasi dulu sebelum asset polish.

---

# Struktur scene yang direncanakan

Template awal Phaser:

Boot
 ↓
Preloader
 ↓
MainMenu
 ↓
Game
 ↓
GameOver

Untuk game final kemungkinan berkembang menjadi:

Boot
 ↓
Preloader
 ↓
MainMenu
 ↓
Shop / Gameplay
 ↓
DayResult
 ↓
Upgrade
 ↓
Next Day

Namun **jangan memecah scene terlalu dini**. Untuk prototype gunakan `Game` sebagai gameplay utama sampai kompleksitas memang membutuhkan pemisahan.

---

# Struktur project saat ini

creamy-sundae/
 public/
   ├── assets/
   │   ├── bg.png
   │   └── logo.png
   ├── favicon.png
   └── style.css

 src/
   ├── main.js
   └── game/
       ├── main.js
       └── scenes/
           ├── Boot.js
           ├── Preloader.js
           ├── MainMenu.js
           ├── Game.js
           └── GameOver.js

 vite/
   ├── config.dev.mjs
   └── config.prod.mjs

 index.html
 package.json
 package-lock.json
 log.js
 README.md
 LICENSE
 .gitignore

Template resmi yang menjadi dasar project memang menggunakan struktur seperti ini dan mendukung hot reload lewat Vite. ([github.com](https://github.com/RizkyNs/creamy-sundae))

---

# Environment

Awalnya project dibuat langsung di VPS:

/root/creamy-sundae

VPS:

OS: Ubuntu 24.04 LTS

Node/npm sudah tersedia.

Project menggunakan:

{
  "type": "module",
  "dependencies": {
    "phaser": "4.0.0"
  },
  "devDependencies": {
    "vite": "^6.3.1",
    "terser": "^5.39.0"
  }
}

Template repo menyatakan bahwa project ini memakai Phaser 4.0.0 dan Vite. ([github.com](https://github.com/RizkyNs/creamy-sundae))

**Penting:** jangan otomatis migrasi ke Phaser 3.

Project ini memang **Phaser 4**. Phaser 4.0.0 resmi dirilis April 2026. ([github.com](https://github.com/phaserjs/phaser/discussions/7274?utm_source=chatgpt.com))

Phaser 4 juga sudah memiliki perubahan arsitektur/rendering dibanding v3, jadi gunakan dokumentasi/contoh Phaser 4 bila API berbeda. ([github.com](https://github.com/phaserjs/phaser/blob/master/skills/v4-new-features/SKILL.md?utm_source=chatgpt.com))

---

# Development command

Install:

npm install

Development:

npm run dev

Karena game diuji dari HP melalui jaringan/NAT:

npm run dev -- --host 0.0.0.0

Default template Vite menggunakan port:

8080

Template resminya memang mendokumentasikan `npm run dev` sebagai development server dan `npm run build` sebagai production build. ([github.com](https://github.com/RizkyNs/creamy-sundae))

Build:

npm run build

---

# Development access saat ini

VPS private IP:

192.168.11.168

Public IP:

139.99.122.214

NAT mapping dibuat untuk development:

TCP
public: 20043
internal: 192.168.11.168:8080

Jadi perangkat luar dapat mengakses development server melalui:

http://139.99.122.214:20043

Ini hanya untuk development/testing. Jangan jadikan Vite dev server sebagai deployment production permanen.

WebbyLab memakai port/domain lain, jadi **jangan mengganggu konfigurasi WebbyLab**.

---

# Git

Repository:

https://github.com/RizkyNs/creamy-sundae

Branch:

main

Remote:

origin

Repo bersifat **public**.

`.gitignore` saat ini dimaksudkan untuk memastikan source code saja yang masuk:

node_modules/
dist/
.env
.env.*
!.env.example
*.log
.DS_Store
Thumbs.db
.vscode/
.idea/

Jangan commit:

node_modules/
dist/
.env
secrets
PAT
API keys
password
private keys

`package-lock.json` **harus tetap di Git**.

---

# Git checkpoints

Saat ini repo sudah memiliki **2 commits**. Repo publik juga menunjukkan 2 commit. ([github.com](https://github.com/RizkyNs/creamy-sundae))

Checkpoint awal:

feat: create initial ice cream shop screen

Checkpoint kedua:

feat: add draggable vanilla scoop

Checkpoint kedua sudah berhasil di-push.

Jadi **state gameplay terakhir yang valid adalah draggable Vanilla Scoop**.

---

# Fitur yang SUDAH dibuat

## Main Menu

Main Menu awal sudah dibuat ulang.

Flow:

Main Menu
   ↓
START DAY
   ↓
Game

Main Menu tidak lagi bergantung pada `background` / `logo` untuk layout utamanya.

---

## Shop layout

Scene `Game` sudah memiliki:

- top bar
- game title
- money display
- day indicator
- customer placeholder
- order card
- work area
- cup
- ingredient panel
- vanilla button
- chocolate button
- strawberry button

Saat ini:

Chocolate
Strawberry

belum memiliki gameplay.

---

## Vanilla scoop

Vanilla sudah bisa:

tap VANILLA
      ↓
scoop muncul
      ↓
drag scoop
      ↓
drop ke cup
      ↓
cup menerima scoop

Scoop dibuat sebagai Phaser Circle/Game Object.

Scoop menggunakan:

setInteractive()

dan:

this.input.setDraggable(scoop)

Kemudian event:

dragstart
drag
dragend

digunakan untuk interaksi.

---

# State yang SUDAH mulai dipakai

Di `Game`:

this.cupContents = [];

Ketika Vanilla berhasil masuk cup:

this.cupContents.push('vanilla');

Jadi game sudah mulai memiliki perbedaan antara:

visual

dan:

game state

Contoh:

[
  'vanilla'
]

---

# State yang BELUM dibuat

Belum ada sistem formal untuk:

Order object
Recipe object
Ingredient definitions
Toppings
Serving
Money state
Customer state
Patience
Timer
Combo
Scoring
Day progression
Upgrade
Save/load

---

# GDD/PRD — target gameplay

## Customer

Customer nantinya:

- datang ke gerai
- berada di waiting/customer area
- mempunyai order
- mempunyai patience
- menerima hasil
- pergi setelah dilayani

---

## Order

Order harus menjadi data, bukan hanya text.

Contoh konsep:

{
    scoops: ['vanilla'],
    toppings: []
}

Contoh order lebih kompleks:

{
    scoops: ['vanilla', 'chocolate'],
    toppings: ['sprinkles']
}

---

## Cup

Cup harus menyimpan:

{
    scoops: [],
    toppings: []
}

Jangan menjadikan text/UI sebagai sumber kebenaran gameplay.

**Data adalah source of truth.**

---

## Recipe validation

Game harus mampu membandingkan:

Customer Order
       vs
Player Cup

Contoh:

Order:
vanilla

Cup:
vanilla

=> MATCH

dan:

Order:
vanilla

Cup:
vanilla + vanilla

=> WRONG

---

# Roadmap

Urutan yang direkomendasikan:

## Milestone 1 — Core interaction

Sudah selesai:

 Main Menu
 Shop layout
 Cup
 Ingredient buttons
 Vanilla scoop
 Drag & drop
 cupContents

---

## Milestone 2 — Recipe system

Berikutnya:

Order data
 ↓
Cup data
 ↓
Recipe validator
 ↓
ORDER READY / WRONG ORDER

Target:

this.currentOrder = {
    scoops: ['vanilla'],
    toppings: []
};

dan:

cupContents = ['vanilla'];

harus menghasilkan:

ORDER READY

---

## Milestone 3 — Serve

Tambahkan:

SERVE

Flow:

Order
 ↓
Make
 ↓
Validate
 ↓
Serve
 ↓
Reward

---

## Milestone 4 — Money

Setelah berhasil serve:

$0.00
 ↓
+$2.50
 ↓
$2.50

Harga sebaiknya berasal dari data/config, jangan hardcode di banyak tempat.

---

## Milestone 5 — Customer system

Implementasi:

Customer queue
Order generation
Customer state
Serve interaction
Customer departure
Next customer

---

## Milestone 6 — Patience

Customer punya:

patience

Flow:

100%
 ↓
80%
 ↓
50%
 ↓
20%
 ↓
0%

Patience memengaruhi reward / satisfaction.

Jangan implement timer sebelum loop basic `order → make → validate → serve` stabil.

---

## Milestone 7 — Multiple ingredients

Tambahkan:

Vanilla
Chocolate
Strawberry

Kemudian:

toppings
syrups
cone/cup

---

## Milestone 8 — Complex recipes

Contoh:

Vanilla Sundae
Chocolate Sundae
Strawberry Sundae
Vanilla + Chocolate
Vanilla + Sprinkles
Chocolate + Chocolate Syrup

---

## Milestone 9 — Day system

Day 1
 ↓
Daily target
 ↓
End Day
 ↓
Result
 ↓
Upgrade
 ↓
Day 2

---

## Milestone 10 — Shop upgrades

Contoh:

More flavor
More topping
Faster serving
More customer capacity
Higher patience
Better equipment

---

## Milestone 11 — Polish

Setelah gameplay stabil:

Pixel art
Animation
Sound
Particles
Screen feedback
Tween
UI polish
Juice

---

## Milestone 12 — Mobile optimization

Pastikan:

touch input
responsive layout
large touch targets
device orientation
performance

---

# Prinsip arsitektur yang harus diikuti Agent

**Jangan membuat seluruh game di satu file `Game.js` selamanya.**

Prototype boleh begitu.

Ketika kompleksitas meningkat, pecah menjadi:

src/game/
 main.js
 scenes/
   ├── Boot.js
   ├── Preloader.js
   ├── MainMenu.js
   ├── Game.js
   ├── DayResult.js
   └── Upgrade.js

 systems/
   ├── OrderSystem.js
   ├── RecipeSystem.js
   ├── CustomerSystem.js
   └── EconomySystem.js

 data/
   ├── ingredients.js
   ├── recipes.js
   └── customers.js

 objects/
    ├── Cup.js
    ├── Customer.js
    └── Ingredient.js

Tapi **jangan membuat semua file tersebut sekarang**.

Buat ketika memang dibutuhkan.

---

# Asset strategy

Untuk prototype:

Use Phaser shapes/text

Untuk final:

custom pixel art / properly licensed assets

Jangan mengambil asset internet sembarangan.

Kode template Phaser memiliki lisensi MIT, tetapi asset pihak ketiga belum tentu memiliki lisensi yang sama. Repo contoh Phaser juga membedakan source code dengan asset. ([github.com](https://github.com/phaserjs/examples?utm_source=chatgpt.com))

---

# Hal yang JANGAN dilakukan Agent tanpa alasan kuat

Jangan:

 migrasi Phaser 4 → Phaser 3
 mengganti Vite tanpa kebutuhan
 mengganti framework ke React
 membuat ulang project dari nol
 menghapus .git
 force push main
 commit node_modules
 commit dist
 commit secrets
 mengubah WebbyLab
 mengubah atau menghapus file yang tidak terkait dengan fitur yang sedang dikerjakan
 melakukan dependency upgrade besar hanya untuk “membersihkan” warning sebelum ada kebutuhan

Project sudah berhasil:

npm install
npm run build

---

# Cara kerja Git yang diinginkan

Setelah satu fitur selesai dan dites:

npm run build
git status
git add .
git commit -m "feat: ..."
git push

Commit harus kecil dan logis.

Contoh:

feat: add recipe validation
feat: add serve button
feat: add customer order generation
feat: add customer patience
feat: add economy system

Jangan satu commit berisi 15 sistem sekaligus.

---

# Current task

**Task terakhir yang BELUM dilakukan:**

Implementasikan:

Recipe / Order Validation

Target minimal:

this.currentOrder = {
    scoops: ['vanilla'],
    toppings: []
};

Cup:

this.cupContents = [];

Ketika player memasukkan Vanilla:

cupContents = ['vanilla']

jalankan validator.

Hasil:

correct → ORDER READY
incorrect → WRONG ORDER
incomplete → KEEP BUILDING

Setelah sistem ini stabil:

commit
push

Baru lanjut ke:

Serve
 ↓
Money
 ↓
Customer departure
 ↓
Next order

---

# Important handoff note

**Jangan mengklaim GDD/PRD lengkap sudah tersedia sebagai dokumen final.**

Yang tersedia dari konteks ini adalah **konsep gameplay dan roadmap desain yang dirumuskan selama development**. Detail angka seperti harga, jumlah customer per hari, durasi patience, biaya upgrade, jumlah level, dan daftar final recipe **belum dikunci**.

Agent boleh mengusulkan angka sementara untuk prototype, tetapi harus menandainya sebagai:

temporary prototype value

dan jangan menganggapnya sebagai keputusan final GDD.

---

# Current source-of-truth

Gunakan repository ini sebagai sumber kebenaran kode:

**https://github.com/RizkyNs/creamy-sundae**

Saat ini repository publik dan branch utamanya `main`. GitHub juga menunjukkan struktur Phaser/Vite dan dua commit yang sudah dibuat. ([github.com](https://github.com/RizkyNs/creamy-sundae))

Untuk Phaser 4 references:

**https://github.com/phaserjs/examples**

Repo contoh Phaser saat ini juga sudah mencantumkan bahwa examples tersebut dapat digunakan sebagai referensi lokal dan mengikuti Phaser 4. ([github.com](https://github.com/phaserjs/examples?utm_source=chatgpt.com))

---

### Kondisi paling singkatnya

CREAMY SUNDAE

Phaser 4.0.0
JavaScript
Vite

 repo GitHub
 main menu
 shop layout
 cup
 vanilla button
 draggable vanilla scoop
 cupContents state

NEXT:
Order state

Recipe validation

Serve

Money

Customer

Patience

Multiple recipes

Day system

Upgrade

Polish
