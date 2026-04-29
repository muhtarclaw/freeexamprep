import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Activity, HeartHandshake, BarChart3, ArrowLeft } from "lucide-react";

import { getProfile } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminUsers } from "@/components/admin/admin-users";
import { AdminActivities } from "@/components/admin/admin-activities";
import { AdminContributions } from "@/components/admin/admin-contributions";

export default async function AdminDashboardPage() {
  const profile = await getProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "admin" && profile.role !== "super_admin") redirect("/");

  const supabase = await createClient();

  // Fetch counts and recent data in parallel
  const [
    usersResult,
    activitiesResult,
    contributionsResult,
  ] = await Promise.all([
    supabase.from("users").select("id, email, name, lastname, role, created_at").order("created_at", { ascending: false }).limit(20),
    supabase.from("quiz_activities").select("id, quiz_type, quiz_id, correct_count, total_count, completed_at, user_id").order("completed_at", { ascending: false }).limit(20),
    supabase.from("support_contributions").select("id, name, email, amount, currency, status, created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  const users = usersResult.data ?? [];
  const activities = activitiesResult.data ?? [];
  const contributions = contributionsResult.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-[color:var(--brand)] px-3 py-1 text-xs font-bold text-white">
              Admin
            </span>
            <span className="text-xs text-[color:var(--ink-soft)]">
              angemeldet als <strong>{profile.email}</strong>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[color:var(--foreground)] font-serif">
            Dashboard
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--foreground)] transition"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Seite
        </Link>
      </div>

      {/* Stats */}
      <AdminStats
        userCount={users.length}
        activityCount={activities.length}
        contributionCount={contributions.length}
        totalRaised={contributions.reduce((sum, c) => sum + Number(c.amount), 0)}
      />

      {/* Users Table */}
      <AdminUsers users={users} />

      {/* Recent Quiz Activities */}
      <AdminActivities activities={activities} />

      {/* Recent Support Contributions */}
      <AdminContributions contributions={contributions} />
    </div>
  );
}