Ya, **Tahap 3 adalah tahap penutup untuk seluruh siklus alur operasional maklon *end-to-end*** yang tercantum di dalam skema dokumen.

Dengan tuntasnya Tahap 3, alur sistem sudah lengkap 100%: mulai dari *Lead In* $\rightarrow$ *Sampel Lab* $\rightarrow$ *Legalitas & MoU* $\rightarrow$ *PPIC & Lantai Pabrik* $\rightarrow$ *Pelunasan Finance* $\rightarrow$ *Logistik/Ekspedisi* $\rightarrow$ *Investigasi Retur QC* $\rightarrow$ *Handover ke CRM untuk Repeat Order*. Tahapan setelah ini (Tahap 4 / Post-MVP) bersifat pengayaan analitik eksekutif (*Executive BI Dashboard*, automasi OEE pabrik, atau *Client Portal* mandiri).

Berikut adalah spesifikasi lengkap **PRD Tahap 3**:

---

# Product Requirement Document (PRD): Sistem Operasi Maklon Terpadu (MaklonOS)

**Dokumen:** `prd-tahap-3.md`

**Fase:** Tahap 3 (PPIC, Lantai Produksi, Pelunasan Finance, Logistik & Pengiriman, Investigasi Klaim Retur QC, dan Handover Retensi CRM)

**Status:** Approved for Implementation

**Tech Stack:** Next.js, Tauri v2 (Desktop & Android), SQLite (Local Storage), Turso (libSQL Cloud DB), Telegram Bot API.

---

## 1. Problem Statement

Setelah kesepakatan MoU ditandatangani dan DP disetujui Finance, koordinasi antara tim administrasi dengan lantai pabrik dan logistik sering mengalami hambatan kritis:

* **PPIC & SPV Produksi:** Ketika bahan baku tidak tersedia di gudang, PPIC membuat surat Purchase Order (PO) secara manual tanpa sinkronisasi langsung ke jadwal pabrik. Akibatnya, lantai produksi mengalami *idle time* atau target penimbangan/mixing bentrok dengan batch lain tanpa ada penyesuaian jadwal terpusat.


* **Customer Service & Klien:** CS tidak memiliki visibilitas atas progres riil di lantai produksi (Penimbangan $\rightarrow$ Mixing $\rightarrow$ Filling $\rightarrow$ Packing). Hal ini memicu pemberian janji estimasi selesai yang keliru kepada klien.


* **Finance:** Ketiadaan gerbang pelunasan yang ketat berisiko menyebabkan barang terkirim sebelum sisa tagihan produksi dan ongkos kirim dilunasi klien.


* **Logistik & Ekspedisi:** Pengiriman via armada internal maupun ekspedisi luar sering terkendala ketiadaan Surat Jalan standar, SOP penyimpanan produk pangan/kosmetik yang tidak terlampir, dan nomor resi pengiriman yang terlambat diteruskan ke CS dan klien.


* **Penanganan Komplain QC:** Jika produk ditolak oleh klien saat tiba di tujuan (*Klien ACC Produk: Tidak*), komplain sering diselesaikan secara debat tanpa data investigasi yang jelas apakah cacat berasal dari internal pabrik (formula/segel bocor) atau kesalahan penanganan kurir/penerima.


* **Silo CS vs CRM:** CS yang seharusnya berfokus mencari lead baru terus terbebani melayani klien lama yang ingin memesan ulang (*repeat order*), sedangkan tim CRM tidak memiliki arsip data formula dan histori batch klien untuk menjalankan program retensi.



---

## 2. Target User & Persona

### Target User

Personel internal back-office lantai produksi, logistik, penjamin mutu, dan retensi:

* PPIC Officer (Pengendali Bahan Baku & Pengadaan PO)


* SPV Produksi (Pengelola Lantai Pabrik & Penjadwalan Batch)


* Quality Control (QC) Inspector


* Tim Logistik & Pengiriman (Armada Internal & Ekspedisi)


* Tim Finance (Verifikator Pelunasan Produksi & Ekspedisi)


