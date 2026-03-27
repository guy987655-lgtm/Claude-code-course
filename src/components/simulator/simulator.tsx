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
import { RotateCcw } from "lucide-react";

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
    <section id="simulator" className="bg-[#0f2744] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {t(locale, "simulatorTitle")}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-white/40 hover:text-white hover:bg-white/10 gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t(locale, "resetPortfolio")}
            </Button>
          </div>

          <div className="space-y-6">
            <Wallet />
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
