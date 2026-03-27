"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function Hero() {
  const { locale } = useLanguageStore();

  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2744] via-[#1e3a5f] to-[#0f2744]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#22c55e] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4a843] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#22c55e]" />
            <span className="text-white/80 text-sm">
              {locale === "he" ? "סימולציה חינמית • ללא סיכון" : "Free Simulation • Risk Free"}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {t(locale, "heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto"
        >
          {t(locale, "heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={scrollToSimulator}
            size="lg"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#22c55e]/25 transition-all hover:scale-105"
          >
            {t(locale, "heroCTA")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
