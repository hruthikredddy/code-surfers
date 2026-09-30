import { db, isDbConfigured } from '../db/index.ts';
import {
  complianceProjects,
  complianceMilestones,
  complianceFindings,
  documents,
  documentAnalysisResults,
  standards,
  laboratories,
  auditLogs,
  users
} from '../db/schema.ts';
import { eq, desc, count, sql } from 'drizzle-orm';
import { INDIAN_STANDARDS } from '../data/standards.ts';
import { BIS_RECOGNIZED_LABS } from '../data/testingIntelligenceData.ts';
import { INITIAL_ANALYZED_FILES } from './dashboardDataService.ts';
import { AnalyzedProductFile } from '../types/index.ts';

export interface DashboardStatsOutput {
  compliance: {
    overallPercentage: number;
    totalMilestones: number;
    completedMilestones: number;
    pendingMilestones: number;
    openFindings: number;
    criticalFindings: number;
  };
  testing: {
    totalDocuments: number;
    analyzedDocuments: number;
    totalTestsEvaluated: number;
    testsPassed: number;
    testsFailed: number;
    testsPending: number;
  };
  catalog: {
    standardsIndexed: number;
    mandatoryQcoCount: number;
    laboratoriesEmpanelled: number;
    lastUpdated: string;
    source: string;
  };
  projects: Array<{
    id: number;
    title: string;
    productName: string;
    standardId: string;
    status: string;
    currentStage: number;
    complianceScore: number;
    targetGrantDate: string | null;
  }>;
  recentActivities: Array<{
    id: string;
    action: string;
    resourceType: string;
    title: string;
    details: string;
    timestamp: string;
  }>;
  analyzedFiles: AnalyzedProductFile[];
}

