# PRD MaklonOS: Sistem Operasi Maklon Terpadu

| | |
| :-- | :-- |
| Versi | 3.1 (gabungan, menggantikan `prd-1.md`, `prd-2.md`, `prd-3.md` sebagai acuan) |
| Tanggal | 2026-09-25 |
| Pemilik produk | Kemal Office Studio (KOS) |
| Sumber | `prd-1.md`, `prd-2.md`, `prd-3.md`, `Alur Maklon.pdf` (alur asli), arah desain `DESIGN.md`, mockup `design/mockups/SCR-*.html` |
| Basis kode | Template 2-tier di repo ini (Web Next.js, Desktop & Android Tauri v2, LibSQL/Turso) |
| Status | Siap untuk sprint MVP. Tidak ada OQ yang memblok MVP; label **[blok v2]**, **[blok v3]**, **[blok rilis]** menandai tenggat jawabannya. |

**Aturan urutan sumber:** bila `Alur Maklon.pdf` dan PRD lama berbeda, PDF menang, karena PDF adalah proses yang berjalan hari ini. Semua perbedaan dicatat di Lampiran B.

## 0. Keputusan yang sudah dikunci

| ID | Keputusan | Asal |
| :-- | :-- | :-- |
| D-01 | MVP = Tahap 1. Langkah milik divisi Tahap 2/3 hanya muncul sebagai status, tanpa layar kerja divisi itu. CS mencatat langkah itu secara manual (D-23). | klarifikasi 1 |
| D-02 | Produk komersial. Satu pemasangan = satu perusahaan = satu database = satu lisensi LIS1 (`kos-maklonos`). Bukan SaaS multi-tenant. Semua angka bisnis yang bisa berbeda antar perusahaan disetel dari aplikasi. | klarifikasi 2 |
| D-03 | Offline wajib. Pengguna tetap bekerja saat internet putus; konflik diselesaikan saat perangkat online lagi. | klarifikasi 3 |
| D-04 | Mengikuti fondasi template: `master_operator`, `app_role` (RBAC dinamis), `app_session`, `setting_gex_system`, `base_revision` untuk konflik, uang `INTEGER` rupiah, tanpa worker latar. | klarifikasi 4 |
| D-05 | Selesai = Tahap 1-3 berjalan di Web, Desktop, Android dengan seluruh fitur; migrasi Google Sheets tersedia saat peluncuran dan boleh dilewati per perusahaan. Target 3 bulan. | klarifikasi 5 |
| D-06 | Kode klien memuat kode perangkat: `KLN-YYYYMMDD-<KP><NN>`. | OQ-01 |
| D-07 | Data karantina: pemilik akun yang login ulang di perangkat itu memilih *Kirim* atau *Buang*; *Buang* butuh izin `sync.retry`. | OQ-02 |
| D-08 | Web di-deploy per perusahaan untuk tautan approval klien. Bila server tidak bisa dijangkau, ada jalur manual lewat pesan berformat (FR-18 v2). | OQ-03 |
| D-09 | Klien berubah dari `LEAD` ke `FIRST_ORDER_ACTIVE` saat tiket sampel pertama dibuat. Segmentasi Hot/Warm/Cold hanya untuk `LEAD`. | OQ-04 |
| D-10 | Revisi di luar kuota berhenti di status tunggu Finance selama MVP. | OQ-05 |
| D-11 | Satu daftar status tiket sampel untuk semua fase (FR-06), sekarang disusun mengikuti urutan PDF. | OQ-06 |
| D-12 | Biaya sampel awal diatur per perusahaan: selalu gratis, selalu berbayar, atau dipilih per tiket. | OQ-07 |
| D-13 | Media lokal tidak dihapus otomatis. | OQ-08 |
| D-14 | Baris impor tanpa tanggal interaksi dianggap Cold (tanggal = 8 hari sebelum impor), ditandai di pratinjau. | OQ-09 |
| D-15 | Kategori produk, saluran lead, dan daftar pilihan lain didaftarkan perusahaan di menu **Master Data**; form hanya menampilkan yang terdaftar. | OQ-10 |
| D-16 | Harga satuan final dibulatkan ke atas ke rupiah penuh. | OQ-11 |
| D-17 | Jumlah perangkat ditentukan lisensi LIS1 saat diterbitkan; aplikasi tidak punya batas pengguna tetap. | OQ-12 |
| D-18 | Batas penolakan dummy disetel per perusahaan. | OQ-13 |
| D-19 | Masa bebas penitipan gudang 14 hari kalender; tarifnya disetel per perusahaan. | OQ-14 |
| D-20 | Target metrik baru ditetapkan setelah 4 minggu pemakaian pertama. | OQ-15 |
| D-21 | Mockup di `design/mockups/`: MVP = SCR-01, 02, 03, 07; v2 = SCR-08, 09, 11; v3 = SCR-15 (dua versi), 16, 17, 18. Arah desain di `DESIGN.md`. | OQ-16 |
| D-22 | Pilot: Kemal Office Studio (KOS). Catatan di OQ-26. | OQ-17 |
| D-23 | Di MVP, CS mencatat hasil langkah RnD dan Finance secara manual (FR-06.6). | OQ-18 |
| D-24 | Cold dihitung dari respons terakhir klien (`last_client_response_at`), sesuai PDF. | OQ-19 |
| D-26 | Antarmuka berbahasa Inggris. Teks pesan yang dikutip di PRD ini ditulis dalam bahasa Indonesia sebagai makna; teks final di aplikasi berbahasa Inggris. Halaman bawaan template dan pesan error dari Rust yang masih berbahasa Indonesia ikut diterjemahkan (F-13). | D-25 | CS memegang klien sampai order pertama `ORDER_COMPLETED`, lalu diserahkan ke CRM (versi `prd-3`). Kolom PIC CRM di tiket sampel hanya informasi. | OQ-20 |

---

## 1. Problem Statement

Perusahaan maklon (jasa produksi kosmetik/pangan untuk brand milik klien) menjalankan seluruh siklus order di belasan Google Sheets dan Google Forms. `Alur Maklon.pdf` menunjukkan kondisinya: satu sheet database per PIC CS (10 sheet), lalu data yang sama disalin ke Sheet Database Klien (43 kolom), Sheet Cold Client, Sheet Database CRM, Sheet Data Sampel CRM, Sheet Antrian Sampel RnD, Sheet Antrian Hitung Formulasi, Sheet Antrian Desain, Sheet Data Uang Masuk, Form Input Sampel, dan Form Antrian MoU. Satu klien diketik ulang di banyak tempat, tidak ada yang memaksa urutan proses, dan semuanya berhenti saat internet mati.

| Siapa yang dirugikan | Kerugiannya | Penyebab |
| :-- | :-- | :-- |
| **CS** | Lead yang tidak direspons lebih dari 7 hari hilang. Data klien diketik ulang di sheet PIC, database klien, form sampel, dan sheet CRM. | Umur respons tidak dilacak otomatis; tidak ada satu profil klien. |
| **CRM** | Klien lama pindah ke maklon lain; riwayat formula sulit dicari. | Batas CS ↔ CRM tidak ditegakkan sistem; riwayat tersebar di sheet salinan. |
| **RnD** | Bahan lab habis untuk revisi yang tidak ditagih; spesifikasi sampel datang tidak seragam. | Kuota revisi tidak ditegakkan; form sampel tidak terhubung ke antrian lab. |
| **Finance** | Mencocokkan uang masuk dengan tagihan lama; HPP dihitung manual kira-kira 30 menit per produk (angka `prd-2`). | Bukti transfer tidak terikat ke tagihan; rumus harga di sheet lepas. |
| **Legal** | Biaya uji SIG/BPOM/Halal keluar untuk order yang kemudian batal. | Pendaftaran bisa dimulai sebelum DP terverifikasi. |
| **PPIC & SPV Produksi** | Jadwal pabrik berantakan saat bahan kosong; SPV disalahkan. | PO bahan tidak terhubung ke jadwal batch. |
| **Pemilik usaha** | Barang bisa keluar sebelum lunas; komplain diselesaikan dengan debat; tidak ada angka SLA. | Tidak ada gerbang pelunasan, tiket QC, atau jejak audit. |
| **Klien maklon** | Persetujuan sampel, desain, MoU lewat chat tanpa batas waktu. | Tidak ada kanal persetujuan resmi. |

Pengali untuk semua baris: internet di banyak perusahaan Indonesia tidak stabil (D-03).

---

## 2. Target User & Persona

### 2.1 Pembeli

Perusahaan maklon di Indonesia yang masih bekerja dengan spreadsheet dan punya divisi terpisah (CS, CRM, RnD, Finance, Desain, Legal, PPIC, Produksi). Yang membeli lisensi adalah pemilik usaha atau manajemen. Contoh skala dari PDF: 10 PIC CS dalam satu perusahaan.

### 2.2 Pengguna internal (satu role RBAC per baris)

| Role | Fase pertama kali memakai layar sendiri | Perangkat utama |
| :-- | :-- | :-- |
| CS | MVP | Laptop (Desktop) + Android |
| CRM | MVP (antrian Cold); v3 (serah terima + repeat order) | Laptop |
| RnD | v2 | PC lab + tablet Android, sering offline |
| Desain Grafis | v2 | PC |
| Finance | v2 | PC |
| Legal | v2 | PC |
| PPIC | v3 | PC |
| SPV Produksi | v3 | PC pabrik + tablet Android |
| QC | v3 | PC lab |
| Logistik | v3 | PC / Android |
| Admin perusahaan | MVP | PC |

Klien maklon bukan pengguna. Mereka hanya membuka tautan persetujuan sekali pakai (v2).

### 2.3 Persona

**Rina, CS penanganan lead dan order pertama**

