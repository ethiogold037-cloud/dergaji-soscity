import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

async function seed() {
  const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
  const databaseData = JSON.parse(fs.readFileSync('./data/database.json', 'utf-8'));

  console.log('Connecting to Firestore:', config.projectId, 'db:', config.firestoreDatabaseId);
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);

  // Helper to safely write
  const safeSet = async (col, id, data) => {
    try {
      await setDoc(doc(db, col, id), data);
      console.log(`  ✓ [${col}] ${id}`);
    } catch (e) {
      console.error(`  ✗ [${col}] ${id} error:`, e.message);
    }
  };

  // 1. Settings
  if (databaseData.organizationSettings) {
    console.log('\n--- Seeding organizationSettings ---');
    await safeSet('organizationSettings', 'default', databaseData.organizationSettings);
  }

  // 2. Projects
  if (databaseData.projects) {
    console.log('\n--- Seeding projects ---');
    for (const p of databaseData.projects) {
      await safeSet('projects', p.id, p);
    }
  }

  // 3. Announcements
  if (databaseData.announcements) {
    console.log('\n--- Seeding announcements ---');
    for (const a of databaseData.announcements) {
      await safeSet('announcements', a.id, a);
    }
  }

  // 4. Events
  if (databaseData.events) {
    console.log('\n--- Seeding events ---');
    for (const e of databaseData.events) {
      await safeSet('events', e.id, e);
    }
  }

  // 5. Campaigns
  if (databaseData.charityCampaigns) {
    console.log('\n--- Seeding charityCampaigns ---');
    for (const c of databaseData.charityCampaigns) {
      await safeSet('charityCampaigns', c.id, c);
    }
  }

  // 6. Members
  if (databaseData.members) {
    console.log('\n--- Seeding members ---');
    for (const m of databaseData.members) {
      await safeSet('members', m.id, m);
    }
  }

  // 7. Users
  if (databaseData.users) {
    console.log('\n--- Seeding users ---');
    for (const u of databaseData.users) {
      await safeSet('users', u.id, u);
    }
  }

  // 8. Contact Messages
  if (databaseData.contactMessages) {
    console.log('\n--- Seeding contactMessages ---');
    for (const msg of databaseData.contactMessages) {
      await safeSet('contactMessages', msg.id, msg);
    }
  }

    // 9. Applications
    if (databaseData.membershipApplications) {
      console.log('\n--- Seeding membershipApplications ---');
      for (const appItem of databaseData.membershipApplications) {
        await safeSet('membershipApplications', appItem.id, appItem);
      }
    }

    // 10. Donations
    if (databaseData.donations) {
      console.log('\n--- Seeding donations ---');
      for (const d of databaseData.donations) {
        await safeSet('donations', d.id, d);
      }
    }

    // 11. Gallery
    if (databaseData.gallery) {
      console.log('\n--- Seeding gallery ---');
      for (const g of databaseData.gallery) {
        await safeSet('gallery', g.id, g);
      }
    }

    // 12. Audit Logs
    if (databaseData.auditLogs) {
      console.log('\n--- Seeding auditLogs ---');
      for (const log of databaseData.auditLogs) {
        await safeSet('auditLogs', log.id, log);
      }
    }

    console.log('\n🎉 ALL COLLECTIONS PROCESSED AND SEEDED IN CLOUD FIRESTORE!');
    process.exit(0);
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
