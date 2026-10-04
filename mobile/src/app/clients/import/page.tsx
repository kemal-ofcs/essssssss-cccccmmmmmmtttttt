"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClientImport } from "@/components/clients/ClientImport";
import { MobileAppShell } from "@/components/MobileAppShell";
import { canAccessArea, hasPermission } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/**
 * Impor CSV klien versi Mobile (PRD FR-09). Isinya komponen yang sama dengan
 * Web-Desktop (`filesToCopy`); yang berbeda hanya kerangka layar dan guard-nya.
 */
export default function ClientImportPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canImport =
    canAccessArea(user, "clients") &&
    hasPermission(user, "clients.manage") &&
    hasPermission(user, "leads.reassign");

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canImport) router.replace("/");
  }, [authLoading, isAuthenticated, canImport, router]);

  if (authLoading || !isAuthenticated || !canImport)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Import clients">
      <ClientImport />
    </MobileAppShell>
  );
}
