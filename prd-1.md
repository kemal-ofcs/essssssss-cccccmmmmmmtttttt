# Product Requirement Document (PRD): Sistem Operasi Maklon Terpadu (MaklonOS)

**Dokumen:** `prd.md`

**Versi:** 2.0 (Arsitektur End-to-End Final)

**Target Rilis:** Tahap 1 (MVP CS/CRM Core Engine) menuju Tahap 2 & 3 (RnD, Finance, Legal, PPIC, Produksi, Logistik, CRM Retention)

**Tech Stack:** Next.js (Web & Mobile/Desktop UI), Tauri v2 (Cross-Platform Wrapper Desktop & Mobile), SQLite (Local Embedded Storage), Turso (libSQL Cloud Database), Telegram Bot API (Divisional Channel Routing).

---

## 1. Problem Statement

Operasional maklon saat ini tersebar di belasan Google Sheets dan Google Forms independen yang dikelola per PIC CS, CRM, RnD, Finance, Desain, Legal, PPIC, dan Produksi.

* **Customer Service & CRM:** Mengalami *overhead* administrasi tinggi akibat entri ganda manual dari lead masuk, antrian sampel, antrian formulasi, hingga tagihan. Ketiadaan pelacakan terotomasi membuat prospek tanpa respon $>7$ hari (*Cold Leads*) terabaikan. Batas kepemilikan data antara CS (order pertama) dan CRM (retensi/repeat order) tidak memiliki batas sistem yang tegas.


* **RnD & Desain Grafis:** Menerima spesifikasi formula dan kemasan yang tidak terstandarisasi. Kuota revisi sampel tidak terkontrol, memboroskan bahan laboratorium tanpa mekanisme penagihan biaya tambahan.


* **Finance:** Pencocokan bukti transfer dengan tagihan invoice memakan waktu lama karena bukti pembayaran hanya dikirimkan via chat. Kalkulasi HPP dan margin produk akhir masih dihitung manual di spreadsheet terpisah, memicu potensi salah hitung.


* **PPIC, Produksi, & Legal:** Prosedur registrasi izin edar (BPOM/Halal) sering berjalan tanpa kepastian dana DP masuk. Ketiadaan penjadwalan manual yang tersinkronisasi saat bahan baku kosong menyebabkan estimasi pengiriman meleset.


* **Manajemen & Klien:** Tidak ada audit trail atas komplain produk pasca kirim. Manajemen kehilangan visibilitas metrik SLA operasional *lead-to-delivery*.



---

## 2. Target User & Persona

### Target User

Seluruh personel internal back-office:

* Customer Service (CS) — Penanggung jawab akuisisi lead dan order pertama.


* Customer Relationship Management (CRM) — Penanggung jawab retensi dan *repeat order*.


* RnD Formulator


* Tim Desain Grafis


* Tim Finance


* Tim Legal & Regulasi


* PPIC & Tim Pabrik/SPV Produksi



### Persona

#### Persona 1: Rina — Lead Handler & First-Order CS

* **Tanggung Jawab:** Menangani prospek awal (*Ads, Instagram, Web*), mencatat preferensi formulasi, membuat tiket sampel, mengawal produksi batch pertama hingga barang diterima klien.


* **Perangkat:** Laptop kerja (Desktop App) dan Android (Mobile App).
* **Pain Point:** Sering lupa melakukan *follow-up* lead pasif $>7$ hari. Takut akunnya dibuka bersamaan oleh staf lain yang dapat memicu benturan data.


* **Kebutuhan:** Klasifikasi otomatis *Hot/Warm/Cold*, verifikasi kuota revisi gratis sebelum order ditagihkan, dan penyerahan (*handover*) otomatis klien ke CRM begitu batch pertama selesai.



#### Persona 2: Bayu — SPV Produksi & Pabrik

* **Tanggung Jawab:** Menjadwalkan antrian penimbangan, mixing, filling, dan packing, serta mengoordinasikan kesiapan bahan baku bersama PPIC.


* **Perangkat:** PC Desktop Ruang Pabrik & Tablet Android.
* **Pain Point:** Ketika bahan baku kosong di PPIC, jadwal produksi berantakan dan timeline CS ke klien menjadi tidak akurat.


* **Kebutuhan:** Antarmuka penjadwalan manual untuk menggeser tanggal produksi saat bahan baku *delay*, serta pencatatan investigasi QC jika ada klaim komplain produk rusak.



---

## 3. Goals & Non-Goals

### Goals

* **Penyatuan Sistem Menyeluruh:** Mengeliminasi seluruh lembar kerja spreadsheet operasional maklon secara terpadu.


