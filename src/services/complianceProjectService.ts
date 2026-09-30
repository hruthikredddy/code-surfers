import { db, isDbConfigured } from '../db/index.ts';
import {
  complianceProjects,
  complianceMilestones,
  complianceFindings,
  documents,
  auditLogs,
  standards
} from '../db/schema.ts';
import { eq, desc, and } from 'drizzle-orm';
import { CERTIFICATION_ROADMAP } from '../data/complianceCopilotData.ts';

// In-memory fallback state when database is not enabled
let inMemoryProject: any = {
  id: 1,
  organizationId: 1,
  createdByUserId: 1,
  title: 'Factory BIS Certification Project',
  productName: 'Stainless Steel Water Bottles (Non-Insulated)',
  standardId: 'IS 17803:2022',
  schemeCode: 'Scheme-I',
  certificationRoute: 'SIMPLIFIED',
  status: 'ACTIVE',
  currentStage: 3,
  complianceScore: 50,
  targetGrantDate: '2026-11-30',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

let inMemoryMilestones: any[] = CERTIFICATION_ROADMAP.map((m, idx) => ({
  id: idx + 1,
  projectId: 1,
  phaseNumber: m.phaseId,
  milestoneKey: m.id,
  title: m.title,
  description: m.description,
  isCompleted: m.phaseId <= 3,
  completedAt: m.phaseId <= 3 ? new Date().toISOString() : null,
  completedBy: m.phaseId <= 3 ? 1 : null,
  notes: m.phaseId <= 3 ? 'Completed and verified.' : ''
}));

let inMemoryFindings: any[] = [
  {
    id: 1,
    projectId: 1,
    standardClause: 'Clause 7.3',
    severity: 'MAJOR',
    category: 'TESTING',
    title: 'Missing Overall Migration Test (IS 9845) for Silicone Gasket',
    description: 'Statutory omission: Test report NTL/2026/MECH-SS-9042 omits food simulant migration test.',
    correctiveAction: 'Obtain supplementary NABL test report for silicone closure gasket.',
    status: 'OPEN',
    createdAt: new Date().toISOString()
  }
];

let inMemoryDocs: any[] = [];

export class ComplianceProjectService {
  /**
   * Get or create active default project for user
   */
  static async getActiveProject(userId?: number | null) {
    if (!isDbConfigured) {
      return {
        project: inMemoryProject,
        milestones: inMemoryMilestones,
        findings: inMemoryFindings,
        documents: inMemoryDocs
      };
    }

    try {
      const existing = await db
        .select()
        .from(complianceProjects)
        .where(eq(complianceProjects.status, 'ACTIVE'))
        .orderBy(desc(complianceProjects.updatedAt))
        .limit(1);

      if (existing.length > 0) {
        const project = existing[0];
        const milestones = await db
          .select()
          .from(complianceMilestones)
          .where(eq(complianceMilestones.projectId, project.id))
          .orderBy(complianceMilestones.phaseNumber);

        const findings = await db
          .select()
          .from(complianceFindings)
          .where(eq(complianceFindings.projectId, project.id))
          .orderBy(desc(complianceFindings.createdAt));

        const projectDocs = await db
          .select()
          .from(documents)
          .where(eq(documents.projectId, project.id))
          .orderBy(desc(documents.createdAt));

        return {
          project,
          milestones,
          findings,
          documents: projectDocs
        };
      }

      // Create a new project if none exists
      const [newProject] = await db
        .insert(complianceProjects)
        .values({
          organizationId: 1,
          createdByUserId: userId || 1,
          title: 'Factory BIS Certification Project',
          productName: 'Stainless Steel Water Bottles (Non-Insulated)',
          standardId: 'IS 17803:2022',
          schemeCode: 'Scheme-I',
          certificationRoute: 'SIMPLIFIED',
          status: 'ACTIVE',
          currentStage: 1,
          complianceScore: 50
        })
        .returning();

      // Populate default 6-phase milestones
      for (const m of CERTIFICATION_ROADMAP) {
        await db.insert(complianceMilestones).values({
          projectId: newProject.id,
          phaseNumber: m.phaseId,
          milestoneKey: m.id,
          title: m.title,
          description: m.description,
          isCompleted: false
        });
      }

      const milestones = await db
        .select()
        .from(complianceMilestones)
        .where(eq(complianceMilestones.projectId, newProject.id));

      return {
        project: newProject,
        milestones,
        findings: [],
        documents: []
      };
    } catch (err) {
      console.warn('Database error in getActiveProject, falling back to in-memory project:', err);
      return {
        project: inMemoryProject,
        milestones: inMemoryMilestones,
        findings: inMemoryFindings,
        documents: inMemoryDocs
      };
    }
  }

  /**
   * Toggle or update milestone completion
   */
  static async updateMilestone(
    projectId: number,
    milestoneKey: string,
    isCompleted: boolean,
    notes?: string,
    userId?: number | null
  ) {
    if (!isDbConfigured) {
      const idx = inMemoryMilestones.findIndex((m) => m.milestoneKey === milestoneKey);
      if (idx !== -1) {
        inMemoryMilestones[idx].isCompleted = isCompleted;
        inMemoryMilestones[idx].completedAt = isCompleted ? new Date().toISOString() : null;
        if (notes) inMemoryMilestones[idx].notes = notes;
      }
      const total = inMemoryMilestones.length;
      const completed = inMemoryMilestones.filter((m) => m.isCompleted).length;
      const newScore = total > 0 ? Math.round((completed / total) * 100) : 0;
      inMemoryProject.complianceScore = newScore;
      inMemoryProject.updatedAt = new Date().toISOString();
      return { updated: inMemoryMilestones[idx] || { milestoneKey, isCompleted }, newScore };
    }

    try {
      const existing = await db
        .select()
        .from(complianceMilestones)
        .where(
          and(
            eq(complianceMilestones.projectId, projectId),
            eq(complianceMilestones.milestoneKey, milestoneKey)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        throw new Error(`Milestone ${milestoneKey} not found for project ${projectId}`);
      }

      const [updated] = await db
        .update(complianceMilestones)
        .set({
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
          completedBy: isCompleted ? userId || 1 : null,
          notes: notes || existing[0].notes
        })
        .where(eq(complianceMilestones.id, existing[0].id))
        .returning();

      // Recompute project score
      const allMilestones = await db
        .select()
        .from(complianceMilestones)
        .where(eq(complianceMilestones.projectId, projectId));

      const total = allMilestones.length;
      const completed = allMilestones.filter((m) => m.isCompleted).length;
      const newScore = total > 0 ? Math.round((completed / total) * 100) : 0;

      await db
        .update(complianceProjects)
        .set({
          complianceScore: newScore,
          updatedAt: new Date()
        })
        .where(eq(complianceProjects.id, projectId));

      // Audit log
      await db.insert(auditLogs).values({
        userId: userId || null,
        action: 'MILESTONE_COMPLETED',
        resourceType: 'MILESTONE',
        resourceId: milestoneKey,
        details: {
          projectId,
          title: updated.title,
          isCompleted,
          newComplianceScore: newScore
        }
      });

      return { updated, newScore };
    } catch (err) {
      console.warn('Database error in updateMilestone, using in-memory update:', err);
      const idx = inMemoryMilestones.findIndex((m) => m.milestoneKey === milestoneKey);
      if (idx !== -1) {
        inMemoryMilestones[idx].isCompleted = isCompleted;
      }
      return { updated: inMemoryMilestones[idx] || { milestoneKey, isCompleted }, newScore: 50 };
    }
  }

  /**
   * Create or update a compliance finding / gap
   */
  static async createFinding(
    projectId: number,
    data: {
      standardClause?: string;
      severity: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'OBSERVATION';
      category: 'TESTING' | 'QMS' | 'CALIBRATION' | 'INFRASTRUCTURE' | 'DOCUMENTATION';
      title: string;
      description: string;
      correctiveAction?: string;
    },
    userId?: number | null
  ) {
    if (!isDbConfigured) {
      const newFinding = {
        id: inMemoryFindings.length + 1,
        projectId,
        standardClause: data.standardClause,
        severity: data.severity,
        category: data.category,
        title: data.title,
        description: data.description,
        correctiveAction: data.correctiveAction,
        status: 'OPEN',
        createdAt: new Date().toISOString()
      };
      inMemoryFindings.unshift(newFinding);
      return newFinding;
    }

    try {
      const [finding] = await db
        .insert(complianceFindings)
        .values({
          projectId,
          standardClause: data.standardClause,
          severity: data.severity,
          category: data.category,
          title: data.title,
          description: data.description,
          correctiveAction: data.correctiveAction,
          status: 'OPEN'
        })
        .returning();

      await db.insert(auditLogs).values({
        userId: userId || null,
        action: 'FINDING_CREATED',
        resourceType: 'FINDING',
        resourceId: String(finding.id),
        details: { projectId, title: finding.title, severity: finding.severity }
      });

      return finding;
    } catch (err) {
      console.warn('Database error in createFinding, using in-memory storage:', err);
      const newFinding = {
        id: inMemoryFindings.length + 1,
        projectId,
        ...data,
        status: 'OPEN',
        createdAt: new Date().toISOString()
      };
      inMemoryFindings.unshift(newFinding);
      return newFinding;
    }
  }

  /**
   * Resolve a compliance finding
   */
  static async resolveFinding(findingId: number, userId?: number | null) {
    if (!isDbConfigured) {
      const finding = inMemoryFindings.find((f) => f.id === findingId);
      if (finding) {
        finding.status = 'RESOLVED';
        finding.resolvedAt = new Date().toISOString();
        return finding;
      }
      return { id: findingId, status: 'RESOLVED' };
    }

    try {
      const [updated] = await db
        .update(complianceFindings)
        .set({
          status: 'RESOLVED',
          resolvedAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(complianceFindings.id, findingId))
        .returning();

      await db.insert(auditLogs).values({
        userId: userId || null,
        action: 'FINDING_RESOLVED',
        resourceType: 'FINDING',
        resourceId: String(findingId),
        details: { title: updated.title }
      });

      return updated;
    } catch (err) {
      console.warn('Database error in resolveFinding, using in-memory update:', err);
      const finding = inMemoryFindings.find((f) => f.id === findingId);
      if (finding) {
        finding.status = 'RESOLVED';
        finding.resolvedAt = new Date().toISOString();
        return finding;
      }
      return { id: findingId, status: 'RESOLVED' };
    }
  }
}
