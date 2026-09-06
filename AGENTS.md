Handoff — Creamy Sundae

Project: Creamy Sundae
Genre: 2D casual cooking / time-management / ice cream shop
Platform awal: Web browser, dengan target desktop + mobile/touch
Framework: Phaser 4
Bundler: Vite
Language: JavaScript
Repository: https://github.com/RizkyNs/creamy-sundae
Branch: "main"

Tujuan proyek

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

Game harus terasa seperti menjaga gerai, bukan sekadar game matching atau puzzle.

---

Target desain gameplay

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

Konsep visual

Target visual awal:

- 2D
- colorful
- cozy
- casual
- cute
- cocok untuk browser/mobile
- kemungkinan besar akhirnya menggunakan pixel art / stylized 2D

Namun prototype awal sengaja tidak menggunakan asset final.

Saat ini visual gameplay dibuat memakai:

- "rectangle"
- "circle"
- "text"

Tujuannya agar gameplay bisa divalidasi dulu sebelum asset polish.

---

Environment utama

Environment resmi project saat ini adalah VPS Ubuntu 24.04 LTS.

Project path:

"/root/creamy-sundae"

Development, build, testing, dan penggunaan Antigravity CLI semuanya ditargetkan dilakukan di environment VPS ini.

Jangan menggunakan Termux/Android sebagai environment build utama untuk project ini.

Sebelumnya project sempat diclone/di-install di Termux Android ARM64. "npm install" berhasil, tetapi "npm run build" gagal ketika Rollup mencoba memuat native module "@rollup/rollup-android-arm64" karena incompatibility dengan runtime/linker Termux/Android.

Kesimpulan:

- source code project tidak bermasalah
- package project tidak perlu dirombak hanya demi Termux
- Termux bukan environment build utama
- VPS Linux adalah environment utama

---

# Antigravity CLI

Antigravity CLI sudah terinstall pada environment VPS.

Command:

`agy`

Versi terpasang saat handoff ini dibuat:

`1.1.20`

Binary:

`/root/.local/bin/agy`

PATH `/root/.local/bin` sudah dikonfigurasi pada:

- `/root/.bashrc`
- `/root/.profile`

Antigravity CLI digunakan sebagai coding agent utama untuk project ini.

Workspace utama:

`/root/creamy-sundae`

Jalankan dari project:

`cd /root/creamy-sundae`

lalu:

`agy`

Untuk sesi SSH/remote, gunakan workflow autentikasi yang disediakan Antigravity CLI. Jika URL otorisasi ditampilkan di terminal, buka URL tersebut dari perangkat lokal dan selesaikan autentikasi.

**Jangan menganggap versi Antigravity CLI dari environment lain sebagai versi project ini. Gunakan versi yang terpasang pada VPS atau update melalui installer resmi bila diperlukan.**

---

Network / development access

VPS private IP:

"192.168.11.168"

Public IP:

"139.99.122.214"

NAT mapping development:

TCP
public: "20043"
internal: "192.168.11.168:8080"

Development server dapat diakses dari perangkat luar melalui:

"http://139.99.122.214:20043"

Gunakan host binding:

"npm run dev -- --host 0.0.0.0"

Ini hanya untuk development/testing.

Jangan menjadikan Vite dev server sebagai deployment production permanen.

WebbyLab memakai port/domain lain.

Jangan mengganggu atau mengubah konfigurasi WebbyLab.

---

Project structure

creamy-sundae/
├── public/
│   ├── assets/
│   │   ├── bg.png
│   │   └── logo.png
│   ├── favicon.png
│   └── style.css
│
├── src/
│   ├── main.js
│   └── game/
│       ├── main.js
│       └── scenes/
│           ├── Boot.js
│           ├── Preloader.js
│           ├── MainMenu.js
│           ├── Game.js
│           └── GameOver.js
│
├── vite/
│   ├── config.dev.mjs
│   └── config.prod.mjs
│
├── index.html
├── package.json
├── package-lock.json
├── log.js
├── README.md
├── LICENSE
└── .gitignore

Do not restructure everything prematurely.

---

Technology

Phaser:

"4.0.0"

Vite:

"6.3.x"

Node/npm are available on the VPS.

Project package configuration currently uses:

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

Do not migrate Phaser 4 → Phaser 3.

Do not replace Vite with another bundler without a concrete technical reason.

Use Phaser 4-compatible documentation/examples whenever an API differs from old Phaser 3 examples.

---

Development commands

From "/root/creamy-sundae":

Install dependencies:

"npm install"

Development:

"npm run dev -- --host 0.0.0.0"

Build:

"npm run build"

The build must succeed before committing a feature.

---

Git

Repository:

https://github.com/RizkyNs/creamy-sundae

Branch:

"main"

Remote:

"origin"

Repository is public.

".gitignore" must exclude:

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

Never commit:

- "node_modules/"
- "dist/"
- ".env"
- secrets
- PAT
- API keys
- passwords
- private keys
- VPS credentials

"package-lock.json" must remain committed.

---

Git checkpoints

Existing checkpoints:

"feat: create initial ice cream shop screen"

"feat: add draggable vanilla scoop"

The latest valid gameplay checkpoint is:

draggable Vanilla Scoop

Any agent continuing development should inspect the actual repository state and Git history instead of assuming a roadmap feature is already implemented.

---

Features already implemented

Main Menu

Flow:

Main Menu
↓
START DAY
↓
Game

The custom Main Menu no longer depends on the template's original background/logo layout.

---

Shop layout

Scene "Game" currently contains:

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

Chocolate and Strawberry do not yet have gameplay.

---

Vanilla scoop

Vanilla interaction currently works:

tap VANILLA
↓
scoop appears
↓
drag scoop
↓
drop into cup
↓
cup receives scoop

Scoop uses Phaser interaction and drag behavior.

---

Current gameplay state

"Game" currently has:

"this.cupContents = [];"

When Vanilla is successfully placed into the cup:

"this.cupContents.push('vanilla');"

Example state:

[
'vanilla'
]

This establishes the important principle:

Data/state is the source of truth.

Visual UI must not become the authoritative representation of gameplay state.

---

State/systems not yet implemented

Not yet implemented as proper gameplay systems:

- formal Order object
- Recipe object
- Ingredient definitions
- Toppings
- Serving
- Money/economy state
- Customer state
- Patience
- Timer
- Combo
- Scoring
- Day progression
- Upgrade system
- Save/load

---

GDD/PRD gameplay targets

Customer

Customer should eventually:

- arrive at the shop
- enter the waiting/customer area
- have an order
- have patience
- receive the finished order
- leave after being served

---

Order

Order must be represented as data, not only UI text.

Example:

{
scoops: ['vanilla'],
toppings: []
}

More complex:

{
scoops: ['vanilla', 'chocolate'],
toppings: ['sprinkles']
}

---

Cup

Cup should eventually store:

{
scoops: [],
toppings: []
}

Never make UI text the source of truth.

---

Recipe validation

Game must compare:

Customer Order
vs
Player Cup

Example:

Order:
vanilla

Cup:
vanilla

=> MATCH

Example:

Order:
vanilla

Cup:
vanilla + vanilla

=> WRONG

---

Roadmap

Milestone 1 — Core interaction

Completed:

✅ Main Menu
✅ Shop layout
✅ Cup
✅ Ingredient buttons
✅ Vanilla scoop
✅ Drag & drop
✅ cupContents

---

Milestone 2 — Recipe system

Next:

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

When:

cupContents = ['vanilla'];

the result should be:

ORDER READY

Wrong or incomplete recipes should receive appropriate validation feedback.

---

Milestone 3 — Serve

Add:

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

Milestone 4 — Money

After successful serving:

$0.00
↓
+$2.50
↓
$2.50

Prices should come from data/config instead of being hardcoded everywhere.

"$2.50" is only a temporary prototype value unless later specified as a final design decision.

---

Milestone 5 — Customer system

Implement:

- customer queue
- order generation
- customer state
- serve interaction
- customer departure
- next customer

---

Milestone 6 — Patience

Customer should have a patience state.

Example progression:

100%
↓
80%
↓
50%
↓
20%
↓
0%

Patience may influence reward/satisfaction.

Do not add the timer before the basic:

order → make → validate → serve

loop is stable.

---

Milestone 7 — Multiple ingredients

Add:

Vanilla
Chocolate
Strawberry

Then:

- toppings
- syrups
- cone/cup variants

---

Milestone 8 — Complex recipes

Potential recipes:

- Vanilla Sundae
- Chocolate Sundae
- Strawberry Sundae
- Vanilla + Chocolate
- Vanilla + Sprinkles
- Chocolate + Chocolate Syrup

These are prototype examples, not final locked GDD decisions.

---

Milestone 9 — Day system

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

Milestone 10 — Shop upgrades

Potential upgrades:

- more flavors
- more toppings
- faster serving
- more customer capacity
- higher patience
- better equipment

These are design possibilities, not final locked values.

---

Milestone 11 — Polish