* **Arsitektur Local-First:** Berjalan di Web, Desktop (Tauri v2), dan Mobile (Tauri v2 Android) dengan basis data SQLite lokal yang tersinkronisasi dua arah ke Turso DB.
* **Penegakan Sesi Tunggal:** Aturan tegas **1 Akun = 1 Sesi Aktif** (*Single Active Session*) dengan terminasi otomatis sesi perangkat lama.
* **Pemisahan Peran CS & CRM:** CS mengawal siklus akuisisi hingga pesanan pertama selesai diterima klien; CRM otomatis menerima alokasi klien untuk program retensi dan *repeat order* berikutnya.


* **Gerbang Validasi Bisnis (Business Gates):**
1. *Sample Revision Gate:* Revisi $1..N$ gratis; revisi selanjutnya dikunci sampai tarif kustom ditetapkan Finance dan dibayar klien.


2. *Dummy Approval Gate:* Jika klien meminta dummy kemasan, produksi massal ditahan (*halted*) sampai approval dummy terbit.


3. *Legal Execution Gate:* Pendaftaran uji SIG dan BPOM/Halal hanya dapat diproses setelah DP Legal & Produksi terverifikasi lunas oleh Finance.


4. *QC Claim Gate:* Penolakan produk jadi pasca kirim wajib melalui tiket investigasi QC (Internal Fault vs Recipient/Courier Fault).




* **Otomasi Notifikasi Grup Telegram:** Mengirimkan *alert* proses operasional langsung ke bot grup divisi terkait.
* **Optimasi Penyimpanan Media:** Kompresi gambar sisi klien wajib $\le 300\text{ KB}$ format `.webp` sebelum ditulis ke SQLite lokal.

### Non-Goals

* **Portal Klien Mandiri:** Tidak menyediakan sistem login mandiri untuk pihak eksternal/klien maklon. Interaksi klien hanya via link web form sekali pakai (*single-use token*) atau via CS.
* **Integrasi Mutasi Bank Otomatis:** Tidak melakukan integrasi API perbankan langsung; Finance memegang hak mutlak verifikasi transfer secara manual.


* **Modul General Ledger Akuntansi:** Tidak mencakup pembukuan akuntansi penuh, penyusutan aset, atau penggajian.

---

## 4. User Stories

### Fase 1: Core Engine, CS & CRM

* **US-01 (CS):** Sebagai CS, saya ingin mendaftarkan lead baru dengan data lengkap, supaya sistem menerbitkan `kode_klien` unik tanpa risiko duplikasi data.


* **US-02 (CS/CRM):** Sebagai CS/CRM, saya ingin sistem memindahkan lead yang tidak berinteraksi selama $>7$ hari ke antrian *Cold Leads*, supaya saya dapat melakukan kampanye re-aktivasi berkala.


* **US-03 (CS):** Sebagai CS, saya ingin sistem otomatis memeriksa kuota revisi sampel gratis, supaya jika batas terlampaui tiket dialihkan ke Finance untuk penetapan biaya tambahan.
* **US-04 (Internal):** Sebagai Staf, saya ingin sesi saya otomatis keluar jika akun saya dibuka di perangkat lain, supaya integritas penginputan data tetap terjaga.

### Fase 2: RnD, Desain, Legal, & Finance

* **US-05 (RnD):** Sebagai RnD, saya ingin mencatat hasil formula dan status *Acc/Tolak* saat laboratorium dalam kondisi offline, supaya pekerjaan tidak terkendala sinyal.


* **US-06 (Finance):** Sebagai Finance, saya ingin menginput tarif kustom revisi sampel dan menghitung harga produk akhir via mesin HPP + Margin dinamis.


* **US-07 (Legal):** Sebagai Legal Officer, saya ingin pendaftaran uji SIG dan BPOM terkunci sebelum invoice DP diverifikasi Finance, supaya perusahaan tidak menanggung biaya registrasi di awal.


* **US-08 (Klien via Web Link):** Sebagai Klien, saya ingin menyetujui sampel formula atau dummy produk lewat link web sekali pakai, supaya saya tidak perlu membuat akun aplikasi baru.



### Fase 3: PPIC, Produksi, Logistik, & Retensi CRM

* **US-09 (SPV Produksi):** Sebagai SPV Produksi, saya ingin menggeser tanggal penimbangan/mixing/packing secara manual saat PPIC mengeluarkan PO pengadaan bahan baku, supaya timeline target produksi tetap realistis.


* **US-10 (SPV Produksi / QC):** Sebagai SPV Produksi/QC, saya ingin mencatat investigasi komplain retur produk untuk membuktikan letak kesalahan (Internal vs Ekspedisi/Penerima), supaya keputusan retur sah dan transparan.


