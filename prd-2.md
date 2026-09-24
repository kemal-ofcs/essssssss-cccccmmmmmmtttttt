# Product Requirement Document (PRD): Sistem Operasi Maklon Terpadu (MaklonOS)

**Dokumen:** `prd-tahap-2.md`

**Fase:** Tahap 2 (RnD Laboratory, Dynamic Pricing Engine, Desain Grafis, Legal Compliance Gate, & Approval Gateway)

**Status:** Approved for Implementation

**Tech Stack:** Next.js, Tauri v2 (Desktop & Android), SQLite (Local Storage), Turso (libSQL Cloud DB), Telegram Bot API.

---

## 1. Problem Statement

Pasca pengelolaan intake lead di CS/CRM, koordinasi lintas divisi teknis (RnD, Desain Grafis, Finance, dan Legal) saat ini mengalami inefisiensi operasional akibat ketiadaan sistem terintegrasi:

* **RnD Formulator:** Menerima spesifikasi sampel yang tidak terstandarisasi (warna, aroma, tekstur, kemasan, klaim BPOM) dari lembar kerja CS yang tercecer. Tidak ada mekanisme sistem untuk membedakan formulasi baru (*New Product*) vs formula eksisting (*Existing Product*), memicu duplikasi riset dan keterlambatan konfirmasi kelayakan dengan tim pabrik.


* **Finance:** Perhitungan HPP (*Harga Pokok Penjualan*) dan penentuan margin produk akhir masih dilakukan manual di spreadsheet lepas (*Sheet Antrian Hitung Formulasi*), rawan salah rumus dan mengaburkan riwayat perubahan harga. Selain itu, tidak ada gerbang validasi untuk menagih biaya revisi sampel di luar kuota gratis, membebani biaya laboratorium secara sepihak.


* **Desain Grafis:** Memulai pembuatan desain kasar (*mockup*) atau dummy kemasan tanpa kepastian status kelayakan formula RnD atau verifikasi pembayaran sampel dummy oleh Finance. Ketiadaan status persetujuan dummy resmi dari klien berisiko menyebabkan kesalahan cetak massal.


* **Legal Officer:** Memproses pendaftaran uji laboratorium gizi SIG, registrasi BPOM (MD/NA), Sertifikasi Halal, dan HKI sebelum adanya kepastian pembayaran DP Legal & Produksi oleh klien, sehingga memicu kerugian finansial saat order dibatalkan sepihak.


* **Klien:** Terkendala alur birokrasi manual via chat untuk menyetujui sampel formula, mockup kemasan, dan draf MoU, tanpa transparansi masa berlaku kesepakatan.



---

## 2. Target User & Persona

### Target User

Personel internal back-office spesialis teknis dan kepatuhan:

* RnD Formulator (Laboratorium)


* Tim Desain Grafis & Kemasan


* Tim Finance (Verifikator Mutasi & Costing Analyst)


* Tim Legal & Regulasi (BPOM, Halal, SIG, HKI)


* Klien Eksternal (Pengguna pasif via formulir web approval token tanpa akun login)



### Persona

#### Persona 1: Dimas — RnD Formulator Lab

* **Tanggung Jawab:** Menerima tiket sampel, mengonfirmasi kelayakan racikan bersama pabrik (*New/Existing Product*), menentukan *lead time*, meracik formula fisik di lab, dan menyusun *product knowledge*.


* **Perangkat:** Komputer Desktop Lab (Tauri v2) & Tablet Android (koneksi offline/steril).
* **Pain Point:** Sering menerima permintaan revisi berulang dari CS tanpa mengetahui apakah bahan baku mahal pada revisi tersebut sudah disetujui tarifnya oleh Finance.
* **Kebutuhan:** Antrian kerja otomatis terurut prioritas deadline, form input *Acc/Tolak*, pencatatan kode formula unik, dan penguncian tiket otomatis jika revisi berbayar belum diverifikasi Finance.



#### Persona 2: Siti — Finance & Costing Analyst

* **Tanggung Jawab:** Memverifikasi mutasi bukti bayar (sampel, revisi formula, sampel dummy, DP produksi), menetapkan tarif kustom revisi, dan mengalkulasi harga produk akhir berdasarkan HPP komponen bahan baku dan kemasan.


