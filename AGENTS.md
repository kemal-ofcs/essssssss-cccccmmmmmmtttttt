# CLAUDE.md

Panduan untuk AI agent yang bekerja di repositori ini.

## Ringkasan arsitektur

Aplikasi 2-tier offline-first di tiga target dari satu basis kode:

- **Web** — Next.js berjalan di server (Vercel/Node), menulis langsung ke
  database LibSQL lewat route handler.
- **Desktop & Android** — Tauri v2 + Rust. TIDAK ada server aplikasi perantara:
  perangkat berbicara langsung ke database LibSQL lewat HTTP pipeline
  (`/v2/pipeline`), dengan cache SQLite lokal yang disinkronkan dua arah.

Endpoint database boleh **Turso Cloud** atau **server libSQL milik pengguna
sendiri** (`sqld`) di LAN, NAS, atau VPS. Provider disimpan eksplisit pada
`TursoConfig.provider`, **tidak pernah ditebak dari bentuk URL** — menebaknya
membuat satu salah ketik `http://` melonggarkan aturan transport.

`web-desktop/` adalah **satu-satunya sumber kebenaran** untuk kode bersama.
`mobile/src/lib`, `mobile/src/types`, dan sebagian `mobile/src-tauri/src/mobile`
adalah salinan yang dihasilkan `bun run sync:mobile` dan akan ditimpa tanpa
peringatan. Jangan pernah mengeditnya langsung.

## Perintah

```bash
bun run setup             # pasang dependensi kedua workspace
bun run sync:mobile       # salin kode bersama web-desktop -> mobile
bun run check:quick       # audit + lint + typecheck + test, kedua workspace
bun run check             # + cargo test

bun run audit:schema      # JALANKAN DDL keempat lapisan, bandingkan hasilnya
bun run audit:contract    # route kanonik, tabel snapshot, permission, command
bun run audit:docs        # dokumen + skill agent vs kode
bun run audit:sql         # prepare setiap query terhadap skema nyata
bun run audit:ui-guard    # halaman bermutasi wajib isSubmittingRef
bun run audit:page-guard  # halaman privat wajib menolak yang tidak berhak
bun run verify:template   # semua gerbang sekaligus; --rust ikut cargo test
```

Tiga audit terakhir ikut `check:quick` dan `check`. `audit:sql` ada karena
query ke tabel yang tidak ada lolos dari lint maupun typecheck: saat dipasang,
ia menemukan penghapusan operator di Web yang selalu gagal karena menghitung
tabel milik proyek asal. Query yang dirakit saat runtime tidak bisa ia periksa,
dan jumlahnya dicetak di setiap run. `audit:ui-guard` hanya menghitung fungsi
yang diimpor dari `src/lib/gateways/*`, dan `audit:page-guard` hanya halaman
yang sendiri mengalihkan tamu ke `/login`; halaman yang memuat data tanpa
pengalihan itu dicetak sebagai "di luar cakupan". Ketiganya tidak punya daftar
pengecualian, dan jangan pernah ditambah: halaman yang melanggar diperbaiki.

Skill agent untuk repo ini ada di `.agents/skills/` (Codex dan agent lain) dan
`.claude/skills/` (Claude Code): `kerjakan-fitur-lintas-platform`,
`audit-lalu-perbaiki`, `resolve-sync-schema-mismatch`, dan `uji-rilis-android`
(daftar periksa APK rilis dan diagnosis bug dari HP). Kedua folder wajib
identik; `audit:docs` menagihnya, sekaligus memeriksa setiap berkas yang dirujuk
skill.

Jalankan `bun run check` **sekali di akhir**, setelah perubahan selesai utuh.
Menjalankannya berulang di tengah penulisan hanya membuang waktu.

`audit:schema` tidak membandingkan teks — ia menjalankan DDL-nya ke SQLite
sementara lalu membandingkan tabel dan kolom yang benar-benar terbentuk. Versi
berbasis teks sebelumnya pernah melaporkan "konsisten" sambil memeriksa NOL
tabel. `verify:template` menjalankan seluruh gerbang tanpa berhenti di
kegagalan pertama, untuk dipakai saat MEMERIKSA template — bukan saat menulis.

## Empat lapisan yang wajib identik

Menambah atau mengubah tabel yang ikut sinkronisasi berarti menyentuh keempatnya
dalam satu perubahan:

| Lapisan | Berkas |
| :-- | :-- |
| SQLite lokal | `web-desktop/src-tauri/src/desktop/storage.rs` |
| DDL cloud + handler push | `web-desktop/src-tauri/src/desktop/turso.rs` |
| Registri snapshot + route kanonik | `web-desktop/src-tauri/src/desktop/sync.rs` |
| Skema jalur Web | `web-desktop/src/lib/db-schema.ts` |

Satu nama kolom yang berbeda ejaan membuat tabel itu gagal disinkronkan secara
permanen — baris tersimpan mulus di perangkat, masuk antrean, lalu ditolak cloud
dan dicoba ulang selamanya.

Kolom yang hanya diketahui satu jalur wajib punya dua tempat: `CREATE TABLE`
untuk database baru, dan `ALTER TABLE` (`ensure_column` di Rust,
`db-migrations.ts` di TS) untuk database yang sudah ada.

## Aturan yang tidak boleh dilanggar

1. UI tidak pernah memanggil `invoke()` atau `fetch("/api/...")` langsung —
   selalu lewat `src/lib/gateways/*` yang bercabang pada `isDesktopRuntime()`.
2. Route handler di `src/app/api/**` DILARANG mengekspor `GET`; build Tauri
   memakai `output: "export"`. Pakai `POST /api/<domain>/query` untuk pembacaan.
3. Mutasi lokal dan pendaftaran outbox WAJIB berada dalam satu transaksi SQLite.
4. Hanya pasangan `(domain, operation)` di `CANONICAL_SYNC_ROUTES` yang boleh
   diproduksi outbox; daftarnya wajib sama dengan `canonical_sync_route` di
   `turso.rs`.
5. Event yang tidak menghasilkan statement mutasi WAJIB menjadi konflik, bukan
   `applied`.
6. Kunci payload yang absen dari snapshot berarti "tabel tidak berubah", bukan
   "tabel kosong" — termasuk melewatkan `delete_missing`.
7. `delete_missing` hanya boleh menghapus baris yang punya jejak
   `desktop_entity_revision` dan tidak sedang mengantre di outbox.
8. Kunci koneksi perangkat (`DEVICE_LOCAL_SETTING_KEYS`) tidak ikut sinkronisasi.
9. Kegagalan push TIDAK boleh membatalkan pull.
10. Setiap `#[tauri::command]` wajib memeriksa permission lewat
    `require_permission`. Menyembunyikan tombol di UI bukan guard.
11. Kredensial tidak pernah disimpan sebagai teks biasa dan tidak pernah dikirim
    balik ke frontend. Token kosong pada penyimpanan berarti "pertahankan yang
    lama", bukan "kosongkan".
    Pengecualian yang disengaja: kredensial bersama di tabel cloud-only
    (`app_mail_config.api_key`, `telegram_config.bot_token`) disimpan apa
    adanya, karena server Web DAN setiap perangkat harus bisa memakainya, dan
    di arsitektur 2-tier tidak ada tempat kunci enkripsi bersama selain
    database itu sendiri; mengenkripsi dengan kunci di database yang sama
    hanya kosmetik. Penjaganya: tidak pernah ke frontend, tidak pernah ke
    snapshot perangkat, dan siapa pun yang bisa membacanya sudah memegang
    seluruh data. Bocor = ganti di penyedianya (Revoke di @BotFather, kunci
    baru di Resend/Brevo). Kredensial di perangkat tetap lewat vault
    terenkripsi (`secrets.rs`).
