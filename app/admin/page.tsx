import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Users, WalletCards, Files } from "lucide-react";

import { getProfile } from "@/lib/auth";

export default async function AdminPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "admin" && profile.role !== "super_admin") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/10 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
          Admin Area
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Welcome back, {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-200">
          This page is protected and only visible to users whose profile role is
          set to `admin` in Supabase.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
          <span className="rounded-full border border-white/10 px-4 py-2">
            {profile.email}
          </span>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-emerald-100">
            Role: {profile.role}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Users,
            title: "Users",
            copy: "Manage learner accounts and promote trusted moderators."
          },
          {
            icon: Files,
            title: "Uploads",
            copy: "Review submitted documents before approving them for use."
          },
          {
            icon: WalletCards,
            title: "Support",
            copy: "Track PayPal contributions that help keep the platform free."
          },
          {
            icon: ShieldCheck,
            title: "Security",
            copy: "Use this area for future admin-only tools and monitoring."
          }
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <item.icon className="h-6 w-6 text-amber-300" />
            <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="text-lg font-semibold text-white">Next setup steps</p>
        <p className="mt-3 text-slate-300">
          Run the SQL in `supabase/schema.sql`, set your service role key in
          `.env.local`, then run `npm run create:admin` to ensure your admin user
          and profile row exist.
        </p>
        <Link
          href="/support"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
