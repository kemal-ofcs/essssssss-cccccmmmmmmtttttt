---
name: audit-lalu-perbaiki
description: >-
  Audit berbasis bukti atas satu area aplikasi turunan template ini (keamanan pre-launch, atau satu
  fitur seperti login, RBAC, lupa password, ekspor/impor, lisensi, sinkronisasi) di Web, Desktop, dan
  Mobile: petakan kodenya dari UI sampai Rust, laporkan temuan bernomor dengan severity + file:baris +
  dampak nyata + fix yang pasti, minta keputusan per huruf, BERHENTI, lalu setelah disetujui kerjakan
  HANYA yang disetujui dengan paritas TS+Rust, sinkronisasi Mobile, tes, dan gerbang kualitas penuh.
  Pakai setiap kali user meminta audit, review, atau "cek apakah sudah benar" atas sebuah area,
  misalnya "audit keamanan sebelum rilis", "cek apakah jalur X sudah aman", "cari celah di login",
  "apakah fitur ini ada bug", atau ketika user membalas daftar temuan dengan keputusan per huruf ("A
  setuju, B lewati, lanjutkan rekomendasi kamu 5, 6, 8-16"). JANGAN dipakai untuk: satu bug dengan
  gejala yang sudah jelas dan user minta hipotesis dulu (itu debugging), fitur baru atau perubahan
  aturan bisnis (pakai `kerjakan-fitur-lintas-platform`), error versi skema sync
  (`resolve-sync-schema-mismatch`), review diff atau PR (`code-review`), build/rilis APK, atau
  commit/PR.
---

# Audit lalu Perbaiki

## Latar singkat (anggap Anda belum tahu apa pun soal proyek ini)

Aplikasi 2-tier offline-first, tiga build dari dua workspace:

| Build | Folder | Logika | Akses data |
|---|---|---|---|
| Web | `web-desktop/` | TypeScript: route `src/app/api/**/route.ts`, logika server `src/lib/server/` | langsung ke database LibSQL |
| Desktop | `web-desktop/src-tauri/src/desktop/*.rs` | Rust (Tauri) | SQLite lokal + outbox, sinkron ke database |
| Mobile | `mobile/` (Rust di `src-tauri/src/mobile/`) | sama dengan Desktop | sama dengan Desktop |

Fakta yang menentukan hampir setiap temuan dan perbaikan:

1. Setiap aturan bisnis ditulis DUA kali (TS untuk Web, Rust untuk Desktop/Mobile) dan wajib identik. Temuan di satu bahasa hampir selalu punya kembaran di bahasa lain.
2. `web-desktop` adalah sumber kanonik. `mobile/src/lib/**` dan modul Rust di `filesToSync` (`mobile/scripts/sync-rust-modules.ts`) adalah SALINAN hasil `bun run sync:mobile`. Menyunting salinan Mobile langsung berarti hilang pada sinkronisasi berikutnya. `src/app/**`, sebagian besar `src/components/**`, `lib.rs`, `build.rs`, `config.rs`, dan `secrets.rs` Mobile TIDAK disalin.
3. UI tidak memanggil backend langsung; semuanya lewat `src/lib/gateways/*.ts` yang bercabang Tauri (`invokeDesktop`) atau Web (`requestWebApi`).
4. Aturan proyek lengkap ada di `CLAUDE.md` root. Bila bertentangan dengan skill ini, `CLAUDE.md` menang.

## Instruksi

### Fase A: batasi cakupan (sebelum membaca kode)

1. Tulis ulang permintaan user dalam satu kalimat: area apa, build mana, dan jenis audit (keamanan atau fungsional).
2. Baca memori proyek (`MEMORY.md`, bila ada). Keputusan yang sudah ditutup user tidak boleh ditawarkan ulang.
3. Bila user menulis "JANGAN ubah kode sebelum saya approve" atau sejenisnya, Fase B dan C hanya membaca. Kueri database pun hanya `SELECT`.
4. Jangan bertanya dulu kecuali cakupannya benar-benar tidak bisa ditebak. Tafsiran yang murah dikoreksi cukup disebut di kalimat pertama laporan.

### Fase B: petakan dan telusuri, dengan bukti

5. Inventaris titik masuk area itu di SEMUA build: halaman Web dan Mobile, komponen, gateway, route handler, logika server TS, command Rust (`commands.rs` + modul domainnya). Gunakan `Grep` pada nama fungsi dan nama field, bukan tebakan.
6. Untuk tiap alur, telusuri dari tombol sampai tulis database: validasi di mana, keunikan dicek di mana, apa yang terjadi pada data yang sudah ada, pesan galat apa yang sampai ke user.
7. Untuk audit keamanan, periksa kategori ini satu per satu dan catat hasil tiap kategori, termasuk yang bersih:
   - autentikasi, sesi, dan fallback login offline;
   - otorisasi dan IDOR: route tanpa `requireWebPermission`/`requireWebSession`, command tanpa `require_permission`, halaman tanpa `canAccessArea`;
   - route mutasi tanpa `assertSameOriginMutation`;
   - secret di kode atau bundle klien (`NEXT_PUBLIC_*`), kredensial yang dikirim balik ke frontend;
   - injection (SQL, command, XSS lewat `innerHTML`/`dangerouslySetInnerHTML`);
   - validasi input (Zod `.strict()` di TS, validasi sebelum menulis SQLite di Rust);
   - rate limit dan brute force;
   - CORS, security header, flag cookie, CSP Tauri;
   - dependensi rentan (`bun audit` per workspace, `cargo audit` bila terpasang);
   - data sensitif di log atau respons galat.
8. Untuk audit fungsional, uji jalur bolak-balik: ekspor, sunting, impor ulang; simpan dari satu build lalu baca dari build lain. Periksa apa yang hilang, apa yang diam-diam dilewati, dan apa yang tersimpan salah tanpa pesan.
9. Verifikasi setiap dugaan sebelum dilaporkan: baca baris kodenya, cek pemanggilnya, dan bila perlu jalankan pemeriksaan baca-saja (kueri `SELECT`, `bun audit`). Jangan pernah mencetak token, password, atau API key; laporkan "ada/kosong" saja.
10. Sebelum menulis rekomendasi fix untuk fungsi bersama, `Grep` semua pemanggilnya. Fix yang mengubah perilaku fungsi bersama bisa merusak halaman lain.

### Fase C: laporan dan keputusan, lalu BERHENTI

11. Tulis laporan memakai template "Laporan audit": jawab pertanyaan langsung user dulu, lalu tabel temuan urut severity (Critical, High, Medium, Low), lalu kategori yang bersih, lalu yang belum tercakup, lalu keputusan berhuruf dengan rekomendasi Anda.
12. Pisahkan bug murni (dikerjakan tanpa keputusan) dari hal yang butuh keputusan produk (diberi huruf A, B, C, ...).
13. Berhenti. Jangan menulis kode sampai user menjawab.

### Fase D: kerjakan hanya yang disetujui

14. Kalimat pertama: tafsiran Anda atas jawaban user, terutama yang ambigu ("B lewati" berarti apa saja yang TIDAK dikerjakan).
15. Catat keputusan user ke memori proyek (berkas keputusan + satu baris di `MEMORY.md`).
16. Kerjakan per nomor, dari yang paling kecil dan paling terisolasi. Untuk setiap perubahan:
    - sunting sumber kanonik `web-desktop`, cerminkan aturannya di TS DAN Rust dengan pesan galat yang sama;
    - bila fungsi bersama dipakai halaman lain, tambahkan opsi yang hanya dikirim pemanggil yang membutuhkan, jangan ubah bawaannya;
    - tambahkan SATU tes yang gagal bila logikanya rusak (vektor kembar TS dan Rust bila aturannya dieja dua kali).
17. Setelah semua ditulis: `bun run sync:mobile` dari root; kembalikan berkas Mobile yang hanya berubah akhir baris (`git diff --ignore-cr-at-eol --ignore-all-space --numstat -- <berkas>` kosong, lalu `git checkout -- <berkas>`); format hanya berkas yang disentuh (`bunx biome check --write <berkas>`).
18. Untuk kode ber-`#[cfg(target_os = "android")]`, build host Windows tidak pernah mengompilasinya. Verifikasi dengan `cargo check --lib --target aarch64-linux-android`, dengan `CC_aarch64_linux_android`, `AR_aarch64_linux_android`, dan `CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER` diarahkan ke clang/llvm-ar di NDK (`$NDK_HOME`).
19. Jalankan `bun run check` dari root SEKALI di latar belakang. Baca log: kode keluar, baris `test result`, `(fail)`, `error TS`, dan hasil tiap audit. Baris `error:` yang berasal dari `console.error` yang disengaja di tes bukan kegagalan, tetapi bungkam di tesnya supaya log berikutnya bersih.
20. Jangan commit. Laporkan memakai template "Laporan selesai".

## Aturan dan batasan

Wajib:
- Setiap temuan punya bukti yang bisa dicek ulang: `file:baris`, potongan perilaku, atau hasil kueri/perintah. Temuan tanpa bukti tidak dilaporkan.
- Severity mencerminkan dampak NYATA di pemasangan ini, termasuk kondisi yang melemahkannya (misalnya "aman di Vercel, rentan di server sendiri").
- Kategori yang bersih disebut eksplisit; yang tidak diperiksa disebut "belum tercakup".
- Fix mengikuti aturan repo: paritas TS+Rust, sinkronisasi Mobile, tanpa UNIQUE constraint baru di tabel tersinkron, tanpa melonggarkan skrip audit di `scripts/`.
- Label UI berbahasa Indonesia dan tanpa em dash.

Dilarang:
- Mengubah kode sebelum user menyetujui, bila user memintanya.
- Mengerjakan nomor yang tidak disetujui, atau "sekalian merapikan" kode di luar temuan.
- Mencetak secret, token, password, atau API key; menulis ke database produksi saat audit.
- Mengubah perilaku bawaan fungsi bersama tanpa memeriksa semua pemanggilnya.
- Menyunting salinan Mobile hasil skrip sebagai satu-satunya perbaikan.
- Suntingan massal lewat skrip tanpa dry-run yang ditinjau lebih dulu.
- Menyatakan selesai tanpa `bun run check` lulus, atau tanpa menyebut apa yang belum diverifikasi.

## Format output

### 1. Laporan audit (akhir Fase C)

```markdown
<Satu kalimat: berapa temuan, jenis audit, dan bahwa belum ada kode yang diubah.>

## Jawaban pertanyaan Anda
**"<pertanyaan user>"** <jawaban langsung, dengan file:baris bila relevan>

## Temuan, urut dari yang paling berdampak
| # | Area | Masalah | Dampak nyata |
|---|---|---|---|
| 1 | <halaman/modul> | <apa yang salah, dengan [file:baris](path#Lbaris)> | <apa yang dialami user/penyerang> |

<Untuk audit keamanan, tiap temuan diberi blok: Severity, Lokasi, Eksploitasi, Fix kode.>

**Yang sudah benar:** <kategori/alur yang bersih, eksplisit>
**Belum tercakup:** <apa yang tidak diperiksa dan kenapa>

## Keputusan yang saya perlukan
**A. <topik>:** <opsi>. *(Rekomendasi saya.)* <alternatif singkat>

Bug murni yang saya kerjakan tanpa keputusan: <nomor>.
Tunggu persetujuan Anda sebelum saya mulai menulis kode.
```

### 2. Laporan selesai (akhir Fase D)

```markdown
<Status + bukti: "Semua yang disetujui selesai. `bun run check` lulus: N tes Rust web-desktop, M mobile, seluruh audit LULUS. Belum di-commit.">

## Yang berubah
**<Huruf/nomor>. <judul>:** <apa yang sekarang terjadi, tautan ke berkas>

## Penyimpangan dari rencana (bila ada)
<apa yang berbeda dari laporan audit dan kenapa>

## Perlu dicoba di aplikasi
1. <langkah uji manual konkret + hasil yang diharapkan>
```

## Contoh (ilustrasi alur)

**Input user:** "audit keamanan login dan lupa password sebelum rilis. jangan ubah kode dulu."

**Fase B (yang dilakukan):** peta `desktop_login` dan `desktop_password_reset_*` di `commands.rs`/`turso.rs`, route `POST /api/auth/login` dan `POST /api/password-reset`, rate limit `auth_login_rate_limit`, gerbang TOTP, fallback vault offline. Tiap kategori di langkah 7 dicatat hasilnya. Tiap dugaan dibuktikan dengan baris kode dan pemanggilnya.

**Output Fase C (dipotong):**
> Audit keamanan selesai: 4 temuan (1 High, 2 Medium, 1 Low). Belum ada kode yang saya ubah.
>
> | 1 | Login offline | <masalah, dengan tautan file:baris> | <siapa bisa melakukan apa> |
>
> **Yang sudah benar:** rate limit persisten, token reset hanya disimpan sebagai hash, ...
> **A. <keputusan produk>:** ... *(Rekomendasi saya.)*

**Balasan user:** "A setuju, 3 lewati, sisanya kerjakan."

**Fase D:** kalimat pertama menyebut bahwa nomor 3 tidak dikerjakan; setiap fix ditulis di TS dan Rust dengan pesan galat sama, satu tes per fix, `bun run sync:mobile`, `bun run check`.

## Failure mode

1. **Rekomendasi fix yang merusak pemakaian normal.** Contoh nyata dari proyek turunan: menyarankan rate limit tidak lagi di-reset oleh login sukses, padahal setiap percobaan (termasuk yang sukses) menghitung kunci IP, sehingga kantor di balik satu NAT akan terkunci tiap pagi. *Cegah:* sebelum menulis fix, telusuri efeknya pada alur yang sah; bila ternyata salah saat implementasi, pindahkan fix ke tempat celahnya sebenarnya dan laporkan penyimpangannya.
2. **Mengubah fungsi bersama untuk satu halaman.** *Cegah:* `Grep` semua pemanggil; tambahkan opsi eksplisit yang hanya dikirim pemanggil yang butuh.
3. **Suntingan massal yang merusak kode.** Mengganti sebuah istilah di label ikut mengenai nama variabel dan nilai logika yang ejaannya sama. *Cegah:* skrip dengan dry-run yang ditinjau, aturan hanya-di-dalam-string, lalu typecheck.
4. **Salinan Mobile hilang atau kode Android tidak pernah dikompilasi.** Cabang `cfg(target_os = "android")` yang hanya ditulis di salinan Mobile terhapus oleh sinkronisasi, dan tombolnya diam tanpa galat. *Cegah:* tulis di berkas kanonik, `bun run sync:mobile`, lalu `cargo check --target aarch64-linux-android`.
5. **Menyatakan selesai terlalu cepat atau salah membaca log.** *Cegah:* `bun run check` penuh sekali di akhir, baca angka tes nyata, bedakan `console.error` yang disengaja dari kegagalan, dan sebut apa yang belum diklik di aplikasi.
