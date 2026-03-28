export type AssetCategory = "tech" | "energy" | "etf" | "chips" | "biotech" | "cyber";

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  nameHe: string;
  price: number;
  change: number; // percentage
  sparkline: number[];
  category: AssetCategory;
}

export const mockAssets: Asset[] = [
  // Technology (8)
  { id: "aapl", symbol: "AAPL", name: "Apple Inc.", nameHe: "אפל", price: 175.0, change: -0.8, sparkline: [178, 177, 176, 174, 173, 175, 175], category: "tech" },
  { id: "tsla", symbol: "TSLA", name: "Tesla Inc.", nameHe: "טסלה", price: 250.0, change: 2.5, sparkline: [240, 242, 245, 248, 246, 249, 250], category: "tech" },
  { id: "msft", symbol: "MSFT", name: "Microsoft Corp.", nameHe: "מיקרוסופט", price: 415.0, change: 1.1, sparkline: [408, 410, 411, 413, 412, 414, 415], category: "tech" },
  { id: "meta", symbol: "META", name: "Meta Platforms", nameHe: "מטא", price: 510.0, change: 1.8, sparkline: [498, 500, 503, 506, 504, 508, 510], category: "tech" },
  { id: "googl", symbol: "GOOGL", name: "Alphabet Inc.", nameHe: "גוגל", price: 175.0, change: 0.9, sparkline: [171, 172, 173, 174, 173, 174, 175], category: "tech" },
  { id: "amzn", symbol: "AMZN", name: "Amazon.com Inc.", nameHe: "אמזון", price: 210.0, change: 1.4, sparkline: [204, 205, 207, 208, 207, 209, 210], category: "tech" },
  { id: "nflx", symbol: "NFLX", name: "Netflix Inc.", nameHe: "נטפליקס", price: 630.0, change: -1.2, sparkline: [642, 640, 638, 635, 633, 631, 630], category: "tech" },
  { id: "crm", symbol: "CRM", name: "Salesforce Inc.", nameHe: "סיילספורס", price: 290.0, change: 0.6, sparkline: [285, 286, 287, 288, 288, 289, 290], category: "tech" },

  // Energy (8)
  { id: "xom", symbol: "XOM", name: "ExxonMobil Corp.", nameHe: "אקסון מוביל", price: 112.0, change: 0.6, sparkline: [110, 110.5, 111, 111.5, 111, 111.8, 112], category: "energy" },
  { id: "cvx", symbol: "CVX", name: "Chevron Corp.", nameHe: "שברון", price: 158.0, change: -0.4, sparkline: [160, 159.5, 159, 158.5, 158, 158.2, 158], category: "energy" },
  { id: "xle", symbol: "XLE", name: "Energy Select ETF", nameHe: "תעודת סל אנרגיה", price: 89.0, change: 0.3, sparkline: [88, 88.3, 88.5, 88.8, 88.6, 88.9, 89], category: "energy" },
  { id: "nee", symbol: "NEE", name: "NextEra Energy", nameHe: "נקסטארה אנרגיה", price: 73.0, change: -1.2, sparkline: [75, 74.5, 74, 73.5, 73.2, 73.1, 73], category: "energy" },
  { id: "bp", symbol: "BP", name: "BP p.l.c.", nameHe: "BP", price: 34.0, change: 0.5, sparkline: [33.2, 33.4, 33.6, 33.8, 33.7, 33.9, 34], category: "energy" },
  { id: "shel", symbol: "SHEL", name: "Shell plc", nameHe: "של", price: 68.0, change: 0.2, sparkline: [67.2, 67.4, 67.5, 67.7, 67.6, 67.8, 68], category: "energy" },
  { id: "eog", symbol: "EOG", name: "EOG Resources", nameHe: "EOG ריסורסס", price: 122.0, change: -0.7, sparkline: [124, 123.5, 123, 122.8, 122.5, 122.2, 122], category: "energy" },
  { id: "slb", symbol: "SLB", name: "SLB (Schlumberger)", nameHe: "שלומברז'ה", price: 42.0, change: 1.1, sparkline: [40.5, 40.8, 41, 41.3, 41.5, 41.8, 42], category: "energy" },

  // ETFs (8)
  { id: "spy", symbol: "SPY", name: "S&P 500 ETF", nameHe: "S&P 500 תעודת סל", price: 450.0, change: 1.2, sparkline: [440, 442, 445, 443, 447, 449, 450], category: "etf" },
  { id: "gld", symbol: "GLD", name: "Gold ETF", nameHe: "תעודת סל זהב", price: 185.0, change: 0.3, sparkline: [183, 184, 184, 185, 184, 185, 185], category: "etf" },
  { id: "bnd", symbol: "BND", name: "US Bond ETF", nameHe: 'תעודת סל אג"ח', price: 72.0, change: -0.1, sparkline: [72.5, 72.3, 72.1, 72.0, 72.2, 72.1, 72.0], category: "etf" },
  { id: "qqq", symbol: "QQQ", name: "Nasdaq 100 ETF", nameHe: "נאסדאק 100 תעודת סל", price: 430.0, change: 1.5, sparkline: [420, 422, 425, 427, 426, 429, 430], category: "etf" },
  { id: "vti", symbol: "VTI", name: "Vanguard Total Market ETF", nameHe: "ואנגארד שוק כולל", price: 255.0, change: 0.8, sparkline: [251, 252, 253, 253, 254, 254, 255], category: "etf" },
  { id: "iwm", symbol: "IWM", name: "Russell 2000 ETF", nameHe: "ראסל 2000 תעודת סל", price: 210.0, change: -0.5, sparkline: [212, 211.5, 211, 210.5, 210.2, 210.1, 210], category: "etf" },
  { id: "eem", symbol: "EEM", name: "Emerging Markets ETF", nameHe: "שווקים מתפתחים תעודת סל", price: 43.0, change: 0.4, sparkline: [42.3, 42.4, 42.6, 42.7, 42.8, 42.9, 43], category: "etf" },
  { id: "tlt", symbol: "TLT", name: "20+ Year Treasury ETF", nameHe: "אוצר ארוך טווח תעודת סל", price: 90.0, change: -0.3, sparkline: [91, 90.8, 90.6, 90.4, 90.2, 90.1, 90], category: "etf" },

  // Chips (8)
  { id: "nvda", symbol: "NVDA", name: "NVIDIA Corp.", nameHe: "אנבידיה", price: 875.0, change: 3.2, sparkline: [840, 848, 855, 860, 858, 868, 875], category: "chips" },
  { id: "amd", symbol: "AMD", name: "Advanced Micro Devices", nameHe: "AMD", price: 168.0, change: 2.1, sparkline: [161, 162, 164, 165, 163, 166, 168], category: "chips" },
  { id: "intc", symbol: "INTC", name: "Intel Corp.", nameHe: "אינטל", price: 43.0, change: -0.9, sparkline: [44.5, 44.2, 44, 43.8, 43.5, 43.2, 43], category: "chips" },
  { id: "tsm", symbol: "TSM", name: "Taiwan Semiconductor", nameHe: "טייוואן סמיקונדקטור", price: 155.0, change: 1.4, sparkline: [149, 150, 151, 152, 151, 153, 155], category: "chips" },
  { id: "qcom", symbol: "QCOM", name: "Qualcomm Inc.", nameHe: "קוואלקום", price: 165.0, change: 0.7, sparkline: [162, 162.5, 163, 163.5, 164, 164.5, 165], category: "chips" },
  { id: "avgo", symbol: "AVGO", name: "Broadcom Inc.", nameHe: "ברודקום", price: 1320.0, change: 1.9, sparkline: [1290, 1295, 1300, 1305, 1308, 1315, 1320], category: "chips" },
  { id: "mu", symbol: "MU", name: "Micron Technology", nameHe: "מיקרון טכנולוגי", price: 110.0, change: 2.8, sparkline: [104, 105, 106, 107, 108, 109, 110], category: "chips" },
  { id: "arm", symbol: "ARM", name: "Arm Holdings", nameHe: "ARM הולדינגס", price: 130.0, change: 1.5, sparkline: [125, 126, 127, 128, 128, 129, 130], category: "chips" },

  // Biotech (8)
  { id: "mrna", symbol: "MRNA", name: "Moderna Inc.", nameHe: "מודרנה", price: 75.0, change: -1.5, sparkline: [77, 76.5, 76, 75.8, 75.5, 75.2, 75], category: "biotech" },
  { id: "biib", symbol: "BIIB", name: "Biogen Inc.", nameHe: "ביוג'ן", price: 225.0, change: 0.8, sparkline: [221, 222, 222.5, 223, 223.5, 224, 225], category: "biotech" },
  { id: "gild", symbol: "GILD", name: "Gilead Sciences", nameHe: "גיליאד סיינסס", price: 88.0, change: 0.4, sparkline: [86.5, 87, 87.2, 87.5, 87.6, 87.8, 88], category: "biotech" },
  { id: "regn", symbol: "REGN", name: "Regeneron Pharmaceuticals", nameHe: "ריג'נרון", price: 720.0, change: 1.1, sparkline: [708, 710, 712, 714, 715, 717, 720], category: "biotech" },
  { id: "vrtx", symbol: "VRTX", name: "Vertex Pharmaceuticals", nameHe: "ורטקס פארמה", price: 470.0, change: 0.6, sparkline: [464, 465, 466, 467, 468, 469, 470], category: "biotech" },
  { id: "amgn", symbol: "AMGN", name: "Amgen Inc.", nameHe: "אמג'ן", price: 310.0, change: -0.3, sparkline: [312, 311.5, 311, 310.8, 310.5, 310.2, 310], category: "biotech" },
  { id: "bmy", symbol: "BMY", name: "Bristol-Myers Squibb", nameHe: "בריסטול-מאיירס סקוויב", price: 55.0, change: -0.6, sparkline: [56, 55.8, 55.6, 55.4, 55.3, 55.1, 55], category: "biotech" },
  { id: "pfe", symbol: "PFE", name: "Pfizer Inc.", nameHe: "פייזר", price: 28.0, change: -0.9, sparkline: [28.8, 28.6, 28.4, 28.3, 28.2, 28.1, 28], category: "biotech" },

  // Cybersecurity (8)
  { id: "crwd", symbol: "CRWD", name: "CrowdStrike Holdings", nameHe: "קראודסטרייק", price: 320.0, change: 2.4, sparkline: [310, 312, 314, 315, 316, 318, 320], category: "cyber" },
  { id: "panw", symbol: "PANW", name: "Palo Alto Networks", nameHe: "פאלו אלטו נטוורקס", price: 380.0, change: 1.7, sparkline: [372, 374, 375, 376, 377, 378, 380], category: "cyber" },
  { id: "zs", symbol: "ZS", name: "Zscaler Inc.", nameHe: "זסקיילר", price: 220.0, change: 1.2, sparkline: [214, 215, 216, 217, 218, 219, 220], category: "cyber" },
  { id: "ftnt", symbol: "FTNT", name: "Fortinet Inc.", nameHe: "פורטינט", price: 90.0, change: 0.9, sparkline: [87.5, 88, 88.5, 89, 89.2, 89.6, 90], category: "cyber" },
  { id: "s", symbol: "S", name: "SentinelOne Inc.", nameHe: "סנטינלוון", price: 22.0, change: 1.8, sparkline: [21, 21.2, 21.4, 21.5, 21.7, 21.8, 22], category: "cyber" },
  { id: "okta", symbol: "OKTA", name: "Okta Inc.", nameHe: "אוקטה", price: 115.0, change: -0.8, sparkline: [117, 116.5, 116, 115.8, 115.5, 115.2, 115], category: "cyber" },
  { id: "cybr", symbol: "CYBR", name: "CyberArk Software", nameHe: "סייברארק", price: 280.0, change: 1.3, sparkline: [273, 274, 275, 276, 277, 278, 280], category: "cyber" },
  { id: "cibr", symbol: "CIBR", name: "Cybersecurity ETF", nameHe: "תעודת סל סייבר", price: 58.0, change: 0.7, sparkline: [56.8, 57, 57.2, 57.4, 57.6, 57.8, 58], category: "cyber" },
];
