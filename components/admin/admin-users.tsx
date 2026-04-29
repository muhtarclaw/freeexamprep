"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  lastname: string | null;
  role: string;
  created_at: string;
};

type Props = { users: User[] };

export function AdminUsers({ users }: Props) {
  const [roleUpdates, setRoleUpdates] = useState<Record<string, string>>({});

  async function updateRole(userId: string) {
    const newRole = roleUpdates[userId];
    if (!newRole) return;

    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
        alert("Rolle konnte nicht aktualisiert werden.");
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Nutzer</h2>
      </div>
      <div className="editorial-card overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left">
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Name</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">E-Mail</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Rolle</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Registriert</th>
                <th className="px-6 py-4 font-semibold text-[color:var(--ink-soft)]">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[color:var(--ink-soft)]">
                    Keine Nutzer gefunden.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[color:var(--surface-soft)]">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[color:var(--foreground)]">
                        {user.name} {user.lastname ?? ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[color:var(--ink-soft)]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "super_admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-50 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[color:var(--ink-soft)]">
                      {new Date(user.created_at).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={roleUpdates[user.id] ?? user.role}
                          onChange={(e) => setRoleUpdates({ ...roleUpdates, [user.id]: e.target.value })}
                          className="rounded-xl border border-[var(--line)] bg-[color:var(--panel)] px-3 py-1.5 text-sm text-[color:var(--foreground)]"
                        >
                          <option value="student">student</option>
                          <option value="admin">admin</option>
                          <option value="super_admin">super_admin</option>
                        </select>
                        <button
                          onClick={() => updateRole(user.id)}
                          className="rounded-full bg-[color:var(--brand)] px-4 py-1.5 text-xs font-semibold text-white transition hover:scale-[1.02]"
                        >
                          Speichern
                        </button>
                      </div>
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