"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

import { formatCurrency } from "@/lib/utils";

const presets = [5, 15, 30, 50];

type PayPalSupportProps = {
  clientId: string;
  currency: string;
  configured: boolean;
};

export function PayPalSupport({
  clientId,
  currency,
  configured
}: PayPalSupportProps) {
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const activeAmount =
    customAmount.trim().length > 0 ? Number.parseFloat(customAmount) : selectedAmount;

  const canRenderButtons = useMemo(
    () =>
      Boolean(
        configured &&
          scriptReady &&
          name.trim() &&
          email.trim() &&
          Number.isFinite(activeAmount) &&
          activeAmount >= 1
      ),
    [activeAmount, configured, scriptReady, name, email]
  );

  useEffect(() => {
    if (!canRenderButtons || !window.paypal || !buttonContainerRef.current) {
      return;
    }

    buttonContainerRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal"
        },
        createOrder: async () => {
          setMessage("");
          try {
            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                amount: activeAmount,
                currency,
                message: note
              })
            });

            const data = (await response.json()) as {
              error?: string;
              orderId?: string;
            };

            if (!response.ok || !data.orderId) {
              throw new Error(data.error || "Unable to create PayPal order.");
            }

            return data.orderId;
          } catch (error) {
            const message =
              error instanceof Error && error.message
                ? error.message
                : "Unable to create PayPal order.";
            setMessage(message);
            throw error;
          }
        },
        onApprove: async ({ orderID }) => {
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: orderID,
              name,
              email,
              amount: activeAmount,
              currency,
              message: note
            })
          });

          const data = (await response.json()) as { error?: string; message?: string };

          if (!response.ok) {
            setMessage(data.error || "Payment capture failed.");
            return;
          }

          setPaymentComplete(true);
          setMessage(data.message || "Thank you for supporting the platform.");
        },
        onError: (error) => {
          const fallback = "PayPal could not start. Please try again.";
          const message =
            error instanceof Error && error.message ? error.message : fallback;
          setMessage(message);
        }
      })
      .render(buttonContainerRef.current);
  }, [activeAmount, canRenderButtons, currency, email, name, note]);

  return (
    <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="grid gap-3 sm:grid-cols-5">
        {presets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              setSelectedAmount(amount);
              setCustomAmount("");
            }}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              customAmount.length === 0 && selectedAmount === amount
                ? "border-amber-300 bg-amber-300/10 text-amber-100"
                : "border-white/10 bg-slate-950/70 text-slate-300"
            }`}
          >
            {formatCurrency(amount)}
          </button>
        ))}
        <div
          className={`rounded-2xl border px-4 py-3 transition ${
            customAmount.length > 0
              ? "border-amber-300 bg-amber-300/10"
              : "border-white/10 bg-slate-950/70"
          }`}
        >
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Other
          </label>
          <input
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            value={customAmount}
            onChange={(event) => setCustomAmount(event.target.value)}
            className="w-full bg-transparent text-left text-lg text-white outline-none placeholder:text-sm placeholder:text-slate-500"
            placeholder="$"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Message</label>
        <textarea
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          placeholder="Optional encouragement for the project."
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4">
        <p className="text-sm text-slate-300">Support amount</p>
        <p className="mt-1 text-2xl font-semibold text-white">
          {Number.isFinite(activeAmount) && activeAmount >= 1
            ? formatCurrency(activeAmount)
            : "Enter at least $1"}
        </p>
      </div>

      {configured ? (
        <>
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=capture&components=buttons`}
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />

          {!name.trim() || !email.trim() ? (
            <p className="text-sm text-slate-300">
              Enter your name and email to enable the PayPal button.
            </p>
          ) : !Number.isFinite(activeAmount) || activeAmount < 1 ? (
            <p className="text-sm text-slate-300">
              Enter a support amount of at least $1 to enable PayPal.
            </p>
          ) : null}

          <div
            ref={buttonContainerRef}
            className={paymentComplete ? "pointer-events-none opacity-60" : ""}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-amber-300/30 bg-amber-300/10 px-4 py-4 text-sm text-amber-100">
          Add your PayPal API credentials to `.env.local` to enable live checkout.
        </div>
      )}

      {message ? <p className="text-sm text-amber-100">{message}</p> : null}
    </div>
  );
}
