import { INDIAN_STANDARDS } from '../data/standards.ts';
import { BIS_SCHEMES } from '../data/schemes.ts';
import { HALLMARKING_DATA } from '../data/hallmarking.ts';
import { CONSUMER_TOPICS } from '../data/consumerSupport.ts';
import { LAB_FINDER_GUIDELINES } from '../data/labFinder.ts';
import { OFFICIAL_BIS_KNOWLEDGE } from '../data/officialBisKnowledge.ts';
import { validateStandardRelevance } from './semanticRelevanceValidator.ts';
import {
  QueryCapability,
  RetrievalResult,
  StandardEntry,
  SchemeInfo,
  CitationItem,
  NextStepSuggestion,
  ProceduralLink,
  ChatMessage,
  AttachedFile,
  OfficialBisKnowledgeEntry
} from '../types/index.ts';

// Capability display labels
export const CAPABILITY_LABELS: Record<QueryCapability, string> = {
  STANDARD_QA: 'Standard Q&A',
  PRODUCT_RECOMMENDER: 'Product → Standard Recommender',
  SCHEME_GUIDANCE: 'Certification Schemes',
  PROCESS_WALKTHROUGH: 'Licensing Process Flow',
  HALLMARKING: 'Hallmarking Guidance',
  LAB_FINDER: 'Testing Lab Directory',
  CONSUMER_QUERY: 'Consumer & Grievance Support',
  GENERAL_HELP: 'General Compliance Guidance'
};

// Language detection helper with full support for Indian scripts
export function detectLanguage(text: string): string {
  // Check for Meitei Mayek (Manipuri)
  if (/[\uAAE0-\uAAFF\uABC0-\uABFF]/.test(text)) return 'mni';

  // Check for Arabic / Perso-Arabic script (Urdu, Kashmiri, Sindhi)
  if (/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) {
    // Specific Sindhi / Kashmiri characters or general Urdu
    if (/[\u067B\u067D\u067E\u0680\u0684\u0686\u068A\u068F\u0699\u06A6\u06BD]/.test(text)) return 'sd';
    if (/[\u0620\u0656\u0657\u065D\u065E\u065F]/.test(text)) return 'ks';
    return 'ur';
  }

  // Check for Odia
  if (/[\u0B00-\u0B7F]/.test(text)) return 'or';

  // Check for Bengali / Assamese script
  if (/[\u0980-\u09FF]/.test(text)) {
    // Unique Assamese characters: ৰ (\u09F0) and ৱ (\u09F1)
    if (/[\u09F0\u09F1]/.test(text)) return 'as';
    return 'bn';
  }

  // Check for Gurmukhi (Punjabi)
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';

  // Check for Gujarati
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';

  // Check for Tamil
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';

  // Check for Telugu
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';

  // Check for Kannada
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';

  // Check for Malayalam
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';

  // Check for Devanagari (Hindi, Marathi, Sanskrit, Nepali, Maithili, Konkani, Dogri, Bodo)
  if (/[\u0900-\u097F]/.test(text)) {
    // Check for Sanskrit markers: halant combinations, avagraha ऽ, visarga ः with Sanskrit vocabulary
    if (/(?:अस्ति|भवति|सर्वकार|मानकम्|नमः|स्वाहा|इति|च|तथा|यथा|एव)[\s\b]/.test(text) || /[ःऽ]/.test(text)) return 'sa';
    // Check for Marathi words (आहे, नाही, करतो, काय, मध्ये, ळ)
    if (/(?:आहे|नाही|करायचे|करणे|मध्ये|आणि|काय)[\s\b]/.test(text) || /\u0933/.test(text)) return 'mr';
    // Check for Nepali words (छ, गर्छ, भएको, तर, अनि)
    if (/(?:छ|गर्छ|भएको|होइन|च्याट|तथापि)[\s\b]/.test(text)) return 'ne';
    // Check for Maithili words (अछि, छी, करैत, भेल)
    if (/(?:अछि|छी|करैत|भेल|हमर|अहाँ)[\s\b]/.test(text)) return 'mai';
    // Check for Konkani words (आसा, ना, करता, कितें)
    if (/(?:आसा|कितें|फाटीं|भास)[\s\b]/.test(text)) return 'kok';
    // Check for Dogri words (ए, न, करदा, गल्ल)
    if (/(?:गल्ल|करदा|मिगी|तुगी|पिच्छे)[\s\b]/.test(text)) return 'doi';
    // Check for Bodo words (दों, गैया, खालाम)
    if (/(?:दों|गैया|खालाम|नागिर)[\s\b]/.test(text)) return 'brx';

    // Default Devanagari language is Hindi
    return 'hi';
  }
  
  return 'en';
}

/**
 * Normalizes user text for robust keyword and token matching
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * Extracts explicit IS numbers from user queries, e.g. "IS 302", "IS 16102", "IS 14543", "IS-1293", "IS1417"
 */
function extractISNumber(text: string): string | null {
  const match = text.match(/\b(?:is|IS)[\s-]?([0-9]{3,5})(?:[-/]\s*([0-9]+))?(?:\s*\(part\s*([0-9]+)\))?/i);
  if (match) {
    return match[0].toUpperCase().replace(/\s+/g, ' ');
  }
  return null;
}

/**
 * Resolves conversational follow-ups by analyzing conversation history
 */
