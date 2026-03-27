"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n";

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      locale: "he",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === "he" ? "en" : "he" }),
    }),
    { name: "language-store" }
  )
);