* **Perangkat:** PC Desktop Finance.
* **Pain Point:** Sering diteror CS untuk segera menerbitkan invoice sementara bukti transfer belum jelas; menghitung HPP secara manual memakan waktu 30 menit per produk.


* **Kebutuhan:** Formulir kalkulasi HPP + margin dinamis, penetapan tarif kustom instan untuk revisi sampel berlebih, dan fitur verifikasi bukti bayar (maksimal 300 KB) yang otomatis menerbitkan invoice PDF resmi.



---

## 3. Goals & Non-Goals

### Goals

* **RnD Workbench & Formula Registry:** Standardisasi antrian peracikan sampel, klasifikasi produk (*New/Existing*), konfirmasi pabrik, penerbitan `formula_code` unik, dan input *product knowledge*.


* **Dynamic Pricing Engine:** Otomasi kalkulasi harga jual unit produk berdasarkan variabel dinamis: $(\text{HPP Formula} + \text{Packaging} + \text{Overhead}) \times (1 + \text{Margin}\%)$ terintegrasi dengan validasi Finance.


* **Custom Revision Fee Clearance:** Menjembatani tiket revisi sampel yang melampaui batas kuota gratis (`revision_index > free_revision_limit`) dengan mewajibkan Finance menetapkan tarif kustom dan memverifikasi pelunasan sebelum lab RnD mulai meracik.


* **Dummy Product Approval Gate:** Menahan (*freeze*) penerbitan MoU dan persiapan produksi jika klien meminta sampel dummy kemasan, hingga bukti bayar sampel dummy diverifikasi dan klien resmi menyatakan *ACC Dummy*.


* **Strict Legal Execution Gate:** Mengunci tombol eksekusi pendaftaran uji gizi SIG, registrasi BPOM (MD/NA), Halal, dan HKI sampai invoice DP Legal & Produksi berstatus `VERIFIED` oleh Finance.


* **Regulatory Bypass Routing:** Menonaktifkan secara otomatis persyaratan dokumen uji SIG dan BPOM mandiri jika produk berstatus *White Label*.


* **Approval Token Gateway:** Pengiriman tautan formulir web sekali pakai (*single-use token*) dengan masa kedaluwarsa dinamis (`approval_token_ttl_days`) untuk persetujuan sampel formula, desain, dan draf MoU oleh klien secara online.



### Non-Goals

* **Eksekusi Fisik Lantai Pabrik:** Tidak mencakup antrian penimbangan massal, pencampuran (*mixing*), pengisian (*filling*), dan pengepakan (*packing*) massal (dialokasikan untuk Tahap 3).


* **Manajemen Logistik & Retur QC:** Pengiriman armada/ekspedisi, pembuatan surat jalan, dan investigasi komplain retur dialokasikan ke Tahap 3.


* **Koneksi API Otomatis ke Badan Publik:** Sistem tidak melakukan *scraping* atau *direct API integration* ke sistem BPOM (ASRot) atau LPPOM MUI; penginputan nomor izin edar dan tanggal terbit dilakukan manual oleh Legal Officer setelah berkas fisik/portal resmi menyetujui.

---

## 4. User Stories

* **US-12 (RnD):** Sebagai RnD, saya ingin memilih klasifikasi *New Product* atau *Existing Product* dan menentukan status *Acc/Tolak* bersama pabrik, supaya CS dapat memberikan estimasi *lead time* yang akurat kepada klien.


* **US-13 (RnD):** Sebagai RnD, saya ingin mencatat `formula_code`, catatan peracikan, dan dokumen *product knowledge* ke sistem, supaya data teknis langsung terarsip di database pusat dan dapat ditarik oleh Finance untuk penetapan harga.


* **US-14 (Finance):** Sebagai Finance, saya ingin menginput komponen HPP bahan, biaya kemasan, biaya operasional, dan target margin %, supaya harga satuan produk akhir terhitung secara instan dan bebas dari kesalahan manual.


* **US-15 (Finance):** Sebagai Finance, saya ingin menerima notifikasi tiket revisi berbayar untuk menginput tarif kustom bahan baku, supaya CS dapat menerbitkan tagihan invoice biaya revisi kepada klien.