* **US-11 (CRM):** Sebagai CRM, saya ingin sistem otomatis mengalihkan klien yang pesanan pertamanya selesai (`ORDER_COMPLETED`) ke antrian CRM saya, supaya saya dapat mengelola penawaran *repeat order* tanpa tumpang tindih dengan CS.



---

## 5. Roadmap Fitur

```
+---------------------------------------------------------------------------------------+
|                                     ROADMAP PRODUK                                    |
+---------------------------------------------------------------------------------------+
|  MVP (Fase 1: CS/CRM Engine & Local-First Infrastructure)                             |
|  - Intake Leads & Registrasi Klien Baru (Format Unik KLN-YYYYMMDD-XXXX)               |
|  - Engine Auto-Segmentasi Lead (Hot, Warm, Cold >7 Hari)                              |
|  - Single Active Session Enforcement (JWT + Active Session Guard)                     |
|  - Local-First Data Engine (SQLite Embedded Replica <-> Turso Cloud via Tauri v2)     |
|  - Dynamic Revision Counter Engine (Batas Gratis N-kali)                              |
|  - Gateway Telegram Bot ke Grup Divisi CS, RnD, Finance                               |
|  - Client-side WebP Compressor Engine (Batas Ketat <= 300 KB)                         |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  v2 (Fase 2: RnD Lab, Pricing Engine, Desain, & Kepatuhan Legalitas)                 |
|  - RnD Sample Workbench (New/Existing Product, Formula Code, Acc/Tolak)               |
|  - Finance Custom Revision Fee Setting & Dynamic HPP/Margin Calculator                |
|  - Finance Payment Gateway (Verifikasi Bukti Transfer & Generator Invoice PDF)        |
|  - Dynamic TTL Web Form Sekali Pakai untuk Approval Klien (Sampel & Desain)          |
|  - Regulatory Branching: White Label Bypass vs BPOM Penuh (MD/NA) & Halal             |
|  - Legal Execution Gate (Terkunci sebelum DP Legal & Produksi terverifikasi)          |
|  - Antrian Desain Grafis, Mockup, & Dummy Product Approval Gate                       |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  v3 (Fase 3: PPIC, Lantai Pabrik, Logistik, QC Retur, & Handover CRM)                |
|  - PPIC Inventory Check & Purchase Order (PO) Bahan Baku Out-of-Stock                 |
|  - Manual Production Rescheduling Workbench oleh SPV Produksi                         |
|  - Tracking Lantai Produksi (Penimbangan -> Mixing -> Filling -> Packing)             |
|  - Ekspedisi & Armada Internal Tracking (Surat Jalan & SOP Penyimpanan)               |
|  - Modul Klaim Investigasi QC & Otorisasi Retur Produk (Internal vs Penerima)         |
|  - Automatic Handover Engine: CS First-Order Completed -> CRM Retention Allocation    |
|  - CRM Repeat Order Pipeline Management                                               |
+---------------------------------------------------------------------------------------+

```

---

## 6. Functional Requirements Detail

### Modul MVP (Fokus Sprint 1)

#### FR-01: Single Active Session Enforcement

* Setiap keberhasilan login memicu pembaruan `active_session_id` (UUID) di tabel `users`.
* Klien lokal (Web, Desktop, Mobile) wajib memvalidasi token sesi setiap 60 detik atau pada setiap pertukaran data API:
* Jika `active_session_id` lokal tidak cocok dengan server Turso, sistem seketika mengeksekusi *force logout*.
* Seluruh token lokal dihapus dan antarmuka menampilkan: *"Sesi Anda dialihkan ke perangkat lain."*



#### FR-02: Mesin Intake Lead & Segmentasi Otomatis

* Form CS menampung: Nama Klien, Nomor WhatsApp, Alamat, Kota/Kabupaten, Provinsi, Saluran Lead, Kategori Produk, Catatan Kebutuhan.


* Sistem menerbitkan `kode_klien` berformat `KLN-YYYYMMDD-XXXX` secara otomatis.


* **Aturan Segmentasi:**
* `Hot Lead`: Interaksi terakhir $\le 3$ hari kalender.


* `Warm Lead`: Interaksi terakhir antara $4 - 7$ hari kalender.


* `Cold Lead`: `last_activity_at` melampaui $>7$ hari tanpa aktivitas follow-up baru.




* Worker background harian mengevaluasi timestamp `last_activity_at` dan memindahkan status lead secara otomatis. Setiap penambahan catatan interaksi oleh CS mereset timestamp ke `now()` dan mengembalikan status ke `Warm`/`Hot`.



#### FR-03: Mesin Kuota Revisi Dinamis

