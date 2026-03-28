"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import type { Asset } from "@/data/mock-assets";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
  livePrice: number;
  liveChange: number;
  onBuy: (asset: Asset) => void;
}

function MiniSparkline({ data, positive, id }: { data: number[]; positive: boolean; id: string }) {
  if (data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 36;
  const w = 90;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const color = positive ? "#22c55e" : "#ef4444";
  const gradId = `grad-${id}`;

  return (
    <svg width={w} height={h} className="opacity-50">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#${gradId})`}
        points={`0,${h} ${points} ${w},${h}`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function AssetCard({ asset, livePrice, liveChange, onBuy }: AssetCardProps) {
  const { locale } = useLanguageStore();
  const positive = liveChange >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-r from-white/[0.04] to-transparent hover:border-white/[0.12] hover:from-white/[0.06] transition-all duration-300 p-4">
        {/* Subtle glow on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          positive ? "bg-[#22c55e]/[0.02]" : "bg-red-500/[0.02]"
        }`} />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-[#d4a843] bg-[#d4a843]/10 px-2 py-0.5 rounded-md">
                {asset.symbol}
              </span>
              <span className="text-xs text-white/40 truncate">
                {locale === "he" ? asset.nameHe : asset.name}
              </span>
            </div>
            <div className="flex items-center gap-2.5 mt-2">
              <motion.span
                key={livePrice.toFixed(2)}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-white tabular-nums"
              >
                ${livePrice.toFixed(2)}
              </motion.span>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  positive
                    ? "text-[#22c55e] bg-[#22c55e]/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {positive ? "+" : ""}
                {liveChange.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <MiniSparkline data={asset.sparkline} positive={positive} id={asset.id} />
          </div>

          <Button
            size="sm"
            onClick={() => onBuy(asset)}
            className="bg-[#22c55e]/15 hover:bg-[#22c55e] text-[#22c55e] hover:text-white border border-[#22c55e]/30 hover:border-transparent shrink-0 rounded-xl transition-all duration-300 font-semibold"
          >
            {t(locale, "buy")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
