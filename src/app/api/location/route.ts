import { NextResponse } from "next/server";

const FALLBACK_RESPONSE = {
  ip: "196.212.17.56",
  hostname: "196.212.17.56.terra.br",
  city: "Olinda",
  region: "Bahia",
  country: "BR",
  loc: "-19.6221,-49.1069",
  org: "AS36321 Terra Net Ltda",
  postal: "91200-000",
  timezone: "America/Sao_Paulo",
};

// 👇 Force Node.js runtime (not Edge) — even in dev
export const runtime = "nodejs";

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }

  try {
    const token = process.env.REACT_APP_IPINFO_TOKEN;

    const res = await fetch(`http://ipinfo.io?token=${token}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
