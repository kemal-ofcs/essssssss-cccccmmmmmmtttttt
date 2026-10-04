import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Pasang ulang dua perubahan wajib di proyek Android hasil `tauri android init`.
 *
 * `src-tauri/gen/` diabaikan git, jadi init ulang (atau clone baru) selalu
 * kembali ke templat Tauri. Skrip ini dijalankan otomatis sebelum setiap
 * `tauri:android:build*` dan aman diulang:
 *
 * 1. `isMinifyEnabled = false` untuk rilis (CLAUDE.md aturan 12): R8 memotong
 *    reflection JNI Tauri dan aplikasi crash saat dibuka.
 * 2. Tanda tangan APK rilis dari `gen/android/keystore.properties`, yang
 *    menunjuk berkas .jks di luar repo. Berkas properti yang sudah ada TIDAK
 *    pernah ditimpa, karena berisi password.
 *
 * Bila templat Tauri berubah sehingga pola di bawah tidak ditemukan, skrip
 * gagal keras: lebih baik build berhenti daripada APK rilis diam-diam memakai R8.
 */

// Argumen opsional = folder proyek Android lain (dipakai untuk menguji skrip ini).
const androidDir =
  process.argv[2] ?? join(import.meta.dir, "..", "src-tauri", "gen", "android");
const gradleFile = join(androidDir, "app", "build.gradle.kts");
const propertiesFile = join(androidDir, "keystore.properties");

if (!existsSync(gradleFile)) {
  console.error(
    "Proyek Android belum ada. Jalankan `bun run tauri:android:init` dulu.",
  );
  process.exit(1);
}

const MARKER = "// [patch-android] tanda tangan rilis";
const original = readFileSync(gradleFile, "utf8");
let gradle = original;

function replaceOnce(source: string, needle: string, replacement: string) {
  if (!source.includes(needle)) {
    console.error(
      `Pola tidak ditemukan di build.gradle.kts (templat Tauri berubah?):\n${needle}`,
    );
    process.exit(1);
  }
  return source.replace(needle, replacement);
}

// Dideteksi dari isinya, bukan penanda: berkas yang dipatch tangan pun dikenali.
if (!gradle.includes("val keystoreProperties")) {
  gradle = replaceOnce(
    gradle,
    "val tauriProperties = Properties().apply {",
    `${MARKER}: kunci dan password TIDAK pernah masuk repo.
val keystoreProperties = Properties().apply {
    val propFile = rootProject.file("keystore.properties")
    if (propFile.exists()) {
        propFile.inputStream().use { load(it) }
    }
}

val tauriProperties = Properties().apply {`,
  );
  gradle = replaceOnce(
    gradle,
    "    buildTypes {",
    `    signingConfigs {
        if (keystoreProperties.containsKey("storeFile")) {
            create("release") {
                storeFile = file(keystoreProperties.getProperty("storeFile"))
                storePassword = keystoreProperties.getProperty("password")
                keyAlias = keystoreProperties.getProperty("keyAlias")
                keyPassword = keystoreProperties.getProperty("password")
            }
        }
    }
    buildTypes {`,
  );
  gradle = replaceOnce(
    gradle,
    '        getByName("release") {',
    `        getByName("release") {
            signingConfigs.findByName("release")?.let { signingConfig = it }`,
  );
}

// Selalu dipaksa, walau penanda sudah ada: satu suntingan tangan yang
// mengembalikan R8 tidak boleh lolos ke build rilis.
const releaseBlock = gradle.slice(gradle.indexOf('getByName("release")'));
if (/isMinifyEnabled\s*=\s*true/.test(releaseBlock)) {
  gradle =
    gradle.slice(0, gradle.length - releaseBlock.length) +
    releaseBlock.replace(
      /isMinifyEnabled\s*=\s*true/,
      "isMinifyEnabled = false",
    );
}

// Hanya menulis bila berubah, supaya build Gradle yang sedang berjalan tidak terganggu.
if (gradle !== original) writeFileSync(gradleFile, gradle);

const releaseAfter = gradle.slice(gradle.indexOf('getByName("release")'));
if (
  !/isMinifyEnabled\s*=\s*false/.test(releaseAfter) ||
  !gradle.includes('create("release")')
) {
  console.error("Patch Android gagal diverifikasi; periksa build.gradle.kts.");
  process.exit(1);
}

// Nama aplikasi di HP mengikuti `productName` di tauri.conf.json. `strings.xml`
// hanya diisi saat `tauri android init`, jadi nama yang diganti belakangan
// tidak pernah sampai ke APK tanpa langkah ini.
const stringsFile = join(
  androidDir,
  "app",
  "src",
  "main",
  "res",
  "values",
  "strings.xml",
);
const tauriConfig = join(androidDir, "..", "..", "tauri.conf.json");
if (existsSync(stringsFile) && existsSync(tauriConfig)) {
  const productName = String(
    JSON.parse(readFileSync(tauriConfig, "utf8")).productName ?? "",
  ).replace(/[<>&"]/g, "");
  const strings = readFileSync(stringsFile, "utf8");
  const renamed = strings.replace(
    /(<string name="(?:app_name|main_activity_title)">)"?[^<"]*"?(<\/string>)/g,
    `$1"${productName}"$2`,
  );
  if (productName && renamed !== strings) writeFileSync(stringsFile, renamed);
}

if (!existsSync(propertiesFile)) {
  writeFileSync(
    propertiesFile,
    "# Isi password keystore. Berkas ini diabaikan git; JANGAN di-commit.\nstoreFile=E:/Freelance/kunci-android/companyos.jks\nkeyAlias=companyos\npassword=ISI_PASSWORD_KEYSTORE\n",
  );
  console.log(
    "keystore.properties dibuat; isi password-nya sebelum build rilis.",
  );
} else if (readFileSync(propertiesFile, "utf8").includes("ISI_PASSWORD")) {
  console.warn(
    "Peringatan: password di keystore.properties belum diisi; APK rilis akan gagal ditandatangani.",
  );
}

console.log("Patch Android terpasang: R8 mati, tanda tangan rilis aktif.");
