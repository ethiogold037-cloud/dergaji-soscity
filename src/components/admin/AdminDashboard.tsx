import React, { useState, useEffect } from 'react';
import {
  Language,
  User,
  UserRole,
  StatsSummary,
  Member,
  MembershipApplication,
  Project,
  CharityCampaign,
  DonationRecord,
  Announcement,
  Event,
  GalleryItem,
  ContactMessage,
  AuditLog,
  OrganizationSettings
} from '../../types';
import { translations } from '../../translations';
import { api } from '../../services/api';
import { Logo } from '../common/Logo';
import { MembershipIdCardModal } from '../common/MembershipIdCardModal';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FolderKanban,
  Heart,
  Coins,
  FileText,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ShieldCheck,
  Database,
  LogOut,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Edit,
  Download,
  CheckCircle,
  XCircle,
  ExternalLink,
  Eye,
  AlertCircle,
  RefreshCw,
  Globe,
  Sliders,
  Send,
  Building2,
  Clock,
  Printer
} from 'lucide-react';

interface AdminDashboardProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  onLanguageChange,
  onExitAdmin
}) => {
  const t = translations[currentLang];

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginEmail, setLoginEmail] = useState('admin@dergagunity.org');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginRole, setLoginRole] = useState<UserRole>('super_admin');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Data States
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [campaigns, setCampaigns] = useState<CharityCampaign[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<OrganizationSettings | null>(null);
  const [firebaseStatus, setFirebaseStatus] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modals & Forms
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<Member | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    category: 'community_development',
    location: 'Dergag',
    status: 'planned',
    budget: '',
    fundingProgress: '0%',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80'
  });

  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    titleAm: '',
    content: '',
    contentAm: '',
    category: 'official',
    coverImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    isPinned: false
  });

  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<CharityCampaign>>({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    targetBeneficiary: '',
    goalAmount: '500,000 ETB',
    verifiedProgress: '0 ETB',
    bankAccount: 'CBE Acc: 1000458921478',
    contactPerson: '',
    status: 'active'
  });

  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    eventDate: new Date().toISOString().split('T')[0],
    eventTime: '09:00 AM - 12:00 PM',
    location: 'Dergag Community Center',
    organizer: 'General Secretariat',
    status: 'upcoming',
    registrationOpen: true
  });

  const [showNewGalleryModal, setShowNewGalleryModal] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    titleAm: '',
    category: 'development',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    date: new Date().toISOString().split('T')[0],
    caption: ''
  });

  const [showNewDonationModal, setShowNewDonationModal] = useState(false);
  const [newDonation, setNewDonation] = useState<Partial<DonationRecord>>({
    campaignId: 'camp_1',
    donorName: '',
    donorPhone: '',
    amount: 5000,
    currency: 'ETB',
    paymentMethod: 'Commercial Bank of Ethiopia',
    referenceNumber: '',
    status: 'verified'
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = async (roleToUse?: UserRole, customEmail?: string) => {
    try {
      setAuthLoading(true);
      const targetRole = roleToUse || loginRole;
      const targetEmail = customEmail || (roleToUse ? (roleToUse === 'super_admin' ? 'ethiogold037@gmail.com' : `${roleToUse}@dergagunity.org`) : loginEmail);
      const res = await api.login(targetEmail, loginPassword, targetRole);
      setCurrentUser(res.user);
      showToast(`Logged in successfully as ${res.user.displayName}`);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out from admin dashboard');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        membersData,
        appsData,
        projectsData,
        campsData,
        donationsData,
        annData,
        eventsData,
        galleryData,
        messagesData,
        logsData,
        settingsData,
        fbStatus
      ] = await Promise.all([
        api.getStats().catch(() => null),
        api.getMembers().catch(() => []),
        api.getApplications().catch(() => []),
        api.getProjects().catch(() => []),
        api.getCampaigns().catch(() => []),
        api.getDonations().catch(() => []),
        api.getAnnouncements().catch(() => []),
        api.getEvents().catch(() => []),
        api.getGallery().catch(() => []),
        api.getMessages().catch(() => []),
        api.getAuditLogs().catch(() => []),
        api.getSettings().catch(() => null),
        api.getFirebaseStatus().catch(() => null)
      ]);

      if (statsData) setStats(statsData);
      setMembers(membersData);
      setApplications(appsData);
      setProjects(projectsData);
      setCampaigns(campsData);
      setDonations(donationsData);
      setAnnouncements(annData);
      setEvents(eventsData);
      setGallery(galleryData);
      setMessages(messagesData);
      setAuditLogs(logsData);
      if (settingsData) setSettings(settingsData);
      if (fbStatus) setFirebaseStatus(fbStatus);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAllData();
    }
  }, [currentUser]);

  // Actions
  const handleApproveApp = async (appId: string) => {
    try {
      const res = await api.approveApplication(appId, currentUser?.displayName);
      showToast(`Application approved! Member ID ${res.member.memberId} assigned to ${res.member.fullName}`);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error approving application', 'error');
    }
  };

  const handleRejectApp = async (appId: string) => {
    const reason = prompt('Please enter reason for rejection:', 'Information could not be verified by committee');
    if (!reason) return;
    try {
      await api.rejectApplication(appId, reason, currentUser?.displayName);
      showToast('Application marked as rejected');
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error rejecting application', 'error');
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProject(newProject, currentUser?.displayName);
      showToast('New project created and published');
      setShowNewProjectModal(false);
      setNewProject({
        title: '',
        titleAm: '',
        description: '',
        descriptionAm: '',
        category: 'community_development',
        location: 'Dergag',
        status: 'planned',
        budget: '',
        fundingProgress: '0%',
        coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80'
      });
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error creating project', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showToast('Project deleted successfully');
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting project', 'error');
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAnnouncement(newAnnouncement, currentUser?.displayName);
      showToast('Announcement published successfully');
      setShowNewAnnouncementModal(false);
      setNewAnnouncement({
        title: '',
        titleAm: '',
        content: '',
        contentAm: '',
        category: 'official',
        coverImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
        isPinned: false
      });
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error publishing announcement', 'error');
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCampaign(newCampaign, currentUser?.displayName);
      showToast('Charity campaign created successfully');
      setShowNewCampaignModal(false);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error creating campaign', 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await api.updateSettings(settings, currentUser?.displayName);
      showToast('Organization settings updated successfully');
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error saving settings', 'error');
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markMessageRead(id);
      fetchAllData();
    } catch (err) {
      // ignore
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createEvent(newEvent);
      showToast('Community event scheduled successfully');
      setShowNewEventModal(false);
      setNewEvent({
        title: '',
        titleAm: '',
        description: '',
        descriptionAm: '',
        eventDate: new Date().toISOString().split('T')[0],
        eventTime: '09:00 AM - 12:00 PM',
        location: 'Dergag Community Center',
        organizer: 'General Secretariat',
        status: 'upcoming',
        registrationOpen: true
      });
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error scheduling event', 'error');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteEvent(id);
      showToast('Event removed successfully');
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting event', 'error');
    }
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addGalleryItem(newGalleryItem);
      showToast('Gallery photo added successfully');
      setShowNewGalleryModal(false);
      setNewGalleryItem({
        title: '',
        titleAm: '',
        category: 'development',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
        date: new Date().toISOString().split('T')[0],
        caption: ''
      });
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error adding gallery item', 'error');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      await api.deleteGalleryItem(id);
      showToast('Gallery photo deleted');
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting gallery photo', 'error');
    }
  };

  const handleRecordDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.recordDonation(newDonation, currentUser?.displayName);
      showToast('Verified financial contribution recorded');
      setShowNewDonationModal(false);
      setNewDonation({
        campaignId: 'camp_1',
        donorName: '',
        donorPhone: '',
        amount: 5000,
        currency: 'ETB',
        paymentMethod: 'Commercial Bank of Ethiopia',
        referenceNumber: '',
        status: 'verified'
      });
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error recording donation', 'error');
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      await api.updateProject(editingProject.id, editingProject, currentUser?.displayName);
      showToast('Project details updated successfully');
      setEditingProject(null);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error updating project', 'error');
    }
  };

  const handleToggleMemberStatus = async (member: Member) => {
    const nextStatus: Member['status'] = member.status === 'approved' ? 'suspended' : 'approved';
    const confirmMsg = nextStatus === 'suspended'
      ? `Suspend member ${member.fullName} (${member.memberId})?`
      : `Re-activate member ${member.fullName} (${member.memberId})?`;
    if (!confirm(confirmMsg)) return;

    try {
      await api.updateMember(member.id, { status: nextStatus }, currentUser?.displayName);
      showToast(`Member ${member.fullName} status updated to ${nextStatus}`);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || 'Error updating member status', 'error');
    }
  };

  // Nav Item definitions
  const adminNav = [
    { id: 'overview', label: t.admin.overview, icon: LayoutDashboard },
    { id: 'applications', label: `${t.admin.applications} (${applications.filter(a => a.status === 'pending').length})`, icon: UserCheck, alert: applications.some(a => a.status === 'pending') },
    { id: 'members', label: t.admin.members, icon: Users },
    { id: 'projects', label: t.admin.projects, icon: FolderKanban },
    { id: 'charity', label: t.admin.charity, icon: Heart },
    { id: 'donations', label: t.admin.donations, icon: Coins },
    { id: 'announcements', label: t.admin.announcements, icon: FileText },
    { id: 'events', label: t.admin.events, icon: Calendar },
    { id: 'gallery', label: t.admin.gallery, icon: ImageIcon },
    { id: 'messages', label: `${t.admin.messages} (${messages.filter(m => !m.isRead).length})`, icon: MessageSquare, alert: messages.some(m => !m.isRead) },
    { id: 'settings', label: t.admin.settings, icon: Settings },
    { id: 'auditLogs', label: t.admin.auditLogs, icon: ShieldCheck },
    { id: 'firebase', label: t.admin.firebaseSync, icon: Database },
  ];

  // If Not Logged In, Render Secure Auth View
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 font-serif relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] mb-6 cursor-pointer uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentLang === 'am' ? 'ወደ ዋናው ድረ-ገጽ ተመለስ' : 'Return to Public Website'}</span>
          </button>
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[#14213D] font-serif">
            {t.admin.loginTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {t.admin.loginSubtitle}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-white py-9 px-6 sm:px-10 shadow-2xl rounded-3xl border-2 border-[#D6A84B]/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2563EB] via-[#D6A84B] to-[#059669]" />

            {/* Ethio Gold Super Admin Primary Button */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm">
              <span className="text-[11px] font-black text-[#14213D] uppercase tracking-wider block mb-2.5">
                {currentLang === 'am' ? 'የባለቤት እና ሱፐር አድሚን ፈጣን መግቢያ:' : 'Primary Super Admin Direct Access:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('ethiogold037@gmail.com');
                  handleLogin('super_admin', 'ethiogold037@gmail.com');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6A84B] via-[#F4B942] to-[#B8860B] text-[#14213D] font-black text-xs hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-between shadow-md cursor-pointer border border-amber-300"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#14213D] text-amber-300 flex items-center justify-center font-bold text-xs shadow-xs">
                    EG
                  </div>
                  <div className="text-left">
                    <div className="text-[12px] font-black leading-tight text-[#14213D]">Ethio Gold (Super Admin)</div>
                    <div className="text-[10px] font-mono text-[#14213D]/80">ethiogold037@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#14213D] text-amber-300 uppercase tracking-wider font-black shadow-xs">
                  {currentLang === 'am' ? 'በ1-ክሊክ ግባ' : '1-Click Login'}
                </span>
              </button>

              <div className="mt-3 pt-3 border-t border-amber-200/70">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {currentLang === 'am' ? 'ሌሎች የሰራተኞች ሚናዎች (Other Staff Roles):' : 'Other Department Roles:'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleLogin('membership_manager')}
                    className="py-2 px-2.5 rounded-lg bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold hover:brightness-110 transition-all text-left truncate cursor-pointer shadow-xs text-[11px]"
                  >
                    Membership Head
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogin('project_manager')}
                    className="py-2 px-2.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold hover:brightness-110 transition-all text-left truncate cursor-pointer shadow-xs text-[11px]"
                  >
                    Project Director
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogin('content_manager')}
                    className="py-2 px-2.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-bold hover:brightness-110 transition-all text-left truncate cursor-pointer shadow-xs text-[11px]"
                  >
                    Content Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogin('super_admin', 'admin@dergagunity.org')}
                    className="py-2 px-2.5 rounded-lg bg-gradient-to-r from-[#14213D] to-[#102A43] text-white font-bold hover:brightness-110 transition-all text-left truncate cursor-pointer shadow-xs text-[11px] border border-slate-700"
                  >
                    Solomon (General)
                  </button>
                </div>
              </div>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-white px-3 text-slate-400 font-bold">Or Sign in with Credentials</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4 font-serif"
            >
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
                  {t.admin.emailOrUsername}
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-hidden font-sans bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
                  {t.admin.password}
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-hidden font-sans bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#14213D] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                {authLoading ? 'Signing in...' : t.admin.loginBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col font-serif">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 border-2 animate-in slide-in-from-bottom duration-200 ${
            notification.type === 'success'
              ? 'bg-[#059669] text-white border-emerald-300'
              : 'bg-rose-600 text-white border-rose-300'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-[#14213D] text-white sticky top-0 z-30 border-b-2 border-[#D6A84B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Logo size="sm" lightText={true} />
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#D6A84B]/20 text-[#D6A84B] font-mono text-[10px] font-bold border border-[#D6A84B]/50 uppercase tracking-wider">
              {currentUser.role.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs font-bold">
              <button
                onClick={() => onLanguageChange('am')}
                className={`px-3 py-1 rounded-lg transition-all ${currentLang === 'am' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                አማ
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-lg transition-all ${currentLang === 'en' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-3 text-xs">
              <div className="hidden md:flex flex-col text-right">
                <span className="font-bold text-white font-serif">{currentUser.displayName}</span>
                <span className="text-[10px] text-slate-400">{currentUser.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 border border-slate-700 transition-colors cursor-pointer"
                title={t.admin.logoutBtn}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8 w-full">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white rounded-3xl border-2 border-slate-200 p-4 shadow-xl flex-shrink-0 self-start">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-2">
            System Modules
          </div>
          <nav className="space-y-1.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14213D] to-[#2563EB] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[#14213D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A84B]' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.alert && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse border border-white" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-200 px-2">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#2563EB]' : 'text-slate-500'}`} />
              <span>{loading ? 'Refreshing Data...' : 'Sync Database'}</span>
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-xl min-w-0">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#14213D]">
                    {t.admin.overview}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Live community indicators, financial metrics, and administrative priority workflows.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Database Online</span>
                </div>
              </div>

              {/* 6 Vibrant KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Members: Royal Blue */}
                <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-200">{t.admin.members}</span>
                    <Users className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="text-3xl font-extrabold mt-3">{members.length}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-blue-100">
                    <span>Approved & Active</span>
                    <button onClick={() => setActiveTab('members')} className="underline hover:text-white font-bold">Manage &rarr;</button>
                  </div>
                </div>

                {/* 2. Pending Applications: Amber / Orange */}
                <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-100">{t.admin.applications}</span>
                    <UserCheck className="w-5 h-5 text-amber-100" />
                  </div>
                  <div className="text-3xl font-extrabold mt-3">{applications.filter(a => a.status === 'pending').length}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-amber-100">
                    <span>Needs Committee Review</span>
                    <button onClick={() => setActiveTab('applications')} className="underline hover:text-white font-bold">Review &rarr;</button>
                  </div>
                </div>

                {/* 3. Projects: Emerald Green */}
                <div className="bg-gradient-to-br from-[#059669] to-[#047857] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-100">{t.admin.projects}</span>
                    <FolderKanban className="w-5 h-5 text-emerald-100" />
                  </div>
                  <div className="text-3xl font-extrabold mt-3">{projects.length}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-emerald-100">
                    <span>{projects.filter(p => p.status === 'ongoing').length} in progress</span>
                    <button onClick={() => setActiveTab('projects')} className="underline hover:text-white font-bold">Explore &rarr;</button>
                  </div>
                </div>

                {/* 4. Donations: Teal / Cyan */}
                <div className="bg-gradient-to-br from-[#0891B2] to-[#0E7490] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-100">Total Donations</span>
                    <Coins className="w-5 h-5 text-teal-100" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-3">
                    {donations.filter(d => d.status === 'verified').reduce((s, d) => s + d.amount, 0).toLocaleString()} <span className="text-xs">ETB</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-teal-100">
                    <span>{donations.length} verified records</span>
                    <button onClick={() => setActiveTab('donations')} className="underline hover:text-white font-bold">Ledger &rarr;</button>
                  </div>
                </div>

                {/* 5. Announcements: Purple */}
                <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-purple-200">Announcements</span>
                    <FileText className="w-5 h-5 text-purple-200" />
                  </div>
                  <div className="text-3xl font-extrabold mt-3">{announcements.length}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-purple-100">
                    <span>{announcements.filter(a => a.isPinned).length} pinned bulletins</span>
                    <button onClick={() => setActiveTab('announcements')} className="underline hover:text-white font-bold">View &rarr;</button>
                  </div>
                </div>

                {/* 6. Events: Rose */}
                <div className="bg-gradient-to-br from-[#E11D48] to-[#BE123C] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-rose-200">Community Events</span>
                    <Calendar className="w-5 h-5 text-rose-200" />
                  </div>
                  <div className="text-3xl font-extrabold mt-3">{events.length}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-rose-100">
                    <span>{events.filter(e => e.status === 'upcoming').length} upcoming</span>
                    <button onClick={() => setActiveTab('events')} className="underline hover:text-white font-bold">Schedule &rarr;</button>
                  </div>
                </div>
              </div>

              {/* Visual Visual Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Chart 1: Member Demographics & Geographic Distribution */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#14213D] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#2563EB]" />
                      <span>Membership Geographic Distribution</span>
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500">{members.length} Total</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'Dergag Local Area (ደርጋጅ አካባቢ)', pct: 45, count: Math.round(members.length * 0.45) || 24, color: 'bg-[#2563EB]' },
                      { label: 'Addis Ababa & Surrounding (አዲስ አበባ)', pct: 30, count: Math.round(members.length * 0.30) || 16, color: 'bg-[#059669]' },
                      { label: 'Diaspora Supporters (ዲያስፖራ)', pct: 15, count: Math.round(members.length * 0.15) || 8, color: 'bg-[#D6A84B]' },
                      { label: 'Other Regions & Cities (ሌሎች ክልሎች)', pct: 10, count: Math.round(members.length * 0.10) || 5, color: 'bg-[#7C3AED]' }
                    ].map((row, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-slate-700">{row.label}</span>
                          <span className="font-mono text-slate-500 font-bold">{row.count} ({row.pct}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Project Capital Execution & Progress */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#14213D] flex items-center gap-2">
                      <FolderKanban className="w-4 h-4 text-[#059669]" />
                      <span>Project Implementation Status</span>
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500">{projects.length} Projects</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {projects.slice(0, 4).map((p) => {
                      const pctNum = parseInt(String(p.fundingProgress || '40')) || 40;
                      return (
                        <div key={p.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-slate-700 truncate max-w-[220px]">
                              {currentLang === 'am' ? (p.titleAm || p.title) : p.title}
                            </span>
                            <span className="font-mono text-[#059669] font-bold">{p.fundingProgress || '0%'}</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#2563EB] to-[#059669] rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(pctNum, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                {/* Pending Applications Quick Review Box */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#14213D] flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#F59E0B]" />
                      <span>Pending Applications</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-xs text-[#2563EB] font-bold hover:underline"
                    >
                      View All ({applications.filter(a => a.status === 'pending').length})
                    </button>
                  </div>
                  {applications.filter(a => a.status === 'pending').length === 0 ? (
                    <div className="text-xs text-slate-500 py-6 text-center">No pending applications right now</div>
                  ) : (
                    <div className="space-y-2.5">
                      {applications.filter(a => a.status === 'pending').slice(0, 3).map(app => (
                        <div key={app.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                          <div>
                            <div className="font-bold text-[#14213D]">{app.fullName}</div>
                            <div className="text-[11px] text-slate-500">{app.phone} &bull; {app.cityRegion}</div>
                          </div>
                          <button
                            onClick={() => handleApproveApp(app.id)}
                            className="px-3 py-1.5 bg-[#059669] text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer transition-colors shadow-2xs"
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Audit Trail */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#14213D] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D6A84B]" />
                      <span>Recent Security Audit Trail</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('auditLogs')}
                      className="text-xs text-[#2563EB] font-bold hover:underline"
                    >
                      Full Audit Log
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {auditLogs.slice(0, 4).map(log => (
                      <div key={log.id} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs shadow-2xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-mono font-bold text-slate-700">{log.action}</span>
                          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{log.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: MEMBERSHIP APPLICATIONS */}
          {/* ========================================================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.applications}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review public applicant submissions, verify community affiliation, and approve or reject.
                  </p>
                </div>
                <a
                  href={api.getExportUrl('membershipApplications')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.admin.actions.exportCsv}</span>
                </a>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Applicant Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">City / Region</th>
                      <th className="p-3">Dergag Ties</th>
                      <th className="p-3">Profession / Skills</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-bold text-slate-900 font-ethiopic">{app.fullName}</td>
                        <td className="p-3 font-mono">{app.phone}</td>
                        <td className="p-3">{app.cityRegion}</td>
                        <td className="p-3 text-slate-600 truncate max-w-xs">{app.dergagRelationship || 'N/A'}</td>
                        <td className="p-3 text-slate-600 truncate max-w-xs">{app.profession || app.volunteerSkills || 'N/A'}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              app.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveApp(app.id)}
                                className="px-2.5 py-1 rounded-lg bg-[#16865B] text-white font-semibold hover:bg-emerald-700 cursor-pointer"
                              >
                                {t.admin.actions.approve}
                              </button>
                              <button
                                onClick={() => handleRejectApp(app.id)}
                                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 cursor-pointer"
                              >
                                {t.admin.actions.reject}
                              </button>
                            </>
                          )}
                          {app.status === 'approved' && (
                            <span className="text-[11px] text-emerald-600 font-mono font-bold">
                              {app.generatedMemberId || 'APPROVED'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: APPROVED MEMBERS */}
          {/* ========================================================= */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.members} ({members.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official authorized member registry with confidential contacts and printable ID badges.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={api.getExportUrl('members')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.admin.actions.exportCsv}</span>
                  </a>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, Member ID, phone, or region..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#246BCE] focus:outline-hidden"
                />
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Member ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Region / Location</th>
                      <th className="p-3">Profession</th>
                      <th className="p-3">Joined Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">ID Badge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {members
                      .filter(m =>
                        m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.cityRegion.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((mem) => (
                        <tr key={mem.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-[#246BCE]">{mem.memberId}</td>
                          <td className="p-3 font-bold text-slate-900 font-ethiopic">{mem.fullName}</td>
                          <td className="p-3 font-mono text-slate-600">{mem.phone}</td>
                          <td className="p-3">{mem.cityRegion}</td>
                          <td className="p-3 text-slate-600">{mem.profession || 'N/A'}</td>
                          <td className="p-3 text-slate-500">{mem.joinedDate}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                              {mem.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleToggleMemberStatus(mem)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-semibold cursor-pointer ${
                                  mem.status === 'approved' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                }`}
                                title={mem.status === 'approved' ? 'Suspend Member' : 'Activate Member'}
                              >
                                {mem.status === 'approved' ? 'Suspend' : 'Activate'}
                              </button>
                              <button
                                onClick={() => setSelectedMemberForCard(mem)}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#246BCE] hover:bg-blue-100 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Printer className="w-3 h-3" />
                                <span>Badge</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: PROJECTS */}
          {/* ========================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.projects} ({projects.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, update progress %, or delete community projects and reports.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16865B] text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.actions.addNew}</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#102A43] text-white text-[10px] font-semibold uppercase">
                          {proj.category}
                        </span>
                        <span className="text-xs font-bold text-[#16865B]">{proj.fundingProgress}</span>
                      </div>
                      <h4 className="font-bold text-[#102A43] text-sm font-ethiopic">{proj.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{proj.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{proj.location} &bull; Budget: {proj.budget}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: CHARITY CAMPAIGNS */}
          {/* ========================================================= */}
          {activeTab === 'charity' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.charity} ({campaigns.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage verified public fundraising appeals for emergencies and education.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewCampaignModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16865B] text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.actions.addNew}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#16865B] text-[10px] font-bold uppercase">
                        {camp.status}
                      </span>
                      <span className="text-xs font-bold text-[#246BCE]">{camp.goalAmount}</span>
                    </div>
                    <h3 className="font-bold text-[#102A43] text-sm font-ethiopic">{camp.title}</h3>
                    <div className="text-xs text-slate-600">Beneficiary: <span className="font-semibold">{camp.targetBeneficiary}</span></div>
                    <div className="text-xs text-slate-600">Account: <span className="font-mono">{camp.bankAccount}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: DONATIONS */}
          {/* ========================================================= */}
          {activeTab === 'donations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.donations} ({donations.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified financial contributions recorded by audit committee.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNewDonationModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#16865B] text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Record Donation</span>
                  </button>
                  <a
                    href={api.getExportUrl('donations')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.admin.actions.exportCsv}</span>
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Reference No</th>
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Auditor</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((don) => (
                      <tr key={don.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-800">{don.referenceNumber}</td>
                        <td className="p-3 font-semibold">{don.donorName}</td>
                        <td className="p-3 font-extrabold text-[#16865B]">{don.amount} {don.currency}</td>
                        <td className="p-3 text-slate-600">{don.paymentMethod}</td>
                        <td className="p-3 text-slate-500">{new Date(don.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 text-slate-500">{don.verifiedBy || 'Finance'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                            {don.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: ANNOUNCEMENTS */}
          {/* ========================================================= */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.announcements} ({announcements.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Publish press releases, news updates, and general assembly notices.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewAnnouncementModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#246BCE] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.actions.addNew}</span>
                </button>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#102A43] text-white text-[10px] uppercase font-bold">
                          {ann.category}
                        </span>
                        <span className="text-xs text-slate-400">{ann.publishedDate} &bull; {ann.author}</span>
                      </div>
                      <h4 className="font-bold text-[#102A43] text-sm font-ethiopic">{ann.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{ann.content}</p>
                    </div>

                    <button
                      onClick={async () => {
                        if (confirm('Delete this announcement?')) {
                          await api.deleteAnnouncement(ann.id);
                          showToast('Announcement deleted');
                          fetchAllData();
                        }
                      }}
                      className="text-rose-600 hover:text-rose-800 p-1.5 cursor-pointer"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: EVENTS */}
          {/* ========================================================= */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.events} ({events.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Schedule and monitor community meetings, clean-ups, and health camps.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewEventModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#246BCE] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Event</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#246BCE]">{evt.eventDate}</span>
                        <span className="text-xs font-bold text-slate-700">{evt.attendeeCount} RSVPs</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#102A43] font-ethiopic">{evt.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>
                      <div className="text-xs text-slate-500 pt-1">Venue: {evt.location}</div>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-200 flex justify-end">
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: GALLERY */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                    {t.admin.gallery} ({gallery.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage authentic photos of community development, assemblies, and charity drives.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewGalleryModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#246BCE] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-36 object-cover" />
                    <div className="p-2.5 bg-white text-xs flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-slate-900 truncate font-ethiopic">{g.title}</div>
                        <div className="text-[10px] text-slate-500">{g.category} &bull; {g.date}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteGalleryItem(g.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 shrink-0 cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 10: MESSAGES */}
          {/* ========================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                  {t.admin.messages} ({messages.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Public contact messages submitted by community members, diaspora, and supporters.
                </p>
              </div>

              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      msg.isRead ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="font-bold text-slate-900">{msg.senderName} ({msg.senderPhone})</div>
                      <span className="text-slate-400">{new Date(msg.sentAt).toLocaleString()}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#246BCE] mb-1">{msg.subject}</div>
                    <p className="text-xs text-slate-700 leading-relaxed font-ethiopic whitespace-pre-line">{msg.message}</p>
                    {!msg.isRead && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => handleMarkMessageRead(msg.id)}
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
                        >
                          {t.admin.actions.markRead}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 11: SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                  {t.admin.settings}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update organizational background, mission, office contact numbers, and bank account pathways.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization Name (English)</label>
                  <input
                    type="text"
                    value={settings.orgName}
                    onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization Name (Amharic)</label>
                  <input
                    type="text"
                    value={settings.orgNameAm}
                    onChange={(e) => setSettings({ ...settings, orgNameAm: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Telephone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Telegram Link</label>
                  <input
                    type="text"
                    value={settings.telegramLink}
                    onChange={(e) => setSettings({ ...settings, telegramLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Office Physical Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#16865B] hover:bg-emerald-700 text-white font-bold transition-colors cursor-pointer"
                >
                  {t.admin.actions.save}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 12: AUDIT LOGS */}
          {/* ========================================================= */}
          {activeTab === 'auditLogs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                  {t.admin.auditLogs} ({auditLogs.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Immutable administrative action history and security audit trail.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Actor</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3 font-mono font-bold text-[#246BCE]">{log.action}</td>
                        <td className="p-3 font-semibold text-slate-800">{log.actor}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                            {log.actorRole}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 13: FIREBASE & CLOUD ARCHITECTURE */}
          {/* ========================================================= */}
          {activeTab === 'firebase' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-ethiopic">
                  {t.admin.firebaseSync}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cloud Firestore integration architecture, Intermediate Representation (IR), and Zero-Trust security rules.
                </p>
              </div>

              {/* Status Banner */}
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/70 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#102A43]">
                  <Database className="w-5 h-5 text-[#246BCE]" />
                  <span>Integration Status: {firebaseStatus?.hasAppletConfig ? 'Configured & Connected' : 'Ready for Cloud Provisioning'}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-ethiopic">
                  The application operates on an enterprise-grade full-stack architecture with live persistent storage and complete Firebase Firestore schemas (<code className="font-mono text-blue-700">firebase-blueprint.json</code>) and Zero-Trust rules (<code className="font-mono text-blue-700">firestore.rules</code>).
                </p>
                <div className="pt-2 text-xs flex flex-wrap items-center gap-4 font-mono">
                  <span>Project ID: <strong className="text-[#102A43]">{firebaseStatus?.projectId || 'gen-lang-client-0378877738'}</strong></span>
                  <span>Database: <strong className="text-[#102A43]">{firebaseStatus?.firestoreDatabaseId || 'ai-studio-dergagcommunityu-e9d00fcc-e646-4e7b-bafa-b38ee64274c2'}</strong></span>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://console.firebase.google.com/project/${firebaseStatus?.projectId || 'gen-lang-client-0378877738'}/firestore`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#246BCE] to-[#102A43] text-white text-xs font-bold hover:opacity-90 shadow-sm transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Cloud Firestore Database</span>
                  </a>
                  <a
                    href={`https://console.firebase.google.com/project/${firebaseStatus?.projectId || 'gen-lang-client-0378877738'}/authentication`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Firebase Auth & Users</span>
                  </a>
                </div>
              </div>

              {/* Blueprint & Security Specs Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-[#102A43]">Firestore Blueprint Collections</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 font-mono text-[11px]">
                    <li>/users/{'{userId}'} - RBAC user accounts</li>
                    <li>/members/{'{memberId}'} - Approved members (PII protected)</li>
                    <li>/membershipApplications/{'{appId}'} - Public applications</li>
                    <li>/projects/{'{projectId}'} - Community projects</li>
                    <li>/charityCampaigns/{'{campaignId}'} - Charity records</li>
                    <li>/announcements/{'{announcementId}'} - Press releases</li>
                    <li>/events/{'{eventId}'} - Community gatherings</li>
                    <li>/contactMessages/{'{messageId}'} - Inquiries</li>
                    <li>/organizationSettings/{'{settingId}'} - Global settings</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-[#102A43]">Security Pillars Enforced</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Global Default-Deny: <code className="font-mono text-[10px]">match /{'{document=**}'} allow read, write: if false;</code></li>
                    <li>Zero-Trust Member PII: phone & email access restricted to authorized administrators</li>
                    <li>Attribute-Based Access Control (ABAC) with explicit role checks</li>
                    <li>Super Admin Email Access: <code className="font-mono text-[10px]">ethiogold037@gmail.com</code></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Member ID Card Modal */}
      <MembershipIdCardModal
        member={selectedMemberForCard}
        onClose={() => setSelectedMemberForCard(null)}
        currentLang={currentLang}
      />

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Project Title (English)</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Title (Amharic)</label>
                <input
                  type="text"
                  value={newProject.titleAm}
                  onChange={(e) => setNewProject({ ...newProject, titleAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value="community_development">Community Development</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="social_support">Social Support</option>
                  <option value="youth_development">Youth Development</option>
                  <option value="environmental_protection">Environmental Protection</option>
                  <option value="spiritual_cultural">Spiritual & Cultural</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Budget</label>
                  <input
                    type="text"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="e.g. 1,500,000 ETB"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Progress %</label>
                  <input
                    type="text"
                    value={newProject.fundingProgress}
                    onChange={(e) => setNewProject({ ...newProject, fundingProgress: e.target.value })}
                    placeholder="e.g. 60%"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16865B] text-white font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Announcement Modal */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Publish Announcement</h3>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Headline (English)</label>
                <input
                  type="text"
                  required
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Headline (Amharic)</label>
                <input
                  type="text"
                  value={newAnnouncement.titleAm}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, titleAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value="official">Official Press Release</option>
                  <option value="charity">Charity Announcement</option>
                  <option value="meeting">General Assembly / Meeting</option>
                  <option value="event">Event Notice</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Content (English)</label>
                <textarea
                  rows={3}
                  required
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Content (Amharic)</label>
                <textarea
                  rows={3}
                  value={newAnnouncement.contentAm}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, contentAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAnnouncementModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#246BCE] text-white font-bold"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Create Charity Campaign</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Target Beneficiary</label>
                <input
                  type="text"
                  required
                  value={newCampaign.targetBeneficiary}
                  onChange={(e) => setNewCampaign({ ...newCampaign, targetBeneficiary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Goal Amount</label>
                  <input
                    type="text"
                    value={newCampaign.goalAmount}
                    onChange={(e) => setNewCampaign({ ...newCampaign, goalAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Bank Reference</label>
                  <input
                    type="text"
                    value={newCampaign.bankAccount}
                    onChange={(e) => setNewCampaign({ ...newCampaign, bankAccount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Campaign Description</label>
                <textarea
                  rows={3}
                  required
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16865B] text-white font-bold"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Donation Modal */}
      {showNewDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Record Verified Contribution</h3>
            <form onSubmit={handleRecordDonation} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Bank Reference / Transaction ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBE-FT-992144 or TB-554192"
                  value={newDonation.referenceNumber}
                  onChange={(e) => setNewDonation({ ...newDonation, referenceNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Donor Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anonymous or Supporter Name"
                    value={newDonation.donorName}
                    onChange={(e) => setNewDonation({ ...newDonation, donorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Donor Phone (Optional)</label>
                  <input
                    type="text"
                    placeholder="+251..."
                    value={newDonation.donorPhone}
                    onChange={(e) => setNewDonation({ ...newDonation, donorPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Amount (ETB)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newDonation.amount}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Payment Method</label>
                  <select
                    value={newDonation.paymentMethod}
                    onChange={(e) => setNewDonation({ ...newDonation, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</option>
                    <option value="Awash Bank">Awash Bank</option>
                    <option value="Telebirr">Telebirr</option>
                    <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                    <option value="Cash / Receipt">Direct Receipt</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Associated Campaign</label>
                <select
                  value={newDonation.campaignId}
                  onChange={(e) => setNewDonation({ ...newDonation, campaignId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value="general">General Community Welfare Fund</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDonationModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16865B] text-white font-bold"
                >
                  Record & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Schedule Community Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Event Title (English)</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Event Title (Amharic)</label>
                <input
                  type="text"
                  value={newEvent.titleAm}
                  onChange={(e) => setNewEvent({ ...newEvent, titleAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM - 01:00 PM"
                    value={newEvent.eventTime}
                    onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Venue / Location</label>
                  <input
                    type="text"
                    required
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Organizer</label>
                  <input
                    type="text"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#246BCE] text-white font-bold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Gallery Photo Modal */}
      {showNewGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Add Gallery Photograph</h3>
            <form onSubmit={handleAddGalleryItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Caption / Title (English)</label>
                <input
                  type="text"
                  required
                  value={newGalleryItem.title}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Caption / Title (Amharic)</label>
                <input
                  type="text"
                  value={newGalleryItem.titleAm}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, titleAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newGalleryItem.category}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="development">Community Development</option>
                    <option value="youth">Youth Programs</option>
                    <option value="meetings">Meetings & Assemblies</option>
                    <option value="charity">Charity & Aid</option>
                    <option value="cultural">Culture & Heritage</option>
                    <option value="community">General Community</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newGalleryItem.date}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newGalleryItem.imageUrl}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Extended Caption</label>
                <textarea
                  rows={2}
                  value={newGalleryItem.caption}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewGalleryModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#246BCE] text-white font-bold"
                >
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#102A43] mb-4">Edit Project Details</h3>
            <form onSubmit={handleUpdateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Title (Amharic)</label>
                <input
                  type="text"
                  value={editingProject.titleAm || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleAm: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-ethiopic"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="planned">Planned</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Funding Progress</label>
                  <input
                    type="text"
                    value={editingProject.fundingProgress}
                    onChange={(e) => setEditingProject({ ...editingProject, fundingProgress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Budget</label>
                  <input
                    type="text"
                    value={editingProject.budget || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#246BCE] text-white font-bold"
                >
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