function resolveContextFromHistory(history: ChatMessage[]): {
  lastStandard?: StandardEntry;
  lastScheme?: SchemeInfo;
} {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role === 'assistant') {
      if (msg.citations && msg.citations.length > 0) {
        const stdCitation = msg.citations.find((c) => c.is_number);
        if (stdCitation && stdCitation.is_number) {
          const found = INDIAN_STANDARDS.find((s) => s.is_number.includes(stdCitation.is_number!));
          if (found) {
            return { lastStandard: found };
          }
        }
      }
      if (msg.capability === 'SCHEME_GUIDANCE' || msg.capability === 'PROCESS_WALKTHROUGH') {
        const schemeCitation = msg.citations?.find((c) => c.type === 'scheme');
        if (schemeCitation) {
          const foundScheme = BIS_SCHEMES.find((s) => s.name.includes(schemeCitation.title) || s.code === schemeCitation.title);
          if (foundScheme) {
            return { lastScheme: foundScheme };
          }
        }
      }
    }
  }
  return {};
}

/**
 * Maps an official BIS knowledge category to an authoritative QueryCapability
 */
function mapCategoryToCapability(category: string): QueryCapability {
  switch (category) {
    case 'APPLY_LICENSE':
    case 'CERTIFICATION_PROCESS':
    case 'RENEWAL_SCOPE_CHANGE':
    case 'CERTIFICATION_FEES':
      return 'PROCESS_WALKTHROUGH';
    case 'FMCS':
    case 'CERTIFICATION_OVERVIEW':
      return 'SCHEME_GUIDANCE';
    case 'LABORATORY_LIMS':
    case 'LABS_DIRECTORY':
      return 'LAB_FINDER';
    case 'HALLMARKING_OVERVIEW':
      return 'HALLMARKING';
    case 'BIS_APPS':
    case 'CONSUMER_OVERVIEW':
      return 'CONSUMER_QUERY';
    case 'STANDARDS_ACCESS':
    case 'STANDARDS_PORTAL':
    case 'PUBLISHED_STANDARDS':
    case 'KNOW_YOUR_STANDARD':
    case 'PRODUCT_SPECIFIC_GUIDELINES':
      return 'STANDARD_QA';
    default:
      return 'GENERAL_HELP';
  }
}

/**
 * Matches user query against the 10 official BIS knowledge sources
 */
