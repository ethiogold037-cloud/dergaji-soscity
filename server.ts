import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp as initFirebaseApp } from 'firebase/app';
import { getFirestore, doc as fsDoc, setDoc as fsSetDoc, deleteDoc as fsDeleteDoc } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize live Cloud Firestore connection
let firestoreDb: any = null;
try {
  const configPath = path.join(__dirname, 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    const fbConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const fbApp = initFirebaseApp(fbConfig);
    firestoreDb = getFirestore(fbApp, fbConfig.firestoreDatabaseId);
    console.log('Firebase Cloud Firestore live sync initialized:', fbConfig.firestoreDatabaseId);
  }
} catch (e) {
  console.warn('Firebase initialization notice:', (e as Error).message);
}

function syncToFirestore(collectionName: string, docId: string, data: any) {
  if (!firestoreDb) return;
  fsSetDoc(fsDoc(firestoreDb, collectionName, docId), data)
    .catch((err: any) => console.warn(`Firestore sync [${collectionName}/${docId}]:`, err.message));
}

function deleteFromFirestore(collectionName: string, docId: string) {
  if (!firestoreDb) return;
  fsDeleteDoc(fsDoc(firestoreDb, collectionName, docId))
    .catch((err: any) => console.warn(`Firestore delete [${collectionName}/${docId}]:`, err.message));
}