* **US-16 (Desain Grafis):** Sebagai Desainer Grafis, saya ingin menerima brief kemasan dari form sampel untuk membuat desain kasar/mockup produk, supaya klien dapat meninjau visual produk sebelum masuk jalur legalitas.


* **US-17 (Desain Grafis):** Sebagai Desainer Grafis, saya ingin mencetak dummy produk hanya setelah pembayaran dummy diverifikasi Finance, supaya biaya cetak dummy tidak menjadi kerugian internal.


* **US-18 (Legal):** Sebagai Legal Officer, saya ingin sistem memblokir form pendaftaran uji SIG dan BPOM sebelum DP Produksi & Legal lunas, supaya kepatuhan hukum berjalan selaras dengan kepastian arus kas perusahaan.


* **US-19 (Klien via Web Link):** Sebagai Klien, saya ingin membuka tautan persetujuan sekali pakai di ponsel saya untuk menyatakan *Acc* atau *Tolak* (beserta catatan revisi) pada sampel atau dummy, supaya proses approval berjalan cepat tanpa login.



---

## 5. Functional Requirements Detail (Tahap 2)

### FR-08: RnD Sample Workbench & Formula Management

* Tiket sampel yang telah berstatus `READY_FOR_RND` (lolos clearance pembayaran atau kuota gratis) otomatis masuk ke antrian RnD terurut berdasarkan prioritas deadline.


* Form Workbench RnD wajib menampung:
* Klasifikasi Produk: *New Product* (memerlukan riset formula baru) vs *Existing Product* (menggunakan basis formula yang telah ada di perpustakaan formula).


* Konfirmasi Kelayakan Produksi: Toggle *Acc* atau *Tolak*.


* Jika **Tolak**: Wajib mengisi alasan penolakan teknis pabrik/lab. Sistem mengirim notifikasi ke Grup Telegram CS dan mengembalikan tiket ke CS untuk negosiasi ulang spesifikasi.


* Jika **Acc**: Wajib mengisi `formula_code` unik, estimasi `lead_time_days`, catatan teknis RnD, dan ringkasan teks *Product Knowledge* (manfaat, aturan pakai, tekstur, stabilitas).




* Tombol aksi *"Sampel Selesai Dibuat"*: Mengubah status menjadi `SAMPLE_DISPATCHED_TO_CS`, mencatat tanggal kirim sampel fisik, dan mengirimkan notifikasi instan ke Grup Telegram CS & Finance.



### FR-09: Dynamic HPP & Margin Calculator (Finance Engine)

* Terhubung langsung dengan `sample_feedbacks.id` yang telah di-*Acc* oleh RnD dan klien.


* Finance menginput variabel biaya per unit:
* `base_hpp_unit`: Biaya peracikan bahan baku formula dari RnD.


* `packaging_cost_unit`: Biaya botol, pot, sachet, kardus luar, label, atau segel.


* `operational_cost_unit`: Biaya overhead tenaga kerja pabrik dan depresiasi batch.
* `margin_percentage`: Target persentase margin keuntungan perusahaan (e.g., $30\%$, $45.5\%$).


* **Logika Perhitungan Otomatis:**

$$\text{Total HPP} = \text{base\_hpp\_unit} + \text{packaging\_cost\_unit} + \text{operational\_cost\_unit}$$


$$\text{final\_unit\_price} = \text{Total HPP} \times \left(1 + \frac{\text{margin\_percentage}}{100}\right)$$


* Sistem menyimpan riwayat kalkulasi harga dalam tabel `pricing_formulas` dan mengunci nilai harga satuan final untuk digunakan dalam penerbitan draf MoU produksi.



### FR-10: Custom Revision Fee Management

* Terpemicu ketika klien mengajukan revisi sampel (`client_decision = 'REVISE'`) dan sistem mendeteksi `revision_index > free_revision_limit`.


* Status tiket otomatis berubah menjadi `PENDING_FEE_ASSESSMENT` dan masuk ke antrian Finance.


* Finance menginput nominal biaya revisi kustom (`custom_revision_fee`) berdasarkan harga komponen bahan aktif yang diganti atau ditambahkan.
* Setelah Finance menyimpan tarif:
1. Sistem menerbitkan draf pembayaran `payments` bertipe `REVISION_FEE`.


