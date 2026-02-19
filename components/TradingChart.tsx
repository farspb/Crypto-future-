
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CoinId } from '../types';

interface Props {
  coin: CoinId;
  currentPrice: number;
}

const TradingChart: React.FC<Props> = ({ coin, currentPrice }) => {
  const data = useMemo(() => {
    const points = [];
    let base = currentPrice * 0.98;
    for (let i = 0; i < 24; i++) {
      const variation = (Math.random() - 0.45) * (currentPrice * 0.005);
      base += variation;
      points.push({
        time: `${i}:00`,
        price: parseFloat(base.toFixed(coin === 'TRX' ? 5 : 2)),
      });
    }
    // Ensure the last point is current price
    points[points.length-1].price = currentPrice;
    return points;
  }, [coin, currentPrice]);

  return (
    <div className="h-full w-full min-h-[300px] p-4 bg-slate-900/30 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 font-bold text-sm tracking-wider uppercase">{coin} Performance (24h)</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-blue-400 font-medium uppercase">Live Stream</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#475569', fontSize: 10}} 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#475569', fontSize: 10}}
            orientation="right"
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingChart;
