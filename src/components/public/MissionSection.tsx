import React from 'react';
import { Language } from '../../types';
import { translations } from '../../translations';
import {
  Sparkles,
  HeartHandshake,
  ShieldAlert,
  GraduationCap,
  Users,
  Building,
  Landmark,
  Heart,
  Target,
  Eye,
  ArrowRight,
  Sun,
  Flame,
  Award
} from 'lucide-react';

interface MissionSectionProps {
  currentLang: Language;
  onNavigate: (section: string) => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
  currentLang,
  onNavigate
}) => {
  const t = translations[currentLang];

  // 8 Colorful Objective Categories as requested in Section 8 of the prompt
  const objectives = [
    {
      id: 'spiritual',
      title: currentLang === 'am' ? 'መንፈሳዊና ስነ-ምግባራዊ ልማት' : 'Spiritual & Moral Development',
      desc: currentLang === 'am'
        ? 'የአብሮነት፣ የሰላም፣ የይቅርታ እና የጋራ መረዳዳት መንፈስ በማህበረሰቡ ዘንድ እንዲሰርጽ ማድረግ፤ ወጣቶች በከፍተኛ ስነ-ምግባር ታንጸው እንዲያድጉ መደገፍ::'
        : 'Fostering moral integrity, mutual reconciliation, ethical conduct, and communal peace through traditional inter-generational dialogues and community teachings.',
      icon: Flame,
      color: 'from-[#7C3AED] to-[#9333EA]',
      cardBg: 'bg-[#F5F3FF]/80',
      borderColor: 'border-purple-300',
      tagColor: 'text-[#7C3AED]',
      tag: currentLang === 'am' ? 'ስነ-ምግባር' : 'Spiritual'
    },
    {
      id: 'social',
      title: currentLang === 'am' ? 'ማህበራዊ ደህንነትና ድጋፍ' : 'Social Welfare & Relief',
      desc: currentLang === 'am'
        ? 'በድንገተኛ አደጋ፣ በህመም ወይም በአቅመ ደካማነት ለተጎዱ ወገኖች አስቸኳይ የህክምና፣ የምግብና የመጠለያ ሰብአዊ ድጋፍ ማድረስ::'
        : 'Delivering urgent emergency assistance, disaster relief, medical catastrophe sponsorships, and food security safety nets to households in acute distress.',
      icon: HeartHandshake,
      color: 'from-[#F43F5E] to-[#E11D48]',
      cardBg: 'bg-[#FFF1F2]/80',
      borderColor: 'border-rose-300',
      tagColor: 'text-[#F43F5E]',
      tag: currentLang === 'am' ? 'ሰብአዊ ድጋፍ' : 'Welfare'
    },
    {
      id: 'education',
      title: currentLang === 'am' ? 'ትምህርትና አቅም ግንባታ' : 'Education & Literacy',
      desc: currentLang === 'am'
        ? 'የትምህርት ቁሳቁሶችን ማሟላት፣ የነጻ ትምህርት ዕድሎችን (Scholarships) ማመቻቸት እና ለትምህርት ቤቶች ድጋፍ ማድረግ::'
        : 'Comprehensive educational scholarships, modern learning resources, school library book drives, and academic excellence awards for children.',
      icon: GraduationCap,
      color: 'from-[#1D4ED8] to-[#2563EB]',
      cardBg: 'bg-[#EFF6FF]/80',
      borderColor: 'border-blue-300',
      tagColor: 'text-[#1D4ED8]',
      tag: currentLang === 'am' ? 'ትምህርት' : 'Education'
    },
    {
      id: 'youth',
      title: currentLang === 'am' ? 'የወጣቶች ማብቃት' : 'Youth Empowerment',
      desc: currentLang === 'am'
        ? 'ወጣቶችን በስራ ፈጠራ፣ በቴክኖሎጂ ክህሎትና በሙያ ስልጠና ማብቃት፤ የስራ ዕድሎችን ለመፍጠር የብድርና ቁሳቁስ ድጋፍ ማመቻቸት::'
        : 'Vocational training, programming & IT workshops, mentorship forums, and startup incubation support for aspiring youth entrepreneurs.',
      icon: Users,
      color: 'from-[#F97316] to-[#EA580C]',
      cardBg: 'bg-[#FFF7ED]/80',
      borderColor: 'border-orange-300',
      tagColor: 'text-[#F97316]',
      tag: currentLang === 'am' ? 'ወጣቶች' : 'Youth'
    },
    {
      id: 'women',
      title: currentLang === 'am' ? 'የሴቶች ማህበራዊ አቅም' : 'Women Empowerment',
      desc: currentLang === 'am'
        ? 'እናቶችንና ወጣት ሴቶችን በቁጠባና ብድር ማህበራት ማደራጀት፣ የገቢ ማስገኛ ስራዎችን ማስተዋወቅ እና የእናቶችና ህጻናት ጤናን መደገፍ::'
        : 'Advancing women self-reliance through micro-credit unions, artisanal cooperatives, leadership circles, and mother-and-child health advocacy.',
      icon: Award,
      color: 'from-[#EC4899] to-[#DB2777]',
      cardBg: 'bg-[#FDF2F8]/80',
      borderColor: 'border-pink-300',
      tagColor: 'text-[#EC4899]',
      tag: currentLang === 'am' ? 'ሴቶችና እናቶች' : 'Women'
    },
    {
      id: 'infrastructure',
      title: currentLang === 'am' ? 'አካባቢያዊ ልማት' : 'Community Development',
      desc: currentLang === 'am'
        ? 'የንጹህ መጠጥ ውሃ መስመሮች ቁፋሮ፣ የጤና ኬላዎች እድሳት፣ የገጠር መንገዶችና የአካባቢ ጥበቃ ስራዎችን ማከናወን::'
        : 'Mobilizing community funding and technical expertise for deep-well clean water systems, school library expansion, health clinics, and rural access roads.',
      icon: Building,
      color: 'from-[#059669] to-[#047857]',
      cardBg: 'bg-[#ECFDF5]/80',
      borderColor: 'border-emerald-300',
      tagColor: 'text-[#059669]',
      tag: currentLang === 'am' ? 'መሰረተ ልማት' : 'Infrastructure'
    },
    {
      id: 'culture',
      title: currentLang === 'am' ? 'ባህላዊ ቅርስ ጥበቃ' : 'Cultural Preservation',
      desc: currentLang === 'am'
        ? 'የደርጋጅ አካባቢን መልካም ወጎች፣ ታሪካዊ ቅርሶች፣ አገር በቀል እውቀቶችንና ማንነትን በመሰነድ ለቀጣዩ ትውልድ ማስተላለፍ::'
        : 'Documenting, recording, and celebrating the indigenous heritage, oral history, literature, and harmonious traditions of the Dergag community.',
      icon: Landmark,
      color: 'from-[#E5A000] to-[#D97706]',
      cardBg: 'bg-[#FFFBEB]/80',
      borderColor: 'border-amber-300',
      tagColor: 'text-[#B45309]',
      tag: currentLang === 'am' ? 'ቅርስና ታሪክ' : 'Heritage'
    },
    {
      id: 'volunteers',
      title: currentLang === 'am' ? 'የበጎ ፈቃድ አገልግሎት' : 'Volunteer Activities',
      desc: currentLang === 'am'
        ? 'በአገር ውስጥና በውጭ አገር የሚኖሩ የደርጋጅ ተወላጆችን ማስተሳሰር፤ በሙያና በጉልበት የማህበረሰብ አገልግሎት መስጠት::'
        : 'Connecting local residents with passionate diaspora chapters worldwide, mobilizing medical missions, legal aid, and civil engineering volunteers.',
      icon: Heart,
      color: 'from-[#0D9488] to-[#0F766E]',
      cardBg: 'bg-[#F0FDFA]/80',
      borderColor: 'border-teal-300',
      tagColor: 'text-[#0D9488]',
      tag: currentLang === 'am' ? 'ፈቃደኝነት' : 'Volunteers'
    }
  ];

  return (
    <section id="mission" className="py-24 bg-gradient-to-b from-[#ECFDF5] via-[#F0FDF4] to-[#FFFBEB] font-serif relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#059669] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300">
            <Sparkles className="w-4 h-4 text-[#E5A000]" />
            <span>{currentLang === 'am' ? 'ራዕይና ተልዕኳችን' : 'Mission, Vision & Objectives'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight font-serif">
            {currentLang === 'am'
              ? 'የደርጋጅ ማህበረሰብ አንድነት ራዕይ፣ ተልዕኮ እና የትኩረት መስኮች'
              : 'Our Mission, Vision, and Core Strategic Objectives'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#E5A000] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 leading-relaxed text-base sm:text-lg font-medium font-serif">
            {t.missionVision.subtitle}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 7. MISSION & VISION — 2 DISTINCTIVE COLOR CARDS */}
        {/* Mission: Emerald-to-Teal Gradient, Vision: Purple-to-Blue Gradient */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card: Emerald-to-Teal Gradient */}
          <div className="bg-gradient-to-br from-[#059669] to-[#0D9488] text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden border-2 border-emerald-300/40 transform hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-inner">
              <Target className="w-8 h-8 text-amber-200" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-100 block mb-2 font-serif">
              {currentLang === 'am' ? 'የማህበሩ ተልዕኮ' : 'OUR PURPOSE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-serif text-white">
              {t.missionVision.missionTitle}
            </h3>
            <p className="text-emerald-50 leading-relaxed text-base sm:text-lg font-serif">
              {t.missionVision.missionDesc}
            </p>
          </div>

          {/* Vision Card: Purple-to-Blue Gradient */}
          <div className="bg-gradient-to-br from-[#7C3AED] to-[#1D4ED8] text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden border-2 border-purple-300/40 transform hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-inner">
              <Eye className="w-8 h-8 text-amber-200" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-100 block mb-2 font-serif">
              {currentLang === 'am' ? 'የወደፊት ራዕያችን' : 'OUR VISION'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-serif text-white">
              {t.missionVision.visionTitle}
            </h3>
            <p className="text-purple-50 leading-relaxed text-base sm:text-lg font-serif">
              {t.missionVision.visionDesc}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 8. OBJECTIVES SECTION — 8 COLORFUL CATEGORY CARDS */}
        {/* ========================================================= */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A000]" />
              <span>{currentLang === 'am' ? '8ቱ ቁልፍ ዓላማዎቻችን' : 'Core Operational Objectives'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14213D] font-serif">
              {currentLang === 'am'
                ? 'ማህበሩ በትኩረት የሚንቀሳቀስባቸው 8ቱ ዘርፎች'
                : 'Eight Strategic Areas of Focus'}
            </h3>
            <p className="text-slate-600 mt-2 text-base font-serif">
              {t.pillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`${item.cardBg} backdrop-blur-sm rounded-3xl p-7 border-2 ${item.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-800 border border-slate-200 font-mono shadow-2xs">
                        0{idx + 1}
                      </span>
                    </div>

                    <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-1.5 font-serif ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <h4 className="text-lg font-bold text-[#14213D] mb-2.5 group-hover:text-[#1D4ED8] transition-colors leading-snug font-serif">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-serif">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-[#1D4ED8] font-serif">
                    <button
                      onClick={() => onNavigate('projects')}
                      className="flex items-center gap-1.5 hover:text-[#059669] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                    >
                      <span>{currentLang === 'am' ? 'ፕሮጀክቶችን እይ' : 'Explore Projects'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#14213D] via-[#1D4ED8] to-[#14213D] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border-2 border-[#E5A000]/40">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
              {currentLang === 'am'
                ? 'በእነዚህ የትኩረት መስኮች በዕውቀትዎ ወይም በጉልበትዎ መሳተፍ ይፈልጋሉ?'
                : 'Want to contribute your skills or resources to these objectives?'}
            </h3>
            <p className="text-slate-200 text-base leading-relaxed font-serif">
              {currentLang === 'am'
                ? 'የማህበሩ አባል በመሆን አሻራዎን ያኑሩ፤ ለወገንዎ ድምጽ ይሁኑ::'
                : 'Join the association as an approved active member or volunteer specialist.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('membership')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5A000] via-[#F59E0B] to-[#D97706] hover:brightness-110 text-[#14213D] font-bold text-base shadow-xl transition-all whitespace-nowrap cursor-pointer transform hover:scale-105 active:scale-95 font-serif"
          >
            {t.hero.ctaJoin}
          </button>
        </div>
      </div>
    </section>
  );
};
