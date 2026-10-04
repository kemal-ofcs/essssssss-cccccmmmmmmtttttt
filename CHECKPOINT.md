# Checkpoint 2026-10-04

Titik lanjut pekerjaan Company OS (nama proyek: MaklonOS). Dokumen developer,
berbahasa Indonesia. Aturan lengkap tetap di `CLAUDE.md`; berkas ini hanya
mencatat posisi terakhir dan yang belum selesai.

## Posisi

- **MVP lengkap:** F-01 s/d F-13 (PRD `prd-maklonos.md`). Sesi 2026-10-03/04
  menutup F-08 (notifikasi Telegram per divisi + lonceng) dan F-09 (impor CSV
  klien), lalu audit pra-rilis dan build rilis Desktop + Android.
- **Skema database:** versi 9 (`CURRENT_SCHEMA_VERSION` di
  `web-desktop/src/lib/db-schema.ts`), sentinel Rust terakhir
  `-2017 telegram-notifications-v1` di `turso.rs`. Cloud Turso sudah v9.
- **Identitas rilis:** nama tampilan "Company OS", bundle `id.kos.companyos`
  (Mobile `id.kos.companyos.mobile`), produk lisensi `kos-companyos` dengan
  public key terpasang (private key di `E:\Freelance\lisensi`, di luar repo).
  Nama perusahaan contoh/bawaan tetap "Company Name".
- **Next.js** 16.3.8 di kedua workspace.

## Yang berubah di sesi ini (belum di-commit)

Dua repo: root dan `web-desktop/` (repo terpisah untuk deploy Vercel). Commit
keduanya. 185 berkas `mobile/` yang tercatat terhapus adalah berkas salah
tempat dari commit `fbfff74`; penghapusannya disengaja dan ikut di-commit.

- **F-08 / F-09** beserta aturan 39 dan 40 `CLAUDE.md`.
- **Audit pra-rilis:** security header Web, CSP Mobile `ipc:`-only (yang longgar
  pindah ke `devCsp`), `desktop_set_server_url` menuntut Superadmin +
  `settings.manage`, paket tak terpakai dibuang.
- **Build Android rilis:** `mobile/scripts/patch-android.ts` (R8 mati, tanda
  tangan rilis, nama aplikasi "Company OS"); `APP_OFFLINE_AUTH_MAX_AGE_HOURS`
  ditanam `build.rs` kedua workspace (bawaan 168 jam); pemasangan baru tanpa
  alamat server tidak lagi crash (`origin_from_saved_url` di `config.rs`).
- **Setelan `offline_login_max_days`** (1-7 hari, Business settings): admin
  memperpendek masa login offline di bawah batas build.
- **Perbaikan dari uji di HP:** halaman Android tidak bisa digeser
  (`MobileAppShell.tsx`); kartu Company profile memuat ulang setelah sinkron
  (aturan 42); form operator Desktop tidak mengirim email/no HP (aturan 41) dan
  galat form kini tampil di dalam modal.
- **Tata letak:** Desktop/Web memakai sidebar kiri yang bisa disembunyikan
  (`web-desktop/src/components/AppShell.tsx`); Settings Android menjadi menu
  berkelompok (`mobile/src/app/settings/page.tsx`). Aturannya di bagian
  "Navigasi" `DESIGN.md`.
- **Kredensial cloud bersama tetap teks biasa** (token bot Telegram, kunci API
  email): diputuskan 2026-10-04, dicatat sebagai pengecualian aturan 11 dan di
  tabel 7.2 PRD. Jangan dibuatkan "enkripsi" dengan kunci di database yang sama.
- **Rapi-rapi rilis:** nama Desktop `productName` "Company OS"; `@zxing/browser`,
  `qrcode`, `@types/qrcode` dan alias zxing di kedua `next.config.ts` dibuang
  (tidak ada pemakainya); skrip `tauri:android:build:arm64` memakai `--apk`
  (tanpa AAB Play Store, satu putaran kompilasi Rust lebih sedikit).
- **Dokumen:** aturan 12 (build arm64), 41, 42 di `CLAUDE.md`; `AGENTS.md`
  disamakan dengan `CLAUDE.md`; skill baru `uji-rilis-android` di
  `.claude/skills/` dan `.agents/skills/`.

## Verifikasi terakhir

- `bun run check` penuh LULUS sebelum perubahan sidebar dan menu Settings:
  490 tes TS, 120 tes Rust Desktop, 120 tes Rust Mobile, seluruh audit.
- Sesudahnya (hanya TypeScript, konfigurasi, dan dokumen): `check:quick` LULUS
  (490 tes, seluruh audit), `audit:docs` LULUS, dan `build:web` LULUS setelah
  paket zxing/qrcode dibuang.
- Telegram: pesan uji grup CS sampai (2026-10-04).

## Belum diverifikasi di perangkat

Butuh build ulang Desktop dan APK (`bun run tauri:android:build:arm64`):

1. Desktop: sidebar tampil/sembunyi dan pilihannya diingat; membuat operator
   dengan email (mis. `admin@kos.com`) berhasil; galat tampil di dalam form.
2. Android: semua halaman bisa digeser sampai bawah; Settings berupa menu
   berkelompok dan tombol Back kembali ke menu; nama perusahaan yang diubah di
   Desktop berganti sendiri di kartu Company profile dalam sekitar 30 detik.
3. Sinkron dua arah dengan DUA akun berbeda (akun yang sama saling mengusir,
   aturan 36).

## Tindak lanjut terbuka

- **Keamanan:** token bot Telegram sempat terkirim sebagai pesan di grup.
  Revoke di @BotFather lalu simpan token baru di Pengaturan.
- **Telegram:** chat ID grup RnD dan Finance belum diisi.
- **Ditunda ke sesi khusus (keputusan 2026-10-04):** CSP skrip penuh untuk Web
  lewat nonce di `proxy.ts`. Rencananya: hanya build Web, uji dulu bahwa
  berkas itu tidak memecah ekspor statis Desktop, semua halaman Web menjadi
  dinamis, dan uji Console browser oleh pemilik sebelum deploy. Audit tidak
  menemukan celah XSS, jadi ini lapisan cadangan.
- **Pemasangan Desktop lama:** `productName` kini "Company OS", jadi installer
  baru memasang ke folder baru. Uninstall "companyos" yang lama sekali secara
  manual; data aman karena lokasi data mengikuti `identifier`.
- **Fase berikutnya:** v2 PRD (RnD formulasi, HPP & harga, uang masuk dan
  tagihan, desain/dummy, legal, persetujuan klien lewat tautan). Mulai dengan
  skill `kerjakan-fitur-lintas-platform`: analisis dan keputusan berhuruf dulu,
  tunggu persetujuan, baru kode, lalu `bun run check` sekali di akhir.
