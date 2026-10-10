# Checkpoint 2026-10-10 (akhir v2)

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
  sisanya belum di-commit) → v2.7 F-22 impor sheet ✔ → **v2.8 perbaikan
  uji perangkat + Excel ✔**. Seluruh v2 sudah ditulis; build pertama v2
  sudah diuji user di Desktop + Android (2026-10-10, poin 1–5 lulus).
- **Commit v2 menunggu user** (kedua repo: root dan `web-desktop/`); user
  yang commit setelah uji perangkat sisa selesai. Jangan commit sendiri.
- Gerbang per irisan: `bun run check` penuh bila menyentuh Rust,
  `check:quick` bila hanya TS/UI.
- **v3 dimulai (D-43 rencana, D-44 v3.1 … D-47 v3.4):** urutan irisan
  v3.1 F-23/F-24 ✔ → v3.2 F-25 ✔ → v3.3 F-26/F-31 ✔ → v3.4 F-27 ✔
  (keempatnya ditulis, belum diuji perangkat) → v3.4 F-27
  → v3.5 F-28 → v3.6 F-29/F-30 → v3.7 F-32, lalu F-40. Setiap irisan tetap
  dibuka analisis + keputusan berhuruf sendiri.
- **Skema database:** versi 20 `shipments` (v11 s.d. v20 belum pernah
  dirilis), sentinel Rust `-2028 shipments-v1`.
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

## Temuan uji perangkat v2 + v2.8 (2026-10-10, sudah diperbaiki, belum di-commit)

- PDF/cadangan di Desktop Windows tersimpan ke `C:\storage\emulated\0\Download`
  (folder Android dipilih di Windows) → kini hanya di build Android (aturan 28).
- Mobile tidak punya tombol Sign out → ikon keluar di header `MobileAppShell`.
- Giliran berikutnya tidak terlihat (mis. setelah "Accepted by RnD" CS yang
  Proceed) → baris "Next step" di detail tiket (`nextSampleStep`, hanya tampilan).
- Pilihan tiket di form tagihan kini memuat status dan waktu dibuat (brand sama).
- Halaman Finance: tab status dengan jumlah (Unpaid bawaan, Overdue, Paid, In
  installments, Cancelled, All; uang masuk Unallocated bawaan, Deposits,
  Allocated, Void, All), pencarian, total piutang/overdue/belum dialokasikan,
  100 baris per tampilan + Show more.
- Bukan bug: Accept partial payment / Keep as deposit butuh izin sensitif
  `payments.approve_exception`; izin terbaca saat login.
- Konflik alokasi dari dua perangkat offline tidak bisa diselesaikan (tidak
  ada layar) dan alokasi yang ditolak tetap di perangkat → banner "Rejected
  by the cloud" (Discard my change / Try again, pemilik boleh tanpa
  `sync.retry`) dan Buang menyamakan baris lokal (`forget_local_entity`,
  juga untuk karantina). HP yang sudah terlanjur: tekan Discard my change di
  build baru.
- Mobile: tarik ke bawah dari puncak halaman = sinkron lalu muat ulang.
- **v2.8 (D-41):** tim memakai Excel: daftar kolom + Download Excel template
  di kedua layar impor; impor menerima .xlsx dan .csv; tombol Export Excel
  di Clients, Samples, Finance (Invoices / Incoming payments) mengikuti
  filter; penulis/pembaca .xlsx sendiri `src/lib/documents/xlsx.ts`; izin
  baru `data.export` (Admin), audit `data.export`; command
  `desktop_save_xlsx` (kedua workspace) dan `mobile_save_xlsx`, route
  `/api/export/record`. Skema v17, sentinel `-2025 data-export-v1`.

## Yang berubah di v3.1 / F-23 + F-24 (belum di-commit)

- **Modul baru** `validations/production.ts` ↔ `desktop/production.rs` (ikut
  `sync-rust-modules.ts`); aturan 50 `CLAUDE.md`, PRD D-43/D-44.
