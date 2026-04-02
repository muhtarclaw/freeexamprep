import { PayPalSupport } from "@/components/paypal-support";
import { SectionTitle } from "@/components/section-title";
import { getPayPalClientId, isPayPalConfigured } from "@/lib/paypal";

export default function SupportPage() {
  const clientId = getPayPalClientId();
  const configured = isPayPalConfigured();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionTitle
          eyebrow="Support"
          title="Keep the platform completely free"
          description="Every learner can use ExamFlow for free. Support is optional and helps with hosting, content review, and expanding the question bank without adding paywalls."
        />
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
          <p className="font-medium text-white">Free first, support optional</p>
          <p className="mt-3 text-sm leading-7">
            Supporters can contribute directly with PayPal. We create the order on
            the server, capture it after approval, and store the result in Supabase.
          </p>
        </div>
      </div>

      <PayPalSupport clientId={clientId} currency="USD" configured={configured} />
    </div>
  );
}
