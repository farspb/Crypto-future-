
import React from 'react';
import { NewsItem, Language } from '../types';
import { translations } from '../translations';
import { Newspaper, ExternalLink } from 'lucide-react';

interface Props {
  news: NewsItem[];
  loading: boolean;
  lang: Language;
}

const NewsSection: React.FC<Props> = ({ news, loading, lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'fa';

  return (
    <div className={`bg-slate-900/40 rounded-3xl border border-slate-800 p-6 h-full flex flex-col ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold">{t.newsTitle}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800/50 rounded-xl p-4 h-24" />
          ))
        ) : (
          news.map((item, idx) => (
            <a 
              key={idx} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block p-4 rounded-2xl bg-slate-800/20 border border-slate-700/50 hover:bg-slate-800/40 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase font-bold text-blue-500/70 tracking-tighter">{item.source}</span>
                <span className="text-[10px] text-slate-500">{item.timestamp}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">
                {item.title} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsSection;