12. Android: `isMinifyEnabled = false`; pakai `webpki-roots`, bukan
    `rustls-platform-verifier`; pasang provider kripto `ring` di awal `run()`.
    `src-tauri/gen/` diabaikan git, jadi `mobile/scripts/patch-android.ts`
    (otomatis sebelum setiap `tauri:android:build*`) memasang ulang R8 mati dan
    tanda tangan rilis dari `gen/android/keystore.properties`; kunci `.jks` dan
    password-nya tidak pernah masuk repo.
    Masa login offline (`APP_OFFLINE_AUTH_MAX_AGE_HOURS`, batas 168 jam)
    ditanam `build.rs` KEDUA workspace (bukan `.cargo/config.toml`, yang tidak
    terbaca saat Gradle menjalankan Cargo dari folder lain): build rilis tidak
    punya nilai bawaan, dan tanpanya aplikasi menolak start lalu tertutup
    sendiri. Admin memperpendeknya lewat setelan `offline_login_max_days`.
    Untuk HP pakai `bun run tauri:android:build:arm64` (`--apk`, tanpa AAB
    Play Store): build universal mengompilasi Rust untuk empat ABI (dua di
    antaranya hanya untuk emulator) dan memakan lebih dari 30 menit. Profil
    rilis memakai LTO, jadi SETIAP kompilasi ulang crate aplikasi sekitar 7
    menit; `build.rs` hanya boleh memantau berkas yang benar-benar ada
    (`rerun-if-changed` pada berkas yang tidak ada membuat Cargo menganggapnya
    selalu berubah, dan `mobile/.env` sengaja tidak ada).
13. Nilai uang disimpan sebagai `INTEGER`, tidak pernah float.
14. Siklus hidup kamera Android: cleanup unmount di `useEffect` terpisah dengan
    dependency array kosong, terpisah dari listener `visibilitychange`.
15. Aset visual (`.glb`, `.splinecode`, `.riv`, `.wasm`, decoder, benchmark) WAJIB
    di-bundle di `public/3d/` dan dirujuk path relatif. Aplikasi ini offline-first:
    tidak boleh ada satu pun request keluar untuk dekorasi.
16. Komponen 3D wajib `"use client"` + `dynamic(..., { ssr: false })`. Jangan
    pernah mengimpor `three`/R3F/Spline/Rive dari server component atau dari
    `src/lib/**` — direktori itu disalin apa adanya ke mobile.
17. Kemampuan GPU dideteksi, tidak ditebak: `detect-gpu` sekali saat start,
    guard WebGL nyata, fallback 2D, satu konteks WebGL aktif, dan `dispose()` +
    `gl.dispose()` + `forceContextLoss()` saat unmount.
18. Preferensi kualitas visual disimpan device-local di `localStorage`, tidak
    pernah di tabel yang ikut sinkronisasi, dan tidak pernah menambah kolom,
    domain outbox, atau route kanonik baru.
19. Seluruh stempel waktu dan perbandingan kedaluwarsa pada alur pemulihan
    password dan 2FA WAJIB dihitung database (`datetime('now')`,
    `strftime('%s','now')`) — tidak pernah `new Date()` di TypeScript maupun
    jam perangkat di Rust. Satu baris bisa ditulis Rust dan dibaca TypeScript,
    dan `new Date("2026-08-29 10:15:00")` diparsing sebagai waktu lokal.
20. Indeks yang memakai kolom hasil migrasi dibuat SETELAH kolomnya dipastikan
    ada: setelah loop `ensure_column` di `turso.rs`, dan di `INDEX_MIGRATIONS`
    (bukan DDL awal) di `db-migrations.ts`. Satu statement DDL yang gagal
    membatalkan seluruh pipeline, termasuk `ensure_column` yang justru akan
    menambahkan kolomnya — database lama terkunci selamanya.
21. Menambah kolom atau tabel WAJIB menaikkan sentinel schema Rust DAN angka
    yang diperiksa `ensure_schema_current`. Sentinel terakhir menentukan kapan
    `ensure_schema` dilewati.
22. `TOTP_REQUIRED`, `TOTP_INVALID`, dan `TOTP_ENROLLMENT_REQUIRED` dikembalikan
    langsung dari `desktop_login`, tidak boleh jatuh ke lengan error umum:
    lengan itu meneruskan login ke fallback offline yang hanya memeriksa
    username + password, sehingga 2FA terlewati seluruhnya.
23. Menghapus operator ditolak selama riwayat reset passwordnya masih ada —
    `password_reset_request` ber-CASCADE ke `master_operator`, jadi menghapus
    akun ikut memusnahkan foto bukti. Aturannya ada di jalur Web
    (`operator-admin.ts`) dan Rust (`delete_operator`), dan keduanya wajib sama.
24. `password_reset_request` dan `app_mail_config` cloud-only: tidak pernah
    masuk `SNAPSHOT_TABLES`. Daftar riwayat juga tidak pernah membawa
    `photo_base64` — foto diambil satu per satu lewat endpoint terpisah.
25. MENGAJUKAN reset password dan MENGAKTIFKAN 2FA untuk akun sendiri tidak
    butuh izin apa pun: yang pertama memang terbuka tanpa sesi, yang kedua hak
    setiap operator atas akunnya. Yang di-RBAC adalah `password_reset.view`,
    `password_reset.approve`, `password_reset.delete`, dan
    `two_factor.reset` — tiga terakhir masuk
    `SENSITIVE_MUTATION_PERMISSIONS`. Menyetujui pemulihan berarti menyerahkan
    kendali sebuah akun kepada orang yang berdiri di depan layar, jadi
    peninjaunya wajib memikul itu secara sadar.
26. Memulihkan cadangan database MENIMPA seluruh data perangkat, bukan
    menggabungkannya — `database_backup.restore` karena itu juga masuk
    `SENSITIVE_MUTATION_PERMISSIONS`. Database lama tetap disimpan
    berdampingan, sehingga salah pilih berkas masih bisa dibatalkan manual.
27. Perintah yang HANYA ada di biner Mobile ditulis di modul di luar daftar
    salin `sync-rust-modules.ts` (`device_storage.rs`) dan namanya WAJIB
    berawalan `mobile_`. Awalan itu yang dipakai `audit:contract` untuk
    membedakan "command hantu" dari "command khusus Mobile"; tanpa awalannya,
    gateway bersama yang memanggilnya akan dilaporkan sebagai cacat. Di sisi
    gateway, panggilannya wajib berada di dalam blok
    `if (isMobileRuntime()) { … }` — guard positif, bukan
    `if (!isMobileRuntime()) throw`, karena bentuk itulah yang dikenali audit.
28. Android TIDAK boleh menulis ke `/storage/emulated/0/Download`. Sejak
    Android 10 (scoped storage) penulisan itu ditolak, dan yang paling berbahaya
    adalah bentuk kegagalannya: berkas tetap dibuat di folder privat, pemanggil
    melaporkan sukses, dan pengguna tidak pernah menemukan hasilnya. Pakai
    dialog Storage Access Framework (`tauri-plugin-android-fs`) — pengguna yang
    memilih tujuannya, dan tidak ada permission manifest yang perlu diminta.
    Pemakainya WAJIB memakai `android_fs_async()`, bukan `android_fs()`:
    dialognya menunggu manusia, dan memblokir thread runtime selama itu
    membekukan seluruh antarmuka termasuk dialog yang sedang ditunggu.
    Kebalikannya juga berlaku: `public_output_dirs` hanya memuat folder
    Android di build Android (`cfg!(target_os = "android")`). Di Windows
    `/storage/emulated/0/Download` dibaca `C:\storage\emulated\0\Download`,
    foldernya dibuat diam-diam, dan PDF "tersimpan" di tempat yang tidak
    pernah dicari (temuan uji perangkat v2).
29. `company_profile` adalah tabel PLATFORM, bukan domain contoh. Bentuknya
    baris tunggal ber-kunci konstanta `'default_company'`, dan barisnya
    SENGAJA tidak di-seed saat provisioning: menyeednya berarti setiap perangkat
    baru mendorong "Company Name" ke cloud lewat outbox, dan perangkat yang
    sinkron belakangan menimpa identitas asli yang sudah diisi orang lain. Ia
    dibuat saat pertama kali DISUNTING, bukan saat pertama kali dibaca.

## Pemulihan password & verifikasi dua langkah