- Tugas: menerima lead dari Ads, Instagram, dan Web; follow up dan mengirim materi; mengarahkan klien ke sampel; mengawal order pertama sampai barang diterima.
- Perangkat: laptop kantor, dan Android saat di luar kantor.
- Masalah hari ini: memegang satu sheet sendiri, lalu menyalin klien yang sama ke sheet database dan form sampel. Lupa follow up lead yang diam lebih dari 7 hari. Khawatir akunnya dipakai bersamaan di perangkat lain.
- Yang ia butuhkan dari MVP: satu form intake, segmentasi otomatis, antrian Cold, tiket sampel yang langsung terlihat divisi lain, peringatan kuota revisi.
- Ukuran berhasil baginya: tidak membuka sheet PIC-nya sama sekali selama satu hari kerja.

**Bayu, SPV Produksi pabrik**

- Tugas: menjadwalkan penimbangan, mixing, filling, packing; menerima konfirmasi bahan dari PPIC; meneruskan resi ekspedisi ke CS.
- Perangkat: PC kantor pabrik dan tablet Android. Sinyal di lantai pabrik sering hilang.
- Masalah hari ini: saat bahan kosong, jadwal berantakan dan CS memberi janji yang salah ke klien.
- Yang ia butuhkan (v3): form geser jadwal manual yang langsung terlihat CS, checklist tahap produksi yang bisa diisi offline.
- Ukuran berhasil baginya: CS berhenti menanyakan status batch lewat chat.

---

## 3. Goals & Non-Goals

### Goals

| ID | Goal | Fase |
| :-- | :-- | :-- |
| G-1 | Menggantikan seluruh sheet dan form di `Alur Maklon.pdf` dengan satu database. Satu klien diketik sekali. | MVP → v3 |
| G-2 | Bisa dipakai penuh saat offline di Web, Desktop, Android; tersinkron dua arah saat online. | MVP |
| G-3 | Satu akun = satu sesi aktif, tanpa kehilangan data yang dibuat offline. | MVP |
| G-4 | Urutan proses ditegakkan sistem: kuota revisi (MVP), bayar sampel sebelum RnD membuat (v2), dummy (v2), DP sebelum legal (v2), lunas sebelum kirim (v3), investigasi QC (v3). | MVP → v3 |
| G-5 | Batas tegas CS ↔ CRM: CS sampai order pertama `ORDER_COMPLETED`, lalu CRM (D-25). | v3 |
| G-6 | Divisi tahu kejadian penting lewat grup Telegram tanpa membuka aplikasi. | MVP |
| G-7 | Perusahaan baru bisa mulai dengan data sheet lamanya, atau mulai kosong. | MVP → v3 |
| G-8 | Aturan bisnis yang berbeda antar perusahaan (biaya sampel, kuota revisi, batas dummy, tarif titip, master data) disetel tanpa build ulang. | MVP → v3 |

### Non-Goals

- Portal login untuk klien. Klien hanya memakai tautan sekali pakai atau jalur manual.
- Integrasi mutasi bank. Finance memeriksa mutasi secara manual.
- Akuntansi penuh (buku besar, penyusutan, penggajian).
- Integrasi API ke BPOM, SIG, LPPOM MUI/BPJPH, DJKI. Nomor dokumen diketik manual.
- Sensor IoT mesin pabrik. Tahap produksi diisi manual.
- GPS armada. Pengiriman dilacak lewat status dan resi.
- SaaS multi-tenant (D-02).
- Penjadwalan produksi otomatis. Tanggal digeser manual oleh SPV.

---

## 4. User Stories

ID mempertahankan nomor PRD lama; ID baru mulai US-27.

### MVP

- **US-01** Sebagai CS, saya ingin mendaftarkan lead baru dengan data lengkap, supaya sistem menerbitkan `kode_klien` unik dan menolak nomor WhatsApp yang sudah terdaftar.
- **US-02** Sebagai CS/CRM, saya ingin lead yang tidak merespons lebih dari 7 hari masuk antrian Cold, supaya saya bisa menjalankan re-aktivasi berkala.
- **US-03** Sebagai CS, saya ingin sistem memeriksa kuota revisi gratis saat saya mencatat permintaan revisi klien, supaya revisi di luar kuota diarahkan ke Finance dan tidak saya janjikan gratis.
- **US-04** Sebagai staf, saya ingin sesi lama saya berakhir saat akun saya login di perangkat lain, supaya tidak ada dua orang menginput atas nama saya.
- **US-27** Sebagai CS, saya ingin mencatat setiap follow up, kiriman materi, dan respons klien, supaya jumlah FU dan umur respons terhitung tanpa sheet per PIC.
- **US-28** Sebagai staf yang bekerja offline, saya ingin data yang saya buat tidak hilang meskipun sesi saya tersusul saat online, supaya pekerjaan tidak perlu diulang.
- **US-29** Sebagai Admin, saya ingin mengimpor sheet database CS per PIC dan Sheet Database Klien dari CSV dengan pratinjau kesalahan, supaya tim langsung memakai aplikasi tanpa mengetik ulang.
- **US-30** Sebagai Admin, saya ingin mendaftarkan kategori produk dan saluran lead di Master Data, supaya form hanya menampilkan pilihan milik perusahaan saya.
- **US-31** Sebagai Admin, saya ingin menyetel mode biaya sampel, kuota revisi bawaan, dan chat ID Telegram per divisi, supaya aturan perusahaan saya berlaku tanpa build ulang.
- **US-32** Sebagai Admin, saya ingin melihat dan mengakhiri sesi aktif setiap operator, supaya perangkat hilang atau karyawan keluar bisa diputus hari itu juga.
- **US-33** Sebagai pemilik usaha, saya ingin setiap perubahan klien, lead, dan tiket sampel tercatat dengan pelaku dan waktunya, supaya sengketa internal diselesaikan dengan data.
- **US-34** Sebagai CS, saya ingin membuat tiket sampel dengan seluruh isi Form Input Sampel yang sekarang, supaya RnD menerima spesifikasi yang sama tanpa Google Form.

### v2

- **US-05** Sebagai RnD, saya ingin mencatat hasil kelayakan dan formula saat lab offline, supaya pekerjaan tidak bergantung sinyal.
- **US-12** Sebagai RnD, saya ingin mengklasifikasikan tiket New/Existing, meriset atau mengonfirmasi ke Produksi, lalu memutuskan Acc/Tolak beserta lead time sampel, supaya CS bisa menyampaikan lead time ke klien sebelum klien membayar.
- **US-13** Sebagai RnD, saya ingin mencatat `formula_code`, product knowledge, dan catatan RnD, supaya Finance menghitung harga dari data yang sama.
- **US-06 / US-14** Sebagai Finance, saya ingin mengisi HPP bahan, kemasan, operasional, dan margin, supaya harga satuan terhitung tanpa salah rumus dan bisa dikirim bersama sampel.
- **US-15** Sebagai Finance, saya ingin diberi tahu setiap revisi berbayar, supaya saya menetapkan tarifnya sebelum CS menagih.
- **US-35** Sebagai Finance, saya ingin mencatat uang masuk (tanggal, nominal, keterangan) lalu mengunggah bukti transfer dan memverifikasinya ke tagihan, supaya Sheet Data Uang Masuk tidak dipakai lagi.
- **US-36** Sebagai Finance, saya ingin invoice PDF bernomor unik terbit dari tagihan, supaya CS bisa mengirimkannya ke klien tanpa membuat manual.
- **US-16** Sebagai Desainer, saya ingin menerima brief kemasan dari tiket sampel untuk membuat mockup, supaya mockup siap dikirim bersama sampel.
- **US-17** Sebagai Desainer, saya ingin mencetak dummy hanya setelah pembayarannya diverifikasi, supaya biaya cetak tidak menjadi kerugian internal.
- **US-07 / US-18** Sebagai Legal, saya ingin form pendaftaran BPOM/Halal/HKI terkunci sebelum DP terverifikasi, supaya perusahaan tidak menanggung biaya registrasi order yang bisa batal.
- **US-37** Sebagai RnD, saya ingin mencatat pengajuan uji gizi SIG per jenis produk setelah DP terverifikasi, supaya Legal bisa lanjut ke BPOM.
- **US-08 / US-19** Sebagai klien, saya ingin menyetujui atau menolak sampel, dummy, atau MoU lewat tautan sekali pakai, supaya saya tidak perlu membuat akun.
- **US-38** Sebagai CS, saya ingin mengirim pesan persetujuan berformat ke klien saat tautan tidak bisa dipakai, lalu mencatat balasannya beserta tangkapan layar, supaya persetujuan tetap tercatat saat server mati.

### v3

- **US-20** Sebagai PPIC, saya ingin mencatat ketersediaan bahan dan nomor PO bila kosong, supaya pabrik tahu alasan keterlambatan secara resmi.
- **US-09 / US-21** Sebagai SPV, saya ingin menggeser tanggal penimbangan, mixing, filling, packing secara manual saat bahan terlambat, supaya estimasi yang dilihat CS tetap realistis.
- **US-22** Sebagai SPV, saya ingin menandai packing selesai, supaya CS diberi tahu dan meminta invoice pelunasan ke Finance.
- **US-23** Sebagai Finance, saya ingin pengiriman terkunci sampai pelunasan terverifikasi, supaya barang tidak keluar sebelum lunas.
- **US-24** Sebagai SPV/Logistik, saya ingin mencatat metode kirim, resi atau identitas armada, surat jalan, dan SOP penyimpanan, supaya CS meneruskannya ke klien.
- **US-10 / US-25** Sebagai QC, saya ingin menginvestigasi komplain dan memutuskan Internal Fault atau Recipient Fault, supaya retur hanya disetujui jika kesalahan ada di pabrik.
- **US-11 / US-26** Sebagai CRM, saya ingin klien yang order pertamanya `ORDER_COMPLETED` masuk antrian saya, supaya repeat order tidak tumpang tindih dengan CS.

---

## 5. Daftar Fitur

`(template)` = sudah ada di template, hanya disetel. **Layar** merujuk mockup (D-21); "tanpa mockup" = perlu desain dulu (OQ-16b).

### MVP (Tahap 1)

