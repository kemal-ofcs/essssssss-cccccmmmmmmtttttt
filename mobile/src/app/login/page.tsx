"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BootstrapPanel } from "@/components/BootstrapPanel";
import { LicenseActivationPanel } from "@/components/license/LicenseActivationPanel";
import { FeedbackBanner } from "@/components/ui/FeedbackBanner";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { triggerHaptic } from "@/lib/client/haptics";
import { useAuth } from "@/lib/context/AuthContext";
import {
  type BootstrapStatus,
  getBootstrapStatus,
} from "@/lib/gateways/bootstrap";
import { isLicenseBlocking } from "@/lib/gateways/license";
import { getServerUrl, setServerUrl } from "@/lib/gateways/server-config";
import { useLicenseStatus } from "@/lib/hooks/useLicenseStatus";
import { useOnlineStatus } from "@/lib/hooks/useOnlineStatus";

function parseCooldownSeconds(msg: string): number {
  if (
    !msg.toLowerCase().includes("too many") &&
    !msg.toLowerCase().includes("rate_limited") &&
    !msg.toLowerCase().includes("locked")
  ) {
    return 0;
  }
  let totalSec = 0;
  const minMatch = msg.match(/(\d+)\s*minute/i);
  const secMatch = msg.match(/(\d+)\s*second/i);
  if (minMatch) totalSec += Number.parseInt(minMatch[1], 10) * 60;
  if (secMatch) totalSec += Number.parseInt(secMatch[1], 10);
  if (totalSec === 0) totalSec = 120;
  return totalSec;
}

