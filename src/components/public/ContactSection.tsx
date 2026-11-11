import React, { useState } from 'react';
import { Language, OrganizationSettings } from '../../types';
import { translations } from '../../translations';
import { api } from '../../services/api';
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  settings?: OrganizationSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  settings
}) => {
  const t = translations[currentLang];

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!senderName.trim() || !senderPhone.trim() || !message.trim()) {
      setErrorMessage(currentLang === 'am' ? 'እባክዎ ስም፣ ስልክ እና መልእክትዎን ያስገቡ' : 'Please provide name, phone and message');
      return;
    }

    try {
      setSubmitting(true);
      await api.sendMessage({
        senderName,
        senderPhone,
        senderEmail,
        subject: subject || (currentLang === 'am' ? 'አጠቃላይ ጥያቄ' : 'General Inquiry'),
        message
      });
      setSentSuccess(true);
      setSenderName('');
      setSenderPhone('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EFF6FF] to-[#F8FAFC] relative overflow-hidden font-times border-t border-blue-100">
      {/* Decorative luxury radial background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <PhoneCall className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{t.contact.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] leading-tight">
            {currentLang === 'am'
              ? 'የማህበሩን ቢሮ ያግኙ፣ ጥያቄዎን ወይም አስተያየትዎን ይላኩ'
              : 'Contact Headquarters, Leadership & Regional Branches'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2563EB] via-[#D6A84B] to-[#059669] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Information, Telegram & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Telegram Community Highlight Card */}
            <div className="bg-gradient-to-br from-[#14213D] via-[#1E3A8A] to-[#14213D] text-white rounded-3xl p-8 shadow-xl border-2 border-amber-400/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-5 shadow-inner border border-white/20">
                <Send className="w-7 h-7 text-[#E5A000]" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#E5A000]/20 text-[#E5A000] border border-[#E5A000]/40 text-[10px] font-bold uppercase tracking-wider mb-2">
                Verified Community
              </div>
              <h3 className="text-2xl font-bold leading-snug">
                {t.contact.telegramGroup}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                {t.contact.telegramDesc}
              </p>
              <div className="mt-6">
                <a
                  href={settings?.telegramLink || 'https://t.me/dergag_unity_official'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E5A000] to-[#F59E0B] text-[#14213D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{currentLang === 'am' ? 'ወደ ቴሌግራም ቻናል ሂድ' : 'Open Official Telegram'}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>
              </div>
            </div>

            {/* Office Information Card */}
            <div className="bg-white p-7 rounded-3xl border-2 border-blue-200/80 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-[#14213D] uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#E5A000]" />
                  <span>{t.contact.officeInfo}</span>
                </h4>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#E5A000] flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-[#14213D]">{currentLang === 'am' ? 'ዋና አድራሻ' : 'Physical Address'}</span>
                    <span className="text-slate-600 text-xs">{settings?.address || 'Dergag Center Office & Addis Ababa Liaison Branch (Bole Sub-City), Ethiopia'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-[#14213D]">{t.contact.officialPhone}</span>
                    <span className="text-slate-600 text-xs font-mono">{settings?.phone || '+251 91 123 4567 / +251 92 987 6543'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-[#14213D]">{t.contact.officialEmail}</span>
                    <span className="text-slate-600 text-xs font-mono">{settings?.email || 'info@dergagunity.org'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-[#14213D]">{currentLang === 'am' ? 'የስራ ሰዓት' : 'Office Working Hours'}</span>
                    <span className="text-slate-600 text-xs">{settings?.officeHours || 'Monday - Saturday: 8:30 AM - 5:30 PM (EAT)'}</span>
                  </div>
                </div>
              </div>

              {/* Google Maps External Direction */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Dergag+Wegera+Central+Gondar+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-bold text-[#14213D] transition-colors shadow-2xs"
                >
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{currentLang === 'am' ? 'በጉግል ካርታ (Google Maps) ቦታውን እይ' : 'View Location on Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Official Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-blue-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2563EB] via-[#E5A000] to-[#059669]" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#14213D] flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span>{t.contact.formTitle}</span>
              </h3>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                {currentLang === 'am' ? 'ቀጥታ ግንኙነት' : 'Direct Line'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
              {currentLang === 'am'
                ? 'የሚልኩት መልእክት በቀጥታ ወደ አስተዳደር ክፍሉ ይደርሳል፤ የቴሌግራም ወይም የስልክ ምላሽ ይሰጥዎታል::'
                : 'Messages are routed directly to the association secretariat for prompt follow-up.'}
            </p>

            {sentSuccess ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#059669] text-white mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#059669]">
                  {t.contact.sentSuccess}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {currentLang === 'am'
                    ? 'መልእክትዎ በአስተዳደሩ ተመዝግቧል:: በስልክዎ ወይም በቴሌግራም በቅርቡ እናገኝዎታለን::'
                    : 'Your message has been officially recorded. Our coordinator will contact you shortly.'}
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-6 py-2.5 bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {currentLang === 'am' ? 'ሌላ መልእክት ላክ' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                    <span className="font-semibold">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
                      {t.contact.name} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Abebe Tadesse"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
                      {t.contact.phone} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="09xxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="optional@domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Project inquiry, Diaspora partnership"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
                    {t.contact.message} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentLang === 'am' ? 'መልእክትዎን ወይም አስተያየትዎን እዚህ በዝርዝር ይጻፉ...' : 'Type your detailed inquiry, proposal, or feedback here...'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-blue-700 hover:to-blue-900 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? '...' : t.contact.sendBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
