---
name: resolve-sync-schema-mismatch
description: >-
  Diagnosa dan atasi error ketidakcocokan versi skema sinkronisasi antara database dan klien
  Desktop/Mobile (`SCHEMA_VERSION_OUTDATED`, "Aplikasi perlu diperbarui. Skema database cloud sudah
  versi X..."), audit paritas empat lapisan skema sebelum menaikkan versi, pastikan tidak ada fitur
  baru yang tertinggal dari sinkronisasi, dan pastikan UI tidak melaporkan sukses semu saat push
  gagal. Pakai saat user melaporkan error itu, outbox tertahan setelah pembaruan skema, atau bertanya
  "apakah ada tabel/kolom baru yang belum ikut sync sebelum versi skema dinaikkan". JANGAN dipakai
  untuk: masalah jaringan murni (URL/token salah, DNS), error validasi satu payload, bug frontend yang
  tidak menyentuh outbox atau konstanta skema, atau membuat fitur baru dari nol (pakai
  `kerjakan-fitur-lintas-platform`).
---

# Resolve Sync Schema Mismatch

## Latar singkat

Web menulis versi skema ke tabel `schema_migration`; `CURRENT_SCHEMA_VERSION` di `web-desktop/src/lib/db-schema.ts` adalah versi tertinggi yang dikenal jalur Web. Klien Rust membawa `CLIENT_SCHEMA_VERSION` di `web-desktop/src-tauri/src/desktop/sync.rs`. Bila versi di database lebih tinggi dari `CLIENT_SCHEMA_VERSION`, `is_client_schema_outdated` menghentikan push dengan `SCHEMA_VERSION_OUTDATED`, supaya build lama tidak menimpa kolom yang tidak ia kenal. Pull tetap berjalan; kegagalan push dilaporkan lewat `pushError` di status sinkronisasi.

Artinya error ini hampir selalu berarti salah satu dari dua hal:
1. **Build klien memang lama.** Obatnya memperbarui aplikasi, bukan mengubah kode.
2. **Versi dinaikkan di satu sisi saja.** Migrasi TS menaikkan `CURRENT_SCHEMA_VERSION` tetapi `CLIENT_SCHEMA_VERSION` (dan lapisan Rust-nya) tertinggal, atau sebaliknya.

Empat lapisan yang wajib identik (tabel lengkap ada di `CLAUDE.md`): `storage.rs` (SQLite lokal), `turso.rs` (DDL cloud + handler push), `sync.rs` (`SNAPSHOT_TABLES` + `CANONICAL_SYNC_ROUTES`), dan `db-schema.ts` / `db-migrations.ts` (Web).

## Instruksi

### Langkah 1: baca angka versi di kode, jangan menebak
1. `CURRENT_SCHEMA_VERSION` di `web-desktop/src/lib/db-schema.ts`, dan versi migrasi tertinggi di `web-desktop/src/lib/db-migrations.ts`.
2. `CLIENT_SCHEMA_VERSION` di `web-desktop/src-tauri/src/desktop/sync.rs` dan salinannya di `mobile/src-tauri/src/mobile/sync.rs`.
3. Sentinel skema Rust dan angka yang diperiksa `ensure_schema_current` di `turso.rs`.
4. Bandingkan dengan versi di pesan error user. Bila kode sudah sama dan hanya perangkatnya yang lama, berhenti di sini: jawabannya "perbarui aplikasi di perangkat itu".

### Langkah 2: audit apa yang ditambahkan versi itu
1. Baca migrasi versi target: tabel/kolom/indeks apa yang ditambahkan.
2. Untuk setiap tabel/kolom baru, cek kehadirannya di keempat lapisan, plus `ensure_column` di Rust dan `ALTER TABLE` di TS untuk database lama.
3. Tabel yang sengaja di luar snapshot (payload besar, atau cloud-only) tidak masuk `SNAPSHOT_TABLES`, tetapi bila mutasinya dibuat di perangkat, ia tetap wajib punya rute outbox dan handler push. Bedakan tiga kategori: ditarik lewat snapshot, didorong lewat outbox tanpa ditarik massal, dan cloud-only.
4. Cek command Rust dan gateway untuk entitas baru.
5. Jalankan `bun run audit:schema` dan `bun run audit:contract`.

### Langkah 3: rencana, lalu tunggu persetujuan
Tulis di chat: akar selisih versi, hasil audit empat lapisan per entitas (hadir/absen), dan perubahan minimal (berkas + baris). Jangan mengubah kode sebelum user setuju.

### Langkah 4: terapkan
1. Lengkapi lapisan yang absen lebih dulu. Menaikkan versi tanpa itu membuat klien menulis data yang ditolak cloud.
2. Naikkan `CLIENT_SCHEMA_VERSION` di `web-desktop/src-tauri/src/desktop/sync.rs`, beserta sentinel `turso.rs` bila lapisannya berubah.
3. `bun run sync:mobile`, lalu pastikan `CLIENT_SCHEMA_VERSION` di salinan Mobile ikut berubah.

### Langkah 5: pastikan UI tidak melaporkan sukses semu
Halaman Pengaturan dan `AutoSyncRunner` membaca `pushError`. Bila ada layar lain yang memicu sinkronisasi, ia wajib memeriksa `pushError` dan menampilkan "Data cloud berhasil ditarik, tetapi antrean kirim gagal" beserta pesannya, bukan notifikasi sukses.

### Langkah 6: verifikasi
`bun run check:quick` sekali setelah semua ditulis, lalu `bun run check` (termasuk cargo test) di latar belakang.

## Aturan

1. **Jangan menaikkan `CLIENT_SCHEMA_VERSION` tanpa audit empat lapisan.** Klien yang belum punya tabel/kolom baru akan menulis event yang ditolak cloud, dan outbox macet permanen.
2. **Jangan menyunting salinan Mobile.** `sync.rs`, `turso.rs`, dan `storage.rs` Mobile adalah hasil `bun run sync:mobile`.
3. **Jangan memasukkan tabel ke `SNAPSHOT_TABLES` hanya karena "kelihatannya tidak tersinkron".** Tabel berpayload besar sengaja di luar snapshot supaya pull tetap ringan.
4. **Pull sukses + push gagal bukan "berhasil".** UI wajib menyebut push yang gagal.
5. **Jangan melonggarkan `scripts/schema-audit.ts` atau `scripts/audit-sync-contract.ts`** supaya lulus.

## Format output

```markdown
### 1. Diagnosis
- Versi database / Web: v<X> (`CURRENT_SCHEMA_VERSION`, migrasi tertinggi v<X>)
- Versi klien Rust: v<Y> (`CLIENT_SCHEMA_VERSION`)
- Penyebab: <perangkat lama / versi hanya naik di satu sisi>

### 2. Audit empat lapisan untuk v<X>
| Entitas | storage.rs | turso.rs | sync.rs | db-schema.ts | Kategori sync |
|---|---|---|---|---|---|
| `<tabel/kolom>` | Hadir/Absen | ... | ... | ... | snapshot / outbox saja / cloud-only |

### 3. Perubahan kode
- <berkas>: <perubahan>
- Mobile: disalin lewat `bun run sync:mobile`

### 4. Verifikasi
- `bun run audit:schema`: <hasil>
- `bun run audit:contract`: <hasil>
- `bun run check`: <hasil, angka tes nyata>
```

## Failure mode

| Failure mode | Penyebab | Pencegahan |
|---|---|---|
| Outbox macet permanen | Versi dinaikkan padahal DDL lokal atau handler push belum memuat kolom baru | Audit empat lapisan dan `audit:schema` SEBELUM menaikkan versi |
| Perbaikan Mobile hilang | `sync.rs` Mobile disunting langsung | Ubah `web-desktop`, lalu `bun run sync:mobile` |
| Sukses semu | UI hanya memeriksa bahwa IPC selesai, bukan isi `pushError` | Tampilkan peringatan bila `pushError` terisi |
| Database lama terkunci | Indeks untuk kolom migrasi dibuat di DDL awal, sebelum `ensure_column`; satu DDL gagal membatalkan seluruh pipeline | Buat indeks setelah kolomnya dipastikan ada |
| Snapshot membengkak | Tabel berpayload besar dimasukkan ke `SNAPSHOT_TABLES` | Pertahankan pola outbox-saja untuk tabel media |
