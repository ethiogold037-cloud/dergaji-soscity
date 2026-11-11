import React, { useState } from 'react';
import { GalleryItem, Language } from '../../types';
import { translations } from '../../translations';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  Calendar,
  Sparkles,
  Tag,
  Camera
} from 'lucide-react';

interface GallerySectionProps {
  currentLang: Language;
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  currentLang,
  items
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.gallery.all, color: 'from-[#0891B2] to-[#0E7490]' },
    { id: 'development', label: t.gallery.development, color: 'from-[#2563EB] to-[#1D4ED8]' },
    { id: 'charity', label: t.gallery.charity, color: 'from-[#059669] to-[#047857]' },
    { id: 'community', label: t.gallery.community, color: 'from-[#E5A000] to-[#D97706]' },
    { id: 'youth', label: t.gallery.youth, color: 'from-[#7C3AED] to-[#6D28D9]' },
    { id: 'meetings', label: t.gallery.meetings, color: 'from-[#14213D] to-[#1E3A8A]' },
    { id: 'cultural', label: t.gallery.cultural, color: 'from-[#D97706] to-[#B45309]' },
  ];

  const getGalleryImage = (item: GalleryItem) => {
    if (item.id === 'gal_1' || item.title.toLowerCase().includes('water')) {
      return '/src/assets/images/dergag_clean_water_1794153761220.jpg';
    }
    if (item.id === 'gal_2' || item.title.toLowerCase().includes('digital') || item.title.toLowerCase().includes('youth')) {
      return '/src/assets/images/dergag_school_children_1794153761478.jpg';
    }
    if (item.id === 'gal_3' || item.title.toLowerCase().includes('elders')) {
      return '/src/assets/images/dergag_community_hero_1794153760705.jpg';
    }
    if (item.id === 'gal_4' || item.title.toLowerCase().includes('food') || item.title.toLowerCase().includes('basket')) {
      return '/src/assets/images/dergag_elder_charity_1794153783029.jpg';
    }
    if (item.id === 'gal_5' || item.title.toLowerCase().includes('cultural')) {
      return '/src/assets/images/dergag_cultural_unity_1794153762204.jpg';
    }
    if (item.id === 'gal_6' || item.title.toLowerCase().includes('school') || item.title.toLowerCase().includes('books')) {
      return '/src/assets/images/dergag_school_children_1794153761478.jpg';
    }
    return item.imageUrl;
  };

  const filtered = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-[#ECFEFF] via-[#E0F2FE]/50 to-[#ECFEFF] border-t border-cyan-200/80 font-times relative overflow-hidden">
      {/* Decorative ambient cyan blobs */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-[#0891B2] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Camera className="w-4 h-4 text-[#0891B2]" />
            <span>{t.gallery.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            {currentLang === 'am'
              ? 'የማህበሩ የልማት፣ የበጎ አድራጎት እና የአንድነት እንቅስቃሴ ምስሎች'
              : 'Moments of Solidarity, Development & Charity in Pictures'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0891B2] via-[#2563EB] to-[#059669] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium leading-relaxed">
            {t.gallery.subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto mt-8 pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? `bg-gradient-to-r ${c.color} text-white shadow-md`
                    : 'bg-white border border-cyan-200 text-slate-700 hover:bg-cyan-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item) => {
            const imgSrc = getGalleryImage(item);
            return (
              <div
                key={item.id}
                onClick={() => setLightboxItem({ ...item, imageUrl: imgSrc })}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-cyan-200/90 cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-lg bg-[#14213D]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-200 mb-1.5 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#E5A000]" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold leading-snug line-clamp-1 drop-shadow-md text-cyan-50">
                      {currentLang === 'am' ? (item.titleAm || item.title) : item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-slate-200 line-clamp-2 mt-1 leading-relaxed font-normal">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl border border-white/40 transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border-2 border-cyan-400 shadow-2xl flex flex-col max-h-[95vh]">
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-7 bg-[#14213D] text-white space-y-2.5 border-t border-cyan-400/40">
                <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                  <span className="px-3 py-1 rounded-md bg-[#0891B2] text-white text-[11px] uppercase tracking-wider">
                    {lightboxItem.category}
                  </span>
                  <span>{lightboxItem.date}</span>
                </div>
                <h3 className="text-xl font-bold text-cyan-50">
                  {currentLang === 'am' ? (lightboxItem.titleAm || lightboxItem.title) : lightboxItem.title}
                </h3>
                {lightboxItem.caption && (
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    {lightboxItem.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
