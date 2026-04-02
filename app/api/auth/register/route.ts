import { NextResponse } from "next/server";

import { registerSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration data." }, { status: 400 });
    }

    const lastname =
      typeof parsed.data.lastname === "string" && parsed.data.lastname.trim().length > 0
        ? parsed.data.lastname.trim()
        : undefined;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          name: parsed.data.name,
          lastname
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: "Registration successful.",
      user: {
        id: data.user?.id,
        name: parsed.data.name,
        lastname: lastname || null,
        email: parsed.data.email
      }
    });
  } catch {
    return NextResponse.json({ error: "Unable to register right now." }, { status: 500 });
  }
}
