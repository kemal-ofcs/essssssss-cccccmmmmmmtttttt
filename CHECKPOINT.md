# Checkpoint 2026-10-08

Titik lanjut pekerjaan Company OS (nama proyek: MaklonOS). Dokumen developer,
berbahasa Indonesia. Aturan lengkap tetap di `CLAUDE.md`; berkas ini hanya
mencatat posisi terakhir dan yang belum selesai.

## Posisi

- **MVP lengkap** (F-01 s/d F-13), di-commit dan diuji di Desktop + Android.
- **v2 dikerjakan per irisan (D-31 di PRD):** v2.1 F-14 RnD ✔ → v2.2
  F-15/F-16 tarif revisi + harga ✔ (di-commit `3ec8043` root, `839f1f7`
  web-desktop) → **v2.3a F-17 tagihan + uang masuk ✔, v2.3b kurang
  bayar/cicilan/deposit ✔, v2.3c invoice PDF ✔, v2.4 F-19 desain/dummy ✔
  (keempatnya belum di-commit)** → F-18/F-20 → F-21 → F-22.
- **Build Desktop/APK ditunda sampai seluruh v2 selesai** (keputusan user).
  Gerbang per irisan: `bun run check` penuh bila menyentuh Rust,
  `check:quick` bila hanya TS/UI.
- **Skema database:** versi 12 `design-tickets` (v11 `invoices-and-funds`
  dan v12 belum pernah dirilis), sentinel Rust `-2020 design-tickets-v1`.

## Yang berubah di v2.3a (belum di-commit, kedua repo)

- **Modul baru** `validations/finance.ts` ↔ `desktop/finance.rs` (ikut
  `sync-rust-modules.ts`): pajak/diskon, hitungan tagihan, jenis tagihan per
  tiket, uang masuk, alokasi, tanggal, SQL bersama; aturan 43 `CLAUDE.md`.
- **Tabel baru** (keempat lapisan, ikut snapshot): `finance_options`,
  `invoices`, `incoming_funds`, `fund_allocations`; kolom
  `sample_requests.is_test_requested`. Rute kanonik baru:
  `finance-option/upsert`, `invoice/create`, `invoice/cancel`, `fund/record`,
  `fund/void`, `fund/allocate`; guard cloud `finance_guard`.
- **7 command baru** `desktop_get_finance_overview`,
  `desktop_save_finance_option`, `desktop_create_invoice`,
  `desktop_cancel_invoice`, `desktop_record_incoming_fund`,
  `desktop_void_incoming_fund`, `desktop_allocate_fund` (terdaftar di kedua
  workspace) + route `POST /api/finance/*`.
- **Izin:** `invoices.view` (seed CS + Finance), `finance_options.manage`
  (sensitif, tidak ikut Admin; aturan 32).
- **Gerbang tiket:** Payment received menunggu tagihan biaya sampel/revisi
  lunas; Sample sent pada tiket "with testing" menunggu tagihan uji lunas.
- **Setelan bisnis:** `default_sample_fee_idr`, `default_test_fee_idr`,
  `invoice_due_days` (7).
- **UI:** halaman Finance (menu sendiri, Web/Desktop/Android) dengan tab
  Invoices dan Incoming payments; Pengaturan › Taxes and discounts; centang
  "With testing" di form tiket; bagian Invoices di detail tiket.
- **Bug lama v2.2 diperbaiki:** dua harga satu iterasi di detik yang sama
  dipilih acak (`id` UUID); kini `rowid` (catatan `ponytail` soal batasnya).
- Dokumen: aturan 32 dan 43 `CLAUDE.md`/`AGENTS.md`; PRD D-33 dan model data
  7.3.

## Yang berubah di v2.3b (belum di-commit)

- **Izin sensitif** `payments.approve_exception` (tidak di-seed, tidak ikut
  Admin): Accept partial payment dan Keep as deposit.
- **Paket cicilan** = `finance_options` jenis `INSTALLMENT_PLAN` (1-24 bulan,
  bunga sekali atas sisa, boleh 0%), di Pengaturan › Taxes, discounts, and
  installments.
- **Pembayaran sebagian** (rute `invoice/reschedule`, command
  `desktop_accept_partial_payment`, route `/api/finance/invoices/reschedule`):
  alokasi + tagihan asal `RESCHEDULED` + tagihan `INSTALLMENT` bulanan
  `<nomor>-k`; cloud memeriksa sisa dan menghitung ulang cicilan. Gerbang
  tiket menganggap `RESCHEDULED` selesai. Cicilan tidak bisa dijadwal ulang.
- **Deposit** (rute `fund/deposit`, command `desktop_confirm_deposit`, route
  `/api/finance/funds/deposit`): sisa uang masuk ditandai deposit klien;
  saldo deposit per klien di halaman Finance.
- UI: `PartialPaymentForm.tsx` (pratinjau bunga dan jadwal), tanda Overdue,
  status "In installments". PRD D-34.

## Yang berubah di v2.3c (belum di-commit)

- **Penulis PDF sendiri** `src/lib/documents/invoice-pdf.ts` (+ tes), tanpa
  dependensi dan tanpa padanan Rust; helper `components/finance/invoice-download.ts`
  memetakan tagihan + Company profile + instruksi pembayaran ke PDF.
