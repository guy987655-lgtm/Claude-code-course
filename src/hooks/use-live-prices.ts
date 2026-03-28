"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { mockAssets } from "@/data/mock-assets";

function initPrices(): Record<string, number> {
  const initial: Record<string, number> = {};
  mockAssets.forEach((a) => (initial[a.id] = a.price));
  return initial;
}

export function useLivePrices() {
  const basePrices = useRef<Record<string, number>>(initPrices());

  const [prices, setPrices] = useState<Record<string, number>>(initPrices);

  const [changes, setChanges] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    mockAssets.forEach((a) => (initial[a.id] = a.change));
    return initial;
  });

  // Fetch real prices from Yahoo Finance on mount
  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data: Record<string, number>) => {
        if (data.error) return;
        // Reset base prices to real market prices
        basePrices.current = { ...basePrices.current, ...data };
        setPrices((prev) => ({ ...prev, ...data }));
        // Reset changes to 0 since we now have a fresh real baseline
        setChanges((prev) => {
          const next = { ...prev };
          Object.keys(data).forEach((id) => (next[id] = 0));
          return next;
        });
      })
      .catch(() => {
        // Silently fall back to mock prices
      });
  }, []);

  const tick = useCallback(() => {
    setPrices((prev) => {
      const next = { ...prev };
      const nextChanges: Record<string, number> = {};

      mockAssets.forEach((asset) => {
        const volatility = 0.003; // smaller fluctuation on top of real prices
        const change = (Math.random() - 0.5) * 2 * volatility;
        next[asset.id] = Math.max(1, prev[asset.id] * (1 + change));
        nextChanges[asset.id] =
          ((next[asset.id] - basePrices.current[asset.id]) /
            basePrices.current[asset.id]) *
          100;
      });

      setChanges(nextChanges);
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [tick]);

  return { prices, changes };
}