* CRM Officer (Customer Relationship Management — Retensi & Pemesanan Ulang)



### Persona

#### Persona 1: Bayu — SPV Produksi Pabrik

* **Tanggung Jawab:** Memverifikasi ketersediaan bahan dari PPIC, menyusun ulang jadwal penimbangan, mixing, filling, dan packing secara manual saat bahan baku terlambat, serta memastikan batch selesai tepat waktu.


* **Perangkat:** PC Ruang Kantor Pabrik & Tablet Android (Tauri v2).
* **Pain Point:** Sering disalahkan CS jika produksi molor akibat bahan baku kosong; tidak ada media terpusat untuk memberitahukan revisi jadwal batch secara resmi.


* **Kebutuhan:** Dasbor penyesuaian jadwal batch manual, checklist transisi tahapan produksi (Penimbangan $\rightarrow$ Packing), dan integrasi otomatis pengiriman status selesai ke CS & Finance.



#### Persona 2: Rendi — CRM Retention Specialist

* **Tanggung Jawab:** Mengelola hubungan jangka panjang dengan klien yang telah menyelesaikan pesanan pertama, mengantisipasi habisnya stok klien, dan mengunci transaksi *Repeat Order*.


* **Perangkat:** Laptop kerja (Desktop/Web).
* **Pain Point:** Klien lama sering berpindah maklon karena tidak pernah di-follow up pasca pengiriman; riwayat formula lama sulit dicari di spreadsheet CS yang berantakan.


* **Kebutuhan:** Notifikasi otomatis serah terima akun klien begitu pesanan pertama berstatus `ACC Produk`, akses instan ke seluruh spesifikasi formula batch sebelumnya, dan pipeline khusus pemesanan ulang (*Repeat Order*).



---

## 3. Goals & Non-Goals

### Goals

* **Sinkronisasi Pengadaan PPIC & Penjadwalan SPV:** Menghubungkan ketersediaan bahan baku gudang dengan penerbitan nomor Purchase Order (PO), serta menyediakan meja kerja penyesuaian jadwal manual oleh SPV Produksi yang langsung terdistribusi ke CS.


* **Pelacakan Lantai Produksi 4-Tahap:** Standardisasi pelacakan eksekusi batch fisik: *Tahap Penimbangan* $\rightarrow$ *Tahap Mixing* $\rightarrow$ *Tahap Filling* $\rightarrow$ *Tahap Packing*.


* **Gerbang Pelunasan Produksi (Strict Settlement Gate):** Mengunci perintah penjemputan ekspedisi/pengiriman armada sampai invoice pelunasan produksi diverifikasi `PAID` oleh Finance.


* **Logistics & Storage Dispatcher:** Perekaman metode pengiriman (Armada Internal vs Ekspedisi Rekanan), penerbitan otomatis dokumen Surat Jalan dan SOP Penyimpanan, serta distribusi nomor resi secara berjenjang (SPV Produksi $\rightarrow$ CS $\rightarrow$ Klien).


* **Mesin Klaim Retur & Investigasi QC:** Mengelola komplain penolakan produk pasca kirim via tiket investigasi QC, memvalidasi bukti cacat untuk mengesahkan retur (*Internal Fault*) atau menolak retur (*Recipient/Courier Fault*).


* **Handover Otomatis CS ke CRM:** Mengubah status siklus hidup klien menjadi `EXISTING_CLIENT` dan mengalihkan penugasan akun ke CRM begitu pesanan pertama dinyatakan `ACC Produk`, mengunci keterlibatan CS hanya pada akuisisi awal.



### Non-Goals

* **Integrasi Sensor IoT Mesin Pabrik:** Sistem tidak membaca sensor suhu, RPM tangki mixing, atau kecepatan konveyor filling secara otomatis; pembaruan status antar-tahap diinput manual oleh SPV/operator.
* **Live GPS Tracking Armada Internal:** Sistem tidak melacak pergerakan armada secara real-time di peta digital; pelacakan hanya berbasis status keberangkatan dan konfirmasi penerimaan barang.

---

## 4. User Stories