* Konfigurasi batas revisi gratis tersimpan di field `clients.free_revision_limit` (default: 1).
* Counter `sample_requests.revision_index` mencatat urutan revisi (0 = awal, 1 = revisi ke-1, dst.):
* Jika `revision_index <= free_revision_limit`: Tiket masuk ke RnD dengan status `RND_QUEUE_FREE`.


* Jika `revision_index > free_revision_limit`: Tiket beralih ke antrian Finance (`PENDING_FEE_ASSESSMENT`) untuk pengisian tarif kustom. Tiket terkunci dan tidak dapat dikerjakan oleh RnD sebelum berstatus `PAID`.





#### FR-04: Kompresi Gambar Lokal ($\le 300\text{ KB}$)

* Sebelum bukti transfer atau foto kemasan disimpan ke SQLite lokal:


* Modul browser/webview mengonversi gambar ke `.webp` dengan kompresi kualitas 75% dan batas resolusi terpanjang $1280\text{ px}$.
* Jika ukuran berkas tetap $>300\text{ KB}$, sistem menolak berkas dengan instruksi pemotongan gambar (*cropping*).
* Berkas lokal yang telah disinkronkan ke server akan dihapus otomatis dari media lokal setelah 7 hari kalender.



#### FR-05: Gateway Bot Telegram Divisi

* Sistem mengalirkan notifikasi ke ID grup obrolan per divisi yang terdaftar pada tabel `app_configs`:
* *Alert CS:* Lead baru masuk, lead menjadi Cold Lead, sampel selesai diracik RnD.


* *Alert RnD:* Pembayaran sampel terverifikasi Finance, sampel siap diproses di lab.


* *Alert Finance:* Permintaan penetapan biaya revisi, pengajuan faktur DP/Pelunasan.




* Seluruh notifikasi dikirim secara *asynchronous* dan kegagalan pengiriman tidak membatalkan transaksi database.

---

### Modul v2 & v3 (Aturan Lanjutan Terintegrasi)

#### FR-06: Gerbang Eksekusi Dummy Produk (v2)

* Jika klien memilih opsi `is_dummy_required = true`:


* Tiket masuk ke tim Desain Grafis untuk cetak dummy kemasan setelah pembayaran sampel dummy terverifikasi Finance.


* Sistem mengunci penerbitan MoU dan alur PPIC. Seluruh alur pabrik ditahan sampai klien menyatakan persetujuan (*ACC Dummy*).


* Jika ditolak, Desain Grafis melakukan perbaikan desain/cetak ulang sebelum melangkah ke tahap produksi.





#### FR-07: Gerbang Validasi DP Legalitas (v2)

* Tim Legal dan RnD dilarang mendaftarkan berkas uji laboratorium SIG, pendaftaran BPOM (MD/NA), Sertifikasi Halal, atau HKI ke portal pemerintah sebelum pembayaran invoice DP Legal & Produksi berstatus `VERIFIED` oleh Finance.


* Untuk produk dengan tanda `is_white_label = true`, alur pendaftaran BPOM/SIG mandiri dinonaktifkan secara otomatis.



#### FR-08: Penjadwalan Ulang Produksi Manual oleh SPV (v3)

* Jika PPIC menyatakan bahan baku `OUT_OF_STOCK` dan menerbitkan PO:


* SPV Produksi menerima tiket penyesuaian jadwal di modul Workbench Produksi.


* SPV Produksi wajib menginput manual perkiraan tanggal mulai penimbangan, mixing, filling, dan packing yang baru.


* Sistem otomatis memperbarui estimasi selesai pada dashboard CS untuk disampaikan ke klien.





#### FR-09: Penanganan Komplain Retur & Investigasi QC (v3)

* Jika produk jadi ditolak oleh klien pasca pengiriman (*Klien ACC Produk: Tidak*):


* Sistem membuat tiket `qc_claims` terkait order tersebut.


* Tim QC melakukan investigasi dan memilih status:
* `INTERNAL_FAULT`: Kesalahan formula, cacat segel pabrik, atau ketidaksesuaian spesifikasi. Sistem mengizinkan otorisasi retur barang dan memicu penerbitan batch produksi ulang.
* `RECIPIENT_FAULT`: Kerusakan akibat kelalaian kurir/ekspedisi luar atau kesalahan penanganan oleh penerima. Retur ditolak di sistem, dan CS diarahkan ke musyawarah klaim asuransi ekspedisi.





#### FR-10: Serah Terima CS ke CRM (First-Order to Retention) (v3)

* Selama proses order pertama (Lead In $\rightarrow$ Sampel $\rightarrow$ DP $\rightarrow$ Produksi $\rightarrow$ Kirim Produk $\rightarrow$ ACC Produk), tiket sepenuhnya di bawah wewenang CS.


