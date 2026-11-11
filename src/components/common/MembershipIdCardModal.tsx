import React from 'react';
import { Member, Language } from '../../types';
import { Logo } from './Logo';
import { X, Printer, ShieldCheck, QrCode, Award, CheckCircle } from 'lucide-react';

interface MembershipIdCardModalProps {
  member: Member | null;
  onClose: () => void;
  currentLang: Language;
}

export const MembershipIdCardModal: React.FC<MembershipIdCardModalProps> = ({
  member,
  onClose,
  currentLang
}) => {
  if (!member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto font-serif">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#D6A84B] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="p-4 bg-[#14213D] text-white border-b border-[#D6A84B]/40 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D6A84B]" />
            <span className="text-[#D6A84B]">{currentLang === 'am' ? 'ይፋዊ የአባልነት መታወቂያ' : 'Official Membership ID Badge'}</span>
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable ID Card Container */}
        <div className="p-6 bg-[#FFFDF8]">
          <div className="relative bg-gradient-to-br from-[#14213D] via-[#102A43] to-[#0A1128] text-white rounded-2xl p-6 shadow-2xl border-2 border-[#D6A84B] overflow-hidden select-none print:shadow-none">
            {/* Hologram Accent Rings */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#D6A84B]/30 to-transparent blur-md pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-tr from-[#059669]/30 to-transparent blur-md pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-[#D6A84B]/40 pb-3 mb-4">
              <Logo size="sm" lightText={true} />
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest text-[#D6A84B] font-bold block">
                  COMMUNITY ID
                </span>
                <span className="font-mono font-bold text-xs text-white">
                  {member.memberId}
                </span>
              </div>
            </div>

            {/* Member Details */}
            <div className="flex items-center gap-4 my-4">
              {/* Photo Silhouette Placeholder / Badge */}
              <div className="w-20 h-24 rounded-xl bg-slate-900/90 border-2 border-[#D6A84B]/60 flex flex-col items-center justify-center text-center p-2 flex-shrink-0 shadow-inner">
                <div className="w-10 h-10 rounded-full bg-[#D6A84B]/20 flex items-center justify-center text-white mb-1 border border-[#D6A84B]/40">
                  <ShieldCheck className="w-6 h-6 text-[#D6A84B]" />
                </div>
                <span className="text-[8px] text-[#D6A84B] uppercase tracking-wider font-bold">
                  VERIFIED
                </span>
              </div>

              {/* Data Fields */}
              <div className="space-y-2 flex-1 min-w-0">
                <div>
                  <span className="text-[9px] text-[#D6A84B] uppercase tracking-wider font-bold block">
                    {currentLang === 'am' ? 'ሙሉ ስም / Full Name' : 'Full Name'}
                  </span>
                  <div className="font-bold text-base text-white truncate font-serif">
                    {member.fullName}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block">
                    {currentLang === 'am' ? 'ከተማ / ክልል' : 'Region / City'}
                  </span>
                  <div className="text-xs text-slate-200 truncate font-serif">
                    {member.cityRegion}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block">
                    {currentLang === 'am' ? 'የተቀላቀለበት / Joined' : 'Joined Date'}
                  </span>
                  <div className="text-xs text-[#D6A84B] font-mono">
                    {member.joinedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: QR Seal & Security Verification */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[9px] text-slate-300">
              <div className="space-y-0.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="tracking-wider">STATUS: {member.status.toUpperCase()}</span>
                </div>
                <div className="text-[8px] text-slate-300 font-serif">
                  የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር
                </div>
              </div>

              {/* QR Mockup */}
              <div className="w-11 h-11 bg-white rounded-lg p-1 flex items-center justify-center text-slate-900 shadow-sm border border-[#D6A84B]/50">
                <QrCode className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-blue-700 hover:to-blue-900 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Printer className="w-4 h-4 text-[#D6A84B]" />
            <span>{currentLang === 'am' ? 'መታወቂያውን አትም (Print)' : 'Print Member ID Badge'}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            {currentLang === 'am' ? 'ዝጋ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