* **US-20 (PPIC):** Sebagai PPIC, saya ingin memeriksa ketersediaan bahan baku dan menginput nomor surat PO jika bahan kosong, supaya tim pabrik mengetahui alasan keterlambatan bahan secara resmi.


* **US-21 (SPV Produksi):** Sebagai SPV Produksi, saya ingin menggeser tanggal mulai penimbangan, mixing, filling, dan packing secara manual saat bahan baku terlambat, supaya target pengiriman yang dilihat oleh CS dan klien disesuaikan secara realistis.


* **US-22 (SPV Produksi):** Sebagai SPV Produksi, saya ingin menandai penyelesaian tahap packing, supaya sistem otomatis memberi notifikasi ke CS dan meminta Finance menerbitkan invoice pelunasan produksi.


* **US-23 (Finance):** Sebagai Finance, saya ingin memverifikasi bukti bayar pelunasan produksi sebelum surat jalan dan instruksi ekspedisi dapat diterbitkan, supaya produk jadi tidak keluar dari pabrik sebelum dibayar lunas.


* **US-24 (Logistik / SPV):** Sebagai Staf Logistik/SPV, saya ingin menginput nomor resi ekspedisi atau identitas armada internal beserta surat jalan dan SOP penyimpanan, supaya CS dapat meneruskan detail pengiriman ke klien secara transparan.


* **US-25 (QC):** Sebagai QC Inspector, saya ingin menginvestigasi tiket komplain produk rusak dan menetapkan keputusan (*Internal Fault* vs *Recipient Fault*), supaya retur barang hanya disetujui jika kesalahan terbukti berasal dari produksi pabrik.


* **US-26 (CRM):** Sebagai CRM, saya ingin menerima notifikasi serah terima akun klien baru yang pesanan pertamanya telah selesai di-ACC, supaya saya dapat memulai pipeline hubungan retensi dan repeat order tanpa bentrok dengan CS.



---

## 5. Functional Requirements Detail (Tahap 3)

### FR-15: Pemeriksaan Bahan Baku PPIC & Penanganan PO

* Modul PPIC menerima antrian batch begitu status MoU berstatus `READY_FOR_LEGAL_AND_PRODUCTION`.


* Petugas PPIC melakukan pengecekan stok fisik dan memilih status ketersediaan bahan:
* **Tersedia:** Tiket batch langsung berstatus `READY_FOR_WEIGHING` (siap masuk penimbangan). Sistem mengirim sinyal ke antrian lantai pabrik.


* **Tidak Tersedia:** Status batch berubah menjadi `OUT_OF_STOCK_PENDING_PO`. Form mewajibkan PPIC menginput nomor Surat Purchase Order (`po_reference_no`), nama supplier, dan estimasi tanggal kedatangan bahan baku.




* Setelah bahan baku pesanan PO tiba di pabrik dan lolos uji karantina material, PPIC menekan tombol *"Konfirmasi Bahan Ready"*, yang memicu notifikasi instan ke Grup Telegram Produksi bahwa bahan siap diracik.



### FR-16: Meja Kerja Penyesuaian Jadwal Manual SPV Produksi

* Jika terjadi penundaan kedatangan bahan baku (dari alur PPIC PO), SPV Produksi menerima tiket peringatan di dasbor produksi.


* **Penjadwalan Manual:** Sistem **tidak mengalkulasi tanggal otomatis**, melainkan membuka form input jadwal bagi SPV Produksi untuk menentukan estimasi tanggal baru:
* Tanggal Mulai Tahap Penimbangan Bahan


* Tanggal Mulai Tahap Mixing Bahan


* Tanggal Mulai Tahap Filling Bahan


* Tanggal Mulai Tahap Packing Produk


* Tanggal Target Penyelesaian Produk Jadi




* Setelah jadwal disimpan, sistem otomatis mengupdate `estimated_completion_date` pada tabel order dan mengirimkan notifikasi pembaruan jadwal ke CS untuk diinformasikan ke klien.



### FR-17: Pelacakan Tahapan Fisik Produksi (Lantai Pabrik)

