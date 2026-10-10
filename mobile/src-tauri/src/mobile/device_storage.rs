//! Menyerahkan berkas yang dibuat aplikasi ke penyimpanan milik pengguna.
//!
//! Modul ini SENGAJA berada di luar daftar berkas yang disalin
//! `scripts/sync-rust-modules.ts`. Perintah di sini tidak punya padanan di
//! Desktop, jadi kalau ditaruh di `commands.rs` ia akan terhapus setiap kali
//! sinkronisasi dari `web-desktop` dijalankan.
//!
//! **Mengapa Storage Access Framework, bukan menulis ke folder Unduhan.**
//! Sejak Android 10 (scoped storage) aplikasi tidak boleh lagi menulis ke
//! `/storage/emulated/0/Download`. Penulisan itu gagal diam-diam: berkasnya
//! tetap dibuat di folder privat aplikasi, pemanggilnya melaporkan sukses, dan
//! pengguna tidak pernah menemukan hasilnya. SAF membalik keadaannya —
//! penggunalah yang memilih tujuannya lewat dialog sistem, izin diberikan per
//! berkas, dan tidak ada satu pun permission manifest yang perlu diminta.

use serde_json::{json, Value};
use tauri::State;

use super::config::MobileState;
use super::models::CommandError;
use super::{portability, storage};

/// Keluarkan cadangan database, lalu serahkan ke pemilih "Simpan ke…" Android.
///
/// Frontend TIDAK menyerahkan path apa pun ke sini. Perintah ini mengekspor
/// sendiri lalu langsung menyerahkan hasilnya, sehingga tidak ada jalan bagi
/// pemanggil untuk menunjuk berkas lain di dalam folder data aplikasi.
///
/// Balasan `savedToDevice: false` berarti pengguna MENUTUP dialognya. Itu
/// pembatalan, bukan kegagalan, dan UI wajib memperlakukannya begitu.
///
/// Namanya berawalan `mobile_`, bukan `desktop_`: konvensi itu yang dipakai
/// `audit:contract` untuk mengenali command yang memang hanya ada di biner
/// Mobile, sehingga gateway bersama boleh memanggilnya tanpa dianggap cacat.
#[tauri::command]
pub async fn mobile_export_database_to_device(
    app: tauri::AppHandle,
    state: State<'_, MobileState>,
    passphrase: Option<String>,
) -> Result<Value, CommandError> {
    let operator = super::commands::require_permission(&state, "database_backup.export")?;
    let report = portability::export_database(&state, passphrase.as_deref())?;

    let saved = simpan_ke_perangkat(&app, &report.path, &report.file_name).await?;

    storage::audit(
        &state.data_dir,
        Some(operator.id),
        if saved {
            "database-export-saved-to-device"
        } else {
            "database-export-save-cancelled"
        },
        Some(&report.file_name),
    );

    Ok(json!({
        "path": report.path,
        "fileName": report.file_name,
        "sizeBytes": report.size_bytes,
        "encrypted": report.encrypted,
        "savedToDevice": saved,
    }))
}

/// Simpan dokumen buatan webview (invoice PDF, v2.3c) lewat pemilih
/// "Simpan ke…" Android. Isinya dibuat frontend dari data yang memang boleh
/// dilihat pemegang `invoices.view`; di sini hanya diserahkan ke tujuan yang
/// dipilih pengguna. `savedToDevice: false` = dialog ditutup (pembatalan).
#[tauri::command]
pub async fn mobile_save_document(
    app: tauri::AppHandle,
    state: State<'_, MobileState>,
    file_name: String,
    data_base64: String,
) -> Result<Value, CommandError> {
    use base64::Engine as _;
    super::commands::require_permission(&state, "invoices.view")?;
    let name = super::commands::document_file_name(&file_name).ok_or_else(|| {
        CommandError::new("DOCUMENT_INVALID", "The document name is invalid.")
    })?;
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(data_base64.as_bytes())
        .ok()
        .filter(|bytes| bytes.len() <= super::commands::DOCUMENT_MAX_BYTES)
        .ok_or_else(|| CommandError::new("DOCUMENT_INVALID", "The document is invalid or too large."))?;
    let saved = simpan_bytes(&app, bytes, &name, "application/pdf").await?;
    Ok(json!({ "fileName": name, "savedToDevice": saved }))
}

