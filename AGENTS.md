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
`audit-lalu-perbaiki`, dan `resolve-sync-schema-mismatch`. Kedua folder wajib
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
12. Android: `isMinifyEnabled = false`; pakai `webpki-roots`, bukan
    `rustls-platform-verifier`; pasang provider kripto `ring` di awal `run()`.
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
    dan `settings.manage`. Izin domain yang bisa MENGHAPUS data bisnis
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
    `*.view`, `sync.retry`, `database_backup.export`), dan
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