2. CS meneruskan invoice biaya revisi ke klien.


3. Antrian lab RnD terkunci dengan status `WAITING_PAYMENT` sampai Finance mengunggah/memvalidasi bukti transfer klien.





### FR-11: Alur Desain Grafis, Mockup, & Dummy Product Gate

* **Pembuatan Desain Kasar/Mockup:** Tim Desain Grafis menerima tiket otomatis bersamaan dengan antrian sampel untuk membuat mockup visual (kemasan dan label) berdasarkan spesifikasi kemasan dari CS.


* **Percabangan Dummy Produk:**
* Jika klien meminta dummy fisik (`is_dummy_required = true`):
1. Sistem membuat tiket tagihan `payments` tipe `DUMMY_FEE`.


2. Finance wajib memvalidasi pelunasan sampel dummy sebelum tim Desain mencetak dummy fisik.


3. Setelah dicetak dan dikirimkan ke klien, sistem mengaktifkan status `WAITING_DUMMY_APPROVAL`.


4. **Gerbang Kunci Pabrik:** Sistem mengunci tombol *Pengajuan MoU* dan melarang tiket didorong ke alur PPIC/Pabrik selama status dummy belum dinyatakan `ACC` oleh klien.


5. Jika klien menolak dummy (`REJECT`), tiket kembali ke Desain Grafis untuk perbaikan revisi visual sebelum produksi massal dimulai.




* Jika klien tidak memerlukan dummy (`is_dummy_required = false`): Alur langsung berlanjut ke pengajuan MoU produksi setelah formula sampel disetujui.





### FR-12: Strict Legal Execution Gate & Branching Regulasi

* **Pengecekan Tipe Regulasi:**
* Jika `clients.is_white_label = true`: Seluruh tahapan pendaftaran uji laboratorium gizi SIG, registrasi BPOM (MD/NA), dan HKI otomatis berstatus `NOT_APPLICABLE` (di-*bypass*). Sistem hanya memvalidasi izin edar induk perusahaan dan sertifikasi halal internal.


* Jika `clients.is_white_label = false` (Izin Edar Mandiri Klien): Wajib melalui alur pendaftaran kepatuhan lengkap (Uji Gizi SIG $\rightarrow$ BPOM MD/NA $\rightarrow$ Halal Produk $\rightarrow$ HKI Merek).




* **Gerbang Pelunasan DP Legal & Produksi:**
* Tombol input dokumen pendaftaran uji SIG, submit portal BPOM, dan pendaftaran Halal dikunci total (*disabled*).


* Penguncian hanya terbuka jika `production_mou.is_dp_cleared = 1` (Finance telah memverifikasi transfer pembayaran DP Legal & Produksi).




* **Perekaman Dokumen Legal:** Tim Legal menginput nomor pendaftaran SIG, nomor notifikasi BPOM (format NA18XXXXXXXXX atau MD XXXXXXXXXXXX), sertifikat Halal, dan sertifikat HKI beserta tanggal terbit resminya ke dalam sistem.



### FR-13: One-Time Token Approval Gateway (Interaksi Klien)

* Sistem menyediakan generator tautan formulir web tanpa otentikasi login akun untuk interaksi klien eksternal:


* URL: `[https://app.maklon.com/approval/](https://app.maklon.com/approval/){token_hash}`
* Tipe Entitas: `SAMPLE_APPROVAL`, `DUMMY_APPROVAL`, atau `MOU_APPROVAL`.




* **Validasi Masa Berlaku Dinamis (TTL):**
* Sistem mengambil konfigurasi `approval_token_ttl_days` dari tabel `app_configs` (default: 3 hari).
* `expires_at = waktu_terbit + (approval_token_ttl_days * 86400)`.


* **Formulir Web Klien:**
* Menampilkan informasi ringkasan: Nama Klien, Nama Produk, Spesifikasi/Foto Mockup/Detail Formulasi, dan Catatan RnD.


* Opsi Respon: Dua tombol radio tegas — **ACC** atau **TOLAK / REVISI**.


