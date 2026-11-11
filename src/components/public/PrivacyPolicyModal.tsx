import React from 'react';
import { Language } from '../../types';
import { X, ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
  currentLang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type,
  currentLang
}) => {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#246BCE] flex items-center justify-center">
              {isPrivacy ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#102A43] font-ethiopic">
                {isPrivacy
                  ? (currentLang === 'am' ? 'የግል መረጃ አያያዝና ጥበቃ ፖሊሲ' : 'Privacy & Data Protection Policy')
                  : (currentLang === 'am' ? 'የአጠቃቀም መመሪያና ደንብ' : 'Terms of Service & Community Constitution')}
              </h3>
              <p className="text-xs text-slate-500">
                Dergag Community Unity & Charity Association
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-ethiopic overflow-y-auto">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-slate-900">
                {currentLang === 'am'
                  ? 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር (Dergag Unity) የአባላቱንና የደጋፊዎቹን የግል መረጃ ደህንነት በከፍተኛ ጥንቃቄ ይጠብቃል::'
                  : 'Dergag Community Unity & Charity Association strictly respects the privacy, confidentiality, and integrity of every member, applicant, and donor.'}
              </p>

              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#102A43] mb-1">
                    1. {currentLang === 'am' ? 'የምንሰበስባቸው መረጃዎች (Data Collected)' : 'Data We Collect'}
                  </h4>
                  <p>
                    {currentLang === 'am'
                      ? 'የአባልነት ማመልከቻ ሲያስገቡ ስም፣ ስልክ ቁጥር፣ ከተማ/ክልል እና ከደርጋጅ ጋር ያለዎትን ቁርኝት ብቻ እንሰበስባለን::'
                      : 'We only collect essential member registration details: full name, primary phone number, residence location, and background affinity.'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#102A43] mb-1">
                    2. {currentLang === 'am' ? 'የመረጃ አጠቃቀም (Purpose of Use)' : 'Usage of Data'}
                  </h4>
                  <p>
                    {currentLang === 'am'
                      ? 'የተሰበሰበው መረጃ ለማህበሩ ይፋዊ የአባላት መዝገብ፣ ለአባልነት መታወቂያ ዝግጅት እና ለአስፈላጊ ማህበራዊ ግንኙነቶች ብቻ ይውላል::'
                      : 'Data is strictly utilized for authorized membership review, issuing member IDs, volunteer project dispatch, and official general assembly notifications.'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#102A43] mb-1">
                    3. {currentLang === 'am' ? 'ሚስጥራዊነት ዋስትና (Zero PII Exposure)' : 'Zero-Trust Confidentiality'}
                  </h4>
                  <p>
                    {currentLang === 'am'
                      ? 'የአባላት ስልክ ቁጥሮች ወይም የግል አድራሻዎች በድረ-ገጹ ላይ በይፋ አይታዩም፤ ለሶስተኛ ወገን አይሸጡም::'
                      : 'Private personal contacts (phone, email, residence) are mathematically safeguarded from public view and only accessible to authorized membership officers.'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">
                {currentLang === 'am'
                  ? 'ይህ መመሪያ የማህበሩን ድረ-ገጽ እና የአባልነት አገልግሎት ሲጠቀሙ የሚተዳደሩበትን ህጋዊ አሰራር ይደነግጋል::'
                  : 'These terms govern user participation, membership responsibilities, and use of this official non-profit platform.'}
              </p>

              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#102A43] mb-1">
                    1. {currentLang === 'am' ? 'የአባልነት መብትና ግዴታ' : 'Membership Rights & Duties'}
                  </h4>
                  <p>
                    {currentLang === 'am'
                      ? 'ማንኛውም በህጋዊ መንገድ የጸደቀ አባል በጠቅላላ ጉባዔ ላይ የመሳተፍ፣ ሀሳብ የመስጠትና በልማት ስራዎች ላይ የመሳተፍ መብት አለው::'
                      : 'All approved members possess the constitutional right to vote in general assemblies, propose developmental projects, and inspect audited financial reports.'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#102A43] mb-1">
                    2. {currentLang === 'am' ? 'የፋይናንስና የበጎ አድራጎት ታማኝነት' : 'Financial Integrity'}
                  </h4>
                  <p>
                    {currentLang === 'am'
                      ? 'ማንኛውም የበጎ አድራጎት ክፍያ በማህበሩ ይፋዊ የባንክ ሂሳቦች ብቻ ይፈጸማል:: ያልተረጋገጡ የገንዘብ ማሰባሰቦች ህገ-ወጥ ናቸው::'
                      : 'Donations may only be transferred into official institutional accounts verified by our executive committee. No private accounts may be solicited under the association name.'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {currentLang === 'am' ? 'ተረድቻለሁ / ዝጋ' : 'I Understand & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