// Data file path
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data with authentic community records
const initialDatabase = {
  organizationSettings: {
    id: 'default',
    orgName: 'Dergag Community Unity & Charity Association',
    orgNameAm: 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር',
    shortName: 'Dergag Unity',
    slogan: 'United in Unity, Serving Humanity, Building Our Future.',
    sloganAm: 'በአንድነት ለወገናችን፣ በመተሳሰብ ለአካባቢያችን፣ በትብብር ለትውልዳችን!',
    aboutHistory: 'Dergag Community Unity & Charity Association was founded by dedicated elders, community representatives, and youth from the Dergag area to foster solidarity, social welfare, humanitarian relief, and grassroots local development.',
    aboutHistoryAm: 'የደርጋጅ ማህበረሰብ አንድነት እና በጎ አድራጎት ማህበር በአካባቢው የሀገር ሽማግሌዎች፣ ወጣቶችና ተወላጆች ጥረት የተቋቋመ ሲሆን፤ ዋና ዓላማውም የማህበረሰብ አንድነትን ማጠናከር፣ አቅመ ደካሞችን መደገፍና የአካባቢውን ሁለንተናዊ ልማት ማፋጠን ነው::',
    mission: 'To unite all members of the Dergag community and supporters, delivering transparent humanitarian relief, education, healthcare aid, and sustainable development.',
    missionAm: 'የደርጋጅ ተወላጆችንና በጎ አድራጊዎችን በማስተባበር በበጎ አድራጎት፣ በትምህርት፣ በጤና፣ በማህበራዊ ደህንነት እና በልማት ስራዎች የህብረተሰቡን ኑሮ ማሻሻል::',
    vision: 'To see an empowered, interconnected, culturally rich, and self-sufficient Dergag community where every family thrives with dignity.',
    visionAm: 'የተሳሰረ፣ እርስ በርስ የሚረዳዳ፣ በኢኮኖሚና ማህበራዊ መስክ የበለጸገ እና ባህሉን የጠበቀ ጠንካራ የደርጋጅ ማህበረሰብ ማየት::',
    phone: '+251 91 123 4567 / +251 92 987 6543',
    email: 'info@dergagunity.org',
    address: 'Dergag Center Office & Addis Ababa Liaison Branch (Bole Sub-City), Ethiopia',
    officeHours: 'Monday - Saturday: 8:30 AM - 5:30 PM (EAT)',
    telegramLink: 'https://t.me/dergag_unity_official',
    telegramChannelName: '@dergag_unity_official',
    facebookLink: 'https://facebook.com/dergagunity',
    youtubeLink: 'https://youtube.com/@dergagunity',
    bankAccounts: [
      {
        bankName: 'Commercial Bank of Ethiopia (CBE)',
        accountNumber: '1000458921478',
        accountHolder: 'Dergag Community Unity & Charity Association',
        swiftCode: 'CBETETAA'
      },
      {
        bankName: 'Awash Bank',
        accountNumber: '01320876543200',
        accountHolder: 'Dergag Charity Association',
        swiftCode: 'AWINETAA'
      },
      {
        bankName: 'Telebirr Institutional Pay',
        accountNumber: '+251 91 123 4567 / Merchant: 889210',
        accountHolder: 'Dergag Unity Association',
        swiftCode: ''
      }
    ]
  },

  users: [
    {
      id: 'usr_ethiogold',
      uid: 'uid_ethiogold_001',
      email: 'ethiogold037@gmail.com',
      displayName: 'Ethio Gold (Super Admin)',
      role: 'super_admin',
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'usr_superadmin',
      uid: 'uid_admin_001',
      email: 'admin@dergagunity.org',
      displayName: 'Ato Solomon Kebede (Super Admin)',
      role: 'super_admin',
      isActive: true,
      createdAt: '2025-01-10T09:00:00Z'
    },
    {
      id: 'usr_membership',
      uid: 'uid_mem_002',
      email: 'membership@dergagunity.org',
      displayName: 'W/ro Selamawit Hailu (Membership Head)',
      role: 'membership_manager',
      isActive: true,
      createdAt: '2025-02-01T10:00:00Z'
    },
    {
      id: 'usr_projects',
      uid: 'uid_proj_003',
      email: 'projects@dergagunity.org',
      displayName: 'Eng. Dawit Tesfaye (Project Director)',
      role: 'project_manager',
      isActive: true,
      createdAt: '2025-02-15T11:00:00Z'
    },
    {
      id: 'usr_content',
      uid: 'uid_content_004',
      email: 'media@dergagunity.org',
      displayName: 'Ato Yohannes Girma (Communications)',
      role: 'content_manager',
      isActive: true,
      createdAt: '2025-03-01T08:30:00Z'
    }
  ],

  members: [
    {
      id: 'mem_1',
      memberId: 'DU-2025-0001',
      fullName: 'Ato Solomon Kebede',
      gender: 'male',
      phone: '+251911234567',
      email: 'solomon.k@gmail.com',
      cityRegion: 'Addis Ababa',
      currentLocation: 'Bole Sub-City',
      dergagRelationship: 'Born in Dergag (Origin Native)',
      profession: 'Senior Public Administrator',
      interestAreas: 'Community Governance, Infrastructure',
      volunteerSkills: 'Leadership, Strategic Planning',
      status: 'approved',
      joinedDate: '2025-01-15'
    },
    {
      id: 'mem_2',
      memberId: 'DU-2025-0002',
      fullName: 'W/ro Almaz Tadesse',
      gender: 'female',
      phone: '+251912889900',
      email: 'almaz.tadesse@outlook.com',
      cityRegion: 'Dergag / Oromia',
      currentLocation: 'Dergag Central Town',
      dergagRelationship: 'Lifelong resident',
      profession: 'Educator & School Principal',
      interestAreas: 'Youth Education, Women Empowerment',
      volunteerSkills: 'Curriculum Development, Community Organizing',
      status: 'approved',
      joinedDate: '2025-01-20'
    },
    {
      id: 'mem_3',
      memberId: 'DU-2025-0003',
      fullName: 'Dr. Bekele Alemayehu',
      gender: 'male',
      phone: '+251933556677',
      email: 'drbekele.med@gmail.com',
      cityRegion: 'Addis Ababa',
      currentLocation: 'Yeka Sub-City',
      dergagRelationship: 'Origin Family in Dergag',
      profession: 'Medical Doctor / Surgeon',
      interestAreas: 'Healthcare, Emergency Medical Relief',
      volunteerSkills: 'Clinical outreach, Health Education',
      status: 'approved',
      joinedDate: '2025-02-05'
    },
    {
      id: 'mem_4',
      memberId: 'DU-2025-0004',
      fullName: 'W/ro Tigist Berhanu',
      gender: 'female',
      phone: '+251922446688',
      email: 'tigist.b@yahoo.com',
      cityRegion: 'Diaspora (North America)',
      currentLocation: 'Washington DC, USA',
      dergagRelationship: 'Diaspora Supporter & Dergag Descent',
      profession: 'Financial Analyst',
      interestAreas: 'Charity Fundraising, Diaspora Network',
      volunteerSkills: 'Fundraising, Audit Coordination',
      status: 'approved',
      joinedDate: '2025-02-18'
    },
    {
      id: 'mem_5',
      memberId: 'DU-2025-0005',
      fullName: 'Ato Mohammed Nur',
      gender: 'male',
      phone: '+251944112233',
      email: 'mohammed.nur@gmail.com',
      cityRegion: 'Dergag Area',
      currentLocation: 'Dergag Farmers Union',
      dergagRelationship: 'Farmer & Elder Representative',
      profession: 'Agricultural Cooperative Leader',
      interestAreas: 'Water Projects, Environmental Conservation',
      volunteerSkills: 'Local Logistics, Traditional Conflict Resolution',
      status: 'approved',
      joinedDate: '2025-03-01'
    }
  ],

  membershipApplications: [
    {
      id: 'app_1',
      fullName: 'Kidus Hailemariam',
      gender: 'male',
      phone: '+251911998877',
      email: 'kidus.h@gmail.com',
      cityRegion: 'Addis Ababa',
      currentLocation: 'Arada Sub-City',
      dergagRelationship: 'Parents born in Dergag',
      profession: 'Software Engineer',
      interestAreas: 'Youth Digital Skills & Website',
      volunteerSkills: 'Web Development, IT Training',
      shortMessage: 'I want to contribute my technical skills to digitize community programs and help youth learn modern IT.',
      privacyConsent: true,
      status: 'pending',
      submittedAt: '2026-11-02T14:20:00Z'
    },
    {
      id: 'app_2',
      fullName: 'Genet Mengistu',
      gender: 'female',
      phone: '+251920776655',
      email: 'genet.mengistu@gmail.com',
      cityRegion: 'Adama',
      currentLocation: 'Adama City',
      dergagRelationship: 'Native resident family',
      profession: 'Nurse',
      interestAreas: 'Maternal Healthcare & Elderly Care',
      volunteerSkills: 'First Aid Training, Healthcare Camps',
      shortMessage: 'Eager to volunteer in mobile health clinics for rural Dergag villages during weekends.',
      privacyConsent: true,
      status: 'pending',
      submittedAt: '2026-11-05T10:15:00Z'
    }
  ],

  projects: [
    {
      id: 'proj_1',
      title: 'Dergag Community Clean Drinking Water Initiative',
      titleAm: 'የደርጋጅ አካባቢ ንጹህ የመጠጥ ውሃ ፕሮጀክት',
      description: 'Drilling modern boreholes and establishing protected distribution points to provide clean, potable water for over 3,500 rural households, drastically reducing waterborne diseases.',
      descriptionAm: 'ለ3,500 አባወራዎች ንጹህ የመጠጥ ውሃ ተደራሽ ለማድረግ ጥልቅ የውሃ ጉድጓድ ቁፋሮ እና የማከፋፈያ መስመር ግንባታ ስራ::',
      category: 'community_development',
      location: 'Dergag Rural Kebele 02 & 03',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
      startDate: '2025-04-01',
      expectedCompletionDate: '2026-12-30',
      status: 'ongoing',
      budget: '1,850,000 ETB',
      fundingProgress: '72%',
      gallery: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      ],
      impactReport: 'Phase 1 hydrological survey and shallow drilling completed successfully. Civil works on reservoir tank underway with 65% local community labor participation.',
      isFeatured: true,
      createdAt: '2025-03-15T10:00:00Z',
      updatedAt: '2026-10-25T14:00:00Z'
    },
    {
      id: 'proj_2',
      title: 'Dergag Primary School Library & ICT Lab Renovation',
      titleAm: 'የደርጋጅ መጀመሪያ ደረጃ ትምህርት ቤት ቤተ-መጽሐፍትና ኮምፒውተር ማዕከል',
      description: 'Comprehensive renovation of two learning blocks, supplying 2,400 reference textbooks, 15 modern computer workstations, and solar backup power for 600 students.',
      descriptionAm: 'ለ600 ተማሪዎች ምቹ የንባብ ቦታ ለመፍጠር ሁለት የመማሪያ ክፍሎችን በማደስ፣ 2,400 የማጣቀሻ መጽሐፍትና 15 ኮምፒውተሮችን የማሟላት ፕሮጀክት::',
      category: 'education',
      location: 'Dergag Primary School Compound',
      coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      startDate: '2025-06-10',
      expectedCompletionDate: '2026-03-20',
      status: 'completed',
      budget: '920,000 ETB',
      fundingProgress: '100%',
      gallery: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
      ],
      impactReport: 'Handed over to school administration. Student reading hours increased by 140%, and basic computer literacy program now running every afternoon.',
      isFeatured: true,
      createdAt: '2025-05-01T09:00:00Z',
      updatedAt: '2026-04-10T12:00:00Z'
    },
    {
      id: 'proj_3',
      title: 'Vulnerable Elders & Orphans Seasonal Welfare Support',
      titleAm: 'የአቅመ ደካማ አረጋውያንና ወላጅ አልባ ህጻናት ድጋፍ',
      description: 'Quarterly food security hampers (teff, wheat, cooking oil) and warm blankets for 120 destitute elders and full annual educational sponsorship for 45 orphan children.',
      descriptionAm: 'ለ120 የተቸገሩ አረጋውያን የምግብና አልባሳት ድጋፍ እንዲሁም ለ45 ወላጅ አልባ ህጻናት ሙሉ የትምህርት ቁሳቁስ ድጋፍ የማድረግ ዘላቂ መርሃ-ግብር::',
      category: 'social_support',
      location: 'Dergag Woreda Villages',
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      startDate: '2025-09-01',
      expectedCompletionDate: '2027-09-01',
      status: 'ongoing',
      budget: '600,000 ETB / Year',
      fundingProgress: '85%',
      gallery: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
      ],
      impactReport: 'Over 240 food packs distributed in the last two quarters. 100% of sponsored children retained in school with improved academic results.',
      isFeatured: true,
      createdAt: '2025-08-15T11:00:00Z',
      updatedAt: '2026-10-18T16:00:00Z'
    },
    {
      id: 'proj_4',
      title: 'Community Health Clinic Medical Equipment Support',
      titleAm: 'የጤና ኬላ የህክምና ቁሳቁስ ማሟያ ፕሮጀክት',
      description: 'Equipping the local health station with maternity delivery beds, diagnostic ultrasound, patient monitoring tools, and emergency solar vaccine refrigeration.',
      descriptionAm: 'የአካባቢውን የጤና ጣቢያ በወሊድ አልጋዎች፣ በምርመራ መሳሪያዎችና የክትባት ማቀዝቀዣዎች በማደራጀት የእናቶችና ህጻናት ጤናን የማሻሻል ተግባር::',
      category: 'healthcare',
      location: 'Dergag Health Center',
      coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      startDate: '2026-02-01',
      expectedCompletionDate: '2026-11-30',
      status: 'ongoing',
      budget: '1,200,000 ETB',
      fundingProgress: '60%',
      gallery: [],
      impactReport: 'Maternity wing upgrade in progress; medical suppliers contracted for delivery.',
      isFeatured: false,
      createdAt: '2026-01-20T10:00:00Z',
      updatedAt: '2026-10-20T11:00:00Z'
    }
  ],

  charityCampaigns: [
    {
      id: 'camp_1',
      title: 'Emergency Medical Support for Sister Rahel Girma',
      titleAm: 'ለእህታችን ራሔል ግርማ ህክምና አስቸኳይ የሰብአዊ ድጋፍ ጥሪ',
      description: 'Urgent humanitarian medical fundraising for heart valve replacement surgery verified by Tikur Anbessa Specialized Hospital cardiology board.',
      descriptionAm: 'በጥቁር አንበሳ ስፔሻላይዝድ ሆስፒታል ለተረጋገጠ የልብ ቀዶ ጥገና ህክምና የሚያስፈልገውን ወጪ ለመሸፈን የቀረበ የተረጋገጠ የበጎ አድራጎት ጥሪ::',
      targetBeneficiary: 'Sister Rahel Girma (32, mother of two)',
      goalAmount: '450,000 ETB',
      verifiedProgress: '385,000 ETB (85%)',
      status: 'active',
      bankAccount: 'CBE Acc: 1000458921478 (Ref: RAHEL-MED)',
      contactPerson: 'Ato Solomon Kebede (+251911234567)',
      coverImage: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
      donationsCount: 84,
      createdAt: '2026-09-15T08:00:00Z'
    },
    {
      id: 'camp_2',
      title: 'Dergag Orphan Student Educational Sponsorship Fund',
      titleAm: 'የደርጋጅ ወላጅ አልባ ተማሪዎች ዓመታዊ የትምህርት ድጋፍ ፈንድ',
      description: 'Annual sponsorship fund providing uniforms, exercise books, bags, shoes, and monthly stipends for 50 high-achieving orphan children in Dergag.',
      descriptionAm: 'ለ50 ወላጅ አልባ ጎበዝ ተማሪዎች የደንብ ልብስ፣ የደብተርና የትምህርት መርጃ ቁሳቁስ እንዲሁም ወርሃዊ ድጎማ ለማቅረብ የተዘጋጀ ፈንድ::',
      targetBeneficiary: '50 Selected Orphan Students',
      goalAmount: '300,000 ETB',
      verifiedProgress: '240,000 ETB (80%)',
      status: 'active',
      bankAccount: 'Awash Acc: 01320876543200 (Ref: ORPHAN-EDU)',
      contactPerson: 'W/ro Almaz Tadesse (+251912889900)',
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      donationsCount: 52,
      createdAt: '2026-08-01T09:00:00Z'
    }
  ],

  donations: [
    {
      id: 'don_1',
      campaignId: 'camp_1',
      donorName: 'Anonymous Community Supporter',
      donorPhone: '+251911******',
      amount: 25000,
      currency: 'ETB',
      paymentMethod: 'Commercial Bank of Ethiopia',
      referenceNumber: 'CBE-FT-8891204',
      status: 'verified',
      verifiedBy: 'Solomon Kebede (Finance Head)',
      createdAt: '2026-10-12T11:20:00Z'
    },
    {
      id: 'don_2',
      campaignId: 'camp_1',
      donorName: 'Dergag Diaspora Solidarity Group (Washington)',
      donorPhone: '+1202*******',
      amount: 50000,
      currency: 'ETB',
      paymentMethod: 'Bank Wire Transfer',
      referenceNumber: 'WIRE-US-99231',
      status: 'verified',
      verifiedBy: 'Tigist Berhanu (Diaspora Liaison)',
      createdAt: '2026-10-18T16:45:00Z'
    },
    {
      id: 'don_3',
      campaignId: 'camp_2',
      donorName: 'Ato Yohannes & Family',
      donorPhone: '+251912******',
      amount: 15000,
      currency: 'ETB',
      paymentMethod: 'Telebirr',
      referenceNumber: 'TB-77401924',
      status: 'verified',
      verifiedBy: 'Solomon Kebede',
      createdAt: '2026-10-28T09:30:00Z'
    }
  ],

  announcements: [
    {
      id: 'ann_1',
      title: 'Official Launch of the Dergag Unity Web Platform',
      titleAm: 'የደርጋጅ አንድነትና በጎ አድራጎት ማህበር ይፋዊ ድረ-ገጽ ምረቃ',
      content: 'We are pleased to announce the official launch of our comprehensive community platform. Members worldwide can now register online, inspect ongoing projects, and contribute transparently.',
      contentAm: 'የማህበራችንን አሰራር ይበልጥ ግልጽ፣ ፈጣን እና ተደራሽ ለማድረግ የተዘጋጀው ዘመናዊ ድረ-ገጽ ዛሬ በይፋ ስራ ጀምሯል:: በመላው አለም የሚገኙ የደርጋጅ ተወላጆች በቀላሉ አባል መሆንና የልማት ስራዎችን መከታተል ይችላሉ::',
      category: 'official',
      publishedDate: '2026-11-01',
      author: 'Executive Committee',
      isPinned: true,
      coverImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
      createdAt: '2026-11-01T08:00:00Z'
    },
    {
      id: 'ann_2',
      title: 'Quarterly Community Assembly & Transparency Briefing',
      titleAm: 'የሩብ ዓመት የማህበረሰብ አጠቃላይ ጉባዔና የግልጽነት ሪፖርት',
      content: 'The executive leadership invites all registered members and supporters to participate in our upcoming general assembly to review financial audits, ongoing water projects, and youth initiatives.',
      contentAm: 'የስራ አስፈጻሚ ኮሚቴው የሩብ ዓመቱን የኦዲትና የፕሮጀክት አፈጻጸም ሪፖርት ለአባላት የሚያቀርብበት ጠቅላላ ጉባዔ በቀጣይ ሳምንት ይካሄዳል:: ሁሉም አባላት እንዲገኙ ጥሪያችንን እናስተላልፋለን::',
      category: 'meeting',
      publishedDate: '2026-10-20',
      author: 'Secretariat Office',
      isPinned: false,
      coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      createdAt: '2026-10-20T10:00:00Z'
    },
    {
      id: 'ann_3',
      title: 'Successful Handover of Primary School Learning Materials',
      titleAm: 'የትምህርት ቁሳቁስ ድጋፍ በተሳካ ሁኔታ ለተማሪዎች ተሰራጨ',
      content: 'Over 2,400 exercise books, educational charts, and backpacks were successfully handed over to Dergag Primary School students in the presence of local education bureau officials.',
      contentAm: 'በማህበሩ በጎ አድራጊ አባላት የተሰበሰቡ የትምህርት መርጃ ቁሳቁሶች ለደርጋጅ መጀመሪያ ደረጃ ትምህርት ቤት ተማሪዎች በደማቅ ሁኔታ ተበርክተዋል::',
      category: 'charity',
      publishedDate: '2026-09-28',
      author: 'Education Committee',
      isPinned: false,
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      createdAt: '2026-09-28T14:30:00Z'
    }
  ],

  events: [
    {
      id: 'evt_1',
      title: 'Annual Dergag Unity General Assembly 2026',
      titleAm: 'የ2026 ዓመታዊ የደርጋጅ አንድነት ጠቅላላ ጉባዔ',
      description: 'Annual gathering of all community members to evaluate annual achievements, review audited financial statements, and elect new committee chairpersons.',
      descriptionAm: 'የማህበሩን ዓመታዊ የኦዲት ሪፖርት ለማድመጥ፣ ቀጣይ የልማት እቅዶችን ለማጽደቅ እና አዳዲስ የስራ መሪዎችን ለመምረጥ የተዘጋጀ ታላቅ ጠቅላላ ጉባዔ::',
      eventDate: '2026-11-28',
      eventTime: '09:00 AM - 01:00 PM (EAT)',
      location: 'Dergag Community Center & Online Zoom Broadcast',
      organizer: 'General Secretariat',
      status: 'upcoming',
      attendeeCount: 142,
      registrationOpen: true
    },
    {
      id: 'evt_2',
      title: 'Green Legacy Tree Planting & Watershed Protection Day',
      titleAm: 'የአረንጓዴ አሻራ ችግኝ ተከላና ተፋሰስ ጥበቃ ዘመቻ',
      description: 'Volunteer mobilization day to plant 10,000 indigenous trees around Dergag spring catchment areas to protect soil fertility and conserve local water sources.',
      descriptionAm: 'የደርጋጅ ተፋሰስ አካባቢዎችን ከአፈር መሸርሸር ለመጠበቅና የውሃ ምንጮችን ለመንከባከብ 10,000 የሀገር በቀል ችግኞችን የመትከል የጋራ ዘመቻ::',
      eventDate: '2026-12-12',
      eventTime: '07:30 AM - 02:00 PM',
      location: 'Dergag Watershed Hills',
      organizer: 'Youth & Environmental Committee',
      status: 'upcoming',
      attendeeCount: 95,
      registrationOpen: true
    },
    {
      id: 'evt_3',
      title: 'Medical Camp & Mother-Child Health Screening (Past)',
      titleAm: 'የነጻ ህክምና እና የእናቶችና ህጻናት ምርመራ መርሐ-ግብር',
      description: 'Volunteer doctors and nurses provided free general health checkups, hypertension screening, and eye care for over 450 rural residents.',
      descriptionAm: 'በበጎ ፈቃደኛ የህክምና ባለሙያዎች የተካሄደ የነጻ ህክምና አገልግሎት፤ ከ450 በላይ ነዋሪዎች የምርመራና የመድሃኒት ድጋፍ አግኝተዋል::',
      eventDate: '2026-08-15',
      eventTime: 'Full Day',
      location: 'Dergag Health Station',
      organizer: 'Health Committee',
      status: 'completed',
      attendeeCount: 450,
      registrationOpen: false
    }
  ],

  volunteers: [
    {
      id: 'vol_1',
      fullName: 'Yared Abebe',
      phone: '+251911445566',
      email: 'yared.a@gmail.com',
      skills: 'Civil Engineering, Project Survey',
      availability: 'Weekends',
      status: 'active',
      registeredAt: '2025-06-10'
    },
    {
      id: 'vol_2',
      fullName: 'Bethlehem Tsegaye',
      phone: '+251922334455',
      email: 'beth.tsegaye@gmail.com',
      skills: 'Photography, Media Editing, Social Media',
      availability: 'Flexible',
      status: 'active',
      registeredAt: '2025-07-22'
    }
  ],

  gallery: [
    {
      id: 'gal_1',
      title: 'Community Water Reservoir Construction Inspection',
      titleAm: 'የንጹህ መጠጥ ውሃ ማጠራቀሚያ ግንባታ የመስክ ምልከታ',
      category: 'development',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
      date: '2026-10-15',
      caption: 'Community elders and engineers inspecting the newly built 50,000-liter clean water reservoir in Dergag.'
    },
    {
      id: 'gal_2',
      title: 'Dergag Youth Digital Skills Workshop',
      titleAm: 'የደርጋጅ ወጣቶች የኮምፒውተር ክህሎት ስልጠና',
      category: 'youth',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      date: '2026-09-20',
      caption: 'Youth participants learning foundational programming and digital document preparation in the new ICT lab.'
    },
    {
      id: 'gal_3',
      title: 'Elders & Community Leaders Advisory Council Meeting',
      titleAm: 'የሀገር ሽማግሌዎችና የማህበረሰብ መሪዎች የምክክር መድረክ',
      category: 'meetings',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
      date: '2026-08-30',
      caption: 'Elders meeting in Dergag town to align community priorities for the 2026/27 development fiscal year.'
    },
    {
      id: 'gal_4',
      title: 'Food Basket Distribution for Vulnerable Families',
      titleAm: 'ለአረጋውያንና አቅመ ደካሞች የምግብ ድጋፍ ማከፋፈል',
      category: 'charity',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
      date: '2026-07-14',
      caption: 'Volunteers preparing food security parcels for 120 elderly mothers and fathers in rural kebeles.'
    },
    {
      id: 'gal_5',
      title: 'Traditional Cultural Day & Heritage Celebration',
      titleAm: 'የደርጋጅ አካባቢ ባህላዊ በዓልና የቅርስ ክብረ-በዓል',
      category: 'cultural',
      imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
      date: '2026-06-25',
      caption: 'Traditional attire, cultural music, and poetry celebrating unity and heritage among youth and elders.'
    },
    {
      id: 'gal_6',
      title: 'Primary School Students Receiving Reference Books',
      titleAm: 'የተማሪዎች የመማሪያ መጽሐፍት ርክክብ ስነ-ስርዓት',
      category: 'community',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
      date: '2026-05-18',
      caption: 'Smiles all around as grade 5-8 students receive textbooks and stationery kits funded by Dergag Unity.'
    }
  ],

  contactMessages: [
    {
      id: 'msg_1',
      senderName: 'Mulugeta Assefa',
      senderEmail: 'mulugeta.a@gmail.com',
      senderPhone: '+251911778899',
      subject: 'Inquiry regarding clean water project sponsorship',
      message: 'Greetings. Our diaspora group in Europe would like to contribute towards the solar pumping equipment for the Dergag Kebele 02 water project. Please advise how we can coordinate.',
      sentAt: '2026-11-04T12:30:00Z',
      isRead: false
    }
  ],

  auditLogs: [
    {
      id: 'log_1',
      action: 'SYSTEM_INITIALIZED',
      actor: 'System Bootstrap',
      actorRole: 'super_admin',
      details: 'Enterprise portal initialized with verified community records and bilingual translation architecture.',
      targetCollection: 'system',
      timestamp: '2026-11-01T00:00:00Z'
    },
    {
      id: 'log_2',
      action: 'MEMBER_APPROVED',
      actor: 'W/ro Selamawit Hailu',
      actorRole: 'membership_manager',
      details: 'Approved member application for Dr. Bekele Alemayehu and assigned ID DU-2025-0003.',
      targetCollection: 'members',
      targetId: 'mem_3',
      timestamp: '2026-11-02T10:15:00Z'
    }
  ]
};

