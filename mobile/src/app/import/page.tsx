"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SheetImport } from "@/components/imports/SheetImport";
import { MobileAppShell } from "@/components/MobileAppShell";
import { hasPermission } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/**
 * Impor CSV sheet lama versi Mobile (v2.7, PRD F-22). Isinya komponen yang
 * sama dengan Web-Desktop (`filesToCopy`); yang berbeda hanya kerangka layar
 * dan guard-nya.
 */
export default function SheetImportPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canImport =
    hasPermission(user, "finance.manage") ||
    hasPermission(user, "rnd.manage") ||
    hasPermission(user, "design.manage");

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
