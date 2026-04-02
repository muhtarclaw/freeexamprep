import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { attemptSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Please log in first." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = attemptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid attempt data." }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("attempts").insert({
      user_id: session.userId,
      exam_id: parsed.data.examId,
      score: parsed.data.score,
      answers: parsed.data.answers
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Attempt saved.",
      score: parsed.data.score
    });
  } catch {
    return NextResponse.json({ error: "Could not save attempt." }, { status: 500 });
  }
}