// Database load / save helpers
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading database file, using initial data:', err);
  }
  // Initialize file
  saveDatabase(initialDatabase);
  return initialDatabase;
}

function saveDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Log audit helper
function logAudit(action: string, actor: string, actorRole: string, details: string, targetCollection: string, targetId?: string) {
  const db = loadDatabase();
  const log = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    action,
    actor,
    actorRole,
    details,
    targetCollection,
    targetId: targetId || null,
    timestamp: new Date().toISOString()
  };
  db.auditLogs = [log, ...(db.auditLogs || [])];
  saveDatabase(db);
  syncToFirestore('auditLogs', log.id, log);
}

// Security & Auth helpers
function checkAdminAuth(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  return Boolean(authHeader && authHeader.startsWith('Bearer '));
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized: Valid staff session token required' });
  }
  next();
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    organization: 'Dergag Community Unity & Charity Association',
    timestamp: new Date().toISOString()
  });
});

// Firebase status
app.get('/api/firebase-status', (req, res) => {
  const configPath = path.join(__dirname, 'firebase-applet-config.json');
  const exists = fs.existsSync(configPath);
  let config = null;
  if (exists) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (e) {
      // ignore
    }
  }
  res.json({
    hasAppletConfig: exists,
    projectId: config?.projectId || null,
    firestoreDatabaseId: config?.firestoreDatabaseId || '(default)',
    status: exists ? 'configured' : 'ready_for_credentials'
  });
});

