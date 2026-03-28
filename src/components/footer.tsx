"use client";

import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { BarChart3 } from "lucide-react";

export function Footer() {
  const { locale } = useLanguageStore();

  return (
    <footer className="relative border-t border-white/[0.05] bg-[#060e1a] py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#22c55e] to-[#d4a843] flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-white/40">גיא רצון</span>
        </div>
        <p className="text-xs text-white/20">
          {t(locale, "disclaimer")}
        </p>
      </div>
    </footer>
  );
}