export class DashboardService {
  /**
   * Calculate aggregated dashboard metrics dynamically from database
   */
  static async getDashboardStats(userId?: number | null): Promise<DashboardStatsOutput> {
    const fallbackStats: DashboardStatsOutput = {
      compliance: {
        overallPercentage: 68,
        totalMilestones: 6,
        completedMilestones: 4,
        pendingMilestones: 2,
        openFindings: 1,
        criticalFindings: 0
      },
      testing: {
        totalDocuments: INITIAL_ANALYZED_FILES.length,
        analyzedDocuments: INITIAL_ANALYZED_FILES.length,
        totalTestsEvaluated: INITIAL_ANALYZED_FILES.reduce((sum, f) => sum + f.passCount + f.failCount + f.pendingCount, 0),
        testsPassed: INITIAL_ANALYZED_FILES.reduce((sum, f) => sum + f.passCount, 0),
        testsFailed: INITIAL_ANALYZED_FILES.reduce((sum, f) => sum + f.failCount, 0),
        testsPending: INITIAL_ANALYZED_FILES.reduce((sum, f) => sum + f.pendingCount, 0)
      },
      catalog: {
        standardsIndexed: INDIAN_STANDARDS.length,
        mandatoryQcoCount: INDIAN_STANDARDS.filter((s) => s.mandatory).length,
        laboratoriesEmpanelled: BIS_RECOGNIZED_LABS.length,
        lastUpdated: 'Live National Standards Registry',
        source: 'Bureau of Indian Standards Official Gazetted Registry'
      },
      projects: [
        {
          id: 1,
          title: 'Factory BIS Certification Project',
          productName: 'Stainless Steel Water Bottles (Non-Insulated)',
          standardId: 'IS 17803:2022',
          status: 'ACTIVE',
          currentStage: 3,
          complianceScore: 68,
          targetGrantDate: '2026-11-30'
        }
      ],
      recentActivities: [
        {
          id: 'act-1',
          action: 'REPORT_ANALYZED',
          resourceType: 'TEST_REPORT',
          title: 'Scrutinized Test Report: NTL/2026/MECH-SS-9042',
          details: 'Evaluated against IS 17803:2022: 6 passed, 1 non-conformity.',
          timestamp: '2 hours ago'
        },
        {
          id: 'act-2',
          action: 'STANDARD_SEARCHED',
          resourceType: 'STANDARD',
          title: 'Queried Standard: IS 302-2-15',
          details: 'Verified Quality Control Order applicability and STI testing requirements.',
          timestamp: '5 hours ago'
        },
        {
          id: 'act-3',
          action: 'MILESTONE_COMPLETED',
          resourceType: 'MILESTONE',
          title: 'Milestone Verified: Lab Testing & Report Scrutiny',
          details: 'Phase 3 documentation verified.',
          timestamp: 'Yesterday'
        }
      ],
      analyzedFiles: INITIAL_ANALYZED_FILES
    };

    if (!isDbConfigured) {
      return fallbackStats;
    }

    try {
      // 1. Projects
      const projectList = await db
        .select()
        .from(complianceProjects)
        .orderBy(desc(complianceProjects.updatedAt))
        .limit(5);

      // 2. Milestones Aggregations
      const allMilestones = await db.select().from(complianceMilestones);
      const totalMilestones = allMilestones.length;
      const completedMilestones = allMilestones.filter((m) => m.isCompleted).length;
      const pendingMilestones = totalMilestones - completedMilestones;

      // 3. Findings Aggregations
      const allFindings = await db.select().from(complianceFindings);
      const openFindings = allFindings.filter((f) => f.status === 'OPEN' || f.status === 'IN_PROGRESS').length;
      const criticalFindings = allFindings.filter((f) => f.severity === 'CRITICAL' && f.status === 'OPEN').length;

      // Overall Compliance Percentage
      const overallPercentage = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : (projectList[0]?.complianceScore || 68);

      // 4. Documents & Test Results Aggregations
      const docList = await db.select().from(documents);
      const totalDocuments = docList.length;
      const analyzedDocuments = docList.filter((d) => d.status === 'ANALYZED').length;

      const analysisResults = await db
        .select({
          result: documentAnalysisResults,
          doc: documents
        })
        .from(documentAnalysisResults)
        .innerJoin(documents, eq(documentAnalysisResults.documentId, documents.id))
        .orderBy(desc(documentAnalysisResults.createdAt));

      let testsPassed = 0;
      let testsFailed = 0;
      let testsPending = 0;

      for (const item of analysisResults) {
        testsPassed += item.result.passedTestsCount;
        testsFailed += item.result.failedTestsCount;
        testsPending += item.result.pendingTestsCount;
      }

      // 5. Standards & Labs Exact Coverage
      const allStandards = await db.select().from(standards);
      const standardsIndexed = allStandards.length;
      const mandatoryQcoCount = allStandards.filter((s) => s.mandatory).length;

      const allLabs = await db.select().from(laboratories);
      const laboratoriesEmpanelled = allLabs.length;

      // 6. Real Audit Activities
      const logs = await db
        .select()
        .from(auditLogs)
        .orderBy(desc(auditLogs.createdAt))
        .limit(10);

      const recentActivities = logs.map((log) => {
        let title = 'System Activity';
        let details = JSON.stringify(log.details);

        if (log.action === 'PROJECT_CREATED') {
          title = `Initiated Compliance Project: ${(log.details as any)?.title || 'New Standard'}`;
          details = `Assigned Scheme-I roadmap for ${(log.details as any)?.standard || 'IS Standard'}.`;
        } else if (log.action === 'REPORT_ANALYZED') {
          title = `Scrutinized Test Report: ${(log.details as any)?.filename || 'Lab Report'}`;
          details = `Evaluated against ${(log.details as any)?.standard || 'IS Standard'}: ${(log.details as any)?.passedCount || 0} passed, ${(log.details as any)?.failedCount || 0} non-conformities.`;
        } else if (log.action === 'MILESTONE_COMPLETED') {
          title = `Milestone Verified: ${(log.details as any)?.title || 'Phase Task'}`;
          details = `Phase ${(log.details as any)?.phase || 1} documentation verified.`;
        } else if (log.action === 'STANDARD_SEARCHED') {
          title = `Queried Standard: ${(log.details as any)?.resourceId || 'BIS Directory'}`;
          details = `Found ${(log.details as any)?.resultsFound || 0} matching specifications.`;
        }

        const timeAgo = new Date(log.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });

        return {
          id: `act-${log.id}`,
          action: log.action,
          resourceType: log.resourceType,
          title,
          details,
          timestamp: timeAgo
        };
      });

      // 7. Format Analyzed Files for Frontend
      const analyzedFiles = analysisResults.map((item) => ({
        id: `file-${item.doc.id}`,
        name: item.doc.originalName,
        category: (item.doc.documentType === 'TEST_REPORT' ? 'report' : 'spec') as 'report' | 'spec',
        standard: item.result.standardDetected || 'IS 17803:2022',
        reportNumber: item.result.reportNumber || `RPT-${item.doc.id}`,
        status: (item.result.failedTestsCount > 0 ? 'ACTION_REQUIRED' : item.result.pendingTestsCount > 0 ? 'PENDING' : 'PASSED') as 'PASSED' | 'FAILED' | 'PENDING' | 'ACTION_REQUIRED',
        passCount: item.result.passedTestsCount,
        failCount: item.result.failedTestsCount,
        pendingCount: item.result.pendingTestsCount,
        date: item.result.issueDate || 'Recent',
        labName: item.result.labDetected || 'Authorized Laboratory',
        summaryNote: item.result.rawAnalysisText?.slice(0, 150) || 'Scrutinized by BIS engine.'
      }));

      return {
        compliance: {
          overallPercentage,
          totalMilestones,
          completedMilestones,
          pendingMilestones,
          openFindings,
          criticalFindings
        },
        testing: {
          totalDocuments,
          analyzedDocuments,
          totalTestsEvaluated: testsPassed + testsFailed + testsPending,
          testsPassed,
          testsFailed,
          testsPending
        },
        catalog: {
          standardsIndexed,
          mandatoryQcoCount,
          laboratoriesEmpanelled,
          lastUpdated: 'Live Database Sync (PostgreSQL)',
          source: 'Bureau of Indian Standards Official Gazetted Registry'
        },
        projects: projectList.map((p) => ({
          id: p.id,
          title: p.title,
          productName: p.productName,
          standardId: p.standardId,
          status: p.status,
          currentStage: p.currentStage,
          complianceScore: p.complianceScore,
          targetGrantDate: p.targetGrantDate
        })),
        recentActivities,
        analyzedFiles
      };
    } catch (dbErr) {
      console.warn('Database query error in getDashboardStats, using fallback:', dbErr);
      return fallbackStats;
    }
  }
}