| ID | Fitur | Layar |
| :-- | :-- | :-- |
| F-01 | Fondasi: provisioning, login online/offline, 2FA, lupa password, lisensi, sync, cadangan, identitas perusahaan `(template)` | yang sudah ada |
| F-02 | Role divisi + katalog izin domain | Pengaturan › Role `(template)` |
| F-03 | Sesi tunggal tahan offline + karantina | SCR-07 |
| F-04 | Intake lead & registrasi klien | SCR-02 |
| F-05 | Interaksi lead + segmentasi + antrian Cold | SCR-01, SCR-02 |
| F-06 | Tiket sampel + kuota revisi | SCR-03 |
| F-07 | Kompresi gambar WebP ≤ 300 KB | SCR-03 |
| F-08 | Notifikasi Telegram per divisi | Pengaturan (tanpa mockup) |
| F-09 | Impor CSV sheet CS per PIC & Database Klien | tanpa mockup |
| F-10 | Log audit + daftar sesi aktif | SCR-07 |
| F-11 | Pengaturan bisnis per perusahaan | Pengaturan (tanpa mockup) |
| F-12 | Master Data (kategori produk, saluran lead) | tanpa mockup |
| F-13 | Hapus domain contoh template; terjemahkan halaman template dan pesan error Rust ke bahasa Inggris (D-26) | n/a |

### v2 (Tahap 2)

| ID | Fitur | Layar |
| :-- | :-- | :-- |
| F-14 | RnD: antrian, klasifikasi New/Existing, konfirmasi Produksi, Acc/Tolak, lead time sampel, pembuatan sampel, `formula_code`, product knowledge | SCR-08 |
| F-15 | Tarif revisi kustom oleh Finance | SCR-09 |
| F-16 | Kalkulator HPP + margin (harga dikirim bersama sampel) | SCR-09 |
| F-17 | Uang masuk, verifikasi pembayaran, invoice PDF (Sampel, Revisi, Dummy, Uji, DP Produksi & Legal) | tanpa mockup |
| F-18 | Tautan approval klien sekali pakai + jalur manual berformat | SCR-11 |
| F-19 | Desain: mockup, dummy, gerbang dummy, batas penolakan | tanpa mockup |
| F-20 | MoU + lead time produksi + gerbang DP + percabangan White Label / Dengan BPOM | SCR-11 |
| F-21 | Dokumen legal: SIG (oleh RnD), BPOM MD/NA, Halal Bahan / Halal Produk, HKI (oleh Legal) | tanpa mockup |
| F-22 | Impor CSV Database Formulasi, Data Uang Masuk, Database Desain | tanpa mockup |

### v3 (Tahap 3)

| ID | Fitur | Layar |
| :-- | :-- | :-- |
| F-23 | PPIC: cek bahan, PO, laporan PO terlambat, konfirmasi bahan ready | SCR-15 |
| F-24 | Jadwal ulang manual SPV | SCR-15 |
| F-25 | 4 tahap lantai produksi, berurutan dan terkunci | SCR-16 |
| F-26 | Invoice pelunasan + gerbang lunas sebelum kirim | SCR-17 |
| F-27 | Pengiriman: ekspedisi vs armada internal, resi berjenjang, Surat Jalan & SOP Penyimpanan PDF | SCR-17 |
| F-28 | Konfirmasi penerimaan klien + investigasi QC + keputusan retur | SCR-18 |
| F-29 | Serah terima CS → CRM (CS jadi baca-saja) | SCR-18 |
| F-30 | Pipeline repeat order CRM | SCR-18 |
| F-31 | Barang tertahan di gudang + biaya titip | SCR-17 |
| F-32 | Impor CSV riwayat batch & pengiriman | tanpa mockup |

### Nanti (belum dijadwalkan)

| ID | Fitur | Sumber |
| :-- | :-- | :-- |
| F-40 | Dashboard BI eksekutif | `prd-3.md` |
| F-41 | Otomasi OEE pabrik | `prd-3.md` |
| F-42 | Deteksi anomali akses & karantina IP | mockup SCR-07 |
| F-43 | Gabung otomatis klien duplikat | E-04 |
| F-44 | Ambang Hot/Warm/Cold per perusahaan | turunan D-02 |
| F-45 | Isi mockup v3 di luar PRD: vault sampel pertinggal, prediksi sell-through dari GMV marketplace, utilisasi kettle, tanda tangan digital Peruri, CAPA | mockup SCR-15-18 (OQ-32) |
| F-46 | Mode gelap dengan tombol ganti tema | keputusan 2026-09-25: terang saja dulu |

---

## 6. Functional Requirements: MVP

Setiap FR selesai hanya bila semua **Kriteria terima** lolos di Web, Desktop, dan Android.

### FR-01 Fondasi platform (F-01)

1. Login, 2FA, lupa password, lisensi, sync, cadangan, identitas perusahaan dipakai apa adanya dari template.
2. `LICENSE_PRODUCT` = `kos-maklonos`; keypair diterbitkan dengan alat `E:\Freelance\lisensi` sebelum rilis pertama. Jumlah perangkat per perusahaan ditentukan di lisensi (D-17).
3. `landingPath`: Workspace CS (SCR-01) bila punya `leads.view`, lalu fallback bawaan template.

**Kriteria terima:** `bun run check` lulus; perangkat tanpa lisensi valid hanya bisa membaca.

### FR-02 Role & izin (F-02)

1. Role bawaan di-seed saat provisioning dan bisa diubah Admin: `CS`, `CRM`, `RnD`, `Finance`, `Desain`, `Legal`, `PPIC`, `SPV Produksi`, `QC`, `Logistik`. Role sistem template tetap.
2. Izin MVP:

| Izin | Isi | Paket bawaan |
| :-- | :-- | :-- |
| `clients.view` | lihat klien | CS, CRM, Admin |
| `clients.manage` | buat/ubah klien | CS, Admin |
| `clients.delete` | hapus klien tanpa riwayat | sensitif, tidak ikut Admin |
| `leads.view` | lihat lead + antrian Cold | CS, CRM, Admin |
| `leads.manage` | buat lead, catat interaksi pada lead milik sendiri | CS, Admin |
| `leads.reassign` | pindahkan lead ke PIC CS lain | Admin |
| `samples.view` | lihat tiket sampel | CS, CRM, RnD, Finance, Desain, Admin |
| `samples.manage` | buat tiket, catat keputusan klien | CS, Admin |
| `master_data.manage` | kelola Master Data | Admin |
| `sessions.manage` | lihat & akhiri sesi operator lain | Admin |
| `audit.view` | lihat log audit domain | Admin |
| `data_import.run` | jalankan impor CSV | sensitif, tidak ikut Admin |

3. Siapa boleh melihat dan mengubah lead milik PIC lain: OQ-34. Sampai dijawab: lihat semua, ubah hanya milik sendiri.

**Kriteria terima:** setiap command Tauri baru memanggil `require_permission`; `audit:contract` dan `audit:page-guard` lulus.

### FR-03 Sesi tunggal tahan offline (F-03)

Aturan inti: **login online terakhir menang.** Login offline tidak pernah mengusir perangkat lain.

1. Login online berhasil → buat `app_session` baru dan cabut sesi lain milik operator yang sama (`revoked_reason = 'SUPERSEDED'`) dalam satu transaksi cloud.
2. Pemeriksaan berjalan di setiap siklus `AutoSyncRunner` (12/30/90 detik) dan sebelum setiap push. Tidak ada loop terpisah (aturan 30).
3. Sesi **tersusul** bila dicabut, atau cloud memiliki sesi operator yang sama yang dibuat setelah kontak online terakhir perangkat ini.
4. Saat tersusul: modal tak-tertutup *"Akun Anda dipakai login di perangkat lain. Data yang belum terkirim disimpan dan menunggu keputusan Anda."*, lalu keluar ke layar login. Entri outbox yang belum terkirim ditandai `quarantined` beserta `session_id`, tidak didorong, tidak dihapus. Berkas SQLite lokal tidak disentuh.
5. Karantina (D-07): setelah pemilik akun login ulang di perangkat itu, ia melihat daftar entri karantina dan memilih *Kirim* (didorong seperti biasa, konflik ditangani `base_revision`) atau *Buang* (butuh `sync.retry`, tercatat di audit).
6. Login offline memakai snapshot kredensial template; akun ber-2FA tidak bisa login offline (perilaku template).

**Kriteria terima:** login online di B mencabut sesi A dalam satu siklus sync A; A yang offline selama B login tidak mencabut B saat online; jumlah entri outbox tidak berkurang setelah skenario tersusul sampai pemilik memilih.

### FR-04 Intake lead & registrasi klien (F-04)

1. Field (dari sheet database CS per PIC di PDF):

| Field | Wajib | Sumber pilihan |
| :-- | :-- | :-- |
| Nama klien | ya | |
| Nomor WhatsApp | ya | |
| Alamat, Kota/Kabupaten, Provinsi | tidak | |
| Saluran lead (Kode Asal Lead) | ya | Master Data `LEAD_CHANNEL` |
| Kategori produk | ya | Master Data `PRODUCT_CATEGORY` |
| Kebutuhan | tidak | |
| PIC CS | otomatis | operator yang login |
| Waktu input (Timelapse Input Data Lead) | otomatis | |