* Field Catatan Klien: Wajib diisi jika memilih opsi *Tolak / Revisi* untuk mencatat perubahan yang diinginkan (aroma, tekstur, desain, dll.).




* Setelah tombol *Submit* diklik:
* Token ditandai `is_used = 1` dan waktu submit dicatat. Akses berikutnya ke tautan yang sama akan menampilkan peringatan: *"Tautan persetujuan ini telah digunakan."*
* Payload respon tersimpan ke database, dan status tiket diperbarui secara real-time.
* Sistem memicu notifikasi instan ke Grup Telegram CS dan divisi terkait.





### FR-14: Financial Invoicing & Payment Verification Clearance

* Finance memiliki dasbor verifikasi pembayaran terpusat untuk seluruh jenis transaksi maklon:


* `SAMPLE_FEE`: Biaya pembuatan sampel awal.


* `REVISION_FEE`: Biaya revisi formula kustom yang melampaui kuota gratis.


* `DUMMY_FEE`: Biaya pembuatan dan cetak dummy kemasan.


* `DP_PRODUCTION_LEGAL`: Biaya uang muka produksi massal dan pengurusan legalitas izin edar.




* Finance mengunggah bukti transfer yang telah dikompresi ($\le 300\text{ KB}$, format `.webp`), mencocokkan nominal dengan mutasi rekening koran, dan mengubah status menjadi `VERIFIED`.


* Sistem secara otomatis mengenerate dokumen faktur resmi berformat PDF (*Invoice*) dengan nomor invoice unik, memuat `kode_klien`, rincian biaya, cap lunas, dan identitas verifikator Finance.



---

## 6. Sketsa Data Model & Schema Enhancement

```
+----------------------------------------------------------------------------------------------------+
|                                    DATA MODEL ENHANCEMENT (TAHAP 2)                                |
+----------------------------------------------------------------------------------------------------+

       +-------------------------+                     +-------------------------+
       |     sample_requests     |                     |       app_configs       |
       +-------------------------+                     +-------------------------+
       | id (PK)                 |                     | key (PK, TEXT)          |
       | client_id (FK)          |                     | value_text              |
       | is_dummy_required (BOOL)|                     | description             |
       | dummy_status (ENUM)     |                     +-------------------------+
       | custom_revision_fee     |
       | fee_assessed_by (FK)    |
       | version                 |
       +------------+------------+
                    |
                    | 1:N
                    v
       +-------------------------+          1:1        +-------------------------+
       |    sample_feedbacks     +-------------------->|    pricing_formulas     |
       +-------------------------+                     +-------------------------+
       | id (PK)                 |                     | id (PK)                 |
       | sample_request_id (FK)  |                     | sample_feedback_id (FK) |
       | formula_code (UQ)       |                     | base_hpp_unit           |
       | rnd_decision (ENUM)     |                     | packaging_cost_unit     |
       | formulation_type (ENUM) |                     | operational_cost_unit   |
       | lead_time_days          |                     | margin_percentage       |
       | product_knowledge       |                     | final_unit_price (CALC) |
       | client_decision (ENUM)  |                     | is_approved (BOOL)      |
       +------------+------------+                     +------------+------------+
                    |                                               |
                    |                                               | 1:1 (Naik Produksi)
                    |                                               v
                    |                                  +-------------------------+
                    |                                  |     production_mou      |
                    |                                  +-------------------------+
                    |                                  | id (PK)                 |
                    |                                  | client_id (FK)          |
                    |                                  | pricing_formula_id (FK) |
                    |                                  | total_units             |
                    |                                  | total_production_cost   |
                    |                                  | dp_amount_required      |
                    |                                  | is_dp_cleared (BOOL)    |
                    |                                  | status (ENUM)           |
                    |                                  +------------+------------+
                    |                                               |
                    |                        +----------------------+----------------------+
                    |                        | 1:1                                         | 1:1
                    v                        v                                             v
       +-------------------------+  +-------------------------+               +-------------------------+
       |     design_tickets      |  |     legal_processes     |               |        payments         |
       +-------------------------+  +-------------------------+               +-------------------------+
       | id (PK)                 |  | id (PK)                 |               | id (PK)                 |
       | sample_request_id (FK)  |  | mou_id (FK)             |               | client_id (FK)          |
       | mockup_file_path        |  | is_white_label (BOOL)   |               | ref_type (ENUM)         |
       | dummy_print_status      |  | sig_status (ENUM)       |               | ref_id                  |
       | dummy_tracking_no       |  | sig_report_no           |               | amount                  |
       | client_approval (ENUM)  |  | bpom_reg_type (ENUM)    |               | compressed_proof_path   |
       | version                 |  | bpom_reg_number         |               | invoice_pdf_path        |
       +-------------------------+  | halal_cert_number       |               | verified_by (FK)        |
                                    | hki_cert_number         |               | status (ENUM)           |
                                    | status (ENUM)           |               +-------------------------+
                                    +-------------------------+

```