export default function LoginPage() {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const isOnline = useOnlineStatus();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  // Kolom kode baru muncul setelah server menyatakan password sudah benar dan
  // tinggal kode 2FA-nya. Menampilkannya lebih awal akan membocorkan akun mana
  // yang memakai verifikasi dua langkah.
  const [totpCode, setTotpCode] = useState<string>("");
  const [needsTotp, setNeedsTotp] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [bootstrapStatus, setBootstrapStatus] =
    useState<BootstrapStatus | null>(null);
  // Dibuka manual ketika kredensial database tersimpan tetapi database cloud-nya
  // tidak menjawab. Tanpa pintu ini, perangkat yang menunjuk database Turso yang
  // sudah dihapus terkunci di form login: provisioning tidak pernah muncul lagi
  // dan tidak ada tempat untuk memasukkan URL database baru.
  const [showDatabaseSetup, setShowDatabaseSetup] = useState(false);
  // Status provisioning belum diketahui pada render pertama. Tanpa penanda ini
  // form login sempat tampil lebih dulu di peluncuran pertama, sehingga instalasi
  // baru terlihat seperti "langsung masuk ke halaman login" padahal layar
  // provisioning menyusul sepersekian detik kemudian.
  const [bootstrapChecked, setBootstrapChecked] = useState(false);

  const refreshBootstrapStatus = useCallback(() => {
    void getBootstrapStatus()
      .then((status) => {
        setBootstrapStatus(status);
        if (status?.reachable) setShowDatabaseSetup(false);
      })
      .catch(() => setBootstrapStatus(null))
      .finally(() => setBootstrapChecked(true));
  }, []);

  useEffect(() => {
    refreshBootstrapStatus();
  }, [refreshBootstrapStatus]);

  // Dibaca ulang setiap status database berubah: perangkat yang baru
  // bergabung ke database berlisensi menemukan lisensinya di sana.
  const {
    status: licenseStatus,
    refresh: refreshLicense,
    setStatus: setLicenseStatus,
  } = useLicenseStatus(false);
  useEffect(() => {
    if (bootstrapStatus) void refreshLicense();
  }, [bootstrapStatus, refreshLicense]);
  // Pemasangan baru meminta lisensi SEBELUM provisioning; perangkat lain
  // milik lembaga yang sama melewatinya karena lisensinya sudah di database.
  const [joiningLicensedDatabase, setJoiningLicensedDatabase] = useState(false);

  // Live countdown ticker
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          setErrorMessage("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Server Endpoint Settings state
  const [serverUrl, setServerUrlState] = useState("");
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [customServerUrl, setCustomServerUrl] = useState("");
  const [serverSaveMessage, setServerSaveMessage] = useState("");
  const [isSavingServer, setIsSavingServer] = useState(false);

  useEffect(() => {
    // `/` meneruskan ke halaman pertama akun ini (Pengaturan bila boleh).
    // Dulu `/dashboard` — rute yang tidak ada di Mobile.
    if (!authLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    void getServerUrl().then((url) => {
      if (url) {
        setServerUrlState(url);
        setCustomServerUrl(url);
      }
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      isSubmittingRef.current ||
      cooldownSeconds > 0 ||
      !username.trim() ||
      !password
    )
      return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage("");
    triggerHaptic("light");

    try {
      const result = await login(
        username.trim(),
        password,
        needsTotp ? totpCode : undefined,
      );
      if (result.sukses) {
        triggerHaptic("success");
        router.replace("/");
      } else {
        triggerHaptic("error");
        if (result.requiresTotp) setNeedsTotp(true);
        const msg = result.pesan || "Sign-in failed.";
        setErrorMessage(msg);
        const cooldown = parseCooldownSeconds(msg);
        if (cooldown > 0) setCooldownSeconds(cooldown);
        void refreshLicense();
      }
    } catch (err: unknown) {
      triggerHaptic("error");
      const message =
        err instanceof Error
          ? err.message
          : "Could not reach the sign-in module.";
      setErrorMessage(message);
      const cooldown = parseCooldownSeconds(message);
      if (cooldown > 0) setCooldownSeconds(cooldown);
      // Login bisa ditolak karena lisensinya; membaca ulang status memunculkan
      // layar aktivasi alih-alih membiarkan form login buntu.
      void refreshLicense();
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const handleSaveServerUrl = async (urlToSave: string) => {
    const target = urlToSave.trim();
    if (!target || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSavingServer(true);
    setServerSaveMessage("");
    try {
      const savedOrigin = await setServerUrl(target);
      setServerUrlState(savedOrigin);
      setCustomServerUrl(savedOrigin);
      setServerSaveMessage(`Server set to: ${savedOrigin}`);
      triggerHaptic("success");
      setTimeout(() => {
        setIsServerModalOpen(false);
        setServerSaveMessage("");
      }, 1200);
    } catch (err: unknown) {
      triggerHaptic("error");
      setServerSaveMessage(
        err instanceof Error
          ? err.message
          : "The server URL could not be saved.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSavingServer(false);
    }
  };

  if (!isAuthenticated && !bootstrapChecked) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <output className="block text-body-md text-on-surface-variant">
          Checking database settings...
        </output>
      </div>
    );
  }

  if (
    !isAuthenticated &&
    bootstrapStatus?.required &&
    !joiningLicensedDatabase &&
    licenseStatus &&
    isLicenseBlocking(licenseStatus)
  ) {
    return (
      <div className="flex min-h-dvh items-center bg-background p-4">
        <div className="app-panel mx-auto w-full max-w-sm p-5">
          <p className="mb-3 font-mono text-label-caps uppercase text-on-surface-variant">
            Step 1 of 2 · database setup follows
          </p>
          <LicenseActivationPanel
            status={licenseStatus}
            onInstalled={setLicenseStatus}
          />
          <button
            type="button"
            onClick={() => setJoiningLicensedDatabase(true)}
            className="app-btn app-btn-secondary mt-3 w-full"
          >
            This device is joining an already licensed database
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && bootstrapStatus?.required) {
    return (
      <BootstrapPanel
        status={bootstrapStatus}
        onCompleted={refreshBootstrapStatus}
      />
    );
  }

  if (!isAuthenticated && bootstrapStatus && showDatabaseSetup) {
    return (
      <BootstrapPanel
        status={bootstrapStatus}
        onCompleted={refreshBootstrapStatus}
        onCancel={() => setShowDatabaseSetup(false)}
      />
    );
  }

  if (!isAuthenticated && licenseStatus && isLicenseBlocking(licenseStatus)) {
    return (
      <div className="flex min-h-dvh items-center bg-background p-4">
        <div className="app-panel mx-auto w-full max-w-sm p-5">
          <LicenseActivationPanel
            status={licenseStatus}
            onInstalled={(next) => {
              setLicenseStatus(next);
              setErrorMessage("");
            }}
          />
          <button
            type="button"
            onClick={() => setShowDatabaseSetup(true)}
            className="app-btn app-btn-secondary mt-3 w-full"
          >
            Database connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col justify-between bg-background p-4">
      <div className="mx-auto my-auto flex w-full max-w-sm flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-headline-xl text-on-surface">App Template</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Sign in to continue.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-surface-container bg-surface-container-lowest px-2 py-0.5 font-mono text-code-sm text-on-surface-variant">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${isOnline ? "bg-success" : "bg-on-tertiary-container"}`}
              />
              {isOnline ? "Online" : "Offline"}
            </span>
            <button
              type="button"
              onClick={() => {
                setCustomServerUrl(serverUrl);
                setServerSaveMessage("");
                setIsServerModalOpen(true);
              }}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-body-sm font-semibold text-secondary"
            >
              <Icon name="settings" className="size-4" />
              Server
            </button>
          </div>
        </div>

        {/* Database cloud tersimpan tetapi tidak menjawab: tawarkan konfigurasi
            ulang, jangan biarkan pengguna menebak-nebak di form login. */}
        {bootstrapStatus?.configured && !bootstrapStatus.reachable ? (
          <div className="space-y-1.5 rounded-md border border-tertiary-fixed-dim bg-tertiary-fixed p-3 text-body-md text-on-tertiary-fixed">
            <p className="font-semibold">
              The cloud database cannot be reached
            </p>
            <p>
              {bootstrapStatus.message ??
                "This device still points at the old database."}
            </p>
            <p>
              If the internet is up and the database was replaced or deleted,
              point the app at the new one. Offline sign-in still works if this
              device has signed in online before.
            </p>
            <button
              type="button"
              onClick={() => setShowDatabaseSetup(true)}
              className="app-btn app-btn-secondary mt-1 w-full"
            >
              Reconfigure database
            </button>
          </div>
        ) : null}

        <div className="app-panel p-4">
          {cooldownSeconds > 0 ? (
            <output className="block mb-4 rounded-md border border-tertiary-fixed-dim bg-tertiary-fixed p-3 text-center text-body-md text-on-tertiary-fixed">
              <p className="font-semibold">Account temporarily locked</p>
              <p className="mt-1">Too many failed attempts. Try again in</p>
              <p className="mt-2 font-mono text-code-lg font-bold">
                {Math.floor(cooldownSeconds / 60) > 0
                  ? `${Math.floor(cooldownSeconds / 60)}m `
                  : ""}
                {cooldownSeconds % 60}s
              </p>
            </output>
          ) : errorMessage ? (
            <div className="mb-4">
              <FeedbackBanner
                tone="error"
                onDismiss={() => setErrorMessage("")}
              >
                {errorMessage}
              </FeedbackBanner>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="app-label">
                Username or operator code
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                disabled={cooldownSeconds > 0}
                className="app-input"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="app-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={cooldownSeconds > 0}
                className="app-input"
              />
            </div>

            {needsTotp ? (
              <div className="space-y-1.5">
                <label htmlFor="totp-input" className="app-label">
                  Two-step verification code
                </label>
                <input
                  id="totp-input"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={16}
                  value={totpCode}
                  onChange={(event) => setTotpCode(event.target.value)}
                  placeholder="123456 or a backup code"
                  className="app-input font-mono tracking-[0.25em]"
                />
                <p className="text-body-sm text-on-surface-variant">
                  Open your authenticator app, or enter a backup code.
                </p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                cooldownSeconds > 0 ||
                !username.trim() ||
                !password
              }
              className="app-btn app-btn-primary w-full"
            >
              {isSubmitting
                ? "Signing in..."
                : cooldownSeconds > 0
                  ? `Locked (${cooldownSeconds}s)`
                  : "Sign in"}
            </button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="inline-flex min-h-11 items-center text-body-md font-semibold text-secondary"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {serverUrl ? (
          <p className="truncate text-center text-body-sm text-on-surface-variant">
            Server: <span className="font-mono">{serverUrl}</span>
          </p>
        ) : null}
      </div>

      <footer className="space-y-0.5 text-center font-mono text-code-sm text-on-surface-variant">
        {licenseStatus?.license ? (
          <p>Licensed to {licenseStatus.license.holder}</p>
        ) : null}
        <p>Kemal Office Studio v0.1.0</p>
      </footer>

      {isServerModalOpen ? (
        <Modal
          title="API server"
          titleId="server-dialog-title"
          onClose={() => setIsServerModalOpen(false)}
        >
          <p className="mb-4 text-body-md text-on-surface-variant">
            The backend server address used for sign-in and data sync.
          </p>

          <label htmlFor="serverUrlInput" className="app-label mb-1.5">
            Server origin URL
          </label>
          <input
            id="serverUrlInput"
            type="text"
            inputMode="url"
            value={customServerUrl}
            onChange={(e) => setCustomServerUrl(e.target.value)}
            placeholder="https://your-server.co.id"
            className="app-input mb-3 font-mono text-code-md"
          />

          <button
            type="button"
            onClick={() => setCustomServerUrl("http://127.0.0.1:3000")}
            className="mb-4 w-full rounded-md border border-outline-variant px-3 py-2 text-left text-body-sm hover:bg-surface-container-low"
          >
            <span className="font-semibold text-on-surface">
              USB reverse / local PC
            </span>
            <span className="block font-mono text-code-sm text-on-surface-variant">
              http://127.0.0.1:3000
            </span>
          </button>

          {serverSaveMessage ? (
            <output className="block mb-4 rounded-md border border-surface-container bg-surface-container-low p-2.5 text-center text-body-md text-on-surface">
              {serverSaveMessage}
            </output>
          ) : null}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsServerModalOpen(false)}
              className="app-btn app-btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSavingServer || !customServerUrl.trim()}
              onClick={() => handleSaveServerUrl(customServerUrl)}
              className="app-btn app-btn-primary flex-1"
            >
              {isSavingServer ? "Saving..." : "Save and apply"}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
