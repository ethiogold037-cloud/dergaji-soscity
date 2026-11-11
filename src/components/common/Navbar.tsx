import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { Language } from '../../types';
import { translations } from '../../translations';
import {
  Globe,
  Send,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Info,
  FolderKanban,
  Heart,
  Users,
  FileText,
  Calendar,
  Image as ImageIcon,
  PhoneCall,
  Sparkles,
  Target,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenAdmin: () => void;
  telegramLink?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeSection,
  onNavigate,
  onOpenAdmin,
  telegramLink = 'https://t.me/dergag_unity_official'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links shown directly in the horizontal menu
  const primaryLinks = [
    { id: 'home', label: currentLang === 'am' ? 'መነሻ' : 'Home', icon: Home },
    { id: 'about', label: currentLang === 'am' ? 'ስለ እኛ' : 'About', icon: Info },
    { id: 'projects', label: currentLang === 'am' ? 'ፕሮጀክቶች' : 'Projects', icon: FolderKanban },
    { id: 'charity', label: currentLang === 'am' ? 'በጎ አድራጎት' : 'Charity', icon: Heart },
    { id: 'membership', label: currentLang === 'am' ? 'አባልነት' : 'Membership', icon: Users },
    { id: 'news', label: currentLang === 'am' ? 'ዜና' : 'News', icon: FileText },
  ];

  // Secondary navigation links in the "More" dropdown
  const secondaryLinks = [
    { id: 'mission', label: currentLang === 'am' ? 'ተልዕኮና ዓላማዎች' : 'Mission & Goals', icon: Target },
    { id: 'events', label: currentLang === 'am' ? 'ክስተቶችና ፕሮግራሞች' : 'Events & Programs', icon: Calendar },
    { id: 'gallery', label: currentLang === 'am' ? 'የማህበረሰብ ጋለሪ' : 'Community Gallery', icon: ImageIcon },
    { id: 'contact', label: currentLang === 'am' ? 'አግኙን' : 'Contact Us', icon: PhoneCall },
  ];

  // All 10 links for wide displays (2xl) and the mobile drawer
  const allLinks = [
    { id: 'home', label: currentLang === 'am' ? 'መነሻ' : 'Home', icon: Home },
    { id: 'about', label: currentLang === 'am' ? 'ስለ እኛ' : 'About Us', icon: Info },
    { id: 'mission', label: currentLang === 'am' ? 'ተልዕኮ' : 'Mission', icon: Target },
    { id: 'projects', label: currentLang === 'am' ? 'ፕሮጀክቶች' : 'Projects', icon: FolderKanban },
    { id: 'charity', label: currentLang === 'am' ? 'በጎ አድራጎት' : 'Charity', icon: Heart },
    { id: 'membership', label: currentLang === 'am' ? 'አባልነት' : 'Membership', icon: Users },
    { id: 'news', label: currentLang === 'am' ? 'ዜና' : 'News', icon: FileText },
    { id: 'events', label: currentLang === 'am' ? 'ክስተቶች' : 'Events', icon: Calendar },
    { id: 'gallery', label: currentLang === 'am' ? 'ጋለሪ' : 'Gallery', icon: ImageIcon },
    { id: 'contact', label: currentLang === 'am' ? 'አግኙን' : 'Contact', icon: PhoneCall },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const isSecondaryActive = secondaryLinks.some((l) => l.id === activeSection);

  return (
    <header className="sticky top-0 z-50 w-full transition-all select-none">
      {/* Slim Integrated Community Announcement Ribbon (approx 28px) */}
      <div className="bg-[#0A1128] text-slate-300 text-[11px] h-7 border-b border-[#F4B942]/20 px-4 hidden md:flex items-center">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B942] flex-shrink-0 animate-pulse" />
            <span
              className="text-amber-100/90 font-medium truncate"
              style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
            >
              {t.slogan}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 text-[11px]">
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-200 hover:text-[#F4B942] transition-colors"
            >
              <Send className="w-3 h-3 text-[#38BDF8]" />
              <span className="font-semibold">{t.nav.joinTelegram}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">Dergag &bull; Ethiopia</span>
          </div>
        </div>
      </div>

      {/* Main Single Unified Header (Deep Navy: #101F46 / #0B132B with Gold Accent) */}
      <div className="bg-gradient-to-r from-[#0B132B] via-[#101F46] to-[#0D1B3E] border-b border-[#F4B942]/30 shadow-2xl backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[84px] gap-4">
            {/* ======================================================== */}
            {/* 1. LEFT SECTION — ORGANIZATION BRANDING */}
            {/* ======================================================== */}
            <div className="flex items-center min-w-0 flex-shrink-0">
              <button
                onClick={() => handleLinkClick('home')}
                className="flex items-center text-left focus:outline-hidden cursor-pointer group py-1"
                title="Dergag Community Unity & Charity Association"
              >
                <Logo size="md" lightText={true} />
              </button>
            </div>

            {/* ======================================================== */}
            {/* 2. CENTER SECTION — NAVIGATION */}
            {/* ======================================================== */}
            {/* A. Standard Desktop (lg & xl): Primary links + Elegant More Dropdown */}
            <nav className="hidden lg:flex 2xl:hidden items-center justify-center space-x-1 xl:space-x-1.5 flex-1 max-w-2xl px-2">
              {primaryLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#F4B942] font-extrabold'
                        : 'text-slate-200 hover:text-[#F4B942] hover:bg-white/5'
                    }`}
                    style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-gradient-to-r from-[#F4B942] to-[#D99A1E] rounded-full shadow-sm" />
                    )}
                  </button>
                );
              })}

              {/* More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSecondaryActive || moreDropdownOpen
                      ? 'text-[#F4B942] bg-white/5'
                      : 'text-slate-200 hover:text-[#F4B942] hover:bg-white/5'
                  }`}
                  style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
                >
                  <span>{currentLang === 'am' ? 'ተጨማሪ' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#F4B942]' : ''}`} />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0D1B3E] border-2 border-[#F4B942]/40 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#F4B942] border-b border-white/10 mb-1">
                      {currentLang === 'am' ? 'ተጨማሪ ገጾች' : 'Additional Sections'}
                    </div>
                    {secondaryLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeSection === link.id;
                      return (
                        <button
                          key={link.id}
                          onClick={() => handleLinkClick(link.id)}
                          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#1D4ED8]/30 text-[#F4B942] font-bold border-l-2 border-[#F4B942]'
                              : 'text-slate-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#F4B942]' : 'text-slate-400'}`} />
                          <span className="truncate">{link.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* B. Wide Desktop (2xl >= 1440px): All 10 links displayed cleanly */}
            <nav className="hidden 2xl:flex items-center justify-center space-x-1 xl:space-x-1.5 flex-1 px-4">
              {allLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-2.5 py-2 text-[13px] font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#F4B942] font-extrabold'
                        : 'text-slate-200 hover:text-[#F4B942] hover:bg-white/5'
                    }`}
                    style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-gradient-to-r from-[#F4B942] to-[#D99A1E] rounded-full shadow-sm" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ======================================================== */}
            {/* 3. RIGHT SECTION — ACTIONS */}
            {/* ======================================================== */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              {/* Telegram Community Quick Icon */}
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                title={t.nav.joinTelegram}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-[#1D4ED8]/20 hover:bg-[#1D4ED8]/40 text-[#38BDF8] border border-blue-400/30 transition-all hover:scale-105 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </a>

              {/* Language Selector */}
              <div className="flex items-center bg-[#0A1128]/90 border border-[#F4B942]/30 rounded-xl p-1 shadow-inner">
                <Globe className="w-3.5 h-3.5 text-[#F4B942] ml-1.5 mr-1" />
                <button
                  onClick={() => onLanguageChange('am')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    currentLang === 'am'
                      ? 'bg-gradient-to-r from-[#F4B942] to-[#D99A1E] text-[#101F46] shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  style={{ fontFamily: '"Noto Sans Ethiopic", sans-serif' }}
                >
                  አማ
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    currentLang === 'en'
                      ? 'bg-gradient-to-r from-[#F4B942] to-[#D99A1E] text-[#101F46] shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  EN
                </button>
              </div>

              {/* Prominent Gold Member/Admin Login Button */}
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#F4B942] via-[#E5A000] to-[#D99A1E] hover:from-[#f5c25c] hover:to-[#e8a92a] text-[#101F46] font-bold text-xs sm:text-[13px] rounded-xl shadow-lg shadow-[#F4B942]/20 border border-[#F4B942]/60 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                style={{ fontFamily: '"Times New Roman", Times, "Noto Sans Ethiopic", serif' }}
              >
                <ShieldCheck className="w-4 h-4 text-[#101F46] flex-shrink-0" />
                <span>{currentLang === 'am' ? 'የአባላት መግቢያ' : 'Portal Login'}</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-slate-200 hover:text-[#F4B942] hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-white/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#F4B942]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. RESPONSIVE MOBILE NAVIGATION DRAWER */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B]/98 border-b-2 border-[#F4B942]/40 backdrop-blur-2xl px-5 pt-4 pb-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-[11px] uppercase font-bold tracking-wider text-[#F4B942] mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
            <span>{currentLang === 'am' ? 'የድረ-ገጽ ማውጫ (Navigation)' : 'Main Navigation'}</span>
            <span className="text-slate-400 font-mono text-[10px]">DERGAG UNITY</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {allLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1D4ED8] to-[#101F46] text-[#F4B942] border border-[#F4B942]/60 shadow-md'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                  style={{ fontFamily: currentLang === 'am' ? '"Noto Sans Ethiopic", sans-serif' : '"Times New Roman", Times, serif' }}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#F4B942]' : 'text-slate-400'}`} />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              {/* Telegram Channel Mobile Link */}
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1D4ED8]/25 text-[#38BDF8] border border-blue-400/30 text-xs font-bold hover:bg-[#1D4ED8]/40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.nav.joinTelegram}</span>
              </a>

              {/* Mobile Language Switcher */}
              <div className="flex items-center bg-[#0A1128] border border-[#F4B942]/30 rounded-xl p-1">
                <button
                  onClick={() => onLanguageChange('am')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    currentLang === 'am' ? 'bg-[#F4B942] text-[#101F46]' : 'text-slate-300'
                  }`}
                >
                  አማ
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    currentLang === 'en' ? 'bg-[#F4B942] text-[#101F46]' : 'text-slate-300'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Portal / Admin Login */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#F4B942] via-[#E5A000] to-[#D99A1E] text-[#101F46] font-bold text-sm shadow-lg shadow-[#F4B942]/20 cursor-pointer"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              <ShieldCheck className="w-4 h-4 text-[#101F46]" />
              <span>{currentLang === 'am' ? 'የአባላትና አስተዳደር መግቢያ' : 'Member & Admin Portal'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
