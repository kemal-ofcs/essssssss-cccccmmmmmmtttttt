"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MobileAppShell } from "@/components/MobileAppShell";
import { ProductionWorkspace } from "@/components/production/ProductionWorkspace";
import { canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/**
 * Work order produksi versi Mobile (v3.1). Isinya komponen yang sama dengan Web-Desktop
 * (`filesToCopy`); yang berbeda hanya kerangka layar dan guard-nya.
 */
export default function ProductionPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canView = canAccessArea(user, "production");

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canView) router.replace("/");
  }, [authLoading, isAuthenticated, canView, router]);

  if (authLoading || !isAuthenticated || !canView)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Production">
      <ProductionWorkspace />
    </MobileAppShell>
  );
}
