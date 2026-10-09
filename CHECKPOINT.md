# Checkpoint 2026-10-10

Titik lanjut pekerjaan Company OS (nama proyek: MaklonOS). Dokumen developer,
berbahasa Indonesia. Aturan lengkap tetap di `CLAUDE.md`; berkas ini hanya
mencatat posisi terakhir dan yang belum selesai.

## Posisi

- **MVP lengkap** (F-01 s/d F-13), di-commit dan diuji di Desktop + Android.
- **v2 dikerjakan per irisan (D-31 di PRD):** v2.1 F-14 RnD ✔ → v2.2
  F-15/F-16 ✔ → v2.3a/b/c F-17 tagihan, cicilan, invoice PDF ✔ → v2.4 F-19
  desain/dummy ✔ → v2.5a F-20 MoU + DP ✔ → v2.5b F-18 tautan persetujuan +
  jalur manual ✔ → **v2.6 F-21 dokumen legal ✔** (v2.3a s.d. v2.4
  di-commit `0534728 v2 belum selesai`; v2.5a sebagian ikut commit itu;
  sisanya belum di-commit — commit setelah v2 selesai) → **v2.7 F-22 impor
  sheet ✔**. Seluruh irisan v2 sudah ditulis.
- **Build Desktop/APK ditunda sampai seluruh v2 selesai** (keputusan user).
  Gerbang per irisan: `bun run check` penuh bila menyentuh Rust,
  `check:quick` bila hanya TS/UI.
- **Skema database:** versi 16 `imported-records` (v11 s.d. v16 belum pernah
  dirilis), sentinel Rust `-2024 imported-records-v1`.
- **Repo `web-desktop/`** di device ini sudah punya `.git` sendiri lagi
  (remote `wwwwwweeeebbbbb--mmmmcccrrrrr`, HTTPS): commit di dua tempat.
- **Device kerja berganti** (2026-10-10, `C:\fr\Project CRM`): git di sini
  `core.autocrlf=true`, jadi biome menormalkan berkas CRLF ke LF; `git diff`
  hanya memuat perubahan isi.

## Yang berubah di v2.3a (di-commit `0534728`)

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

## Yang berubah di v2.3b (di-commit `0534728`)

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

## Yang berubah di v2.3c (di-commit `0534728`)

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

## Yang berubah di v2.4 / F-19 (di-commit `0534728`)

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

## Yang berubah di v2.5a / F-20 (sebagian di `0534728`, sisanya belum di-commit)

- **Modul baru** `validations/mou.ts` ↔ `desktop/mou.rs` (ikut
  `sync-rust-modules.ts`): isi MoU (total dan DP selalu dihitung), langkah,
  SQL bersama; aturan 45 `CLAUDE.md`, PRD D-37 (menjawab OQ-22: satu MoU).
- **Tabel baru** `production_mou` (keempat lapisan, snapshot), rute
  `mou/create`, `mou/update`, `mou/transition`, guard cloud `mou_guard`;
  command `desktop_create_mou`, `desktop_update_mou`, `desktop_record_mou_step`
  (kedua workspace) + route `/api/samples/mou`, `/mou/update`, `/mou/step`.
- **Gerbang:** MoU hanya untuk tiket `CLIENT_ACC`; Send to client menunggu
  dummy di-ACC bila diminta (E-20). Tagihan `DP_PRODUCTION_LEGAL` hanya untuk
  MoU yang disetujui; "DP lunas" dihitung (`dp_cleared`, `dp_paid`).
- **Izin:** `mou.manage` (seed CS dan Operator); harga satuan dan persen DP
  hanya `finance.manage`.
- **Setelan:** `dp_percentage_bp` (bawaan 50%) di Business settings.
- **UI:** bagian MoU di detail tiket (draf, edit, kirim, jawaban klien,
  PDF), tab MoU di halaman Samples, linimasa dan kalimat audit MoU.
- **PDF:** kop invoice dipisah (`drawHeader`/`finishPage`) dan dipakai
  `buildMouPdf`; tes PDF MoU baru.

## Yang berubah di v2.5b / F-18 (belum di-commit)

- **Modul baru** `validations/approval.ts` ↔ `desktop/approval.rs` (ikut
  `sync-rust-modules.ts`); aturan 46 `CLAUDE.md`, PRD D-38 (menjawab OQ-27).
- **Tabel cloud-only** `approval_tokens` (hanya hash token); setelan
  `approval_web_url` (https, kosong = manual saja) dan
  `approval_token_ttl_days` (3) di Business settings.
- **Membuat tautan:** command `desktop_create_approval_link` (kedua
  workspace, online saja, bukan Mode Database Lokal) dan
  `POST /api/approval/link`; tombol "Create approval link" dan "Copy
  WhatsApp message" di bagian sampel (Sent to client), dummy (Dummy sent),
  dan MoU (Sent).
- **Halaman klien** `/approve?t=…` (Web saja) + `/api/approval/query` dan
  `/respond` tanpa login, rate limit, audit `approval.invalid`, halaman
  E-24 dengan tombol WhatsApp perusahaan; jawaban diterapkan dengan fungsi
  langkah yang sama (`viaLink`) dan dicatat "Client"; notifikasi grup CS.
- **Tangkapan layar wajib** (foto `CLIENT_RESPONSE`) untuk setiap jawaban
  klien yang dicatat staf (sampel, dummy, MoU), di perangkat, Web, dan
  disimpan cloud.
