"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function FAQ() {
  const { locale } = useLanguageStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    { q: t(locale, "faq1Q"), a: t(locale, "faq1A") },
    { q: t(locale, "faq2Q"), a: t(locale, "faq2A") },
    { q: t(locale, "faq3Q"), a: t(locale, "faq3A") },
    { q: t(locale, "faq4Q"), a: t(locale, "faq4A") },
    { q: t(locale, "faq5Q"), a: t(locale, "faq5A") },
  ];

  return (
    <section className="relative py-20 px-4 bg-[#060e1a]">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a843]/20 to-[#22c55e]/20 border border-[#d4a843]/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#d4a843]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t(locale, "faqTitle")}</h2>
              <p className="text-xs text-white/30">{t(locale, "faqSubtitle")}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-[#d4a843]/25 bg-white/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start"
                  >
                    <span className="text-sm font-semibold text-white/85">{item.q}</span>
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-[#d4a843]/20 text-[#d4a843]" : "bg-white/5 text-white/30"
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
