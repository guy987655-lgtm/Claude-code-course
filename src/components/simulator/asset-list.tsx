"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { mockAssets, type Asset, type AssetCategory } from "@/data/mock-assets";
import { AssetCard } from "./asset-card";

interface AssetListProps {
  prices: Record<string, number>;
  changes: Record<string, number>;
  onBuy: (asset: Asset) => void;
}

const TABS: { key: AssetCategory; labelKey: "tabTech" | "tabEnergy" | "tabEtf" | "tabChips" | "tabBiotech" | "tabCyber" }[] = [
  { key: "tech", labelKey: "tabTech" },
  { key: "energy", labelKey: "tabEnergy" },
  { key: "etf", labelKey: "tabEtf" },
  { key: "chips", labelKey: "tabChips" },
  { key: "biotech", labelKey: "tabBiotech" },
  { key: "cyber", labelKey: "tabCyber" },
];

export function AssetList({ prices, changes, onBuy }: AssetListProps) {
  const { locale } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<AssetCategory>("tech");

  const filtered = mockAssets.filter((a) => a.category === activeTab);

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3">{t(locale, "assets")}</h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        {TABS.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === key
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            {t(locale, labelKey)}
          </button>
        ))}
      </div>

      {/* Asset cards */}
      <div className="space-y-3">
        {filtered.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            livePrice={prices[asset.id] ?? asset.price}
            liveChange={changes[asset.id] ?? asset.change}
            onBuy={onBuy}
          />
        ))}
      </div>
    </div>
  );
}