* Begitu produk dinyatakan `ACC` oleh klien dan status order berubah menjadi `ORDER_COMPLETED`:


* Sistem mengubah status klien menjadi `EXISTING_CLIENT`.


* Sistem mengalokasikan akun klien ke antrian PIC CRM.


* Segala bentuk pemesanan ulang (*Repeat Order*) berikutnya ditangani langsung oleh CRM, sementara CS fokus menangani lead baru.





---

## 7. Sketsa Data Model

```
+---------------------------------------------------------------------------------------------------+
|                                         DATA MODEL (ERD)                                          |
+---------------------------------------------------------------------------------------------------+

   +-----------------------+                       +-----------------------+
   |         users         |                       |      app_configs      |
   +-----------------------+                       +-----------------------+
   | id (PK)               |                       | key (PK, TEXT)        |
   | username, role        |                       | value_text            |
   | active_session_id     |                       | description           |
   | session_updated_at    |                       +-----------------------+
   +-----------+-----------+
               |
               | 1:N
               v
   +-----------------------+          1:N          +-----------------------+
   |        clients        +---------------------->|         leads         |
   +-----------------------+                       +-----------------------+
   | id (PK)               |                       | id (PK)               |
   | client_code (UQ)      |                       | client_id (FK)        |
   | name, phone (UQ)      |                       | pic_cs_id (FK users)  |
   | address, city, prov   |                       | assigned_crm_id (FK)  |
   | lifecycle_status      |                       | channel_source        |
   | free_revision_limit   |                       | segment_status        |
   | is_white_label (BOOL) |                       | last_activity_at      |
   | version               |                       | total_followups       |
   +-----------+-----------+                       | version               |
               |                                   +-----------+-----------+
               | 1:N                                           |
               +--------------------+   +----------------------+
                                    |   |
                                    v   v
                        +---------------------------+
                        |      sample_requests      |
                        +---------------------------+
                        | id (PK)                   |
                        | client_id (FK)            |
                        | lead_id (FK)              |
                        | formulation_type (ENUM)   |
                        | bpom_name, claims         |
                        | target_budget, specs_json |
                        | revision_index (INT)      |
                        | is_billable (BOOL)        |
                        | custom_revision_fee       |
                        | is_dummy_required (BOOL)  |
                        | dummy_status (ENUM)       |
                        | status (ENUM)             |
                        | version                   |
                        +-------------+-------------+
                                      |
                     +----------------+----------------+
                     | 1:N                             | 1:N
                     v                                 v
        +---------------------------+    +---------------------------+
        |     sample_feedbacks      |    |         payments          |
        +---------------------------+    +---------------------------+
        | id (PK)                   |    | id (PK)                   |
        | sample_request_id (FK)    |    | client_id (FK)            |
        | iteration_number          |    | ref_type (ENUM)           |
        | formula_code              |    | ref_id                    |
        | rnd_user_id (FK)          |    | amount                    |
        | rnd_decision (ENUM)       |    | compressed_proof_path     |
        | client_decision (ENUM)    |    | verified_by (FK users)    |
        | version                   |    | status (ENUM)             |
        +-------------+-------------+    | version                   |
                      |                  +---------------------------+
                      | 1:1
                      v
        +---------------------------+    +---------------------------+
        |     pricing_formulas      |    |      approval_tokens      |
        +---------------------------+    +---------------------------+
        | id (PK)                   |    | id (PK)                   |
        | sample_feedback_id (FK)   |    | token_hash (UQ)           |
        | base_hpp_unit             |    | entity_type (ENUM)        |
        | packaging_cost_unit       |    | entity_id, client_id (FK) |
        | margin_percentage         |    | expires_at, is_used       |
        | final_unit_price          |    +---------------------------+
        +---------------------------+
                      |
                      v 1:1 (Naik Produksi)
        +---------------------------+
        |      production_mou       |
        +---------------------------+
        | id (PK)                   |
        | client_id (FK)            |
        | formula_id (FK)           |
        | total_units, total_cost   |
        | dp_payment_id (FK)        |
        | is_dp_cleared (BOOL)      |
        | status (ENUM)             |
        +-------------+-------------+
                      |
         +------------+------------+
         | 1:1                     | 1:N
         v                         v
+------------------+     +--------------------+     +--------------------+
|  legal_process   |     | production_batches |     |     qc_claims      |
+------------------+     +--------------------+     +--------------------+
| id (PK)          |     | id (PK)            |     | id (PK)            |
| mou_id (FK)      |     | mou_id (FK)        |     | batch_id (FK)      |
| is_white_label   |     | ppic_material_stat |     | client_id (FK)     |
| sig_tested_at    |     | po_reference_no    |     | fault_type (ENUM)  |
| bpom_reg_number  |     | manual_sched_start |     | claim_decision     |
| halal_cert_no    |     | spv_user_id (FK)   |     | pic_qc_id (FK)     |
| status (ENUM)    |     | status (ENUM)      |     | notes, version     |
+------------------+     +--------------------+     +--------------------+

```

