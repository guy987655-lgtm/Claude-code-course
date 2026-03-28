"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { WEBHOOK_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Send, MessageSquare, User, Phone, Mail } from "lucide-react";

const createSchema = (locale: "he" | "en") =>
  z.object({
    fullName: z.string().min(2, t(locale, "nameRequired")),
    phone: z
      .string()
      .min(1, t(locale, "phoneRequired"))
      .regex(/^(\+972|0)([23489]|5[0-9]|77)[0-9]{7}$/, t(locale, "invalidPhone")),
    email: z
      .string()
      .email(t(locale, "invalidEmail"))
      .optional()
      .or(z.literal("")),
  });

type FormData = z.infer<ReturnType<typeof createSchema>>;

export function ContactForm() {
  const { locale } = useLanguageStore();
  const schema = useMemo(() => createSchema(locale), [locale]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed");

      toast.success(t(locale, "formSuccess"));
      reset();
    } catch {
      toast.error(t(locale, "formError"));
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929] via-[#0f2744] to-[#060e1a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#22c55e]/[0.04] rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#d4a843]/20 border border-[#22c55e]/20 mb-5">
            <MessageSquare className="w-6 h-6 text-[#22c55e]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            {t(locale, "contactTitle")}
          </h2>
          <p className="text-white/40">{t(locale, "contactSubtitle")}</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="relative">
                <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input
                  placeholder={t(locale, "fullName")}
                  {...register("fullName")}
                  className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl h-12 ps-10 focus:border-[#22c55e]/40 focus:ring-[#22c55e]/20"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1.5 ms-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input
                  placeholder={t(locale, "phone")}
                  type="tel"
                  dir="ltr"
                  {...register("phone")}
                  className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl h-12 ps-10 focus:border-[#22c55e]/40 focus:ring-[#22c55e]/20"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5 ms-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input
                  placeholder={t(locale, "email")}
                  type="email"
                  dir="ltr"
                  {...register("email")}
                  className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl h-12 ps-10 focus:border-[#22c55e]/40 focus:ring-[#22c55e]/20"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 ms-1">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white h-12 text-base gap-2 rounded-xl font-semibold glow-green transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              <Send className="w-4 h-4" />
              {t(locale, "send")}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
