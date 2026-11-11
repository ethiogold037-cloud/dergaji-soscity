export type Language = 'am' | 'en';

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'content_manager'
  | 'membership_manager'
  | 'project_manager';

export interface User {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Member {
  id: string;
  memberId: string; // e.g. DU-2026-0042
  fullName: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  phone: string;
  email?: string;
  cityRegion: string;
  currentLocation: string;
  dergagRelationship: string;
  profession?: string;
  interestAreas?: string;
  volunteerSkills?: string;
  status: 'approved' | 'suspended';
  joinedDate: string;
  approvedBy?: string;
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  phone: string;
  email?: string;
  cityRegion: string;
  currentLocation: string;
  dergagRelationship: string;
  profession?: string;
  interestAreas?: string;
  volunteerSkills?: string;
  shortMessage?: string;
  privacyConsent: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  generatedMemberId?: string;
}

export type ProjectCategory =
  | 'education'
  | 'healthcare'
  | 'social_support'
  | 'youth_development'
  | 'community_development'
  | 'environmental_protection'
  | 'spiritual_cultural';

export type ProjectStatus = 'planned' | 'ongoing' | 'completed';

export interface Project {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  category: ProjectCategory;
  location: string;
  coverImage: string;
  startDate: string;
  expectedCompletionDate?: string;
  status: ProjectStatus;
  budget?: string;
  fundingProgress?: string; // Percentage or verified amount
  gallery?: string[];
  impactReport?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CharityCampaign {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  targetBeneficiary: string;
  goalAmount: string; // e.g. "500,000 ETB"
  verifiedProgress: string; // verified by finance committee
  status: 'active' | 'funded' | 'paused';
  bankAccount: string;
  contactPerson: string;
  coverImage?: string;
  donationsCount?: number;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  campaignId?: string;
  donorName: string;
  donorPhone?: string;
  donorEmail?: string;
  amount: number;
  currency: string; // e.g. ETB, USD
  paymentMethod: string; // e.g. CBE, Telebirr, Awash, Bank Transfer
  referenceNumber: string;
  status: 'verified' | 'pending' | 'rejected';
  verifiedBy?: string;
  notes?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleAm: string;
  content: string;
  contentAm: string;
  category: 'general' | 'charity' | 'event' | 'meeting' | 'official';
  publishedDate: string;
  author: string;
  isPinned?: boolean;
  coverImage?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  organizer: string;
  coverImage?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendeeCount: number;
  registrationOpen: boolean;
}

export interface Volunteer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  skills: string;
  availability: string;
  status: 'active' | 'available' | 'inactive';
  registeredAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleAm?: string;
  category: 'community' | 'charity' | 'development' | 'meetings' | 'cultural' | 'youth';
  imageUrl: string;
  date: string;
  caption?: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail?: string;
  senderPhone: string;
  subject: string;
  message: string;
  sentAt: string;
  isRead: boolean;
  replyNote?: string;
}

export interface OrganizationSettings {
  id: string;
  orgName: string;
  orgNameAm: string;
  shortName: string;
  slogan: string;
  sloganAm: string;
  aboutHistory: string;
  aboutHistoryAm: string;
  mission: string;
  missionAm: string;
  vision: string;
  visionAm: string;
  phone: string;
  email: string;
  address: string;
  officeHours: string;
  telegramLink: string;
  telegramChannelName: string;
  facebookLink?: string;
  youtubeLink?: string;
  bankAccounts: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    swiftCode?: string;
  }[];
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  details: string;
  targetCollection: string;
  targetId?: string;
  timestamp: string;
}

export interface StatsSummary {
  registeredMembers: number;
  pendingApplications: number;
  activeProjects: number;
  completedProjects: number;
  totalProjects: number;
  publishedAnnouncements: number;
  upcomingEvents: number;
  volunteers: number;
  activeCharityCampaigns: number;
  verifiedDonationsTotal: number;
}
