"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { type AppArea, canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";
import { syncNow } from "@/lib/gateways/sync-status";
import { AutoSyncRunner } from "./AutoSyncRunner";
import { LicenseHolderLabel, LicenseNotice } from "./license/LicenseNotice";
import { NotificationBell } from "./NotificationBell";
import { QuarantineBanner } from "./QuarantineBanner";
import { RejectedChangesBanner } from "./RejectedChangesBanner";
import { SyncIndicator } from "./SyncIndicator";
import { Icon } from "./ui/Icon";

interface NavItem {
  readonly area: AppArea;
  readonly href: string;
  readonly label: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { area: "clients", href: "/clients", label: "Clients" },
  { area: "samples", href: "/samples", label: "Samples" },
  { area: "finance", href: "/finance", label: "Finance" },
  { area: "production", href: "/production", label: "Production" },
  { area: "audit", href: "/audit", label: "Audit" },
  { area: "settings", href: "/settings", label: "Settings" },
];

interface MobileAppShellProps {
  children: ReactNode;
  title?: string;
}

/**
 * Kerangka layar Mobile.
 *
 * Navigasi bawah dijaga permission yang sama dengan Desktop lewat
 * `canAccessArea`, sehingga satu perubahan role langsung berlaku di kedua
 * target. Menyembunyikan menu tetap bukan pengganti guard di backend Rust.
 *
 * Yang digulir dokumennya, bukan `<main>`. Kerangkanya `min-h-dvh`, jadi
 * `<main>` ber-`overflow-y-auto` tidak pernah punya isi yang meluap, dan
 * `overscroll-contain` di sana menahan gulir dokumen di WebView Android:
 * halaman tidak bisa digeser sama sekali.
 */
const PULL_TRIGGER = 80;
const PULL_MAX = 120;
/** Sinkron sebelum muat ulang paling lama sekian; offline tidak boleh menahan. */
const PULL_SYNC_TIMEOUT_MS = 10_000;

/**
 * Tarik ke bawah dari puncak halaman: sinkron, lalu muat ulang (Android
 * WebView tidak menyediakannya). Diabaikan selama dialog terbuka supaya isian
 * form tidak hilang.
 */
function usePullToRefresh() {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let startY: number | null = null;
    let distance = 0;
    const onStart = (event: TouchEvent) => {
      const atTop = window.scrollY <= 0;
      const dialogOpen = document.querySelector('[role="dialog"]') !== null;
      startY =
        atTop && !dialogOpen ? (event.touches[0]?.clientY ?? null) : null;
      distance = 0;
    };
    const onMove = (event: TouchEvent) => {
      if (startY === null) return;
      if (window.scrollY > 0) {
        startY = null;
        distance = 0;
        setPull(0);
        return;
      }
      distance = Math.max(0, (event.touches[0]?.clientY ?? startY) - startY);
      setPull(Math.min(distance, PULL_MAX));
    };
    const onEnd = () => {
      if (startY !== null && distance >= PULL_TRIGGER) {
        setRefreshing(true);
        void Promise.race([
          syncNow().catch(() => null),
          new Promise((resolve) => setTimeout(resolve, PULL_SYNC_TIMEOUT_MS)),
        ]).finally(() => window.location.reload());
      }
      startY = null;
      distance = 0;
      setPull(0);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  return { pull, refreshing };
}

export function MobileAppShell({ children, title }: MobileAppShellProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const visible = NAV_ITEMS.filter((item) => canAccessArea(user, item.area));
  const { pull, refreshing } = usePullToRefresh();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-on-surface">
      <AutoSyncRunner />
      <header className="sticky top-0 z-30 border-b border-surface-container bg-surface-container-lowest px-4 py-2 shadow-[0_1px_8px_rgb(0_0_0/0.04)]">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-headline-md font-bold text-on-surface">
            {title ?? "Company OS"}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <SyncIndicator />
            <NotificationBell />
            {/* Satu-satunya jalan keluar di Mobile; tanpa ini izin yang baru
                diberikan tidak pernah terbaca karena sesi tidak bisa diulang. */}
            <button
              type="button"
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="grid size-9 place-items-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
            >
              <Icon name="logout" className="size-5" />
            </button>
          </div>
        </div>
        {user ? (
          <p className="mt-0.5 truncate text-body-sm text-on-surface-variant">
            {user.nama_operator} · {user.role}
          </p>
        ) : null}
        <LicenseHolderLabel className="mt-0.5 block truncate text-body-sm text-on-surface-variant" />
      </header>
      {pull > 0 || refreshing ? (
        <output
          aria-live="polite"
          className="block overflow-hidden text-center text-body-sm text-on-surface-variant transition-[height]"
          style={{ height: refreshing ? 40 : pull / 2 }}
        >
          <span className="inline-block pt-2">
            {refreshing
              ? "Refreshing…"
              : pull >= PULL_TRIGGER
                ? "Release to refresh"
                : "Pull to refresh"}
          </span>
        </output>
      ) : null}
      <LicenseNotice />
      <QuarantineBanner />
      <RejectedChangesBanner />

      <main
        id="main-content"
        className="flex flex-1 flex-col gap-3 px-4 py-3 pb-24"
      >
        {children}
      </main>

      <nav
        aria-label="Main"
        className="mobile-safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-surface-container bg-surface-container-lowest"
      >
        <div className="mx-auto flex max-w-lg items-stretch">
          {visible.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 text-body-sm font-semibold transition-colors ${
                  active ? "text-secondary" : "text-on-surface-variant"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1 w-6 rounded-full ${
                    active ? "bg-secondary" : "bg-transparent"
                  }`}
                />
                <span className="max-w-full truncate px-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
