const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_ENV = process.env.PAYPAL_ENV === "live" ? "live" : "sandbox";

function getPayPalApiBaseUrl() {
  return PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function getPayPalClientId() {
  return PAYPAL_CLIENT_ID || "";
}

export function isPayPalConfigured() {
  return Boolean(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET);
}

export async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal is not configured.");
  }

  const response = await fetch(`${getPayPalApiBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to authenticate with PayPal.");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export async function paypalFetch<T>(
  path: string,
  options?: {
    method?: "GET" | "POST";
    body?: unknown;
  }
) {
  const token = await getPayPalAccessToken();
  const response = await fetch(`${getPayPalApiBaseUrl()}${path}`, {
    method: options?.method || "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  const data = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? data.message
        : "PayPal request failed.";
    throw new Error(message || "PayPal request failed.");
  }

  return data;
}