* SPV Produksi memandu eksekusi batch melalui 4 tahapan sekuensial yang wajib diselesaikan berurutan:


1. **Tahap Penimbangan Bahan:** Validasi kesesuaian bobot bahan aktif dan bahan penolong sesuai formulasi RnD.


2. **Tahap Mixing Bahan:** Validasi proses pencampuran formula di tangki reaktor hingga homogen.


3. **Tahap Filling Bahan:** Validasi pengisian formula cair/serbuk ke dalam kemasan primer (botol/pot/sachet).


4. **Tahap Packing Produk:** Pemasangan segel, label, kardus sekunder, hingga master carton.




* Setiap perpindahan tahap mencatat timestamp epoch dan identitas operator pelaksana.
* Tombol *"Konfirmasi Produk Jadi Selesai"*: Mengubah status batch menjadi `PRODUCTION_FINISHED` dan secara otomatis memicu pengiriman alert ke Grup Telegram CS dan Finance.



### FR-18: Gerbang Pelunasan Produksi & Penerbitan Dokumen Pengiriman

* Terpicu segera setelah SPV Produksi mengonfirmasi produk selesai dikemas.


* CS memicu pembuatan tagihan pelunasan: Finance menerbitkan *Invoice Pelunasan Produksi & Ongkos Kirim*.


* **Strict Shipping Lock:** Tombol cetak Surat Jalan, pemilihan armada, dan instruksi penjemputan ekspedisi terkunci total (*disabled*) di antarmuka logistik.


* Tombol pengiriman baru aktif apabila status pembayaran tagihan pelunasan di tabel `payments` telah berstatus `VERIFIED` oleh Finance.


* Sistem menyediakan generator otomatis dokumen standar pengiriman:
* **Surat Jalan:** Memuat nomor surat jalan unik, rincian koli/karton, volume barang, alamat tujuan, dan tanda tangan digital pengirim/penerima.


* **Dokumen SOP Penyimpanan:** Lembar panduan suhu penyimpanan produk (misal: simpan di tempat kering $\le 30^\circ\text{C}$, hindari paparan matahari langsung) yang wajib disertakan dalam master box.





### FR-19: Logistik Pengiriman & Distribusi Resi Berjenjang

* Staf Logistik memilih saluran distribusi:
* **Armada Internal Perusahaan:** Menginput nama driver, nomor plat kendaraan, dan kontak pengemudi.


* **Ekspedisi Rekanan (Kargo/Udara/Darat):** Menginput nama vendor ekspedisi dan meminta agen kargo melakukan penjemputan barang (*pickup*).




* **Alur Distribusi Resi Pengiriman:**
1. Ekspedisi menerbitkan bukti resi pengiriman fisik/digital dan menyerahkannya ke SPV Produksi / Logistik.


2. SPV Produksi menginput nomor resi (`tracking_number`) dan mengunggah foto bukti resi ke sistem.


3. Sistem menerbitkan alert ke Grup Telegram CS bahwa barang telah bergerak beserta nomor resi valid.


4. CS meneruskan tautan pelacakan dan nomor resi kepada klien via WhatsApp atau sistem approval link.





### FR-20: Investigasi Klaim Retur QC (Klien ACC Produk: Ya / Tidak)

* Setelah barang sampai di lokasi, status order berada di gerbang `WAITING_CLIENT_PRODUCT_ACCEPTANCE`.


* Klien memberikan konfirmasi penerimaan:
* **Ya (ACC Produk):** Siklus produksi batch pertama dinyatakan sukses dan berstatus `ORDER_COMPLETED`. Sistem langsung memicu mekanisme serah terima akun ke CRM (FR-21).


* **Tidak (Tolak / Komplain):** Klien menolak produk (misal: tutup kemasan rusak, bau tengik, isi bocor, isi tidak sesuai spesifikasi sampel).




* **Alur Investigasi Klaim QC:**
1. Sistem otomatis menerbitkan tiket `qc_claims` dengan status `UNDER_INVESTIGATION`.


