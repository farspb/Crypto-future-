
import React from 'react';
import { Signal, Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, TrendingUp, TrendingDown, Target, Zap, Clock, BarChart3, AlertCircle } from 'lucide-react';

interface Props {
  signal: Signal | null;
  loading: boolean;
  lang: Language;
}

const SignalPanel: React.FC<Props> = ({ signal, loading, lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'fa';

  if (loading) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-[2.5rem] border border-blue-500/20 animate-pulse ${isRtl ? 'rtl' : 'ltr'}`}>
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-blue-500/10 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-blue-400 font-black uppercase tracking-widest text-xs">{t.computing}</p>
      </div>
    );
  }

  if (!signal) return null;

  const isLong = signal.direction === 'LONG';

  return (
    <div className={`bg-slate-900/80 rounded-[2.5rem] border ${isLong ? 'border-emerald-500/30' : 'border-rose-500/30'} p-8 flex flex-col h-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-20 ${isLong ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{t.futuresSignal}</h2>
            <div className="px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
               <span className="text-[10px] text-blue-400 font-black tracking-widest">{signal.timeframe}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 uppercase tracking-widest">
            <Clock size={12} /> {t.generatedAt} {new Date(signal.timestamp).toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US')}
          </p>
        </div>
        
        <div className={`flex flex-col ${isRtl ? 'items-start' : 'items-end'}`}>
          <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-lg shadow-lg ${isLong ? 'bg-emerald-500 text-white shadow-emerald-900/20' : 'bg-rose-500 text-white shadow-rose-900/20'}`}>
            {isLong ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            {signal.direction}
          </div>
          <div className="mt-3 text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
             <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${isLong ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${signal.confidence * 100}%` }}></div>
             </div>
             {t.confidence}: {(signal.confidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 block">{t.entryRange}</label>
          <div className="crypto-font text-xl font-black text-white tracking-tighter">{signal.entryRange}</div>
        </div>
        <div className="p-5 bg-blue-500/5 rounded-3xl border border-blue-500/10 hover:border-blue-500/20 transition-all">
          <label className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-2 block">{t.leverage}</label>
          <div className="crypto-font text-xl font-black text-blue-400 tracking-tighter">{signal.leverage}</div>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{t.takeProfit}</label>
          <div className="text-[10px] text-emerald-400 font-black flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <BarChart3 size={12} /> {t.riskReward}: {signal.riskReward}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {signal.takeProfit.map((tp, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${idx === 2 ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'}`}>
                  {idx + 1}
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Target {idx + 1}</span>
              </div>
              <span className="crypto-font font-black text-emerald-400 text-lg">{tp}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-3xl mb-8 flex justify-between items-center group hover:bg-rose-500/15 transition-all">
        <div>
          <label className="text-[10px] text-rose-500 font-black uppercase tracking-widest block mb-1">{t.stopLoss}</label>
          <div className="crypto-font text-2xl font-black text-rose-400 tracking-tighter">{signal.stopLoss}</div>
        </div>
        <ShieldCheck className="text-rose-500/50 group-hover:scale-110 transition-transform" size={32} />
      </div>

      <div className="mt-auto p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 relative">
        <h3 className="text-xs font-black text-blue-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
          <Zap size={16} fill="currentColor" /> {t.reasoning}
        </h3>
        <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">
          "{signal.reasoning}"
        </p>
        
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-[9px] text-amber-500/70 font-bold uppercase tracking-tighter">
          <AlertCircle size={12} /> {isRtl ? 'مدیریت سرمایه: حداکثر ۲٪ کل موجودی در این معامله استفاده شود.' : 'Risk Note: Do not exceed 2% of total balance on this trade.'}
        </div>
      </div>
    </div>
  );
};

export default SignalPanel;