2. Nomor WhatsApp dinormalisasi ke `62xxxxxxxxxx` (hapus spasi, tanda hubung, `+`; awalan `0` → `62`) sebelum disimpan dan dibandingkan. Normalisasi identik di TS dan Rust, diuji vektor yang sama.
3. Nomor unik per database. Duplikat yang terdeteksi lokal ditolak dengan pesan yang menyebut `kode_klien` pemiliknya.
4. Simpan = satu baris `clients` (`LEAD`) + satu baris `leads` + entri outbox + baris audit dalam satu transaksi lokal (aturan 3).
5. **Kode klien (D-06):** `KLN-YYYYMMDD-<KP><NN>`.
   - `YYYYMMDD` = tanggal perusahaan (zona waktu Pengaturan) saat dibuat.
   - `KP` = kode perangkat 2 karakter `[A-Z0-9]`, diterbitkan database satu kali saat perangkat pertama kali tersambung, disimpan device-local, unik per database.
   - `NN` = urutan per perangkat per tanggal, 2 karakter basis-36 (`01` … `ZZ`, 1.295 kode per perangkat per hari).
   - Kode tidak pernah berubah setelah dibuat.
   - Perangkat yang belum punya `KP` tidak bisa membuat klien dan menampilkan *"Sambungkan perangkat ke database sekali untuk mendapat kode perangkat."*
   - Kode dari impor dipertahankan apa adanya (OQ-25).

**Kriteria terima:** dua perangkat offline membuat klien di tanggal sama tanpa bentrok setelah sync; tidak ada dua klien dengan nomor ternormalisasi sama.

### FR-05 Interaksi lead & segmentasi (F-05)

1. CS mencatat interaksi: arah (`OUTBOUND` = follow up oleh CS, `INBOUND` = respons klien), jenis (Chat WA, Telepon, Kunjungan, Kirim Materi, Lainnya), catatan (wajib), waktu. Satu interaksi = satu baris `lead_interactions`, dan kolom ringkasan di `leads` diperbarui dalam transaksi yang sama:
   - `OUTBOUND` → `last_followup_at` = waktu interaksi, `total_followups` + 1 (kolom "Jumlah FU" di sheet).
   - `INBOUND` → `last_client_response_at` = waktu interaksi.
2. Lead baru: `last_client_response_at` = waktu input (lead masuk berarti klien menghubungi).
3. Segmen dihitung saat dibaca, tidak disimpan, tanpa worker latar. Acuan tanggalnya `last_client_response_at` (D-24, PDF: "Last Respon > 7 Days"). Follow up CS yang tidak dibalas klien tidak mengubah segmen. Aturan hari kalender:
   - `HOT` ≤ 3 hari
   - `WARM` 4-7 hari
   - `COLD` > 7 hari
4. Segmentasi hanya untuk klien `LEAD` (D-09). Tahap "Closing / Belum Closing" di PDF = ada tidaknya tiket sampel: klien dengan tiket sampel aktif sudah closing.
5. Bila semua tiket sampel klien berakhir `RND_REJECTED`, `CLIENT_REJECT`, atau `CANCELLED`, klien kembali ke `LEAD` dan segmentasi berjalan lagi.
6. Antrian Cold menggantikan Sheet Database Cold Client: lead `COLD` urut dari yang paling lama diam, filter per PIC CS.
7. "Hari ini" memakai zona waktu perusahaan (bawaan `Asia/Jakarta`). Saat offline memakai jam perangkat.

**Kriteria terima:** lead dengan acuan tanggal 8 hari lalu tampil di antrian Cold tanpa aksi; satu interaksi yang memperbarui acuan tanggal memindahkannya ke Hot.

### FR-06 Tiket sampel & kuota revisi (F-06)

1. **Field tiket** (Form Input Sampel + Detail Request Sampel di PDF):

| Field | Wajib | Catatan |
| :-- | :-- | :-- |
| Jenis sampel | tidak | Master Data `SAMPLE_KIND`; nilainya didaftarkan perusahaan (OQ-24) |
| Tipe formulasi | tidak | Master Data `FORMULATION_TYPE`; terpisah dari klasifikasi New/Existing yang ditetapkan RnD (OQ-24) |
| Jenis produk | ya | Master Data `PRODUCT_CATEGORY` |
| Jumlah sampel | ya | INTEGER |
| Merk produk | ya | |
| Penamaan BPOM produk | tidak | |
| Klaim produk | tidak | |
| Kemasan produk | ya | |
| Referensi produk | tidak | teks + foto (FR-07) |
| Budget klien | tidak | INTEGER rupiah |
| Request khusus: warna, tekstur, ukuran, aroma | tidak | |
| Estimasi kirim sampel ke klien (deadline) | ya | urutan antrian RnD |
| Alamat kirim sampel | ya | bawaan dari alamat klien, boleh diubah |
| Perlu dummy kemasan | ya | ya/tidak |
| Berbayar | otomatis/pilih | FR-06.3 |
| Bukti bayar sampel | tidak | foto (FR-07); diverifikasi Finance di v2 |
| PIC CRM | tidak | operator ber-role CRM; hanya informasi, tidak memberi hak ubah (D-25) |

2. Pembuatan tiket pertama mengubah klien `LEAD` → `FIRST_ORDER_ACTIVE` (D-09).
3. **Biaya sampel awal (D-12):** Pengaturan `sample_fee_mode`:
   - `FREE`: semua tiket gratis.
   - `PAID`: semua tiket berbayar.
   - `PER_REQUEST`: dipilih saat tiket dibuat. Siapa yang boleh memilih: OQ-28.
4. **Urutan status (mengikuti PDF, D-11):**

```
DRAFT
  └─ dikirim ke RnD ─► RND_REVIEW          RnD cek kebutuhan bahan, klasifikasi New/Existing,
                                            riset (New) atau konfirmasi ke Produksi (Existing)
        ├─ Tolak ─► RND_REJECTED           CS mengarahkan klien ke produk lain (tiket selesai)
        └─ Acc ──► RND_ACCEPTED            lead time sampel diisi RnD, CS menyampaikan ke klien
              ├─ berbayar ─► WAITING_SAMPLE_PAYMENT ─ lunas terverifikasi ─┐
              └─ gratis ───────────────────────────────────────────────────┴─► IN_RND
IN_RND ─► SAMPLE_READY                      formula_code, product knowledge, catatan RnD
SAMPLE_READY ─► SAMPLE_SENT                 CS kirim sampel + harga + mockup (OQ-31)
SAMPLE_SENT ─► CLIENT_ACC                   lanjut ke MoU (v2)
            ─► CLIENT_REVISE                gerbang kuota, butir 5
            ─► CLIENT_REJECT                (OQ-21)
Semua status sebelum CLIENT_ACC ─► CANCELLED
```

5. **Gerbang kuota revisi.** `free_revision_limit` disalin dari Pengaturan (bawaan 1) saat klien dibuat dan bisa diubah per klien oleh pemegang `clients.manage`. `revision_index` mulai 0. `CLIENT_REVISE` menaikkan `revision_index` satu, lalu:
   - `revision_index ≤ free_revision_limit` → `IN_RND`, `is_billable = 0`.
   - `revision_index > free_revision_limit` → `PENDING_FEE_ASSESSMENT` → (Finance menetapkan tarif, v2) → `WAITING_REVISION_PAYMENT` → (lunas) → `IN_RND`.
6. **Di MVP (D-01, D-10, D-23)** tidak ada layar RnD dan Finance. CS mencatat hasil yang ia terima dari divisi itu (keputusan RnD + lead time, pembayaran sampel diterima, sampel siap, sampel dikirim) sebagai perubahan status dengan catatan wajib. Setiap catatan tercatat di audit dengan `on_behalf_of_division`, tampil sebagai *"dicatat CS atas nama <divisi>"*. Mulai v2, hak mencatat atas nama RnD/Finance dicabut dari CS dan langkah itu hanya bisa dilakukan divisinya. `PENDING_FEE_ASSESSMENT` tetap berhenti di MVP (D-10).

**Kriteria terima:** dengan `free_revision_limit = 1`, revisi pertama → `IN_RND`, revisi kedua → `PENDING_FEE_ASSESSMENT`; transisi status yang tidak ada di diagram ditolak di TS dan Rust (tes vektor kembar).

### FR-07 Kompresi gambar (F-07)

1. Sebelum disimpan: WebP kualitas 75, sisi terpanjang ≤ 1280 px, dikerjakan di perangkat.
2. Hasil > 300 KB ditolak: *"Gambar masih lebih dari 300 KB setelah dikompresi. Potong bagian yang tidak perlu lalu unggah lagi."*
3. Gambar disimpan di `media_asset`, bukan di baris tiket, sehingga query daftar tidak membawa biner.
4. Tidak ada penghapusan otomatis (D-13).

**Kriteria terima:** foto 4000×3000 tersimpan ≤ 300 KB atau ditolak dengan pesan di atas; nol request jaringan selama kompresi.

### FR-08 Notifikasi Telegram (F-08)

1. Kejadian MVP:

| Kejadian | Grup |
| :-- | :-- |
| Lead baru | CS |
| Ringkasan harian lead yang baru menjadi Cold | CS |
| Tiket sampel masuk `RND_REVIEW` | RnD |
| Tiket masuk `WAITING_SAMPLE_PAYMENT` | Finance |
| Tiket masuk `PENDING_FEE_ASSESSMENT` | Finance |

2. Setiap kejadian ditulis ke `notification_outbox` dalam transaksi yang sama dengan mutasinya dan ikut sync. Kegagalan kirim tidak membatalkan mutasi.
3. Pengirim: perangkat atau server Web yang online lebih dulu mengklaim baris di cloud (`UPDATE ... SET claimed_at = datetime('now') WHERE id = ? AND claimed_at IS NULL`), lalu mengirim. Satu baris terkirim tepat sekali.
4. Gagal kirim: coba ulang dengan backoff, maksimal 5 kali, lalu `FAILED` dan tampil di Pengaturan › Notifikasi.
5. Pesan dari kejadian offline menampilkan waktu kejadian asli.
6. Token bot disimpan terenkripsi, cloud-only (pola `app_mail_config`), tidak pernah dikirim ke frontend. Token kosong saat menyimpan = pertahankan yang lama.
7. Ringkasan Cold dikirim sekali per tanggal perusahaan, diklaim dengan `dedupe_key = cold-digest:<YYYY-MM-DD>`.
8. Chat ID divisi kosong = kejadian untuk divisi itu tidak ditulis.

**Kriteria terima:** lead yang dibuat offline menghasilkan tepat satu pesan setelah perangkat online; internet putus saat kirim tidak menggagalkan penyimpanan lead.

