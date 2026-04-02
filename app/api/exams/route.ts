import { NextResponse } from "next/server";

import { sampleExams } from "@/lib/sample-data";

export async function GET() {
  return NextResponse.json(sampleExams);
}
