export type AssetCategory = "tech" | "energy" | "etf" | "chips";

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
  // Technology
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    nameHe: "אפל",
    price: 175.0,
    change: -0.8,
    sparkline: [178, 177, 176, 174, 173, 175, 175],
    category: "tech",
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla Inc.",
    nameHe: "טסלה",
    price: 250.0,
    change: 2.5,
    sparkline: [240, 242, 245, 248, 246, 249, 250],
    category: "tech",
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    nameHe: "מיקרוסופט",
    price: 415.0,
    change: 1.1,
    sparkline: [408, 410, 411, 413, 412, 414, 415],
    category: "tech",
  },
  {
    id: "meta",
    symbol: "META",
    name: "Meta Platforms",
    nameHe: "מטא",
    price: 510.0,
    change: 1.8,
    sparkline: [498, 500, 503, 506, 504, 508, 510],
    category: "tech",
  },

  // Energy
  {
    id: "xom",
    symbol: "XOM",
    name: "ExxonMobil Corp.",
    nameHe: "אקסון מוביל",
    price: 112.0,
    change: 0.6,
    sparkline: [110, 110.5, 111, 111.5, 111, 111.8, 112],
    category: "energy",
  },
  {
    id: "cvx",
    symbol: "CVX",
    name: "Chevron Corp.",
    nameHe: "שברון",
    price: 158.0,
    change: -0.4,
    sparkline: [160, 159.5, 159, 158.5, 158, 158.2, 158],
    category: "energy",
  },
  {
    id: "xle",
    symbol: "XLE",
    name: "Energy Select ETF",
    nameHe: "תעודת סל אנרגיה",
    price: 89.0,
    change: 0.3,
    sparkline: [88, 88.3, 88.5, 88.8, 88.6, 88.9, 89],
    category: "energy",
  },
  {
    id: "nee",
    symbol: "NEE",
    name: "NextEra Energy",
    nameHe: "נקסטארה אנרגיה",
    price: 73.0,
    change: -1.2,
    sparkline: [75, 74.5, 74, 73.5, 73.2, 73.1, 73],
    category: "energy",
  },

  // ETFs
  {
    id: "spy",
    symbol: "SPY",
    name: "S&P 500 ETF",
    nameHe: "S&P 500 תעודת סל",
    price: 450.0,
    change: 1.2,
    sparkline: [440, 442, 445, 443, 447, 449, 450],
    category: "etf",
  },
  {
    id: "gld",
    symbol: "GLD",
    name: "Gold ETF",
    nameHe: "תעודת סל זהב",
    price: 185.0,
    change: 0.3,
    sparkline: [183, 184, 184, 185, 184, 185, 185],
    category: "etf",
  },
  {
    id: "bnd",
    symbol: "BND",
    name: "US Bond ETF",
    nameHe: 'תעודת סל אג"ח',
    price: 72.0,
    change: -0.1,
    sparkline: [72.5, 72.3, 72.1, 72.0, 72.2, 72.1, 72.0],
    category: "etf",
  },
  {
    id: "qqq",
    symbol: "QQQ",
    name: "Nasdaq 100 ETF",
    nameHe: "נאסדאק 100 תעודת סל",
    price: 430.0,
    change: 1.5,
    sparkline: [420, 422, 425, 427, 426, 429, 430],
    category: "etf",
  },

  // Chips
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    nameHe: "אנבידיה",
    price: 875.0,
    change: 3.2,
    sparkline: [840, 848, 855, 860, 858, 868, 875],
    category: "chips",
  },
  {
    id: "amd",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    nameHe: "AMD",
    price: 168.0,
    change: 2.1,
    sparkline: [161, 162, 164, 165, 163, 166, 168],
    category: "chips",
  },
  {
    id: "intc",
    symbol: "INTC",
    name: "Intel Corp.",
    nameHe: "אינטל",
    price: 43.0,
    change: -0.9,
    sparkline: [44.5, 44.2, 44, 43.8, 43.5, 43.2, 43],
    category: "chips",
  },
  {
    id: "tsm",
    symbol: "TSM",
    name: "Taiwan Semiconductor",
    nameHe: "טייוואן סמיקונדקטור",
    price: 155.0,
    change: 1.4,
    sparkline: [149, 150, 151, 152, 151, 153, 155],
    category: "chips",
  },
];