Alur "Lupa Password" punya langkah inti `lookup` → `confirm` → `verify` →
`inspect-token` → `complete`, ditambah `route` dan `recover-with-code` —
dilayani `POST /api/password-reset` di Web dan command
`desktop_password_reset_*` di Desktop/Mobile. Seluruhnya tanpa sesi login,
dijaga rate limit `auth_login_rate_limit`, urutan tantangan acak yang hanya
diketahui database, dan token sekali-pakai berumur 30 menit.

**Tokennya punya DUA jalur penyerahan, dan setiap implementasi wajib sepakat.**
`password_reset_route` / `resolvePasswordResetRoute` memilihnya: nilai
eksplisit di `setting_gex_system` menang lebih dulu, baru
`app_mail_config.is_active` dipakai sebagai bawaan — email bila aktif,
`in_app` bila tidak. Urutan itu tidak boleh dibalik: satu database bisa
dilayani Web dan Desktop bergantian, dan bila keduanya menyimpulkan jalur
berbeda sebuah permintaan akan menunggu persetujuan yang tidak pernah diminta.

Pada jalur `in_app`, `verify` **tidak membuat token sama sekali** — barisnya
tetap `Pending Verification` dengan `delivery_status = 'Awaiting Approval'`,
dan tokennya baru lahir di layar peninjau saat `approve`. Kalau token dibuat
lebih dulu, bentuk aslinya harus disimpan sampai disetujui, sedangkan database
hanya boleh memegang hash-nya. Cabang ini ADA karena sebelumnya email yang belum
dikonfigurasi membuat pengiriman selalu gagal, dan kegagalan itu
**membatalkan** permintaannya — "Lupa Password" mati total di setiap pemasangan
tanpa penyedia email.

Jalur ketiga, **kode pemulihan cetak**, tidak menunggu siapa pun: delapan kode
diterbitkan saat provisioning Superadmin (dan bisa diterbitkan ulang dari
Pengaturan), disimpan hanya sebagai hash SHA-256, dihapus begitu dipakai.
`generateRecoveryCodes`/`normalizeRecoveryCode` (`src/lib/security/totp.ts`)
dan padanan Rust-nya di `turso.rs` **wajib tetap identik**, termasuk membuang
setiap karakter non-alfanumerik: kode yang dicetak di satu build dipakai untuk
masuk lewat build yang lain, jadi kode yang sama harus menghasilkan hash yang
sama di kedua sisi.

Verifikasi wajah (`src/lib/security/face-liveness.ts`) sengaja tanpa dependensi
dan tanpa berkas model: ia bekerja pada grid piksel RGB mentah. Web mengirim
frame mentah itu ke server dan server **menghitung ulang vonisnya sendiri**
dengan modul yang sama; Desktop/Mobile menghitung vonis di aplikasi (di sana
tidak ada server aplikasi) dan Rust memverifikasi urutan tantangannya terhadap
database. Menggantinya dengan library ML berarti membundel model beberapa MB dan
melonggarkan CSP Desktop yang hari ini `ipc:`-only.

2FA memakai TOTP RFC 6238 dengan SHA-1 — bukan pilihan gaya: Google
Authenticator mengabaikan parameter `algorithm` pada URI otpauth dan selalu
memakai SHA-1. Implementasi TypeScript (`src/lib/security/totp.ts`) dan Rust
(`turso.rs`) menguji vektor RFC yang sama, karena keduanya memverifikasi rahasia
yang sama dari database yang sama.

Email dikirim lewat HTTP API (Resend atau Brevo), tidak pernah SMTP, dan
kuncinya dikonfigurasi dari dalam aplikasi lewat tabel `app_mail_config` — bukan
variabel lingkungan, supaya pemilik aplikasi bisa menggantinya tanpa build ulang.

## Stack visual 3D & animasi

Hanya delapan kategori ini yang disetujui; selebihnya butuh persetujuan pemilik
repositori.

| Kategori | Tools | Beban GPU/RAM | Peran |
| :-- | :-- | :-- | :-- |
| 3D Rendering | React Three Fiber (v9+) + Drei | Menengah (dapat diturunkan) | Objek 3D penuh, interaksi model, visualisasi data |
| No-Code 3D | Spline (`@splinetool/react-spline`) | Menengah | Kartu hero & maskot interaktif siap pakai |
| Pseudo-3D & Animasi UI | Motion (Framer Motion) | Sangat rendah | Tilt 3D, parallax hover, transisi layout |
| Animasi Mikro / Status | Rive (`@rive-app/react-canvas`) | Sangat rendah (`.riv` < 50 KB) | Ikon interaktif & indikator status sinkronisasi |
| Komponen Visual Modern | Aceternity UI & Magic UI (di-vendor) | Rendah | Spotlight, bento grid, glowing border, glassmorphism |
| Deteksi Hardware | `detect-gpu` | Nol (sekali di awal) | Menentukan tier kualitas sesuai spek laptop/HP |
| Kompresi Aset | Draco / GLTF-Transform (devDependency) | Menghemat RAM & CPU | Memperkecil model hingga 80% |
| State Bridge | Zustand | Sangat rendah | Menjembatani data SQLite ke canvas tanpa re-render berlebih |

Empat hal yang paling sering menjebak di basis kode ini:

- **Default library menembak CDN.** Rive (runtime WASM), `detect-gpu` (berkas
  benchmark), decoder Draco, dan Spline (scene) semuanya mengunduh dari internet
  bila dibiarkan default. Semuanya wajib ditimpa ke berkas lokal.
- **CSP memblokir aset lokal.** `connect-src` pada `web-desktop` masih
  `ipc: http://ipc.localhost`, sehingga `fetch` ke `public/` pun ditolak; WASM
  butuh `script-src` dengan `'wasm-unsafe-eval'`. Melonggarkan CSP adalah
  perubahan keamanan — minta persetujuan pemilik repositori lebih dulu, dan
  jangan pernah menambahkan host eksternal atau `'unsafe-eval'`.
- **Kamera dan WebGL berebut GPU.** Jangan pernah memount canvas 3D di halaman
  pemindai selama stream kamera aktif; itu memicu panas, frame drop, dan pada
  sebagian perangkat Android mematikan kamera — persis kegagalan yang dicegah
  aturan 14. Halaman pemindai cukup efek Motion/CSS 2D.
- **Tailwind v4, tanpa berkas konfigurasi.** Dokumentasi Aceternity/Magic UI
  menyuruh menambah `keyframes` di `tailwind.config.js`; di sini definisikan via
  `@theme` di `globals.css` dan jangan membuat `tailwind.config.ts`.

Selebihnya: hormati `prefers-reduced-motion`, pakai `frameloop="demand"` untuk
scene statis, hentikan render loop saat aplikasi tidak terlihat, dan pasang paket
visual di kedua workspace dengan versi pinned yang sama. Komponen bersama ditulis
di `web-desktop/src/components/visual/` dengan store di
`web-desktop/src/lib/stores/`; keduanya wajib didaftarkan ke `dirsToCopy` pada
`mobile/scripts/sync-frontend-lib.ts` karena script itu tidak menyalin
`src/components` secara default.

## Domain MaklonOS

