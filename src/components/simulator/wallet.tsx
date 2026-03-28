"use client";

import { motion } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator-store";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Wallet as WalletIcon, PiggyBank, DollarSign } from "lucide-react";

interface WalletProps {
  prices: Record<string, number>;
}

export function Wallet({ prices }: WalletProps) {
  const { balance, portfolio } = useSimulatorStore();
  const { locale } = useLanguageStore();

  const portfolioValue = portfolio.reduce((sum, item) => {
    const currentPrice = prices[item.assetId] ?? item.avgPrice;
    return sum + currentPrice * item.quantity;
  }, 0);

  const totalValue = balance + portfolioValue;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <WalletCard
        icon={<DollarSign className="w-5 h-5" />}
        label={t(locale, "cashBalance")}
        value={balance}
        gradient="from-blue-500/20 to-blue-600/5"
        iconBg="bg-blue-500/15"
        color="text-blue-400"
        borderColor="border-blue-500/20"
      />
      <WalletCard
        icon={<PiggyBank className="w-5 h-5" />}
        label={t(locale, "portfolioValue")}
        value={portfolioValue}
        gradient="from-[#d4a843]/20 to-[#d4a843]/5"
        iconBg="bg-[#d4a843]/15"
        color="text-[#d4a843]"
        borderColor="border-[#d4a843]/20"
      />
      <WalletCard
        icon={<WalletIcon className="w-5 h-5" />}
        label={t(locale, "totalValue")}
        value={totalValue}
        gradient="from-[#22c55e]/20 to-[#22c55e]/5"
        iconBg="bg-[#22c55e]/15"
        color="text-[#22c55e]"
        borderColor="border-[#22c55e]/20"
      />
    </div>
  );
}

function WalletCard({
  icon,
  label,
  value,
  gradient,
  iconBg,
  color,
  borderColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  gradient: string;
  iconBg: string;
  color: string;
  borderColor: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border ${borderColor} bg-gradient-to-br ${gradient} p-4`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <span className={color}>{icon}</span>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/40 font-medium">{label}</p>
          <motion.p
            key={value.toFixed(2)}
            initial={{ scale: 1.05, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xl font-bold ${color} tabular-nums`}
          >
            ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
