"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardWorkspace } from "@/components/dashboard/DashboardWorkspace";
import { MobileAppShell } from "@/components/MobileAppShell";
import { canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/**
 * Dashboard versi Mobile (F-40a). Isinya komponen yang sama dengan
 * Web-Desktop (`filesToCopy`); yang berbeda hanya kerangka dan guard.
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canView = canAccessArea(user, "dashboard");

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canView) router.replace("/");
  }, [authLoading, isAuthenticated, canView, router]);

  if (authLoading || !isAuthenticated || !canView)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Dashboard">
      <DashboardWorkspace />
    </MobileAppShell>
  );
}
