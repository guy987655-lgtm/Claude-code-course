"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE_HE, WHATSAPP_MESSAGE_EN } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const { locale } = useLanguageStore();
  const message = locale === "he" ? WHATSAPP_MESSAGE_HE : WHATSAPP_MESSAGE_EN;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 start-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}
