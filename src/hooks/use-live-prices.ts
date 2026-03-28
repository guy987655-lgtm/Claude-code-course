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

  const tick = useCallback(() => {
    setPrices((prev) => {
      const next = { ...prev };
      const nextChanges: Record<string, number> = {};

      mockAssets.forEach((asset) => {
        const volatility = 0.03;
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
