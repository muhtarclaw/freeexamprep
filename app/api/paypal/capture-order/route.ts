import { NextResponse } from "next/server";

import { paypalFetch, isPayPalConfigured } from "@/lib/paypal";
import { supportSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

type CaptureResponse = {
  status: string;
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
      }>;
    };
  }>;
};

export async function POST(request: Request) {
  try {
    if (!isPayPalConfigured()) {
      return NextResponse.json(
        { error: "PayPal is not configured yet." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsed = supportSchema.safeParse(body);
    const orderId = typeof body.orderId === "string" ? body.orderId : "";

    if (!parsed.success || !orderId) {
      return NextResponse.json({ error: "Invalid capture details." }, { status: 400 });
    }

    const capture = await paypalFetch<CaptureResponse>(
      `/v2/checkout/orders/${orderId}/capture`,
      { body: {} }
    );

    const captureId =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.id || "";
    const captureStatus =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.status || capture.status;

    const supabase = await createClient();
    const { error } = await supabase
      .from("support_contributions")
      .update({
        name: parsed.data.name,
        email: parsed.data.email,
        amount: parsed.data.amount,
        currency: body.currency || "USD",
        message: parsed.data.message || "",
        provider: "paypal",
        paypalOrderId: orderId,
        paypalCaptureId: captureId,
        status: captureStatus.toLowerCase()
      })
      .eq("paypalOrderId", orderId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Payment completed. Thank you for supporting ExamFlow."
    });
  } catch {
    return NextResponse.json({ error: "Unable to capture PayPal payment." }, { status: 500 });
  }
}