Domain contoh template (`master_item`, `log_aktivitas`) sudah diganti domain
MaklonOS (PRD F-04, F-12, F-13): `clients` + `leads` (intake lead, satu event
`client/register` membawa keduanya), `master_option` (Master Data), dan
`device_tag_registry` (cloud-only, tag perangkat untuk kode klien), serta
`lead_interactions` (F-05, satu event `lead-interaction/record`; ringkasan di
`leads` diperbarui `LEAD_SUMMARY_UPDATE_SQL` yang aman diulang dan identik di
`clients.rs` dan `src/lib/server/leads.ts`). Segmen Hot/Warm/Cold dihitung
saat dibaca, tidak pernah disimpan. Direktori operator (`master_operator`)
ikut snapshot sebagai tabel `read_only`: hanya id, kode, nama, dan status yang
ditarik, dan tabel `read_only` WAJIB tidak punya rute kanonik.
`domain_audit_log` (F-10) ditulis di transaksi SQLite yang SAMA dengan
mutasinya lewat `commit_with_outbox(..., Some(AuditEntry))` di Rust dan
`writeAudit` di Web, didorong lewat rute hanya-tambah `audit/record`, dan
SENGAJA tidak ada di `SNAPSHOT_TABLES` (tumbuh tanpa batas; layar Audit
membaca cloud, offline hanya catatan perangkat sendiri). Tidak ada jalur
aplikasi yang mengubah atau menghapus barisnya. Role divisi (F-02) di-seed
SEKALI dengan penanda `division_roles_seeded` (`DIVISION_ROLE_SEED_SQL`,
identik di `db-schema.ts` dan `turso.rs`), dan izin role yang dicabut
disimpan sebagai `is_allowed = 0`, tidak dihapus: seed `INSERT OR IGNORE`
yang berjalan tiap skema naik versi akan mengembalikan baris yang hilang.
Polanya
dari UI sampai cloud: `src/lib/validations/client.ts` ↔ `desktop/clients.rs`
(vektor kembar), `src/lib/server/clients.ts` ↔ command `desktop_*_client*` /
`desktop_*_master_option*` di `commands.rs`, gateway `src/lib/gateways/clients.ts`,
dan komponen bersama `src/components/clients/*`. Domain baru berikutnya
meniru pola ini: ikuti tabel empat lapisan di atas, lalu sesuaikan
`src/lib/rbac/catalog.ts`, `src/lib/auth/access.ts`, gateway, dan pendaftaran
perintah di kedua `lib.rs`.

Detail lengkap ada di `README.md`.
30. Siklus sinkronisasi TIDAK punya loop latar di Rust. Yang menjalankannya
    hanya `AutoSyncRunner` (12 dtk bila ada antrean, 30 dtk idle, 90 dtk saat
    jendela tersembunyi), sekali saat login, dan mutasi yang memanggil
    `sync::synchronize` sendiri. Mutasi bervolume tinggi yang TIDAK memanggilnya
    wajib memancarkan `requestSyncNow()` dari halamannya — lepas dari alur
    utama (tanpa `await`) supaya tidak menambah waktu respons.
31. `AutoSyncRunner` melewatkan siklus ketika `navigator.onLine === false`.
    Penjagaan itu benar untuk mode cloud, tetapi **SALAH di Mode Database
    Lokal**: di sana "cloud"-nya berkas hub di perangkat yang sama, jadi push
    adalah operasi BERKAS, bukan jaringan — dan mesin yang benar-benar terputus
    justru kasus penggunaan utamanya. Melewatkannya membuat outbox tidak pernah
    terkuras, hub tertinggal, lalu ekspor cadangan dan promosi ke cloud
    (keduanya membaca hub) kehilangan data tanpa satu pun pesan error.
    Benderanya dibawa `DesktopSyncStatus.local_mode` — BUKAN lewat
    `desktop_get_database_config`, yang menuntut `settings.view` + Superadmin
    sementara siklus otomatis berjalan untuk SETIAP peran — dan disemai sekali
    saat mount lewat `getSyncStatus()` supaya siklus PERTAMA pun sudah tahu.
32. `SENSITIVE_MUTATION_PERMISSIONS` (`src/lib/rbac/catalog.ts`) berisi izin yang
    SENGAJA tidak ikut paket bawaan role Admin, karena semuanya menghancurkan
    atau menyerahkan sesuatu yang tidak bisa dibuat ulang:
    `password_reset.delete` (satu-satunya jejak pemulihan beserta fotonya),
    `password_reset.approve` (kendali sebuah akun),
    `two_factor.reset` (lapisan kedua akun orang lain),
    `database_backup.restore` (SELURUH data perangkat dalam satu langkah),
    `finance_options.manage` (pajak dan diskon mengubah nominal setiap
    tagihan baru), `payments.approve_exception` (menerima kurang bayar
    menjadi cicilan dan lebih bayar menjadi deposit), dan `settings.manage`. Izin domain yang bisa MENGHAPUS data bisnis
    (mis. `clients.delete` saat ditambahkan) wajib ikut didaftarkan di sana,
    bukan dibiarkan masuk paket Admin secara diam-diam.
33. `bun run audit:docs` membandingkan DOKUMEN dengan KODE — jumlah rute
    kanonik, jumlah tabel snapshot, daftar provider, daftar izin sensitif, dan
    keberadaan setiap berkas yang dirujuk. `audit:schema` dan `audit:contract`
    hanya membandingkan kode dengan kode, sehingga klaim dokumen yang usang bisa
    bertahan diam-diam — dan dokumen yang bertentangan dengan kode lebih
    berbahaya daripada dokumen yang diam, karena ia menuntun orang berikutnya
    mengulang bug yang sudah diperbaiki.
34. **Lisensi offline Ed25519 (Desktop + Mobile).** Alur pertama kali adalah
    Lisensi → Provisioning → Login → Pengaturan. `web-desktop/src-tauri/src/desktop/license.rs`
    memeriksa lisensi `LIS1` tanpa jaringan dan SENGAJA mandiri (helper tanggal
    dibawa sendiri) supaya bisa disalin utuh; ia ikut `sync-rust-modules.ts`.
    Penerbitnya alat `E:\Freelance\lisensi` di luar repo — private key tidak
    pernah masuk sini. `LICENSE_PRODUCT` diganti `rename-project.ts` menjadi
    `kos-<slug>` dan `PRODUCT_PUBLIC_KEY_HEX` dikembalikan ke nol: selama nol,
    SEMUA lisensi ditolak, jadi setiap aplikasi wajib `keygen` sendiri.
    Gerbangnya ada di tiga tempat dan tidak boleh ditambal di tempat lain:
    `gate_login` di awal `desktop_login` (satu kali untuk jalur online dan
    offline), `enforce_any` di `require_permission` (mode baca-saja: hanya
    `*.view`, `sync.retry`, `database_backup.export`, `data.export`), dan
    `check_installable` sebelum Superadmin dibuat. Lisensi disimpan di
    `setting_gex_system.app_license` (ikut sinkronisasi, rute `setting/update`)
    dan TIDAK boleh masuk `DEVICE_LOCAL_SETTING_KEYS`. Tes memakai vektor
    kanonik alat penerbit (produk `kos-absensi`) lewat `parse_license_for`,
    jadi vektornya tidak perlu dibuat ulang per aplikasi. Web tidak menegakkan
    lisensi. Seluruh komponen lisensi, termasuk `LicenseNotice.tsx`, ikut
    `filesToCopy` (kontrak `Modal` kedua workspace kini sama).
    Halaman pertama setelah login ditentukan SATU fungsi, `landingPath`
    (`src/lib/auth/landing.ts`): Klien bila boleh, lalu Pengaturan, lalu
    Riwayat Reset — hanya rute yang ada di kedua workspace.
35. **Bahasa dan tampilan (MaklonOS).** Antarmuka, pesan error (TS dan
    `CommandError` Rust), dan nilai yang TERSIMPAN di database berbahasa
    Inggris (`'Active'`/`'Inactive'`, `'Pending Verification'`, `'Sent'`,
    `'Used'`, `'Expired'`, `'Cancelled'`, `delivery_status = 'Awaiting Approval'`,
    filter `"ALL"`); kode error tetap seperti semula. Database pra-rilis yang
    CHECK-nya masih berbahasa Indonesia ditolak di awal `ensure_schema`
    (`LEGACY_STORED_VALUES_SQL` di `turso.rs` dan `db-schema.ts`, wajib
    identik) karena SQLite tidak bisa mengubah CHECK di tempat. Dokumen
    developer tetap berbahasa Indonesia. Tampilan mengikuti `DESIGN.md`: token
    di `@theme` pada `globals.css` kedua workspace, tema terang, font lewat
    `next/font` (dibundel saat build), ikon dari `components/ui/Icon.tsx`.
    Komponen UI bersama (`components/ui/*`, kartu Pengaturan, panel
    provisioning, lisensi, `SyncIndicator`) ditulis SEKALI di web-desktop dan
    ikut `filesToCopy`; beda platform ditangani di dalam komponen lewat
    `isMobileRuntime()`. Yang tetap terpisah hanya kerangka layar
    (`AppShell`/`MobileAppShell`) dan halaman `src/app/**`.
