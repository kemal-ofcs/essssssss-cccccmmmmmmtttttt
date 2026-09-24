"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { type AppArea, canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";
import { AutoSyncRunner } from "./AutoSyncRunner";
import { LicenseHolderLabel, LicenseNotice } from "./license/LicenseNotice";
import { SyncIndicator } from "./SyncIndicator";

interface NavItem {
  readonly area: AppArea;
  readonly href: string;
  readonly label: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { area: "items", href: "/items", label: "Items" },
  { area: "activity", href: "/activity", label: "Activity" },
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
 */
export function MobileAppShell({ children, title }: MobileAppShellProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const visible = NAV_ITEMS.filter((item) => canAccessArea(user, item.area));

  return (
    <div className="flex min-h-dvh flex-col bg-background text-on-surface">
      <AutoSyncRunner />
      <header className="sticky top-0 z-30 border-b border-surface-container bg-surface-container-lowest px-4 py-2 shadow-[0_1px_8px_rgb(0_0_0/0.04)]">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-headline-md font-bold text-on-surface">
            {title ?? "App Template"}
          </p>
          <SyncIndicator />
        </div>
        {user ? (
          <p className="mt-0.5 truncate text-body-sm text-on-surface-variant">
            {user.nama_operator} · {user.role}
          </p>
        ) : null}
        <LicenseHolderLabel className="mt-0.5 block truncate text-body-sm text-on-surface-variant" />
      </header>
      <LicenseNotice />

      <main
        id="main-content"
        className="flex min-h-0 flex-1 touch-pan-y flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-3 pb-24"
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
                className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-body-sm font-semibold transition-colors ${
                  active ? "text-secondary" : "text-on-surface-variant"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1 w-6 rounded-full ${
                    active ? "bg-secondary" : "bg-transparent"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
