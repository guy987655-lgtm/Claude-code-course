import { NextResponse } from "next/server";
import { mockAssets } from "@/data/mock-assets";

const SYMBOLS = mockAssets.map((a) => a.symbol).join(",");

export async function GET() {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Yahoo Finance error");

    const data = await res.json();
    const quotes: { symbol: string; regularMarketPrice: number }[] =
      data.quoteResponse?.result ?? [];

    const prices: Record<string, number> = {};
    quotes.forEach((q) => {
      prices[q.symbol.toLowerCase()] = q.regularMarketPrice;
    });

    return NextResponse.json(prices);
  } catch {
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }
}
