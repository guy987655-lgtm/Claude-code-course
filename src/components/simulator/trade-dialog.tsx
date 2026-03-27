"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";
import { useSimulatorStore } from "@/store/simulator-store";
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
  const { buy, sell, balance, getPortfolioItem } = useSimulatorStore();
  const [quantity, setQuantity] = useState("1");

  const qty = parseInt(quantity) || 0;
  const total = qty * currentPrice;
  const holding = getPortfolioItem(assetId);

  useEffect(() => {
    if (open) setQuantity("1");
  }, [open]);

  const maxBuy = Math.floor(balance / currentPrice);
  const maxSell = holding?.quantity ?? 0;

  const handleConfirm = () => {
    if (qty <= 0) return;

    if (mode === "buy") {
      const success = buy(assetId, symbol, currentPrice, qty);
      if (success) {
        toast.success(
          locale === "he"
            ? `נרכשו ${qty} יחידות של ${symbol}`
            : `Bought ${qty} shares of ${symbol}`
        );
        onClose();
      } else {
        toast.error(
          locale === "he" ? "אין מספיק יתרה" : "Insufficient balance"
        );
      }
    } else {
      const success = sell(assetId, currentPrice, qty);
      if (success) {
        toast.success(
          locale === "he"
            ? `נמכרו ${qty} יחידות של ${symbol}`
            : `Sold ${qty} shares of ${symbol}`
        );
        onClose();
      } else {
        toast.error(
          locale === "he" ? "אין מספיק יחידות" : "Insufficient shares"
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f2744] border-white/10 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span
              className={
                mode === "buy" ? "text-[#22c55e]" : "text-red-400"
              }
            >
              {t(locale, mode)}
            </span>
            <span className="text-[#d4a843]">{symbol}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>{t(locale, "price")}</span>
            <span className="text-white">${currentPrice.toFixed(2)}</span>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1 block">
              {t(locale, "quantity")}
              <span className="text-white/30 ms-2">
                ({locale === "he" ? "מקסימום" : "max"}: {mode === "buy" ? maxBuy : maxSell})
              </span>
            </label>
            <Input
              type="number"
              min="1"
              max={mode === "buy" ? maxBuy : maxSell}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-3">
            <span className="text-white/60">{t(locale, "total")}</span>
            <span className="text-white">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
            >
              {t(locale, "cancel")}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={qty <= 0 || (mode === "buy" ? total > balance : qty > maxSell)}
              className={`flex-1 ${
                mode === "buy"
                  ? "bg-[#22c55e] hover:bg-[#16a34a]"
                  : "bg-red-500 hover:bg-red-600"
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
