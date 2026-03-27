"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator-store";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Package } from "lucide-react";

interface PortfolioProps {
  prices: Record<string, number>;
  onSell: (asset: { id: string; symbol: string }, currentPrice: number) => void;
}

export function Portfolio({ prices, onSell }: PortfolioProps) {
  const { portfolio } = useSimulatorStore();
  const { locale } = useLanguageStore();

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3">{t(locale, "myPortfolio")}</h3>

      {portfolio.length === 0 ? (
        <Card className="p-8 bg-[#1a2d47] border-white/10 text-center">
          <Package className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">{t(locale, "noAssets")}</p>
        </Card>
      ) : (
        <div className="space-y-3">
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="p-4 bg-[#1a2d47] border-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#d4a843]">{item.symbol}</span>
                          <span className="text-xs text-white/50">
                            {item.quantity} {t(locale, "shares")}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 mt-1 text-xs text-white/50">
                          <span>
                            {t(locale, "avgPrice")}: ${item.avgPrice.toFixed(2)}
                          </span>
                          <span>
                            {t(locale, "currentValue")}: ${currentValue.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="text-end">
                        <motion.div
                          key={pnl.toFixed(2)}
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1 }}
                          className={`flex items-center gap-1 text-sm font-bold ${
                            positive ? "text-[#22c55e]" : "text-red-400"
                          }`}
                        >
                          {positive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {positive ? "+" : ""}${pnl.toFixed(2)} ({pnlPercent.toFixed(1)}%)
                        </motion.div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onSell({ id: item.assetId, symbol: item.symbol }, currentPrice)
                        }
                        className="border-red-400/50 text-red-400 hover:bg-red-400/10 shrink-0"
                      >
                        {t(locale, "sell")}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
