import React, { useState } from 'react';
import { Language, Member } from '../../types';
import { translations } from '../../translations';
import { api } from '../../services/api';
import { MembershipIdCardModal } from '../common/MembershipIdCardModal';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Search,
  Sparkles,
  ArrowRight,
  Send,
  Lock,
  UserCheck,
  Building,
  Heart,
  BadgeCheck,
  UserPlus,
  Award
} from 'lucide-react';

interface MembershipSectionProps {
  currentLang: Language;
  onSuccessSubmitted?: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  currentLang,
  onSuccessSubmitted
}) => {
  const t = translations[currentLang];

  // Form State
  const [formData, setFormData] = useState<{
    fullName: string;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    phone: string;
    email: string;
    cityRegion: string;
    currentLocation: string;
    dergagRelationship: string;
    profession: string;
    interestAreas: string;
    volunteerSkills: string;
    shortMessage: string;
    privacyConsent: boolean;
  }>({
    fullName: '',
    gender: 'prefer_not_to_say',
    phone: '',
    email: '',
    cityRegion: '',
    currentLocation: '',
    dergagRelationship: '',
    profession: '',
    interestAreas: '',
    volunteerSkills: '',
    shortMessage: '',
    privacyConsent: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  // Status Lookup State
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any | null>(null);
  const [lookupSearched, setLookupSearched] = useState(false);
  const [selectedCardMember, setSelectedCardMember] = useState<Member | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Basic Validation
    if (!formData.fullName.trim()) {
      setSubmitError(currentLang === 'am' ? 'እባክዎ ሙሉ ስምዎን ያስገቡ' : 'Please provide your full legal name');
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError(currentLang === 'am' ? 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ' : 'Please provide a valid phone number');
      return;
    }
    if (!formData.cityRegion.trim()) {
      setSubmitError(currentLang === 'am' ? 'እባክዎ ክልል ወይም ከተማዎን ያስገቡ' : 'Please provide your city or region');
      return;
    }
    if (!formData.privacyConsent) {
      setSubmitError(currentLang === 'am' ? 'እባክዎ ከደንቡና የግል መረጃ አያያዝ ፖሊሲ ጋር ይስማሙ' : 'Please agree to the privacy policy');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitApplication(formData);
      setSubmitSuccess(res.application);
      setFormData({
        fullName: '',
        gender: 'prefer_not_to_say',
        phone: '',
        email: '',
        cityRegion: '',
        currentLocation: '',
        dergagRelationship: '',
        profession: '',
        interestAreas: '',
        volunteerSkills: '',
        shortMessage: '',
        privacyConsent: false
      });
      if (onSuccessSubmitted) onSuccessSubmitted();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting your application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupPhone.trim()) return;

    try {
      setLookupLoading(true);
      setLookupSearched(true);
      const res = await api.checkApplicationStatus(lookupPhone.trim());
      setLookupResult(res);
    } catch (err: any) {
      setLookupResult({ found: false, message: err.message });
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <section id="membership" className="py-24 bg-gradient-to-b from-[#ECFDF5] via-[#F0FDF4] to-[#EFF6FF] font-times border-t border-emerald-100/80 relative overflow-hidden">
      {/* Decorative colored ambient blobs */}
      <div className="absolute top-10 left-[-5%] w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300 text-[#059669] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <UserPlus className="w-4 h-4 text-[#059669]" />
            <span>{t.membership.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            {currentLang === 'am'
              ? 'የደርጋጅ አንድነትና በጎ አድራጎት ማህበር ቤተሰብ ይሁኑ'
              : 'Join the Dergag Community Unity & Charity Family'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#059669] via-[#E5A000] to-[#2563EB] mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium leading-relaxed">
            {t.membership.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Membership Registration Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white/95 backdrop-blur-sm border-2 border-emerald-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#059669] via-[#E5A000] to-[#2563EB]" />

              {submitSuccess ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#059669] mx-auto flex items-center justify-center shadow-inner border-2 border-emerald-300">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#14213D]">
                    {t.membership.successTitle}
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
                    {t.membership.successDesc}
                  </p>
                  <div className="bg-emerald-50/90 p-5 rounded-2xl border border-emerald-200 max-w-sm mx-auto text-left text-xs space-y-2">
                    <div>
                      <span className="text-slate-500 font-bold">{t.membership.fullName}: </span>
                      <span className="font-bold text-[#14213D]">{submitSuccess.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold">{t.membership.phone}: </span>
                      <span className="font-mono font-bold text-[#2563EB]">{submitSuccess.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold">{currentLang === 'am' ? 'የማመልከቻ ሁኔታ፡ ' : 'Status: '}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase text-[10px] border border-amber-300">
                        {submitSuccess.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="mt-4 px-7 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#2563EB] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    {currentLang === 'am' ? 'አዲስ ማመልከቻ አስገባ' : 'Submit Another Application'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {submitError && (
                    <div className="bg-rose-50 border-2 border-rose-300 text-rose-900 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm">
                      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Section 1: Personal Contact */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b-2 border-blue-100 pb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center shadow-xs">1</span>
                      <h3 className="text-base font-bold text-[#14213D]">
                        {currentLang === 'am' ? 'የአመልካች የግል ማንነት መረጃ' : 'Personal Identity Information'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.fullName} <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t.membership.fullNamePlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-medium shadow-2xs transition-all"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.phone} <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.membership.phonePlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm font-mono shadow-2xs transition-all"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.gender}
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        >
                          <option value="prefer_not_to_say">{t.membership.selectGender}</option>
                          <option value="male">{t.membership.male}</option>
                          <option value="female">{t.membership.female}</option>
                          <option value="other">{t.membership.other}</option>
                        </select>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.membership.emailPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Location & Dergag Ties */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b-2 border-emerald-100 pb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#059669] text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
                      <h3 className="text-base font-bold text-[#14213D]">
                        {currentLang === 'am' ? 'የመኖሪያ አካባቢና የደርጋጅ ቁርኝት' : 'Location & Dergag Community Connection'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City / Region */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.cityRegion} <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cityRegion}
                          onChange={(e) => setFormData({ ...formData, cityRegion: e.target.value })}
                          placeholder={t.membership.cityRegionPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#059669] focus:border-[#059669] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>

                      {/* Current Location */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.currentLocation}
                        </label>
                        <input
                          type="text"
                          value={formData.currentLocation}
                          onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                          placeholder={t.membership.currentLocationPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#059669] focus:border-[#059669] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>

                      {/* Relationship to Dergag */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.relationship}
                        </label>
                        <input
                          type="text"
                          value={formData.dergagRelationship}
                          onChange={(e) => setFormData({ ...formData, dergagRelationship: e.target.value })}
                          placeholder={t.membership.relationshipPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#059669] focus:border-[#059669] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Professional Background & Skills */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b-2 border-amber-100 pb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#E5A000] text-[#14213D] text-xs font-bold flex items-center justify-center shadow-xs">3</span>
                      <h3 className="text-base font-bold text-[#14213D]">
                        {currentLang === 'am' ? 'ሙያ፣ ክህሎትና የፈቃደኝነት ፍላጎት' : 'Profession, Skills & Volunteer Areas'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Profession */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.profession}
                        </label>
                        <input
                          type="text"
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          placeholder={t.membership.professionPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] focus:border-[#E5A000] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>

                      {/* Interest Areas */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.interestAreas}
                        </label>
                        <input
                          type="text"
                          value={formData.interestAreas}
                          onChange={(e) => setFormData({ ...formData, interestAreas: e.target.value })}
                          placeholder="e.g. Education, Health, Water, Youth"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] focus:border-[#E5A000] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>

                      {/* Skills */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.skills}
                        </label>
                        <input
                          type="text"
                          value={formData.volunteerSkills}
                          onChange={(e) => setFormData({ ...formData, volunteerSkills: e.target.value })}
                          placeholder={t.membership.skillsPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] focus:border-[#E5A000] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>

                      {/* Short Message */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {t.membership.shortMessage}
                        </label>
                        <textarea
                          rows={3}
                          value={formData.shortMessage}
                          onChange={(e) => setFormData({ ...formData, shortMessage: e.target.value })}
                          placeholder={currentLang === 'am' ? 'ለማህበሩ ማስተላለፍ የሚፈልጉት ተጨማሪ ሀሳብ ካለ ይጻፉ...' : 'Any comments or personal notes for the membership committee...'}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] focus:border-[#E5A000] bg-slate-50/50 text-sm shadow-2xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="bg-emerald-50/80 p-4.5 rounded-2xl border-2 border-emerald-200 flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      required
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="mt-1 w-5 h-5 text-[#059669] rounded-md border-slate-300 focus:ring-[#059669] cursor-pointer"
                    />
                    <label htmlFor="privacyConsent" className="text-xs text-slate-700 cursor-pointer font-medium leading-relaxed">
                      {t.membership.privacyAgreement} <span className="text-slate-500 font-normal">({currentLang === 'am' ? 'ስልክዎ ወይም የግል መረጃዎ ለሶስተኛ ወገን አይተላለፍም' : 'Your personal phone and details remain strictly confidential and will never be publicly exposed.'})</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#2563EB] hover:from-[#047857] hover:to-[#1D4ED8] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {submitting ? (
                      <span>{t.membership.submitting}</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.membership.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Application Status Tracker & Privacy Guarantees (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Status Tracker Widget */}
            <div className="bg-gradient-to-br from-[#14213D] via-[#1E3A8A] to-[#14213D] text-white rounded-3xl p-7 sm:p-8 shadow-xl border-2 border-[#E5A000]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-[#E5A000] mb-5 shadow-sm border border-white/10">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-amber-50">
                {t.membership.checkStatusTitle}
              </h3>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                {currentLang === 'am'
                  ? 'ቀደም ሲል ያመለከቱበትን ስልክ ቁጥር በማስገባት የማመልከቻዎን ወይም የአባልነትዎን ሁኔታ ያረጋግጡ::'
                  : 'Check the real-time review status of your membership application or look up your Member ID.'}
              </p>

              <form onSubmit={handleStatusCheck} className="mt-6 space-y-3.5">
                <input
                  type="tel"
                  required
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder={t.membership.checkStatusPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#E5A000] font-mono shadow-inner"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E5A000] to-[#F59E0B] hover:from-[#d97706] hover:to-[#b45309] text-[#14213D] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                >
                  {lookupLoading ? '...' : t.membership.checkStatusBtn}
                </button>
              </form>

              {lookupSearched && lookupResult && (
                <div className="mt-5 p-4 rounded-2xl bg-white/10 border border-white/20 text-xs space-y-2 animate-in fade-in">
                  {lookupResult.found ? (
                    <div>
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{lookupResult.fullName}</span>
                      </div>
                      {lookupResult.memberId && (
                        <div className="mt-1.5 text-slate-200">
                          <span className="text-slate-400">{currentLang === 'am' ? 'የአባልነት መታወቂያ፡ ' : 'Member ID: '}</span>
                          <span className="font-mono font-bold text-[#E5A000]">{lookupResult.memberId}</span>
                        </div>
                      )}
                      <div className="mt-1.5">
                        <span className="text-slate-400">{currentLang === 'am' ? 'ሁኔታ፡ ' : 'Status: '}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                          {lookupResult.status}
                        </span>
                      </div>

                      {lookupResult.memberId && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCardMember({
                              id: lookupResult.id || 'mem_lookup',
                              memberId: lookupResult.memberId,
                              fullName: lookupResult.fullName,
                              gender: lookupResult.gender || 'prefer_not_to_say',
                              phone: lookupPhone,
                              email: lookupResult.email || '',
                              cityRegion: lookupResult.cityRegion || 'Dergag / Ethiopia',
                              profession: lookupResult.profession || 'Community Member',
                              status: 'approved',
                              joinedDate: lookupResult.joinedDate || new Date().toISOString().split('T')[0]
                            });
                          }}
                          className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D6A84B] via-[#F4B942] to-[#B8860B] hover:brightness-105 text-[#14213D] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300 transform active:scale-95"
                        >
                          <Award className="w-4 h-4 text-[#14213D]" />
                          <span>{currentLang === 'am' ? 'ዲጂታል መታወቂያ ካርድ ይመልከቱ' : 'View Official Member ID Badge'}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-rose-200 text-xs font-semibold">
                      {lookupResult.message || (currentLang === 'am' ? 'በዚህ ስልክ የተመዘገበ ማመልከቻ አልተገኘም::' : 'No application found for this phone number.')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Privacy & Member Data Protection Card */}
            <div className="bg-white/95 border-2 border-emerald-200 rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#14213D] uppercase tracking-wider">
                <Lock className="w-4 h-4 text-[#059669]" />
                <span>{currentLang === 'am' ? 'የግል መረጃ ጥበቃ ዋስትና' : 'Privacy Protection'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {currentLang === 'am'
                  ? 'የማህበራችን አባላት ስልክ ቁጥር፣ ኢሜይል እና አድራሻ በህግና በስርዓተ-ደህንነት ህጎች መሰረት በሚስጥር የተጠበቀ ነው:: ለአስተዳደር ስራ ብቻ ይውላል::'
                  : 'In strict compliance with privacy laws and our Zero-Trust architecture, private member telephone numbers and email addresses are securely restricted to authorized administrators.'}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#059669] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{currentLang === 'am' ? 'የተረጋገጠ ሚስጥራዊነት' : 'Confidential Roster'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Member ID Card Modal */}
      <MembershipIdCardModal
        member={selectedCardMember}
        onClose={() => setSelectedCardMember(null)}
        currentLang={currentLang}
      />
    </section>
  );
};
