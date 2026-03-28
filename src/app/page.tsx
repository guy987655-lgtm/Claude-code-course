"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";
import { getDirection } from "@/lib/i18n";
import { Hero } from "@/components/hero";
import { Simulator } from "@/components/simulator/simulator";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  const { locale } = useLanguageStore();

  // Update HTML dir and lang on locale change
  useEffect(() => {
    document.documentElement.dir = getDirection(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen">
      <Header />

      <Hero />
      <Simulator />
      <ContactForm />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