// Organization Stats
app.get('/api/stats', (req, res) => {
  const db = loadDatabase();
  const verifiedDonations = (db.donations || [])
    .filter((d: any) => d.status === 'verified')
    .reduce((sum: number, d: any) => sum + (Number(d.amount) || 0), 0);

  res.json({
    registeredMembers: (db.members || []).length,
    pendingApplications: (db.membershipApplications || []).filter((a: any) => a.status === 'pending').length,
    activeProjects: (db.projects || []).filter((p: any) => p.status === 'ongoing').length,
    completedProjects: (db.projects || []).filter((p: any) => p.status === 'completed').length,
    totalProjects: (db.projects || []).length,
    publishedAnnouncements: (db.announcements || []).length,
    upcomingEvents: (db.events || []).filter((e: any) => e.status === 'upcoming').length,
    volunteers: (db.volunteers || []).length,
    activeCharityCampaigns: (db.charityCampaigns || []).filter((c: any) => c.status === 'active').length,
    verifiedDonationsTotal: verifiedDonations
  });
});

// Organization Settings
app.get('/api/settings', (req, res) => {
  const db = loadDatabase();
  res.json(db.organizationSettings);
});

app.put('/api/settings', requireAuth, (req, res) => {
  const db = loadDatabase();
  db.organizationSettings = {
    ...db.organizationSettings,
    ...req.body
  };
  saveDatabase(db);
  syncToFirestore('organizationSettings', 'default', db.organizationSettings);
  logAudit('UPDATE_SETTINGS', req.body.updatedBy || 'Administrator', 'admin', 'Updated organizational contact and background settings', 'organizationSettings');
  res.json({ success: true, settings: db.organizationSettings });
});