2. Petugas QC mengambil sampel pertinggal (*retain sample*) dari batch produksi yang sama di laboratorium dan membandingkannya dengan bukti foto/video dari klien.
3. **Keputusan Investigasi:**
* `INTERNAL_FAULT`: Kesalahan terbukti pada proses pabrik (kegagalan suhu mixing, segel mesin longgar). QC memilih opsi **ACC Retur**. Sistem mengotorisasi surat penerimaan retur fisik barang dan menerbitkan perintah peracikan ulang batch pengganti (*re-production ticket*) tanpa beban biaya ke klien.


* `RECIPIENT_FAULT`: Kerusakan terbukti akibat kelalaian penanganan pihak ekspedisi pihak ketiga atau kesalahan penyimpanan oleh penerima (misal paket basah kehujanan saat kargo). QC memilih opsi **Tolak Retur**. Sistem mencatat penolakan klaim disertai berita acara investigasi QC untuk diteruskan CS ke klien guna klaim asuransi ekspedisi luar.







### FR-21: Mesin Handover Otomatis CS ke CRM & Manajemen Retensi

* Begitu order pertama klien berstatus `ORDER_COMPLETED` (lolos ACC produk):


* Field `clients.lifecycle_status` otomatis berganti dari `FIRST_ORDER_ACTIVE` menjadi `EXISTING_CLIENT`.


* Sistem menetapkan akun klien ke petugas CRM (`assigned_crm_id`).


* Akses CS terhadap akun tersebut beralih menjadi *Read-Only* (arsipkan ke histori order pertama).




* Dasbor CRM menerima kartu klien baru lengkap dengan riwayat:
* Formula Code yang disetujui (`formula_code`).


* Volume batch terakhir dan estimasi waktu habis pakai stok klien (estimasi re-order).
* Riwayat komunikasi dan preferensi kemasan.




* Setiap pesanan baru dari klien berstatus `EXISTING_CLIENT` wajib diproses melalui alur *Repeat Order* di bawah wewenang CRM, mengeliminasi bypass jalur ke CS awal.



---

## 6. Sketsa Data Model (Tahap 3 Enhancement)

```
+----------------------------------------------------------------------------------------------------+
|                                    DATA MODEL ENHANCEMENT (TAHAP 3)                                |
+----------------------------------------------------------------------------------------------------+

     +-----------------------+                         +-----------------------+
     |        clients        |                         |         users         |
     +-----------------------+                         +-----------------------+
     | id (PK)               |                         | id (PK)               |
     | lifecycle_status (ENUM|                         | username              |
     | assigned_crm_id (FK)  +------------------------>| role (ENUM: PPIC, SPV,|
     +-----------+-----------+                         |  QC, LOGISTIK, CRM)   |
                 |                                     +-----------+-----------+
                 | 1:1                                             |
                 v                                                 |
     +-----------------------+                                     |
     |    production_mou     |                                     |
     +-----------------------+                                     |
     | id (PK)               |                                     |
     | client_id (FK)        |                                     |
     | is_dp_cleared (BOOL)  |                                     |
     +-----------+-----------+                                     |
                 |                                                 |
                 | 1:N                                             |
                 v                                                 |
     +-----------------------+                                     |
     |  production_batches   |                                     |
     +-----------------------+                                     |
     | id (PK)               |                                     |
     | mou_id (FK)           |                                     |
     | batch_code (UQ)       |                                     |
     | ppic_material_stat    |                                     |
     | po_reference_no       |                                     |
     | po_supplier_name      |                                     |
     | manual_sched_start    |                                     |
     | manual_sched_end      |                                     |
     | current_stage (ENUM)  |                                     |
     | spv_user_id (FK)      +-------------------------------------+
     | is_settlement_cleared |
     | version               |
     +-----------+-----------+
                 |
                 +-----------------------+-----------------------+
                 | 1:1                   | 1:1                   | 1:N
                 v                       v                       v
     +-----------------------+ +-----------------------+ +-----------------------+
     |  logistics_shipments  | |       qc_claims       | |     crm_pipelines     |
     +-----------------------+ +-----------------------+ +-----------------------+
     | id (PK)               | | id (PK)               | | id (PK)               |
     | batch_id (FK, UQ)     | | batch_id (FK)         | | client_id (FK)        |
     | delivery_method (ENUM)| | client_id (FK)        | | last_formula_code     |
     | carrier_name          | | fault_type (ENUM)     | | last_order_completed_at|
     | tracking_number       | | claim_decision (ENUM) | | estimated_depletion_at|
     | driver_name_plate     | | investigation_notes   | | pipeline_status (ENUM)|
     | delivery_note_pdf_path| | proof_media_path      | | assigned_crm_id (FK)  |
     | storage_sop_pdf_path  | | pic_qc_id (FK)        | | version               |
     | is_delivered (BOOL)   | | authorized_at         | +-----------------------+
     | client_acc_status     | | version               |
     | version               | +-----------------------+
     +-----------------------+

```

