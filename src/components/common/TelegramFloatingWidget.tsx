import React, { useState } from 'react';
import { Send, X, Users, Sparkles } from 'lucide-react';
import { Language } from '../../types';

interface TelegramFloatingWidgetProps {
  currentLang: Language;
  telegramLink?: string;
  telegramChannelName?: string;
}

export const TelegramFloatingWidget: React.FC<TelegramFloatingWidgetProps> = ({
  currentLang,
  telegramLink = 'https://t.me/dergag_unity_official',
  telegramChannelName = '@dergag_unity_official'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-serif">
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-gradient-to-br from-[#101F46] via-[#1E3A8A] to-[#0A1128] text-white p-5 rounded-3xl shadow-2xl border-2 border-[#D6A84B] animate-in fade-in slide-in-from-bottom-4 duration-300 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] uppercase tracking-widest text-[#D6A84B] font-bold">
              {currentLang === 'am' ? 'የማህበረሰብ ቻናል' : 'Official Telegram'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white leading-snug">
            {currentLang === 'am'
              ? 'የደርጋጅ ማህበረሰብ አንድነት ይፋዊ ቴሌግራም'
              : 'Dergag Unity & Charity Community'}
          </h4>

          <p className="text-xs text-blue-100/90 mt-1.5 leading-relaxed font-sans">
            {currentLang === 'am'
              ? 'ወቅታዊ የልማት ዜናዎችን፣ አዳዲስ ማስታወቂያዎችንና የውይይት መድረኮችን በቴሌግራም ይከታተሉ::'
              : 'Join over 2,500 community members worldwide for live updates, meetings, and transparent reports.'}
          </p>

          <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#D6A84B] font-bold">{telegramChannelName}</span>
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E3A8A] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>{currentLang === 'am' ? 'ይቀላቀሉ' : 'Join Now'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#101F46] via-[#1D4ED8] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs shadow-xl border-2 border-[#D6A84B]/60 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          title="Join Telegram Community"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="tracking-wide">
            {currentLang === 'am' ? 'የቴሌግራም ማህበረሰብ' : 'Telegram Community'}
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#D6A84B] text-[#101F46] text-[10px] font-black uppercase">
            Live
          </span>
        </button>

        {!isOpen && (
          <button
            onClick={() => setDismissed(true)}
            className="w-6 h-6 rounded-full bg-slate-800/80 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center text-xs shadow-md cursor-pointer transition-colors"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
