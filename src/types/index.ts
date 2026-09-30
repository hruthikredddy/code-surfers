export type QueryCapability = 
  | 'STANDARD_QA'
  | 'PRODUCT_RECOMMENDER'
  | 'SCHEME_GUIDANCE'
  | 'PROCESS_WALKTHROUGH'
  | 'HALLMARKING'
  | 'LAB_FINDER'
  | 'CONSUMER_QUERY'
  | 'GENERAL_HELP';

export type GroundingStatus = 'GROUNDED' | 'LOW_CONFIDENCE' | 'PROCEDURAL_GUIDE';

export interface ClauseReference {
  clause: string;
  title: string;
  description: string;
}

export interface StandardEntry {
  id: string;
  is_number: string;
  title: string;
  ics_code: string;
  ics_chapter: string;
  category: string;
  keywords: string[];
  scheme: string;
  scheme_code: 'Scheme-I' | 'Scheme-II' | 'Scheme-IV' | 'Scheme-X' | 'CRS' | 'FMCS';
  mandatory: boolean;
  qco_reference: string;
  source_url: string;
  scope_summary: string;
  key_clauses: ClauseReference[];
  testing_lab_discipline: string;
  key_test_parameters: string[];
  common_products: string[];
}

export interface ProcessStep {
  step_number: number;
  title: string;
  description: string;
  estimated_timeline: string;
  required_documents: string[];
}

export interface SchemeInfo {
  id: string;
  name: string;
  code: 'Scheme-I' | 'Scheme-II' | 'Scheme-IV' | 'Scheme-X' | 'CRS' | 'FMCS';
  short_description: string;
  full_description: string;
  applicable_to: string;
  governing_regulations: string;
  who_needs_it: string[];
  key_differences: string;
  process_steps: ProcessStep[];
  source_url: string;
  portal_name: string;
  portal_url: string;
}

export interface HallmarkingTopic {
  id: string;
  title: string;
  category: 'HUID' | 'MARKS' | 'MANDATORY_DISTRICTS' | 'CONSUMER_VERIFICATION' | 'AHC_CENTRES' | 'SILVER';
  summary: string;
  details: string[];
  official_steps?: string[];
  source_url: string;
}

export interface ConsumerTopic {
  id: string;
  title: string;
  category: 'VERIFY_ISI' | 'VERIFY_HUID' | 'COMPLAINTS' | 'BIS_CARE_APP' | 'VERIFY_CRS';
  summary: string;
  steps: string[];
  portal_url: string;
  portal_label: string;
}

export interface LabGuidance {
  discipline: string;
  products_covered: string[];
  applicable_standards: string[];
  official_directory_url: string;
  search_instructions: string[];
  accreditation_requirement: string;
}

export interface CitationItem {
  type: 'standard' | 'scheme' | 'portal' | 'faq' | 'official_source';
  is_number?: string;
  title: string;
  scheme?: string;
  mandatory?: boolean;
  qco_reference?: string;
  source_url: string;
  ics_code?: string;
  relevance_note?: string;
}

export interface OfficialBisKnowledgeEntry {
  id: string;
  category: string;
  title: string;
  summary: string;
  key_facts: string[];
  keywords: string[];
  source_url: string;
  source_name: string;
  bis_context?: string;
  procedural_links: ProceduralLink[];
  next_steps?: NextStepSuggestion[];
}

export interface NextStepSuggestion {
  id: string;
  label: string;
  prompt: string;
  capability: QueryCapability;
}

export interface ProceduralLink {
  label: string;
  url: string;
  note: string;
}

export type AttachedFileType = 'image' | 'video' | 'document';

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string; // MIME type e.g. 'image/png', 'video/mp4', 'application/pdf', 'text/plain'
  category: AttachedFileType;
  dataUrl?: string; // Base64 data URL for preview or sending
  previewUrl?: string; // Object URL or Base64
  textContent?: string; // Extracted text content for text/csv/json/markdown
  duration?: number; // Duration in seconds for video
  lastModified?: number;
}

export interface RetrievalResult {
  capability: QueryCapability;
  capabilityLabel: string;
  groundingStatus: GroundingStatus;
  confidenceScore: number; // 0 - 100
  matchedStandards: StandardEntry[];
  matchedScheme?: SchemeInfo;
  matchedHallmarking?: HallmarkingTopic[];
  matchedConsumerTopic?: ConsumerTopic;
  matchedLabGuidance?: LabGuidance;
  matchedOfficialKnowledge?: OfficialBisKnowledgeEntry[];
  plainLanguageExplanation: string;
  citations: CitationItem[];
  proceduralLinks: ProceduralLink[];
  nextSteps: NextStepSuggestion[];
  detectedLanguage?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: AttachedFile[];
  capability?: QueryCapability;
  capabilityLabel?: string;
  groundingStatus?: GroundingStatus;
  confidenceScore?: number;
  citations?: CitationItem[];
  proceduralLinks?: ProceduralLink[];
  nextSteps?: NextStepSuggestion[];
  isLowConfidence?: boolean;
  isStreaming?: boolean;
}

