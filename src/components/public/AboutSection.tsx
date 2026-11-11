import React from 'react';
import { Language, OrganizationSettings } from '../../types';
import { translations } from '../../translations';
import {
  History,
  Target,
  Eye,
  Award,
  Users2,
  Heart,
  Scale,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Building2,
  ArrowRight
} from 'lucide-react';

interface AboutSectionProps {
  currentLang: Language;
  settings?: OrganizationSettings;
  onNavigate: (section: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang,
  settings,
  onNavigate
}) => {
  const t = translations[currentLang];

  const values = [
    {
      title: currentLang === 'am' ? 'አንድነትና ህብረት' : 'Unity & Solidarity',
      desc: currentLang === 'am' ? 'የተጠናከረ የማህበረሰብ ትስስር፣ ወንድማማችነት እና የጋራ አቋም መገንባት::' : 'Fostering deep community cohesion, brotherhood, and collaborative progress.',
      icon: Users2,
      badgeColor: 'bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] text-white',
      borderColor: 'border-blue-200'
    },
    {
      title: currentLang === 'am' ? 'ርህራሄና መረዳዳት' : 'Compassion & Care',
      desc: currentLang === 'am' ? 'ለተቸገሩ ወገኖች፣ አረጋውያንና ወላጅ አልባ ህጻናት ከልብ የደረሰ ሰብአዊ ድጋፍ መስጠት::' : 'Providing sincere humanitarian solace and tangible safety nets for vulnerable citizens.',
      icon: Heart,
      badgeColor: 'bg-gradient-to-br from-[#059669] to-[#0D9488] text-white',
      borderColor: 'border-emerald-200'
    },
    {
      title: currentLang === 'am' ? 'ግልጽነትና ተጠያቂነት' : 'Transparency & Accountability',
      desc: currentLang === 'am' ? 'በእያንዳንዱ የፋይናንስ እንቅስቃሴና ፕሮጀክት አፈጻጸም ግልጽ የሆነ የሂሳብ ሪፖርት ማቅረብ::' : 'Ensuring complete financial transparency with audited records open to the community.',
      icon: Scale,
      badgeColor: 'bg-gradient-to-br from-[#E5A000] to-[#F59E0B] text-[#14213D]',
      borderColor: 'border-amber-200'
    },
    {
      title: currentLang === 'am' ? 'እኩልነትና ፍትህ' : 'Equality & Inclusiveness',
      desc: currentLang === 'am' ? 'ያለ ምንም ልዩነት ሁሉንም ማህበረሰብ በእኩልነትና በአክብሮት ማገልገል::' : 'Serving every native and resident without bias, prejudice, or discrimination.',
      icon: Award,
      badgeColor: 'bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF] font-serif relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-12 left-0 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-300 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-3">
            <History className="w-4 h-4 text-[#E5A000]" />
            <span>{currentLang === 'am' ? 'ስለ ማህበራችን' : 'About Dergag Unity'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight font-serif">
            {currentLang === 'am'
              ? 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር'
              : 'Our Heritage, Foundation, and Community Philosophy'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1D4ED8] via-[#059669] to-[#E5A000] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 leading-relaxed text-base sm:text-lg font-medium font-serif">
            {settings?.sloganAm || t.slogan}
          </p>
        </div>

        {/* Beautiful Split Layout (Left: Large Community Image with Accents, Right: Description & Read More) */}
        <div className="bg-white/90 backdrop-blur-md border-2 border-blue-200/80 rounded-3xl p-8 sm:p-14 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Large Community Image Frame (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow accents */}
                <div className="absolute -inset-3 bg-gradient-to-r from-[#059669] via-[#E5A000] to-[#1D4ED8] rounded-3xl blur-xl opacity-30" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/src/assets/images/dergag_cultural_unity_1794153762204.jpg"
                    alt="Dergag community elders and supporters in traditional gathering"
                    className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E5A000] text-[#14213D] font-bold text-xs uppercase tracking-wider mb-1">
                      {currentLang === 'am' ? 'ባህላዊ እሴቶቻችን' : 'Cultural Heritage'}
                    </span>
                    <div className="text-base font-bold font-serif text-amber-100">
                      {currentLang === 'am' ? 'የአባቶች ምክርና የትውልድ ትስስር' : 'Intergenerational Wisdom & Communal Bonding'}
                    </div>
                  </div>
                </div>

                {/* Floating Seal Badge */}
                <div className="absolute -bottom-6 -right-4 bg-gradient-to-r from-[#059669] to-[#0D9488] text-white py-3 px-5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-200" />
                  <div>
                    <div className="text-xs font-bold">{currentLang === 'am' ? 'ህጋዊ ተቋም' : 'Legally Registered'}</div>
                    <div className="text-[10px] text-emerald-100 font-sans">Dergag Charity &bull; 100% Verified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Organization Story & Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A000]" />
                <span>{currentLang === 'am' ? 'የማህበሩ ታሪክ' : 'Our Story & Foundation'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#14213D] font-serif leading-tight">
                {currentLang === 'am' ? 'የደርጋጅ ማህበረሰብ ታሪካዊ አንድነትና አመሰራረት' : 'History & Establishment of Dergag Unity'}
              </h3>
              <p className="text-slate-700 leading-relaxed text-base font-serif">
                {currentLang === 'am'
                  ? (settings?.aboutHistoryAm || 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር በአካባቢው የሀገር ሽማግሌዎች፣ ወጣቶች፣ የትምህርትና የህክምና ባለሙያዎች እንዲሁም በሀገር ውስጥና በውጭ ሀገር በሚኖሩ ተወላጆች የጋራ ጥረት የተመሰረተ ህጋዊና ሰብአዊ ተቋም ነው:: ማህበሩ የተመሰረተበት ዋነኛ ምክንያት በአካባቢው የሚታዩትን ማህበራዊና ኢኮኖሚያዊ ክፍተቶች በህብረት ለመፍታት፣ ለችግረኞችና አቅመ ደካሞች አጋር ለመሆን እንዲሁም የደርጋጅን ዘላቂ እድገት ለማረጋገጥ ነው::')
                  : (settings?.aboutHistory || 'Dergag Community Unity & Charity Association was established by dedicated elders, community representatives, professionals, and youth originating from the Dergag area. The association was founded to bridge critical socio-economic gaps through organized solidarity, provide urgent humanitarian relief for vulnerable citizens, and spearhead long-term community development projects.')}
              </p>
              <p className="text-slate-700 leading-relaxed text-base font-serif">
                {currentLang === 'am'
                  ? 'ማህበሩ በህጋዊ መንገድ የተመዘገበ ሲሆን፤ አሰራሩ ሙሉ በሙሉ በአባላት ፈቃደኝነት፣ ግልጽ በሆነ የፋይናንስ አስተዳደርና የዲሞክራሲያዊ ውሳኔ አሰጣጥ መርህ ላይ የተመሰረተ ነው::'
                  : 'Operating under strict transparent bylaws and accountable governance, our association harnesses the collective strength of members to transform health, education, water security, and youth prospects.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('mission')}
                  className="px-6 py-3.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-blue-700 hover:to-blue-800 shadow-md transition-all flex items-center gap-2 cursor-pointer font-serif"
                >
                  <span>{currentLang === 'am' ? 'ተልዕኳችንን ይመልከቱ' : 'Explore Our Mission'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-3.5 rounded-xl text-[#14213D] font-bold text-sm bg-white hover:bg-slate-50 border-2 border-slate-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer font-serif"
                >
                  <span>{currentLang === 'am' ? 'ተግባራችንን ይመልከቱ' : 'View Projects'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className={`bg-white p-7 rounded-3xl border-2 ${val.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-md ${val.badgeColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#14213D] mb-2 font-serif">
                  {val.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-serif">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
