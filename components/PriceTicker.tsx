
import React from 'react';
import { PriceData, CoinId } from '../types';

interface Props {
  data: PriceData[];
  activeCoin: CoinId;
  onSelect: (coin: CoinId) => void;
}

const PriceTicker: React.FC<Props> = ({ data, activeCoin, onSelect }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-6 py-6 px-2 no-scrollbar scroll-smooth">
      {data.map((item) => {
        const isSpecial = item.coin === 'SOL' || item.coin === 'SUI';
        const isActive = activeCoin === item.coin;
        
        return (
          <button
            key={item.coin}
            onClick={() => onSelect(item.coin)}
            className={`flex-shrink-0 min-w-[280px] p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden group ${
              isActive 
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_20px_40px_rgba(59,130,246,0.15)] scale-[1.02]' 
                : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-700 hover:bg-slate-800/40'
            }`}
          >
            {isSpecial && (
              <div className="absolute top-0 right-0 p-2">
                <span className="flex w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className={`font-black text-xl tracking-tighter ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {item.coin}/USDT
                </span>
                {isSpecial && (
                  <span className="text-[8px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">PRO</span>
                )}
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-xl ${item.change24h >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {item.change24h >= 0 ? '↑' : '↓'} {Math.abs(item.change24h).toFixed(2)}%
              </span>
            </div>
            
            <div className="crypto-font text-3xl font-black mb-2 tracking-tighter text-white">
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: item.coin === 'TRX' ? 5 : 2 })}
            </div>
            
            <div className="flex justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              <span>VOL: {item.volume}</span>
              <span className="group-hover:text-slate-300 transition-colors">H: {item.high24h.toFixed(2)}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PriceTicker;