- **Tabel baru** `production_batches` (domain `batch`) dan
  `batch_purchase_orders` (domain `purchase-order`), keempat lapisan +
  snapshot; rute `batch/create`, `batch/ready`, `batch/schedule`,
  `purchase-order/record`; guard cloud `production_guard`.
- **5 command** `desktop_list_production`, `desktop_create_batch`,
  `desktop_record_purchase_order`, `desktop_mark_materials_ready`,
  `desktop_save_batch_schedule` (kedua workspace) + route
  `/api/production/{query,batch,purchase-order,ready,schedule}`; gateway
  `gateways/production.ts`.
- **Izin:** `production.view` (PPIC, SPV, QC, Logistik, CS, CRM, Finance),
  `ppic.manage` (PPIC), `production.manage` (SPV),
  `notifications_production.view` (PPIC, SPV, QC, Logistik); seed sekali
  `production_permissions_seeded`. `landingPath` → `/production` bagi role
  tanpa `clients.view`.
- **Notifikasi** divisi PRODUCTION (`telegram_chat_id_production` di
  Business settings, uji kirim di Telegram): work order baru, PO terlambat
  (juga CS), jadwal disimpan (CS).
- **Master Data** `SUPPLIER`. **Awalan dokumen** (D-43): tagihan, MoU, work
  order disetel di kartu "Client codes and document numbers"; Surat Jalan
  menyusul di v3.4.
- **UI:** menu Production (Desktop sidebar, Android navigasi bawah; label
  menu Android kini dipotong bila sempit), tab Ready for PPIC / Materials /
  To schedule / Scheduled / All, `ProductionPanel` juga di detail tiket;
  Next step setelah DP lunas mengarah ke PPIC/SPV.

## Yang berubah di v3.2 / F-25 (belum di-commit)

- **Kolom baru** `production_batches.stages_done` (0-4), `packed_at`,
  `carton_count`, `produced_units` (keempat lapisan + `ensure_column` /
  `COLUMN_MIGRATIONS`); rute `batch/stage`; command
  `desktop_record_batch_stage` (kedua workspace) + route
  `/api/production/stage`. Aturan 50 `CLAUDE.md`, PRD D-45.
- **Gerbang:** tahap 1 menunggu bahan Ready + jadwal + dokumen legal wajib
  final (`legal_open` di `BATCH_LIST_SQL`); tahap berikutnya hanya maju satu;
  tablet basi = konflik. Packing wajib koli + unit jadi. Setelah Penimbangan
  PO terkunci; tanggal tahap selesai tidak berubah; setelah Packing jadwal
  terkunci.
- **Notifikasi** `BATCH_PACKED` ke CS + Finance.
- **UI:** bagian "Production floor" di panel (tombol besar + konfirmasi,
  catatan kru, pelaku dan waktu dari linimasa), lencana "Behind schedule"
  (tanggal perangkat), tab On the floor / Packed, Next step tahap berikutnya
  lalu "Packed: Finance creates the settlement invoice."

## Yang berubah di v3.3 / F-26 + F-31 (belum di-commit, tanpa perubahan skema)

- **Jenis tagihan** `SETTLEMENT` dan `SHIPPING` (setelah Packing),
  `STORAGE_FEE` (setelah pelunasan lunas dan biaya titip > 0). Nominal
  bawaan form: pelunasan = total MoU − DP; biaya titip = hitungan berjalan.
- **Setelan** `storage_grace_days` (14) dan `storage_fee_idr` (0 = mati) di
  Business settings.
- **`BATCH_LIST_SQL` kini subquery** yang menghitung status tagihan dan
  `storage_days` di database (zona perusahaan dari Company profile);
  pemanggil memakai `b.id`, bukan `b.rowid`.
