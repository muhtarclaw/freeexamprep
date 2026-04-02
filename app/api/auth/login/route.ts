import { NextResponse } from "next/server";

import { loginSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid login data." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: data.user.id,
        name:
          typeof data.user.user_metadata?.name === "string"
            ? data.user.user_metadata.name
            : data.user.email?.split("@")[0] || "Student",
        email: data.user.email
      }
    });
  } catch {
    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