36. **Sesi tunggal (PRD FR-03).** Login online terakhir menang: login Web
    (`createSessionRecord`) dan login online perangkat (`open_device_session`)
    mencabut sesi lain operator itu (`SESSION_SUPERSEDE_SQL`) di transaksi yang
    SAMA dengan pembuatan sesi baru. Login offline tidak pernah mengusir siapa
    pun: siklus sync pertama yang tersambung memutuskan tersusul atau
    dipromosikan (`sync::check_session`, dijalankan SEBELUM push; gagal =
    push dilewati, pull tetap jalan). Waktu di `app_session` bercampur bentuk
    ISO (Web) dan `datetime('now')` (perangkat), jadi setiap perbandingannya
    WAJIB `julianday()` — teks `"…T08…"` lebih besar dari `"… 08…"`. SQL-nya
    ada di `clients.rs` dan `src/lib/auth/session-sql.ts`, wajib identik.
    Sesi yang dicabut disimpan 30 hari (`SESSION_PURGE_SQL`), bukan dihapus
    saat login: perangkat yang lama offline membandingkannya. Entri outbox
    sesi yang tersusul diberi `quarantined_at`, tidak didorong, tidak
    dihapus, dan tetap menjaga barisnya dari `delete_missing`; hanya
    pemiliknya yang memutuskan Kirim atau Buang (`sync.retry`, tercatat di
    log audit). Mode Database Lokal tidak membuka sesi cloud.
    Membuang perubahan, baik dari karantina maupun konflik (perubahan
    yang ditolak cloud), memanggil `forget_local_entity` (`sync.rs`):
    baris yang berasal dari cloud kehilangan jejak hash supaya pull
    menimpanya, baris buatan perangkat yang tidak pernah diterima cloud
    dihapus. Tanpanya alokasi yang ditolak tetap terhitung di perangkat
    selamanya. Konflik tampil di `RejectedChangesBanner` untuk semua role;
    pemiliknya boleh Buang atau Kirim ulang miliknya sendiri, milik orang
    lain menuntut `sync.retry`.
37. **Tiket sampel (PRD FR-06) dan setelan bisnis (FR-11).** Aturan langkah
    ada di SATU fungsi per bahasa, `applySampleAction` (`sample.ts`) ↔
    `apply_sample_action` (`samples.rs`), dengan vektor kembar; UI hanya
    memakainya untuk menawarkan tombol. Status tiket berubah HANYA lewat rute
    `sample/transition`, dan cloud memeriksanya ulang di `sample_guard`
    (`turso.rs`): status/revisi di cloud harus sama dengan yang dilihat
    pencatat, dan hasil langkah dihitung ulang dengan kuota klien di cloud.
    Tidak cocok = konflik, tidak pernah menimpa. `clients.lifecycle_status`
    diturunkan dari tiket (`CLIENT_LIFECYCLE_FROM_SAMPLES_SQL`, aman diulang)
    dan SENGAJA tidak ditimpa `client/update`. Langkah RnD/Finance dicatat CS
    atas nama divisi itu (`on_behalf_of_division`, D-23). Angka bisnis yang
    bisa berbeda antar perusahaan (kuota revisi, mode biaya sampel, batas
    Hot/Warm) adalah kunci `setting_gex_system` yang dibaca lewat
    `readBusinessSettings`/`read_business_settings`, bukan konstanta; kuota
    disalin ke klien saat klien dibuat, jadi mengubah setelan tidak mengubah
    klien lama.
    Sejak v2.1/v2.2 izin langkah ditentukan SATU fungsi,
    `sampleActionPermission` ↔ `sample_action_permission`: Accept, Reject,
    dan Sample ready menuntut `rnd.manage`; Payment received dan
    `SET_REVISION_FEE` menuntut `finance.manage`; sisanya `samples.manage`.
    Route Web dan command Rust sama-sama memakainya; menyembunyikan tombol
    bukan guard. Gerbang harga (D-27): `SAMPLE_SENT` ditolak selama iterasi
    yang berjalan (`revision_index + 1`) belum punya baris
    `pricing_formulas`; harga dicatat lewat rute `sample/price`, hanya saat
    `SAMPLE_READY`, dan harga jualnya selalu dihitung ulang
    `computeUnitPrice` ↔ `compute_unit_price` (margin atas harga jual,
    dibulatkan ke atas). Rincian HPP dan margin ikut snapshot supaya Finance
    bisa bekerja offline, tetapi command dan route detail MEMBUANG
    `PRICE_COST_COLUMNS` bagi yang tidak memegang `pricing.view`. Isian RnD
    (klasifikasi, alasan tolak dari Master Data `RND_REJECT_REASON`, formula)
    diperiksa `validateRndStep` ↔ `validate_rnd_step` di perangkat, Web, dan
    cloud. Formula disimpan di `sample_formulas` hanya-tambah, satu baris per
    iterasi, `formula_code` SENGAJA tidak unik. Event `sample/transition`
    tanpa kunci `rnd` (antrean build lama) diterima tanpa isian RnD, bukan
    ditolak, supaya tidak macet selamanya di outbox.
38. **Foto (PRD FR-07).** Kompresi WebP (1280 px, kualitas 75, ≤ 300 KB)
    dikerjakan webview lewat `src/lib/media/compress-image.ts` di ketiga target,
    tanpa encoder di Rust; Web dan cloud memeriksa ulang hasilnya dengan
    `validateMediaUpload` ↔ `validate_media_upload` (vektor kembar, header
    `RIFF....WEBP`, ukuran dihitung sendiri, tidak dipercaya dari payload).
    `media_asset` hanya-tambah (D-13) dan terpisah dari baris pemiliknya.
    Snapshot SENGAJA hanya membawa data ringkas foto, tanpa `data_base64`:
    isinya diambil satu per satu (`desktop_get_media`), lalu disimpan di
    perangkat sehingga sesudahnya terlihat offline, dan pull berikutnya tidak
    pernah menimpanya karena kolom itu tidak ada di daftar kolom snapshot.
    Batch push dibatasi `PUSH_BATCH_MAX_BYTES` (4 MB), bukan hanya 50 event.
39. **Notifikasi divisi (PRD FR-08).** `notification_outbox`,
    `telegram_config`, dan `notification_seen` cloud-only: tidak ada di
    `storage.rs` maupun `SNAPSHOT_TABLES`. Baris notifikasi lahir di transaksi
    cloud yang SAMA dengan mutasinya (handler push `client/register`,
    `sample/transition`, dan `sample/price` di `turso.rs`;
    `registerClient`/`recordSampleStep`/`recordSamplePrice` di Web), jadi
    event yang ditolak sebagai konflik tidak pernah memberi tahu.
    `id` sekaligus kunci dedupe. Status Telegram diputuskan saat baris lahir
    (`SKIPPED` bila bot mati atau chat ID divisi kosong, supaya menyalakan bot
    tidak membanjiri grup); lonceng membaca semua baris. Pengirimnya
    `notifications::dispatch` di akhir `synchronize` (best effort, aturan 9)
    dan `after()` di route Web (query lonceng tiap 60 dtk, registrasi, langkah
    tiket) — tidak ada worker latar. Klaim `UPDATE … claimed_at` hanya
    dimenangkan satu pengirim; klaim > 10 menit boleh diambil ulang (duplikat
    langka, disengaja), 5 kali gagal = `FAILED` dan tampil di Pengaturan.
    Seluruh SQL dan teks pesan identik di `validations/notification.ts` ↔
    `notifications.rs` (dites per karakter). Izin lonceng berakhiran `.view`
    (`notifications_cs.view`, dst.) supaya tetap terbaca di mode baca-saja
    lisensi. Token bot tidak pernah dikirim ke frontend; kosong = pertahankan.
