import { StandardEntry } from '../types/index.ts';

export interface SemanticRelevanceCheck {
  isRelevant: boolean;
  score: number;
  matchedEntity?: string;
  rejectionReason?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'REJECTED';
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COMMON_STOP_WORDS = new Set([
  'i', 'we', 'you', 'they', 'he', 'she', 'it', 'me', 'us', 'my', 'our',
  'manufacture', 'manufacturing', 'manufacturer', 'producers', 'producer',
  'make', 'making', 'maker', 'produce', 'producing', 'sell', 'selling', 'seller',
  'standard', 'standards', 'is', 'for', 'in', 'of', 'and', 'or', 'to', 'a', 'an', 'the',
  'what', 'which', 'how', 'do', 'can', 'find', 'show', 'give', 'tell', 'need', 'want',
  'bis', 'isi', 'mark', 'certification', 'certified', 'licence', 'license', 'scheme',
  'apply', 'applies', 'applicable', 'test', 'tests', 'testing', 'clause', 'clauses',
  'detail', 'details', 'check', 'checking', 'rule', 'rules', 'regulation', 'regulations'
]);

/**
 * Validates whether an Indian Standard genuinely relates to the user's search query.
 * Rejects spurious substring matches (e.g. "ball point pen" matching "self-ballasted LED lamps" due to substring "ball").
 */
export function validateStandardRelevance(
  rawQuery: string,
  standard: StandardEntry
): SemanticRelevanceCheck {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return {
      isRelevant: true,
      score: 50,
      confidence: 'MEDIUM'
    };
  }

  // 1. Direct IS number match (e.g., "IS 17803", "17803", "302", "14543")
  const queryDigits = query.replace(/\D/g, '');
  const stdDigits = standard.is_number.replace(/\D/g, '');
  if (
    standard.is_number.toLowerCase().includes(query) ||
    (queryDigits.length >= 3 && stdDigits.includes(queryDigits))
  ) {
    return {
      isRelevant: true,
      score: 100,
      matchedEntity: standard.is_number,
      confidence: 'HIGH'
    };
  }

  // 2. Tokenize user query and filter out common query stopwords
  const rawTokens = query
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const meaningfulTokens = rawTokens.filter((t) => !COMMON_STOP_WORDS.has(t));

  if (meaningfulTokens.length === 0) {
    return {
      isRelevant: false,
      score: 0,
      rejectionReason: 'Query consists only of generic search words without a product or standard name',
      confidence: 'LOW'
    };
  }

  // 3. Exact common products or keyword phrase match
  const cleanPhrase = meaningfulTokens.join(' ');
  for (const prod of standard.common_products) {
    const prodLower = prod.toLowerCase();
    if (prodLower === cleanPhrase || prodLower.includes(cleanPhrase) || cleanPhrase.includes(prodLower)) {
      return {
        isRelevant: true,
        score: 95,
        matchedEntity: prod,
        confidence: 'HIGH'
      };
    }
  }

  for (const kw of standard.keywords) {
    const kwLower = kw.toLowerCase();
    if (kwLower === cleanPhrase || kwLower.includes(cleanPhrase)) {
      return {
        isRelevant: true,
        score: 90,
        matchedEntity: kw,
        confidence: 'HIGH'
      };
    }
  }

  // 4. Whole-Word Token Boundary Matching against Title, Keywords, and Scope
  // CRITICAL: We enforce boundary checks \b<token>\b so that:
  // "ball" does NOT match "self-ballasted"
  // "pen" does NOT match "dispenser" or "compensate"
  // "car" does NOT match "carbon"
  let matchedTokenCount = 0;
  const matchedTokens: string[] = [];

  const searchableFields = [
    standard.title.toLowerCase(),
    ...standard.keywords.map((k) => k.toLowerCase()),
    ...standard.common_products.map((p) => p.toLowerCase()),
    standard.category.toLowerCase()
  ].join(' ');

  for (const token of meaningfulTokens) {
    // Only check whole words of 2+ letters
    if (token.length < 2) continue;

    const boundaryRegex = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i');
    if (boundaryRegex.test(searchableFields)) {
      matchedTokenCount++;
      matchedTokens.push(token);
    }
  }

  // 5. Semantic Product Category Incompatibility Guard
  // Specific checks for known distractor combinations:
  // Query: "ball point pen" (stationery) vs Standard: "Self-Ballasted LED Lamps" (lighting)
  const isPenQuery = meaningfulTokens.includes('pen') || meaningfulTokens.includes('pens');
  const isStationeryStandard = standard.category.toLowerCase().includes('stationery') ||
    standard.title.toLowerCase().includes('pen') ||
    standard.title.toLowerCase().includes('writing');

  if (isPenQuery && !isStationeryStandard) {
    return {
      isRelevant: false,
      score: 0,
      rejectionReason: `Query refers to writing instruments ("${cleanPhrase}"), which does not match "${standard.title}"`,
      confidence: 'REJECTED'
    };
  }

  // Ratio of matched meaningful tokens
  const matchRatio = matchedTokenCount / meaningfulTokens.length;

  // If query had multiple meaningful words (e.g. "ball point pen" = 3 words),
  // but only 0 or 1 incidental word matched, reject as unrelated.
  if (meaningfulTokens.length >= 2 && matchedTokenCount === 0) {
    return {
      isRelevant: false,
      score: 0,
      rejectionReason: `No verified semantic match found in "${standard.title}" for "${cleanPhrase}"`,
      confidence: 'REJECTED'
    };
  }

  if (meaningfulTokens.length >= 3 && matchRatio < 0.4) {
    return {
      isRelevant: false,
      score: Math.round(matchRatio * 50),
      rejectionReason: `Insufficient semantic relevance (${matchedTokenCount} of ${meaningfulTokens.length} terms matched in "${standard.title}")`,
      confidence: 'LOW'
    };
  }

  if (matchedTokenCount > 0) {
    const score = Math.round(matchRatio * 85);
    return {
      isRelevant: matchRatio >= 0.3 || matchedTokenCount >= 2,
      score,
      matchedEntity: matchedTokens.join(', '),
      confidence: matchRatio >= 0.6 ? 'HIGH' : 'MEDIUM'
    };
  }

  return {
    isRelevant: false,
    score: 0,
    rejectionReason: `No substantive semantic overlap with "${standard.title}"`,
    confidence: 'REJECTED'
  };
}