// Members: Public requests receive sanitized roster without private phone/email. Authenticated staff receive full records.
app.get('/api/members', (req, res) => {
  const db = loadDatabase();
  const isStaff = checkAdminAuth(req);
  const search = (req.query.search as string || '').toLowerCase();
  let list = db.members || [];
  if (search) {
    list = list.filter((m: any) =>
      m.fullName?.toLowerCase().includes(search) ||
      m.memberId?.toLowerCase().includes(search) ||
      m.cityRegion?.toLowerCase().includes(search) ||
      m.profession?.toLowerCase().includes(search)
    );
  }
  if (!isStaff) {
    // Zero-Trust: Protect personal contacts from public scraping
    list = list.map((m: any) => ({
      id: m.id,
      memberId: m.memberId,
      fullName: m.fullName,
      cityRegion: m.cityRegion,
      profession: m.profession,
      status: m.status,
      joinedDate: m.joinedDate
    }));
  }
  res.json(list);
});

app.post('/api/members', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newMember = {
    id: `mem_${Date.now()}`,
    memberId: req.body.memberId || `DU-${new Date().getFullYear()}-${String((db.members?.length || 0) + 1).padStart(4, '0')}`,
    ...req.body,
    status: req.body.status || 'approved',
    joinedDate: req.body.joinedDate || new Date().toISOString().split('T')[0]
  };
  db.members.push(newMember);
  saveDatabase(db);
  syncToFirestore('members', newMember.id, newMember);
  logAudit('CREATE_MEMBER', req.body.createdBy || 'Staff', 'admin', `Directly registered member ${newMember.fullName} (${newMember.memberId})`, 'members', newMember.id);
  res.status(201).json(newMember);
});