40. **Impor CSV klien (PRD FR-09).** Layar (`ClientImport.tsx`) hanya
    membaca berkas, menebak pemetaan header dan urutan tanggal, lalu
    memetakan nilai PIC/Kode Asal Lead/Kategori ke id; ia tidak memutuskan
    validitas apa pun. Backend (`importClients` ↔ `desktop_import_clients`)
    dipanggil DUA kali dengan pemeriksaan yang sama — `dry_run: true` untuk
    pratinjau, `false` untuk simpan dalam satu transaksi — jadi yang lolos
    pratinjau adalah yang tersimpan. Aturan per baris ada di fungsi kembar
    `validateImportRow`/`parseSheetDate`/`normalizeImportPhone` ↔
    `validate_import_row`/`parse_sheet_date`/`normalize_import_phone`
    (`clients.rs`, vektor kembar). Urutan tanggal (DMY/MDY) WAJIB dipilih,
    tidak pernah ditebak diam-diam: `12/5/2026` sah di kedua urutan. Hanya
    menambah: kode yang sudah ada (tanpa membedakan huruf besar-kecil)
    dilewati. Nomor WhatsApp BOLEH dipakai beberapa klien (D-42): impor
    hanya mencatatnya sebagai peringatan, form klien meminta konfirmasi
    (`confirm_shared_phone`, pesan `sharedPhoneMessage` ↔
    `shared_phone_message`, dikenali form dari
    `CLIENT_PHONE_SHARED_SUFFIX`), dan cloud tidak lagi menjadikannya
    konflik. Operator tidak terpengaruh. Jawaban PIC menjadi interaksi `INBOUND`/`OTHER` pada waktu
    respons terakhir supaya Jumlah FU dari sheet tidak bertambah di cloud.
    Payload `client/register` hasil impor membawa `imported: true` dan handler
    push TIDAK menulis notifikasi untuknya. Impor menuntut `clients.manage`
    DAN `leads.reassign`, karena ia menetapkan PIC untuk operator lain.
41. **Cabang Desktop gateway memetakan field satu per satu.** Cabang Web
    biasanya meneruskan seluruh draft, sedangkan cabang `invokeDesktop`
    menyalin field ke nama snake_case secara manual. Field yang lupa disalin
    hilang tanpa galat: Web lulus, Desktop gagal. Contoh nyata:
    `createOperator`/`updateMasterOperator` tidak mengirim `email`/`no_hp`,
    sehingga setiap operator baru di Desktop ditolak "Enter a valid operator
    email." dan suntingan kontak tidak pernah tersimpan. Menambah field di
    sebuah draft berarti memeriksa KEDUA cabang gatewaynya dan field yang
    dibaca command Rust-nya.
42. **Layar yang menampilkan data sinkron memuat ulang pada
    `SYNC_COMPLETED_EVENT`.** Kartu yang membaca sekali saat mount (misalnya
    Company profile) tetap menampilkan nilai lama walau pull sudah membawa
    yang baru, dan itu terlihat persis seperti sinkronisasi yang rusak. Muat
    ulang hanya bila formulir belum disunting: pola `loadedRef` di
    `CompanyProfileCard.tsx` mengganti isi form hanya selama form masih sama
    dengan nilai terakhir dari backend. Kerangka layar dan pola menu ada di
    bagian "Navigasi" `DESIGN.md`.
43. **Tagihan dan uang masuk (PRD F-17, v2.3a).** Aturan di SATU modul per
    bahasa, `validations/finance.ts` ↔ `desktop/finance.rs` (vektor kembar,
    SQL dites per karakter). Pajak dan diskon (`finance_options`) DISALIN ke
    tagihan saat dibuat (`taxes_json`, `discount_*`); payload membawa tarif
    salinan itu dan cloud menghitung ulang totalnya dengan `computeInvoice` ↔
    `compute_invoice` (diskon sebelum pajak, pembulatan ke rupiah terdekat).
    Lunas TIDAK disimpan: `paid_idr` = jumlah `fund_allocations`, dan tagihan
    hanya `OPEN`/`CANCELLED`. Alokasi v2.3a wajib persis sebesar sisa tagihan
    (`allocationCheck` ↔ `allocation_check`, dipakai perangkat, Web, dan
    `finance_guard` cloud yang menjadikan alokasi ganda dari dua perangkat
    offline konflik). Batal/void hanya selama belum ada alokasi, alasan
    wajib. Nomor `INV-YYYYMMDD-<KP><NN>` memakai tag perangkat seperti kode
    klien, tanpa UNIQUE. Gerbang tiket dibaca dari `SAMPLE_LIST_SQL`
    (`fee_paid`, `test_paid`): Payment received menunggu tagihan biaya
    sampel/revisi lunas, Sample sent pada tiket "with testing" menunggu
    tagihan uji lunas; tagihan TIDAK pernah memindahkan status tiket sendiri.
    Kurang bayar (v2.3b, D-29) satu langkah oleh pemegang
    `payments.approve_exception`: rute `invoice/reschedule` membawa alokasi,
    paket cicilan salinan, dan `remaining_after_idr`; cloud memeriksa sisa
    itu terhadap datanya sendiri lalu menghitung ulang cicilan dengan
    `computeInstallments` ↔ `compute_installments` (bunga SEKALI atas sisa,
    sisa pembulatan di cicilan terakhir, jatuh tempo + k bulan kalender).
    Tagihan asal menjadi `RESCHEDULED` dan dihitung selesai oleh gerbang
    tiket; cicilan (`ref_type = 'INSTALLMENT'`) adalah tagihan biasa yang
    tidak bisa dijadwal ulang lagi. Lebih bayar tetap sisa uang masuk; rute
    `fund/deposit` hanya menandainya sebagai deposit klien (klien wajib).
    Invoice PDF (v2.3c, D-35) dibuat di webview oleh penulis PDF sendiri
    `src/lib/documents/invoice-pdf.ts` (tanpa dependensi, tanpa padanan
    Rust, seperti kompresi foto): satu halaman A4, Helvetica WinAnsi, logo
    JPEG `DCTDecode`, huruf di luar Latin-1 dicetak "?". Kop dari Company
    profile, instruksi pembayaran dari setelan `invoice_payment_instructions`
    (≤ 1000 karakter, WAJIB dikirim walau kosong). Penyimpanannya lewat
    gateway `documents.ts`: Android `mobile_save_document` (dialog SAF,
    aturan 28), Desktop `desktop_save_document` (folder Downloads, nama unik
    `(2)`…), Web unduhan browser; keduanya menuntut `invoices.view` dan
    membersihkan nama berkas (`document_file_name`, hanya `.pdf`).
44. **Tiket desain: mockup dan dummy (PRD F-19, v2.4, D-36).** Aturan di
    SATU modul per bahasa, `validations/design.ts` ↔ `desktop/design.rs`
    (vektor kembar, SQL dites per karakter). Satu tiket desain AKTIF per tiket
    sampel (`design_tickets`, tanpa UNIQUE; `DESIGN_ACTIVE_SQL` di perangkat,
    Web, dan `design_guard` cloud). CS membuat brief (`samples.manage`),
    desainer mengunggah mockup sebagai foto `MOCKUP` dan mencetak/mengirim
    dummy (`design.manage`), CS mencatat respons klien. Langkahnya hanya lewat
    `applyDesignAction` ↔ `apply_design_action` dan rute `design/transition`;
    cloud menghitung ulang dengan status, hitungan tolak, dan setelan
    `max_dummy_rejections` miliknya. Langkah desain ditulis ke
    `sample_status_log` tiket sampelnya (satu linimasa). Gerbang: Sample sent
    menunggu mockup bila tiket meminta dummy atau punya tiket desain aktif
    (`mockup_ready` di `SAMPLE_LIST_SQL`); cetak dummy menunggu klien ACC
    sampel, mockup, dan tagihan `DUMMY_FEE` (putaran pertama wajib lunas,
    putaran berikutnya hanya tertahan tagihan putaran itu yang belum lunas;
    `revision_index` tagihan = putaran). Batas penolakan tercapai = cetak ulang
    hanya pemegang `design.override_dummy_limit` (ikut paket Admin, tidak
    di-seed ke role divisi); payload membawa `override_limit` dan auditnya.
    Kuota foto berlaku per jenis foto. Gerbang MoU (E-20) menyusul di F-20.
    Start printing dummy boleh melampirkan desain cetak (foto
    `DUMMY_ARTWORK`, opsional, per putaran); jenis foto yang ikut sebuah
    langkah ditentukan SATU fungsi `stepEvidencePurpose` ↔
    `step_evidence_purpose` (balasan klien wajib, desain cetak opsional),
    termasuk di handler cloud. `dummy_paid` di `SAMPLE_LIST_SQL` (aturan
    `DESIGN_LIST_SQL`) membuat tiket yang menunggu tagihan dummy masuk
    Finance queue dan baris Next step.