### Kamus Data Entitas Kunci

#### 1. `users`

* `id`: TEXT (UUID, Primary Key)
* `username`: TEXT (Unique)
* `role`: TEXT (`CS`, `CRM`, `RND`, `FINANCE`, `DESIGN`, `LEGAL`, `PPIC`, `SPV_PRODUKSI`, `QC`, `ADMIN`)


* `active_session_id`: TEXT (UUID sesi aktif di Turso/SQLite)
* `session_updated_at`: INTEGER (Timestamp epoch)

#### 2. `clients`

* `id`: TEXT (UUID, Primary Key)
* `client_code`: TEXT (Unique, Indexed, e.g., `KLN-20260922-0001`)


* `name`, `phone`: TEXT


* `address`, `city`, `province`: TEXT


* `lifecycle_status`: TEXT (`LEAD`, `FIRST_ORDER_ACTIVE`, `EXISTING_CLIENT`)


* `free_revision_limit`: INTEGER (Default: 1)
* `is_white_label`: INTEGER (Boolean: 0 = BPOM Penuh, 1 = White Label)


* `version`: INTEGER (Default: 1)

#### 3. `leads`

* `id`: TEXT (UUID, Primary Key)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)
* `pic_cs_id`: TEXT (Foreign Key $\rightarrow$ `users.id`)


* `assigned_crm_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, Nullable)


* `channel_source`: TEXT


* `segment_status`: TEXT (`HOT`, `WARM`, `COLD`)


* `last_activity_at`: INTEGER (Timestamp epoch interaksi terakhir)


* `total_followups`: INTEGER (Default: 0)


* `version`: INTEGER (Default: 1)

#### 4. `sample_requests`

* `id`: TEXT (UUID, Primary Key)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `lead_id`: TEXT (Foreign Key $\rightarrow$ `leads.id`)
* `formulation_type`: TEXT (`NEW_PRODUCT`, `EXISTING_PRODUCT`)


* `bpom_name`, `claims`, `packaging`: TEXT


* `target_budget`: REAL


* `specs_json`: TEXT (Warna, tekstur, aroma, volume, request khusus)


* `revision_index`: INTEGER (Default: 0)
* `is_billable`: INTEGER (Boolean: 0 = gratis, 1 = berbayar)
* `custom_revision_fee`: REAL (Diisi oleh Finance)
* `is_dummy_required`: INTEGER (Boolean: 0 = Lewati, 1 = Cetak Dummy Dulu)


* `dummy_status`: TEXT (`NONE`, `WAITING_FEE`, `PRINTING`, `SHIPPED`, `ACC`, `REJECT`)


* `status`: TEXT (`DRAFT`, `WAITING_PAYMENT`, `PENDING_FEE_ASSESSMENT`, `RND_QUEUE`, `IN_RND`, `SHIPPED`, `ACC`, `REVISE`, `REJECTED`)


* `version`: INTEGER (Default: 1)

#### 5. `sample_feedbacks`

* `id`: TEXT (UUID, Primary Key)
* `sample_request_id`: TEXT (Foreign Key $\rightarrow$ `sample_requests.id`)
* `iteration_number`: INTEGER
* `formula_code`: TEXT


* `rnd_user_id`: TEXT (Foreign Key $\rightarrow$ `users.id`)


* `rnd_decision`: TEXT (`ACC`, `TOLAK`)


* `product_knowledge`, `rnd_notes`: TEXT


* `client_decision`: TEXT (`PENDING`, `ACC`, `REVISE`, `REJECT`)


* `version`: INTEGER (Default: 1)

#### 6. `pricing_formulas`

* `id`: TEXT (UUID, Primary Key)
* `sample_feedback_id`: TEXT (Foreign Key $\rightarrow$ `sample_feedbacks.id`, Unique)
* `base_hpp_unit`: REAL


* `packaging_cost_unit`: REAL


* `operational_cost_unit`: REAL
* `margin_percentage`: REAL
* `final_unit_price`: REAL (Kalkulasi: $(\text{HPP} + \text{Packaging} + \text{Overhead}) \times (1 + \frac{\text{Margin}}{100})$)


* `is_approved`: INTEGER (Boolean, validasi Finance)

#### 7. `payments`

* `id`: TEXT (UUID, Primary Key)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `ref_type`: TEXT (`SAMPLE_FEE`, `REVISION_FEE`, `DUMMY_FEE`, `DP_PRODUCTION_LEGAL`, `SETTLEMENT`, `SHIPPING`)


* `ref_id`: TEXT (ID tiket terkait)
* `amount`: REAL


* `compressed_proof_path`: TEXT ($\le 300\text{ KB}$, format `.webp`)


* `verified_by`: TEXT (Foreign Key $\rightarrow$ `users.id`)


* `status`: TEXT (`PENDING`, `VERIFIED`, `REJECTED`)


* `version`: INTEGER (Default: 1)

#### 8. `production_mou`

* `id`: TEXT (UUID, Primary Key)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `formula_id`: TEXT (Foreign Key $\rightarrow$ `pricing_formulas.id`)
* `total_units`: INTEGER
* `total_cost`: REAL
* `dp_payment_id`: TEXT (Foreign Key $\rightarrow$ `payments.id`, Nullable)


* `is_dp_cleared`: INTEGER (Boolean, validasi Finance DP)


* `status`: TEXT (`DRAFT`, `WAITING_DP`, `READY_FOR_LEGAL_AND_PRODUCTION`, `IN_PRODUCTION`, `COMPLETED`)



#### 9. `legal_process`

* `id`: TEXT (UUID, Primary Key)
* `mou_id`: TEXT (Foreign Key $\rightarrow$ `production_mou.id`)
* `is_white_label`: INTEGER (Boolean)


* `sig_submission_status`: TEXT (`LOCKED_UNTIL_DP`, `SUBMITTED`, `PASSED`, `FAILED`)


* `bpom_status`: TEXT (`NA`, `MD`, `NOT_APPLICABLE`, `SUBMITTED`, `ISSUED`)


* `halal_cert_status`: TEXT (`SUBMITTED`, `ISSUED`, `NOT_APPLICABLE`)


* `status`: TEXT (`WAITING_DP_CLEARANCE`, `IN_PROGRESS`, `COMPLIANCE_APPROVED`)



#### 10. `production_batches`

* `id`: TEXT (UUID, Primary Key)
* `mou_id`: TEXT (Foreign Key $\rightarrow$ `production_mou.id`)
* `ppic_material_stat`: TEXT (`CHECKING`, `AVAILABLE`, `OUT_OF_STOCK`)


* `po_reference_no`: TEXT (Nullable, jika bahan baku kosong)


* `manual_sched_start`: INTEGER (Timestamp manual penyesuaian jadwal SPV)


* `spv_user_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC SPV Produksi)