### Kamus Data Entitas Tambahan & Pembaruan

#### 1. Pembaruan Tabel `sample_requests`

* `is_dummy_required`: INTEGER (Boolean: 0 = Tidak perlu dummy, 1 = Klien meminta dummy kemasan).


* `dummy_status`: TEXT (`NONE`, `PENDING_PAYMENT`, `PRINTING`, `SHIPPED`, `ACC`, `REJECT`).


* `custom_revision_fee`: REAL (Nominal tarif revisi kustom dari Finance, default: 0.00).
* `fee_assessed_by`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC Finance).

#### 2. Tabel `pricing_formulas`

* `id`: TEXT (UUID, Primary Key)
* `sample_feedback_id`: TEXT (Foreign Key $\rightarrow$ `sample_feedbacks.id`, Unique)


* `base_hpp_unit`: REAL (Biaya racikan bahan baku RnD per pcs)


* `packaging_cost_unit`: REAL (Biaya kemasan per pcs dari Desain/Supplier)


* `operational_cost_unit`: REAL (Biaya overhead produksi per pcs)
* `margin_percentage`: REAL (Persentase margin perusahaan, misal: 35.00)
* `final_unit_price`: REAL (Kalkulasi otomatis dari sistem)


* `is_approved`: INTEGER (Boolean: 0 = Draf, 1 = Disetujui Finance)
* `created_at`: INTEGER (Timestamp epoch)

#### 3. Tabel `design_tickets`

* `id`: TEXT (UUID, Primary Key)
* `sample_request_id`: TEXT (Foreign Key $\rightarrow$ `sample_requests.id`)


