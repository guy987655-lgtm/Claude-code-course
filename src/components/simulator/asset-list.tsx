"use client";

import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { mockAssets, type Asset } from "@/data/mock-assets";
import { AssetCard } from "./asset-card";

interface AssetListProps {
  prices: Record<string, number>;
  changes: Record<string, number>;
  onBuy: (asset: Asset) => void;
}

export function AssetList({ prices, changes, onBuy }: AssetListProps) {
  const { locale } = useLanguageStore();

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-3">{t(locale, "assets")}</h3>
      <div className="space-y-3">
        {mockAssets.map((asset) => (
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