- `AuditActor.id` kini boleh null (klien lewat tautan).

## Yang berubah di v2.6 / F-21 (belum di-commit)

- **Modul baru** `validations/legal.ts` ↔ `desktop/legal.rs` (ikut
  `sync-rust-modules.ts`); aturan 47 `CLAUDE.md`, PRD D-39.
- **Tabel baru** `legal_documents` (keempat lapisan, snapshot
  `legalDocuments`), rute `legal/record`, guard cloud `legal_guard`; command
  `desktop_record_legal_document` (kedua workspace) + route
  `/api/samples/legal`.
- **Gerbang:** terkunci sampai DP lunas (E-21); BPOM menunggu SIG final;
  Not required (dengan alasan) untuk SIG/HKI/Halal; koreksi hanya selama
  Submitted.
- **Izin:** `legal.manage` (seed role Legal + `samples.view`,
  `clients.view`); SIG memakai `rnd.manage`.
- **UI:** bagian Legal documents di detail tiket (foto dokumen opsional,
  `EvidencePicker` kini punya `label`/`hint`), tab Legal queue, linimasa dan
  kalimat audit.

## Yang berubah di v2.7 / F-22 (belum di-commit)

- **Modul baru** `validations/sheet-import.ts` ↔ `desktop/sheet_import.rs`
  (ikut `sync-rust-modules.ts`); aturan 48 `CLAUDE.md`, PRD D-40.
- **Tabel baru** `imported_records` (keempat lapisan, snapshot
  `importedRecords`), rute `imported-record/record`; uang masuk memakai
  rute `fund/record` yang sudah ada.
- **Command** `desktop_import_sheet`, `desktop_list_imported_records` (kedua
  workspace) + route `/api/import/sheet` dan `/api/import/records`; gateway
  `gateways/sheet-import.ts`.
- **UI:** halaman `/import` (Web/Desktop dan Mobile) dengan pilihan sheet,
  tombol Import CSV di Finance dan Samples, bagian "Imported history" di
  detail klien, kalimat audit. `matchHeaders` di `client-import.ts`
  menggeneralisasi tebakan header.
- Izin tidak bertambah: `finance.manage`, `rnd.manage`, `design.manage`.

## Verifikasi terakhir

- `bun run check` penuh LULUS (setelah v2.5b, device baru): 820 tes TS
  (kedua workspace), 144 tes Rust Desktop, 144 tes Rust Mobile, seluruh audit
  (19 tabel snapshot, 27 rute kanonik, 7 izin sensitif). Satu-satunya warning: linker
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

7. v2.5a: tiket ACC → Draft MoU (harga terisi dari sampel, DP 50%) →
   Finance ubah harga/DP saat draf → Send to client (tertahan bila dummy
   belum ACC) → Client wants changes → kembali draf → kirim → Client
   accepted → Finance: tagihan "Down payment (production & legal)" terisi
   nominal DP → lunas → MoU "Down payment paid"; PDF MoU; lonceng Finance.

8. v2.5b (Web ter-deploy, isi "Approval web address"): tiket Sent to client
   → Create approval link → buka di HP lain tanpa login → Setuju → tiket
   menjadi Client approved, linimasa "Client", lonceng/Telegram CS; buka
   tautan yang sama lagi → halaman "not valid" + tombol WhatsApp; Copy
   WhatsApp message; catat jawaban manual tanpa tangkapan layar → ditolak;
   Desktop offline → Create approval link menyarankan WhatsApp.

9. v2.6 (beri role Legal ke satu operator): MoU Dengan BPOM disetujui →
   bagian Legal documents "Waiting for Finance…" → DP lunas → Legal queue
   memuat tiketnya; BPOM tertahan "Record the SIG nutrition test first." →
   RnD SIG Not required (alasan wajib) → BPOM Record submission (MD/NA) →
   Correct submission → Record issue (foto) → tombol hilang; HKI dan Halal
   produk; MoU White Label hanya menampilkan Halal (materials); dua
   perangkat offline mencatat dokumen yang sama → yang kedua konflik.

10. v2.7 (CSV kecil buatan sendiri): Finance › Import CSV › Incoming
    payments → kolom ter-tebak, urutan tanggal → Check file (baris "1,50"
    ditolak) → Import → muncul di Incoming payments, bisa dialokasikan;
    impor ulang berkas yang sama → semua "Skipped". Samples › Import CSV ›
    Formulas dengan Kode Klien yang ada dan yang tidak ada → yang tidak ada
    ditolak; detail klien menampilkan "Imported history"; sinkron ke
    perangkat lain dan terlihat offline. Role tanpa izin tidak melihat
    tombolnya dan `/import` menolak.

## Tindak lanjut terbuka

- **Berikutnya:** seluruh v2 sudah ditulis. Build Desktop/APK (user), uji
  daftar di atas di perangkat, perbaiki temuan, lalu commit v2 (kedua repo:
  root dan `web-desktop/`). Setelah itu v3 (PPIC/produksi).
- OQ-24 tetap terbuka: contoh CSV asli ketiga sheet F-22 belum ada; header
  bawaan (`SHEET_FIELDS`) bisa disesuaikan begitu contohnya datang.
- Open question tersisa sebelum v2: OQ-16b (mockup), 21, 24 (contoh CSV
  asli), 27, 29.
