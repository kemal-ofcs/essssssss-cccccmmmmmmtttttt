"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { landingPath } from "@/lib/auth/landing";
import { useAuth } from "@/lib/context/AuthContext";
import { useHydrated } from "@/lib/hooks/useHydrated";

/**
 * `/` tidak punya isi sendiri: ia meneruskan ke halaman pertama akun ini —
 * Pengaturan bila boleh (`landingPath`). Akun yang tidak boleh membuka apa
 * pun tetap mendapat penjelasan di sini, bukan dilempar ke halaman lain.
 */
export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const hydrated = useHydrated();
  const router = useRouter();
  const ready = hydrated && !isLoading;
  const target = isAuthenticated ? landingPath(user) : "/login";

  useEffect(() => {
    if (ready && target) router.replace(target);
  }, [ready, target, router]);

  if (!ready || target) {
    return (
      <AppShell>
        <p className="text-sm text-slate-400">Memuat...</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs leading-5 text-slate-400">
        Akun Anda belum memiliki hak akses ke modul mana pun. Hubungi Superadmin
        untuk penyesuaian role.
      </p>
    </AppShell>
  );
}
