---
name: kerjakan-fitur-lintas-platform
description: >-
  Alur kerja lengkap untuk menambah fitur atau mengubah perilaku yang harus bekerja SAMA di Web
  (TypeScript/Next.js), Desktop, dan Mobile (Rust/Tauri) pada aplikasi turunan template ini: analisis
  dulu, minta persetujuan, lalu implementasi paritas TS+Rust, sinkronisasi salinan Mobile, tes vektor
  kembar, dan gerbang kualitas penuh. Pakai setiap kali user meminta fitur baru, domain baru pengganti
  domain contoh, perubahan aturan bisnis, sakelar/setting baru, perubahan skema tabel, command Tauri
  baru, atau memilih pekerjaan dari backlog, misalnya "tambahkan modul stok", "ganti domain contoh
  dengan pelanggan", "buat sakelar X di Pengaturan", "fitur ini harus jalan juga di mobile", "lanjutkan
  poin 1", "implementasikan sekarang serta test-nya". JANGAN dipakai untuk: pertanyaan penjelasan murni,
  audit atau review sebuah area (pakai `audit-lalu-perbaiki`), error versi skema sync yang sudah
  terjadi (pakai `resolve-sync-schema-mismatch`), build/rilis APK, atau commit/PR.
---

# Kerjakan Fitur Lintas Platform

## Latar singkat (anggap Anda belum tahu apa-apa)

Repo ini aplikasi 2-tier offline-first dengan tiga build dari dua workspace:

| Build | Workspace | Logika | Akses data |
|---|---|---|---|
| Web | `web-desktop/` | TypeScript: route `src/app/api/**/route.ts`, logika server di `src/lib/server/` | langsung ke database LibSQL |
| Desktop | `web-desktop/src-tauri/src/desktop/*.rs` | Rust (Tauri) | SQLite lokal + outbox, sinkron dua arah |
| Mobile | `mobile/` (Rust di `src-tauri/src/mobile/`) | sama dengan Desktop | sama dengan Desktop |

Tiga fakta yang menentukan hampir setiap keputusan:

1. **Setiap aturan bisnis ditulis DUA kali**: TS untuk Web, Rust untuk Desktop/Mobile. Keduanya wajib memberi jawaban yang sama, dan paritasnya dijaga dengan **vektor tes yang sama** di kedua bahasa, bukan dengan harapan.
2. **`web-desktop` adalah sumber kanonik.** `bun run sync:mobile` menyalin `src/lib/**`, `src/types`, berkas di `filesToCopy` (`mobile/scripts/sync-frontend-lib.ts`), dan modul Rust di `filesToSync` (`mobile/scripts/sync-rust-modules.ts`, sambil mengganti `Desktop*` menjadi `Mobile*`). Menyunting salinan Mobile langsung berarti suntingannya hilang pada sinkronisasi berikutnya.
3. **UI tidak pernah memanggil backend langsung.** Semua lewat `src/lib/gateways/*.ts` yang bercabang: Tauri ke `invokeDesktop("desktop_xxx", {...})`, Web ke `requestWebApi("/api/...", "POST", body)`. Route handler tidak pernah mengekspor `GET` (static export melarangnya).

Aturan lengkap ada di `CLAUDE.md` root. Bila bertentangan dengan skill ini, `CLAUDE.md` yang menang.

**Berkas Mobile yang TIDAK disalin skrip** (disunting tangan dengan isi setara): `config.rs`, `secrets.rs`, `mod.rs`, `lib.rs`, `main.rs`, `app_identity.rs`, `portability.rs`, `sql_backend.rs`, `device_storage.rs`, `build.rs`, `capabilities/default.json`, `permissions/`, `mobile/src/app/**`, dan komponen yang tidak ada di `filesToCopy`. Selalu cocokkan daftar ini dengan kedua skrip sinkronisasi sebelum mengandalkannya: daftarnya bisa berubah.

## Instruksi

### Fase A: pahami sebelum menyentuh apa pun

