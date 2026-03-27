"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_BALANCE } from "@/lib/constants";

export interface PortfolioItem {
  assetId: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
}

interface SimulatorState {
  balance: number;
  portfolio: PortfolioItem[];
  buy: (assetId: string, symbol: string, price: number, quantity: number) => boolean;
  sell: (assetId: string, price: number, quantity: number) => boolean;
  reset: () => void;
  getPortfolioItem: (assetId: string) => PortfolioItem | undefined;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      portfolio: [],

      buy: (assetId, symbol, price, quantity) => {
        const cost = price * quantity;
        if (cost > get().balance || quantity <= 0) return false;

        const existing = get().portfolio.find((p) => p.assetId === assetId);

        if (existing) {
          const newQty = existing.quantity + quantity;
          const newAvg =
            (existing.avgPrice * existing.quantity + price * quantity) / newQty;

          set({
            balance: get().balance - cost,
            portfolio: get().portfolio.map((p) =>
              p.assetId === assetId
                ? { ...p, quantity: newQty, avgPrice: newAvg }
                : p
            ),
          });
        } else {
          set({
            balance: get().balance - cost,
            portfolio: [
              ...get().portfolio,
              { assetId, symbol, quantity, avgPrice: price },
            ],
          });
        }
        return true;
      },

      sell: (assetId, price, quantity) => {
        const existing = get().portfolio.find((p) => p.assetId === assetId);
        if (!existing || quantity > existing.quantity || quantity <= 0) return false;

        const revenue = price * quantity;
        const newQty = existing.quantity - quantity;

        set({
          balance: get().balance + revenue,
          portfolio:
            newQty === 0
              ? get().portfolio.filter((p) => p.assetId !== assetId)
              : get().portfolio.map((p) =>
                  p.assetId === assetId ? { ...p, quantity: newQty } : p
                ),
        });
        return true;
      },

      reset: () => set({ balance: INITIAL_BALANCE, portfolio: [] }),

      getPortfolioItem: (assetId) =>
        get().portfolio.find((p) => p.assetId === assetId),
    }),
    { name: "simulator-store" }
  )
);
