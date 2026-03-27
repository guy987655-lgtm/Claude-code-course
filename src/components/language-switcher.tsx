"use client";

import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguageStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-2 text-white/80 hover:text-white hover:bg-white/10"
    >
      <Globe className="w-4 h-4" />
      {t(locale, "language")}
    </Button>
  );
}
