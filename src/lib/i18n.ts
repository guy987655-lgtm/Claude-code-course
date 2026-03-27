export type Locale = "he" | "en";

const translations = {
  he: {
    // Hero
    heroTitle: "גלה את עולם ההשקעות — בלי לסכן שקל",
    heroSubtitle: "התנסה בקנייה ומכירה של מניות עם כסף וירטואלי, בסביבה בטוחה לחלוטין",
    heroCTA: "התחל לסמלץ עכשיו",
    // Simulator
    simulatorTitle: "סימולטור השקעות",
    wallet: "ארנק",
    cashBalance: "יתרת מזומן",
    portfolioValue: "שווי תיק",
    totalValue: "שווי כולל",
    assets: "נכסים זמינים",
    myPortfolio: "התיק שלי",
    buy: "קנייה",
    sell: "מכירה",
    quantity: "כמות",
    price: "מחיר",
    total: "סה\"כ",
    confirm: "אישור",
    cancel: "ביטול",
    shares: "יחידות",
    avgPrice: "מחיר ממוצע",
    currentValue: "שווי נוכחי",
    profitLoss: "רווח/הפסד",
    noAssets: "עדיין לא קנית נכסים. בחר מהרשימה למעלה!",
    // Contact
    contactTitle: "רוצה להעמיק? נשמח לעזור",
    contactSubtitle: "השאר פרטים ונחזור אליך בהקדם",
    fullName: "שם מלא",
    phone: "טלפון",
    email: "אימייל (אופציונלי)",
    send: "שלח",
    formSuccess: "הפרטים נשלחו בהצלחה! נחזור אליך בקרוב",
    formError: "שגיאה בשליחה, נסה שוב",
    invalidPhone: "מספר טלפון לא תקין",
    invalidEmail: "כתובת אימייל לא תקינה",
    nameRequired: "שם מלא הוא שדה חובה",
    phoneRequired: "טלפון הוא שדה חובה",
    // General
    language: "English",
    resetPortfolio: "איפוס תיק",
  },
  en: {
    heroTitle: "Discover the World of Investing — Risk Free",
    heroSubtitle: "Practice buying and selling stocks with virtual money, in a completely safe environment",
    heroCTA: "Start Simulating Now",
    simulatorTitle: "Investment Simulator",
    wallet: "Wallet",
    cashBalance: "Cash Balance",
    portfolioValue: "Portfolio Value",
    totalValue: "Total Value",
    assets: "Available Assets",
    myPortfolio: "My Portfolio",
    buy: "Buy",
    sell: "Sell",
    quantity: "Quantity",
    price: "Price",
    total: "Total",
    confirm: "Confirm",
    cancel: "Cancel",
    shares: "Shares",
    avgPrice: "Avg Price",
    currentValue: "Current Value",
    profitLoss: "Profit/Loss",
    noAssets: "No assets yet. Pick one from the list above!",
    contactTitle: "Want to Learn More? We're Here to Help",
    contactSubtitle: "Leave your details and we'll get back to you soon",
    fullName: "Full Name",
    phone: "Phone",
    email: "Email (optional)",
    send: "Send",
    formSuccess: "Details sent successfully! We'll be in touch soon",
    formError: "Error sending, please try again",
    invalidPhone: "Invalid phone number",
    invalidEmail: "Invalid email address",
    nameRequired: "Full name is required",
    phoneRequired: "Phone is required",
    language: "עברית",
    resetPortfolio: "Reset Portfolio",
  },
} as const;

export type TranslationKey = keyof typeof translations.he;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}