* `designer_user_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC Desain)


* `mockup_file_path`: TEXT (Path file mockup terkompresi $\le 300\text{ KB}$)


* `dummy_print_status`: TEXT (`NOT_REQUESTED`, `WAITING_PAYMENT`, `IN_PRINTING`, `SHIPPED`)


* `dummy_tracking_no`: TEXT (Nomor resi pengiriman dummy fisik ke klien)
* `client_approval`: TEXT (`PENDING`, `ACC`, `REVISE`)


* `revision_notes`: TEXT


* `version`: INTEGER (Default: 1)

#### 4. Tabel `production_mou`

* `id`: TEXT (UUID, Primary Key)
* `mou_number`: TEXT (Unique, format: `MOU-YYYYMMDD-XXXX`)


* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `pricing_formula_id`: TEXT (Foreign Key $\rightarrow$ `pricing_formulas.id`)


* `total_units`: INTEGER (Jumlah unit batch maklon yang disepakati)
* `total_production_cost`: REAL (Hasil kali `total_units` $\times$ `final_unit_price`)
* `dp_percentage`: REAL (Default: 50.00%)
* `dp_amount_required`: REAL (Nominal DP yang harus dibayar sebelum legalitas & produksi)


* `is_dp_cleared`: INTEGER (Boolean: 0 = Belum Lunas, 1 = Terverifikasi Lunas oleh Finance)


* `status`: TEXT (`DRAFT`, `WAITING_CLIENT_SIGN`, `WAITING_DP_PAYMENT`, `CLEARED_FOR_EXECUTION`)


* `created_at`: INTEGER (Timestamp epoch)

#### 5. Tabel `legal_processes`

* `id`: TEXT (UUID, Primary Key)
* `mou_id`: TEXT (Foreign Key $\rightarrow$ `production_mou.id`)


* `is_white_label`: INTEGER (Boolean: diambil dari status profil klien)


* `sig_status`: TEXT (`LOCKED_WAITING_DP`, `SUBMITTED`, `PASSED`, `FAILED`, `NOT_APPLICABLE`)


* `sig_report_no`: TEXT (Nomor laporan uji gizi SIG)


* `bpom_reg_type`: TEXT (`MD`, `NA`, `NOT_APPLICABLE`)


* `bpom_reg_number`: TEXT (Nomor izin edar BPOM resmi)


* `bpom_submitted_at`: INTEGER
* `bpom_issued_at`: INTEGER
* `halal_cert_number`: TEXT (Nomor ketetapan halal LPPOM MUI/BPJPH)


* `hki_cert_number`: TEXT (Nomor pendaftaran merek DJKI)


* `status`: TEXT (`LOCKED_WAITING_DP`, `IN_GOVERNMENT_REVIEW`, `FULLY_COMPLIANT`)


* `legal_officer_id`: TEXT (Foreign Key $\rightarrow$ `users.id`)



#### 6. Pembaruan Tabel `payments`

* `ref_type`: TEXT (Penambahan enum: `SAMPLE_FEE`, `REVISION_FEE`, `DUMMY_FEE`, `DP_PRODUCTION_LEGAL`).


* `invoice_pdf_path`: TEXT (Path file invoice PDF resmi yang digenerate oleh sistem).



---

## 7. Edge Case & Failure State (Tahap 2)

### 1. Klien Menolak Sampel Dummy Kemasan Berulang Kali

* **Kondisi:** Klien telah membayar sampel dummy, namun menyatakan *Tolak/Revisi* pada bentuk botol atau cetakan warna label dummy saat barang diterima.


* **Penanganan:** Sistem menaikkan status tiket dummy menjadi `DUMMY_REVISE`. Tombol pembuatan MoU dan penerbitan SPK produksi pabrik tetap terkunci total. Desain Grafis wajib berkoordinasi dengan CS untuk revisi visual. Jika revisi memerlukan penggantian bahan botol baru secara signifikan, Finance berhak menerbitkan tagihan invoice biaya dummy tambahan sebelum percetakan dummy kedua diproses.



### 2. Upaya Pendaftaran BPOM / SIG Sebelum DP Diverifikasi

* **Kondisi:** Tim Legal berusaha menginput nomor pengajuan uji SIG atau portal BPOM untuk mempercepat proses sebelum Finance memverifikasi pembayaran DP.


* **Penanganan:** Seluruh kolom input pada form `legal_processes` terkunci dengan status disabled. Sistem menampilkan badge peringatan merah: *"Eksekusi Regulasi Terkunci: Memerlukan Verifikasi Pelunasan DP Legal & Produksi oleh Finance"* (berdasarkan validasi `is_dp_cleared = 0`).



### 3. Fluktuasi Harga Bahan Baku Formula di Tengah Validasi Klien

* **Kondisi:** RnD telah menetapkan formula dan Finance telah menghitung HPP, namun klien menunda persetujuan harga selama 3 minggu sehingga harga bahan baku impor naik drastis.


* **Penanganan:** Formula harga memiliki masa berlaku mengikuti token approval (`expires_at`). Jika tautan approval kedaluwarsa, draf harga terkunci. CS harus menekan tombol *"Request Recalculation"*, yang akan mengembalikan tiket ke Finance untuk re-kalkulasi HPP terbaru sebelum tautan approval baru diterbitkan ke klien.



### 4. Formula Ditolak oleh Bagian Produksi Pabrik

* **Kondisi:** RnD meracik formula yang secara lab berhasil, namun setelah dikonfirmasi ke SPV Produksi Pabrik, alat mesin mixing pabrik tidak mendukung viskositas formula tersebut.


* **Penanganan:** RnD memilih keputusan `TOLAK` dengan sub-kategori *"Kendala Kapasitas Mesin Pabrik"*. Sistem otomatis mengirim notifikasi ke Grup Telegram CS, membatalkan pembuatan sampel fisik, dan menginstruksikan RnD untuk memodifikasi basis kekentalan formula.



### 5. Akses Tautan Approval Web Sekali Pakai yang Tidak Sah

* **Kondisi:** Klien membuka tautan approval web yang tokennya telah kedaluwarsa atau token hash dimanipulasi.
* **Penanganan:** Server mengembalikan antarmuka status ramah pengguna: *"Tautan Persetujuan Tidak Valid atau Telah Kedaluwarsa"*. Halaman menyajikan tombol langsung *"Hubungi CS Anda via WhatsApp"* dan sistem mencatat insiden akses tidak sah di audit log keamanan.

---

## 8. Success Metrics (Tahap 2)

| Metrik | Definisi | Target Tahap 2 |
| --- | --- | --- |
| **RnD Formula Turnaround Time** | Durasi dari pembayaran sampel terverifikasi hingga sampel selesai diracik dan tercatat `formula_code`.

 | **$\le 5$ hari kerja** (produk standar). |
| **Zero Illegal Legal Submissions** | Registrasi uji SIG atau pendaftaran akun BPOM tanpa pelunasan invoice DP Legal & Produksi.

 | **$0$ kasus bypass** ($100\%$ patuh gerbang pembayaran). |
| **Pricing Calculation Speed** | Durasi Finance memproses kalkulasi harga satuan produk sejak formula RnD disetujui.

 | Turun dari 2 hari kerja menjadi **$\le 15$ menit**. |
| **Dummy Approval Compliance** | Order produksi massal yang berjalan tanpa persetujuan dummy (pada order yang meminta dummy).

 | **$0\%$ kelolosan** ($100\%$ produksi massal tertahan sampai dummy ACC). |
| **Client Approval Token Usability** | Persentase persetujuan sampel/mockup yang diproses via token link tanpa hambatan error teknis. | **$\ge 95\%$ keberhasilan respon**. |

---

## 9. Sprint Execution Plan (Slicing Tahap 2)

```
Siklus Pengerjaan Sprint Tahap 2:

