import { classifyAndRetrieve } from './src/services/classifierAndRetriever.ts';
import { validateStandardRelevance } from './src/services/semanticRelevanceValidator.ts';
import { INDIAN_STANDARDS } from './src/data/standards.ts';

console.log('--- TEST 1: Semantic Relevance for "ball point pen" ---');
const ballPointQuery = 'ball point pen';
const ballPointMatches = INDIAN_STANDARDS.filter((std) => validateStandardRelevance(ballPointQuery, std).isRelevant);
console.log('Matches for "ball point pen":', ballPointMatches.map((s) => s.is_number));
const retrieval1 = classifyAndRetrieve(ballPointQuery, []);
console.log('Classification Grounding for "ball point pen":', retrieval1.groundingStatus, 'Matched standards count:', retrieval1.matchedStandards.length);

console.log('\n--- TEST 2: Semantic Relevance for "stainless steel water bottle" ---');
const bottleQuery = 'stainless steel water bottle';
const bottleMatches = INDIAN_STANDARDS.filter((std) => validateStandardRelevance(bottleQuery, std).isRelevant);
console.log('Matches for "stainless steel water bottle":', bottleMatches.map((s) => `${s.is_number} (${s.title})`));
const retrieval2 = classifyAndRetrieve(bottleQuery, []);
console.log('Classification Grounding for "stainless steel water bottle":', retrieval2.groundingStatus, 'Top match:', retrieval2.matchedStandards[0]?.is_number);

console.log('\n--- TEST 3: Gold Hallmarking for "gold hallmark" ---');
const hallmarkQuery = 'gold hallmark';
const retrieval3 = classifyAndRetrieve(hallmarkQuery, []);
console.log('Classification Grounding for "gold hallmark":', retrieval3.groundingStatus, 'Capability:', retrieval3.capability);

console.log('\n--- TEST 4: BIS Certification for Electrical Products ---');
const electricalQuery = 'BIS certification for electrical products';
const retrieval4 = classifyAndRetrieve(electricalQuery, []);
console.log('Classification Grounding for electrical products:', retrieval4.groundingStatus, 'Capability:', retrieval4.capability);

console.log('\n--- TEST 5: Ambiguous Query Check ---');
const ambiguousQuery = 'water';
const retrieval5 = classifyAndRetrieve(ambiguousQuery, []);
console.log('Ambiguous query "water" grounding:', retrieval5.groundingStatus, 'Matched standards:', retrieval5.matchedStandards.map(s => s.is_number));

console.log('\nAll tests executed successfully.');
