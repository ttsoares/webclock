import { NextResponse } from "next/server";

// 👇 Force Node.js runtime (not Edge) — even in dev
export const runtime = "nodejs";

const FALLBACK_RESPONSE = {
  utc_offset: "-03:00",
  timezone: "America/Sao_Paulo",
  day_of_week: 2,
  day_of_year: 210,
  datetime: "2025-07-29T11:52:00.817150-03:00",
  utc_datetime: "2025-07-29T14:52:00.817150+00:00",
  unixtime: 1753800720,
  raw_offset: -10800,
  week_number: 31,
  dst: false,
  abbreviation: "-03",
  dst_offset: 0,
  dst_from: null,
  dst_until: null,
  client_ip: "196.212.17.56",
};

async function fetchWithRetry(
  url: string,
  retries: number = 1,
  delayMs: number = 1000
): Promise<unknown> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response not ok: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, retries - 1, delayMs);
    } else {
      throw error;
    }
  }
}

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }

  try {
    const data = await fetchWithRetry(
      "http://worldtimeapi.org/api/ip",
      5,
      2000
    );
    return NextResponse.json(data);
  } catch (err) {
    console.log("Error fetching time:", err);
    console.warn("All fetch attempts failed. Returning fallback data.");
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }
}