45. **MoU produksi dan DP (PRD F-20, v2.5a, D-37).** Aturan di SATU modul
    per bahasa, `validations/mou.ts` ↔ `desktop/mou.rs` (vektor kembar, SQL
    dites per karakter). Satu MoU per order (OQ-22) dan satu MoU aktif per
    tiket sampel (`production_mou`, tanpa UNIQUE; `MOU_ACTIVE_SQL` di
    perangkat, Web, dan `mou_guard` cloud). MoU hanya untuk tiket
    `CLIENT_ACC`; dikirim ke klien hanya bila dummy tidak diminta atau sudah
    `DUMMY_ACC` (E-20, `dummy_ready`). Total = unit × harga satuan sebelum
    pajak dan DP = `applyRate(total, dp_bp)` SELALU dihitung
    `validateMouTerms` ↔ `validate_mou_terms`, termasuk di cloud; payload
    tidak dipercaya. Harga satuan bawaan = harga sampel terakhir, persen DP
    bawaan = setelan `dp_percentage_bp`; keduanya hanya diubah pemegang
    `finance.manage` (`merge_mou_terms`/`mergeTerms`), sisanya `mou.manage`.
    Suntingan hanya pada draf, dijaga `updated_at` (rute `mou/update`);
    langkah lewat `applyMouAction` ↔ `apply_mou_action` dan rute
    `mou/transition`, ditulis ke `sample_status_log` tiket sampelnya.
    Tagihan `DP_PRODUCTION_LEGAL` hanya untuk MoU `ACCEPTED`; "DP lunas"
    dihitung (`dp_cleared` di `MOU_LIST_SQL`, `dp_paid` di
    `SAMPLE_LIST_SQL`), tidak disimpan, dan dipakai gerbang F-21. PDF MoU
    memakai penulis PDF v2.3c (`buildMouPdf`, kop bersama `drawHeader`).
    `CLIENT_ACC` BUKAN akhir tiket sejak v2: daftar Samples menaruhnya di
    In progress, dan baru di Closed bila MoU terakhirnya ditolak atau
    dibatalkan tanpa MoU aktif (`mou_closed` di `SAMPLE_LIST_SQL`; MoU baru
    membukanya lagi). Setelah ACC, Edit request tetap terkunci tetapi foto
    `REFERENCE` masih boleh (`uploadSampleMedia` ↔ `upload_sample_media`).
46. **Persetujuan klien: tautan dan jalur manual (PRD F-18, v2.5b, D-38).**
    Satu mesin untuk tiga hal yang menunggu jawaban klien: sampel
    `SAMPLE_SENT`, dummy `DUMMY_SENT`, MoU `SENT`. `approval_tokens`
    cloud-only (tidak di `storage.rs` maupun snapshot) dan hanya memegang
    hash token. Tautan dibuat LANGSUNG di cloud (`create_approval_link` di
    `turso.rs`, `createApprovalLink` di Web), hanya online dan bukan di Mode
    Database Lokal; `APPROVAL_INSERT_SQL` hanya menulis bila hal itu di
    cloud sedang menunggu klien, kedaluwarsa dihitung database
    (`approval_token_ttl_days`), tautan baru mencabut yang lama. Alamatnya
    dari setelan `approval_web_url` (`normalizeApprovalWebUrl` ↔
    `normalize_approval_web_url`, wajib `https://`, kosong = hanya manual).
    Halaman `/approve` (Web saja) dan `/api/approval/query|respond` terbuka
    tanpa login, dijaga rate limit login (hanya token tidak sah yang
    dihitung) dan dicatat di audit (`approval.invalid`). Jawaban diterapkan
    Web dengan fungsi langkah YANG SAMA (`recordSampleStep`,
    `recordDesignStep`, `recordMouStep` dengan `{ transaction, viaLink }`)
    di satu transaksi bersama pemakaian token dan notifikasi CS; pelakunya
    `{ id: null, role: "Client" }`. Token gugur bila status atau putaran
    hal itu sudah berubah, termasuk karena jawaban dicatat manual. Langkah
    jawaban klien yang dicatat staf (`CLIENT_DECISION_ACTIONS`) WAJIB
    membawa tangkapan layar `CLIENT_RESPONSE` (`clientEvidence` ↔
    `client_evidence`), disimpan di transaksi langkahnya dan dibawa payload;
    cloud menyimpannya bila ada dan menerima event lama tanpanya.
47. **Dokumen legal (PRD F-21, v2.6, D-39).** Aturan di SATU modul per
    bahasa, `validations/legal.ts` ↔ `desktop/legal.rs` (vektor kembar, SQL
    dites per karakter). Satu baris `legal_documents` per dokumen per MoU:
    White Label hanya Halal bahan; Dengan BPOM SIG, BPOM, HKI, dan Halal
    produk (`requiredLegalKinds`, `halalScope`). Semuanya terkunci sampai DP
    Produksi & Legal lunas (E-21, `dp_cleared` dari aturan 45, tidak
    disimpan); BPOM menunggu SIG final (`ISSUED` atau `NOT_REQUIRED`), HKI
    dan Halal bebas urutan (`legalGateError` ↔ `legal_gate_error`). Status
    `SUBMITTED` → `ISSUED`, atau `NOT_REQUIRED` dengan alasan (bukan untuk
    BPOM); koreksi hanya selama `SUBMITTED`, dan final tidak bisa diubah.
    Satu rute `legal/record` membawa `base_updated_at`: `LEGAL_UPSERT_SQL`
    hanya menimpa bila `updated_at` di cloud sama dan barisnya belum final,
    `legal_guard` (`turso.rs`) menghitung ulang gerbangnya dengan data cloud,
    dan jenis yang sama dengan `id` lain dari perangkat kedua menjadi
    konflik. Izinnya `legalKindPermission` ↔ `legal_kind_permission`: SIG
    `rnd.manage`, sisanya `legal.manage` (seed role Legal bersama
    `samples.view` dan `clients.view`, `LEGAL_PERMISSION_SEED_SQL` sekali
    dengan penanda `legal_permissions_seeded`). Foto dokumen opsional
    (`LEGAL_DOCUMENT`), langkahnya ditulis ke `sample_status_log` tiket
    (`LEGAL_<KIND>`), dan `legal_open` di `SAMPLE_LIST_SQL` mengisi tab Legal
    queue. `legalComplete` disiapkan untuk gerbang PPIC v3.
48. **Impor sheet lama (PRD F-22, v2.7, D-40).** Data Uang Masuk menjadi
    `incoming_funds` lewat rute `fund/record` yang SUDAH ADA (payload
    `imported: true`, tanpa foto); Database Formulasi dan Database Desain
    menjadi arsip hanya-tambah `imported_records` (jenis `FORMULA`/`DESIGN`,
    snapshot, rute `imported-record/record`) yang hanya tampil di detail
    klien, tanpa HPP/margin dan tanpa sunting/hapus. Aturannya di SATU modul
    per bahasa, `validations/sheet-import.ts` ↔ `desktop/sheet_import.rs`
    (vektor kembar, SQL dites per karakter): `parseSheetAmount` (Rp, titik
    atau koma ribuan, `,00`/`,-` dibuang, sen bukan nol ditolak),
    `parseSheetDay`, `validateSheetRow`, `sheetRowKey`, dan
    `planSheetImport`, yang dipanggil perangkat dan Web untuk pratinjau DAN
    simpan (pola aturan 40, satu transaksi, satu audit `sheet.import`).
    Impor ulang menambah nol: uang masuk dilewati per (tanggal, nominal,
    keterangan), arsip per (jenis, klien, kode, judul, tanggal), tanpa
    membedakan huruf besar-kecil; duplikat DI DALAM berkas sengaja tidak
    dilewati. Kode Klien wajib dan harus terdaftar untuk arsip, opsional
    untuk uang masuk. Izin per jenis `sheetImportPermission` ↔
    `sheet_import_permission` (`finance.manage`, `rnd.manage`,
    `design.manage`); izin PRD `data_import.run` tidak dipakai. Cloud
    memeriksa ulang arsip dengan `archive_payload_error` (khusus Rust).
