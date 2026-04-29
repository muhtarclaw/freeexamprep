import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/utils/supabase/config";
import type { AppRole } from "@/lib/role-map";

export type SessionUser = {
  userId: string;
  email: string;
  name: string;
  role: AppRole;
};

export type ProfileUser = SessionUser;

export async function getSession() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email || "",
    name:
      typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : user.email?.split("@")[0] || "Student",
    role:
      user.app_metadata?.role === "super_admin"
        ? "super_admin"
        : user.app_metadata?.role === "admin"
          ? "admin"
          : "student"
  } satisfies SessionUser;
}

export async function getProfile() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("name, email, lastname, role")
    .eq("id", session.userId)
    .maybeSingle();

  return {
    ...session,
    name:
      typeof data?.name === "string" && data.name.length > 0
        ? data.name
        : session.name,
    email:
      typeof data?.email === "string" && data.email.length > 0
        ? data.email
        : session.email,
    role: (data?.role as AppRole) || session.role
  } satisfies ProfileUser;
}