- **Siap kirim** `shipGateError` ↔ `ship_gate_error`, ditempel ke baris tiket
  (`attachShipState` ↔ `attach_ship_state`): Next step, Finance queue, isian
  form tagihan. Ditegakkan nanti saat pengiriman dicatat (v3.4).
- **Notifikasi** `SHIP_CLEARED` ke grup Production saat order siap kirim
  (alokasi dan pembuatan tagihan, Web + handler cloud), sekali per work order.
- **UI:** panel "Settlement & storage" (status, hari ditagih, biaya berjalan),
  tab Awaiting payment / Cleared to ship di Production.

## Yang berubah di v3.4 / F-27 (belum di-commit)

- **Tabel baru** `shipments` (domain `shipment`, keempat lapisan + snapshot),
  rute `shipment/create` dan `shipment/transition`, guard cloud
  `shipment_guard`; command `desktop_create_shipment` dan
  `desktop_record_shipment_step` (kedua workspace) + route
  `/api/production/shipment` dan `/shipment/step`.
- **Alur:** Surat Jalan (`PREPARED`, koreksi/batal beralasan) → Shipped (resi
  opsional, foto `SHIPMENT_PROOF` opsional) → resi menyusul → Sent to client
  (CS, ekspedisi wajib punya resi). Gerbang lunas ditegakkan saat Surat Jalan
  diterbitkan.
- **Izin** `shipping.manage` (seed Logistik + SPV). Menyimpan PDF kini boleh
  dengan `production.view` (Logistik tanpa `invoices.view`), Desktop dan
  Android.
- **Master Data** `CARRIER`; **setelan** `storage_sop_text` (Business settings)
  dan awalan `delivery_note_prefix` (kartu awalan dokumen).
- **PDF:** `buildTermsPdf` (MoU kini memakainya) untuk Surat Jalan (3 tanda
  tangan) dan SOP Penyimpanan; `components/production/shipment-download.ts`.
- **Notifikasi** `SHIPMENT_SHIPPED` ke grup CS.
- **UI:** `ShipmentSection.tsx` di panel work order (Record shipment, Mark
  shipped, Correct, Cancel, Add tracking number, Copy WhatsApp message, Mark
  sent to client, PDF), tab Shipping / Sent to client, Next step berlanjut.

## Verifikasi terakhir

- `bun run check` penuh LULUS (2026-10-11, setelah v3.4): 941 tes TS (kedua
  workspace), 162 tes Rust Desktop, 162 tes Rust Mobile, seluruh audit (24
  tabel snapshot, 36 rute kanonik, 7 izin sensitif). Satu-satunya warning:
  linker `libsodium` (lama).

## Sudah diverifikasi di perangkat (2026-10-10)

- Uji build pertama v2 (1–5 lama) dan build kedua (1–9: desain/dummy, MoU +
  DP, tautan persetujuan, dokumen legal, impor sheet, perbaikan uji
  perangkat, konflik offline, tarik-untuk-refresh, Excel) seluruhnya LULUS.
  Alur tiket sudah sampai "All documents are done. Production planning comes
  next." (ujung v2).

## Temuan uji build kedua (sudah diperbaiki, belum di-commit)

- Lampiran foto langkah (`EvidencePicker`): input berkas bawaan diganti
  tombol bergaya (Choose / Replace / Remove) dalam bingkai.
- Login Desktop: ikon mata bawaan WebView2 di kolom password disembunyikan
  (`::-ms-reveal`, kedua `globals.css`), tinggal tombol Show/Hide.
- Next step dummy kini "Finance: create the Dummy fee invoice…" selama
  tagihan dummy putaran itu belum lunas (`dummy_paid` di `SAMPLE_LIST_SQL`);
  tiket itu, dan MoU disetujui yang DP-nya belum lunas, masuk Finance queue.
- Start printing dummy boleh melampirkan desain cetak (foto `DUMMY_ARTWORK`,
  opsional); galeri foto memberi label semua jenis foto.
