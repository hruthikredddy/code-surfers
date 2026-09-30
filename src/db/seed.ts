import { db } from './index.ts';
import {
  organizations,
  users,
  standards,
  laboratories,
  complianceProjects,
  complianceMilestones,
  complianceFindings,
  huidVerifications,
  auditLogs
} from './schema.ts';
import { INDIAN_STANDARDS } from '../data/standards.ts';
import { BIS_RECOGNIZED_LABS } from '../data/testingIntelligenceData.ts';
import { CERTIFICATION_ROADMAP } from '../data/complianceCopilotData.ts';

export async function runDatabaseSeed() {
  console.log('Starting BIS Sahayak database seeding...');

  try {
    // 1. Seed Default Organization
    const [defaultOrg] = await db
      .insert(organizations)
      .values({
        name: 'Bharat Manufacturing & Engineering Enterprises',
        scale: 'MICRO_STARTUP',
        address: 'Sector 62, Electronic City, Noida',
        state: 'Uttar Pradesh',
        district: 'Gautam Buddha Nagar'
      })
      .onConflictDoNothing()
      .returning();

    const orgId = defaultOrg?.id || 1;

    // 2. Seed Default Demo/Officer User
    const [defaultUser] = await db
      .insert(users)
      .values({
        uid: 'demo-officer-uid',
        email: 'officer@bharat-mfg.gov.in',
        name: 'Rajesh Kumar (Compliance Head)',
        role: 'COMPLIANCE_OFFICER',
        organizationId: orgId
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: { name: 'Rajesh Kumar (Compliance Head)', role: 'COMPLIANCE_OFFICER' }
      })
      .returning();

    const userId = defaultUser?.id || 1;

    // 3. Seed Authoritative Standards (Upsert)
    console.log(`Seeding ${INDIAN_STANDARDS.length} authoritative Indian Standards...`);
    for (const std of INDIAN_STANDARDS) {
      const isNumParts = std.is_number.split(':');
      const stdCode = isNumParts[0].trim();
      const versionYear = isNumParts[1] ? isNumParts[1].trim() : '2022';

      await db
        .insert(standards)
        .values({
          isNumber: std.is_number,
          standardCode: stdCode,
          title: std.title,
          category: std.category,
          icsCode: std.ics_code,
          icsChapter: std.ics_chapter,
          scheme: std.scheme,
          schemeCode: std.scheme_code,
          mandatory: std.mandatory,
          qcoReference: std.qco_reference,
          qcoDate: '2023-08-10',
          scopeSummary: std.scope_summary,
          testingDiscipline: std.testing_lab_discipline,
          sourceUrl: std.source_url,
          version: versionYear,
          status: 'ACTIVE',
          keywords: std.keywords || [],
          commonProducts: std.common_products || [],
          keyClauses: (std.key_clauses || []).map((c) => ({
            clause: c.clause,
            title: c.title,
            description: c.description
          }))
        })
        .onConflictDoUpdate({
          target: standards.isNumber,
          set: {
            title: std.title,
            mandatory: std.mandatory,
            qcoReference: std.qco_reference,
            scopeSummary: std.scope_summary,
            testingDiscipline: std.testing_lab_discipline,
            keywords: std.keywords || [],
            commonProducts: std.common_products || [],
            keyClauses: (std.key_clauses || []).map((c) => ({
              clause: c.clause,
              title: c.title,
              description: c.description
            }))
          }
        });
    }

    // 4. Seed BIS Recognized Laboratories
    console.log(`Seeding ${BIS_RECOGNIZED_LABS.length} recognized laboratories...`);
    for (const lab of BIS_RECOGNIZED_LABS) {
      await db
        .insert(laboratories)
        .values({
          labCode: lab.id,
          name: lab.name,
          type: lab.type,
          address: lab.contact_info?.address || lab.location,
          city: lab.city,
          state: lab.state,
          contactPerson: 'Director / Lab In-Charge',
          email: lab.contact_info?.email || 'lab@bis.gov.in',
          phone: lab.contact_info?.phone || '+91-11-23230131',
          disciplines: [lab.type, 'Mechanical & Chemical Testing'],
          supportedStandards: lab.supported_standards || [],
          nablAccreditation: lab.accreditation || 'NABL Accredited ISO/IEC 17025',
          validUntil: '2027-12-31',
          isActive: true
        })
        .onConflictDoUpdate({
          target: laboratories.labCode,
          set: {
            name: lab.name,
            address: lab.contact_info?.address || lab.location,
            city: lab.city,
            state: lab.state,
            supportedStandards: lab.supported_standards || []
          }
        });
    }

    // 5. Seed Real Initial Compliance Projects
    console.log('Seeding initial compliance projects & roadmap milestones...');
    const [project1] = await db
      .insert(complianceProjects)
      .values({
        organizationId: orgId,
        createdByUserId: userId,
        title: 'Stainless Steel Water Bottle QCO Certification',
        productName: 'Stainless Steel Water Bottles (Non-Insulated)',
        standardId: 'IS 17803:2022',
        schemeCode: 'Scheme-I',
        certificationRoute: 'SIMPLIFIED',
        status: 'ACTIVE',
        currentStage: 3,
        targetGrantDate: '2026-12-15',
        estimatedFee: 68500,
        complianceScore: 68
      })
      .returning();

    if (project1) {
      // Seed roadmap milestones for project1
      for (const m of CERTIFICATION_ROADMAP) {
        const isDone = m.phaseId <= 2 || (m.phaseId === 3 && m.id === 'milestone-5');
        await db.insert(complianceMilestones).values({
          projectId: project1.id,
          phaseNumber: m.phaseId,
          milestoneKey: m.id,
          title: m.title,
          description: m.description,
          isCompleted: isDone,
          completedAt: isDone ? new Date() : null,
          completedBy: isDone ? userId : null,
          notes: isDone ? 'Verified and approved by in-house QA' : null
        });
      }

      // Seed compliance findings for project1
      await db.insert(complianceFindings).values([
        {
          projectId: project1.id,
          standardClause: 'Clause 6.2 (Drop Impact Test)',
          severity: 'MAJOR',
          category: 'TESTING',
          title: 'Base seam crack under 1.2m drop test at 4°C chilled fill',
          description: 'Observed hairline leakage at bottom circumferential laser weld during low-temperature impact test in pre-audit evaluation.',
          correctiveAction: 'Modified welding feed wire and increased laser shielding gas flow rate to eliminate micro-porosity.',
          status: 'IN_PROGRESS'
        },
        {
          projectId: project1.id,
          standardClause: 'Clause 8 (In-house Lab STI Calibration)',
          severity: 'MINOR',
          category: 'CALIBRATION',
          title: 'Digital Vernier Caliper annual NABL calibration certificate overdue',
          description: 'Calibration certificate expired on 15 August 2026 for workshop dimensional gauge #V-04.',
          correctiveAction: 'Dispatched tool to authorized NABL calibration laboratory; temporary backup gauge calibrated in-service.',
          status: 'RESOLVED'
        }
      ]);
    }

    // 6. Seed HUID Verifications
    console.log('Seeding HUID verification database...');
    await db.insert(huidVerifications).values([
      {
        huid: 'ABC123',
        jewellerName: 'Tanishq Jewellers (Titan Co. Ltd)',
        articleType: 'Gold Ring',
        purityGrade: '22K916 (91.6% Pure Gold)',
        ahcCenterName: 'Apex Assay & Hallmarking Centre, Delhi',
        hallmarkingDate: '2026-08-14',
        status: 'VERIFIED',
        querySource: 'WEB_UI'
      },
      {
        huid: 'XYZ789',
        jewellerName: 'Malabar Gold & Diamonds',
        articleType: 'Gold Chain (Necklace)',
        purityGrade: '18K750 (75.0% Gold)',
        ahcCenterName: 'Kerala Gold Testing & Assaying Lab, Kozhikode',
        hallmarkingDate: '2026-09-02',
        status: 'VERIFIED',
        querySource: 'WEB_UI'
      }
    ]);

    // 7. Seed Real Audit Logs
    console.log('Seeding initial audit logs...');
    await db.insert(auditLogs).values([
      {
        organizationId: orgId,
        userId: userId,
        action: 'PROJECT_CREATED',
        resourceType: 'PROJECT',
        resourceId: String(project1?.id || 1),
        details: { title: 'Stainless Steel Water Bottle QCO Certification', standard: 'IS 17803:2022' }
      },
      {
        organizationId: orgId,
        userId: userId,
        action: 'MILESTONE_COMPLETED',
        resourceType: 'MILESTONE',
        resourceId: 'm-2-1',
        details: { phase: 2, title: 'In-house Testing Laboratory Commissioning' }
      },
      {
        organizationId: orgId,
        userId: userId,
        action: 'STANDARD_SEARCHED',
        resourceType: 'STANDARD',
        resourceId: 'IS 17803:2022',
        details: { query: 'stainless steel water bottle', resultsFound: 5 }
      }
    ]);

    console.log('BIS Sahayak database seed completed successfully!');
  } catch (error) {
    console.error('Error during database seed:', error);
    throw error;
  }
}

// Direct execution when run via `tsx src/db/seed.ts`
if (process.argv[1]?.endsWith('seed.ts')) {
  runDatabaseSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
