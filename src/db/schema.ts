import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

// 1. ORGANIZATIONS
export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  scale: varchar('scale', { length: 50 }).default('MICRO_STARTUP').notNull(), // MICRO_STARTUP, SMALL, MEDIUM_LARGE
  address: text('address'),
  state: varchar('state', { length: 100 }),
  district: varchar('district', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 2. USERS (Firebase Auth UID string)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: varchar('uid', { length: 128 }).notNull().unique(), // Firebase UID
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('COMPLIANCE_OFFICER').notNull(), // ADMIN, COMPLIANCE_OFFICER, AUDITOR, VIEWER
  organizationId: integer('organization_id').references(() => organizations.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 3. STANDARDS (Versioned BIS Standards Knowledge Repository)
export const standards = pgTable('standards', {
  id: serial('id').primaryKey(),
  isNumber: varchar('is_number', { length: 100 }).notNull().unique(), // e.g. "IS 17803:2022"
  standardCode: varchar('standard_code', { length: 50 }).notNull(), // e.g. "IS 17803"
  title: text('title').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  icsCode: varchar('ics_code', { length: 50 }),
  icsChapter: text('ics_chapter'),
  scheme: varchar('scheme', { length: 100 }).notNull(),
  schemeCode: varchar('scheme_code', { length: 50 }).notNull(), // Scheme-I, CRS, etc.
  mandatory: boolean('mandatory').default(false).notNull(),
  qcoReference: text('qco_reference'),
  qcoDate: varchar('qco_date', { length: 50 }),
  scopeSummary: text('scope_summary').notNull(),
  testingDiscipline: varchar('testing_discipline', { length: 100 }).notNull(),
  sourceUrl: text('source_url').notNull(),
  version: varchar('version', { length: 50 }).default('2022').notNull(),
  effectiveDate: varchar('effective_date', { length: 50 }),
  status: varchar('status', { length: 50 }).default('ACTIVE').notNull(), // ACTIVE, SUPERSEDED, UNDER_REVISION
  keywords: jsonb('keywords').$type<string[]>().default([]).notNull(),
  commonProducts: jsonb('common_products').$type<string[]>().default([]).notNull(),
  keyClauses: jsonb('key_clauses').$type<Array<{ clause: string; title: string; description: string }>>().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 4. LABORATORIES (BIS Recognized and Central Testing Labs)
export const laboratories = pgTable('laboratories', {
  id: serial('id').primaryKey(),
  labCode: varchar('lab_code', { length: 50 }).notNull().unique(),
  name: text('name').notNull(),
  type: varchar('type', { length: 100 }).notNull(), // BIS Central, BIS Regional, BIS Branch, Recognized Private/Govt
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  pincode: varchar('pincode', { length: 20 }),
  contactPerson: text('contact_person'),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  disciplines: jsonb('disciplines').$type<string[]>().default([]).notNull(),
  supportedStandards: jsonb('supported_standards').$type<string[]>().default([]).notNull(),
  nablAccreditation: text('nabl_accreditation'),
  validUntil: varchar('valid_until', { length: 100 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 5. COMPLIANCE PROJECTS (Factory Certification Roadmap & Workspaces)
export const complianceProjects = pgTable('compliance_projects', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id').references(() => organizations.id),
  createdByUserId: integer('created_by_user_id').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  standardId: varchar('standard_id', { length: 100 }).notNull(), // refers to standards.isNumber
  schemeCode: varchar('scheme_code', { length: 50 }).default('Scheme-I').notNull(),
  certificationRoute: varchar('certification_route', { length: 50 }).default('SIMPLIFIED').notNull(), // SIMPLIFIED, NORMAL, ECO_MARK, CRS
  status: varchar('status', { length: 50 }).default('ACTIVE').notNull(), // ACTIVE, SUBMITTED, AUDIT_SCHEDULED, GRANTED, ARCHIVED
  currentStage: integer('current_stage').default(1).notNull(), // 1 to 6
  targetGrantDate: varchar('target_grant_date', { length: 50 }),
  estimatedFee: integer('estimated_fee').default(0).notNull(),
  complianceScore: integer('compliance_score').default(0).notNull(), // 0 to 100%
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 6. COMPLIANCE MILESTONES (6-Phase statutory progress tracking)
export const complianceMilestones = pgTable('compliance_milestones', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => complianceProjects.id, { onDelete: 'cascade' }).notNull(),
  phaseNumber: integer('phase_number').notNull(),
  milestoneKey: varchar('milestone_key', { length: 100 }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  isCompleted: boolean('is_completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  completedBy: integer('completed_by').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 7. COMPLIANCE FINDINGS & GAPS (Audit Non-Conformities & Testing Gaps)
export const complianceFindings = pgTable('compliance_findings', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => complianceProjects.id, { onDelete: 'cascade' }).notNull(),
  standardClause: varchar('standard_clause', { length: 100 }),
  severity: varchar('severity', { length: 50 }).default('MEDIUM').notNull(), // CRITICAL, MAJOR, MINOR, OBSERVATION
  category: varchar('category', { length: 50 }).default('TESTING').notNull(), // TESTING, QMS, CALIBRATION, INFRASTRUCTURE, DOCUMENTATION
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  correctiveAction: text('corrective_action'),
  status: varchar('status', { length: 50 }).default('OPEN').notNull(), // OPEN, IN_PROGRESS, RESOLVED, VERIFIED
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 8. DOCUMENTS & EVIDENCE FILES (Stored securely with metadata)
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => complianceProjects.id, { onDelete: 'set null' }),
  uploadedByUserId: integer('uploaded_by_user_id').references(() => users.id),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  storagePath: text('storage_path').notNull(), // Relative file path or object storage key
  documentType: varchar('document_type', { length: 50 }).default('TEST_REPORT').notNull(), // TEST_REPORT, CALIBRATION_CERT, FACTORY_LAYOUT, QMS_MANUAL, APPLICATION_FORM, OTHER
  status: varchar('status', { length: 50 }).default('UPLOADED').notNull(), // UPLOADED, PROCESSING, ANALYZED, FAILED
  sha256Hash: varchar('sha256_hash', { length: 64 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 9. DOCUMENT ANALYSIS RESULTS (Real Test Report Intelligence Pipeline)
export const documentAnalysisResults = pgTable('document_analysis_results', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id, { onDelete: 'cascade' }).notNull(),
  projectId: integer('project_id').references(() => complianceProjects.id, { onDelete: 'set null' }),
  standardDetected: varchar('standard_detected', { length: 100 }),
  labDetected: text('lab_detected'),
  reportNumber: varchar('report_number', { length: 100 }),
  sampleDescription: text('sample_description'),
  issueDate: varchar('issue_date', { length: 50 }),
  overallConformity: varchar('overall_conformity', { length: 50 }).default('PASS').notNull(), // PASS, FAIL, PARTIAL, INCONCLUSIVE
  passedTestsCount: integer('passed_tests_count').default(0).notNull(),
  failedTestsCount: integer('failed_tests_count').default(0).notNull(),
  pendingTestsCount: integer('pending_tests_count').default(0).notNull(),
  parametersExtracted: jsonb('parameters_extracted').$type<Array<{
    testParameter: string;
    clause: string;
    requirementLimit: string;
    observedValue: string;
    result: 'PASS' | 'FAIL' | 'PENDING';
    remarks?: string;
  }>>().default([]).notNull(),
  rawAnalysisText: text('raw_analysis_text'),
  extractedGaps: jsonb('extracted_gaps').$type<string[]>().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 10. HUID VERIFICATION RECORDS (Persisted audit history for consumer checks)
export const huidVerifications = pgTable('huid_verifications', {
  id: serial('id').primaryKey(),
  huid: varchar('huid', { length: 20 }).notNull(), // 6-digit alphanumeric
  userId: integer('user_id').references(() => users.id),
  jewellerName: text('jeweller_name'),
  articleType: varchar('article_type', { length: 100 }),
  purityGrade: varchar('purity_grade', { length: 50 }),
  ahcCenterName: text('ahc_center_name'),
  hallmarkingDate: varchar('hallmarking_date', { length: 50 }),
  status: varchar('status', { length: 50 }).default('VERIFIED').notNull(), // VERIFIED, INVALID_FORMAT, NOT_FOUND
  querySource: varchar('query_source', { length: 50 }).default('WEB_UI').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 11. AUDIT & ACTIVITY LOGS (Persistent timeline across sessions)
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id').references(() => organizations.id),
  userId: integer('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(), // PROJECT_CREATED, REPORT_ANALYZED, MILESTONE_COMPLETED, STANDARD_SEARCHED, FEE_CALCULATED
  resourceType: varchar('resource_type', { length: 50 }).notNull(), // PROJECT, DOCUMENT, STANDARD, LAB, HUID
  resourceId: varchar('resource_id', { length: 100 }),
  details: jsonb('details').$type<Record<string, any>>().default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// RELATIONS DEFINITIONS
export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  projects: many(complianceProjects)
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id]
  }),
  projects: many(complianceProjects),
  documents: many(documents)
}));

export const complianceProjectsRelations = relations(complianceProjects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [complianceProjects.organizationId],
    references: [organizations.id]
  }),
  creator: one(users, {
    fields: [complianceProjects.createdByUserId],
    references: [users.id]
  }),
  milestones: many(complianceMilestones),
  findings: many(complianceFindings),
  documents: many(documents)
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
  project: one(complianceProjects, {
    fields: [documents.projectId],
    references: [complianceProjects.id]
  }),
  uploader: one(users, {
    fields: [documents.uploadedByUserId],
    references: [users.id]
  }),
  analysisResults: many(documentAnalysisResults)
}));

export const documentAnalysisResultsRelations = relations(documentAnalysisResults, ({ one }) => ({
  document: one(documents, {
    fields: [documentAnalysisResults.documentId],
    references: [documents.id]
  }),
  project: one(complianceProjects, {
    fields: [documentAnalysisResults.projectId],
    references: [complianceProjects.id]
  })
}));