1. **Pastikan pekerjaan mana yang dimaksud.** Rujukan seperti "lanjutkan poin 1" bisa ambigu. Pilih tafsiran yang paling masuk akal, **sebutkan di kalimat pertama**, lalu lanjut. Jangan berhenti untuk bertanya bila tafsirannya murah dikoreksi.
2. **Baca memori proyek** (`MEMORY.md` di direktori memori, bila ada). Keputusan yang sudah ditutup user tidak boleh ditawarkan ulang.
3. **Telusuri alur yang ada dari ujung ke ujung, di KEDUA bahasa.** Temukan: logika server TS dan route handler-nya, fungsi Rust dan `#[tauri::command]`-nya di `commands.rs`, gateway-nya, dan **setiap** layar yang membaca ATAU menulis data yang sama (halaman Web, halaman Mobile, kartu Pengaturan). Pakai `grep` pada nama field, bukan tebakan. Untuk domain baru, domain klien (`clients`/`leads`/`master_option`, gateway `clients.ts`, halaman `clients`, komponen `components/clients/*`) adalah pola yang ditiru.
4. **Bandingkan kontrak data UI dan Rust secara harfiah.** Tauri hanya mengubah nama ARGUMEN command (snake_case di Rust dipanggil camelCase dari JS); kunci DI DALAM objek JSON tidak dikonversi. Bila UI mengirim `{ isActive }` dan Rust membaca `is_active`, nilainya selalu kosong tanpa error. Cek juga arah baca: bentuk yang dikembalikan Rust dibandingkan dengan tipe yang dibaca UI.
5. **Cek semua pembangun draft.** Bila beberapa layar menyimpan objek yang sama, setiap layar wajib membawa SEMUA field. Field yang dihilangkan tersimpan sebagai nilai bawaan dan menimpa pilihan user.

### Fase B: rencana dan persetujuan (tanpa menulis kode)

6. Tulis rencana memakai template "Rencana" di bawah: kondisi sekarang, pendekatan yang direkomendasikan dan alasannya, alternatif yang ditolak, batasan yang perlu user tahu, dan **keputusan berhuruf (A, B, C, ...) masing-masing dengan rekomendasi Anda**.
7. **Berhenti dan tunggu jawaban user.** Jawaban singkat per huruf ("A setuju, B rekomendasi kamu") adalah keputusan final.
8. Bug lama yang ditemukan di jalur yang sama dimasukkan ke rencana beserta dampaknya bagi pengguna.

### Fase C: implementasi (setelah disetujui)

Urutan ini meminimalkan kerja ulang:

9. **Konstanta dan tipe dulu.** Konstanta bersama di `src/lib/validations/*.ts` dengan cerminan `pub const` di modul Rust yang relevan; komentar di masing-masing menyebut pasangannya. Field baru di tipe TS dibuat **wajib** (bukan `?:`) supaya `tsc` menunjuk setiap pembangun draft yang lupa.
10. **Skema (hanya bila ada tabel/kolom baru).** Keempat lapisan di tabel "Empat lapisan yang wajib identik" pada `CLAUDE.md` diubah dalam SATU perubahan:
    - DDL `CREATE TABLE` di `web-desktop/src-tauri/src/desktop/storage.rs` (lokal), `turso.rs` (cloud), dan `web-desktop/src/lib/db-schema.ts` / `db-migrations.ts` (Web);
    - kolom untuk database lama: `ensure_column` di Rust **dan** migrasi `ALTER TABLE` di TS; indeks yang memakai kolom migrasi dibuat SETELAH kolomnya dipastikan ada;
    - naikkan `CURRENT_SCHEMA_VERSION` (`db-schema.ts`) dan `CLIENT_SCHEMA_VERSION` (`sync.rs`) bersamaan, beserta sentinel skema Rust dan angka yang diperiksa `ensure_schema_current` di `turso.rs`;
    - tabel baru yang ikut sinkronisasi: `SNAPSHOT_TABLES` + rute di `CANONICAL_SYNC_ROUTES` (`sync.rs`) dan handler push di `turso.rs`; tambahkan juga ke `REQUIRED_TABLE_COUNT` + daftar `isDatabaseSchemaReady`.
    Setting sederhana lebih baik disimpan sebagai kunci di `setting_gex_system` (ikut sinkronisasi, tanpa perubahan skema), bawaannya MATI.
