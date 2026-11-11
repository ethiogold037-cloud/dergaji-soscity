import {
  StatsSummary,
  OrganizationSettings,
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
  User,
  UserRole
} from '../types';

const BASE_URL = '/api';

let authToken = typeof window !== 'undefined' ? localStorage.getItem('dergag_token') || '' : '';

export function setAuthToken(token: string) {
  authToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('dergag_token', token);
    } else {
      localStorage.removeItem('dergag_token');
    }
  }
}

export function getAuthToken(): string {
  return authToken;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options?.headers as Record<string, string> || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `HTTP error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // Stats
  async getStats(): Promise<StatsSummary> {
    return fetchJson<StatsSummary>(`${BASE_URL}/stats`);
  },

  // Settings
  async getSettings(): Promise<OrganizationSettings> {
    return fetchJson<OrganizationSettings>(`${BASE_URL}/settings`);
  },

  async updateSettings(data: Partial<OrganizationSettings>, updatedBy?: string): Promise<{ success: boolean; settings: OrganizationSettings }> {
    return fetchJson<{ success: boolean; settings: OrganizationSettings }>(`${BASE_URL}/settings`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, updatedBy })
    });
  },

  // Members
  async getMembers(search?: string): Promise<Member[]> {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return fetchJson<Member[]>(`${BASE_URL}/members${query}`);
  },

  async createMember(data: Partial<Member>, createdBy?: string): Promise<Member> {
    return fetchJson<Member>(`${BASE_URL}/members`, {
      method: 'POST',
      body: JSON.stringify({ ...data, createdBy })
    });
  },

  async updateMember(id: string, data: Partial<Member>, updatedBy?: string): Promise<Member> {
    return fetchJson<Member>(`${BASE_URL}/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, updatedBy })
    });
  },

  // Applications
  async getApplications(status?: string): Promise<MembershipApplication[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return fetchJson<MembershipApplication[]>(`${BASE_URL}/applications${query}`);
  },

  async submitApplication(data: Partial<MembershipApplication>): Promise<{ success: boolean; application: MembershipApplication }> {
    return fetchJson<{ success: boolean; application: MembershipApplication }>(`${BASE_URL}/applications`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async checkApplicationStatus(phone: string): Promise<any> {
    return fetchJson<any>(`${BASE_URL}/applications/check/${encodeURIComponent(phone)}`);
  },

  async approveApplication(id: string, reviewedBy?: string): Promise<{ success: boolean; member: Member; application: MembershipApplication }> {
    return fetchJson<{ success: boolean; member: Member; application: MembershipApplication }>(`${BASE_URL}/applications/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ reviewedBy })
    });
  },

  async rejectApplication(id: string, reason?: string, reviewedBy?: string): Promise<{ success: boolean; application: MembershipApplication }> {
    return fetchJson<{ success: boolean; application: MembershipApplication }>(`${BASE_URL}/applications/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ rejectionReason: reason, reviewedBy })
    });
  },

  // Projects
  async getProjects(category?: string, status?: string): Promise<Project[]> {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (status) params.set('status', status);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return fetchJson<Project[]>(`${BASE_URL}/projects${qs}`);
  },

  async createProject(data: Partial<Project>, createdBy?: string): Promise<Project> {
    return fetchJson<Project>(`${BASE_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify({ ...data, createdBy })
    });
  },

  async updateProject(id: string, data: Partial<Project>, updatedBy?: string): Promise<Project> {
    return fetchJson<Project>(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, updatedBy })
    });
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Charity Campaigns
  async getCampaigns(): Promise<CharityCampaign[]> {
    return fetchJson<CharityCampaign[]>(`${BASE_URL}/campaigns`);
  },

  async createCampaign(data: Partial<CharityCampaign>, createdBy?: string): Promise<CharityCampaign> {
    return fetchJson<CharityCampaign>(`${BASE_URL}/campaigns`, {
      method: 'POST',
      body: JSON.stringify({ ...data, createdBy })
    });
  },

  async updateCampaign(id: string, data: Partial<CharityCampaign>, updatedBy?: string): Promise<CharityCampaign> {
    return fetchJson<CharityCampaign>(`${BASE_URL}/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, updatedBy })
    });
  },

  async deleteCampaign(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/campaigns/${id}`, {
      method: 'DELETE'
    });
  },

  // Donations
  async getDonations(): Promise<DonationRecord[]> {
    return fetchJson<DonationRecord[]>(`${BASE_URL}/donations`);
  },

  async recordDonation(data: Partial<DonationRecord>, recordedBy?: string): Promise<DonationRecord> {
    return fetchJson<DonationRecord>(`${BASE_URL}/donations`, {
      method: 'POST',
      body: JSON.stringify({ ...data, recordedBy })
    });
  },

  async verifyDonation(id: string, verifiedBy?: string): Promise<DonationRecord> {
    return fetchJson<DonationRecord>(`${BASE_URL}/donations/${id}/verify`, {
      method: 'PUT',
      body: JSON.stringify({ verifiedBy })
    });
  },

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return fetchJson<Announcement[]>(`${BASE_URL}/announcements`);
  },

  async createAnnouncement(data: Partial<Announcement>, author?: string): Promise<Announcement> {
    return fetchJson<Announcement>(`${BASE_URL}/announcements`, {
      method: 'POST',
      body: JSON.stringify({ ...data, author })
    });
  },

  async updateAnnouncement(id: string, data: Partial<Announcement>): Promise<Announcement> {
    return fetchJson<Announcement>(`${BASE_URL}/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async deleteAnnouncement(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/announcements/${id}`, {
      method: 'DELETE'
    });
  },

  // Events
  async getEvents(): Promise<Event[]> {
    return fetchJson<Event[]>(`${BASE_URL}/events`);
  },

  async createEvent(data: Partial<Event>): Promise<Event> {
    return fetchJson<Event>(`${BASE_URL}/events`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateEvent(id: string, data: Partial<Event>): Promise<Event> {
    return fetchJson<Event>(`${BASE_URL}/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async deleteEvent(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/events/${id}`, {
      method: 'DELETE'
    });
  },

  async rsvpEvent(id: string): Promise<{ success: boolean; attendeeCount: number }> {
    return fetchJson<{ success: boolean; attendeeCount: number }>(`${BASE_URL}/events/${id}/rsvp`, {
      method: 'POST'
    });
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    return fetchJson<GalleryItem[]>(`${BASE_URL}/gallery`);
  },

  async addGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
    return fetchJson<GalleryItem>(`${BASE_URL}/gallery`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async deleteGalleryItem(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/gallery/${id}`, {
      method: 'DELETE'
    });
  },

  // Messages
  async getMessages(): Promise<ContactMessage[]> {
    return fetchJson<ContactMessage[]>(`${BASE_URL}/messages`);
  },

  async sendMessage(data: Partial<ContactMessage>): Promise<{ success: boolean; message: ContactMessage }> {
    return fetchJson<{ success: boolean; message: ContactMessage }>(`${BASE_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async markMessageRead(id: string): Promise<{ success: boolean }> {
    return fetchJson<{ success: boolean }>(`${BASE_URL}/messages/${id}/read`, {
      method: 'PUT'
    });
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return fetchJson<AuditLog[]>(`${BASE_URL}/audit-logs`);
  },

  // Auth
  async login(email?: string, password?: string, requestedRole?: UserRole): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetchJson<{ success: boolean; token: string; user: User }>(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password, requestedRole })
    });
    if (res.token) {
      setAuthToken(res.token);
    }
    return res;
  },

  logout(): void {
    setAuthToken('');
  },

  // Firebase status
  async getFirebaseStatus(): Promise<{ hasAppletConfig: boolean; projectId: string | null; firestoreDatabaseId: string; status: string }> {
    return fetchJson<{ hasAppletConfig: boolean; projectId: string | null; firestoreDatabaseId: string; status: string }>(`${BASE_URL}/firebase-status`);
  },

  // CSV export URL
  getExportUrl(collectionName: string): string {
    return `${BASE_URL}/export/${collectionName}`;
  }
};
