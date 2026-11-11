# DERGAG COMMUNITY UNITY & CHARITY ASSOCIATION
## Enterprise-Grade Full-Stack Community & Non-Profit Management Platform
**የደርጋግ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር**

> *"በአንድነት ለወገናችን፣ በመተሳሰብ ለአካባቢያችን፣ በትብብር ለትውልዳችን!"*
> *"United in Unity, Serving Humanity, Building Our Future."*

---

## 1. Executive Summary & Purpose

The **Dergag Community Unity & Charity Association (Dergag Unity)** platform is an enterprise-grade, full-stack digital hub engineered to unite community members, diaspora supporters, and philanthropic partners. The platform facilitates:
- Transparent humanitarian charity campaigns and medical emergency relief
- Grassroots local development projects (clean drinking water, education infrastructure, maternal healthcare)
- Secure membership registration, background vetting, and automated Member ID generation
- Verified public press releases and official announcements
- General assembly and community workday event coordination with RSVP tracking
- Zero-Trust administrative management portal (`/admin`) with role-based access control (RBAC)
- Full bilingual localization: **አማርኛ (Amharic)** as the primary working language and **English**

---

## 2. Architecture & Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | Modular, hook-based component architecture |
| **Styling & Design System** | Tailwind CSS v4 | Custom palette: Navy `#102A43`, Blue `#246BCE`, Green `#16865B`, Gold `#D6A84B` |
| **Typography** | Noto Sans Ethiopic & Inter | High-readability Ethiopic and Latin typography |
| **Backend API** | Express (Node.js/TSX) | RESTful API mounted with Vite middlewares in development (`server.ts`) |
| **Persistence Store** | Persistent JSON Database | Atomic file-backed database (`data/database.json`) storing all 14 domain collections |
| **Cloud Architecture** | Cloud Firestore / Firebase | Intermediate Representation (`firebase-blueprint.json`), ABAC rules (`firestore.rules`), Storage rules (`storage.rules`) |
| **Icons & Motion** | Lucide React & Motion | Modern SVG iconography and smooth micro-interactions |

---

## 3. Verified User Workflows

All required workflows are implemented and verified:

1. **Public Information Browsing (Workflow A)**: Visitors can explore organizational background, history, mission, vision, 8 strategic pillars, and governance structure in Amharic and English.
2. **Membership Application (Workflow B)**: Prospective members submit detailed applications (Full Name, Gender, Phone, Region, Dergag Affinity, Profession, Skills, Privacy Consent). Includes live duplicate phone detection.
3. **Admin Review & Approval (Workflows C & D)**: Authorized staff in `/admin` review pending applications, approve with one click, automatically generate official Member IDs (e.g. `DU-2026-0006`), log audit entries, and generate printable Membership ID Badges with QR verification seals.
4. **Project Management (Workflows E & F)**: Administrators create, edit budget/progress %, publish, or delete community development projects, immediately reflecting on the public website with category and status filters.
5. **News & Official Announcements (Workflow G)**: Content editors publish bilingual notices, pin featured bulletins, and visitors can read full articles or share directly to Telegram.
6. **Community Gatherings & Events (Workflow H)**: Visitors explore upcoming and past events, with instant live RSVP registration and attendee counting.
7. **Contact & Telegram Inquiries (Workflow I)**: Visitors send official inquiries stored directly in the admin message inbox, connect to the official Telegram community channel, and access Google Maps coordinates.
8. **Organization Content Management (Workflow J)**: Executive committee members can modify official phone numbers, addresses, Telegram links, and bank accounts without touching source code.
9. **Zero-Trust PII Protection (Workflow K)**: Member phone numbers, addresses, and private contact info are safeguarded from public scraping and only exposed to authenticated staff.

---

## 4. Database Collections Structure

The platform models 14 structured collections conforming to the Intermediate Representation schema (`firebase-blueprint.json`):

- `users`: Staff accounts with role assignments (`super_admin`, `admin`, `content_manager`, `membership_manager`, `project_manager`)
- `members`: Approved organization members with generated Member IDs
- `membershipApplications`: Public applications pending committee review
- `projects`: Community development, water, healthcare, and education projects
- `charityCampaigns`: Verified humanitarian fundraising appeals
- `donations`: Audited financial donation records
- `announcements`: Official press releases and newsletters
- `events`: Scheduled assemblies, tree plantings, and medical camps
- `volunteers`: Registered volunteer specialists and availability
- `gallery`: Photos of community activities categorized by album
- `contactMessages`: Incoming messages from public inquiry form
- `organizationSettings`: Configurable contact details, history, and official bank accounts
- `auditLogs`: Timestamped logs of all administrative mutations

---

## 5. Security & Firestore Rules Specification

The project includes hardened Zero-Trust Firestore Security Rules (`firestore.rules`) adhering to the Eight Pillars of Hardened Rules:
- **Global Default-Deny**: Catch-all default denial prevents unintended open access.
- **ABAC Role Validation**: Writes to projects, charity campaigns, and settings require verified admin privileges.
- **PII Isolation**: Read access to the `/members/` collection is restricted to authorized administrators.
- **Id Poisoning Guard**: Document ID path variables are strictly constrained using `isValidId(id)`.
- **Anti-Update-Gap Key Checks**: Validation blueprints strictly prevent shadow field injection.

---

## 6. Installation & Local Development

### Prerequisites
- Node.js 20+
- npm or bun

### Step-by-Step Setup
```bash
# 1. Clone repository
git clone <repo-url>
cd dergag-unity-app

# 2. Install dependencies
npm install

# 3. Start development server (Port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.
To access the administration portal, navigate to `http://localhost:3000/#admin` or click **Admin Portal** in the navigation bar.

### Testing Admin Roles
The login interface features quick-role selector buttons for reviewing specific staff permissions:
- **Super Admin**: `admin@dergagunity.org`
- **Membership Head**: `membership@dergagunity.org`
- **Project Director**: `projects@dergagunity.org`
- **Content Editor**: `media@dergagunity.org`

---

## 7. Firebase Cloud Provisioning & Deployment

To connect Cloud Firestore in production:
1. Run the AI Studio Firebase setup tool or place your `firebase-applet-config.json` in the root directory.
2. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```
3. Build and launch production server:
   ```bash
   npm run build
   npm start
   ```