### Kamus Data Entitas Tambahan (Tahap 3)

#### 1. Pembaruan Tabel `production_batches`

* `batch_code`: TEXT (Unique, e.g., `BAT-20260922-0001`)


* `ppic_material_stat`: TEXT (`CHECKING`, `AVAILABLE`, `OUT_OF_STOCK_PENDING_PO`)


* `po_reference_no`: TEXT (Nomor surat Purchase Order dari PPIC, nullable)


* `po_supplier_name`: TEXT (Nama vendor bahan baku)
* `manual_sched_start`: INTEGER (Timestamp epoch mulai penimbangan manual dari SPV)


* `manual_sched_end`: INTEGER (Timestamp epoch target selesai manual dari SPV)


* `current_stage`: TEXT (`PENDING_MATERIALS`, `STAGE_WEIGHING`, `STAGE_MIXING`, `STAGE_FILLING`, `STAGE_PACKING`, `PRODUCTION_FINISHED`)


* `spv_user_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC SPV Produksi)


* `is_settlement_cleared`: INTEGER (Boolean: 0 = Belum Lunas, 1 = Pelunasan Produksi Terverifikasi Finance)


* `finished_at`: INTEGER (Timestamp epoch selesai packing)



#### 2. Tabel `logistics_shipments`

* `id`: TEXT (UUID, Primary Key)
* `batch_id`: TEXT (Foreign Key $\rightarrow$ `production_batches.id`, Unique)
* `delivery_method`: TEXT (`INTERNAL_FLEET`, `THIRD_PARTY_CARRIER`)


* `carrier_name`: TEXT (Nama ekspedisi kargo atau identitas unit kendaraan pabrik)


* `tracking_number`: TEXT (Nomor resi ekspedisi, nullable jika armada internal)


* `driver_name_plate`: TEXT (Nama pengemudi dan plat nomor kendaraan jika armada internal)


* `delivery_note_pdf_path`: TEXT (Path file PDF Surat Jalan resmi)


* `storage_sop_pdf_path`: TEXT (Path file PDF panduan SOP penyimpanan produk)


* `shipped_at`: INTEGER (Timestamp epoch pengiriman)


* `is_delivered`: INTEGER (Boolean: 0 = Sedang Dikirim, 1 = Diterima Klien)


* `client_acc_status`: TEXT (`PENDING`, `ACCEPTED`, `REJECTED_COMPLAINT`)


* `version`: INTEGER (Default: 1)

#### 3. Tabel `qc_claims`

* `id`: TEXT (UUID, Primary Key)
* `batch_id`: TEXT (Foreign Key $\rightarrow$ `production_batches.id`)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`)


* `complaint_notes`: TEXT (Keluhan rinci dari pihak klien)