- Bukan kode: Finance menyetujui cicilan = Superadmin mencentang "Approve
  payment exceptions" di Pengaturan › Roles › Finance, lalu login ulang.
- Tombol Proof di Finance tidak menampilkan apa-apa (Desktop/Android memblokir
  jendela baru, browser menolak tab `data:`) → foto bukti tampil di dialog.
- Tiket "Client approved" masuk tab Closed → kini In progress (sejak v2 masih
  ada dummy, MoU, DP, legal, lalu produksi v3).
- Audit sisa aturan MVP (setelah ACC): foto referensi boleh ditambah (Edit
  request tetap terkunci); tiket ACC yang MoU terakhirnya ditolak/dibatalkan
  tanpa MoU aktif masuk Closed dengan Next step "Order stopped…"
  (`mou_closed`); MoU baru membukanya lagi.
- Bukan kode: `/approve` 404 di kemalofcs.my.id karena Web yang ter-deploy
  masih versi lama; perlu commit + push repo `web-desktop/` agar Vercel
  men-deploy v2.
- Ditunda (user, 2026-10-10): menampilkan PIC CS di form/detail tiket sampel;
  "PIC CRM" tetap opsional sampai serah terima CS → CRM di v3 (F-29).

## Belum diverifikasi di perangkat

- **v3.1** seluruhnya (work order, PO, bahan siap, jadwal, notifikasi
  Production, awalan dokumen, menu Production di Android).
- **v3.2** seluruhnya (4 tahap, gerbang legal, konflik dua tablet, Packing +
  notifikasi CS/Finance, kunci PO/jadwal).
- **v3.3** seluruhnya (tagihan pelunasan/ongkir/biaya titip, hitungan hari
  titip, siap kirim, notifikasi Cleared to ship).
- **v3.4** seluruhnya (Surat Jalan + SOP PDF di ketiga target, kirim, resi
  menyusul, teruskan ke klien, konflik dua perangkat).
- v2: tidak ada. Build ketiga (2026-10-10) LULUS seluruh uji: lampiran foto,
  ikon mata login, tagihan dummy di Finance queue + desain cetak, nomor
  WhatsApp sama (D-42), Proof di dialog, tab In progress/Closed + order
  berhenti, dan tautan persetujuan setelah Web v2 ter-deploy.

## Tindak lanjut terbuka

- **Sekarang:** seluruh v2 LULUS uji perangkat. User commit v2 (kedua repo:
  root dan `web-desktop/`) bila belum.
- **F-40 (dashboard + laporan Excel lengkap: rekap order, progres divisi,
  MoU/legal, omzet/piutang) dikerjakan SETELAH v3 selesai** (keputusan user
  2026-10-10), supaya data produksi dan pengiriman ikut.
- **Berikutnya: v3 (PRD bagian v3, F-23 s/d F-32, mockup SCR-15..18).**
  Mulai dengan analisis + usulan urutan irisan + keputusan berhuruf, tunggu
  persetujuan, baru kode. Role divisi v3 (PPIC, Production SPV, QC,
  Logistics) sudah di-seed sejak MVP tanpa izin domain.
- **Wajib dijawab sebelum sprint v3 (PRD):** OQ-22 sisa (PPIC menunggu BPOM
  terbit atau jalan paralel setelah DP lunas; `legalComplete` sudah
  disiapkan untuk gerbang ini), OQ-30 (biaya titip gudang per hari per
  batch/koli/pcs), OQ-33 (jawaban sementara: Surat Jalan setelah gerbang
  lunas, sebelum barang keluar). OQ-32 sudah: isi mockup v3 di luar PRD
  tidak masuk scope (F-45).
- OQ-24 tetap terbuka: contoh sheet asli (Excel) belum ada; header bawaan
  (`IMPORT_FIELDS`, `SHEET_FIELDS`) bisa disesuaikan begitu contohnya datang.
- Open question lama: OQ-16b (mockup), 21, 25, 26 (sebelum rilis), 27, 29.
