import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed only SUPER_ADMIN role (manual check since name is not unique)
  const existingRole = await prisma.role.findFirst({
    where: { name: 'SUPER_ADMIN' },
  });

  if (!existingRole) {
    await prisma.role.create({
      data: { name: 'SUPER_ADMIN' },
    });
    console.log('✅ Seeded role: SUPER_ADMIN');
  } else {
    console.log('ℹ️ SUPER_ADMIN role already exists, skipping insert');
  }

  // Seed Feature list
  const features = [
    { code: 'ADD_PRODUCT', module: 'Product Catalogue' },
    { code: 'EDIT_PRODUCT', module: 'Product Catalogue' },
    { code: 'DELETE_PRODUCT', module: 'Product Catalogue' },
    { code: 'VIEW_PRODUCTS', module: 'Product Catalogue' },
    { code: 'MANAGE_VARIANTS', module: 'Product Catalogue' },
    { code: 'ADD_WARRANTY_POLICY', module: 'Warranty Management' },
    { code: 'VIEW_WARRANTY_POLICIES', module: 'Warranty Management' },
    { code: 'EDIT_WARRANTY_POLICY', module: 'Warranty Management' },
    { code: 'ADD_AMC_PLAN', module: 'AMC Management' },
    { code: 'VIEW_AMC_PLANS', module: 'AMC Management' },
    { code: 'RAISE_COMPLAINT', module: 'Complaint Management' },
    { code: 'ASSIGN_COMPLAINT', module: 'Complaint Management' },
    { code: 'VIEW_COMPLAINTS', module: 'Complaint Management' },
    { code: 'UPDATE_JOB_STATUS', module: 'Job Tracking' },
    { code: 'VIEW_JOB_LOGS', module: 'Job Tracking' },
    { code: 'TRANSFER_OWNERSHIP', module: 'Ownership Management' },
    { code: 'CREATE_SCRAP_REQUEST', module: 'Scrap Management' },
    { code: 'APPROVE_SCRAP', module: 'Scrap Management' },
    { code: 'REDEEM_REFERRAL', module: 'Referral & Rewards' },
    { code: 'VIEW_REWARDS', module: 'Referral & Rewards' },
    { code: 'ADD_USER', module: 'User Management' },
    { code: 'ASSIGN_ROLE', module: 'User Management' },
    { code: 'VIEW_USERS', module: 'User Management' },
    { code: 'MANAGE_PERMISSIONS', module: 'User Management' },
  ];

  for (const feature of features) {
    // assumes feature.code is still unique
    await prisma.feature.upsert({
      where: { code: feature.code },
      update: {},
      create: feature,
    });
  }

  console.log('✅ Seeded all features successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
