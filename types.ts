
export type CoinId = 'BTC' | 'SOL' | 'TRX' | 'SUI';
export type Language = 'fa' | 'en';
export type Timeframe = '1H' | '4H';

export interface PriceData {
  coin: CoinId;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
}

export interface Signal {
  coin: CoinId;
  direction: 'LONG' | 'SHORT';
  entryRange: string;
  takeProfit: string[];
  stopLoss: string;
  leverage: string;
  confidence: number;
  reasoning: string;
  timeframe: string;
  riskReward: string;
  timestamp: number;
}

export interface NewsItem {
  title: string;
  source: string;
  url: string;
  timestamp: string;
  summary: string;
}
