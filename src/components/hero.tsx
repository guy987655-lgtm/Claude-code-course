"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowDown, Shield, Zap } from "lucide-react";

export function Hero() {
  const { locale } = useLanguageStore();

  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#0f2744] to-[#0a1f3a]" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#22c55e]/8 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4a843]/8 rounded-full blur-[130px] animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a5f]/30 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
            </span>
            <span className="text-white/70 text-sm font-medium">
              {t(locale, "heroBadge")}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
        >
          {t(locale, "heroTitleLine1")}
          <br />
          <span className={`bg-gradient-to-${locale === "he" ? "l" : "r"} from-[#22c55e] via-[#4ade80] to-[#d4a843] bg-clip-text text-transparent`}>
            {t(locale, "heroTitleLine2")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t(locale, "heroSubtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToSimulator}
            size="lg"
            className="relative bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white text-lg px-10 py-7 rounded-2xl glow-green transition-all hover:scale-[1.03] active:scale-[0.98] font-semibold"
          >
            <TrendingUp className="w-5 h-5 me-2" />
            {t(locale, "heroCTA")}
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-6 sm:gap-10 mt-14 text-white/30 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#22c55e]/60" />
            <span>{t(locale, "trustSafe")}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#d4a843]/60" />
            <span>{t(locale, "trustNoSignup")}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#22c55e]/60" />
            <span>{t(locale, "trustVirtual")}</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.button
            onClick={scrollToSimulator}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/20 hover:text-white/40 transition-colors mx-auto block"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
