import { Users, Activity, HeartHandshake, TrendingUp } from "lucide-react";

type Props = {
  userCount: number;
  activityCount: number;
  contributionCount: number;
  totalRaised: number;
};

export function AdminStats({ userCount, activityCount, contributionCount, totalRaised }: Props) {
  const stats = [
    {
      icon: Users,
      label: "Registrierte Nutzer",
      value: userCount,
      color: "var(--brand)",
    },
    {
      icon: Activity,
      label: "Quiz-Aktivitäten",
      value: activityCount,
      color: "var(--accent)",
    },
    {
      icon: HeartHandshake,
      label: "Unterstützungen",
      value: contributionCount,
      color: "var(--status-success)",
    },
    {
      icon: TrendingUp,
      label: "Gesamteinnahmen",
      value: `€${totalRaised.toFixed(2)}`,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="editorial-card rounded-[1.5rem] p-6">
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `color-mix(in_srgb, ${stat.color} 12%, transparent)`, color: stat.color }}
          >
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-[color:var(--foreground)]">{stat.value}</p>
          <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}