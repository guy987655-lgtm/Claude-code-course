"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, X, BarChart3 } from "lucide-react";

const navItems = [
  { key: "navHome" as const, href: "#hero" },
  { key: "navSimulator" as const, href: "#simulator" },
  { key: "navContact" as const, href: "#contact" },
];

export function Header() {
  const { locale } = useLanguageStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["contact", "simulator", "hero"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleClick("#hero")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22c55e] to-[#d4a843] flex items-center justify-center shadow-lg shadow-[#22c55e]/20 group-hover:shadow-[#22c55e]/40 transition-shadow">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-l from-white to-white/80 bg-clip-text text-transparent group-hover:from-[#d4a843] group-hover:to-[#22c55e] transition-all duration-300">
            גיא רצון
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item.href)}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(locale, item.key)}</span>
              </button>
            );
          })}
          <div className="ms-2 border-s border-white/10 ps-3">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.href)}
                  className="block w-full text-start py-3 px-4 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  {t(locale, item.key)}
                </button>
              ))}
              <div className="pt-2 border-t border-white/5">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
