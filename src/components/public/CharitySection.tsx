import React, { useState } from 'react';
import { CharityCampaign, Language, OrganizationSettings } from '../../types';
import { translations } from '../../translations';
import {
  Heart,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle,
  Coins,
  Copy,
  Check,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface CharitySectionProps {
  currentLang: Language;
  campaigns: CharityCampaign[];
  settings?: OrganizationSettings;
  onNavigate: (section: string) => void;
}

export const CharitySection: React.FC<CharitySectionProps> = ({
  currentLang,
  campaigns,
  settings,
  onNavigate
}) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const t = translations[currentLang];

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(accountNumber);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const defaultAccounts = settings?.bankAccounts || [
    {
      bankName: 'Commercial Bank of Ethiopia (CBE)',
      accountNumber: '1000458921478',
      accountHolder: 'Dergag Community Unity & Charity Association',
      swiftCode: 'CBETETAA',
      color: 'from-[#1D4ED8] to-[#2563EB]'
    },
    {
      bankName: 'Awash Bank',
      accountNumber: '01320876543200',
      accountHolder: 'Dergag Charity Association',
      swiftCode: 'AWINETAA',
      color: 'from-[#E5A000] to-[#D97706]'
    },
    {
      bankName: 'Telebirr Institutional Merchant',
      accountNumber: '+251 91 123 4567 / Merchant ID: 889210',
      accountHolder: 'Dergag Unity Association',
      swiftCode: 'TELEBIRR',
      color: 'from-[#059669] to-[#0D9488]'
    }
  ];

  const getCampaignImage = (camp: CharityCampaign) => {
    if (camp.id === 'camp_1' || camp.title.toLowerCase().includes('medical')) {
      return '/src/assets/images/dergag_elder_charity_1794153783029.jpg';
    }
    if (camp.id === 'camp_2' || camp.title.toLowerCase().includes('orphan') || camp.title.toLowerCase().includes('student')) {
      return '/src/assets/images/dergag_school_children_1794153761478.jpg';
    }
    return camp.coverImage || '/src/assets/images/dergag_elder_charity_1794153783029.jpg';
  };

  return (
    <section id="charity" className="py-24 bg-gradient-to-br from-[#14213D] via-[#2A1B4E] to-[#101F46] text-white font-serif relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F4B942]/40 text-[#F4B942] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{t.charity.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif">
            {currentLang === 'am'
              ? 'የተረጋገጡ የበጎ አድራጎት ዘመቻዎችና የድጋፍ መንገዶች'
              : 'Verified Humanitarian Appeals & Transparent Giving'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#059669] via-[#F4B942] to-[#7C3AED] mx-auto mt-4 rounded-full" />
          <p className="text-purple-100/90 mt-4 text-base sm:text-lg font-medium leading-relaxed font-serif">
            {t.charity.subtitle}
          </p>

          {/* Institutional Integrity Notice with Emerald & Gold Accent */}
          <div className="mt-8 bg-white/10 backdrop-blur-md border-2 border-[#F4B942]/50 rounded-3xl p-5 text-sm text-amber-100 flex items-start gap-3.5 text-left shadow-xl">
            <ShieldCheck className="w-6 h-6 text-[#F4B942] flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-serif">
              {t.charity.disclaimer}
            </span>
          </div>
        </div>

        {/* Verified Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-[#0B132B]/90 backdrop-blur-md rounded-3xl border-2 border-purple-400/40 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={getCampaignImage(camp)}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#059669] text-white shadow-md font-serif">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                      <span>{currentLang === 'am' ? 'የተረጋገጠ የበጎ አድራጎት ጥሪ' : 'Verified Appeal'}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-xl border border-white/20 font-serif">
                    {camp.donationsCount || 50}+ {currentLang === 'am' ? 'ደጋፊዎች' : 'Contributors'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-4 font-serif">
                  <div className="flex items-center gap-2 text-xs text-purple-200 font-bold">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.charity.targetBeneficiary}:</span>
                    <span className="text-white font-bold">{camp.targetBeneficiary}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-[#F4B942] transition-colors">
                    {currentLang === 'am' ? (camp.titleAm || camp.title) : camp.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-serif">
                    {currentLang === 'am' ? (camp.descriptionAm || camp.description) : camp.description}
                  </p>

                  {/* Goal and Progress Cards */}
                  <div className="grid grid-cols-2 gap-3 bg-white/10 p-4 rounded-2xl border border-white/15">
                    <div>
                      <div className="text-xs text-amber-200 font-bold uppercase font-serif">{t.charity.goal}</div>
                      <div className="text-lg font-bold text-white mt-0.5 font-mono">{camp.goalAmount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300 font-bold uppercase font-serif">{t.charity.verifiedRaised}</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">{camp.verifiedProgress}</div>
                    </div>
                  </div>

                  {/* Payment Reference */}
                  <div className="text-xs bg-purple-900/40 p-4 rounded-2xl border border-purple-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-purple-200 block text-[11px] font-bold uppercase tracking-wider font-serif">
                        {currentLang === 'am' ? 'የክፍያ መለያ ማስታወሻ' : 'Payment Reference Notice'}
                      </span>
                      <span className="font-mono font-bold text-amber-300 text-sm">{camp.bankAccount}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(camp.bankAccount)}
                      className="p-2 rounded-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors cursor-pointer shadow-sm"
                      title="Copy reference"
                    >
                      {copiedBank === camp.bankAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-7 pt-0">
                <button
                  onClick={() => {
                    const el = document.getElementById('official-accounts');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#047857] hover:brightness-110 text-white text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-serif border border-emerald-400/30"
                >
                  <Coins className="w-4 h-4 text-[#F4B942]" />
                  <span>{currentLang === 'am' ? 'የባንክ ሂሳቦችን ይመልከቱ' : 'View Verified Bank Accounts'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Step Donation Instruction Guidelines */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border-2 border-white/15 shadow-2xl mb-20 font-serif">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#F4B942] uppercase tracking-wider">
              {currentLang === 'am' ? 'ግልጽ የድጋፍ አሰጣጥ' : 'Transparent Giving Process'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-serif">
              {t.charity.donateInstructions}
            </h3>
            <p className="text-purple-100 text-base mt-2 font-serif">
              {currentLang === 'am'
                ? 'ድጋፍዎ ለታለመለት አላማ ብቻ እንዲውል የተዘጋጀ ባለ 3 ደረጃ የኦዲት አሰራር'
                : 'Our verified 3-step audit process guarantees every single penny reaches target beneficiaries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B132B]/70 p-7 rounded-2xl border border-blue-400/30">
              <span className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-md font-serif">
                1
              </span>
              <h4 className="text-lg font-bold text-white mb-2 font-serif">
                {currentLang === 'am' ? 'ደረጃ 1: ህጋዊ ክፍያ' : 'Step 1: Direct Transfer'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-serif">
                {t.charity.step1}
              </p>
            </div>

            <div className="bg-[#0B132B]/70 p-7 rounded-2xl border border-amber-400/30">
              <span className="w-10 h-10 rounded-xl bg-[#E5A000] text-[#14213D] flex items-center justify-center font-bold text-sm mb-4 shadow-md font-serif">
                2
              </span>
              <h4 className="text-lg font-bold text-white mb-2 font-serif">
                {currentLang === 'am' ? 'ደረጃ 2: ደረሰኝ ማሳወቅ' : 'Step 2: Share Reference'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-serif">
                {t.charity.step2}
              </p>
            </div>

            <div className="bg-[#0B132B]/70 p-7 rounded-2xl border border-emerald-400/30">
              <span className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-md font-serif">
                3
              </span>
              <h4 className="text-lg font-bold text-white mb-2 font-serif">
                {currentLang === 'am' ? 'ደረጃ 3: ህጋዊ ማረጋገጫ' : 'Step 3: Verification'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-serif">
                {t.charity.step3}
              </p>
            </div>
          </div>
        </div>

        {/* Official Bank Accounts Cards */}
        <div id="official-accounts" className="scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {t.charity.bankTransfer}
            </h3>
            <p className="text-purple-200 text-sm mt-1.5 font-serif">
              {currentLang === 'am'
                ? 'የማህበሩ ኦፊሴላዊ የባንክ ሂሳቦች (ማንኛውንም ቁጥር ለመቅዳት ኮፒ የሚለውን ይጫኑ)'
                : 'Click copy to copy account number directly to your banking app'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="bg-[#0B132B]/95 p-7 rounded-3xl border-2 border-amber-400/50 hover:border-[#F4B942] shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#059669] flex items-center justify-center text-white border border-white/20 shadow-md">
                      <Building2 className="w-6 h-6 text-amber-200" />
                    </span>
                    <span className="text-[11px] uppercase font-bold text-emerald-400 font-mono">
                      {acc.swiftCode || 'Verified'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 font-serif">
                    {acc.bankName}
                  </h4>
                  <div className="text-xs text-slate-300 mb-5 font-serif">{acc.accountHolder}</div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-amber-300 tracking-wider select-all">
                      {acc.accountNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(acc.accountNumber)}
                      className="p-2.5 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 text-white transition-colors cursor-pointer shadow-sm"
                      title="Copy account number"
                    >
                      {copiedBank === acc.accountNumber ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-200" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-300 flex items-center justify-between font-serif">
                  <span>{currentLang === 'am' ? 'የደርጋጅ አንድነት ይፋዊ ሂሳብ' : 'Official Institutional Account'}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
