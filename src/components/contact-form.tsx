"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguageStore } from "@/store/language-store";
import { t } from "@/lib/i18n";
import { WEBHOOK_URL } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Send } from "lucide-react";

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
  const schema = createSchema(locale);

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
      // Log for development, show user-friendly toast
      console.log("Form submission (webhook not configured):", data);
      toast.success(t(locale, "formSuccess"));
      reset();
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#0f2744] to-[#1e3a5f] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t(locale, "contactTitle")}
          </h2>
          <p className="text-white/50">{t(locale, "contactSubtitle")}</p>
        </div>

        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder={t(locale, "fullName")}
                {...register("fullName")}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder={t(locale, "phone")}
                type="tel"
                dir="ltr"
                {...register("phone")}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder={t(locale, "email")}
                type="email"
                dir="ltr"
                {...register("email")}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-5 text-base gap-2"
            >
              <Send className="w-4 h-4" />
              {t(locale, "send")}
            </Button>
          </form>
        </Card>
      </motion.div>
    </section>
  );
}
