import React from 'react';
import { Language } from '../../types';
import {
  Quote,
  Star,
  CheckCircle,
  MapPin,
  Heart,
  Sparkles,
  Users
} from 'lucide-react';

interface TestimonialsSectionProps {
  currentLang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ currentLang }) => {
  const testimonials = [
    {
      nameAm: 'አቶ አበባው መኮንን (የማህበረሰብ ሽማግሌ)',
      nameEn: 'Ato Abebaw Mekonnen (Community Elder)',
      roleAm: 'የደርጋጅ ቀበሌ ነዋሪ',
      roleEn: 'Lifelong Dergaj Resident',
      locationAm: 'ደርጋጅ፣ ወገራ',
      locationEn: 'Dergaj, Wegera',
      quoteAm: 'ይህ ማህበር ከተመሠረተ ጀምሮ በአካባቢያችን የታየው የንፁህ መጠጥ ውሃ እና የትምህርት ቤት ድጋፍ ተስፋችንን አድሷል:: ልጆቻችን የትውልድ ቀያቸውን እንዳይረሱ ያደረገ ታላቅ በረከት ነው::',
      quoteEn: 'Since this association was founded, the clean water points and school support delivered to our village have renewed our hope. It is a blessing connecting our children back to their roots.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badgeAm: 'የአገር ሽማግሌ ምስክርነት',
      badgeEn: 'Elder Testimony',
      accentColor: 'border-rose-300 bg-rose-50/60 text-rose-900'
    },
    {
      nameAm: 'ዶ/ር አለምነሽ ካሳሁን',
      nameEn: 'Dr. Alemnesh Kassahun',
      roleAm: 'የዳያስፖራ የህክምና ግብረ-ኃይል አስተባባሪ',
      roleEn: 'Diaspora Medical Taskforce Lead',
      locationAm: 'ዋሽንግተን ዲሲ፣ አሜሪካ',
      locationEn: 'Washington D.C., USA',
      quoteAm: 'በውጭ አገር የምንኖር የደርጋጅ ተወላጆች ከአገራችን ጋር በግልጽና በታማኝነት እንድንገናኝ፣ የተሰበሰበው እያንዳንዱ ሳንቲም ለህዝባችን ህይወት አድን አገልግሎት እንዲውል ያደረገው ግልጽነት አስደናቂ ነው::',
      quoteEn: 'For those of us in the diaspora, the verified financial transparency ensures every single dollar reaches life-saving healthcare and youth programs in our native land.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      badgeAm: 'የዳያስፖራ አጋር',
      badgeEn: 'Diaspora Leader',
      accentColor: 'border-purple-300 bg-purple-50/60 text-purple-900'
    },
    {
      nameAm: 'ወ/ሮ ዘውድነሽ ታደለ',
      nameEn: 'W/ro Zewdinesh Tadele',
      roleAm: 'የሴቶችና ቤተሰብ ድጋፍ ተጠቃሚ',
      roleEn: 'Women & Family Program Beneficiary',
      locationAm: 'ጎንደር / ደርጋጅ',
      locationEn: 'Gondar / Dergaj',
      quoteAm: 'በበዓላት ወቅት የሚደረግልን የበጎ አድራጎት ማዕድ ማጋራት እና ለልጆቻችን የተሰጡ የትምህርት ደብተሮች ከከባድ ሸክም አሳርፈውናል:: የማህበሩ አባላት እድሜና ጤና ይስጣቸው::',
      quoteEn: 'The holiday food baskets and scholastic supplies provided to our children lifted an enormous burden from our shoulders. May God bless every member who makes this possible.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      badgeAm: 'የበጎ አድራጎት ተጠቃሚ',
      badgeEn: 'Community Beneficiary',
      accentColor: 'border-amber-300 bg-amber-50/60 text-amber-900'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF1F2] via-[#FDF2F8]/60 to-[#F5F3FF] font-times border-t border-rose-200/70 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>{currentLang === 'am' ? 'የማህበረሰብ ድምጾች' : 'Community Voices'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            {currentLang === 'am'
              ? 'የአካባቢው ነዋሪዎች፣ ሽማግሌዎችና የዳያስፖራ አባላት ምስክርነት'
              : 'Voices of Hope — Testimonies from Elders, Residents & Diaspora'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 via-purple-500 to-[#2563EB] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium leading-relaxed">
            {currentLang === 'am'
              ? 'ማህበራችን በህዝብ ፍቅርና አንድነት ላይ የተመሠረተ በመሆኑ በእያንዳንዱ ፕሮጀክት የተገኙ ውጤቶች በነዋሪዎች አንደበት ይመሰከራሉ::'
              : 'Our unity is built on authentic trust. Hear real stories of impact directly from our community members, elders, and global partners.'}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border-2 border-rose-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-50 rounded-bl-full -z-0 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Top header badge & Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${item.accentColor}`}>
                    {currentLang === 'am' ? item.badgeAm : item.badgeEn}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-200 shadow-2xs">
                    <Quote className="w-5 h-5 text-rose-500" />
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#E5A000]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8 font-serif">
                  "{currentLang === 'am' ? item.quoteAm : item.quoteEn}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-rose-100 flex items-center gap-4 relative z-10">
                <img
                  src={item.avatar}
                  alt={item.nameEn}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-300 shadow-sm"
                />
                <div>
                  <h4 className="text-base font-bold text-[#14213D] leading-snug">
                    {currentLang === 'am' ? item.nameAm : item.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {currentLang === 'am' ? item.roleAm : item.roleEn}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-[#059669] font-bold mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{currentLang === 'am' ? item.locationAm : item.locationEn}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
