type Activity = {
  id: string;
  user_id: string | null;
  quiz_type: string;
  quiz_id: string;
  correct_count: number;
  total_count: number;
  completed_at: string;
};

type Props = { activities: Activity[] };

export function AdminActivities({ activities }: Props) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Letzte Quiz-Aktivitäten</h2>
      </div>
      <div className="editorial-card overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left">
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Quiz-Typ</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Quiz-ID</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Ergebnis</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Nutzer</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Zeit</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[color:var(--ink-soft)]">
                    Keine Aktivitäten protokolliert.
                  </td>
                </tr>
              ) : (
                activities.map((a) => {
                  const pct = Math.round((a.correct_count / a.total_count) * 100);
                  return (
                    <tr key={a.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[color:var(--surface-soft)]">
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[color:var(--brand)]/10 px-3 py-1 text-xs font-medium text-[color:var(--brand)]">
                          {a.quiz_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[color:var(--ink-soft)]">#{a.quiz_id}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${pct >= 70 ? "text-[color:var(--status-success)]" : pct >= 40 ? "text-[color:var(--brand)]" : "text-[color:var(--status-danger)]"}`}>
                          {a.correct_count}/{a.total_count} ({pct}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[color:var(--ink-soft)]">
                        {a.user_id ? a.user_id.slice(0, 8) + "…" : "Gast"}
                      </td>
                      <td className="px-6 py-4 text-[color:var(--ink-soft)]">
                        {new Date(a.completed_at).toLocaleString("de-DE")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}