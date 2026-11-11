import React from 'react';
import { Language } from '../../types';
import {
  Heart,
  Sparkles,
  Users,
  GraduationCap,
  Hammer,
  Globe2,
  ArrowRight,
  HandHeart,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

interface VolunteerSectionProps {
  currentLang: Language;
  onNavigate: (section: string) => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  currentLang,
  onNavigate
}) => {
  const volunteerAreas = [
    {
      icon: Hammer,
      titleAm: 'ሙያዊና ቴክኒካል አስተዋጽኦ',
      titleEn: 'Professional & Technical Skills',
      descAm: 'በህክምና፣ በኢንጂነሪንግ፣ በህግ፣ በሂሳብ፣ በመረጃ ቴክኖሎጂ እና በፕሮጀክት አስተዳደር እውቀትዎን ለደርጋጅ ልማት ያውሉ::',
      descEn: 'Offer your expertise in healthcare, civil engineering, law, accounting, IT systems, and project oversight.',
      badgeColor: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30'
    },
    {
      icon: GraduationCap,
      titleAm: 'የወጣቶችና ተማሪዎች ሞግዚትነት',
      titleEn: 'Youth & Student Mentorship',
      descAm: 'የደርጋጅ ተማሪዎችን በትምህርት ማብቃት፣ የዲጂታል ክህሎት ማሰልጠን እና የከፍተኛ ትምህርት እድል መመሪያ መስጠት::',
      descEn: 'Tutor students, teach computer literacy, mentor exam takers, and guide promising youth toward university success.',
      badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/30'
    },
    {
      icon: HandHeart,
      titleAm: 'የመስክ በጎ አድራጎትና እንክብካቤ',
      titleEn: 'Field Work & Humanitarian Aid',
      descAm: 'የምግብ፣ የአልባሳትና የመድሃኒት እርዳታ ማሸግ፣ ለአረጋውያንና አቅመ-ደካሞች ማድረስ እና ማህበረሰባዊ ዘመቻዎችን መምራት::',
      descEn: 'Package food rations, distribute seasonal relief supplies, visit elderly villagers, and coordinate charity drives.',
      badgeColor: 'bg-rose-400/20 text-rose-200 border-rose-400/30'
    },
    {
      icon: Globe2,
      titleAm: 'የዳያስፖራና የውጭ ትብብር',
      titleEn: 'Diaspora & Global Partnerships',
      descAm: 'በውጭ አገር የሚኖሩ የደርጋጅ ተወላጆችን ማስተባበር፣ የገንዘብና የግብአት ማሰባሰብ እና አለምአቀፍ አጋርነትን ማስፋፋት::',
      descEn: 'Mobilize diaspora chapters across North America, Europe, and the Middle East for vital infrastructure matching funds.',
      badgeColor: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#059669] via-[#166534] to-[#0D9488] text-white font-times relative overflow-hidden">
      {/* Decorative background visual flares */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Heart className="w-4 h-4 text-amber-300" />
            <span>{currentLang === 'am' ? 'የፈቃደኝነት አገልግሎት' : 'Volunteer With Us'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {currentLang === 'am'
              ? 'የለውጡ አካል ይሁኑ — በጉልበትዎ፣ በእውቀትዎ እና በጊዜዎ'
              : 'Be Part of the Change — Your Skills Can Transform Dergaj'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-white to-amber-300 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {currentLang === 'am'
              ? 'ማህበራችን እያንዳንዱን የደርጋጅ ተወላጅና ወዳጅ በፈቃደኝነት አገልግሎት እንዲሳተፍ በክብር ይጋብዛል:: ትንሽ ጥረት ትልቅ ታሪክ ይለውጣል::'
              : 'Our association invites every son, daughter, and supporter of Dergaj to lend their hands, hearts, and minds to uplift our ancestral home.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {volunteerAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300 mb-5 shadow-inner border border-white/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-3 ${area.badgeColor}`}>
                    {currentLang === 'am' ? `አቅጣጫ 0${index + 1}` : `Pillar 0${index + 1}`}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {currentLang === 'am' ? area.titleAm : area.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                    {currentLang === 'am' ? area.descAm : area.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-1.5 text-xs text-amber-200 font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentLang === 'am' ? 'ክፍት የፈቃደኝነት ሚና' : 'Active Volunteer Role'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Banner CTA */}
        <div className="bg-gradient-to-r from-[#14213D] via-[#1E3A8A] to-[#14213D] rounded-3xl p-8 sm:p-12 border-2 border-amber-300/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-[#E5A000] text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'am' ? 'አሁኑኑ ይመዝገቡ' : 'Immediate Registration'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {currentLang === 'am'
                ? 'በፈቃደኝነት ለመሳተፍ ዝግጁ ነዎት? ዛሬውኑ አባል ይሁኑ!'
                : 'Ready to dedicate your time and passion? Join as a volunteer member today!'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentLang === 'am'
                ? 'የአባልነት ማመልከቻ ቅጹን በመሙላት ፍላጎትዎን ይግለጹ፤ አስተባባሪ ኮሚቴው በፍጥነት ያገኝዎታል::'
                : 'Submit your membership and volunteer preferences form. Our mobilization team will connect with you within 48 hours.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('membership')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E5A000] to-[#F59E0B] hover:from-[#d97706] hover:to-[#b45309] text-[#14213D] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <span>{currentLang === 'am' ? 'በፈቃደኝነት ይመዝገቡ' : 'Register as Volunteer'}</span>
              <ArrowRight className="w-4 h-4 text-[#14213D]" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentLang === 'am' ? 'ጥያቄ አለዎት?' : 'Contact Coordinators'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