* `stage`: TEXT (`PENDING_MATERIALS`, `WEIGHING`, `MIXING`, `FILLING`, `PACKING`, `FINISHED`)


* `version`: INTEGER (Default: 1)

#### 11. `qc_claims`

* `id`: TEXT (UUID, Primary Key)
* `batch_id`: TEXT (Foreign Key $\rightarrow$ `production_batches.id`)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `fault_type`: TEXT (`INTERNAL_FAULT`, `RECIPIENT_FAULT`, `PENDING_INVESTIGATION`)
* `claim_decision`: TEXT (`ACC_RETURN`, `REJECTED`, `UNDER_REVIEW`)
* `pic_qc_id`: TEXT (Foreign Key $\rightarrow$ `users.id`)
* `notes`: TEXT
* `version`: INTEGER (Default: 1)

---

## 8. Edge Case & Failure State

### 1. Komplain Produk Rusak Saat Diterima Klien

* **Kondisi:** Klien menolak produk jadi pasca pengiriman (*Klien ACC Produk: Tidak*).


* **Penanganan:** Sistem menahan penutupan order dan membuat entri `qc_claims`. QC melakukan pengecekan sampel pertinggal lab.


* Jika `INTERNAL_FAULT`: Sistem mengizinkan otorisasi retur barang fisik dan menerbitkan perintah *re-batching* di antrian penimbangan tanpa tagihan tambahan.
* Jika `RECIPIENT_FAULT`: Tiket klaim ditolak di sistem dengan dokumentasi foto sebelum kirim (surat jalan & packing). CS memberikan penolakan resmi secara proporsional kepada klien.



### 2. Hambatan Dummy Kemasan Menahan Jalur Pabrik

* **Kondisi:** Klien memesan dummy produk kemasan, namun lambat memberikan persetujuan.


* **Penanganan:** Status order terkunci di gerbang `DUMMY_PRINTED_WAITING_ACC`. Sistem melarang CS mendorong antrian ke PPIC atau penimbangan pabrik. Telegram bot mengirim pengingat otomatis ke grup CS setiap 48 jam untuk konfirmasi revisi/acc dummy.



