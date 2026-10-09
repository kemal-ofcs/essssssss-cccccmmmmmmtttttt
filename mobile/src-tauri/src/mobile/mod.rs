pub mod app_identity;
// Aturan domain klien: SALINAN `desktop/clients.rs` oleh sync-rust-modules.ts.
pub mod clients;
// Aturan tiket sampel: SALINAN `desktop/samples.rs` oleh sync-rust-modules.ts.
pub mod samples;
pub mod commands;
pub mod config;
// Tiket desain: SALINAN `desktop/design.rs` oleh sync-rust-modules.ts.
pub mod design;
// Khusus Mobile: TIDAK ada padanannya di web-desktop dan TIDAK ikut disalin
// oleh scripts/sync-rust-modules.ts.
pub mod device_storage;
// Tagihan dan uang masuk: SALINAN `desktop/finance.rs` oleh sync-rust-modules.ts.
pub mod finance;
// Lisensi offline Ed25519: SALINAN `desktop/license.rs` oleh sync-rust-modules.ts.
pub mod license;
pub mod models;
// MoU produksi: SALINAN `desktop/mou.rs` oleh sync-rust-modules.ts.
pub mod mou;
// Notifikasi divisi: SALINAN `desktop/notifications.rs` oleh sync-rust-modules.ts.
pub mod notifications;
pub mod portability;
pub mod secrets;
pub mod sql_backend;
pub mod storage;
pub mod sync;
pub mod turso;

pub use config::MobileState;
