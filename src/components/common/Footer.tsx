import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language, OrganizationSettings } from '../../types';
import { translations } from '../../translations';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Heart
} from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (section: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
  settings?: OrganizationSettings;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
  settings
}) => {
  const t = translations[currentLang];
  const year = new Date().getFullYear();
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <footer className="bg-gradient-to-b from-[#0A1128] via-[#0E1B38] to-[#14213D] text-slate-300 border-t-4 border-[#E5A000] pt-20 pb-10 transition-colors font-times relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-slate-700/60">
          {/* Column 1: Organization Identity & Mission */}
          <div className="space-y-5">
            <Logo size="lg" lightText={true} />
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {currentLang === 'am'
                ? 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር በአካባቢው ተወላጆችና ደጋፊዎች የተቋቋመ ህጋዊ የማህበረሰብ ልማትና ሰብአዊ ድጋፍ ድርጅት ነው::'
                : 'Dergag Community Unity & Charity Association is an authorized community development and humanitarian non-profit founded by natives and supporters of the Dergag area.'}
            </p>
            <div className="pt-2">
              <a
                href={settings?.telegramLink || 'https://t.me/dergag_unity_official'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-900/40 border border-blue-400/30"
              >
                <Send className="w-4 h-4 text-[#E5A000]" />
                <span>{t.contact.telegramGroup}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-[#E5A000] pl-3">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'about', label: t.nav.about },
                { id: 'mission', label: t.nav.mission },
                { id: 'projects', label: t.nav.projects },
                { id: 'charity', label: t.nav.charity },
                { id: 'membership', label: t.nav.membership },
                { id: 'news', label: t.nav.news },
                { id: 'events', label: t.nav.events },
                { id: 'gallery', label: t.nav.gallery },
                { id: 'contact', label: t.nav.contact },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-slate-300 hover:text-[#E5A000] hover:translate-x-1.5 transition-all cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Donation Pathways */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-[#059669] pl-3">
              {t.charity.bankTransfer}
            </h3>
            <div className="space-y-3 text-xs">
              {/* CBE */}
              <div
                onClick={() => copyToClipboard('1000458921478', 'CBE')}
                className="bg-slate-900/80 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 cursor-pointer transition-all hover:border-[#E5A000] relative group shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">Commercial Bank of Ethiopia (CBE)</div>
                  {copiedBank === 'CBE' ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E5A000]" />
                  )}
                </div>
                <div className="text-[#E5A000] font-mono font-bold tracking-wider mt-1 text-sm">
                  1000458921478
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Dergag Community Unity & Charity</div>
              </div>

              {/* Awash */}
              <div
                onClick={() => copyToClipboard('01320876543200', 'Awash')}
                className="bg-slate-900/80 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 cursor-pointer transition-all hover:border-[#E5A000] relative group shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">Awash Bank</div>
                  {copiedBank === 'Awash' ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E5A000]" />
                  )}
                </div>
                <div className="text-[#E5A000] font-mono font-bold tracking-wider mt-1 text-sm">
                  01320876543200
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Dergag Charity Association</div>
              </div>

              {/* Telebirr */}
              <div
                onClick={() => copyToClipboard('+251911234567', 'Telebirr')}
                className="bg-slate-900/80 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 cursor-pointer transition-all hover:border-[#059669] relative group shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">Telebirr Institutional Merchant</div>
                  {copiedBank === 'Telebirr' ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                  )}
                </div>
                <div className="text-emerald-400 font-mono font-bold tracking-wider mt-1 text-sm">
                  +251 91 123 4567
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 border-l-4 border-[#2563EB] pl-3">
              {t.contact.officeInfo}
            </h3>
            <ul className="space-y-3.5 text-xs leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E5A000] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{settings?.address || 'Dergag Center Office & Addis Ababa Liaison Branch (Bole Sub-City), Ethiopia'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <span className="font-mono text-slate-300">{settings?.phone || '+251 91 123 4567 / +251 92 987 6543'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#059669] flex-shrink-0" />
                <span className="font-mono text-slate-300">{settings?.email || 'info@dergagunity.org'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-slate-300">{settings?.officeHours || 'Mon - Sat: 8:30 AM - 5:30 PM (EAT)'}</span>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-700/60">
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors cursor-pointer hover:border-[#E5A000]"
              >
                <ShieldCheck className="w-4 h-4 text-[#E5A000]" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#E5A000]" />
            <span>
              &copy; {year} {currentLang === 'am' ? 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር' : 'Dergag Community Unity & Charity Association'}. {t.footer.legalNotice}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#E5A000] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footer.privacyPolicy}
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#E5A000] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footer.termsOfService}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
