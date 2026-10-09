"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FinanceWorkspace } from "@/components/finance/FinanceWorkspace";
import { MobileAppShell } from "@/components/MobileAppShell";
import { canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/**
 * Tagihan dan uang masuk versi Mobile. Isinya komponen yang sama dengan Web-Desktop
 * (`filesToCopy`); yang berbeda hanya kerangka layar dan guard-nya.
 */
export default function FinancePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canView = canAccessArea(user, "finance");

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canView) router.replace("/");
  }, [authLoading, isAuthenticated, canView, router]);

  if (authLoading || !isAuthenticated || !canView)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Finance">
      <FinanceWorkspace />
    </MobileAppShell>
  );
}