[TASK-08] RnD Workbench & Formula Registry Module
          - UI Form Workbench RnD: Klasifikasi New/Existing, Konfirmasi Pabrik (Acc/Tolak)[cite: 1].
          - Generator unik formula_code & form Product Knowledge[cite: 1].
          - Sinkronisasi status offline-to-online pada tabel sample_feedbacks[cite: 1].

[TASK-09] Finance Dynamic Pricing Calculator
          - Engine formula matematika: HPP Bahan + Kemasan + Overhead * Margin %[cite: 1].
          - CRUD tabel pricing_formulas & penguncian nilai harga final[cite: 1].
          - Antarmuka penetapan tarif kustom revisi sampel oleh Finance[cite: 1].

[TASK-10] Invoice PDF Generator & Payment Clearance Center
          - Template generator PDF Invoice otomatis (Sampel, Revisi, Dummy, DP Legal & Produksi)[cite: 1].
          - UI Dashboard Finance untuk verifikasi mutasi bayar & upload bukti WebP <= 300 KB[cite: 1].
          - Routing webhook bot notifikasi ke Grup Telegram Finance & RnD[cite: 1].

[TASK-11] Design Graphic & Dummy Production Gate
          - Modul penerimaan brief kemasan & upload mockup visual (maksimal 300 KB)[cite: 1].
          - Alur percabangan dummy: Pembuatan tagihan dummy -> Cetak dummy -> ACC Dummy[cite: 1].
          - Interlocking gate: Menahan pembuatan MoU selama dummy berstatus pending/revisi[cite: 1].

[TASK-12] Strict Legal Compliance Gate & Branching
          - Logika branching is_white_label: Bypass Uji SIG & BPOM mandiri jika aktif[cite: 1].
          - Field locking gate: Blokir input berkas regulasi jika is_dp_cleared == 0[cite: 1].
          - Perekaman nomor legalitas: Uji SIG, BPOM MD/NA, Halal, dan HKI[cite: 1].

[TASK-13] One-Time Token Approval Web Gateway
          - Generator token hash aman dengan pengaturan TTL dinamis (approval_token_ttl_days).
          - Halaman web responsif mobile untuk persetujuan sampel/dummy/MoU oleh klien (ACC/Revisi)[cite: 1].
          - Proteksi single-use token (is_used = 1) dan routing callback ke sistem inti.

```