### FR-09 Impor CSV (F-09)

1. Sumber: CSV hasil *File › Download › CSV* dari Google Sheets. Tidak memakai Google API.
2. Sheet yang diimpor di MVP:

| Sheet (PDF) | Menjadi |
| :-- | :-- |
| Sheet Database Customer Service per PIC (satu berkas per PIC) | `clients` + `leads`; PIC CS dipilih saat impor atau dibaca dari kolom "PIC Customer Service" |
| Sheet Database Klien (kolom 1-6: data lead dan progres klien) | `clients` + `leads` |

   Sheet salinan **tidak** diimpor, karena isinya duplikat data yang sama berdasarkan Kode Klien: Sheet Database Cold Client (sekarang dihitung, FR-05), Sheet Database CRM, Sheet Data Sampel CRM, Sheet Antrian Sampel RnD.
3. Pemetaan kolom:

| Kolom sheet | Field |
| :-- | :-- |
| Timelapse Input Data Lead | `leads.created_at` |
| Kode Asal Lead | saluran lead (dicocokkan ke Master Data; kode tak dikenal ditolak per baris) |
| PIC Customer Service | `leads.pic_cs_id` (dicocokkan ke nama/username operator) |
| Kode Klien | `clients.client_code` (dipertahankan, OQ-25) |
| Nama, Nomor, Alamat, Kota/Kabupaten, Provinsi | `clients.*` |
| Kebutuhan, Kategori Produk | `leads.needs_notes`, `leads.product_category` |
| Tanggal Terakhir Update | `leads.last_client_response_at` (D-24); kosong → D-14 |
| Jumlah FU | `leads.total_followups` |
| Jawaban PIC | satu baris `lead_interactions` jenis Lainnya (OQ-24) |
| Status Lead | tidak diimpor sebagai segmen, karena segmen dihitung (nilai kolom: OQ-24) |

4. Alur: pilih berkas → petakan kolom → pratinjau (jumlah valid, alasan gagal per baris) → konfirmasi → simpan.
5. Hanya menambah. Kode Klien atau nomor WhatsApp yang sudah ada dilewati dan dilaporkan, tidak menimpa.
6. Satu impor = satu transaksi lokal; gagal di tengah → nol baris tersimpan.
7. Setiap impor tercatat di audit (pelaku, nama berkas, jumlah ditambah/dilewati).
8. Impor bisa dilewati; aplikasi berfungsi penuh dengan database kosong.

**Kriteria terima:** CSV 1.000 baris dengan 10 baris rusak → pratinjau 990 valid + 10 alasan; konfirmasi menyimpan tepat 990; impor ulang berkas yang sama menambah 0 baris.

### FR-10 Log audit & sesi aktif (F-10)

1. Setiap mutasi `clients`, `leads`, `lead_interactions`, `sample_requests`, `master_option` menulis satu baris `domain_audit_log` dalam transaksi yang sama.
2. Log audit tidak bisa diubah atau dihapus dari aplikasi.
3. SCR-07 menampilkan log audit (filter entitas, pelaku, tanggal) dan sesi aktif per operator (perangkat, waktu login, terakhir terlihat).
4. Pemegang `sessions.manage` bisa mengakhiri sesi mana pun; efeknya sama dengan FR-03 butir 4.
5. Bagian mockup SCR-07 yang tidak ada di PRD (deteksi subnet, karantina IP, flush token) tidak dibangun (F-42).

**Kriteria terima:** satu perubahan lead menghasilkan tepat satu baris audit; mengakhiri sesi dari SCR-07 mengeluarkan perangkat target dalam satu siklus sync.

### FR-11 Pengaturan bisnis (F-11)

Disimpan di `setting_gex_system` (ikut sync), diubah pemegang `settings.manage`.

| Kunci | Bawaan | Fase |
| :-- | :-- | :-- |
| `company_timezone` | Asia/Jakarta | MVP |
| `default_free_revision_limit` | 1 | MVP |
| `sample_fee_mode` | `PER_REQUEST` | MVP |
| `telegram_chat_id_cs` / `_rnd` / `_finance` | kosong | MVP |
| `approval_token_ttl_days` | 3 | v2 |
| `dp_percentage_bp` | 5000 (50%) | v2 |
| `max_dummy_rejections` | 0 = tanpa batas | v2 |
| `telegram_chat_id_design` / `_legal` | kosong | v2 |
| `storage_grace_days` | 14 (hari kalender) | v3 |
| `storage_fee_idr` | 0 (satuan: OQ-30) | v3 |
| `telegram_chat_id_production` / `_crm` | kosong | v3 |

**Kriteria terima:** mengubah `default_free_revision_limit` hanya berlaku untuk klien yang dibuat sesudahnya.

### FR-12 Master Data (F-12)

1. Menu Master Data berisi daftar pilihan yang didaftarkan perusahaan sendiri (D-15). Jenis MVP: `LEAD_CHANNEL` (kode + nama, contoh dari PRD lama: Ads, Instagram, Web), `PRODUCT_CATEGORY`, `SAMPLE_KIND`, `FORMULATION_TYPE`. Jenis v3: `CARRIER` (ekspedisi rekanan), `SUPPLIER`. Karena nilainya milik perusahaan, arti pasti kolom sheet lama tidak perlu diketahui untuk membangun skema.
2. Database baru mulai kosong. Form intake yang daftar pilihannya kosong menampilkan *"Belum ada kategori produk. Minta Admin menambahkannya di Master Data."* dengan tautan ke menu itu bila pengguna punya `master_data.manage`.
3. Pilihan yang sudah dipakai tidak bisa dihapus, hanya dinonaktifkan; pilihan nonaktif tidak muncul di form baru tetapi tetap tampil pada data lama.
4. Kode unik per jenis.

**Kriteria terima:** menonaktifkan kategori menyembunyikannya dari form intake tanpa mengubah lead yang sudah memakainya.

### FR-13 Hapus domain contoh & bahasa Inggris (F-13)

1. `master_item`, `log_aktivitas`, halaman, gateway, route kanonik, izin `items.*`/`activity.*` dihapus di keempat lapisan skema dalam satu perubahan.
2. Halaman bawaan template (login, provisioning, lupa password, 2FA, Pengaturan, Operator, Role, Sinkronisasi) dan pesan `CommandError` Rust diterjemahkan ke bahasa Inggris. Kode error (`TOTP_REQUIRED`, dll.) tidak berubah.
3. Tampilan template diganti token `DESIGN.md` (tema terang); gradien latar dan font Inter bawaan template dihapus.

**Kriteria terima:** `audit:schema`, `audit:contract`, `audit:sql`, `audit:docs` lulus.

---

## 7. Sketsa Data Model

Konvensi tabel domain:

- PK `id TEXT` UUID dibuat di perangkat (baris offline di dua perangkat tidak boleh bertabrakan).
- Uang `INTEGER` rupiah; persentase `INTEGER` basis poin (`3550` = 35,50%).
- Waktu `TEXT` UTC ISO-8601.
- Tanpa kolom `version`; konflik ditangani `base_revision` mesin sync.
- Tabel yang ikut sync ada di keempat lapisan skema.

### 7.1 Dipakai ulang dari template

| PRD lama | Dipakai |
| :-- | :-- |
| `users`, enum role | `master_operator` + `app_role` |
| `users.active_session_id` | `app_session` (FR-03) |
| `app_configs` | `setting_gex_system` (FR-11) |

### 7.2 MVP

| Entitas | Field kunci |
| :-- | :-- |
| `device_registry` | `device_code` (UQ, 2 char), `device_id`, `registered_at`. Kode perangkat disalin ke setting device-local. |
| `master_option` | `kind` (`LEAD_CHANNEL` / `PRODUCT_CATEGORY` / `SAMPLE_KIND` / `FORMULATION_TYPE` / `CARRIER` / `SUPPLIER`), `code`, `label`, `is_active`, `sort_order`; UQ (`kind`, `code`) |
| `clients` | `client_code` (UQ), `name`, `phone_normalized` (UQ), `address`, `city`, `province`, `lifecycle_status` (`LEAD` / `FIRST_ORDER_ACTIVE` / `EXISTING_CLIENT`), `free_revision_limit`, `is_white_label`, `assigned_crm_id`, `created_by`, `created_at`, `updated_at` |
| `leads` | `client_id`, `pic_cs_id`, `channel_option_id`, `product_category_option_id`, `needs_notes`, `last_followup_at`, `last_client_response_at`, `total_followups`, `created_at`, `updated_at` (tanpa kolom segmen) |
| `lead_interactions` | `lead_id`, `operator_id`, `direction` (`OUTBOUND` / `INBOUND`), `kind`, `notes`, `occurred_at` |
| `sample_requests` | `client_id`, `lead_id`, `sample_kind_option_id`, `formulation_type_option_id`, `rnd_product_class` (`NEW` / `EXISTING`, diisi RnD), `product_category_option_id`, `pic_crm_id`, `sample_qty`, `brand_name`, `bpom_product_name`, `claims`, `packaging`, `reference_notes`, `client_budget_idr`, `special_requests_json`, `deadline_at`, `ship_to_address`, `is_dummy_required`, `is_paid_sample`, `revision_index`, `is_billable`, `status`, `rnd_lead_time_days`, `sent_at`, `created_by`, `created_at`, `updated_at` |
| `sample_feedbacks` | satu baris per iterasi: `sample_request_id`, `iteration_number`, `client_decision` (`PENDING` / `ACC` / `REVISE` / `REJECT`), `client_notes`, `recorded_by`, `recorded_at`; v2: `formula_code` (UQ), `rnd_user_id`, `rnd_decision`, `rnd_reject_reason`, `product_knowledge`, `rnd_notes` |
| `media_asset` | `owner_type`, `owner_id`, `purpose` (`REFERENCE` / `PAYMENT_PROOF` / `MOCKUP` / `RECEIPT` / `COMPLAINT`), `mime`, `byte_size` (≤ 307200), `data_base64`, `created_by`, `created_at` |
| `notification_outbox` | `event_type`, `target_division`, `payload_json`, `occurred_at`, `dedupe_key` (UQ), `claimed_at`, `sent_at`, `attempts`, `last_error`, `status` |
| `domain_audit_log` | `actor_operator_id`, `on_behalf_of_division`, `action`, `entity_type`, `entity_id`, `summary_json`, `occurred_at` |
| `telegram_config` | cloud-only, di luar `SNAPSHOT_TABLES`: `bot_token_encrypted`, `is_active`, `updated_by`, `updated_at` |