- **Gateway** `src/lib/gateways/documents.ts`: Android
  `mobile_save_document` (dialog SAF, `simpan_bytes` dipakai bersama ekspor
  cadangan), Desktop `desktop_save_document` (Downloads, nama unik), Web
  unduhan browser. Keduanya `invoices.view`.
- **Setelan** `invoice_payment_instructions` (≤ 1000) di Pengaturan ›
  Business settings › Invoices.
- Tombol **PDF** di baris tagihan halaman Finance dan di detail tiket.
- **Bug v2.3a diperbaiki:** server Web tidak menyimpan
  `default_sample_fee_idr`, `default_test_fee_idr`, `invoice_due_days`
  (daftar kunci manual); kini loop atas `BUSINESS_SETTING_KEYS` + tes.
- Dokumen: aturan 43 `CLAUDE.md`/`AGENTS.md`, PRD D-35.

## Yang berubah di v2.4 / F-19 (belum di-commit)

- **Modul baru** `validations/design.ts` ↔ `desktop/design.rs` (ikut
  `sync-rust-modules.ts`): langkah tiket desain, gerbang cetak dummy, batas
  penolakan, SQL bersama; aturan 44 `CLAUDE.md`, PRD D-36 (menjawab OQ-29 dan
  sisa OQ-31).
- **Tabel baru** `design_tickets` (keempat lapisan, snapshot), rute
  `design/create` dan `design/transition`, guard cloud `design_guard`;
  command `desktop_create_design_ticket`, `desktop_record_design_step` (kedua
  workspace) + route `/api/samples/design` dan `/api/samples/design/step`.
- **Gerbang:** Sample sent menunggu mockup bila tiket meminta dummy atau punya
  tiket desain aktif; cetak dummy menunggu klien ACC + mockup + tagihan
  `DUMMY_FEE` (jenis tagihan baru). Foto jenis `MOCKUP` milik `design.manage`;
  kuota foto per jenis.
- **Izin:** `design.manage` dan `notifications_design.view` (seed role
  Design), `design.override_dummy_limit` (ikut Admin).
- **Setelan:** `max_dummy_rejections` (0), `default_dummy_fee_idr`,
  `telegram_chat_id_design`; notifikasi grup Desain (brief baru, dummy
  direvisi).
- **UI:** bagian Design di detail tiket, tab Design queue, tombol Add mockup,
  linimasa memuat langkah desain, kalimat audit desain.

## Verifikasi terakhir

- `bun run check` penuh LULUS (setelah v2.4): 722 tes TS (kedua workspace),
  138 tes Rust Desktop, 138 tes Rust Mobile, seluruh audit (18 tabel
  snapshot, 24 rute kanonik, 7 izin sensitif). Satu-satunya warning: linker
  `libsodium` (lama).

## Belum diverifikasi di perangkat (build setelah seluruh v2 selesai)

1. v2.1/v2.2: role R&D (RnD queue, isian wajib), role Finance (Finance queue,
   panel Price 19.500 × 40% = Rp 32.500, Set revision fee), CS tanpa
   `pricing.view` tidak melihat HPP, Telegram per divisi.
2. v2.3a: Pengaturan › Taxes and discounts (tambah PPN 11%, diskon);
   tiket berbayar → Create invoice dari detail tiket → Record payment →
   Allocate (nominal tidak cocok ditolak dengan selisihnya) → Payment received
   terbuka; tiket "with testing" baru bisa Sample sent setelah tagihan uji
   lunas; Cancel/Void hanya selama belum ada alokasi.
3. Sinkron Desktop ↔ Android untuk tagihan, uang masuk, dan alokasi; dua
   perangkat offline melunasi tagihan yang sama → yang kedua jadi konflik.
4. v2.3b (beri izin Approve payment exceptions dulu): tambah paket "3 months
   10%"; tagihan 5.000.000, uang masuk 2.000.000 → Accept partial payment →
   3 cicilan Rp 1.100.000 jatuh tempo +1/+2/+3 bulan, tagihan asal "In
   installments", Payment received di tiket terbuka; sisa uang masuk → Keep
   as deposit → muncul di Client deposits.

5. v2.3c: isi Company profile (logo) dan Payment instructions → PDF dari
   halaman Finance dan detail tiket; Android memunculkan dialog Simpan ke…,
   Desktop menyimpan ke Downloads (nama kedua `(2)`); cap PAID/CANCELLED/IN
   INSTALLMENTS benar; logo PNG transparan berlatar putih.
6. v2.4 (beri role Design ke satu operator): tiket "Perlu dummy" → Sample
   sent tertahan "Upload the mockup…" → CS Request design → desainer Add
   mockup (tab Design queue) → Sample sent → Client ACC → Finance tagihan
   Dummy fee → lunas → Start printing dummy → Dummy sent (resi) → Client
   wants a dummy revision; dengan Pengaturan "Dummy rejections" = 1 cetak
   ulang hanya untuk Admin; lonceng Design dan Telegram grup Design.

## Tindak lanjut terbuka

- **Berikutnya:** F-18/F-20 (analisis dan keputusan berhuruf dulu).
- Open question tersisa sebelum v2: OQ-16b (mockup), 21, 24 (contoh CSV
  asli), 27, 29.