* `fault_type`: TEXT (`PENDING_INVESTIGATION`, `INTERNAL_FAULT`, `RECIPIENT_FAULT`)
* `claim_decision`: TEXT (`UNDER_REVIEW`, `ACC_RETURN`, `REJECT_RETURN`)
* `investigation_notes`: TEXT (Analisis uji lab sampel pertinggal QC)
* `proof_media_path`: TEXT (Bukti foto/video terkompresi $\le 300\text{ KB}$)
* `pic_qc_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC Inspector QC)
* `authorized_at`: INTEGER (Timestamp penetapan keputusan klaim)
* `version`: INTEGER (Default: 1)

#### 4. Tabel `crm_pipelines`

* `id`: TEXT (UUID, Primary Key)
* `client_id`: TEXT (Foreign Key $\rightarrow$ `clients.id`, Unique)


* `assigned_crm_id`: TEXT (Foreign Key $\rightarrow$ `users.id`, PIC CRM pengelola)


* `last_formula_code`: TEXT (Kode formulasi acuan untuk repeat order)


* `last_order_completed_at`: INTEGER (Timestamp order pertama tuntas)


* `estimated_depletion_at`: INTEGER (Estimasi waktu habis stok klien untuk jadwal follow up)
* `pipeline_status`: TEXT (`RETENTION_NURTURING`, `REPEAT_ORDER_PROPOSAL`, `IN_REPEAT_PRODUCTION`, `INACTIVE`)


* `version`: INTEGER (Default: 1)

---

## 7. Edge Case & Failure State (Tahap 3)

### 1. Supplier PO Terlambat Mengirim Bahan Baku Masuk

* **Kondisi:** Vendor bahan baku yang dipesan oleh PPIC mengalami keterlambatan kirim melampaui tanggal estimasi kedatangan PO.


* **Penanganan:** PPIC menekan tombol *"Report PO Delay"*, memasukkan alasan keterlambatan dan tanggal janji baru supplier. Status batch memicu peringatan merah di dasbor SPV Produksi. SPV wajib membuka form penjadwalan manual untuk memundurkan jadwal lantai pabrik, yang secara otomatis menerbitkan notifikasi penyesuaian jadwal ke CS untuk disampaikan ke klien secara proaktif.



### 2. Klien Menolak Membayar Pelunasan Setelah Barang Selesai Packing

* **Kondisi:** Produk telah selesai dikemas di master carton, namun klien tidak dapat dihubungi atau enggan melunasi sisa tagihan produksi dan ongkir.


* **Penanganan:** Barang otomatis berstatus `HELD_IN_FACTORY_STORAGE`. Sistem logistik terkunci rapat sehingga staf gudang dilarang menerbitkan Surat Jalan atau menyerahkan barang ke kurir kargo. Sistem menghitung biaya sewa/penitipan gudang harian jika status tertahan melampaui 14 hari kalender kerja.



### 3. Komplain Produk Rusak Akibat Kelalaian Ekspedisi Pihak Ketiga

* **Kondisi:** Klien menolak barang karena karton penyok dan botol pecah akibat dibanting selama perjalanan kargo.


* **Penanganan:** Tim QC memverifikasi sampel pertinggal lab dalam kondisi utuh dan memeriksa foto bukti serah terima surat jalan ke kurir sebelum berangkat. QC menandai tiket `fault_type = 'RECIPIENT_FAULT'` dan memilih status `REJECT_RETURN`. Sistem otomatis mengenerate berkas *Berita Acara Kondisi Pengiriman Keluar* untuk membantu CS memandu klien mengajukan klaim ganti rugi asuransi ke perusahaan ekspedisi luar.



### 4. Klien Lama yang Sudah Diserahkan ke CRM Menghubungi CS Semula

* **Kondisi:** Klien yang sudah berstatus `EXISTING_CLIENT` melakukan chat ke nomor CS pertama untuk memesan repeat order 5.000 pcs.


* **Penanganan:** Saat CS mencoba membuat tiket order baru dengan `kode_klien` tersebut, form sistem CS menampilkan blokade modal: *"Klien ini berada dalam kelolaan Divisi CRM (PIC: [Nama CRM]). Tiket Repeat Order hanya dapat dibuat oleh CRM."* Sistem menyediakan tombol satu-klik *"Forward Notification to CRM"* untuk meneruskan percakapan ke grup Telegram CRM tanpa melanggar pembagian tugas.



---

## 8. Success Metrics (Tahap 3)

| Metrik | Definisi | Target Tahap 3 |
| --- | --- | --- |
| **Material Shortage Reaction Time** | Kecepatan SPV menjadwalkan ulang lini produksi sejak PPIC menginput PO bahan kosong.

 | **$\le 4$ jam kerja** pasca input PO. |
| **Production Schedule Predictability** | Ketepatan jadwal selesai packing terhadap jadwal manual yang diinput SPV Produksi.

 | **$\ge 90\%$ akurasi jadwal**. |
| **Zero Unpaid Delivery Incident** | Barang keluar dari pabrik atau diambil ekspedisi sebelum invoice pelunasan diverifikasi Finance.

 | **0 insiden** ($100\%$ patuh gerbang pelunasan). |
| **QC Claim Resolution SLA** | Durasi investigasi klaim komplain produk hingga keputusan sah (*Internal* vs *Recipient Fault*).

 | **$\le 48$ jam kerja**. |
| **Repeat Order Handover Rate** | Klien order pertama yang berhasil ditransfer kepemilikan datanya ke akun CRM secara otomatis.

 | **100% transisi sukses**. |

---

## 9. Sprint Execution Plan (Slicing Tahap 3)

```
Siklus Pengerjaan Sprint Tahap 3:

[TASK-14] PPIC Inventory Checker & PO Management Module
          - Form pengecekan bahan: Tersedia vs Tidak Tersedia[cite: 1].
          - Perekaman nomor Purchase Order (po_reference_no) & supplier[cite: 1].
          - Trigger konfirmasi bahan baku ready ke antrian lantai pabrik[cite: 1].

[TASK-15] SPV Produksi Manual Rescheduling Workbench
          - Form input jadwal manual lantai pabrik (Penimbangan, Mixing, Filling, Packing)[cite: 1].
          - Logika kalkulasi estimasi tanggal selesai order CS berbasis input SPV[cite: 1].
          - Notifikasi Telegram alert otomatis ke Grup CS jika terjadi pergeseran jadwal[cite: 1].

[TASK-16] 4-Stage Production Tracking Floor Module
          - UI Checklist sekuensial: Penimbangan -> Mixing -> Filling -> Packing[cite: 1].
          - State locking: Tahap berikutnya terkunci sebelum tahap sebelumnya rampung[cite: 1].
          - Trigger "Konfirmasi Selesai" -> Permintaan invoice pelunasan ke Finance[cite: 1].

[TASK-17] Final Settlement Clearance & Logistics Dispatcher
          - Gate pelunasan: Blokir pengiriman jika is_settlement_cleared == 0[cite: 1].
          - Template generator Surat Jalan PDF & SOP Penyimpanan resmi[cite: 1].
          - Form pemilihan saluran pengiriman: Armada Internal vs Ekspedisi Rekanan[cite: 1].
          - Alur input resi pengiriman: SPV Produksi -> CS -> Klien[cite: 1].

[TASK-18] QC Claim Inspection & Return Engine
          - Tombol respon penerimaan klien: ACC Produk (Ya/Tidak)[cite: 1].
          - Workbench investigasi QC: Pengecekan sampel pertinggal lab vs foto bukti komplain.
          - Percabangan klaim: Internal Fault (Otorisasi Retur) vs Recipient Fault (Tolak Retur)[cite: 1].

[TASK-19] CS-to-CRM Handover & Repeat Order Engine
          - Listener event: Order Pertama ACC -> Ubah status ke EXISTING_CLIENT[cite: 1].
          - Alokasi akun klien otomatis ke antrian CRM (assigned_crm_id)[cite: 1].
          - Kunci hak akses CS (Read-Only) & buka pipeline Repeat Order di meja kerja CRM[cite: 1].

```

---

Seluruh spesifikasi dari **Tahap 1 (CS/CRM & Core Local-First Engine)**, **Tahap 2 (RnD, Costing, Desain, & Strict Legal Gate)**, hingga **Tahap 3 (PPIC, Lantai Pabrik, Pelunasan, Logistik, QC Claims, & CRM Handover)** telah lengkap, sinkron, dan siap dijadikan acuan langsung bagi tim engineering untuk mulai mengimplementasikan *database migration* serta *UI slicing*.