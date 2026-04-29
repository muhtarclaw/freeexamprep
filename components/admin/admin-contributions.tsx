type Contribution = {
  id: string;
  name: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
};

type Props = { contributions: Contribution[] };

export function AdminContributions({ contributions }: Props) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Letzte Unterstützungen</h2>
      </div>
      <div className="editorial-card overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left">
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Name</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">E-Mail</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Betrag</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Status</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Datum</th>
              </tr>
            </thead>
            <tbody>
              {contributions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[color:var(--ink-soft)]">
                    Noch keine Unterstützungen.
                  </td>
                </tr>
              ) : (
                contributions.map((c) => (
                  <tr key={c.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[color:var(--surface-soft)]">
                    <td className="px-6 py-4 font-medium text-[color:var(--foreground)]">{c.name}</td>
                    <td className="px-6 py-4 text-[color:var(--ink-soft)]">{c.email}</td>
                    <td className="px-6 py-4 font-semibold text-[color:var(--foreground)]">
                      {c.currency} {Number(c.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        c.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : c.status === "created"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-gray-50 text-gray-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[color:var(--ink-soft)]">
                      {new Date(c.created_at).toLocaleDateString("de-DE")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}