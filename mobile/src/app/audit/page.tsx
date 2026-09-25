"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuditLog } from "@/components/audit/AuditLog";
import { MobileAppShell } from "@/components/MobileAppShell";
import { canAccessArea } from "@/lib/auth/access";
import { useAuth } from "@/lib/context/AuthContext";

/** Log audit versi Mobile; isinya komponen yang sama dengan Web-Desktop. */
export default function AuditPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const canView = canAccessArea(user, "audit");

  // Static export tidak punya rute /forbidden; `/` meneruskan ke `landingPath`.
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!canView) router.replace("/");
  }, [authLoading, isAuthenticated, canView, router]);

  if (authLoading || !isAuthenticated || !canView)
    return <div className="min-h-dvh" />;

  return (
    <MobileAppShell title="Audit">
      <AuditLog />
    </MobileAppShell>
  );
}
