import { NextResponse } from "next/server";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const profile = await getProfile();

  if (!profile || (profile.role !== "admin" && profile.role !== "super_admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { role } = body as { role: string };

  if (!["student", "admin", "super_admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Rolle aktualisiert." });
}