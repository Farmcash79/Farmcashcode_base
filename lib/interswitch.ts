import { z } from "zod";
import { envConfig } from "@/config/env.config";

type VerifyBvnInput = {
  bvn: string;
  phoneNumber?: string;
  dateOfBirth: string;
};

const tokenCache = {
  value: null as string | null,
  expiresAt: 0,
};

async function getAccessToken() {
  if (tokenCache.value && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.value;
  }

  const clientId = envConfig.interswitchClientId;
  const clientSecret = envConfig.interswitchClientSecret;
  const passportBaseUrl = envConfig.interswitchPassportBaseUrl;

  if (!clientId || !clientSecret || !passportBaseUrl) {
    throw new Error("Missing Interswitch auth environment variables");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(
    `${passportBaseUrl}/passport/oauth/token?grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get Interswitch access token");
  }

  const data = await res.json();

  tokenCache.value = data.access_token as string;
  tokenCache.expiresAt = Date.now() + Number(data.expires_in ?? 3600) * 1000;

  return tokenCache.value;
}

export async function verifyBvnWithInterswitch(input: VerifyBvnInput) {
  const baseUrl = envConfig.interswitchKYCBaseUrl;
  const verifyPath = envConfig.interswitchBVNVerifyPath;

  if (!baseUrl || !verifyPath) {
    throw new Error("Missing Interswitch BVN verification config");
  }

  const token = await getAccessToken();

  const payload = {
    bvn: input.bvn,
    phoneNumber: input.phoneNumber,
    dateOfBirth: input.dateOfBirth,
  };

  const res = await fetch(`${baseUrl}${verifyPath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const raw = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(raw?.message || "BVN verification failed");
  }

  return z
    .object({
      responseCode: z.string().optional(),
      responseMessage: z.string().optional(),
      data: z.any().optional(),
    })
    .parse(raw);
}

export async function confirmInterswitchTransaction(
  reference: string,
  amountKobo: number,
) {
  const token = await getAccessToken();
  const merchantCode = envConfig.interswitchMerchantCode;
  const baseUrl = envConfig.interswitchCollectionBaseUrl;

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