### 3. Eksekusi Legalitas Tertahan Akibat Pembayaran DP

* **Kondisi:** Tim Legal berusaha mengajukan uji SIG dan registrasi akun BPOM sebelum ada validasi dari Finance.


* **Penanganan:** Tombol aksi *Submit Uji SIG / BPOM* dinonaktifkan (disabled) dengan label: *"Menunggu Verifikasi Pelunasan DP Legal & Produksi"*. Status hanya terbuka jika `production_mou.is_dp_cleared = 1`.



### 4. Perubahan Jadwal Pabrik Akibat Bahan Baku PPIC Kosong

* **Kondisi:** PPIC menyatakan bahan baku perisa/aktif tidak tersedia.


* **Penanganan:** PPIC menginput nomor PO pengadaan bahan. Status batch berpindah ke `BLOCKED_MATERIAL`. Sistem membuka formulir *Penyesuaian Jadwal Manual* di akun SPV Produksi. SPV menggeser target mulai mixing, dan estimasi waktu baru langsung tercermin pada layar pelacakan CS ke klien.



### 5. Pelanggaran Sesi Bersamaan Antar-Perangkat

* **Kondisi:** CS login di laptop kantor, kemudian login di smartphone dalam perjalanan.
* **Penanganan:** Turso menerbitkan `active_session_id` baru. Klien laptop yang mendeteksi ketidaksesuaian UUID sesi langsung diputus koneksinya (*force logout*) tanpa menghapus berkas SQLite lokal yang belum sempat tersinkronisasi. Data tertunda ditampung di antrian karantina (*quarantine queue*).

---

## 9. Success Metrics

| Metrik | Definisi | Target MVP |
| --- | --- | --- |
| **Data Redundancy Rate** | Entri ulang data profil klien dan form sampel antar-divisi.

 | **0%** (sentralisasi data). |
| **Cold Lead Recovery** | Kecepatan deteksi dan tindak lanjut lead pasif $>7$ hari.

 | **100% lead terdeteksi otomatis**. |
| **Penyimpanan Gambar Lokal** | Ukuran berkas bukti transfer & dokumen terkompresi.

 | **$\le 300\text{ KB}$ per berkas** (`.webp`). |
| **Integritas Sesi Tunggal** | Pencegahan login bersamaan dalam 1 akun. | **0 pelanggaran sesi ganda**. |
| **Lead Time Lead-to-Sampel** | Durasi dari intake lead hingga peracikan sampel lab.

 | Turun dari 14 hari menjadi **$\le 7$ hari**. |
| **Zero Illegal Legal Submissions** | Registrasi BPOM/SIG tanpa validasi DP Finance.

 | **0 kasus bypass DP**. |

---

## 10. Sprint Execution Plan (Slicing MVP)

```
Siklus Pengerjaan Sprint 1 (MVP: CS/CRM Engine & Local-First Foundation):

[TASK-01] Inisialisasi Workspace & Wrapper Tauri v2
          - Konfigurasi Next.js (App Router, Tailwind CSS, TypeScript).
          - Konfigurasi Tauri v2 Desktop & Android targets.
          - Setup libSQL embedded replica (Local SQLite <-> Cloud Turso).

[TASK-02] Skema Database & Migrasi Lokal (SQLite/Turso)
          - Eksekusi DDL tabel: users, app_configs, clients, leads.
          - Implementasi trigger versi OCC (Optimistic Concurrency Control).

[TASK-03] Single Active Session Guard
          - Endpoint login/logout & penerbitan UUID active_session_id.
          - Heartbeat listener interval 60 detik & modal Force Logout.

[TASK-04] Modul Intake Lead & Registrasi Klien (CS/CRM)
          - Form CS: Profil Klien, Nomor WhatsApp, Wilayah, Kategori Produk[cite: 1].
          - Generator otomatis format kode: KLN-YYYYMMDD-XXXX[cite: 1].
          - Mesin kalkulator segmentasi otomatis: Hot, Warm, Cold (>7 Hari)[cite: 1].

[TASK-05] Mesin Kuota Revisi Dinamis
          - Pengaturan default free_revision_limit pada profil klien.
          - Evaluasi logika revisi: N-kali Gratis -> Dialihkan ke Finance.

[TASK-06] Client-Side WebP Image Compressor
          - Fungsi Canvas compressor: resolusi maks 1280px, format .webp.
          - Validasi ketat batas ukuran berkas <= 300 KB sebelum persistensi lokal.

[TASK-07] Bot Notifikasi Telegram Divisi
          - Service webhook bot asinkron ke ID Grup Percakapan CS & Finance.

```