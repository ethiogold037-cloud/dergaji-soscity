import React from 'react';
import { motion } from 'motion/react';
import { Language, StatsSummary } from '../../types';
import { translations } from '../../translations';
import {
  Users,
  CheckCircle2,
  FolderKanban,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Send,
  Building2,
  Sparkles,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';

interface HeroSectionProps {
  currentLang: Language;
  stats: StatsSummary | null;
  onNavigate: (section: string) => void;
  telegramLink?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  stats,
  onNavigate,
  telegramLink = 'https://t.me/dergag_unity_official'
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#14213D] to-[#1E1B4B] text-white pt-16 pb-28 lg:pt-20 lg:pb-36 font-serif">
      {/* Decorative Subtle Floating Animated Shapes & Gradients */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#7C3AED]/30 via-[#1D4ED8]/25 to-transparent blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-10 left-10 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-[#059669]/25 via-[#E5A000]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#F4B942_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Top Badge: Emerald & Gold Decorative Accent */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#F4B942]/40 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#F4B942] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {currentLang === 'am' ? 'ይፋዊ የማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር' : 'Official Community Unity & Charity Association'}
              </span>
            </div>

            {/* Main Headline (Times New Roman Bold with Rich Color Accents) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.14] text-balance font-serif">
              {currentLang === 'am' ? (
                <>
                  <span className="text-white">በአንድነት ለወገናችን፣ </span>
                  <span className="bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#38BDF8] bg-clip-text text-transparent">በመተሳሰብ ለአካባቢያችን፣ </span>
                  <span className="bg-gradient-to-r from-[#F4B942] to-[#F59E0B] bg-clip-text text-transparent">በትብብር ለትውልዳችን!</span>
                </>
              ) : (
                <>
                  <span className="text-white">United in Unity, </span>
                  <span className="bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#38BDF8] bg-clip-text text-transparent">Serving Humanity, </span>
                  <span className="bg-gradient-to-r from-[#F4B942] to-[#F59E0B] bg-clip-text text-transparent">Building Our Future.</span>
                </>
              )}
            </h1>

            {/* Amharic/English Sub-headline in Warm Translucent Card */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-base sm:text-lg leading-relaxed shadow-xl">
              <p className="font-medium text-slate-100 leading-relaxed font-serif">
                {t.hero.description}
              </p>
            </div>

            {/* Primary Action Buttons (Gold gradient, Emerald gradient, Translucent Royal Blue) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('membership')}
                className="px-7 py-4 rounded-xl text-[#101F46] font-bold text-base bg-gradient-to-r from-[#F4B942] via-[#E5A000] to-[#D99A1E] hover:from-[#fcd34d] hover:to-[#f59e0b] shadow-xl shadow-[#F4B942]/25 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer font-serif"
              >
                <Users className="w-5 h-5 text-[#101F46]" />
                <span>{t.hero.ctaJoin}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('charity')}
                className="px-7 py-4 rounded-xl text-white font-bold text-base bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#047857] hover:from-[#10b981] hover:to-[#0f766e] shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer font-serif border border-emerald-400/40"
              >
                <HeartHandshake className="w-5 h-5 text-emerald-200" />
                <span>{t.hero.ctaDonate}</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-4 rounded-xl text-white font-bold text-base bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-md shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer font-serif"
              >
                <FolderKanban className="w-5 h-5 text-[#38BDF8]" />
                <span>{t.hero.ctaProjects}</span>
              </button>
            </div>

            {/* Trust and Telegram Indicators */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-semibold font-serif">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{currentLang === 'am' ? '100% የተረጋገጠ ማህበራዊ አሰራር' : '100% Verified Community Records'}</span>
              </div>
              <span className="text-slate-500">|</span>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#38BDF8] hover:text-[#7DD3FC] transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{currentLang === 'am' ? 'ይፋዊ የቴሌግራም ቻናል' : 'Official Telegram Community'}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Frame with Deep Blue & Purple Gradient Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden & Purple Glow Ring */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#F4B942] via-[#7C3AED] to-[#059669] rounded-3xl blur-2xl opacity-40 animate-pulse duration-700" />

              {/* Main Visual Presentation Card */}
              <div className="relative bg-[#101F46] rounded-3xl shadow-2xl overflow-hidden border-2 border-[#F4B942]/50">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="/src/assets/images/dergag_community_hero_1794153760705.jpg"
                    alt="Dergag community unity and charity association assembly in the green highland landscape"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Deep Blue & Purple Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#1E1B4B]/50 to-transparent" />

                  {/* Floating Overlay Info */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#F4B942] to-[#E5A000] text-[#101F46] font-bold text-xs mb-2 shadow-md uppercase tracking-wider font-serif">
                      {currentLang === 'am' ? 'የህዝብ አንድነትና ልማት' : 'Community Solidarity'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold leading-snug drop-shadow-md text-amber-100 font-serif">
                      {currentLang === 'am'
                        ? 'የደርጋጅ አካባቢ ተወላጆችና በጎ አድራጊዎች የጋራ ጉባዔ'
                        : 'Dergag Natives & Supporters United for Sustainable Grassroots Development'}
                    </h3>
                  </div>
                </div>

                {/* Secondary Feature Strip */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B132B] via-[#14213D] to-[#1E1B4B] border-t border-[#F4B942]/30 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-400/40 shadow-inner">
                    <div className="text-xs text-emerald-300 font-semibold font-serif">{t.stats.activeProjects}</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-0.5 font-serif">
                      {stats ? stats.activeProjects : 4}
                    </div>
                    <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1 font-bold font-serif">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {currentLang === 'am' ? 'በተግባር ላይ ያሉ' : 'Active Projects'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/40 shadow-inner">
                    <div className="text-xs text-blue-300 font-semibold font-serif">{t.stats.members}</div>
                    <div className="text-2xl font-bold text-blue-400 mt-0.5 font-serif">
                      {stats ? stats.registeredMembers : 38}
                    </div>
                    <div className="text-[11px] text-blue-200 mt-1 font-semibold font-serif">
                      {currentLang === 'am' ? 'የተመዘገቡ አባላት' : 'Verified Roster'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Seal Badge with Official Emblem */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0B132B]/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-2xl border-2 border-[#F4B942] flex items-center gap-3 transform hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-[#F4B942] flex items-center justify-center shadow-md flex-shrink-0">
                  <img
                    src="/assets/aistudio/image_79c33d08.png"
                    alt="Dergaj Kebele Administration Official Emblem"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-serif">
                    {currentLang === 'am' ? 'የደርጋጅ ቀበሌ አስተዳደር' : 'Dergaj Kebele Administration'}
                  </div>
                  <div className="text-xs text-[#F4B942] font-bold font-serif">
                    {currentLang === 'am' ? 'ወገራ ወረዳ • ማዕከላዊ ጎንደር' : 'Wegera Woreda • Central Gondar'}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 5. STATISTICS SECTION — 4 COLORFUL GRADIENT CARDS */}
        {/* Card 1: Royal Blue, Card 2: Emerald Green, Card 3: Purple, Card 4: Orange & Gold */}
        {/* ========================================================= */}
        <div className="mt-24 pt-12 border-t border-[#F4B942]/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {currentLang === 'am' ? 'የማህበሩ ተጨባጭ መረጃዎችና ቁጥራዊ ውጤቶች' : 'Verified Organizational Impact & Real Numbers'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1D4ED8] via-[#059669] to-[#F4B942] mx-auto mt-3 rounded-full" />
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-semibold font-serif">
              {t.hero.statsVerifiedNote}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Card 1: Royal Blue Gradient (#1D4ED8 to #2563EB) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative group overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1.5 border border-blue-400/30"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-blue-100 uppercase tracking-wider font-serif">{t.stats.members}</span>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
                {stats ? stats.registeredMembers : '38'}
              </div>
              <p className="text-xs text-blue-100 mt-3 font-medium font-serif leading-relaxed">
                {currentLang === 'am' ? 'በአባልነት የተረጋገጡ ወገኖች' : 'Verified Registered Members'}
              </p>
            </motion.div>

            {/* Card 2: Emerald Green Gradient (#059669 to #0D9488) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative group overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#059669] to-[#0D9488] text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1.5 border border-emerald-400/30"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-emerald-100 uppercase tracking-wider font-serif">{t.stats.completedProjects}</span>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
                {stats ? stats.completedProjects : '12'}
              </div>
              <p className="text-xs text-emerald-100 mt-3 font-medium font-serif leading-relaxed">
                {currentLang === 'am' ? 'የተጠናቀቁና የተረከቡ ፕሮጀክቶች' : 'Successfully Delivered Works'}
              </p>
            </motion.div>

            {/* Card 3: Purple Gradient (#7C3AED to #9333EA) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative group overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1.5 border border-purple-400/30"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-purple-100 uppercase tracking-wider font-serif">{t.stats.volunteers}</span>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
                {stats ? stats.volunteers : '85'}
              </div>
              <p className="text-xs text-purple-100 mt-3 font-medium font-serif leading-relaxed">
                {currentLang === 'am' ? 'ለወገን የቆሙ በጎ ፈቃደኞች' : 'Mobilized Community Volunteers'}
              </p>
            </motion.div>

            {/* Card 4: Orange & Gold Gradient (#F97316 to #E5A000) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative group overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#F97316] to-[#E5A000] text-[#101F46] shadow-xl hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1.5 border border-amber-300/40"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-[#101F46] uppercase tracking-wider font-serif">{t.stats.activeProjects}</span>
                <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-[#101F46] shadow-md">
                  <FolderKanban className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif text-[#101F46]">
                {stats ? stats.activeProjects : '4'}
              </div>
              <p className="text-xs text-[#101F46]/90 mt-3 font-bold font-serif leading-relaxed">
                {currentLang === 'am' ? 'በሂደት ላይ ያሉ የልማት ፕሮጀክቶች' : 'Ongoing Initiatives in Progress'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
