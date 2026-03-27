"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import type { Asset } from "@/data/mock-assets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
  livePrice: number;
  liveChange: number;
  onBuy: (asset: Asset) => void;
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
}

export function AssetCard({ asset, livePrice, liveChange, onBuy }: AssetCardProps) {
  const { locale } = useLanguageStore();
  const positive = liveChange >= 0;

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="p-4 bg-[#1a2d47] border-white/10 hover:border-white/20 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#d4a843]">{asset.symbol}</span>
              <span className="text-xs text-white/50 truncate">
                {locale === "he" ? asset.nameHe : asset.name}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <motion.span
                key={livePrice.toFixed(2)}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-lg font-bold text-white"
              >
                ${livePrice.toFixed(2)}
              </motion.span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  positive ? "text-[#22c55e]" : "text-red-400"
                }`}
              >
                {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {positive ? "+" : ""}
                {liveChange.toFixed(2)}%
              </span>
            </div>
          </div>

          <MiniSparkline data={asset.sparkline} positive={positive} />

          <Button
            size="sm"
            onClick={() => onBuy(asset)}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white shrink-0"
          >
            {t(locale, "buy")}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
