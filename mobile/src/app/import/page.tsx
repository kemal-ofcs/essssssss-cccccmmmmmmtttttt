"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SheetImport } from "@/components/imports/SheetImport";
import { MobileAppShell } from "@/components/MobileAppShell";
import { hasPermission } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";
import {
  SHEET_KINDS,
  sheetImportPermission,
} from "@/lib/validations/sheet-import";

/**
 * Impor CSV sheet lama versi Mobile (v2.7, PRD F-22). Isinya komponen yang
 * sama dengan Web-Desktop (`filesToCopy`); yang berbeda hanya kerangka layar
 * dan guard-nya.
 */
export default function SheetImportPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  // Satu jenis sheet yang boleh diimpor sudah cukup (`sheetImportPermission`).
  const canImport = SHEET_KINDS.some((kind) => {
    const permission = sheetImportPermission(kind);
    return permission !== null && hasPermission(user, permission);
  });

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canImport) router.replace("/");
  }, [authLoading, isAuthenticated, canImport, router]);

  if (authLoading || !isAuthenticated || !canImport)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Import sheets">
      <SheetImport />
    </MobileAppShell>
  );
}