49. **Ekspor Excel dan template impor (v2.8, D-41).** Berkas .xlsx dibuat
    webview oleh penulis sendiri `src/lib/documents/xlsx.ts` (tanpa
    dependensi, zip tanpa kompresi + XML; teks tetap teks sehingga nomor
    WhatsApp tidak menjadi `6.28E+12`, angka berpemisah ribuan, tanggal
    sebagai tanggal Excel) dari daftar yang sedang tampil, lalu disimpan
    lewat `saveXlsx` (`gateways/documents.ts`): Android `mobile_save_xlsx`
    (SAF, aturan 28), Desktop `desktop_save_xlsx` (Downloads), Web unduhan
    browser SETELAH `/api/export/record`. Impor menerima .xlsx (`readXlsx`:
    sheet pertama, deflate lewat `DecompressionStream`, sel tanggal Excel
    diubah menjadi `YYYY-MM-DD[ HH:MM]`, rumus dibaca nilainya) dan .csv.
    Ekspor menuntut izin `data.export` (ikut paket Admin, tidak di-seed ke
    role divisi, boleh di mode baca-saja lisensi) dan setiap ekspor tercatat
    di log audit (`data.export`); Desktop/Mobile mencatatnya hanya bila
    berkas benar-benar tersimpan. Template impor (`purpose: "template"`)
    cukup izin impor mana pun dan `checked_xlsx` membatasinya 16 KB, karena
    Rust tidak membaca isi zip. Kolom ekspor klien dan uang masuk = kolom
    impornya, jadi berkasnya bisa diimpor ulang. Laporan ringkasan tetap F-40.
50. **Work order produksi (PRD F-23/F-24, v3.1, D-43/D-44).** Aturan di SATU
    modul per bahasa, `validations/production.ts` ↔ `desktop/production.rs`
    (vektor kembar, SQL dites per karakter). Satu work order per MoU
    (`production_batches`, tanpa UNIQUE; `BATCH_ACTIVE_SQL` di perangkat, Web,
    dan `production_guard` cloud), dibuat PPIC (`ppic.manage`) hanya untuk MoU
    `ACCEPTED` yang DP-nya lunas (`batchRequestError` ↔ `batch_request_error`),
    paralel dengan dokumen legal (OQ-22); tahap lantai produksi (v3.2) yang
    menunggu `legalComplete`. PO banyak per work order (`batch_purchase_orders`,
    domain sync sendiri `purchase-order`, satu entitas per PO, supplier dari
    Master Data `SUPPLIER`); langkahnya hanya lewat `applyPoAction` ↔
    `apply_po_action`, dan cloud menolak langkah dari status/ETA basi. Bahan
    siap hanya tanpa PO terbuka (`BATCH_READY_SQL` menjaga dirinya sendiri).
    Jadwal 4 tahap oleh SPV (`production.manage`), berurutan, beralasan bila
    mengubah jadwal yang ada, dijaga `schedule_updated_at` (bukan
    `updated_at`, supaya langkah PO dari perangkat lain tidak membuat jadwal
    konflik). PO terlambat menandai `needs_reschedule` sampai jadwal disimpan
    lagi. Langkahnya ditulis ke `sample_status_log` tiket sampel. Notifikasi
    divisi PRODUCTION (satu grup PPIC/SPV/QC/Logistik,
    `telegram_chat_id_production`): work order baru → Production, PO terlambat
    → CS + Production, jadwal → CS. Awalan nomor tagihan, MoU, dan work order
    adalah setelan (`invoice_number_prefix`, `mou_number_prefix`,
    `batch_code_prefix`, aturan sama dengan awalan kode klien); bagian
    `-YYYYMMDD-<KP><NN>` tetap demi keunikan offline.
    Tahap lantai produksi (F-25, v3.2, D-45) disimpan sebagai
    `stages_done` (0-4) di work order, tanpa tabel log tersendiri: siapa dan
    kapan ada di `sample_status_log` (`STAGE_<TAHAP>`). Satu rute
    `batch/stage` membawa `base_stages_done`; `BATCH_STAGE_SQL` hanya maju
    satu tahap dari tahap yang dilihat pencatat, dan `production_guard`
    menolak tablet basi (E-34). Gerbangnya `stageGateError` ↔
    `stage_gate_error`: tahap 1 menunggu bahan Ready, jadwal, dan
    `legal_open = 0` (dokumen legal wajib final, OQ-22, dihitung di
    `BATCH_LIST_SQL`). Packing wajib koli dan unit jadi
    (`validateStageRecord` ↔ `validate_stage_record`) dan memberi tahu CS +
    Finance. Setelah Penimbangan PO terkunci (`PRODUCTION_STARTED`), tanggal
    tahap yang selesai tidak berubah, dan seluruh jadwal terkunci setelah
    Packing (`scheduleLockError` ↔ `schedule_lock_error`). Tidak ada tombol
    batal tahap; "Behind schedule" hanya tampilan.
    Pelunasan dan biaya titip (F-26/F-31, v3.3, D-46) tanpa perubahan skema:
    jenis tagihan `SETTLEMENT`/`SHIPPING` (setelah Packing) dan `STORAGE_FEE`
    (setelah pelunasan lunas, biaya > 0) di `invoiceTypeError` ↔
    `invoice_type_error`. Biaya titip dan status tagihan dihitung DATABASE di
    `BATCH_LIST_SQL` (kini subquery: pemanggil memakai `b.id`, bukan
    `b.rowid`): hari ditagih = tanggal terima uang pelunasan (selama belum
    lunas: hari ini, zona perusahaan) − tanggal Packing − `storage_grace_days`,
    × koli × `storage_fee_idr` (`storageFeeDue`). Siap kirim =
    `shipGateError` ↔ `ship_gate_error` (cicilan pelunasan harus lunas
    semua), ditempel ke baris tiket oleh `attachShipState` ↔
    `attach_ship_state` untuk Next step, Finance queue, dan isian bawaan form
    tagihan; ditegakkan saat pengiriman dicatat (v3.4). Notifikasi
    `SHIP_CLEARED` ke grup Production dirakit dari `BATCH_LIST_SQL`
    (`notifyShipClearedSql` ↔ `notify_ship_cleared_sql`) di transaksi
    alokasi dan pembuatan tagihan, sekali per work order.
    Pengiriman (F-27, v3.4, D-47): tabel `shipments` (domain `shipment`),
    satu aktif per work order (`SHIPMENT_ACTIVE_SQL`, tanpa UNIQUE). Surat
    Jalan hanya terbit bila `shipGateError` lolos, dihitung ulang di
    perangkat, Web, dan `shipment_guard` cloud (`shipmentRequestError` ↔
    `shipment_request_error`). Langkah `PREPARED` → `SHIPPED` → `FORWARDED`
    (koreksi/batal hanya selama `PREPARED`, resi boleh menyusul) hanya lewat
    `applyShipmentAction` ↔ `apply_shipment_action`, dijaga status +
    `updated_at`; izinnya `shipmentActionPermission` ↔
    `shipment_action_permission` (Forwarded = `samples.manage`, sisanya
    `shipping.manage`). Surat Jalan dan SOP Penyimpanan (`storage_sop_text`)
    adalah PDF webview lewat `buildTermsPdf` (MoU memakai fungsi yang sama);
    menyimpan PDF menuntut `invoices.view` ATAU `production.view`. Nomor
    `SJ-YYYYMMDD-<KP><NN>`, awalan `delivery_note_prefix`. Notifikasi
    `SHIPMENT_SHIPPED` ke grup CS.
