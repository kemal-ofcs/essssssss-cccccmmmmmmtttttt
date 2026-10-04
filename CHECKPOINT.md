# Checkpoint 2026-10-04 (malam)

Titik lanjut pekerjaan Company OS (nama proyek: MaklonOS). Dokumen developer,
berbahasa Indonesia. Aturan lengkap tetap di `CLAUDE.md`; berkas ini hanya
mencatat posisi terakhir dan yang belum selesai.

## Posisi

- **MVP lengkap** (F-01 s/d F-13), sudah di-commit + diuji di Desktop dan
  Android (commit `75b47ca` root, `5e4040a` web-desktop).
- **v2 dikerjakan per irisan (D-31 di PRD):** v2.1 F-14 RnD → v2.2 F-15/F-16
  tarif revisi + harga → v2.3 F-17 uang masuk/tagihan → F-19 desain/dummy →
  F-18/F-20 tautan approval + MoU/DP → F-21 legal → F-22 impor CSV.
- **v2.1 dan v2.2 selesai ditulis, BELUM di-commit, BELUM di-build.** Build
  Desktop/APK sengaja ditunda sampai seluruh irisan v2 selesai (keputusan
  user 2026-10-04). Gerbang per irisan: `bun run check` penuh bila menyentuh
  Rust, `check:quick` bila hanya TS/UI.
- **Skema database:** versi 10 `rnd-and-pricing` (v2.1 + v2.2 digabung karena
  belum pernah dirilis), sentinel Rust `-2018 rnd-pricing-v1`. Cloud Turso
  masih v9; perangkat v9 akan melihat `SCHEMA_VERSION_OUTDATED` setelah build
  baru pertama tersambung.

## Yang berubah (belum di-commit, kedua repo)

### v2.1 (F-14, RnD)
- Izin `rnd.manage` (Accept, Reject, Sample ready), seed sekali ke role `rnd`.
- Isian RnD `validateRndStep` ↔ `validate_rnd_step`; alasan tolak dari Master
  Data `RND_REJECT_REASON`; tabel `sample_formulas` per iterasi (kode tidak
  unik); tab "RnD queue"; riwayat formula.

### v2.2 (F-15/F-16, Finance)
- Izin `finance.manage` (harga, `SET_REVISION_FEE`, Payment received; CS tidak
  lagi mencatatnya) dan `pricing.view` (rincian HPP/margin), seed sekali ke
  role `finance`.
- Harga: `computeUnitPrice` ↔ `compute_unit_price`, HPP = bahan + kemasan +
  operasional + regulasi/uji, harga = HPP ÷ (1 − margin), dibulatkan ke atas.
  Tabel `pricing_formulas` (hanya-tambah, terbaru per iterasi berlaku), rute
  baru `sample/price`, command baru `desktop_record_sample_price` (terdaftar
  di kedua workspace), route `POST /api/samples/price`.
- Gerbang D-27: `SAMPLE_SENT` ditolak tanpa harga iterasi yang berjalan
  (TS, Rust, dan `sample_guard` cloud).
- Tarif revisi: `SET_REVISION_FEE` (> 0 → menunggu pembayaran, 0 =
  dibebaskan → `IN_RND`), kolom `sample_requests.revision_fee_idr`.
- Rincian HPP ikut snapshot (Finance bisa offline), dibuang dari detail bagi
  yang tidak memegang `pricing.view`.
- Notifikasi: sampel siap → Finance; harga tersimpan, tarif revisi → CS.
- UI: tab "Finance queue", panel Price (`SamplePricing.tsx`, ikut
  `filesToCopy`), isian tarif revisi. Teks "on behalf of" dihapus karena
  setiap divisi kini mencatat langkahnya sendiri.
- Dokumen: aturan 37 dan 39 `CLAUDE.md`/`AGENTS.md`; PRD D-27 s/d D-32.

## Verifikasi terakhir

- `bun run check` penuh LULUS: 570 tes TS, 123 tes Rust Desktop, 123 tes Rust
  Mobile, seluruh audit. Satu-satunya warning: linker PDB `libsodium` (lama).

## Belum diverifikasi di perangkat (build setelah seluruh v2 selesai)

1. Master Data › RnD rejection reasons: tambah satu alasan.
2. Role R&D: tab RnD queue; Accept wajib New/Existing; Reject wajib alasan;
   Sample ready wajib formula code + product knowledge.
3. Role Finance: tab Finance queue; panel Price menghitung pratinjau harga
   (19.500 dengan margin 40% = Rp 32.500); Save price membuka tombol "Sample
   sent" untuk CS; revisi di atas kuota → Set revision fee (0 membebaskan).
4. Role CS tanpa `pricing.view`: melihat harga jual, TIDAK melihat HPP/margin;
   tidak punya tombol RnD/Finance.
5. Telegram: grup Finance menerima "waiting for a price"; grup CS menerima
   "Price ready" dan "Revision fee set".
6. Sinkron Desktop ↔ Android untuk formula, harga, dan tarif revisi; Finance
   menyimpan harga saat offline lalu tersinkron.

## Tindak lanjut terbuka

- **v2.3 (F-17):** analisis + keputusan berhuruf dulu. Sudah diputuskan: D-28
  (daftar pajak + daftar diskon), D-29 (kurang bayar butuh persetujuan,
  paket cicilan berbunga sekali, lebih bayar jadi deposit dipilih manual),
  D-30 (biaya uji `TEST_FEE` opsional, lunas sebelum kirim). Tarif revisi
  (`revision_fee_idr`) dan biaya sampel menjadi tagihan di sini; Payment
  received kelak diverifikasi terhadap tagihan.
- Open question tersisa sebelum v2: OQ-16b (mockup layar tanpa desain), 21,
  24 (contoh CSV asli), 27, 29.
