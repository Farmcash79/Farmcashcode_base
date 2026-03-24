type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

let cachedToken: CachedToken | null = null;

export async function getInterswitchAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  const clientId = process.env.INTERSWITCH_CLIENT_ID;
  const secretKey = process.env.INTERSWITCH_CLIENT_SECRET;
  const baseUrl =
    process.env.INTERSWITCH_PASSPORT_BASE_URL ??
    "https://passport-v2.k8.isw.la";

  if (!clientId || !secretKey) {
    throw new Error("Missing Interswitch client credentials");
  }

  const basic = Buffer.from(`${clientId}:${secretKey}`).toString("base64");

  const res = await fetch(
    `${baseUrl}/passport/oauth/token?grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get Interswitch access token: ${text}`);
  }

  const data = await res.json();

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token as string;
}

export async function confirmInterswitchTransaction(
  reference: string,
  amountKobo: number,
) {
  const token = await getInterswitchAccessToken();
  const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
  const baseUrl =
    process.env.INTERSWITCH_COLLECTION_BASE_URL ??
    "https://qa.interswitchng.com";

  if (!merchantCode) {
    throw new Error("Missing INTERSWITCH_MERCHANT_CODE");
  }

  const url = new URL(`${baseUrl}/collections/api/v1/gettransaction`);
  url.searchParams.set("merchantcode", merchantCode);
  url.searchParams.set("transactionreference", reference);
  url.searchParams.set("amount", String(amountKobo));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to confirm transaction: ${text}`);
  }

  return res.json();
}