### 7.3 v2

| Entitas | Field kunci |
| :-- | :-- |
| `pricing_formulas` | `sample_feedback_id` (UQ), `base_hpp_unit_idr`, `packaging_cost_unit_idr`, `operational_cost_unit_idr`, `margin_bp`, `final_unit_price_idr` (ceil, D-16), `is_approved`, `valid_until` |
| `incoming_funds` | Sheet Data Uang Masuk: `client_id`, `received_at`, `amount_idr`, `description`, `recorded_by` |
| `payments` | tagihan: `client_id`, `ref_type` (`SAMPLE_FEE` / `REVISION_FEE` / `DUMMY_FEE` / `TEST_FEE` / `DP_PRODUCTION_LEGAL` / `SETTLEMENT` / `SHIPPING` / `OTHER`), `ref_id`, `amount_idr`, `invoice_number` (UQ), `proof_media_id`, `incoming_fund_id`, `verified_by`, `verified_at`, `status` (`PENDING` / `VERIFIED` / `REJECTED`) |
| `design_tickets` | `sample_request_id`, `designer_user_id`, `mockup_media_id`, `dummy_print_status`, `dummy_rejection_count`, `dummy_tracking_no`, `client_approval`, `revision_notes` |
| `production_mou` | `mou_number` (UQ, `MOU-YYYYMMDD-<KP><NN>`), `client_id`, `pricing_formula_id`, `total_units`, `total_production_cost_idr`, `production_lead_time_days`, `dp_bp`, `dp_amount_required_idr`, `dp_payment_id`, `is_dp_cleared`, `status` |
| `legal_processes` | `mou_id`, `regulatory_path` (`WHITE_LABEL` / `WITH_BPOM`), `sig_status`, `sig_report_no`, `sig_submitted_by` (RnD), `bpom_reg_type` (`MD` / `NA` / `NOT_APPLICABLE`), `bpom_reg_number`, `bpom_submitted_at`, `bpom_issued_at`, `halal_scope` (`BAHAN` / `PRODUK`), `halal_cert_number`, `hki_cert_number`, `legal_officer_id`, `status` |
| `approval_tokens` | `token_hash` (UQ), `entity_type` (`SAMPLE_APPROVAL` / `DUMMY_APPROVAL` / `MOU_APPROVAL`), `entity_id`, `client_id`, `expires_at` (dihitung database), `used_at`, `channel` (`LINK` / `MANUAL`), `response_json`, `evidence_media_id` |

### 7.4 v3

| Entitas | Field kunci |
| :-- | :-- |
| `production_batches` | `batch_code` (UQ, `BAT-YYYYMMDD-<KP><NN>`), `mou_id`, `ppic_material_stat`, `po_reference_no`, `po_supplier_option_id`, `po_eta`, `sched_weighing_at`, `sched_mixing_at`, `sched_filling_at`, `sched_packing_at`, `estimated_completion_at`, `current_stage`, `spv_user_id`, `is_settlement_cleared`, `finished_at`, `held_since` |
| `batch_stage_log` | `batch_id`, `stage`, `operator_id`, `completed_at` |
| `logistics_shipments` | `batch_id` (UQ), `delivery_method` (`INTERNAL_FLEET` / `THIRD_PARTY_CARRIER`), `carrier_option_id`, `tracking_number`, `driver_name`, `vehicle_plate`, `delivery_note_number` (UQ), `receipt_media_id`, `shipped_at`, `is_delivered`, `client_acc_status` |
| `qc_claims` | `batch_id`, `client_id`, `complaint_notes`, `fault_type`, `claim_decision`, `investigation_notes`, `proof_media_id`, `pic_qc_id`, `authorized_at` |
| `crm_pipelines` | `client_id` (UQ), `assigned_crm_id`, `last_formula_code`, `last_order_completed_at`, `estimated_depletion_at`, `pipeline_status` |

### 7.5 Relasi

```
clients 1─N leads 1─N lead_interactions
clients 1─N sample_requests 1─N sample_feedbacks 1─1 pricing_formulas (v2)
pricing_formulas 1─1 production_mou (v2) 1─1 legal_processes (v2)
production_mou 1─N production_batches (v3) 1─1 logistics_shipments (v3)
production_batches 1─N qc_claims (v3); clients 1─1 crm_pipelines (v3)
payments N─1 clients; payments.ref_id → sample_requests | design_tickets | production_mou | production_batches
payments N─1 incoming_funds (v2)
media_asset N─1 pemilik mana pun lewat owner_type/owner_id
```

---

## 8. Edge Case & Failure State

### MVP

| ID | Kondisi | Perilaku wajib |
| :-- | :-- | :-- |
| E-01 | Dua perangkat offline membuat klien di tanggal yang sama | Kode berbeda karena `KP` berbeda (FR-04.5). |
| E-02 | Perangkat baru belum pernah tersambung | Tidak bisa membuat klien sampai mendapat `KP`; semua fitur baca tetap jalan. |
| E-03 | CS login di laptop, lalu di HP; laptop masih offline | Laptop tetap bekerja. Saat online, laptop tersusul; outbox masuk karantina (FR-03). |
| E-04 | Dua CS offline mendaftarkan nomor WhatsApp yang sama | Push kedua menjadi konflik di layar Sinkronisasi dengan `kode_klien` pemilik nomor; CS memindahkan catatan secara manual. Gabung otomatis: F-43. |
| E-05 | Dua perangkat mengubah lead yang sama saat offline | `base_revision` menjadikan perubahan kedua konflik, bukan menimpa diam-diam. |
| E-06 | Jam perangkat salah | Segmentasi offline di perangkat itu bisa keliru. Saat sync, peringatan tampil bila selisih jam perangkat dengan database > 5 menit. |
| E-07 | RnD menolak kelayakan | Tiket `RND_REJECTED`; CS membuat tiket baru untuk produk lain. Bila tidak ada tiket aktif lain, klien kembali `LEAD` (FR-05.5). |
| E-08 | Revisi melampaui kuota di MVP | Tiket berhenti di `PENDING_FEE_ASSESSMENT` sampai v2 (D-10). |
| E-09 | Token bot salah atau bot dikeluarkan dari grup | Mutasi tetap tersimpan; notifikasi `FAILED` setelah 5 kali; pesan error Telegram tampil apa adanya di Pengaturan. |
| E-10 | Gambar > 300 KB setelah kompresi | Ditolak dengan instruksi potong; tiket tetap bisa disimpan tanpa foto. |
| E-11 | CSV berisi Kode Klien atau nomor yang sudah ada | Dilewati dan dilaporkan di pratinjau. |
| E-12 | CSV rusak (encoding, kolom bergeser) | Pratinjau 0 valid + alasan; tombol simpan nonaktif. |
| E-13 | CSV memuat Kode Asal Lead atau kategori yang belum ada di Master Data | Baris ditolak per baris dengan nama nilai yang hilang; Admin menambahkannya lalu mengimpor ulang. |
| E-14 | Master Data kosong di database baru | Form intake memberi tahu dan menautkan ke Master Data (FR-12.2). |
| E-15 | Lisensi habis | Mode baca-saja template. |
| E-16 | Operator dinonaktifkan saat perangkatnya offline | Saat online, sesi dicabut; outbox dikarantina. |

### v2

| ID | Kondisi | Perilaku wajib |
| :-- | :-- | :-- |
| E-20 | Klien menolak dummy berulang kali | `DUMMY_REVISE`; MoU tetap terkunci; Finance boleh menagih `DUMMY_FEE` tambahan. Saat `dummy_rejection_count` mencapai `max_dummy_rejections`: OQ-29. |
| E-21 | Legal/RnD mencoba mengisi SIG/BPOM sebelum DP terverifikasi | Field nonaktif dengan label *"Menunggu verifikasi DP Produksi & Legal oleh Finance"*; command Rust ikut menolak. |
| E-22 | Klien menunda persetujuan harga sampai token kedaluwarsa | Harga terkunci; CS menekan *Minta hitung ulang*; tiket kembali ke Finance. |
| E-23 | RnD menolak karena kapasitas mesin pabrik | `TOLAK` dengan sub-kategori *Kendala kapasitas mesin pabrik*; notifikasi ke CS. |
| E-24 | Tautan approval kedaluwarsa, sudah dipakai, atau dimanipulasi | Halaman *"Tautan persetujuan tidak valid atau sudah kedaluwarsa"* + tombol WhatsApp CS; tercatat di audit. |
| E-25 | Server Web tidak bisa dijangkau | CS memakai jalur manual (FR-18): pesan berformat, balasan klien dicatat dengan tangkapan layar wajib. |
| E-26 | Uang masuk tidak cocok nominal dengan tagihan | Finance tidak bisa memverifikasi; selisih ditampilkan. Kebijakan kurang/lebih bayar: OQ-35. |

### v3

