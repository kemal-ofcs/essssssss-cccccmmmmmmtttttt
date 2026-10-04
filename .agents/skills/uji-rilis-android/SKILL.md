---
name: uji-rilis-android
description: >-
  Daftar periksa sebelum APK rilis Company OS diserahkan, dan urutan diagnosis
  saat pengguna melaporkan bug dari HP: aplikasi tertutup sendiri saat dibuka,
  data dari Desktop tidak muncul di Android, halaman tidak bisa digeser, tombol
  Back salah, atau tes Telegram gagal. Pakai saat menyiapkan atau membangun APK
  rilis, dan setiap kali laporan bug datang dari build Android (bukan dari mode
  dev). Bukan untuk menulis fitur baru (pakai kerjakan-fitur-lintas-platform)
  atau audit keamanan (pakai audit-lalu-perbaiki).
---

# Uji Rilis Android

## Latar (anggap Anda belum tahu apa pun)

Company OS versi Android adalah Tauri v2 + Rust (`mobile/`) yang berbicara
langsung ke database LibSQL; tidak ada server aplikasi. Kode bersamanya disalin
dari `web-desktop/` oleh `bun run sync:mobile`, sedangkan `config.rs`,
`secrets.rs`, `build.rs`, `lib.rs`, capabilities, dan `mobile/src/app/**`
disunting langsung di `mobile/`.

Bug paling mahal di proyek ini justru yang **tidak pernah terlihat di mode dev
maupun APK debug**, karena keduanya membawa nilai dari `.env`:

| Gejala di APK rilis | Penyebab yang pernah terjadi | Kenapa lolos dari dev/debug |
|---|---|---|
| Tertutup sendiri: `APP_OFFLINE_AUTH_MAX_AGE_HOURS must be a number` | `build.rs` meneruskan nama env yang salah | Debug membaca `.env` |
| Tertutup sendiri di pemasangan baru: `Invalid server URL format` | String alamat kosong ikut diurai | Debug selalu punya URL dari `.env` |
| Halaman tidak bisa digeser | `<main>` ber-`overflow-y-auto` + `overscroll-contain` di kerangka `min-h-dvh` | Hanya WebView Android yang menahan gulirnya |
| Nama perusahaan "tidak sinkron" | Kartu membaca sekali saat mount, datanya sudah ada | Terlihat persis seperti sync rusak |

Fakta lingkungan yang wajib diketahui:

- Build rilis TIDAK menulis log Rust ke logcat, `run-as` dan devtools WebView
  tidak tersedia (APK tidak debuggable). Satu-satunya baris logcat yang
  berguna adalah `Abort message` saat crash.
- `adb` tidak ada di PATH Git Bash: `"$LOCALAPPDATA/Android/Sdk/platform-tools/adb.exe"`.
  Paket: `id.kos.companyos.mobile`. HP pengguna (Xiaomi) menolak `adb install`;
  pengguna memasang APK sendiri.
- Build rilis tidak membawa `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN` (hanya
  `debug_assertions`). Yang ditanam di rilis: `APP_OFFLINE_AUTH_MAX_AGE_HOURS`
  (bawaan 168) dan `KOS_BUILD_DATE`, keduanya dari `mobile/src-tauri/build.rs`.
- Laptop pengguna lemah: SATU pekerjaan berat dalam satu waktu.

## Instruksi

### A. Sebelum APK diserahkan

Kerjakan berurutan. Berhenti dan laporkan pada langkah pertama yang gagal.

1. **Nilai build.** Setiap `option_env!`/`env!` baru di kode Rust Mobile wajib
   punya baris `cargo:rustc-env` di `mobile/src-tauri/build.rs` DAN
   `web-desktop/src-tauri/build.rs`, dengan nilai bawaan bila rilis tidak boleh
   tanpanya. Jangan mengandalkan `.cargo/config.toml`: Gradle menjalankan Cargo
   dari folder lain dan berkas itu tidak terbaca. `cargo:rerun-if-changed`
   hanya untuk berkas yang ada: berkas yang tidak ada dianggap selalu berubah,
   dan crate aplikasi dikompilasi ulang di setiap build.
2. **Pemasangan baru.** Setiap nilai yang dibaca saat start (`config.rs`,
   `secrets.rs`) wajib aman bila kosong atau belum ada. Cari pola
   `unwrap_or(DEFAULT_...)` yang langsung diurai; tambahkan tes seperti
   `instalasi_baru_tanpa_alamat_server_tetap_bisa_start` di `config.rs`.
