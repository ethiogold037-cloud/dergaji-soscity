import React, { useState } from 'react';
import { Announcement, Language } from '../../types';
import { translations } from '../../translations';
import {
  FileText,
  Search,
  Calendar,
  User,
  Send,
  Pin,
  ExternalLink,
  X,
  Share2,
  Sparkles,
  Newspaper,
  BookOpen
} from 'lucide-react';

interface NewsSectionProps {
  currentLang: Language;
  announcements: Announcement[];
  loading?: boolean;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  currentLang,
  announcements,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Announcement | null>(null);

  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.news.categoryAll, color: 'from-[#14213D] to-[#2563EB]' },
    { id: 'official', label: currentLang === 'am' ? 'ይፋዊ መግለጫ' : 'Official', color: 'from-[#1D4ED8] to-[#1E3A8A]' },
    { id: 'charity', label: currentLang === 'am' ? 'በጎ አድራጎት' : 'Charity', color: 'from-[#059669] to-[#047857]' },
    { id: 'meeting', label: currentLang === 'am' ? 'ስብሰባዎች' : 'Assemblies', color: 'from-[#7C3AED] to-[#6D28D9]' },
    { id: 'event', label: currentLang === 'am' ? 'ዝግጅቶች' : 'Events', color: 'from-[#E5A000] to-[#D97706]' },
  ];

  const filtered = announcements.filter((item) => {
    const titleMatch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.titleAm || '').toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = (item.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.contentAm || '').toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = selectedCategory === 'all' || item.category === selectedCategory;

    return (titleMatch || contentMatch) && catMatch;
  });

  const handleShareTelegram = (article: Announcement) => {
    const title = currentLang === 'am' ? (article.titleAm || article.title) : article.title;
    const text = encodeURIComponent(`📢 ${title}\n\nDergag Community Unity & Charity Association (የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር)\nhttps://t.me/dergag_unity_official`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <section id="news" className="py-24 bg-gradient-to-b from-[#FFFDF8] via-[#FFFBEB]/40 to-[#FFFDF8] border-t border-amber-200/70 font-times relative overflow-hidden">
      {/* Decorative ambient subtle warmth */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Newspaper className="w-4 h-4 text-[#E5A000]" />
            <span>{t.news.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            {currentLang === 'am'
              ? 'ወቅታዊ ዜናዎች፣ ይፋዊ መግለጫዎችና ሪፖርቶች'
              : 'News, Official Press Releases & Announcements'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E5A000] via-[#2563EB] to-[#059669] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium leading-relaxed">
            {t.news.subtitle}
          </p>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? `bg-gradient-to-r ${c.color} text-white shadow-md`
                    : 'bg-white border border-amber-200/80 text-slate-700 hover:bg-amber-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-amber-600 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.news.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] focus:border-[#E5A000] shadow-2xs font-medium"
            />
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-amber-50/50 rounded-3xl h-80 animate-pulse border border-amber-200" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-amber-50/60 rounded-3xl border-2 border-dashed border-amber-300">
            <FileText className="w-14 h-14 text-amber-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-[#14213D]">{t.news.empty}</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.coverImage || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-[#14213D]/90 text-white text-[11px] font-bold uppercase backdrop-blur-md border border-white/20 shadow-sm">
                        {item.category}
                      </span>
                      {item.isPinned && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#E5A000] text-[#14213D] text-[11px] font-bold flex items-center gap-1 shadow-sm">
                          <Pin className="w-3 h-3" />
                          <span>Pinned</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{item.publishedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.author}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#14213D] leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {currentLang === 'am' ? (item.titleAm || item.title) : item.title}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 mt-2.5 leading-relaxed font-normal">
                      {currentLang === 'am' ? (item.contentAm || item.content) : item.content}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 sm:p-7 pt-0 border-t border-amber-100 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="text-xs font-bold text-[#2563EB] hover:text-[#14213D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.news.readMore}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShareTelegram(item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                    title={t.news.shareTelegram}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentLang === 'am' ? 'አጋራ' : 'Share'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Article Full View Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative h-64 sm:h-72 w-full bg-slate-900">
                <img
                  src={activeArticle.coverImage || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80'}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                  <span className="px-3 py-1 rounded-md bg-[#14213D] text-white font-bold uppercase text-[10px]">
                    {activeArticle.category}
                  </span>
                  <span>{activeArticle.publishedDate}</span>
                  <span>·</span>
                  <span>{activeArticle.author}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#14213D] leading-snug">
                  {currentLang === 'am' ? (activeArticle.titleAm || activeArticle.title) : activeArticle.title}
                </h3>

                <div className="text-slate-700 text-base leading-relaxed whitespace-pre-line pt-2 font-normal">
                  {currentLang === 'am' ? (activeArticle.contentAm || activeArticle.content) : activeArticle.content}
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => handleShareTelegram(activeArticle)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white text-xs font-bold hover:opacity-95 transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.news.shareTelegram}</span>
                  </button>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {currentLang === 'am' ? 'ዝጋ' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