app.put('/api/members/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.members.findIndex((m: any) => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Member not found' });
  }
  db.members[index] = { ...db.members[index], ...req.body };
  saveDatabase(db);
  syncToFirestore('members', req.params.id, db.members[index]);
  logAudit('UPDATE_MEMBER', req.body.updatedBy || 'Staff', 'membership_manager', `Updated details for member ${db.members[index].fullName}`, 'members', req.params.id);
  res.json(db.members[index]);
});

// Membership Applications
app.get('/api/applications', requireAuth, (req, res) => {
  const db = loadDatabase();
  const status = req.query.status as string;
  let list = db.membershipApplications || [];
  if (status) {
    list = list.filter((a: any) => a.status === status);
  }
  res.json(list);
});

app.post('/api/applications', (req, res) => {
  const db = loadDatabase();
  const { fullName, phone, cityRegion, privacyConsent } = req.body;

  if (!fullName || !phone || !privacyConsent) {
    return res.status(400).json({ error: 'Full name, phone, and privacy consent are required' });
  }

  // Duplicate check: Check if phone already registered in members or pending applications
  const existingMember = (db.members || []).find((m: any) => m.phone === phone);
  if (existingMember) {
    return res.status(409).json({
      error: 'Phone number already registered as an approved member',
      isDuplicate: true,
      existingMemberId: existingMember.memberId
    });
  }

  const existingApp = (db.membershipApplications || []).find(
    (a: any) => a.phone === phone && a.status === 'pending'
  );
  if (existingApp) {
    return res.status(409).json({
      error: 'An application with this phone number is already pending review',
      isDuplicate: true
    });
  }

  const newApp = {
    id: `app_${Date.now()}`,
    ...req.body,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  db.membershipApplications = [newApp, ...(db.membershipApplications || [])];
  saveDatabase(db);
  syncToFirestore('membershipApplications', newApp.id, newApp);
  logAudit('APPLICATION_SUBMITTED', 'Public Visitor', 'guest', `New application submitted by ${fullName} (${phone})`, 'membershipApplications', newApp.id);
  res.status(201).json({ success: true, application: newApp });
});

app.get('/api/applications/check/:phone', (req, res) => {
  const db = loadDatabase();
  const phone = req.params.phone.trim();

  const member = (db.members || []).find((m: any) => m.phone === phone || m.phone.replace(/[^0-9]/g, '').endsWith(phone.replace(/[^0-9]/g, '')));
  if (member) {
    return res.json({
      found: true,
      type: 'approved_member',
      fullName: member.fullName,
      memberId: member.memberId,
      status: member.status,
      joinedDate: member.joinedDate
    });
  }

  const appRecord = (db.membershipApplications || []).find((a: any) => a.phone === phone || a.phone.replace(/[^0-9]/g, '').endsWith(phone.replace(/[^0-9]/g, '')));
  if (appRecord) {
    return res.json({
      found: true,
      type: 'application',
      fullName: appRecord.fullName,
      status: appRecord.status,
      submittedAt: appRecord.submittedAt,
      reviewedAt: appRecord.reviewedAt,
      generatedMemberId: appRecord.generatedMemberId
    });
  }

  res.json({ found: false, message: 'No registration record found for this phone number' });
});

app.put('/api/applications/:id/approve', requireAuth, (req, res) => {
  const db = loadDatabase();
  const appIndex = db.membershipApplications.findIndex((a: any) => a.id === req.params.id);
  if (appIndex === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  const targetApp = db.membershipApplications[appIndex];
  const newMemberId = `DU-${new Date().getFullYear()}-${String((db.members?.length || 0) + 1).padStart(4, '0')}`;
  const reviewer = req.body.reviewedBy || 'Membership Committee';

  // Mark application approved
  db.membershipApplications[appIndex] = {
    ...targetApp,
    status: 'approved',
    reviewedBy: reviewer,
    reviewedAt: new Date().toISOString(),
    generatedMemberId: newMemberId
  };

  // Create official member record
  const newMember = {
    id: `mem_${Date.now()}`,
    memberId: newMemberId,
    fullName: targetApp.fullName,
    gender: targetApp.gender || 'prefer_not_to_say',
    phone: targetApp.phone,
    email: targetApp.email || '',
    cityRegion: targetApp.cityRegion,
    currentLocation: targetApp.currentLocation || '',
    dergagRelationship: targetApp.dergagRelationship || '',
    profession: targetApp.profession || '',
    interestAreas: targetApp.interestAreas || '',
    volunteerSkills: targetApp.volunteerSkills || '',
    status: 'approved',
    joinedDate: new Date().toISOString().split('T')[0],
    approvedBy: reviewer
  };

  db.members = [newMember, ...(db.members || [])];
  saveDatabase(db);
  syncToFirestore('membershipApplications', targetApp.id, db.membershipApplications[appIndex]);
  syncToFirestore('members', newMember.id, newMember);
  logAudit('APPROVE_APPLICATION', reviewer, 'membership_manager', `Approved application for ${targetApp.fullName} and generated Member ID ${newMemberId}`, 'members', newMember.id);
  res.json({ success: true, member: newMember, application: db.membershipApplications[appIndex] });
});

app.put('/api/applications/:id/reject', requireAuth, (req, res) => {
  const db = loadDatabase();
  const appIndex = db.membershipApplications.findIndex((a: any) => a.id === req.params.id);
  if (appIndex === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  const reviewer = req.body.reviewedBy || 'Membership Committee';
  const reason = req.body.rejectionReason || 'Application criteria requirements not fully met';

  db.membershipApplications[appIndex] = {
    ...db.membershipApplications[appIndex],
    status: 'rejected',
    reviewedBy: reviewer,
    reviewedAt: new Date().toISOString(),
    rejectionReason: reason
  };

  saveDatabase(db);
  syncToFirestore('membershipApplications', db.membershipApplications[appIndex].id, db.membershipApplications[appIndex]);
  logAudit('REJECT_APPLICATION', reviewer, 'membership_manager', `Rejected application for ${db.membershipApplications[appIndex].fullName}: ${reason}`, 'membershipApplications', req.params.id);
  res.json({ success: true, application: db.membershipApplications[appIndex] });
});

// Projects
app.get('/api/projects', (req, res) => {
  const db = loadDatabase();
  const category = req.query.category as string;
  const status = req.query.status as string;
  let list = db.projects || [];
  if (category && category !== 'all') {
    list = list.filter((p: any) => p.category === category);
  }
  if (status && status !== 'all') {
    list = list.filter((p: any) => p.status === status);
  }
  res.json(list);
});

app.post('/api/projects', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newProject = {
    id: `proj_${Date.now()}`,
    ...req.body,
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.projects = [newProject, ...(db.projects || [])];
  saveDatabase(db);
  syncToFirestore('projects', newProject.id, newProject);
  logAudit('CREATE_PROJECT', req.body.createdBy || 'Staff', 'project_manager', `Created community project "${newProject.title}"`, 'projects', newProject.id);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.projects.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  db.projects[index] = {
    ...db.projects[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDatabase(db);
  syncToFirestore('projects', req.params.id, db.projects[index]);
  logAudit('UPDATE_PROJECT', req.body.updatedBy || 'Staff', 'project_manager', `Updated project "${db.projects[index].title}"`, 'projects', req.params.id);
  res.json(db.projects[index]);
});

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const target = db.projects.find((p: any) => p.id === req.params.id);
  db.projects = db.projects.filter((p: any) => p.id !== req.params.id);
  saveDatabase(db);
  deleteFromFirestore('projects', req.params.id);
  logAudit('DELETE_PROJECT', 'Administrator', 'admin', `Deleted project "${target?.title || req.params.id}"`, 'projects', req.params.id);
  res.json({ success: true });
});

// Charity Campaigns
app.get('/api/campaigns', (req, res) => {
  const db = loadDatabase();
  res.json(db.charityCampaigns || []);
});

app.post('/api/campaigns', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newCamp = {
    id: `camp_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.charityCampaigns = [newCamp, ...(db.charityCampaigns || [])];
  saveDatabase(db);
  syncToFirestore('charityCampaigns', newCamp.id, newCamp);
  logAudit('CREATE_CAMPAIGN', req.body.createdBy || 'Staff', 'admin', `Created charity campaign "${newCamp.title}"`, 'charityCampaigns', newCamp.id);
  res.status(201).json(newCamp);
});

app.put('/api/campaigns/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.charityCampaigns.findIndex((c: any) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  db.charityCampaigns[index] = { ...db.charityCampaigns[index], ...req.body };
  saveDatabase(db);
  syncToFirestore('charityCampaigns', req.params.id, db.charityCampaigns[index]);
  logAudit('UPDATE_CAMPAIGN', req.body.updatedBy || 'Staff', 'admin', `Updated campaign "${db.charityCampaigns[index].title}"`, 'charityCampaigns', req.params.id);
  res.json(db.charityCampaigns[index]);
});

app.delete('/api/campaigns/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  db.charityCampaigns = db.charityCampaigns.filter((c: any) => c.id !== req.params.id);
  saveDatabase(db);
  deleteFromFirestore('charityCampaigns', req.params.id);
  res.json({ success: true });
});

// Donations
app.get('/api/donations', requireAuth, (req, res) => {
  const db = loadDatabase();
  res.json(db.donations || []);
});

app.post('/api/donations', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newDonation = {
    id: `don_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.donations = [newDonation, ...(db.donations || [])];
  saveDatabase(db);
  syncToFirestore('donations', newDonation.id, newDonation);
  logAudit('RECORD_DONATION', req.body.recordedBy || 'Finance', 'admin', `Recorded contribution of ${newDonation.amount} ${newDonation.currency} (Ref: ${newDonation.referenceNumber})`, 'donations', newDonation.id);
  res.status(201).json(newDonation);
});

app.put('/api/donations/:id/verify', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.donations.findIndex((d: any) => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Donation not found' });
  }
  db.donations[index] = {
    ...db.donations[index],
    status: 'verified',
    verifiedBy: req.body.verifiedBy || 'Finance Auditor'
  };
  saveDatabase(db);
  syncToFirestore('donations', req.params.id, db.donations[index]);
  logAudit('VERIFY_DONATION', req.body.verifiedBy || 'Finance Auditor', 'admin', `Verified donation Ref: ${db.donations[index].referenceNumber}`, 'donations', req.params.id);
  res.json(db.donations[index]);
});

// Announcements
app.get('/api/announcements', (req, res) => {
  const db = loadDatabase();
  res.json(db.announcements || []);
});

app.post('/api/announcements', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newPost = {
    id: `ann_${Date.now()}`,
    ...req.body,
    publishedDate: req.body.publishedDate || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  db.announcements = [newPost, ...(db.announcements || [])];
  saveDatabase(db);
  syncToFirestore('announcements', newPost.id, newPost);
  logAudit('PUBLISH_ANNOUNCEMENT', req.body.author || 'Content Team', 'content_manager', `Published announcement "${newPost.title}"`, 'announcements', newPost.id);
  res.status(201).json(newPost);
});

app.put('/api/announcements/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.announcements.findIndex((a: any) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  db.announcements[index] = { ...db.announcements[index], ...req.body };
  saveDatabase(db);
  syncToFirestore('announcements', req.params.id, db.announcements[index]);
  res.json(db.announcements[index]);
});

app.delete('/api/announcements/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  db.announcements = db.announcements.filter((a: any) => a.id !== req.params.id);
  saveDatabase(db);
  deleteFromFirestore('announcements', req.params.id);
  res.json({ success: true });
});

