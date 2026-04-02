import { NextResponse } from "next/server";

import { supportSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = supportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid support details." }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("support_contributions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      amount: parsed.data.amount,
      currency: "USD",
      message: parsed.data.message || "",
      provider: "paypal",
      status: "pending"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Support contribution saved."
    });
  } catch {
    return NextResponse.json({ error: "Unable to save support request." }, { status: 500 });
  }
}