/// Simpan .xlsx (ekspor daftar atau template impor, v2.8) lewat dialog SAF.
/// Aturannya sama dengan `desktop_save_xlsx` (`checked_xlsx`); ekspor dicatat
/// di log audit hanya bila pengguna benar-benar menyimpannya.
#[tauri::command]
pub async fn mobile_save_xlsx(
    app: tauri::AppHandle,
    state: State<'_, MobileState>,
    file_name: String,
    data_base64: String,
    purpose: String,
    subject: String,
    rows: i64,
) -> Result<Value, CommandError> {
    let actor = super::commands::require_permission(&state, super::commands::export_permission(&purpose))?;
    let (name, bytes) = super::commands::checked_xlsx(&actor, &file_name, &data_base64, &purpose, &subject)?;
    let saved = simpan_bytes(
        &app,
        bytes,
        &name,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
    .await?;
    if saved {
        super::commands::record_export(&state, &actor, &subject, &name, rows)?;
    }
    Ok(json!({ "fileName": name, "savedToDevice": saved }))
}

/// Baca berkas cadangan lalu serahkan ke `simpan_bytes`.
async fn simpan_ke_perangkat(
    app: &tauri::AppHandle,
    source_path: &str,
    file_name: &str,
) -> Result<bool, CommandError> {
    let bytes = std::fs::read(source_path).map_err(|error| {
        CommandError::new(
            "BACKUP_READ_FAILED",
            format!("The backup file could not be read: {error}"),
        )
    })?;
    simpan_bytes(app, bytes, file_name, "application/octet-stream").await
}

/// Buka dialog SAF lalu tulis isinya ke tujuan yang dipilih pengguna.
///
/// Dipisahkan supaya cabang non-Android hanya ada di satu tempat. Workspace ini
/// juga dikompilasi untuk host saat `cargo test`, jadi seluruh modul wajib
/// tetap dapat dibangun tanpa plugin Android-nya.
#[cfg(target_os = "android")]
async fn simpan_bytes(
    app: &tauri::AppHandle,
    bytes: Vec<u8>,
    file_name: &str,
    mime: &str,
) -> Result<bool, CommandError> {
    use tauri_plugin_android_fs::AndroidFsExt;

    // Versi ASINKRON, bukan `android_fs()`. Dialognya menunggu interaksi
    // manusia — memblokir thread runtime selama itu akan membekukan seluruh
    // antarmuka, termasuk dialog yang sedang ditunggu.
    let api = app.android_fs_async();
    let uri = api
        .picker()
        .save_file(None, file_name, Some(mime), false)
        .await
        .map_err(|error| {
            CommandError::new(
                "BACKUP_SAVE_FAILED",
                format!("The location picker could not be opened: {error}"),
            )
        })?;

    let Some(uri) = uri else {
        // Pengguna menutup dialog. Bukan kegagalan.
        return Ok(false);
    };

    api.write(&uri, &bytes).await.map_err(|error| {
        CommandError::new(
            "BACKUP_SAVE_FAILED",
            format!("The file could not be written to the chosen location: {error}"),
        )
    })?;
    Ok(true)
}

#[cfg(not(target_os = "android"))]
async fn simpan_bytes(
    _app: &tauri::AppHandle,
    _bytes: Vec<u8>,
    _file_name: &str,
    _mime: &str,
) -> Result<bool, CommandError> {
    Err(CommandError::new(
        "BACKUP_SAVE_UNSUPPORTED",
        "The save-file dialog is only available in the Android build.",
    ))
}
