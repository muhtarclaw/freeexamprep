import { NextResponse } from "next/server";
import { z } from "zod";

import { getProfile } from "@/lib/auth";
import { ROLE_TO_ID } from "@/lib/role-map";
import { getAdminSupabaseClient } from "@/utils/supabase/admin";

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
  lastname: z.string().min(1).optional(),
  role: z.enum(["super_admin", "admin", "student"]).default("admin")
});

export async function POST(request: Request) {
  try {
    const currentUser = await getProfile();

    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createAdminSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid user payload." }, { status: 400 });
    }

    const adminSupabase = getAdminSupabaseClient();
    const displayName =
      parsed.data.name || parsed.data.email.split("@")[0] || "User";

    const { data, error } = await adminSupabase.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: {
        name: displayName,
        lastname: parsed.data.lastname || ""
      },
      app_metadata: {
        role: parsed.data.role
      }
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Could not create user." },
        { status: 400 }
      );
    }

    const { error: userTableError } = await adminSupabase.from("users").upsert(
      {
        id: data.user.id,
        email: parsed.data.email,
        name: displayName,
        lastname: parsed.data.lastname || null,
        role_id: ROLE_TO_ID[parsed.data.role]
      },
      { onConflict: "id" }
    );

    if (userTableError) {
      return NextResponse.json({ error: userTableError.message }, { status: 500 });
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: parsed.data.email,
        name: displayName,
        lastname: parsed.data.lastname || null,
        role: parsed.data.role
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not create admin user."
      },
      { status: 500 }
    );
  }
}