11. **Logika Rust** di `web-desktop/src-tauri/src/desktop/`. Modul baru: `pub mod` di `desktop/mod.rs` DAN `mobile/src-tauri/src/mobile/mod.rs`, lalu tambahkan berkasnya ke `filesToSync`. Fungsi murni (keputusan, perhitungan, bentuk payload) dipisah dari I/O supaya bisa diuji dengan vektor.
12. **Command Tauri.** Command baru terdaftar di `lib.rs`, daftar `DESKTOP_COMMANDS` di `build.rs`, `capabilities/default.json`, dan `permissions/autogenerated/<command>.toml`, di KEDUA workspace (berkas-berkas ini tidak disalin skrip). Doc comment `///` diletakkan SEBELUM `#[tauri::command]`. Setiap command memanggil `require_permission` lebih dulu; menyembunyikan tombol di UI bukan guard. Command yang hanya ada di biner Mobile berawalan `mobile_` dan dipanggil gateway di dalam `if (isMobileRuntime()) { ... }`.
13. **Logika TS**: fungsi server + route handler. Route wajib memanggil `assertSameOriginMutation(request)` dan `requireWebPermission(...)`, lalu memvalidasi body dengan Zod `.strict()`. Nilai enum yang tidak dikenal ditolak, tidak pernah dinormalkan ke nilai "aman".
14. **Gateway**: satu fungsi, dua cabang, bentuk argumen sama.
15. **UI** di halaman Web, halaman Mobile (`mobile/src/app/**` tidak disalin), dan setiap layar lain yang menyimpan data yang sama. Halaman privat dijaga `canAccessArea`. Setiap kontrol form punya label (`htmlFor`/`id` atau `aria-label`), dan aksi mutasi di halaman dijaga `isSubmittingRef` terhadap klik ganda. Komponen yang identik di kedua workspace ditulis sekali di `web-desktop/src/components/` lalu didaftarkan di `filesToCopy`.
16. **Dependensi Rust**: crate yang dipakai kode aplikasi harus ada di `[dependencies]`, bukan hanya `[dev-dependencies]`. Tes tidak menangkapnya; kompilasi lib yang gagal.
17. **Tes dengan vektor kembar.** Untuk setiap fungsi murni: tes Rust (`#[cfg(test)] mod tests` di modul yang sama) dan tes TS (`*.test.ts` di samping berkasnya) dengan input dan output identik, dengan komentar yang saling menunjuk. Tambahkan satu tes integrasi TS memakai database memori sungguhan (`createClient({ url: "file::memory:" })` + `initDatabaseSchema`) untuk jalur paling berisiko; contohnya `web-desktop/src/lib/operators/operator-admin.test.ts`. Mock `"server-only"` dengan `mock.module("server-only", () => ({}))` lalu impor modul lewat `await import(...)`.
18. **Perbarui `CLAUDE.md`** bila perilaku arsitekturnya berubah (bukan catatan per fitur kecil). `bun run audit:docs` akan menagih angka dan rujukan berkas yang usang.

### Fase D: sinkronisasi dan verifikasi

19. Jalankan `bun run sync:mobile` dari root. Ulangi setiap kali berkas kanonik berubah lagi, termasuk setelah formatter.
20. Format hanya berkas yang Anda buat/ubah: `bunx biome format --write <berkas>`, dan `rustfmt --edition 2021` hanya untuk berkas Rust baru. Memformat ulang berkas Rust besar yang sudah ada membuat diff meledak.
21. Jalankan `bun run check:quick` dari root **sekali**, setelah semua ditulis. Perbaiki penyebabnya, bukan auditnya.
22. Jalankan `bun run check` (termasuk cargo test kedua workspace, beberapa menit) di latar belakang. Bila user berkata "cargo nanti saja", lewati dan sebutkan di laporan bahwa tes Rust belum dijalankan.
23. Jangan commit. Laporkan memakai template "Laporan selesai".

## Aturan dan batasan

**Wajib:**
- Analisis, lalu persetujuan, lalu kode. Satu-satunya pengecualian: user eksplisit berkata "langsung saja" / "implementasikan sekarang".
- Aturan yang ada di TS dan Rust identik dan diuji dengan vektor yang sama.
- Sunting sumber kanonik di `web-desktop`, lalu `bun run sync:mobile`. Berkas Mobile yang tidak disalin disunting tangan dengan isi setara.
- Setting baru yang mengubah perilaku pemasangan yang sedang berjalan (terutama yang mengirim sesuatu ke luar) **bawaannya MATI**.
- Aturan diputuskan di satu tempat per bahasa (biasanya backend), tidak disalin ke setiap komponen UI.
- Stempel waktu dan perbandingan kedaluwarsa dihitung database (`datetime('now')`), tidak pernah `new Date()` atau jam perangkat.
- Laporan menyebut angka verifikasi yang nyata dan apa pun yang BELUM diverifikasi.

**Dilarang:**
- Menulis kode sebelum user menyetujui rencana.
- Menyunting salinan Mobile hasil skrip sebagai satu-satunya perbaikan.
- Melonggarkan atau mem-whitelist skrip audit (`scripts/*.ts`) supaya lulus.
- Menambah `UNIQUE` constraint (selain PK) pada tabel yang disinkronkan: push outbox macet permanen saat dua perangkat offline bertabrakan. Keunikan bisnis dicek di lapisan aplikasi.
- Menyatakan "selesai" sebelum `bun run check` lulus, atau tanpa menyebut bahwa cargo belum dijalankan.
- Commit, push, atau membuat PR tanpa diminta.

## Format output

### 1. Rencana (akhir Fase B)

