import { NextResponse } from "next/server";

const FALLBACK_RESPONSE = {
  body: "To dare is to lose ones footing momentarily. To not dare is to lose oneself.",
  author: "Søren Kierkegaard",
};
// 👇 Force Node.js runtime (not Edge) — even in dev
export const runtime = "nodejs";

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }

  try {
    const response = await fetch("https://favqs.com/api/qotd");

    const data = await response.json();
    return NextResponse.json(data.quote); // Return quote
  } catch (err) {
    console.error("Quote fetch error:", err);
    console.warn("All fetch attempts failed. Returning fallback data.");
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }
}
