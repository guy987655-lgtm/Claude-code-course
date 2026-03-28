"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { useSimulatorStore, getPortfolioItem } from "@/store/simulator-store";
import { t } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

interface TradeDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "buy" | "sell";
  assetId: string;
  symbol: string;
  currentPrice: number;
}

export function TradeDialog({
  open,
  onClose,
  mode,
  assetId,
  symbol,
  currentPrice,
}: TradeDialogProps) {
  const { locale } = useLanguageStore();
  const { buy, sell, balance, portfolio } = useSimulatorStore();
  const [quantity, setQuantity] = useState("1");

  const qty = parseInt(quantity) || 0;
  const total = qty * currentPrice;
  const holding = getPortfolioItem(portfolio, assetId);

  useEffect(() => {
    if (open) setQuantity("1");
  }, [open]);

  const maxBuy = Math.floor(balance / currentPrice);
  const maxSell = holding?.quantity ?? 0;

  const adjustQty = (delta: number) => {
    const newQty = Math.max(1, Math.min(qty + delta, mode === "buy" ? maxBuy : maxSell));
    setQuantity(String(newQty));
  };

  const handleConfirm = () => {
    if (qty <= 0) return;

    if (mode === "buy") {
      const success = buy(assetId, symbol, currentPrice, qty);
      if (success) {
        toast.success(
          t(locale, "boughtShares").replace("{qty}", String(qty)).replace("{symbol}", symbol)
        );
        onClose();
      } else {
        toast.error(t(locale, "insufficientBalance"));
      }
    } else {
      const success = sell(assetId, currentPrice, qty);
      if (success) {
        toast.success(
          t(locale, "soldShares").replace("{qty}", String(qty)).replace("{symbol}", symbol)
        );
        onClose();
      } else {
        toast.error(t(locale, "insufficientShares"));
      }
    }
  };

  const isBuy = mode === "buy";
  const accentColor = isBuy ? "#22c55e" : "#ef4444";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-strong !bg-[#0a1929]/95 border-white/[0.08] text-white max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <span
              className={`px-2.5 py-1 rounded-lg text-sm font-bold ${
                isBuy ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-red-500/15 text-red-400"
              }`}
            >
              {t(locale, mode)}
            </span>
            <span className="text-[#d4a843] font-bold">{symbol}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-3">
          {/* Price display */}
          <div className="text-center py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[11px] uppercase tracking-wider text-white/30 mb-1">{t(locale, "price")}</p>
            <p className="text-2xl font-bold text-white tabular-nums">${currentPrice.toFixed(2)}</p>
          </div>

          {/* Quantity selector */}
          <div>
            <label className="text-xs text-white/40 mb-2 block">
              {t(locale, "quantity")}
              <span className="text-white/20 ms-2">
                (max: {mode === "buy" ? maxBuy : maxSell})
              </span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustQty(-1)}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <Input
                type="number"
                min="1"
                max={mode === "buy" ? maxBuy : maxSell}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white/[0.03] border-white/10 text-white text-center text-lg font-bold rounded-xl h-10 tabular-nums"
              />
              <button
                onClick={() => adjustQty(1)}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-3 px-4 rounded-xl border border-white/[0.06]" style={{ borderColor: `${accentColor}20` }}>
            <span className="text-sm text-white/40">{t(locale, "total")}</span>
            <motion.span
              key={total.toFixed(2)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-white tabular-nums"
            >
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </motion.span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-white/40 hover:text-white hover:bg-white/5 rounded-xl h-12"
            >
              {t(locale, "cancel")}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={qty <= 0 || (mode === "buy" ? total > balance : qty > maxSell)}
              className={`flex-1 rounded-xl h-12 font-semibold transition-all ${
                isBuy
                  ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-lg shadow-[#22c55e]/20"
                  : "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
              } text-white`}
            >
              {t(locale, "confirm")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
