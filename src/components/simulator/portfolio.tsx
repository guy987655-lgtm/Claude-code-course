"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator-store";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Briefcase } from "lucide-react";

interface PortfolioProps {
  prices: Record<string, number>;
  onSell: (asset: { id: string; symbol: string }, currentPrice: number) => void;
}

export function Portfolio({ prices, onSell }: PortfolioProps) {
  const { portfolio } = useSimulatorStore();
  const { locale } = useLanguageStore();

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-[#d4a843]" />
        {t(locale, "myPortfolio")}
      </h3>

      {portfolio.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-white/15" />
          </div>
          <p className="text-white/30 text-sm">{t(locale, "noAssets")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {portfolio.map((item) => {
              const currentPrice = prices[item.assetId] ?? item.avgPrice;
              const currentValue = currentPrice * item.quantity;
              const costBasis = item.avgPrice * item.quantity;
              const pnl = currentValue - costBasis;
              const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
              const positive = pnl >= 0;

              return (
                <motion.div
                  key={item.assetId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-[#d4a843] bg-[#d4a843]/10 px-2 py-0.5 rounded-md text-sm">
                            {item.symbol}
                          </span>
                          <span className="text-xs text-white/40">
                            {item.quantity} {t(locale, "shares")}
                          </span>
                        </div>
                        <div className="flex gap-4 mt-1.5 text-[11px] text-white/30">
                          <span>
                            {t(locale, "avgPrice")}: <span className="text-white/50">${item.avgPrice.toFixed(2)}</span>
                          </span>
                          <span>
                            {t(locale, "currentValue")}: <span className="text-white/50">${currentValue.toFixed(2)}</span>
                          </span>
                        </div>
                      </div>

                      <motion.div
                        key={pnl.toFixed(2)}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg ${
                          positive
                            ? "text-[#22c55e] bg-[#22c55e]/10"
                            : "text-red-400 bg-red-400/10"
                        }`}
                      >
                        {positive ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        <span className="tabular-nums">
                          {positive ? "+" : ""}${Math.abs(pnl).toFixed(2)}
                        </span>
                        <span className="text-[10px] opacity-60">
                          ({pnlPercent.toFixed(1)}%)
                        </span>
                      </motion.div>

                      <Button
                        size="sm"
                        onClick={() =>
                          onSell({ id: item.assetId, symbol: item.symbol }, currentPrice)
                        }
                        className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent shrink-0 rounded-xl transition-all duration-300 font-semibold"
                      >
                        {t(locale, "sell")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
