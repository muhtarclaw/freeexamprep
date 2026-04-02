import { NextResponse } from "next/server";

import { paypalFetch, isPayPalConfigured } from "@/lib/paypal";
import { supportSchema } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

type CreateOrderResponse = {
  id: string;
  status: string;
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

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid support details." }, { status: 400 });
    }

    const order = await paypalFetch<CreateOrderResponse>("/v2/checkout/orders", {
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "ExamFlow support",
            amount: {
              currency_code: body.currency || "USD",
              value: parsed.data.amount.toFixed(2)
            }
          }
        ]
      }
    });

    const supabase = await createClient();
    const { error } = await supabase.from("support_contributions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      amount: parsed.data.amount,
      currency: body.currency || "USD",
      message: parsed.data.message || "",
      provider: "paypal",
      status: "created",
      paypalOrderId: order.id
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orderId: order.id });
  } catch {
    return NextResponse.json({ error: "Unable to create PayPal order." }, { status: 500 });
  }
}
