import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const desktopSrc = join(__dirname, "../../web-desktop/src");
const mobileSrc = join(__dirname, "../src");

const desktopIcons = join(__dirname, "../../web-desktop/src-tauri/icons");
const mobileIcons = join(__dirname, "../src-tauri/icons");

if (existsSync(desktopIcons)) {
  mkdirSync(mobileIcons, { recursive: true });
  cpSync(desktopIcons, mobileIcons, { recursive: true });
  console.log("Copied icons to src-tauri/icons");
}

const filesToCopy = [
  "lib/db.ts",
  "lib/db-schema.ts",
  "lib/db-migrations.ts",
  // Komponen yang identik di Web/Desktop dan Mobile. Perbedaan platform
  // (dialog simpan Android, haptic) ditangani di dalam komponen lewat
  // `isMobileRuntime()`, bukan dengan menulis dua salinan. Kerangka layar
  // (`AppShell` / `MobileAppShell`) dan halaman `src/app/**` tetap terpisah.
  "components/ui/FeedbackBanner.tsx",
  "components/ui/Icon.tsx",
  "components/ui/Modal.tsx",
  "components/ui/PageHeader.tsx",
  "components/ui/StatusBadge.tsx",
  "components/AutoSyncRunner.tsx",
  // Domain MaklonOS: workspace klien dan kartu Pengaturan-nya.
  "components/clients/ClientCodeCard.tsx",
  "components/clients/ClientWorkspace.tsx",
  "components/clients/LeadDetail.tsx",
  "components/clients/MasterDataCard.tsx",
  "components/BootstrapPanel.tsx",
  "components/CompanyProfileCard.tsx",
  "components/DatabaseBackupCard.tsx",
  "components/LivenessCapture.tsx",
  "components/MailSettingsCard.tsx",
  "components/PasswordRecoveryCard.tsx",
  "components/SyncIndicator.tsx",
  "components/TwoFactorCard.tsx",
  "components/license/LicenseActivationPanel.tsx",
  "components/license/LicenseBootstrapField.tsx",
  "components/license/LicenseCard.tsx",
  "components/license/LicenseNotice.tsx",
];

for (const file of filesToCopy) {
  const src = join(desktopSrc, file);
  const dest = join(mobileSrc, file);
  if (existsSync(src)) {
    // Subfolder komponen (`clients/`) belum tentu ada di Mobile.
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
    console.log(`Copied ${file} to mobile`);
  }
}

const dirsToCopy = [
  "lib/attendance",
  "lib/auth",
  "lib/client",
  "lib/context",
  "lib/contracts",
  "lib/gateways",
  "lib/hooks",
  "lib/mail",
  "lib/operators",
  "lib/rbac",
  "lib/runtime",
  "lib/security",
  "lib/server",
  "lib/services",
  "lib/utils",
  "lib/validations",
  "types",
];

for (const dir of dirsToCopy) {
  const src = join(desktopSrc, dir);
  const dest = join(mobileSrc, dir);
  if (existsSync(src)) {
    mkdirSync(dest, { recursive: true });
    cpSync(src, dest, { recursive: true });
    console.log(`Copied ${dir} to mobile`);
  }
}