Only after gameplay is stable:

- pixel art
- animation
- sound
- particles
- feedback
- tween
- UI polish
- game feel / juice

---

Milestone 12 — Mobile optimization

Ensure:

- touch input
- responsive layout
- large touch targets
- device orientation handling
- acceptable performance

---

Architecture principles

Do not keep the entire final game inside "Game.js".

Prototype code can remain there temporarily.

As complexity increases, split systems only when they are actually needed.

Possible future structure:

src/game/
├── main.js
├── scenes/
│   ├── Boot.js
│   ├── Preloader.js
│   ├── MainMenu.js
│   ├── Game.js
│   ├── DayResult.js
│   └── Upgrade.js
│
├── systems/
│   ├── OrderSystem.js
│   ├── RecipeSystem.js
│   ├── CustomerSystem.js
│   └── EconomySystem.js
│
├── data/
│   ├── ingredients.js
│   ├── recipes.js
│   └── customers.js
│
└── objects/
├── Cup.js
├── Customer.js
└── Ingredient.js

Do not create all of these files immediately.

Create abstractions when the current implementation genuinely needs them.

---

Asset strategy

Prototype:

Use Phaser shapes/text.

Final:

Use custom pixel art or properly licensed assets.

Do not copy random internet assets without checking their license.

---

Rules for the Agent

Before modifying code:

1. Inspect the current repository state.
2. Read the relevant existing files.
3. Never assume a roadmap item is already implemented.
4. Keep changes scoped to the current feature.
5. Preserve working features unless a change intentionally replaces them.
6. Do not rewrite the project from scratch.
7. Do not delete ".git".
8. Do not force-push "main".
9. Do not modify WebbyLab.
10. Do not expose or commit secrets.
11. Do not perform broad dependency upgrades without a concrete reason.
12. Use the current Phaser 4 project as the foundation.

After implementing a logical feature:

1. Run "npm run build".
2. Test the feature.
3. Update "AGENTS.md" dynamically to reflect the new project state, milestone progress, and current task.
4. Inspect "git status".
5. Commit only the relevant files (including "AGENTS.md").
6. Push the commit to "main".

Preferred commit style:

"feat: add recipe validation"

"feat: add serve button"

"feat: add customer order generation"

"feat: add customer patience"

"feat: add economy system"

Avoid giant commits containing unrelated systems.

---

Current task

The next feature is:

Shop upgrades

Implement shop upgrade system:
1. Upgrade scene or modal accessible after day summary.
2. Purchasable upgrades with earned money (e.g. Extra patience boost, faster tip multiplier, decorations).
3. Apply upgrade effects to gameplay loop.

After the feature is stable:

npm run build

Then:

git status
git add ...
git commit -m "feat: add shop upgrade system"
git push

Only after that should development proceed to:

Shop upgrades
↓
Cone vs Cup variants
↓
Polish

---

Important GDD/PRD note

Do not claim that a complete final GDD/PRD document exists.

What currently exists is a gameplay concept and roadmap developed incrementally during implementation.

The following are NOT final locked values/design decisions:

- prices
- customer count per day
- patience duration
- upgrade costs
- level count
- final recipes
- final progression numbers

Temporary values are allowed for prototyping, but clearly mark them as:

"temporary prototype value"

Do not treat temporary values as final GDD decisions.

---

Source of truth

Primary code source:

https://github.com/RizkyNs/creamy-sundae

Primary Phaser reference:

https://github.com/phaserjs/phaser

Phaser examples/reference:

https://github.com/phaserjs/examples

Cooking-system inspiration/reference:

https://github.com/TriForMine/Delixia

Delixia is only a gameplay/design reference and is NOT the codebase for Creamy Sundae.

---

Final current state

CREAMY SUNDAE

Phaser 4.0.0
JavaScript
Vite

✅ GitHub repository
✅ Main Menu
✅ Shop layout
✅ Cup
✅ Vanilla button
✅ Draggable Vanilla scoop
✅ cupContents state
✅ Order state
✅ Recipe validation
✅ Serve
✅ Money
✅ Customer
✅ Patience
✅ Multiple recipes
✅ Day system
✅ Beverage / Drink Station
✅ VPS Linux development environment
✅ VPS build environment

NOT YET IMPLEMENTED:

Shop upgrades
↓
Cone vs Cup variants
↓
Polish

Current source-of-truth workspace:

"/root/creamy-sundae"

Current target environment:

VPS Ubuntu 24.04 LTS

**Antigravity CLI:**

Installed and configured.
Version: 1.1.20
