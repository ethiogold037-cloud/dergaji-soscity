import React, { useState, useEffect } from 'react';
import { Language, StatsSummary, Project, CharityCampaign, Announcement, Event, GalleryItem, OrganizationSettings } from './types';
import { api } from './services/api';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { MissionSection } from './components/public/MissionSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { CharitySection } from './components/public/CharitySection';
import { MembershipSection } from './components/public/MembershipSection';
import { VolunteerSection } from './components/public/VolunteerSection';
import { NewsSection } from './components/public/NewsSection';
import { EventsSection } from './components/public/EventsSection';
import { GallerySection } from './components/public/GallerySection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { LegalModal } from './components/public/PrivacyPolicyModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MotionSection, ScrollProgressBar } from './components/common/MotionWrapper';

export default function App() {
  // Language State - default Amharic
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('dergag_lang') as Language) || 'am';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('dergag_lang', lang);
    document.documentElement.lang = lang;
  };

  // View state: 'public' or 'admin'
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#admin' ? 'admin' : 'public';
  });

  // Active section for navigation
  const [activeSection, setActiveSection] = useState<string>('home');

  // Legal Modal
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Data states
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [campaigns, setCampaigns] = useState<CharityCampaign[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<OrganizationSettings | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, projectsData, campsData, annData, eventsData, galleryData, settingsData] =
        await Promise.all([
          api.getStats().catch(() => null),
          api.getProjects().catch(() => []),
          api.getCampaigns().catch(() => []),
          api.getAnnouncements().catch(() => []),
          api.getEvents().catch(() => []),
          api.getGallery().catch(() => []),
          api.getSettings().catch(() => undefined),
        ]);

      if (statsData) setStats(statsData);
      setProjects(projectsData);
      setCampaigns(campsData);
      setAnnouncements(annData);
      setEvents(eventsData);
      setGallery(galleryData);
      setSettings(settingsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen to hash changes for #admin
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setViewMode('admin');
      } else {
        setViewMode('public');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewMode === 'admin') {
      setViewMode('public');
      window.location.hash = '';
    }

    // Scroll smoothly to section if it exists
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    setViewMode('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0 });
  };

  const handleExitAdmin = () => {
    setViewMode('public');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#102A43] font-times selection:bg-[#D6A84B]/20">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Bar - Preserved exactly as requested */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        telegramLink={settings?.telegramLink}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="home">
          <HeroSection
            currentLang={currentLang}
            stats={stats}
            onNavigate={handleNavigate}
            telegramLink={settings?.telegramLink}
          />
        </div>

        {/* About Us Section */}
        <MotionSection>
          <AboutSection
            currentLang={currentLang}
            settings={settings}
            onNavigate={handleNavigate}
          />
        </MotionSection>

        {/* Mission & Strategic Pillars Section */}
        <MotionSection>
          <MissionSection
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        </MotionSection>

        {/* Projects & Activities Section */}
        <MotionSection>
          <ProjectsSection
            currentLang={currentLang}
            projects={projects}
            loading={loading}
          />
        </MotionSection>

        {/* Charity & Support Section */}
        <MotionSection>
          <CharitySection
            currentLang={currentLang}
            campaigns={campaigns}
            settings={settings}
            onNavigate={handleNavigate}
          />
        </MotionSection>

        {/* Membership Application Section */}
        <MotionSection>
          <MembershipSection
            currentLang={currentLang}
            onSuccessSubmitted={fetchData}
          />
        </MotionSection>

        {/* Volunteer Call to Action Section */}
        <MotionSection>
          <VolunteerSection
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        </MotionSection>

        {/* News & Official Announcements */}
        <MotionSection>
          <NewsSection
            currentLang={currentLang}
            announcements={announcements}
            loading={loading}
          />
        </MotionSection>

        {/* Events & Community Programs */}
        <MotionSection>
          <EventsSection
            currentLang={currentLang}
            events={events}
            onRefreshEvents={fetchData}
          />
        </MotionSection>

        {/* Community Photo Gallery */}
        <MotionSection>
          <GallerySection
            currentLang={currentLang}
            items={gallery}
          />
        </MotionSection>

        {/* Testimonials / Community Voices */}
        <MotionSection>
          <TestimonialsSection
            currentLang={currentLang}
          />
        </MotionSection>

        {/* Official Contact Section */}
        <MotionSection>
          <ContactSection
            currentLang={currentLang}
            settings={settings}
          />
        </MotionSection>
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenAdmin={handleOpenAdmin}
        settings={settings}
      />

      {/* Legal Privacy / Terms Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || 'privacy'}
        currentLang={currentLang}
      />
    </div>
  );
}