3. **Build.** Dari `mobile/`: `bun run tauri:android:build:arm64` (APK saja;
   build universal mengompilasi empat ABI dan lebih dari 30 menit). Rust
   dikompilasi sekali oleh Tauri CLI; putaran Gradle sesudahnya seharusnya
   selesai dalam detik. Bila putaran itu ikut mengompilasi `companyos_mobile`
   (sekitar 7 menit, LTO), ulangi dengan
   `CARGO_LOG=cargo::core::compiler::fingerprint=info` dan cari baris `dirty`
   atau `stale` untuk melihat apa yang dianggap berubah.
   `mobile/scripts/patch-android.ts` berjalan otomatis lebih dulu: R8 mati dan
   tanda tangan rilis dari `gen/android/keystore.properties`. Nama berkas
   tetap `app-universal-release.apk` walau isinya hanya arm64.
4. **Tanda tangan dan isi.** Dengan `apksigner` dari `build-tools` SDK:
   `apksigner.bat verify --print-certs <apk>` harus menunjukkan sertifikat
   Kemal Office Studio yang sama dengan rilis sebelumnya (kalau berbeda,
   pengguna harus uninstall dan kehilangan data lokal). `unzip -l <apk>`
   harus memuat `lib/arm64-v8a/`.
5. **Uji di HP** (minta pengguna, atau lewat screenshot `adb` bila HP
   tersambung):
   - buka setelah pemasangan bersih (data aplikasi dihapus) sampai layar lisensi;
   - geser setiap halaman utama sampai bawah, termasuk di atas tabel;
   - tombol Back Android di halaman yang punya sub-bagian (Settings) kembali
     ke menu, bukan keluar aplikasi;
   - sinkron dua arah dengan **dua akun berbeda** di Desktop dan Android.

### B. Saat ada laporan bug dari HP

1. **Pastikan versinya.** `adb shell dumpsys package id.kos.companyos.mobile | grep -E "versionName|lastUpdateTime"`.
   Banyak "bug" ternyata APK lama yang belum diganti.
2. **Aplikasi tertutup sendiri:**
   `adb logcat -d | grep -A3 "Abort message"`. Pesannya hampir selalu
   `Failed to setup app: ...` dari `config.rs`; cocokkan dengan langkah A.1-A.2.
3. **Data tidak sampai** (Desktop menyimpan, Android tidak berubah). Periksa
   dari sisi cloud dengan query `SELECT` saja, dijalankan
   `bun --env-file=.env` dari dalam `web-desktop/`; jangan pernah mencetak
   token:
   - baris tujuannya di cloud beserta `updated_at`: sudah sampai cloud atau belum;
   - `sync_pulse` untuk tabel itu: penghitung perubahannya naik atau tidak;
   - `device_tag_registry` dan `sync_changelog GROUP BY client_id`: perangkat
     mana yang aktif mendorong. Perangkat yang mendorong pasti juga menarik,
     karena pull berjalan di siklus yang sama (aturan 9);
   - `app_session` (`client_kind`, `revoked_reason`): akun yang sama di dua
     perangkat saling `SUPERSEDED` di setiap login online (aturan 36).
   Bila cloud dan aktivitas perangkat sehat, curigai **layar**, bukan sync:
   apakah komponennya memuat ulang pada `SYNC_COMPLETED_EVENT`
   (`web-desktop/src/lib/gateways/sync-status.ts`, aturan 42)?
4. **Tampilan salah** (tidak bisa digeser, tombol tertutup, pesan tak
   terlihat): ambil layar
   `adb exec-out screencap -p > <scratchpad>/layar.png` lalu baca gambarnya.
   Jangan mengetuk apa pun di HP pengguna tanpa izin; mereka mungkin sedang
   memakainya. Untuk gulir, periksa kerangka di
   `mobile/src/components/MobileAppShell.tsx` dan bagian "Navigasi" `DESIGN.md`.
5. **Tes Telegram gagal:** `401 Unauthorized` = token bot yang tersimpan
   ditolak (verifikasi dengan `getMe` ke `api.telegram.org`, cetak hanya
   `ok`/`description`); `400 chat not found` = ID grup salah. ID grup berupa
   angka negatif, bukan tautan `t.me/+...`.
