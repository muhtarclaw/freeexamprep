import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    const body = await request.json();
    const { quizType, quizId, correctCount, totalCount } = body as {
      quizType: string;
      quizId: string;
      correctCount: number;
      totalCount: number;
    };

    if (!quizType || !quizId || totalCount === 0) {
      return NextResponse.json({ error: "Invalid activity data." }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("quiz_activities").insert({
      user_id: session?.userId ?? null,
      quiz_type: quizType,
      quiz_id: String(quizId),
      correct_count: correctCount,
      total_count: totalCount,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Activity logged." });
  } catch {
    return NextResponse.json({ error: "Could not log activity." }, { status: 500 });
  }
}
