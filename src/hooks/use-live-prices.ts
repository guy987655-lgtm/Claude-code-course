"use client";

import { useState, useEffect, useCallback } from "react";
import { mockAssets } from "@/data/mock-assets";

export function useLivePrices() {
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    mockAssets.forEach((a) => (initial[a.id] = a.price));
    return initial;
  });

  const [changes, setChanges] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    mockAssets.forEach((a) => (initial[a.id] = a.change));
    return initial;
  });

  const tick = useCallback(() => {
    setPrices((prev) => {
      const next = { ...prev };
      mockAssets.forEach((asset) => {
        const volatility = 0.03; // ±3%
        const change = (Math.random() - 0.5) * 2 * volatility;
        next[asset.id] = Math.max(1, prev[asset.id] * (1 + change));
      });
      return next;
    });

    setChanges((prev) => {
      const next = { ...prev };
      mockAssets.forEach((asset) => {
        next[asset.id] = prev[asset.id] + (Math.random() - 0.5) * 0.4;
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [tick]);

  return { prices, changes };
}
