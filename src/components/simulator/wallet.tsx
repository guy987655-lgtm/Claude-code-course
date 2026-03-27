"use client";

import { motion } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator-store";
import { useLanguageStore } from "@/store/language-store";
import { useLivePrices } from "@/hooks/use-live-prices";
import { t } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Wallet as WalletIcon, PiggyBank, DollarSign } from "lucide-react";

export function Wallet() {
  const { balance, portfolio } = useSimulatorStore();
  const { locale } = useLanguageStore();
  const { prices } = useLivePrices();

  const portfolioValue = portfolio.reduce((sum, item) => {
    const currentPrice = prices[item.assetId] ?? item.avgPrice;
    return sum + currentPrice * item.quantity;
  }, 0);

  const totalValue = balance + portfolioValue;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <WalletCard
        icon={<DollarSign className="w-5 h-5" />}
        label={t(locale, "cashBalance")}
        value={balance}
        color="text-blue-400"
        bgColor="bg-blue-500/10"
      />
      <WalletCard
        icon={<PiggyBank className="w-5 h-5" />}
        label={t(locale, "portfolioValue")}
        value={portfolioValue}
        color="text-[#d4a843]"
        bgColor="bg-[#d4a843]/10"
      />
      <WalletCard
        icon={<WalletIcon className="w-5 h-5" />}
        label={t(locale, "totalValue")}
        value={totalValue}
        color="text-[#22c55e]"
        bgColor="bg-[#22c55e]/10"
      />
    </div>
  );
}

function WalletCard({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) {
  return (
    <Card className="p-4 bg-[#1a2d47] border-white/10">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <span className={color}>{icon}</span>
        </div>
        <div>
          <p className="text-xs text-white/50">{label}</p>
          <motion.p
            key={value.toFixed(2)}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`text-lg font-bold ${color}`}
          >
            ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </motion.p>
        </div>
      </div>
    </Card>
  );
}