```markdown
Saya anggap "<rujukan user>" = <tafsiran>. Belum ada kode yang saya ubah.

## Kondisi sekarang
- <apa yang terjadi hari ini, dari sudut pandang pengguna>
- <apa yang sudah ada dan bisa dipakai ulang>

## Rencana: <nama pendekatan>
<2-4 kalimat: apa yang ditambah/diubah, di mana, dan bagaimana alurnya>

**Kenapa bukan <alternatif>:** <alasan konkret>

## Batasan yang perlu kamu tahu
- <keterbatasan nyata yang akan dirasakan pengguna>

## Bug lama yang ikut ditemukan (bila ada)
- <gejala bagi pengguna>: <penyebab singkat>

## Keputusan yang saya butuhkan
**A. <topik>:** <opsi yang direkomendasikan>. *(Rekomendasi saya.)* <alternatif singkat>
**B. <topik>:** ...

Tunggu persetujuanmu sebelum saya mulai menulis kode.
```

### 2. Laporan selesai (akhir Fase D)

```markdown
<Status + bukti, mis. "Selesai. `bun run check` penuh lulus: N tes Rust web-desktop, M mobile, semua audit dan tes TS hijau.">

**Fitur:**
- **<bagian>:** <apa yang sekarang terjadi, dengan tautan ke berkas>

**Bug lama yang ikut diperbaiki:**
1. **<gejala>.** <penyebab dan perbaikan dalam 1-2 kalimat>

**Tes:** <tes baru apa yang menjaga apa>

**Belum diverifikasi / perlu dicoba di perangkat asli:**
1. <langkah uji manual konkret dan hasil yang diharapkan>

Perubahannya belum di-commit.
```

## Contoh (ilustrasi alur, bukan riwayat nyata)

**Input user:** "Tambahkan stok minimum di item, dan tandai item yang stoknya di bawah itu."

**Fase A:** menelusuri `master_item` di `storage.rs`, `turso.rs`, `db-schema.ts`, `db-migrations.ts`; gateway `item.ts` (`ItemRecord`, `ItemDraft`); command `desktop_save_item` / `desktop_list_items`; halaman `items` di kedua workspace. Ditemukan bahwa route handler Web yang dipanggil gateway ternyata belum ada, jadi halaman Items di Web gagal. Ini dicatat sebagai bug lama.

**Rencana (dipotong):**
> ## Rencana: kolom `stok_minimum` di `master_item`
> Kolom baru di keempat lapisan + `ensure_column`/`ALTER TABLE`, skema naik satu versi. Penandaan "di bawah minimum" dihitung di satu fungsi murni per bahasa dengan vektor kembar.
>
> **A. Nilai bawaan:** 0 (tidak pernah menandai). *(Rekomendasi saya.)*
> **B. Route Web yang hilang:** dibuat sekalian karena di jalur yang sama. *(Rekomendasi saya.)*

**Fase C setelah "A setuju, B setuju":** konstanta dan field wajib `stok_minimum` di `ItemRecord`, lalu DDL + migrasi + versi skema, lalu fungsi murni Rust + tes, lalu command, lalu fungsi server TS + route + tes kembar, lalu gateway, lalu kolom di kedua halaman, lalu `bun run sync:mobile`, `check:quick`, dan `check`.

## Failure mode yang sering terjadi

1. **Kontrak TS dan Rust tidak cocok, dan tidak ada yang berteriak.** UI mengirim camelCase, Rust membaca snake_case; semuanya "berhasil" tetapi menyimpan nilai bawaan. *Cegah:* di langkah 4, grep setiap nama kunci di kedua sisi; tes Rust memakai payload berbentuk persis seperti yang dikirim gateway.
2. **Satu pembangun draft lupa field baru, pilihan user tertimpa diam-diam.** *Cegah:* field baru wajib di tipe TS; grep nama tipe draft dan periksa setiap pemakainya, termasuk halaman Mobile yang tidak disalin.
3. **Salinan Mobile dilupakan atau disunting langsung.** Gejalanya: `audit:schema` melaporkan kolom "ada di Desktop, hilang di Mobile", command tak terdaftar di biner Mobile, atau perbaikan hilang setelah sinkronisasi. *Cegah:* sunting `web-desktop`, jalankan `bun run sync:mobile`, lalu periksa daftar berkas yang tidak disalin; `lib.rs`, `build.rs`, dan `capabilities/default.json` paling sering terlewat.
4. **Menyatakan selesai terlalu cepat.** `check:quick` hijau tetapi Rust gagal dikompilasi (crate hanya di `[dev-dependencies]`, warning `dead_code` dari fungsi yang pemanggilnya dihapus). *Cegah:* `bun run check` penuh; baca bagian warning di log, bukan hanya kode keluar.
5. **Kegagalan infrastruktur tes dikira bug kode.** Di Bun Windows, modul native libsql bisa segfault bila satu berkas tes membuat klien database baru setelah menutup klien lain; tesnya lulus satu per satu tetapi crash bila dijalankan bersama. *Cegah:* SATU klien per berkas tes (`beforeAll` inisialisasi, `beforeEach` hapus baris, `afterAll` tutup); jalankan berkasnya beberapa kali sebelum menyimpulkan.
