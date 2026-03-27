export interface Asset {
  id: string;
  symbol: string;
  name: string;
  nameHe: string;
  price: number;
  change: number; // percentage
  sparkline: number[];
}

export const mockAssets: Asset[] = [
  {
    id: "spy",
    symbol: "SPY",
    name: "S&P 500 ETF",
    nameHe: "S&P 500 תעודת סל",
    price: 450.0,
    change: 1.2,
    sparkline: [440, 442, 445, 443, 447, 449, 450],
  },
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    nameHe: "אפל",
    price: 175.0,
    change: -0.8,
    sparkline: [178, 177, 176, 174, 173, 175, 175],
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla Inc.",
    nameHe: "טסלה",
    price: 250.0,
    change: 2.5,
    sparkline: [240, 242, 245, 248, 246, 249, 250],
  },
  {
    id: "gld",
    symbol: "GLD",
    name: "Gold ETF",
    nameHe: "תעודת סל זהב",
    price: 185.0,
    change: 0.3,
    sparkline: [183, 184, 184, 185, 184, 185, 185],
  },
  {
    id: "bnd",
    symbol: "BND",
    name: "US Bond ETF",
    nameHe: 'תעודת סל אג"ח',
    price: 72.0,
    change: -0.1,
    sparkline: [72.5, 72.3, 72.1, 72.0, 72.2, 72.1, 72.0],
  },
];
