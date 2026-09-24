# DESIGN.md: Arah Desain MaklonOS

Dibaca sebelum membangun layar apa pun. Isinya diambil dari mockup pemilik produk di `design/mockups/`. **Mockup menentukan gaya dan tata letak; isi layar mengikuti `prd-maklonos.md`** (Lampiran C mendaftar apa yang dibuang dan ditambah per layar).

## 1. Karakter

- **Apa:** dashboard kerja harian untuk staf back-office maklon (CS, RnD, Finance, PPIC, Produksi, QC, CRM). Dipakai berjam-jam, sering di laptop kantor dan tablet pabrik.
- **Gaya:** padat, datar, terang, rapi seperti alat kerja. Informasi lebih penting daripada dekorasi.
- **Dial:** ENERGY 1 / RHYTHM 2 / MOTION 1. Layout seragam dengan beberapa jeda sengaja (panel gerbang, antrian), dan gerak hanya pada hover dan indikator sinkronisasi.
- **Motif identitas:** kode entitas (`KLN-…`, `MOU-…`, `BAT-…`) dan status selalu ditulis dengan JetBrains Mono, sehingga mata langsung membedakan data sistem dari teks biasa.
- **Aksen:** biru `secondary` (#0051d5), hanya untuk aksi utama dan status aktif. Merah `error` hanya untuk gerbang terkunci dan kegagalan.

## 2. Keputusan pemilik produk

| Hal | Keputusan |
| :-- | :-- |
| Bahasa antarmuka | Inggris (D-26 di PRD) |
| Label kecil huruf kapital (`label-caps`) | Dipakai, hanya untuk header tabel dan kode status/badge |
| Titik berkedip (`animate-pulse`) | Hanya di indikator sinkronisasi, dan hanya saat ada antrean outbox |
| Tema | Terang saja. Mode gelap ditunda sampai ada permintaan pembeli (F-46 di PRD) |
| Aset | Semua font dan ikon dibundel lokal. Tidak ada request ke CDN (aturan 15) |

## 3. Token

Salin ke `web-desktop/src/app/globals.css` di dalam blok `@theme` (Tailwind v4, tanpa `tailwind.config`). Warna yang tidak dipakai mockup sengaja tidak disalin.

```css
@theme {
  /* Permukaan */
  --color-background: #f8f9ff;
  --color-surface-bright: #f8f9ff;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #eff4ff;
  --color-surface-container: #e5eeff;
  --color-surface-container-high: #dce9ff;
  --color-surface-container-highest: #d3e4fe;
  --color-surface-variant: #d3e4fe;
  --color-surface-tint: #565e74;
  --color-inverse-surface: #213145;
  --color-inverse-on-surface: #eaf1ff;

  /* Teks dan garis */
  --color-on-surface: #0b1c30;
  --color-on-surface-variant: #45464d;
  --color-outline: #76777d;
  --color-outline-variant: #c6c6cd;

  /* Primary (hitam/navy): header, teks tegas */
  --color-primary: #000000;
  --color-on-primary: #ffffff;
  --color-primary-container: #131b2e;
  --color-on-primary-container: #7c839b;
  --color-on-primary-fixed-variant: #3f465c;

  /* Secondary (biru): aksen, aksi utama */
  --color-secondary: #0051d5;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #316bf3;
  --color-on-secondary-container: #fefcff;
  --color-secondary-fixed: #dbe1ff;
  --color-on-secondary-fixed: #00174b;
  --color-on-secondary-fixed-variant: #003ea8;

  /* Tertiary (oranye): peringatan */
  --color-tertiary-container: #2f1500;
  --color-on-tertiary: #ffffff;
  --color-on-tertiary-container: #c76c00;
  --color-tertiary-fixed: #ffdcc3;
  --color-tertiary-fixed-dim: #ffb77d;
  --color-on-tertiary-fixed: #2f1500;

  /* Error: gerbang terkunci, kegagalan */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* Sukses: tidak ada di mockup, ditambahkan untuk status berhasil (13:1) */
  --color-success: #146c2e;
  --color-success-container: #d7f5dd;
  --color-on-success-container: #0a3818;

  /* Font (berkas dibundel lokal) */
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Skala teks */
  --text-headline-xl: 24px;  --text-headline-xl--line-height: 32px; --text-headline-xl--letter-spacing: -0.02em;  --text-headline-xl--font-weight: 700;
  --text-headline-lg: 18px;  --text-headline-lg--line-height: 24px; --text-headline-lg--letter-spacing: -0.015em; --text-headline-lg--font-weight: 600;
  --text-headline-md: 15px;  --text-headline-md--line-height: 20px; --text-headline-md--letter-spacing: -0.01em;  --text-headline-md--font-weight: 600;
  --text-body-md: 13px;      --text-body-md--line-height: 18px;
  --text-body-sm: 12px;      --text-body-sm--line-height: 16px;
  --text-code-lg: 13px;      --text-code-lg--line-height: 18px;     --text-code-lg--letter-spacing: -0.01em;      --text-code-lg--font-weight: 500;
  --text-code-md: 12px;      --text-code-md--line-height: 16px;     --text-code-md--font-weight: 500;
  --text-code-sm: 11px;      --text-code-sm--line-height: 14px;     --text-code-sm--letter-spacing: 0.02em;       --text-code-sm--font-weight: 500;
  --text-label-caps: 10px;   --text-label-caps--line-height: 12px;  --text-label-caps--letter-spacing: 0.08em;    --text-label-caps--font-weight: 600;

  /* Radius (mockup: DEFAULT, lg, xl, full) */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Spacing bernama */
  --spacing-space-xs: 0.125rem;
  --spacing-space-sm: 0.25rem;
  --spacing-space-md: 0.5rem;
  --spacing-space-lg: 0.75rem;
  --spacing-space-xl: 1rem;
  --spacing-gutter-dense: 0.375rem;
  --spacing-gutter: 0.75rem;
  --spacing-margin: 1rem;
}
```

Font: `body-*` dan `headline-*` memakai `font-sans`; `code-*` dan `label-caps` memakai `font-mono`.

## 4. Aturan pakai

**Warna dan kontras** (diukur, WCAG AA 4.5:1 untuk teks biasa):

- `outline` (#76777d) **tidak boleh untuk teks**. Kontrasnya 4.25-4.46 di atas permukaan terang. Pakai hanya untuk garis dan ikon; teks sekunder memakai `on-surface-variant` (8.9:1).
- `on-tertiary-container` (#c76c00) hanya di atas `tertiary-container` (4.54:1), tidak di atas permukaan terang (3.77:1).
- Pasangan aman untuk badge: `on-secondary-fixed-variant` di atas `secondary-fixed` (7.2:1), `on-error-container` di atas `error-container` (7.2:1), `on-tertiary-fixed` di atas `tertiary-fixed` (13.3:1).

**Tipografi**

- Kode entitas, nominal rupiah, tanggal, dan status memakai `font-mono` dengan `tabular-nums`.
- `label-caps` hanya untuk header tabel dan kode status/badge; tidak untuk judul bagian atau tombol.

**Kedalaman dan efek**

- Bayangan hanya untuk header lengket (`0 1px 8px rgb(0 0 0 / 4%)`) dan elemen yang melayang (modal, dropdown). Kartu datar dengan garis `surface-container`.
- `backdrop-blur` hanya untuk lapisan di belakang modal.
- Tidak ada gradien, glow, pola latar, atau grid dekoratif.

**Gerak**

- Hover dan fokus: transisi warna saja.
- `animate-pulse` hanya pada titik indikator sinkronisasi saat outbox > 0; mati bila `prefers-reduced-motion`.

**Gerbang dan status**

- Gerbang terkunci tampil sebagai tombol nonaktif **beserta alasannya dalam teks** (misal "Waiting for Finance to verify the DP"). Tidak ada tombol *override* atau *bypass*.
- Setiap layar yang menampilkan data wajib punya keadaan kosong, memuat, dan gagal.

**Tata letak**

- Kepadatan desktop mengikuti mockup; di Android target sentuh tetap minimal 44 px.
- Tidak ada scroll horizontal halaman di lebar 360 px; tabel lebar boleh scroll di dalam wadahnya sendiri.
- Fokus keyboard selalu terlihat (`outline` 2 px `secondary`), jangan dihapus.

**Ikon**

- `components/ui/Icon.tsx` (SVG inline, garis 1.8 px), bukan font Material Symbols: font itu sekitar 3 MB untuk puluhan ikon. Ikon baru ditambahkan ke berkas itu dengan gaya garis yang sama. Ikon hanya bila memperjelas isi (status, aksi); tidak sebagai hiasan di setiap tombol.

**Teks antarmuka**

- Bahasa Inggris. Tanpa em dash. Tombol menyebut aksinya (`Record client decision`, bukan `Submit`).
- Tidak ada angka, persentase, atau klaim yang tidak dihitung dari data.

**Kelas bersama di `globals.css`**

- `.app-panel` (kartu datar), `.app-input`, `.app-label`, `.app-btn` + `.app-btn-primary` / `.app-btn-secondary` / `.app-btn-danger` (tinggi 44 px). Pakai kelas ini alih-alih menyalin deretan utilitas Tailwind yang sama.
- Tanggal dari database ditampilkan lewat `formatDateTime` (`lib/utils/format.ts`): `25/09/2026 14:30 WIB`.

## 5. Indeks mockup

| Berkas | Layar | Fase | Catatan |
| :-- | :-- | :-- | :-- |
| `SCR-01.html` | CS/CRM Core Workspace | MVP | |
| `SCR-02.html` | Lead Intake & Segmentasi | MVP | |
| `SCR-03.html` | Sample Tracker & Revision Counter | MVP | |
| `SCR-07.html` | Audit Log & Security Sessions | MVP | |
| `SCR-08.html` | RnD Lab Formulation Queue | v2 | |
| `SCR-09.html` | HPP & Pricing Engine | v2 | |
| `SCR-11.html` | Client Approval & DP Gate | v2 | |
| `SCR-15-a.html` | PPIC Master Schedule & Material Allocation | v3 | versi pertama (pendek) |
| `SCR-15-b.html` | PPIC Master Schedule & Material Allocation | v3 | versi kedua (lengkap, dengan sidebar) |
| `SCR-16.html` | 4-Stage Production Floor Execution | v3 | |
| `SCR-17.html` | Pelunasan & Dispatch Strict Gate | v3 | |
| `SCR-18.html` | QC Retur & CRM Retention Handover | v3 | |

Mockup memuat Tailwind CDN dan Google Fonts; membukanya di browser butuh internet. Itu hanya untuk melihat, bukan pola untuk aplikasi.