function matchOfficialBisKnowledge(
  lower: string,
  tokens: string[]
): { entry: OfficialBisKnowledgeEntry; score: number; matchedKeywords: string[] }[] {
  return OFFICIAL_BIS_KNOWLEDGE.map((entry) => {
    let score = 0;
    const matchedKws: string[] = [];

    // Exact and phrase keyword matching
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (lower.includes(kwLower)) {
        score += 34;
        matchedKws.push(kw);
      } else {
        const parts = kwLower.split(/\s+/).filter((p) => p.length > 2);
        const matchCount = parts.filter((p) => lower.includes(p)).length;
        if (parts.length > 1 && matchCount === parts.length) {
          score += 26;
          matchedKws.push(kw);
        } else if (matchCount > 0) {
          score += matchCount * 7;
          matchedKws.push(kw);
        }
      }
    }

    // Title token overlap
    for (const token of tokens) {
      if (token.length > 3 && entry.title.toLowerCase().includes(token)) {
        score += 8;
      }
      if (token.length > 3 && entry.summary.toLowerCase().includes(token)) {
        score += 4;
      }
      if (entry.bis_context && token.length > 3 && entry.bis_context.toLowerCase().includes(token)) {
        score += 5;
      }
    }

    return {
      entry,
      score,
      matchedKeywords: Array.from(new Set(matchedKws))
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Main Classify -> Retrieve -> Confidence-Gate -> Cite pipeline
 */
export function classifyAndRetrieve(
  query: string,
  history: ChatMessage[] = [],
  forcedLanguage?: string,
  attachments?: AttachedFile[]
): RetrievalResult {
  const attachmentKeywords = attachments && attachments.length > 0
    ? attachments.map((a) => `${a.name} ${a.textContent || ''}`).join(' ')
    : '';
  const cleanQuery = `${query.trim()} ${attachmentKeywords}`.trim();
  const lower = cleanQuery.toLowerCase();
  const tokens = tokenize(cleanQuery);
  const detectedLang = forcedLanguage && forcedLanguage !== 'auto' ? forcedLanguage : detectLanguage(query.trim() || 'English');

  // Check contextual resolution for follow-ups
  const { lastStandard, lastScheme } = resolveContextFromHistory(history);

  // 1. Check for Explicit IS Number Query
  const explicitIS = extractISNumber(cleanQuery);
  if (explicitIS) {
    const rawNumberDigits = explicitIS.replace(/\D/g, '');
    const matchedStandards = INDIAN_STANDARDS.filter((s) => {
      const sDigits = s.is_number.replace(/\D/g, '');
      return sDigits.includes(rawNumberDigits) || s.is_number.toLowerCase().includes(explicitIS.toLowerCase());
    });

    if (matchedStandards.length > 0) {
      const topStd = matchedStandards[0];
      const clausesList = topStd.key_clauses.map((c) => `• ${c.clause} (${c.title}): ${c.description}`).join('\n');

      return {
        capability: 'STANDARD_QA',
        capabilityLabel: CAPABILITY_LABELS.STANDARD_QA,
        groundingStatus: 'GROUNDED',
        confidenceScore: 96,
        matchedStandards,
        plainLanguageExplanation: `${topStd.is_number} covers "${topStd.title}". It is categorized under ICS ${topStd.ics_code} (${topStd.ics_chapter}) and governed by ${topStd.scheme}.\n\nScope Summary: ${topStd.scope_summary}\n\nKey Technical Clauses Cited:\n${clausesList}\n\nCertification Mandatory: ${topStd.mandatory ? `Yes, under ${topStd.qco_reference}` : 'No, currently voluntary under BIS guidelines.'}`,
        citations: matchedStandards.map((std) => ({
          type: 'standard',
          is_number: std.is_number,
          title: std.title,
          scheme: std.scheme,
          mandatory: std.mandatory,
          qco_reference: std.qco_reference,
          source_url: std.source_url,
          ics_code: std.ics_code,
          relevance_note: `Matched explicitly by standard identifier ${explicitIS}`
        })),
        proceduralLinks: [
          { label: 'View on BIS Standards Portal', url: topStd.source_url, note: 'Official text and gazette notifications' },
          { label: 'Find Testing Labs for this Standard', url: 'https://lims.bis.gov.in', note: 'Search BIS Recognized LIMS Lab Network' }
        ],
        nextSteps: [
          { id: 'ns-proc', label: `Explain licensing process for ${topStd.scheme}`, prompt: `What is the step-by-step licensing process for ${topStd.scheme}?`, capability: 'PROCESS_WALKTHROUGH' },
          { id: 'ns-lab', label: `Find testing labs for ${topStd.is_number}`, prompt: `Which testing lab discipline and testing parameters apply to ${topStd.is_number}?`, capability: 'LAB_FINDER' },
          { id: 'ns-qco', label: `Is ${topStd.is_number} mandatory for startups?`, prompt: `Is certification for ${topStd.is_number} mandatory for startups and MSMEs?`, capability: 'STANDARD_QA' }
        ],
        detectedLanguage: detectedLang
      };
    }
  }

  // 2. Check for Hallmarking queries
  const hallmarkingKeywords = ['hallmark', 'hallmarking', 'huid', 'gold', 'jewellery', 'jewelry', 'silver', 'assaying', 'ahc', 'karat', 'carat', '22k', '18k', '14k', '916'];
  const isHallmarkQuery = hallmarkingKeywords.some((kw) => lower.includes(kw));

  if (isHallmarkQuery && !lower.includes('water heater') && !lower.includes('helmet')) {
    const matchedTopics = HALLMARKING_DATA.filter((topic) => {
      const titleLower = topic.title.toLowerCase();
      const sumLower = topic.summary.toLowerCase();
      return tokens.some((t) => titleLower.includes(t) || sumLower.includes(t));
    });

    const topicsToUse = matchedTopics.length > 0 ? matchedTopics : [HALLMARKING_DATA[0], HALLMARKING_DATA[1]];
    const mainTopic = topicsToUse[0];

    return {
      capability: 'HALLMARKING',
      capabilityLabel: CAPABILITY_LABELS.HALLMARKING,
      groundingStatus: 'GROUNDED',
      confidenceScore: 92,
      matchedStandards: INDIAN_STANDARDS.filter((s) => s.category === 'Precious Metals & Hallmarking'),
      matchedHallmarking: topicsToUse,
      plainLanguageExplanation: `${mainTopic.summary}\n\nKey Provisions:\n${mainTopic.details.map((d) => `• ${d}`).join('\n')}`,
      citations: [
        {
          type: 'standard',
          is_number: 'IS 1417:2016',
          title: 'Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking (Gold Hallmarking)',
          scheme: 'Hallmarking Scheme (HUID)',
          mandatory: true,
          qco_reference: 'Hallmarking of Gold Jewellery Order, 2020',
          source_url: 'https://www.bis.gov.in/hallmarking-overview',
          relevance_note: 'Official Indian Standard governing gold hallmarking and HUID inscription'
        },
        {
          type: 'portal',
          title: 'BIS Care Mobile App — Verify HUID & Jeweller Details',
          source_url: 'https://services.bis.gov.in',
          relevance_note: 'Official tool to verify any 6-digit HUID before purchase'
        }
      ],
      proceduralLinks: [
        { label: 'BIS Hallmarking Portal', url: 'https://www.bis.gov.in/hallmarking-overview', note: 'Guidelines, AHC lists, and Gazette orders' },
        { label: 'Verify HUID on BIS Care App', url: 'https://services.bis.gov.in', note: 'Public search for 6-digit HUID code' }
      ],
      nextSteps: [
        { id: 'ns-hm-verify', label: 'How does a consumer verify HUID on the BIS Care App?', prompt: 'How can a consumer verify HUID on the BIS Care App before buying gold?', capability: 'HALLMARKING' },
        { id: 'ns-hm-ahc', label: 'How to find a licensed Assaying & Hallmarking Centre (AHC)?', prompt: 'How do I find a licensed Assaying & Hallmarking Centre (AHC) in my district?', capability: 'HALLMARKING' },
        { id: 'ns-hm-marks', label: 'What are the 3 mandatory marks on gold jewellery?', prompt: 'What are the 3 mandatory marks that must appear on hallmarked gold jewellery?', capability: 'HALLMARKING' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // 3. Check for Process / Walkthrough Queries
  const processKeywords = ['process', 'step by step', 'how to get', 'procedure', 'how do i apply', 'walkthrough', 'licensing flow', 'steps to get', 'factory inspection'];
  const isProcessQuery = processKeywords.some((pk) => lower.includes(pk));
  const isSpecificFeeOrPenalty = lower.includes('penalty') || lower.includes('penalties') || lower.includes('fine') || lower.includes('fee') || lower.includes('cost') || lower.includes('renew') || lower.includes('renewal');

  if ((isProcessQuery && !isSpecificFeeOrPenalty) || (lastScheme && lower.includes('process'))) {
    // Determine which scheme
    let targetScheme: SchemeInfo | undefined = lastScheme;
    if (lower.includes('scheme 1') || lower.includes('scheme-1') || lower.includes('scheme i') || lower.includes('isi mark') || lower.includes('isi certification')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-I');
    } else if (lower.includes('crs') || lower.includes('compulsory registration') || lower.includes('electronics') || lower.includes('it goods')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'CRS');
    } else if (lower.includes('fmcs') || lower.includes('foreign') || lower.includes('overseas') || lower.includes('import')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'FMCS');
    } else if (lower.includes('scheme 2') || lower.includes('scheme-2') || lower.includes('sdoc')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-II');
    } else if (lower.includes('scheme 4') || lower.includes('scheme-4') || lower.includes('batch')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-IV');
    } else if (lower.includes('scheme x') || lower.includes('machinery')) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-X');
    }

    if (!targetScheme && lastStandard) {
      targetScheme = BIS_SCHEMES.find((s) => s.code === lastStandard.scheme_code) || BIS_SCHEMES[0];
    }

    if (!targetScheme) {
      targetScheme = BIS_SCHEMES[0]; // Default to Scheme-I (ISI Mark)
    }

    const stepsText = targetScheme.process_steps
      .map((step) => `Step ${step.step_number}: ${step.title} (${step.estimated_timeline})\n${step.description}\nKey Documents: ${step.required_documents.slice(0, 3).join(', ')}`)
      .join('\n\n');

    return {
      capability: 'PROCESS_WALKTHROUGH',
      capabilityLabel: CAPABILITY_LABELS.PROCESS_WALKTHROUGH,
      groundingStatus: 'GROUNDED',
      confidenceScore: 94,
      matchedStandards: lastStandard ? [lastStandard] : [],
      matchedScheme: targetScheme,
      plainLanguageExplanation: `Step-by-Step Licensing Procedure for ${targetScheme.name}:\n\n${stepsText}\n\nApplication Portal: Submit on ${targetScheme.portal_name} (${targetScheme.portal_url}).`,
      citations: [
        {
          type: 'scheme',
          title: targetScheme.name,
          source_url: targetScheme.source_url,
          relevance_note: `Official procedural rules under ${targetScheme.governing_regulations}`
        },
        {
          type: 'portal',
          title: `${targetScheme.portal_name} Submission Gateway`,
          source_url: targetScheme.portal_url,
          relevance_note: 'Online submission, document upload, and fee payment'
        }
      ],
      proceduralLinks: [
        { label: `Open ${targetScheme.portal_name}`, url: targetScheme.portal_url, note: 'Official application portal' },
        { label: 'BIS Regulations Overview', url: targetScheme.source_url, note: 'Conformity Assessment Regulations' }
      ],
      nextSteps: [
        { id: 'ns-proc-doc', label: `What documents are needed for ${targetScheme.code}?`, prompt: `List all mandatory documentation needed for ${targetScheme.name}`, capability: 'PROCESS_WALKTHROUGH' },
        { id: 'ns-proc-lab', label: 'Where do I find recognized testing labs?', prompt: 'How do I locate a BIS-recognized testing laboratory on LIMS?', capability: 'LAB_FINDER' },
        { id: 'ns-proc-other', label: 'Explain differences between Scheme-I and CRS', prompt: 'What is the difference between Scheme-I (ISI Mark) and CRS (Compulsory Registration)?', capability: 'SCHEME_GUIDANCE' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // 4. Check for Scheme Guidance Queries
  const schemeKeywords = ['scheme', 'schemes', 'isi mark', 'crs', 'fmcs', 'sdoc', 'batch certification', 'scheme-i', 'scheme-ii', 'scheme-iv', 'scheme-x'];
  const isSchemeQuery = schemeKeywords.some((sk) => lower.includes(sk));
  const isSpecificLegalOrFee = lower.includes('penalty') || lower.includes('penalties') || lower.includes('fine') || lower.includes('fee') || lower.includes('cost') || lower.includes('section 29') || lower.includes('act 2016') || lower.includes('about bis') || lower.includes('care app') || lower.includes('know your standard');

  if (isSchemeQuery && !isSpecificLegalOrFee && !lower.includes('water') && !lower.includes('heater') && !lower.includes('led')) {
    let matchedScheme: SchemeInfo | undefined;
    if (lower.includes('crs') || lower.includes('registration scheme')) {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'CRS');
    } else if (lower.includes('fmcs') || lower.includes('foreign') || lower.includes('overseas')) {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'FMCS');
    } else if (lower.includes('scheme 2') || lower.includes('scheme-2') || lower.includes('sdoc')) {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-II');
    } else if (lower.includes('scheme 4') || lower.includes('scheme-4') || lower.includes('batch')) {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-IV');
    } else if (lower.includes('scheme x') || lower.includes('machinery')) {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-X');
    } else {
      matchedScheme = BIS_SCHEMES.find((s) => s.code === 'Scheme-I');
    }

    if (matchedScheme) {
      return {
        capability: 'SCHEME_GUIDANCE',
        capabilityLabel: CAPABILITY_LABELS.SCHEME_GUIDANCE,
        groundingStatus: 'GROUNDED',
        confidenceScore: 90,
        matchedStandards: [],
        matchedScheme,
        plainLanguageExplanation: `${matchedScheme.name}\n\nSummary: ${matchedScheme.short_description}\n\nApplicable To: ${matchedScheme.applicable_to}\n\nKey Distinctions: ${matchedScheme.key_differences}\n\nWho Needs It:\n${matchedScheme.who_needs_it.map((w) => `• ${w}`).join('\n')}`,
        citations: [
          {
            type: 'scheme',
            title: matchedScheme.name,
            source_url: matchedScheme.source_url,
            relevance_note: matchedScheme.governing_regulations
          },
          {
            type: 'portal',
            title: matchedScheme.portal_name,
            source_url: matchedScheme.portal_url,
            relevance_note: 'Online certification portal'
          }
        ],
        proceduralLinks: [
          { label: `Access ${matchedScheme.portal_name}`, url: matchedScheme.portal_url, note: 'Official application portal' },
          { label: 'BIS Schemes Directory', url: 'https://www.bis.gov.in', note: 'All conformity assessment schemes' }
        ],
        nextSteps: [
          { id: 'ns-sch-proc', label: `Walk through the process for ${matchedScheme.code}`, prompt: `Explain the step-by-step licensing process for ${matchedScheme.name}`, capability: 'PROCESS_WALKTHROUGH' },
          { id: 'ns-sch-crs', label: 'Compare Scheme-I vs CRS', prompt: 'How does Scheme-I (ISI Mark) differ from CRS (Compulsory Registration Scheme)?', capability: 'SCHEME_GUIDANCE' },
          { id: 'ns-sch-fmcs', label: 'How does FMCS work for foreign exporters?', prompt: 'Explain the Foreign Manufacturers Certification Scheme (FMCS) requirements and AIR appointment', capability: 'SCHEME_GUIDANCE' }
        ],
        detectedLanguage: detectedLang
      };
    }
  }

  // 5. Check for Testing Lab Finder queries
  const labKeywords = ['lab', 'laboratory', 'testing', 'test lab', 'lims', 'where to test', 'sample test', 'nabl', 'test parameters'];
  const isLabQuery = labKeywords.some((lk) => lower.includes(lk));

  if (isLabQuery) {
    // Check if user mentioned a standard or product
    let relevantStandards = INDIAN_STANDARDS.filter((s) => {
      return tokens.some((t) => s.title.toLowerCase().includes(t) || s.keywords.some((k) => k.includes(t)));
    });

    if (relevantStandards.length === 0 && lastStandard) {
      relevantStandards = [lastStandard];
    }

    const firstStd = relevantStandards[0];
    const disciplineName = firstStd ? firstStd.testing_lab_discipline : 'Electrical & Electronics Testing Laboratory';
    const labGuidance = LAB_FINDER_GUIDELINES.find((g) => g.discipline.includes(disciplineName.split(' ')[0])) || LAB_FINDER_GUIDELINES[0];

    const instructionsText = labGuidance.search_instructions.join('\n');
    const explanation = firstStd
      ? `For ${firstStd.is_number} ("${firstStd.title}"), testing must be conducted at a recognized ${firstStd.testing_lab_discipline}.\n\nKey Test Parameters Required: ${firstStd.key_test_parameters.join(', ')}.\n\nAccreditation Standard: ${labGuidance.accreditation_requirement}\n\nOfficial Search Guide on BIS LIMS (lims.bis.gov.in):\n${instructionsText}`
      : `To locate authorized testing laboratories across India, BIS maintains the official Laboratory Information Management System (LIMS).\n\nAccreditation Standard: ${labGuidance.accreditation_requirement}\n\nHow to search official laboratories on lims.bis.gov.in:\n${instructionsText}`;

    return {
      capability: 'LAB_FINDER',
      capabilityLabel: CAPABILITY_LABELS.LAB_FINDER,
      groundingStatus: 'PROCEDURAL_GUIDE',
      confidenceScore: 88,
      matchedStandards: relevantStandards,
      matchedLabGuidance: labGuidance,
      plainLanguageExplanation: explanation,
      citations: [
        {
          type: 'portal',
          title: 'BIS Laboratory Information Management System (LIMS)',
          source_url: 'https://lims.bis.gov.in',
          relevance_note: 'Official centralized directory of BIS recognized laboratories'
        },
        ...(firstStd
          ? [
              {
                type: 'standard' as const,
                is_number: firstStd.is_number,
                title: firstStd.title,
                scheme: firstStd.scheme,
                source_url: firstStd.source_url,
                relevance_note: `Requires testing under ${firstStd.testing_lab_discipline}`
              }
            ]
          : [])
      ],
      proceduralLinks: [
        { label: 'Search LIMS Lab Directory', url: 'https://lims.bis.gov.in', note: 'Direct search by Indian Standard or Discipline' },
        { label: 'BIS Laboratory Recognition Scheme (LRS)', url: 'https://www.bis.gov.in', note: 'Official guidelines on lab recognition' }
      ],
      nextSteps: [
        { id: 'ns-lab-search', label: 'How to check if a private lab is valid?', prompt: 'How do I verify if a private commercial laboratory is currently recognized by BIS?', capability: 'LAB_FINDER' },
        { id: 'ns-lab-std', label: firstStd ? `Explain certification steps for ${firstStd.is_number}` : 'What standards apply to my product?', prompt: firstStd ? `What is the certification process for ${firstStd.is_number}?` : 'How do I find the standard for my product?', capability: firstStd ? 'PROCESS_WALKTHROUGH' : 'PRODUCT_RECOMMENDER' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // 6. Check for Consumer Queries (Verify ISI, verify HUID, complaints, BIS Care app)
  const consumerKeywords = ['verify', 'complaint', 'fake', 'counterfeit', 'bis care', 'cml', 'r-number', 'check license', 'substandard', 'defective', 'consumer', 'report'];
  const isConsumerQuery = consumerKeywords.some((ck) => lower.includes(ck));

  if (isConsumerQuery) {
    let matchedTopic = CONSUMER_TOPICS[0];
    if (lower.includes('huid') || lower.includes('gold')) {
      matchedTopic = CONSUMER_TOPICS.find((t) => t.category === 'VERIFY_HUID') || CONSUMER_TOPICS[0];
    } else if (lower.includes('complaint') || lower.includes('file') || lower.includes('report') || lower.includes('fake') || lower.includes('defective')) {
      matchedTopic = CONSUMER_TOPICS.find((t) => t.category === 'COMPLAINTS') || CONSUMER_TOPICS[2];
    } else if (lower.includes('care app') || lower.includes('mobile app')) {
      matchedTopic = CONSUMER_TOPICS.find((t) => t.category === 'BIS_CARE_APP') || CONSUMER_TOPICS[3];
    } else if (lower.includes('crs') || lower.includes('electronics') || lower.includes('r-number')) {
      matchedTopic = CONSUMER_TOPICS.find((t) => t.category === 'VERIFY_CRS') || CONSUMER_TOPICS[1];
    }

    return {
      capability: 'CONSUMER_QUERY',
      capabilityLabel: CAPABILITY_LABELS.CONSUMER_QUERY,
      groundingStatus: 'PROCEDURAL_GUIDE',
      confidenceScore: 90,
      matchedStandards: [],
      matchedConsumerTopic: matchedTopic,
      plainLanguageExplanation: `${matchedTopic.title}\n\nSummary: ${matchedTopic.summary}\n\nProcedure:\n${matchedTopic.steps.join('\n')}`,
      citations: [
        {
          type: 'portal',
          title: matchedTopic.portal_label,
          source_url: matchedTopic.portal_url,
          relevance_note: 'Official Government of India verification & grievance portal'
        },
        {
          type: 'portal',
          title: 'BIS Care App — Official Verification Tool',
          source_url: 'https://services.bis.gov.in',
          relevance_note: 'Available on Google Play Store and Apple App Store'
        }
      ],
      proceduralLinks: [
        { label: matchedTopic.portal_label, url: matchedTopic.portal_url, note: 'Direct portal link' },
        { label: 'Download BIS Care App', url: 'https://play.google.com/store/apps/details?id=com.bis.biscareapp', note: 'Verify ISI, CRS, HUID on mobile' }
      ],
      nextSteps: [
        { id: 'ns-cons-huid', label: 'How to verify Hallmarking (HUID)?', prompt: 'How do I verify a 6-digit HUID code on jewellery?', capability: 'HALLMARKING' },
        { id: 'ns-cons-cml', label: 'Where to find CM/L number on an ISI mark?', prompt: 'Where is the CM/L number located on an authentic ISI mark?', capability: 'CONSUMER_QUERY' },
        { id: 'ns-cons-comp', label: 'How to lodge a grievance for defective certified goods?', prompt: 'What is the procedure to file a formal complaint with BIS for defective ISI products?', capability: 'CONSUMER_QUERY' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // 7. Product -> Standard Recommender (Classification & Retrieval)
  // Compute match score against all Indian Standards in our structured dataset
  interface ScoredStandard {
    standard: StandardEntry;
    score: number;
    matchedKeywords: string[];
  }

  const scoredStandards: ScoredStandard[] = INDIAN_STANDARDS.map((std) => {
    // 1. Semantic Relevance Validation: Ensure product terms genuinely match this standard
    const relevance = validateStandardRelevance(cleanQuery, std);
    if (!relevance.isRelevant) {
      return {
        standard: std,
        score: 0,
        matchedKeywords: []
      };
    }

    let score = relevance.score;
    const matchedKws: string[] = [];

    // Check exact keyword array matches
    for (const kw of std.keywords) {
      const kwLower = kw.toLowerCase();
      if (lower.includes(kwLower)) {
        score += 35;
        matchedKws.push(kw);
      }
    }

    // Check common products list
    for (const prod of std.common_products) {
      if (lower.includes(prod.toLowerCase())) {
        score += 30;
      }
    }

    // Check category match
    if (lower.includes(std.category.toLowerCase())) {
      score += 25;
    }

    return {
      standard: std,
      score,
      matchedKeywords: Array.from(new Set(matchedKws))
    };
  });

  scoredStandards.sort((a, b) => b.score - a.score);
  const best = scoredStandards[0];

  // 8. Match against verified 10 Official BIS Government Sources
  const scoredOfficial = matchOfficialBisKnowledge(lower, tokens);
  const bestOfficial = scoredOfficial[0];

  // Prioritize Official BIS Knowledge when the query is institutional, legal, fee, renewal, or app-focused
  // and official knowledge score exceeds product standard match
  if (bestOfficial && bestOfficial.score >= 25 && (!best || bestOfficial.score > best.score)) {
    // Select the top 1 to 3 most relevant official supporting sources (score >= 20 and within 60% of top match)
    const relevantOfficial = scoredOfficial
      .filter((item) => item.score >= 20 && item.score >= bestOfficial.score * 0.6)
      .slice(0, 3);

    const topEntry = bestOfficial.entry;
    const capability = mapCategoryToCapability(topEntry.category);
    const keyFactsFormatted = topEntry.key_facts.map((f) => `• ${f}`).join('\n');

    let officialExplanation = `### ${topEntry.title}\n\n**Retrieved BIS Official Facts & Regulatory Provisions:**\n${keyFactsFormatted}\n\n**Advisory Guidance & Practical Implementation:**\n${topEntry.summary}`;

    if (topEntry.bis_context) {
      officialExplanation += `\n\n*BIS Regulatory Context:* ${topEntry.bis_context}`;
    }

    officialExplanation += `\n\n**Supporting Official BIS Sources Used:**\n` +
      relevantOfficial.map((ro, idx) => `${idx + 1}. **${ro.entry.title}**\n   URL: ${ro.entry.source_url} (${ro.entry.source_name})`).join('\n');

    const officialCitations: CitationItem[] = relevantOfficial.map((ro) => ({
      type: 'official_source' as const,
      title: ro.entry.title,
      source_url: ro.entry.source_url,
      relevance_note: ro.entry.bis_context || `Official provisions from ${ro.entry.source_name}`
    }));

    const proceduralCitations: CitationItem[] = (topEntry.procedural_links || []).slice(0, 2).map((pl) => ({
      type: 'portal' as const,
      title: pl.label,
      source_url: pl.url,
      relevance_note: pl.note
    }));

    return {
      capability,
      capabilityLabel: CAPABILITY_LABELS[capability],
      groundingStatus: 'GROUNDED',
      confidenceScore: Math.min(99, Math.max(82, bestOfficial.score + 20)),
      matchedStandards: [],
      matchedOfficialKnowledge: relevantOfficial.map((ro) => ro.entry),
      plainLanguageExplanation: officialExplanation,
      citations: [...officialCitations, ...proceduralCitations],
      proceduralLinks: topEntry.procedural_links,
      nextSteps: topEntry.next_steps || [
        { id: 'ns-gen-app', label: 'How to apply for an ISI mark license?', prompt: 'What is the step-by-step process to apply for a BIS license on Manakonline?', capability: 'PROCESS_WALKTHROUGH' },
        { id: 'ns-gen-qco', label: 'Check mandatory Quality Control Orders (QCOs)', prompt: 'Which products are under mandatory BIS certification?', capability: 'STANDARD_QA' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // CONFIDENCE GATING:
  // If top match score is below 20, check if official knowledge matches before triggering low confidence fallback
  if (!best || best.score < 20) {
    if (bestOfficial && bestOfficial.score >= 18) {
      const relevantOfficial = scoredOfficial
        .filter((item) => item.score >= 16 && item.score >= bestOfficial.score * 0.6)
        .slice(0, 3);

      const topEntry = bestOfficial.entry;
      const capability = mapCategoryToCapability(topEntry.category);
      const keyFactsFormatted = topEntry.key_facts.map((f) => `• ${f}`).join('\n');

      let officialExplanation = `### ${topEntry.title}\n\n**Retrieved BIS Official Facts & Regulatory Provisions:**\n${keyFactsFormatted}\n\n**Advisory Guidance & Practical Implementation:**\n${topEntry.summary}`;

      if (topEntry.bis_context) {
        officialExplanation += `\n\n*BIS Regulatory Context:* ${topEntry.bis_context}`;
      }

      officialExplanation += `\n\n**Supporting Official BIS Sources Used:**\n` +
        relevantOfficial.map((ro, idx) => `${idx + 1}. **${ro.entry.title}**\n   URL: ${ro.entry.source_url} (${ro.entry.source_name})`).join('\n');

      const officialCitations: CitationItem[] = relevantOfficial.map((ro) => ({
        type: 'official_source' as const,
        title: ro.entry.title,
        source_url: ro.entry.source_url,
        relevance_note: ro.entry.bis_context || `Official guidance from ${ro.entry.source_name}`
      }));

      const proceduralCitations: CitationItem[] = (topEntry.procedural_links || []).slice(0, 2).map((pl) => ({
        type: 'portal' as const,
        title: pl.label,
        source_url: pl.url,
        relevance_note: pl.note
      }));

      return {
        capability,
        capabilityLabel: CAPABILITY_LABELS[capability],
        groundingStatus: 'GROUNDED',
        confidenceScore: Math.min(96, Math.max(76, bestOfficial.score + 15)),
        matchedStandards: [],
        matchedOfficialKnowledge: relevantOfficial.map((ro) => ro.entry),
        plainLanguageExplanation: officialExplanation,
        citations: [...officialCitations, ...proceduralCitations],
        proceduralLinks: topEntry.procedural_links,
        nextSteps: topEntry.next_steps || [
          { id: 'ns-gen-app', label: 'How to apply for an ISI mark license?', prompt: 'What is the step-by-step process to apply for a BIS license on Manakonline?', capability: 'PROCESS_WALKTHROUGH' },
          { id: 'ns-gen-qco', label: 'Check mandatory Quality Control Orders (QCOs)', prompt: 'Which products are under mandatory BIS certification?', capability: 'STANDARD_QA' }
        ],
        detectedLanguage: detectedLang
      };
    }

    return {
      capability: 'PRODUCT_RECOMMENDER',
      capabilityLabel: CAPABILITY_LABELS.PRODUCT_RECOMMENDER,
      groundingStatus: 'LOW_CONFIDENCE',
      confidenceScore: best ? Math.min(35, best.score) : 10,
      matchedStandards: [],
      plainLanguageExplanation: `The requested information could not be verified from the available official BIS sources in my knowledge base.\n\nTo ensure statutory compliance and avoid inaccurate standard citations, please verify directly on the official Bureau of Indian Standards (BIS) databases:`,
      citations: [
        {
          type: 'official_source',
          title: 'BIS Published Standards Directory',
          source_url: 'https://standards.bis.gov.in/website/published-standards/published-standards-list',
          relevance_note: 'Official gazetted register of active, reaffirmed, and superseded Indian Standards'
        },
        {
          type: 'portal',
          title: 'Know Your Standard Search Service',
          source_url: 'https://www.bis.gov.in/know-your-standard/?lang=en',
          relevance_note: 'Search standards by technical committee, keyword, or product title'
        },
        {
          type: 'portal',
          title: 'BIS Standards Formulation & Search Portal',
          source_url: 'https://standards.bis.gov.in',
          relevance_note: 'National Standards Body of India repository'
        }
      ],
      proceduralLinks: [
        { label: 'Published Standards Directory', url: 'https://standards.bis.gov.in/website/published-standards/published-standards-list', note: 'Verify gazetted standards' },
        { label: 'Know Your Standards (BIS Connect)', url: 'https://www.bis.gov.in/know-your-standard/?lang=en', note: 'Search standards by technical committee' },
        { label: 'Search Official Standards Portal', url: 'https://standards.bis.gov.in', note: 'Search by keyword, product name, or ICS code' }
      ],
      nextSteps: [
        { id: 'ns-fallback-ex1', label: 'Try: "Immersion water heater"', prompt: 'What standard applies to immersion water heaters?', capability: 'PRODUCT_RECOMMENDER' },
        { id: 'ns-fallback-ex2', label: 'Try: "LED bulbs for home use"', prompt: 'Which Indian Standard applies to LED bulbs for home use?', capability: 'PRODUCT_RECOMMENDER' },
        { id: 'ns-fallback-ex3', label: 'Try: "Packaged drinking water"', prompt: 'What standard applies to packaged drinking water plants?', capability: 'PRODUCT_RECOMMENDER' }
      ],
      detectedLanguage: detectedLang
    };
  }

  // Filter all standards with score >= 20 or matching category
  const qualifyingStandards = scoredStandards
    .filter((item) => item.score >= 20 || (item.score >= 15 && item.standard.category === best.standard.category))
    .slice(0, 3)
    .map((item) => item.standard);

  const top = qualifyingStandards[0];
  const isMultiple = qualifyingStandards.length > 1;

  // Build plain language explanation distinguishing between retrieved facts and guidance
  let explanation = `### Classification & Standard Recommendation: ${top.is_number}\n\n**Retrieved BIS Standard Specifications & Regulatory Facts:**\n• Applicable Standard: ${top.is_number} — ${top.title}\n• ICS Classification: ICS ${top.ics_code} (${top.ics_chapter})\n• Product Category: ${top.category}\n• Conformity Scheme: ${top.scheme}\n• Mandatory Certification: ${top.mandatory ? `Yes — strictly enforced under ${top.qco_reference}` : 'Voluntary (Manufacturer may apply under Scheme-I for market credibility)'}\n• Scope Summary: ${top.scope_summary}`;

  if (isMultiple) {
    explanation += `\n\n**Related Complementary Standards in this Domain:**\n` + qualifyingStandards.slice(1).map((s) => `• ${s.is_number}: ${s.title} (${s.scheme})`).join('\n');
  }

  explanation += `\n\n**Advisory Compliance Guidance:**\nVerify that factory manufacturing lines and in-house testing equipment comply with the Scheme of Inspection and Testing (SIT) for ${top.is_number}. File application Form-V (Simplified Route) or Form-I (Normal Route) on Manakonline.`;

  explanation += `\n\n**Supporting Official BIS Sources Used:**\n1. **${top.is_number} Official Standard Entry**: ${top.source_url}\n2. **BIS Published Standards Directory**: https://standards.bis.gov.in/website/published-standards/published-standards-list\n3. **BIS Laboratory Information Management System (LIMS)**: https://lims.bis.gov.in/home/labs/`;

  return {
    capability: 'PRODUCT_RECOMMENDER',
    capabilityLabel: CAPABILITY_LABELS.PRODUCT_RECOMMENDER,
    groundingStatus: 'GROUNDED',
    confidenceScore: Math.min(98, Math.max(70, best.score + 25)),
    matchedStandards: qualifyingStandards,
    plainLanguageExplanation: explanation,
    citations: [
      ...qualifyingStandards.map((std) => ({
        type: 'standard' as const,
        is_number: std.is_number,
        title: std.title,
        scheme: std.scheme,
        mandatory: std.mandatory,
        qco_reference: std.qco_reference,
        source_url: std.source_url,
        ics_code: std.ics_code,
        relevance_note: `Conformity required for ${std.category}`
      })),
      {
        type: 'official_source' as const,
        title: 'BIS Published Standards Directory',
        source_url: 'https://standards.bis.gov.in/website/published-standards/published-standards-list',
        relevance_note: 'Official gazetted status and active standard verification'
      }
    ],
    proceduralLinks: [
      { label: `View ${top.is_number} on BIS Portal`, url: top.source_url, note: 'Official text and gazette notice' },
      { label: 'Find Testing Labs on LIMS', url: 'https://lims.bis.gov.in/home/labs/', note: 'Authorized testing laboratories directory' }
    ],
    nextSteps: [
      { id: 'ns-rec-proc', label: `Step-by-step licensing process for ${top.scheme_code}`, prompt: `What is the step-by-step certification process for ${top.scheme_code}?`, capability: 'PROCESS_WALKTHROUGH' },
      { id: 'ns-rec-lab', label: `Find testing labs for ${top.is_number}`, prompt: `What testing laboratory discipline and test parameters are needed for ${top.is_number}?`, capability: 'LAB_FINDER' },
      { id: 'ns-rec-clauses', label: `What are the key safety clauses of ${top.is_number}?`, prompt: `What are the key technical clauses and safety requirements under ${top.is_number}?`, capability: 'STANDARD_QA' }
    ],
    detectedLanguage: detectedLang
  };
}