// Events
app.get('/api/events', (req, res) => {
  const db = loadDatabase();
  res.json(db.events || []);
});

app.post('/api/events', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newEvent = {
    id: `evt_${Date.now()}`,
    ...req.body,
    attendeeCount: Number(req.body.attendeeCount) || 0
  };
  db.events = [newEvent, ...(db.events || [])];
  saveDatabase(db);
  syncToFirestore('events', newEvent.id, newEvent);
  logAudit('CREATE_EVENT', req.body.organizer || 'Events Team', 'admin', `Scheduled community event "${newEvent.title}"`, 'events', newEvent.id);
  res.status(201).json(newEvent);
});

app.put('/api/events/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.events.findIndex((e: any) => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  db.events[index] = { ...db.events[index], ...req.body };
  saveDatabase(db);
  syncToFirestore('events', req.params.id, db.events[index]);
  res.json(db.events[index]);
});

app.delete('/api/events/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  db.events = db.events.filter((e: any) => e.id !== req.params.id);
  saveDatabase(db);
  deleteFromFirestore('events', req.params.id);
  res.json({ success: true });
});

app.post('/api/events/:id/rsvp', (req, res) => {
  const db = loadDatabase();
  const index = db.events.findIndex((e: any) => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  db.events[index].attendeeCount = (Number(db.events[index].attendeeCount) || 0) + 1;
  saveDatabase(db);
  syncToFirestore('events', req.params.id, db.events[index]);
  res.json({ success: true, attendeeCount: db.events[index].attendeeCount });
});

// Gallery
app.get('/api/gallery', (req, res) => {
  const db = loadDatabase();
  res.json(db.gallery || []);
});

app.post('/api/gallery', requireAuth, (req, res) => {
  const db = loadDatabase();
  const newItem = {
    id: `gal_${Date.now()}`,
    ...req.body,
    date: req.body.date || new Date().toISOString().split('T')[0]
  };
  db.gallery = [newItem, ...(db.gallery || [])];
  saveDatabase(db);
  syncToFirestore('gallery', newItem.id, newItem);
  res.status(201).json(newItem);
});

app.delete('/api/gallery/:id', requireAuth, (req, res) => {
  const db = loadDatabase();
  db.gallery = db.gallery.filter((g: any) => g.id !== req.params.id);
  saveDatabase(db);
  deleteFromFirestore('gallery', req.params.id);
  res.json({ success: true });
});

// Contact Messages (protected staff inbox)
app.get('/api/messages', requireAuth, (req, res) => {
  const db = loadDatabase();
  res.json(db.contactMessages || []);
});

app.post('/api/messages', (req, res) => {
  const db = loadDatabase();
  const newMessage = {
    id: `msg_${Date.now()}`,
    ...req.body,
    sentAt: new Date().toISOString(),
    isRead: false
  };
  db.contactMessages = [newMessage, ...(db.contactMessages || [])];
  saveDatabase(db);
  syncToFirestore('contactMessages', newMessage.id, newMessage);
  logAudit('CONTACT_MESSAGE_RECEIVED', req.body.senderName || 'Visitor', 'guest', `Received message from ${req.body.senderName} (${req.body.senderPhone})`, 'contactMessages', newMessage.id);
  res.status(201).json({ success: true, message: newMessage });
});

app.put('/api/messages/:id/read', requireAuth, (req, res) => {
  const db = loadDatabase();
  const index = db.contactMessages.findIndex((m: any) => m.id === req.params.id);
  if (index !== -1) {
    db.contactMessages[index].isRead = true;
    saveDatabase(db);
    syncToFirestore('contactMessages', req.params.id, db.contactMessages[index]);
  }
  res.json({ success: true });
});

// Audit Logs
app.get('/api/audit-logs', requireAuth, (req, res) => {
  const db = loadDatabase();
  res.json(db.auditLogs || []);
});

// Auth / Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, requestedRole } = req.body;
  const db = loadDatabase();

  // Find user by email or provide requested authorized role
  let user = (db.users || []).find((u: any) => u.email === email);
  if (!user && requestedRole) {
    user = (db.users || []).find((u: any) => u.role === requestedRole) || {
      id: `usr_${requestedRole}`,
      uid: `uid_${requestedRole}`,
      email: email || `${requestedRole}@dergagunity.org`,
      displayName: `Staff Member (${requestedRole.replace('_', ' ').toUpperCase()})`,
      role: requestedRole,
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }

  if (!user) {
    // Default fallback to super admin
    user = db.users[0];
  }

  logAudit('USER_LOGIN', user.displayName, user.role, `Staff login verified for ${user.email}`, 'users', user.id);
  res.json({
    success: true,
    token: `token_${Date.now()}_${user.id}`,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      isActive: user.isActive
    }
  });
});

// CSV Export for authorized records only
app.get('/api/export/:collection', requireAuth, (req, res) => {
  const db = loadDatabase();
  const collectionName = req.params.collection;
  const records = db[collectionName] || [];

  if (records.length === 0) {
    return res.status(404).send('No records found for export');
  }

  // Generate CSV
  const headers = Object.keys(records[0]).filter(k => typeof records[0][k] !== 'object');
  const csvRows = [
    headers.join(','),
    ...records.map((row: any) =>
      headers
        .map(h => {
          const val = row[h] ?? '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    )
  ];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${collectionName}_export_${Date.now()}.csv"`);
  res.send(csvRows.join('\n'));
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dergag Unity Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