| ID | Kondisi | Perilaku wajib |
| :-- | :-- | :-- |
| E-30 | Supplier PO terlambat | PPIC *Laporkan PO terlambat* (alasan + tanggal baru); SPV wajib menjadwal ulang; CS diberi tahu. |
| E-31 | Klien tidak melunasi setelah packing | `HELD_IN_FACTORY_STORAGE`; surat jalan terkunci; biaya titip mulai hari ke-15 kalender (D-19). |
| E-32 | Barang rusak karena ekspedisi | QC memeriksa sampel pertinggal; `RECIPIENT_FAULT` + `REJECT_RETURN`; sistem membuat Berita Acara Kondisi Pengiriman. |
| E-33 | Klien lama menghubungi CS untuk repeat order | Form CS menolak: *"Klien ini dikelola CRM (PIC: [nama])"* + tombol teruskan ke grup Telegram CRM. |
| E-34 | Tahap produksi diisi tidak berurutan dari dua tablet offline | Tahap berikutnya tidak bisa ditandai sebelum tahap sebelumnya; urutan yang salah dari sync menjadi konflik. |

---

## 9. Success Metrics

Semua metrik dihitung dari data aplikasi. Target bertanda † berasal dari PRD lama; angka dasarnya perlu diukur ulang saat pilot.

### Kriteria rilis (D-05)

- Seluruh FR MVP, v2, v3 lolos kriteria terima di Web, Desktop (Windows), dan Android.
- `bun run check` lulus pada commit rilis.
- Pilot (D-22) menjalankan satu order dari lead sampai `ORDER_COMPLETED` sepenuhnya di aplikasi. Jenis datanya: OQ-26.
- Impor CSV dijalankan pada sheet asli yang strukturnya seperti `Alur Maklon.pdf`, atau dilewati.

### MVP

| Metrik | Cara hitung | Target |
| :-- | :-- | :-- |
| Lead tanpa PIC | lead tanpa `pic_cs_id` / total lead | 0% |
| Deteksi Cold | lead melewati 7 hari yang tidak tampil di antrian Cold | 0 † |
| Umur Cold | median hari di Cold sebelum interaksi berikutnya | D-20 |
| Lead → tiket sampel | median hari dari `leads.created_at` ke tiket sampel pertama | ≤ 7 hari (dari 14) † |
| Sesi ganda | dua sesi aktif untuk satu operator yang keduanya berhasil push | 0 † |
| Kehilangan data offline | entri outbox yang hilang tanpa terkirim, dikarantina, atau dibuang sengaja | 0 |
| Ukuran gambar | `media_asset.byte_size` > 307200 | 0 baris † |
| Notifikasi terkirim | `SENT` / (`SENT` + `FAILED`) | D-20 |

### v2

| Metrik | Target |
| :-- | :-- |
| Pendaftaran SIG/BPOM tanpa DP terverifikasi | 0 kasus † |
| Durasi hitung harga sejak `SAMPLE_READY` | ≤ 15 menit (dari 2 hari kerja) † |
| RnD turnaround (`IN_RND` → `SAMPLE_READY`) | ≤ 5 hari kerja, produk standar † |
| Produksi massal tanpa ACC dummy (order yang meminta dummy) | 0% † |
| Respons approval tanpa error teknis (tautan + manual) | ≥ 95% † |

### v3

| Metrik | Target |
| :-- | :-- |
| Barang keluar sebelum pelunasan terverifikasi | 0 insiden † |
| Waktu SPV menjadwal ulang sejak PO bahan kosong | ≤ 4 jam kerja † |
| Packing selesai sesuai jadwal SPV | ≥ 90% † |
| Durasi investigasi QC | ≤ 48 jam kerja † |
| Klien `ORDER_COMPLETED` yang masuk antrian CRM | 100% † |

---

## 10. Open Questions

OQ-01 sampai OQ-20 dan OQ-37 sudah dijawab (D-06 sampai D-26). Tenggat jawaban yang tersisa:

- **Sebelum sprint v2:** OQ-16b, 21, 23, 24, 27, 29, 31, 35, 36
- **Sebelum sprint v3:** OQ-22, 30, 33
- **Sebelum rilis:** OQ-25, 26
- **Rekomendasinya dipakai sampai dijawab:** OQ-28, 32, 34 (ketiganya sudah berlaku di MVP)

| ID | Pertanyaan | Kenapa penting | Rekomendasi |
| :-- | :-- | :-- | :-- |
| OQ-16b | Layar tanpa mockup: Pengaturan Notifikasi, Impor, Master Data (MVP); Pusat Pembayaran, Desain/Dummy, Dokumen Legal (v2). Nomor SCR-04, 05, 06, 10, 12, 13, 14 dipakai untuk apa? | FR punya layar tanpa desain. | Pengaturan, Impor, Master Data MVP memakai pola halaman Pengaturan template, tanpa mockup baru. Tiga layar v2 perlu mockup sebelum sprint v2. |
| OQ-21 | "Tolak" klien atas sampel di PDF: revisi (kembali ke RnD) atau berhenti? | Menentukan beda `CLIENT_REVISE` dan `CLIENT_REJECT`. | Dua tombol terpisah seperti FR-06. |
| OQ-22 | PDF menampilkan dua langkah MoU ("MoU untuk legalitas dan naik produksi" dan "MoU untuk naik produksi"). Satu MoU atau dua? Apakah PPIC menunggu BPOM terbit sebelum produksi, atau berjalan paralel setelah DP? | Menentukan gerbang PPIC di v3. | Butuh jawaban. |
| OQ-23 | "Pembayaran Uji" di PDF: biaya apa (uji gizi SIG?), dan apakah tagihannya terpisah dari DP Produksi & Legal? Gerbang kirim menunggu pelunasan saja, atau pelunasan + ongkos kirim? | Menentukan enum `TEST_FEE` dan gerbang F-26. | Gerbang kirim menunggu semua tagihan `SETTLEMENT` dan `SHIPPING` terverifikasi. |
| OQ-24 **[blok rilis]** | Contoh CSV setiap sheet (data boleh disamarkan). Terutama: nilai kolom Status Lead, isi Jawaban PIC, isi Detail Antrian MoU, kolom 18-43 Sheet Database Klien. | MVP tidak terhambat: Jenis Sampel dan Tipe Formulasi menjadi Master Data (FR-12), dan impor memakai pemetaan kolom di layar (FR-09.4). Contoh asli tetap wajib untuk menguji impor sebelum rilis, dan untuk skema impor v2 (kolom 18-43, MoU). | Minta ke perusahaan maklon pemilik sheet sebelum sprint v2. |
| OQ-25 | Format Kode Klien di sheet lama? Dipertahankan apa adanya saat impor? | Kode sudah diketahui klien. | Dipertahankan; kode baru memakai format D-06. |
| OQ-26 | KOS adalah studio software, bukan perusahaan maklon. Pilot memakai data simulasi yang dijalankan KOS sendiri, atau data sheet milik perusahaan maklon tertentu (sumber `Alur Maklon.pdf`)? | Kriteria rilis butuh satu order end-to-end dan sheet asli. | Simulasi oleh KOS untuk uji rilis; sheet asli dari satu maklon untuk uji impor. |
| OQ-27 | Jalur manual approval (D-08): pesan dikirim lewat WhatsApp atau Telegram ke klien? Formatnya memuat semua field form dengan tanda wajib, atau hanya field wajib? | Klien biasanya dihubungi lewat WhatsApp; grup Telegram di PRD bersifat internal. | WhatsApp; format memuat semua field, yang wajib bertanda `*`; CS tidak bisa menyimpan balasan tanpa field wajib + tangkapan layar. |
| OQ-28 | Mode `PER_REQUEST`: siapa yang boleh menandai tiket sebagai sampel gratis? | Sampel gratis adalah biaya perusahaan. | CS memilih; tiket gratis tercatat di audit dan tampil di ringkasan Admin. |
| OQ-29 | Saat batas penolakan dummy tercapai, apa yang terjadi? | D-18 menetapkan batasnya, bukan akibatnya. | Cetak ulang berikutnya butuh persetujuan pemegang izin baru `design.override_dummy_limit`. |
| OQ-30 | Biaya titip gudang dihitung per hari per apa: per batch, per koli, atau per pcs? | Rumus tagihan v3. | Butuh jawaban. |
| OQ-31 | Sampel harus dikirim bersama harga dan mockup (PDF)? Apakah `SAMPLE_SENT` terkunci sampai harga disetujui Finance dan mockup diunggah? | Menentukan gerbang di v2 dan urutan Finance/Desain. | Harga wajib; mockup wajib hanya bila tiket punya tiket desain. |
| OQ-32 | Mockup v3 memuat fitur di luar PRD (vault sampel pertinggal, prediksi sell-through dari GMV Shopee/TikTok, utilisasi kettle, tanda tangan Peruri, CAPA). Masuk scope? | Membangun semuanya bisa menambah beberapa minggu. | Tidak masuk scope; dicatat di F-45. |
| OQ-33 | Surat Jalan dibuat sebelum barang keluar pabrik? PDF menaruhnya dekat "Produk Diterima". | Surat jalan biasanya menyertai barang. | Dibuat sebelum barang keluar, setelah gerbang lunas. |
| OQ-34 | CS boleh melihat dan mengubah lead milik PIC lain? PDF memakai satu sheet per PIC. | Hak akses FR-02. | Lihat semua, ubah hanya milik sendiri; Admin memindahkan PIC. |
| OQ-35 | Pembayaran kurang atau lebih dari tagihan: ditolak, dicatat sebagian, atau selisihnya jadi deposit? | Rekonsiliasi Finance v2. | Butuh jawaban. |
| OQ-36 | Apakah tagihan dan harga memakai PPN 11%? Mockup SCR-09 dan SCR-17 menghitung PPN; PRD tidak pernah menyebutnya. Bila ya: harga di MoU termasuk atau belum termasuk PPN, dan apakah semua perusahaan pembeli PKP? | Mengubah rumus invoice, DP, dan pelunasan. | Jadikan pengaturan per perusahaan (`ppn_bp`, 0 = tidak memungut PPN); harga satuan selalu disimpan sebelum PPN. |

---

## Lampiran A. Perubahan dari PRD lama

