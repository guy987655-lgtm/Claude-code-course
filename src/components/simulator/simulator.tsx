"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { useSimulatorStore } from "@/store/simulator-store";
import { useLivePrices } from "@/hooks/use-live-prices";
import { t } from "@/lib/i18n";
import { Wallet } from "./wallet";
import { AssetList } from "./asset-list";
import { Portfolio } from "./portfolio";
import { TradeDialog } from "./trade-dialog";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/data/mock-assets";
import { RotateCcw, BarChart3 } from "lucide-react";

interface TradeState {
  open: boolean;
  mode: "buy" | "sell";
  assetId: string;
  symbol: string;
  price: number;
}

export function Simulator() {
  const { locale } = useLanguageStore();
  const { reset } = useSimulatorStore();
  const { prices, changes } = useLivePrices();

  const [trade, setTrade] = useState<TradeState>({
    open: false,
    mode: "buy",
    assetId: "",
    symbol: "",
    price: 0,
  });

  const handleBuy = (asset: Asset) => {
    setTrade({
      open: true,
      mode: "buy",
      assetId: asset.id,
      symbol: asset.symbol,
      price: prices[asset.id] ?? asset.price,
    });
  };

  const handleSell = (asset: { id: string; symbol: string }, currentPrice: number) => {
    setTrade({
      open: true,
      mode: "sell",
      assetId: asset.id,
      symbol: asset.symbol,
      price: currentPrice,
    });
  };

  return (
    <section id="simulator" className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3a] via-[#0f2744] to-[#0a1929]" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#d4a843]/20 border border-[#22c55e]/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {t(locale, "simulatorTitle")}
                </h2>
                <p className="text-xs text-white/30">
                  {t(locale, "simulatorSubtitle")}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-white/30 hover:text-white hover:bg-white/5 gap-2 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t(locale, "resetPortfolio")}
            </Button>
          </div>

          <div className="space-y-6">
            <Wallet prices={prices} />
            <AssetList prices={prices} changes={changes} onBuy={handleBuy} />
            <Portfolio prices={prices} onSell={handleSell} />
          </div>
        </motion.div>
      </div>

      <TradeDialog
        open={trade.open}
        onClose={() => setTrade((s) => ({ ...s, open: false }))}
        mode={trade.mode}
        assetId={trade.assetId}
        symbol={trade.symbol}
        currentPrice={trade.price}
      />
    </section>
  );
}
