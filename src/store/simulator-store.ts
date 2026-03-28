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
}

export function getPortfolioItem(portfolio: PortfolioItem[], assetId: string): PortfolioItem | undefined {
  return portfolio.find((p) => p.assetId === assetId);
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      portfolio: [],

      buy: (assetId, symbol, price, quantity) => {
        const cost = price * quantity;
        const state = get();
        if (cost > state.balance || quantity <= 0) return false;

        const existing = state.portfolio.find((p) => p.assetId === assetId);

        if (existing) {
          const newQty = existing.quantity + quantity;
          const newAvg =
            (existing.avgPrice * existing.quantity + price * quantity) / newQty;

          set((s) => ({
            balance: s.balance - cost,
            portfolio: s.portfolio.map((p) =>
              p.assetId === assetId
                ? { ...p, quantity: newQty, avgPrice: newAvg }
                : p
            ),
          }));
        } else {
          set((s) => ({
            balance: s.balance - cost,
            portfolio: [
              ...s.portfolio,
              { assetId, symbol, quantity, avgPrice: price },
            ],
          }));
        }
        return true;
      },

      sell: (assetId, price, quantity) => {
        const state = get();
        const existing = state.portfolio.find((p) => p.assetId === assetId);
        if (!existing || quantity > existing.quantity || quantity <= 0) return false;

        const revenue = price * quantity;
        const newQty = existing.quantity - quantity;

        set((s) => ({
          balance: s.balance + revenue,
          portfolio:
            newQty === 0
              ? s.portfolio.filter((p) => p.assetId !== assetId)
              : s.portfolio.map((p) =>
                  p.assetId === assetId ? { ...p, quantity: newQty } : p
                ),
        }));
        return true;
      },

      reset: () => set({ balance: INITIAL_BALANCE, portfolio: [] }),
    }),
    { name: "simulator-store" }
  )
);