| PRD lama | PRD ini | Alasan |
| :-- | :-- | :-- |
| Nomor FR-08 s/d FR-10 dipakai dua kali | FR MVP FR-01 s/d FR-13; fitur ID F-xx | rujukan tidak ambigu |
| Cek sesi tiap 60 detik lalu force logout | Cek per siklus sync; login offline tidak mengusir; karantina | D-03, D-07 |
| Worker latar harian untuk segmentasi | Dihitung saat dibaca | aturan 30 |
| `REAL` untuk uang/margin | `INTEGER` rupiah dan basis poin | aturan 13 |
| `users`, `app_configs`, JWT, enum role | tabel template | D-04 |
| Kolom `version` | `base_revision` | sudah ada di template |
| Media berupa path berkas, dihapus setelah 7 hari | `media_asset`, tidak dihapus | D-13 |
| `KLN-YYYYMMDD-XXXX` urut global | `KLN-YYYYMMDD-<KP><NN>` | D-06 |
| Kategori/saluran tetap di kode | Master Data | D-15 |

## Lampiran B. `Alur Maklon.pdf` dibanding PRD lama

| # | PDF (alur asli) | PRD lama | Diputuskan di PRD ini |
| :-- | :-- | :-- | :-- |
| B-1 | RnD cek kelayakan (New: riset; Existing: konfirmasi Produksi) → Acc/Tolak → lead time → **baru** invoice sampel → bayar → RnD membuat sampel | Bayar/kuota dulu, baru masuk RnD | Urutan PDF (FR-06.4) |
| B-2 | RnD Tolak → CS mengarahkan klien ke produk lain | Tiket kembali ke CS untuk negosiasi spesifikasi | Tiket berakhir `RND_REJECTED`; CS membuat tiket baru (E-07) |
| B-3 | CS mengirim sampel + harga + mockup bersamaan | Harga dihitung setelah klien ACC sampel | Harga dihitung setelah `SAMPLE_READY`, sebelum `SAMPLE_SENT` (OQ-31) |
| B-4 | Cold = "Last Respon > 7 Days" | Cold = tanpa follow-up CS > 7 hari | Versi PDF (D-24) |
| B-5 | Tahap Closing / Belum Closing | Tidak ada | Closing = ada tiket sampel aktif (FR-05.4) |
| B-6 | "Follow up dan kirim materi" | Tidak ada | Jenis interaksi Kirim Materi (FR-05.1) |
| B-7 | Form sampel: 15 field, termasuk merk, jumlah sampel, referensi, deadline, alamat kirim, Nama CRM, bukti bayar | 6 field | Field PDF dipakai (FR-06.1) |
| B-8 | CRM muncul di tahap sampel | CRM hanya setelah order pertama selesai | Versi `prd-3` (D-25) |
| B-9 | Uji gizi SIG diinput **RnD** | Legal menginput semua dokumen | SIG oleh RnD, BPOM/Halal/HKI oleh Legal (F-21) |
| B-10 | White Label → Halal Bahan; Dengan BPOM → SIG → BPOM MD/NA → HKI + Halal Produk | White Label bypass SIG/BPOM/HKI | Sama, ditambah `halal_scope` (7.3) |
| B-11 | "CS koordinasi dengan Pabrik terkait lead produksi" | Tidak ada | `production_lead_time_days` di MoU (7.3) |
| B-12 | Dua langkah MoU | Satu MoU | Terbuka (OQ-22) |
| B-13 | Jenis pembayaran: Sampel, Uji, DP Produksi, Pelunasan, Pengiriman, Lainnya | Sampel, Revisi, Dummy, DP Produksi & Legal | Gabungan keduanya (7.3); "Uji": OQ-23 |
| B-14 | Finance mencatat uang masuk dari mutasi, lalu mencocokkan | Finance mengunggah bukti dan memverifikasi | Tabel `incoming_funds` + `payments` (7.3) |
| B-15 | Resi: Ekspedisi → SPV → CS → Klien | Sama | Sama (F-27) |
| B-16 | Surat Jalan & SOP di dekat "Produk Diterima" | Sebelum kirim | Sebelum kirim (OQ-33) |
| B-17 | Investigasi QC tidak ada; hanya "Klien ACC Produk: Ya/Tidak" | Tiket QC lengkap | Tiket QC dipertahankan (F-28) |

## Lampiran C. Mockup dibanding PRD v3.1

Mockup (`design/mockups/SCR-*.html`, token dan aturannya di `DESIGN.md`) dipakai sebagai acuan **gaya visual dan tata letak**. **Isi layar mengikuti PRD, bukan mockup.**

### C.1 Berlaku untuk semua layar

| Di mockup | Tindakan | Alasan |
| :-- | :-- | :-- |
| Tailwind CDN, Google Fonts, Material Symbols dari internet | Bundel lokal; token lewat `@theme` di `globals.css` | aturan 15, offline-first |
| Teks berbahasa Inggris | Dipertahankan (D-26); tanpa em dash | keputusan pemilik produk |
| Angka dan metrik contoh (`+18.4% WoW`, `98.2% SLA`, `AA- Rating`, `Confidence 98.2%`) | Buang; tampilkan hanya angka yang dihitung dari data | tidak ada sumbernya |
| Hash, Merkle, CRDT, SQLCipher, ECDSA, "Terminal ID", "Engine Cache", "WAL 64MB" | Buang | bukan fitur; tidak ada di template |
| Tombol *Override with Superadmin Token* / *Bypass* pada gerbang | Buang | gerbang yang bisa dilewati bukan gerbang (G-4) |
| Kode `LEAD-2024-0891`, `CLT-ID-4402`, `SPK-...`, `WO-...` | `KLN-YYYYMMDD-<KP><NN>`, `MOU-...`, `BAT-...` | D-06 |
| Kuota revisi tetap "3" dan biaya revisi tetap "Rp 2.500.000" | Kuota dari klien (bawaan 1); tarif ditetapkan Finance per revisi | FR-06.5, F-15 |
| Sidebar menu "Katalog Formulasi & MOQ" | Buang | tidak ada di PRD |

### C.2 Per layar

| Layar | Pertahankan | Buang | Tambah (wajib dari PRD) |
| :-- | :-- | :-- | :-- |
| SCR-01 Workspace CS | tabel pipeline, filter kategori, panel kuota revisi | tier klien, filter MOQ, estimasi nilai order, kapasitas bench lab, "DP 50% sampel" | badge Hot/Warm/Cold, antrian Cold, PIC CS, status FR-06, jumlah FU, tanggal respons terakhir |
| SCR-02 Intake Lead | form bertahap, dropzone gambar | struktur badan hukum, benchmark kompetitor, hero actives, HET, MOQ, "AI Diagnostic Engine", skor kredit, saluran distribusi, SLA 60 menit, unggah PDF | field FR-04 (termasuk Kode Asal Lead, alamat, kota, provinsi, kebutuhan) dari Master Data; riwayat interaksi FR-05; WebP 75% (bukan 80%), gambar saja |
| SCR-03 Sample Tracker | garis waktu iterasi, catatan feedback klien per iterasi, sisa kuota | tabel resep INCI/CAS, pengukuran lab (viskositas, pH), "Lock & proceed to BPOM" | field FR-06.1, diagram status FR-06.4, catat keputusan klien (ACC/Revisi/Tolak + catatan), pencatatan atas nama RnD/Finance di MVP, deadline, alamat kirim |
| SCR-07 Audit & Sesi | tabel log audit, daftar sesi aktif + tombol akhiri, pencabutan semua sesi dengan alasan wajib | deteksi IP/subnet, karantina IP, grafik anomali, alamat IP, sidik jari perangkat | filter FR-10.3, entri karantina (FR-03.5), kolom "atas nama divisi" |
| SCR-08 RnD | antrian urut deadline, panel keputusan Acc/Tolak | BOM INCI/CAS, uji stabilitas, telemetri viskometer, cek regulasi otomatis | klasifikasi New/Existing, konfirmasi Produksi, lead time sampel, `formula_code`, product knowledge, catatan RnD, sub-kategori tolak |
| SCR-09 HPP | rincian komponen biaya, margin, total | indeks komoditas, simulasi volatilitas, HET dan margin brand klien, otorisasi direktur margin < 35% | rumus 3 komponen F-16; komponen biaya uji/regulasi dan PPN menunggu OQ-36; pembulatan D-16 |
| SCR-11 Approval & DP | ringkasan spesifikasi, jumlah unit, nilai kontrak, gerbang DP | OTP WhatsApp, tanda tangan digital, NIK, rekening escrow/VA, pencocokan mutasi otomatis | TTL token, status sekali pakai, jalur manual (D-08), verifikasi DP manual oleh Finance; syarat mulai produksi menunggu OQ-22 |
| SCR-15 PPIC | daftar work order, status bahan, gerbang DP | matriks kettle, Gantt otomatis, pengalihan jadwal otomatis, barcode lot | cek bahan Tersedia/Tidak, nomor PO + supplier + ETA, laporan PO terlambat, form jadwal manual SPV (F-24) |
| SCR-16 Lantai Produksi | 4 tahap berurutan dengan kunci | telemetri reaktor (MQTT), IPC otomatis, eBR, tombol darurat | penanda selesai per tahap + operator + waktu (F-25) |
| SCR-17 Pelunasan & Kirim | status termin, gerbang kirim, data armada | escrow, mutasi otomatis, hash, relay gerbang gudang, Faktur Pajak | pilihan ekspedisi vs armada internal, resi + foto, Surat Jalan + SOP PDF, status tertahan + biaya titip (F-31) |
| SCR-18 QC & CRM | form komplain, keputusan Internal/Recipient Fault, tombol repeat order | vault stabilitas, prediksi sell-through dari GMV marketplace, CAPA, BAST Peruri, "serahkan ke CS hari ke-35" | investigasi F-28, Berita Acara, serah terima ke CRM (D-25, bukan kembali ke CS), kartu klien CRM (F-30) |

### C.3 Layar yang belum punya mockup

Pengaturan Notifikasi, Impor, Master Data (MVP), Pusat Pembayaran, Desain/Dummy, Dokumen Legal (v2). Lihat OQ-16b.