6. Perbaiki di sumber kanonik (`web-desktop/` untuk kode bersama), jalankan
   `bun run sync:mobile`, lalu ikuti langkah A.

## Aturan dan batasan

Wajib:
- Bukti sebelum kesimpulan: baris logcat, hasil query, atau screenshot. "Mungkin
  sync" bukan diagnosis.
- Query ke cloud hanya `SELECT`. Nilai rahasia dilaporkan sebagai ada/kosong,
  panjang, atau bentuk, tidak pernah isinya.
- Setiap perbaikan bug rilis meninggalkan satu tes yang gagal bila bugnya
  kembali (tes Rust di `config.rs`, atau tes TS untuk logika bersama).
- Sebut target mana yang harus dibangun ulang (APK, Desktop, atau deploy Web).

Dilarang:
- Menjalankan dua build atau `cargo test` bersamaan.
- Memulai build tanpa diminta: pengguna biasanya membangun dan memasang sendiri.
- Menaruh `TURSO_AUTH_TOKEN` di `mobile/.env` untuk "memudahkan": APK debug
  menanamnya.
- Membaca atau mencetak `gen/android/keystore.properties`, berkas `.jks`, atau
  password keystore.
- Menyalakan R8 (`isMinifyEnabled`) atau mengganti `webpki-roots` (aturan 12).

## Format output

Laporan bug:

```markdown
<Satu kalimat: penyebab yang terbukti, atau "belum terbukti" beserta yang sudah disingkirkan.>

**Bukti:**
- <logcat / query / screenshot, dengan angka dan waktu>

**Perbaikan:** <apa yang berubah, tautan berkas> — tes: <nama tes>

**Perlu dibangun ulang:** <APK / Desktop / Web>
**Coba di HP:** <langkah konkret dan hasil yang diharapkan>
```

Serah terima APK:

```markdown
APK siap: `<path>` (<ukuran>, <jam build>), arm64, tanda tangan <DN> sama dengan rilis sebelumnya.
Dipasang menimpa versi lama tanpa uninstall. Uji: <daftar langkah A.5 yang relevan>.
```

## Contoh

**Input pengguna:** "Nama company sudah aku ganti di desktop, tapi di android
belum berubah."

**Yang dilakukan:**
1. Query cloud: `company_profile` sudah berisi nama baru, `sync_pulse`
   naik.
2. `sync_changelog` per `client_id`: perangkat Android mendorong dua event
   setelah perubahan itu, jadi siklus sync-nya hidup dan pull ikut jalan.
3. `app_session`: akun yang sama login bergantian di Desktop dan Android dan
   saling `SUPERSEDED`; pull tetap berjalan meski sesi tersusul, jadi bukan
   penyebabnya, tapi disarankan dua akun untuk uji.
4. Komponen: `CompanyProfileCard` membaca sekali saat mount dan tidak
   mendengar `SYNC_COMPLETED_EVENT`. Perbaikan: muat ulang saat event itu,
   hanya bila form belum disunting.

**Output (dipotong):**
> Cloud dan perangkat sehat; yang usang adalah kartu Company profile yang hanya membaca sekali saat dibuka. ... Perlu dibangun ulang: APK dan Desktop.

## Failure mode

1. **Menyimpulkan "sync rusak" dari layar yang usang.** *Cegah:* buktikan
   dulu baris sudah di cloud dan perangkat aktif mendorong; baru periksa
   apakah layarnya memuat ulang.
2. **Memperbaiki di mode dev lalu menyatakan selesai.** Dev dan debug membawa
   `.env`, jadi bug nilai-build dan pemasangan-baru tidak pernah muncul di
   sana. *Cegah:* langkah A.1, A.2, dan tes Rust yang mensimulasikan nilai
   kosong.
3. **Menunggu build universal 30+ menit.** *Cegah:* arm64 untuk HP; universal
   hanya bila APK dibagikan ke HP 32-bit lama.
4. **Mengutak-atik HP pengguna saat mereka memakainya.** *Cegah:* screenshot
   dulu; ketukan `adb shell input` hanya dengan izin.
5. **Menyunting salinan Mobile hasil skrip.** Perbaikan di
   `mobile/src/lib/**` atau modul Rust yang disalin hilang pada
   `sync:mobile` berikutnya. *Cegah:* sunting `web-desktop/`, lalu sinkronkan.