export type SupportedLanguage = 
  | 'en'   // English
  | 'hi'   // Hindi (हिन्दी)
  | 'te'   // Telugu (తెలుగు)
  | 'ta'   // Tamil (தமிழ்)
  | 'kn';  // Kannada (ಕನ್ನಡ)

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  direction?: 'ltr' | 'rtl';
  script?: string;
}

// ----------------------------------------------------
// Testing & Laboratory Intelligence Data Interfaces
// ----------------------------------------------------

export type TestCategory =
  | 'Mechanical & Physical'
  | 'Chemical & Material'
  | 'Thermal & Safety'
  | 'Hygiene & Food Contact'
  | 'Durability & Performance'
  | 'Electrical & Electronics'
  | 'Microbiological';

export interface TestRequirementItem {
  id: string;
  test_name: string;
  category: TestCategory;
  purpose: string;
  relevant_standard: string;
  relevant_clause: string;
  required_test_method: string;
  important_conditions: string;
  parameters: string;
  acceptance_criteria: string;
  traceability_source: string;
  capable_lab_ids: string[];
  mandatory: boolean;
}

export interface ProductTestingProfile {
  id: string;
  product_name: string;
  product_aliases: string[];
  category: string;
  standard_id: string;
  is_number: string;
  standard_title: string;
  qco_reference: string;
  scheme: string;
  sample_size_requirement: string;
  estimated_turnaround_days: string;
  required_tests: TestRequirementItem[];
}

export interface BisLabItem {
  id: string;
  name: string;
  type: 'Central Laboratory' | 'Regional Laboratory' | 'Branch Laboratory' | 'BIS Recognized Commercial Lab';
  location: string;
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  accreditation: string;
  contact_info: {
    address: string;
    phone?: string;
    email?: string;
    lims_id?: string;
    website?: string;
  };
  supported_standards: string[];
  supported_test_ids: string[];
  turnaround_time: string;
  source_reference: string;
}

export interface ExtractedReportTest {
  test_name: string;
  clause: string;
  result: 'Pass' | 'Fail' | 'Marginal' | 'Inconclusive';
  parameter: string;
  observed_value: string;
  specified_limit: string;
}

export interface SampleTestReport {
  id: string;
  title: string;
  product_name: string;
  standard_referenced: string;
  lab_name: string;
  report_number: string;
  issue_date: string;
  raw_text: string;
  extracted_data: {
    product: string;
    standard: string;
    tests_performed: ExtractedReportTest[];
    methods: string[];
    dates: string;
    accreditation_ref: string;
    conclusion: string;
  };
}

export interface TestingRoadmapStage {
  step_number: number;
  stage_name: string;
  short_description: string;
  details: string[];
  key_deliverable: string;
  timeline: string;
  official_portal?: string;
  tips: string;
}

export interface TestingQAPair {
  id: string;
  question: string;
  hindi_question?: string;
  category: string;
  answer: string;
  authoritative_source: string;
  relevant_standard?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  capability?: QueryCapability | null;
  summary?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  organization: string;
  role: string;
  applicantId: string;
  licenseTier: string;
  avatarUrl?: string;
  joinedDate: string;
}

export type ActivityType = 
  | 'file_analysis' 
  | 'standard_search' 
  | 'copilot_guidance' 
  | 'ai_query' 
  | 'lab_search' 
  | 'hallmarking_check'
  | 'fee_calculation';

export interface RecentActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  statusBadge?: string;
  statusType?: 'passed' | 'pending' | 'failed' | 'info';
  actionTarget?: {
    view: 'chat' | 'copilot' | 'catalog' | 'testing' | 'smart_finder' | 'lab_finder' | 'hallmarking' | 'fee_calculator';
    tab?: string;
    query?: string;
    sessionId?: string;
  };
}

export interface AnalyzedProductFile {
  id: string;
  name: string;
  category: 'report' | 'spec' | 'image' | 'video';
  standard: string;
  reportNumber?: string;
  status: 'PASSED' | 'FAILED' | 'PENDING' | 'ACTION_REQUIRED';
  passCount: number;
  failCount: number;
  pendingCount: number;
  date: string;
  labName?: string;
  summaryNote?: string;
}

export interface UserSettings {
  theme: 'system' | 'light' | 'dark';
  defaultCategory: string;
  emailNotifications: boolean;
  qcoAlerts: boolean;
  autoSaveChats: boolean;
  exportFormat: 'pdf' | 'json';
}

