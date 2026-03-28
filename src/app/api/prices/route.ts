import { NextResponse } from "next/server";
import { mockAssets } from "@/data/mock-assets";

const SYMBOLS = mockAssets.map((a) => a.symbol);

async function fetchPrice(symbol: string): Promise<[string, number] | null> {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
    { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const price: number | undefined = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
  return price ? [symbol.toLowerCase(), price] : null;
}

export async function GET() {
  const results = await Promise.allSettled(SYMBOLS.map(fetchPrice));

  const prices: Record<string, number> = {};
  results.forEach((r) => {
    if (r.status === "fulfilled" && r.value) {
      const [id, price] = r.value;
      prices[id] = price;
    }
  });

  if (Object.keys(prices).length === 0) {
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
  }

  return NextResponse.json(prices);
}
