import { OfficialBisKnowledgeEntry } from '../types/index.ts';

/**
 * Official Bureau of Indian Standards (BIS) Verified Knowledge Base
 * Extracted, structured, and verified directly from the 10 official BIS government sources:
 * 1. https://www.bis.gov.in/know-your-standard/?lang=en
 * 2. https://standards.bis.gov.in/
 * 3. https://standards.bis.gov.in/website/published-standards/published-standards-list
 * 4. https://www.bis.gov.in/the-bureau/bis-act-rules-and-regulations/?lang=en
 * 5. https://www.bis.gov.in/product-certification/product-certification-process/?lang=en
 * 6. https://www.bis.gov.in/product-certification/product-specific-guidelines/?lang=en
 * 7. https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en
 * 8. https://lims.bis.gov.in/
 * 9. https://lims.bis.gov.in/home/labs/
 * 10. https://www.bis.gov.in/hallmarking-overview/?lang=en
 * Plus additional integrated official portals for Fees, Renewals, FMCS, Mobile Apps, Consumer Affairs, and Resources.
 */
export const OFFICIAL_BIS_KNOWLEDGE: OfficialBisKnowledgeEntry[] = [
  // -------------------------------------------------------------------------
  // 1. Know Your Standard — Search & Discovery Service
  // Source: https://www.bis.gov.in/know-your-standard/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-know-your-standard',
    category: 'KNOW_YOUR_STANDARD',
    title: 'Know Your Standard — BIS Online Search & Classification Portal',
    summary: 'The "Know Your Standard" portal is the official discovery engine enabling manufacturers, exporters, testing labs, and consumers to identify applicable Indian Standards by keyword, product name, title, or Sectional Committee.',
    bis_context: 'Official public search interface under BIS Connect for exploring 21,000+ formulated standards, tracking revisions, amendments, and sectional committee allocations.',
    key_facts: [
      'Multi-Parameter Search: Allows search by Product Keyword, Standard Title, Indian Standard Number (IS number, e.g., IS 302, IS 14543), International Classification for Standards (ICS code), or Technical Sectional Committee.',
      'Lifecycle Status Tracking: Displays whether an Indian Standard is Active, Amended, Under Revision, Reaffirmed, Superseded, or Withdrawn.',
      'Amendment Details: Provides complete amendment lists, dates of gazette enforcement, and transitional periods for compliance.',
      'Sectional Committee Mapping: Links each standard to its governing Technical Division (such as Electrotechnical Division - ETD, Civil Engineering Division - CED, Food & Agriculture - FAD, Chemical - CHD, etc.).',
      'Free Preview & Scope Scrutiny: Provides summary of scope, normative references, and classification clauses so businesses can assess applicability before purchasing standard texts.'
    ],
    keywords: [
      'know your standard', 'search indian standards', 'find is number', 'standard status',
      'reaffirmed', 'amendments', 'ics code', 'technical committee', 'sectional committee',
      'check standard', 'standard directory', 'standards bis connect'
    ],
    source_url: 'https://www.bis.gov.in/know-your-standard/?lang=en',
    source_name: 'BIS Official Portal — Know Your Standard',
    procedural_links: [
      { label: 'Access Know Your Standard Portal', url: 'https://www.bis.gov.in/know-your-standard/?lang=en', note: 'Search standards by keyword, IS number, or subject' },
      { label: 'BIS Standards Search Database', url: 'https://standards.bis.gov.in/', note: 'National repository of over 21,000+ Indian Standards' }
    ],
    next_steps: [
      { id: 'ns-kys-search', label: 'Find applicable standard for my product', prompt: 'Which Indian Standard applies to my manufactured item?', capability: 'PRODUCT_RECOMMENDER' },
      { id: 'ns-kys-view', label: 'How can I view Indian Standards for free?', prompt: 'How does BIS provide free read-only viewing of Indian Standards?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 2. BIS Standards Portal & Standards National Action Plan (SNAP)
  // Source: https://standards.bis.gov.in/
  // -------------------------------------------------------------------------
  {
    id: 'bis-standards-portal-snap',
    category: 'STANDARDS_PORTAL',
    title: 'BIS Standards Portal — Standards National Action Plan (SNAP) & E-Sale',
    summary: 'The central national standards repository (standards.bis.gov.in) hosts over 21,000+ formulated Indian Standards across 15 technical divisions, supporting public wide circulation comments, electronic purchasing, and the Standards National Action Plan (SNAP).',
    bis_context: 'Central repository for Indian Standards formulation, public wide circulation reviews, online e-Sale of authenticated PDF standards, and strategic alignment with international standards bodies (ISO/IEC).',
    key_facts: [
      'Comprehensive Catalog: Encompasses over 21,000+ formulated Indian Standards spanning Civil, Mechanical, Electrotechnical, Electronics & IT, Chemical, Food & Agriculture, Textile, Medical, Metallurgy, Transport, Petroleum, Water Resources, Management Systems, and Services.',
      'Free Read-Only Access: Under the Government of India transparency initiatives, complete text of Indian Standards can be viewed online free of charge in read-only mode for students, researchers, and public stakeholders.',
      'Wide Circulation & Public Comments: Draft standards and proposed amendments are placed in wide circulation on the portal for public and industry scrutiny for 30 to 60 days before formal adoption.',
      'Standards National Action Plan (SNAP): Strategic standardization roadmap harmonizing national standards with United Nations Sustainable Development Goals (SDGs), emerging technologies (AI, EV charging, green hydrogen, IoT), and international standards (ISO/IEC).',
      'Official E-Sale: Authenticated digital copies of Indian Standards with unique purchaser watermarks can be legally acquired via the e-Sale portal.'
    ],
    keywords: [
      'standards portal', 'standards.bis.gov.in', 'standards national action plan', 'snap',
      'e-sale', 'free reading of standards', 'public comments', 'wide circulation',
      '15 technical divisions', '21000 standards', 'draft standards'
    ],
    source_url: 'https://standards.bis.gov.in/',
    source_name: 'Bureau of Indian Standards — Standards Portal',
    procedural_links: [
      { label: 'BIS Standards Formulation & Catalog Portal', url: 'https://standards.bis.gov.in/', note: 'Access 21,000+ Indian Standards, SNAP, and draft standards' },
      { label: 'E-Sale of Standards Gateway', url: 'https://standards.bis.gov.in/', note: 'Official purchasing of standard texts and amendments' }
    ],
    next_steps: [
      { id: 'ns-std-snap', label: 'Explain the Standards National Action Plan (SNAP)', prompt: 'What is the Standards National Action Plan (SNAP) and its focus areas?', capability: 'GENERAL_HELP' },
      { id: 'ns-std-draft', label: 'How can I submit public comments on draft standards?', prompt: 'What is the procedure to submit comments on draft Indian Standards in wide circulation?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 3. Published Standards List & Gazette Catalog
  // Source: https://standards.bis.gov.in/website/published-standards/published-standards-list
  // -------------------------------------------------------------------------
  {
    id: 'bis-published-standards-list',
    category: 'PUBLISHED_STANDARDS',
    title: 'BIS Published Standards Directory & Gazette Notifications List',
    summary: 'The Published Standards List repository provides the definitive gazetted register of all published Indian Standards, including their year of adoption, reaffirmed status, active amendments, ICS codes, and gazette notification references.',
    bis_context: 'Authoritative national gazetted catalog of in-force, reaffirmed, amended, and superseded standards, serving as primary evidence for regulatory conformity and court references.',
    key_facts: [
      'Definitive Gazette Record: Lists every standard published in the Official Gazette of India by the Bureau of Indian Standards in accordance with Section 10 of the BIS Act 2016.',
      'Active vs Superseded Status: Explicitly indicates whether a standard remains in active force or has been superseded by a newer revision or withdrawal order.',
      'Publication Year & Reaffirmation: Standards are systematically reviewed by technical committees every 5 years; if no changes are warranted, they are officially re-affirmed (e.g. IS 302-1:2008 Reaffirmed 2023).',
      'ICS Chapter Alignment: Every published standard is categorized under International Classification for Standards (ICS) code to harmonize Indian trade classifications with WTO and international norms.',
      'Regulatory Authority: Only standards listed in the Published Standards Directory carry statutory legal standing for mandatory Quality Control Orders (QCOs) issued by central line ministries.'
    ],
    keywords: [
      'published standards list', 'published standards', 'standards list', 'gazette notifications',
      'active standards', 'superseded standards', 'withdrawn standards', 'reaffirmed standards',
      'year of adoption', 'is catalog', 'official gazette', 'statutory standard record'
    ],
    source_url: 'https://standards.bis.gov.in/website/published-standards/published-standards-list',
    source_name: 'BIS Standards Portal — Published Standards List',
    procedural_links: [
      { label: 'BIS Published Standards Directory', url: 'https://standards.bis.gov.in/website/published-standards/published-standards-list', note: 'Official gazetted registry of all active and amended Indian Standards' },
      { label: 'BIS Central Standards Repository', url: 'https://standards.bis.gov.in/', note: 'Access formulation details, draft circulation, and online purchases' }
    ],
    next_steps: [
      { id: 'ns-pub-check', label: 'Verify if a standard is active or superseded', prompt: 'How can I verify if an Indian Standard has been superseded or reaffirmed?', capability: 'STANDARD_QA' },
      { id: 'ns-pub-gazette', label: 'Check gazette notification dates for standards', prompt: 'Where are gazette notification dates for new Indian Standards published?', capability: 'STANDARD_QA' }
    ]
  },

  // -------------------------------------------------------------------------
  // 4. BIS Act, Rules, Regulations & Penalties
  // Source: https://www.bis.gov.in/the-bureau/bis-act-rules-and-regulations/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-act-rules-regulations',
    category: 'BIS_ACT_REGULATIONS',
    title: 'The BIS Act 2016, Rules, Regulations & Statutory Penalties',
    summary: 'The Bureau of Indian Standards Act, 2016 (Act No. 11 of 2016) establishes BIS as the National Standards Body of India, granting statutory enforcement powers, notification of mandatory Quality Control Orders (QCOs), and stringent legal penalties for non-compliance.',
    bis_context: 'Primary legal and constitutional framework governing standard-setting, compulsory certification orders (QCOs), search-and-seizure operations, and penal liabilities in India.',
    key_facts: [
      'Statutory Foundation: Enacted by the Parliament of India, repealing the earlier BIS Act 1986. Entered into full force on 12 October 2017.',
      'Mandatory Certification Powers (Section 16): Empowers the Central Government (in consultation with BIS) to notify mandatory Quality Control Orders (QCOs) for any article, process, or service in the interest of national security, health, safety, environment, or prevention of deceptive practices.',
      'Prohibition of Improper Use of Standard Mark (Section 14 & 15): No person or corporation may manufacture, import, store, exhibit, or sell notified goods without an authentic BIS Standard Mark or valid licence.',
      'Search and Seizure Powers (Section 28): BIS investigating officers are legally empowered to enter premises, inspect records, seize non-conforming goods, counterfeit monograms, or illegal testing tools without prior notice.',
      'Penalties for Unauthorized Use (Section 29): Fine of at least ₹2,00,000 up to ₹5,00,000 for first offence, or up to ten times the value of manufactured/sold articles; and imprisonment up to 2 years for subsequent violations.',
      'Compounding of Offences (Section 33): Certain first-time contraventions can be compounded by designated BIS Directorates upon payment of prescribed compounding sums.',
      'Consumer Compensation (Section 18): Consumers receiving substandard certified goods can claim compensation directly through consumer commissions and BIS redressal channels.'
    ],
    keywords: [
      'bis act 2016', 'bis rules', 'bis regulations', 'act no 11 of 2016', 'section 16',
      'mandatory qco', 'quality control order', 'section 14', 'section 28', 'section 29',
      'penalties', 'imprisonment', 'search and seizure', 'counterfeit isi', 'statutory powers'
    ],
    source_url: 'https://www.bis.gov.in/the-bureau/bis-act-rules-and-regulations/?lang=en',
    source_name: 'BIS Official Portal — BIS Act, Rules and Regulations',
    procedural_links: [
      { label: 'BIS Act, Rules & Regulations Text', url: 'https://www.bis.gov.in/the-bureau/bis-act-rules-and-regulations/?lang=en', note: 'Full gazette text of the Act, 2018 Rules, and Conformity Assessment Regulations' },
      { label: 'Mandatory QCOs Gazetted List', url: 'https://www.bis.gov.in/the-bureau/bis-act-rules-and-regulations/?lang=en', note: 'Search all mandatory Quality Control Orders notified by line ministries' }
    ],
    next_steps: [
      { id: 'ns-act-qco', label: 'Is certification mandatory for my product under a QCO?', prompt: 'How do I know if my product falls under a mandatory Quality Control Order (QCO)?', capability: 'STANDARD_QA' },
      { id: 'ns-act-penalty', label: 'What are the legal consequences of selling goods with a fake ISI mark?', prompt: 'What are the legal penalties under Section 29 of the BIS Act 2016 for misuse of the ISI mark?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 5. Product Certification Process & Factory Inspection
  // Source: https://www.bis.gov.in/product-certification/product-certification-process/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-certification-process-walkthrough',
    category: 'CERTIFICATION_PROCESS',
    title: 'The Product Certification Process — 12-Step Lifecycle from Standard to Marking',
    summary: 'The complete journey for acquiring and maintaining a BIS ISI Mark licence follows an authoritative conformity assessment lifecycle mandated under the BIS (Conformity Assessment) Regulations, 2018.',
    bis_context: 'Official regulatory procedural pathway governing manufacturing licence applications, factory audits, sample dispatch, independent testing, grant, and surveillance.',
    key_facts: [
      'Step 1 — Standard Identification: Determine applicable Indian Standard (IS), latest amendments, and gazette QCO mandatory status.',
      'Step 2 — Scheme Selection: Confirm certification scheme (Scheme-I for ISI Mark, Scheme-II for CRS, or FMCS for foreign factories).',
      'Step 3 — Product-Specific Guidelines (PSG/PSI): Review Scheme of Inspection and Testing (SIT), sampling frequencies, and grouping rules.',
      'Step 4 — Factory & Lab Commissioning: Establish in-house testing facility equipped with all required instruments and NABL calibration certificates.',
      'Step 5 — Pre-Testing (Optional for Simplified Route): Obtain independent passing test report (< 90 days old) from BIS-recognized laboratory.',
      'Step 6 — Portal Application: File Form-I / Form-V on Manakonline with factory layout, machinery list, raw material test certificates, and fee.',
      'Step 7 — Document Scrutiny: BIS scrutiny officer examines submission; clarifies queries within 7 to 10 days.',
      'Step 8 — Preliminary Factory Audit: BIS technical officer inspects plant, verifies manufacturing controls, witnesses routine testing in factory lab, and reviews SIT records.',
      'Step 9 — Sample Drawing & Sealing: Auditor draws random factory sample, seals counter-samples, and dispatches to BIS or recognized laboratory.',
      'Step 10 — Independent Type Testing: Complete testing conducted per standard clauses on LIMS network.',
      'Step 11 — Conformity Decision & Grant: On test clearance, applicant deposits minimum marking fee and receives official CM/L (Certification Marks / Licence) number.',
      'Step 12 — Marking & Surveillance: Affix authentic ISI mark; participate in unannounced periodic surveillance audits and retail market sample testing.'
    ],
    keywords: [
      'product certification process', 'certification process 4', '12 step journey',
      'factory audit', 'factory inspection', 'sample drawing', 'independent testing',
      'grant of licence', 'cml number', 'marking fee', 'surveillance audit', 'market sampling'
    ],
    source_url: 'https://www.bis.gov.in/product-certification/product-certification-process/?lang=en',
    source_name: 'BIS Official Portal — Product Certification Process',
    procedural_links: [
      { label: 'BIS Product Certification Process Guide', url: 'https://www.bis.gov.in/product-certification/product-certification-process/?lang=en', note: 'Official process flow diagram and step descriptions' },
      { label: 'Certification Process Details (Process 4)', url: 'https://www.bis.gov.in/certification-process-4/?lang=en', note: 'In-depth breakdown of factory audit and sample drawing protocols' }
    ],
    next_steps: [
      { id: 'ns-prc-audit', label: 'What occurs during a BIS factory audit?', prompt: 'What happens during a BIS factory audit and what do auditors inspect?', capability: 'PROCESS_WALKTHROUGH' },
      { id: 'ns-prc-sample', label: 'How are samples drawn and tested in BIS referral labs?', prompt: 'How does the BIS officer draw and seal factory samples for testing on LIMS?', capability: 'PROCESS_WALKTHROUGH' }
    ]
  },

  // -------------------------------------------------------------------------
  // 6. Product-Specific Guidelines (PSG) & Scheme of Inspection and Testing (SIT)
  // Source: https://www.bis.gov.in/product-certification/product-specific-guidelines/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-product-specific-guidelines',
    category: 'PRODUCT_SPECIFIC_GUIDELINES',
    title: 'Product-Specific Guidelines (PSG/PSI) & Scheme of Inspection and Testing (SIT)',
    summary: 'Product-Specific Information (PSI) and Scheme of Inspection and Testing (SIT) documents published by BIS define precise manufacturing quality benchmarks, mandatory in-house testing equipment, sampling intervals, and grouping rules.',
    bis_context: 'Technical blueprint dictating day-to-day factory quality controls, required in-house test benches, calibration standards, and representative sample selection rules.',
    key_facts: [
      'Scheme of Inspection and Testing (SIT): Every Indian Standard has a dedicated SIT specifying the "Levels of Control" that a licensee must maintain during daily production.',
      'Routine vs Acceptance Tests: SIT categorizes tests into Routine Tests (conducted on 100% of finished units or frequent batches on-site), Acceptance Tests (conducted on every production lot), and Type Tests (comprehensive evaluation).',
      'Mandatory In-House Testing Equipment: Product guidelines provide an itemized list of test equipment, measuring instruments, and calibrated gauges that the factory must physically possess in operating condition.',
      'Grouping Guidelines: To minimize testing expenses for manufacturers producing multiple sizes, varieties, or ratings of a product under one standard, BIS publishes Grouping Guidelines indicating which representative variety must be tested to cover the entire series.',
      'Raw Material Quality Specifications: Mandates that raw materials must either be ISI certified or tested in-house/accompanied by Mill Test Certificates (MTCs) before entering the assembly line.',
      'Logbook and Record Retention: All routine test registers, batch cards, and calibration logs must be systematically retained at the factory for a minimum of 3 years for scrutiny during unannounced surveillance audits.'
    ],
    keywords: [
      'product specific guideline', 'product specific information', 'sit', 'scheme of inspection and testing',
      'levels of control', 'in-house testing equipment', 'routine tests', 'acceptance tests',
      'grouping guidelines', 'variety testing', 'raw material test certificate', 'record retention'
    ],
    source_url: 'https://www.bis.gov.in/product-certification/product-specific-guidelines/?lang=en',
    source_name: 'BIS Official Portal — Product Specific Guidelines',
    procedural_links: [
      { label: 'BIS Product Specific Guidelines Portal', url: 'https://www.bis.gov.in/product-certification/product-specific-guidelines/?lang=en', note: 'Product specific technical requirements and SIT documents' },
      { label: 'Product Specific Information Directory', url: 'https://www.bis.gov.in/product-certification/product-specific-information-2/?lang=en', note: 'Search SIT, in-house lab checklists, and grouping rules' }
    ],
    next_steps: [
      { id: 'ns-psg-sit', label: 'What is a Scheme of Inspection and Testing (SIT)?', prompt: 'Explain the purpose and components of the BIS Scheme of Inspection and Testing (SIT).', capability: 'STANDARD_QA' },
      { id: 'ns-psg-group', label: 'How do Grouping Guidelines work for multiple product models?', prompt: 'How do BIS grouping guidelines work for testing different models of a product series?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 7. Product Certification FAQs — Operational Rules
  // Source: https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-certification-faqs',
    category: 'PRODUCT_CERTIFICATION_FAQ',
    title: 'Product Certification FAQs — Operational Rules, Validity & Transferability',
    summary: 'Official answers to common industrial and legal questions regarding ISI mark ownership, licence validity periods, transferability restrictions, premises relocation, and cancellation grounds.',
    bis_context: 'Official administrative guidelines addressing operational hurdles, plant relocation endorsements, multi-plant licensing, and Stop Marking consequences.',
    key_facts: [
      'What is an ISI Mark? The ISI Mark is the premier registered certification mark for industrial products in India, demonstrating conformity to the relevant Indian Standard under Scheme-I.',
      'Licence Per Factory Premise: A BIS licence is granted for a specific factory manufacturing location. If a company operates three manufacturing plants, each plant must apply for and hold an individual CM/L licence.',
      'Transferability Prohibition: A licence cannot be transferred to another individual, partnership, or corporate entity, nor can it be transferred to different premises without prior approval and physical inspection by BIS.',
      'Initial Validity Period: Granted initially for 1 or 2 years, with eligibility to renew for up to 5 years upon consistent compliance.',
      'Relocation of Manufacturing Plant: If a licensee shifts factory premises, an endorsement application must be filed immediately; manufacturing under the old CM/L must halt until BIS inspects the new facility and endorses the change of address.',
      'Stop Marking Orders: Issued if surveillance factory/market samples fail standard requirements, or if the manufacturer fails to maintain the Scheme of Inspection and Testing (SIT). Affixing the mark during a Stop Marking order is a criminal offence under Section 29.',
      'Cancellation / Expiry Grounds: Non-payment of marking fees, repeated sample failures, cessation of manufacturing for prolonged periods, or failure to submit timely renewal returns.'
    ],
    keywords: [
      'product certification faq', 'certification questions', 'cml validity', 'licence transfer',
      'shift factory', 'change of location', 'stop marking', 'licence cancellation',
      'separate licence per factory', 'trader cannot apply', 'faq bis'
    ],
    source_url: 'https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en',
    source_name: 'BIS Official Portal — Product Certification FAQ',
    procedural_links: [
      { label: 'BIS Product Certification FAQs', url: 'https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en', note: 'Frequently asked questions on licensing, compliance, and legal status' }
    ],
    next_steps: [
      { id: 'ns-faq-relocate', label: 'What is the procedure if I relocate my factory?', prompt: 'What is the procedure to change factory address or premises for an existing BIS license?', capability: 'GENERAL_HELP' },
      { id: 'ns-faq-stop', label: 'How to revoke a Stop Marking order?', prompt: 'What actions must a manufacturer take to lift a BIS Stop Marking notice?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 8. Laboratory Information Management System (LIMS)
  // Source: https://lims.bis.gov.in/
  // -------------------------------------------------------------------------
  {
    id: 'bis-lims-laboratory-network',
    category: 'LABORATORY_LIMS',
    title: 'BIS Laboratory Information Management System (LIMS) — Architecture & Workflow',
    summary: 'The BIS Laboratory Information Management System (LIMS) is the integrated digital nerve center managing applicant testing, surveillance sample allocation, blind sample coding, and electronic test report generation.',
    bis_context: 'Secure digital infrastructure enforcing blind sample coding, integrity in referral testing, and seamless interface between factories, testing laboratories, and certifying officers.',
    key_facts: [
      'Blind Sample Coding: To eliminate commercial bias or tampering, all samples drawn during factory audits or market surveillance are assigned encrypted blind codes before reaching laboratory testing analysts.',
      'End-to-End Tracking: Licensees, branch officers, and laboratories track sample receipt, conditioning status, testing progress, and final test certificates in real-time.',
      'Digital Signatures: Test reports generated through LIMS are digitally signed by authorized laboratory signatories and automatically synched with the Manakonline certification workflow.',
      'Integrated Network: Connects the BIS Central Laboratory, 4 Regional Laboratories, 3 Branch Laboratories, and over 250+ private and government empanelled testing facilities.',
      'Laboratory Recognition Scheme (LRS): Governs statutory accreditation benchmarks, proficiency testing (PT), and inter-laboratory comparisons required for external testing institutions.'
    ],
    keywords: [
      'lims', 'laboratory information management system', 'lims.bis.gov.in', 'blind coding',
      'sample tracking', 'digital test reports', 'lrs', 'laboratory recognition scheme',
      'testing workflow', 'central laboratory sahibabad', 'inter-laboratory comparison'
    ],
    source_url: 'https://lims.bis.gov.in/',
    source_name: 'BIS Laboratory Information Management System (LIMS)',
    procedural_links: [
      { label: 'BIS LIMS Central Portal', url: 'https://lims.bis.gov.in/', note: 'Official Laboratory Information Management System gateway' },
      { label: 'BIS Directory of Testing Laboratories', url: 'https://lims.bis.gov.in/home/labs/', note: 'Search accredited laboratories by Indian Standard and location' }
    ],
    next_steps: [
      { id: 'ns-lims-flow', label: 'How does blind coding protect test integrity?', prompt: 'How does the BIS LIMS blind sample coding system work during factory audits?', capability: 'LAB_FINDER' },
      { id: 'ns-lims-time', label: 'How long does type testing take on LIMS?', prompt: 'What is the standard testing turnaround time on the BIS LIMS network?', capability: 'LAB_FINDER' }
    ]
  },

  // -------------------------------------------------------------------------
  // 9. BIS Directory of Testing Laboratories
  // Source: https://lims.bis.gov.in/home/labs/
  // -------------------------------------------------------------------------
  {
    id: 'bis-lims-labs-directory',
    category: 'LABS_DIRECTORY',
    title: 'BIS Directory of Testing Laboratories — Search Recognized & Empanelled Facilities',
    summary: 'The official Directory of Laboratories on LIMS provides an interactive public search tool to find accredited testing facilities by Indian Standard number, testing discipline, state, and city.',
    bis_context: 'Public directory allowing applicants and manufacturers under the Simplified Route to identify accredited facilities with valid testing scope for their specific product standard.',
    key_facts: [
      'Search by Standard: Users input any Indian Standard (e.g., IS 302-2-15, IS 14543, IS 16102) to get an immediate list of all recognized laboratories possessing valid testing scope.',
      'Discipline Categorization: Laboratories are classified across major disciplines: Chemical, Electrical, Electronics, Mechanical, Microbiological, Civil, and Textile.',
      'Accreditation Verification: Lists NABL accreditation certificate numbers, ISO/IEC 17025 validity periods, and BIS LRS validity dates for each laboratory facility.',
      'Geographical Filtering: Allows filtering by state and city so applicants can identify local testing facilities, minimizing sample transit time and fragile goods shipping costs.',
      'Mandatory for Simplified Route: Under Option 2 (Simplified Route), pre-application test reports are only legally accepted if executed by a laboratory actively listed in this directory.'
    ],
    keywords: [
      'labs directory', 'find labs', 'lims.bis.gov.in/home/labs/', 'testing facilities',
      'recognized laboratories', 'empanelled labs', 'search labs by standard', 'lab search',
      'electrical lab', 'chemical lab', 'microbiological lab', 'nabl testing lab'
    ],
    source_url: 'https://lims.bis.gov.in/home/labs/',
    source_name: 'BIS LIMS — Directory of Testing Laboratories',
    procedural_links: [
      { label: 'Directory of Recognized Labs Portal', url: 'https://lims.bis.gov.in/home/labs/', note: 'Search laboratories by Indian Standard, discipline, and state' },
      { label: 'BIS LIMS Home', url: 'https://lims.bis.gov.in/', note: 'Central laboratory management system' }
    ],
    next_steps: [
      { id: 'ns-dir-search', label: 'Find a recognized lab for my product standard', prompt: 'Which BIS recognized testing laboratories are available for my standard in my state?', capability: 'LAB_FINDER' },
      { id: 'ns-dir-acc', label: 'What accreditation must a lab hold to test BIS samples?', prompt: 'What are the ISO/IEC 17025 and NABL accreditation requirements for BIS empanelled labs?', capability: 'LAB_FINDER' }
    ]
  },

  // -------------------------------------------------------------------------
  // 10. Hallmarking of Gold & Silver Artefacts — The 3 Mandatory Marks & HUID
  // Source: https://www.bis.gov.in/hallmarking-overview/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-hallmarking-overview-huid',
    category: 'HALLMARKING_OVERVIEW',
    title: 'Hallmarking of Gold and Silver Artefacts — The 3 Mandatory Marks & HUID',
    summary: 'Hallmarking is the accurate determination and official recording of the proportionate content of precious metal in gold and silver articles under the BIS Act 2016, protecting consumers against adulteration.',
    bis_context: 'Consumer protection and purity regulation governing compulsory hallmarking of gold jewellery, Assaying & Hallmarking Centres (AHCs), and 6-digit alphanumeric HUID tracking.',
    key_facts: [
      'Compulsory Hallmarking: Mandatory in notified districts across India for 14, 18, 20, 22, 23, and 24-karat gold jewellery and artefacts.',
      'The 3 Authentic Hallmarks: (1) The BIS Logo (triangular mark), (2) Purity/Fineness grade (e.g., 22K916 for 91.6% gold, 18K750 for 75% gold, 14K585 for 58.5% gold), and (3) 6-digit alphanumeric Hallmark Unique Identification (HUID).',
      'HUID Traceability: Every single piece of hallmarked jewellery is laser-inscribed with a unique 6-character code (e.g., AB12CD) generated on the BIS Hallmarking Portal at an authorized Assaying & Hallmarking Centre (AHC).',
      'Consumer Verification: Buyers can verify the genuineness of HUID on the official BIS Care Mobile App before making payment, displaying jewellery type, date of hallmarking, and AHC registration details.',
      'Exemptions: Exported jewellery, items weighing less than 2 grams, and industrial gold products are exempt from compulsory domestic hallmarking.'
    ],
    keywords: [
      'hallmarking overview', 'huid', 'gold hallmarking', 'silver hallmarking', '3 marks',
      '22k916', '18k750', '14k585', 'fineness', 'assaying and hallmarking centre',
      'ahc', 'compulsory hallmarking', '6 digit huid', 'verify huid'
    ],
    source_url: 'https://www.bis.gov.in/hallmarking-overview/?lang=en',
    source_name: 'BIS Official Portal — Hallmarking Overview',
    procedural_links: [
      { label: 'BIS Hallmarking Official Portal', url: 'https://www.bis.gov.in/hallmarking-overview/?lang=en', note: 'Hallmarking rules, gazette orders, and list of notified districts' },
      { label: 'Verify HUID on BIS Care App', url: 'https://services.bis.gov.in', note: 'Public search tool to verify 6-digit HUID codes' }
    ],
    next_steps: [
      { id: 'ns-hm-verify-step', label: 'How to check 6-digit HUID before buying gold?', prompt: 'What steps should a consumer take to verify HUID and purity on gold jewellery using the BIS Care App?', capability: 'HALLMARKING' },
      { id: 'ns-hm-ahc-reg', label: 'How does an Assaying & Hallmarking Centre (AHC) get recognized?', prompt: 'What are the requirements for setting up a BIS recognized Assaying & Hallmarking Centre (AHC)?', capability: 'HALLMARKING' }
    ]
  },

  // -------------------------------------------------------------------------
  // 11. About BIS & Institutional Mandate
  // Source: https://www.bis.gov.in/the-bureau/about-bis/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-about-institution',
    category: 'ABOUT_BIS',
    title: 'About the Bureau of Indian Standards (BIS) — Mandate & Structure',
    summary: 'The Bureau of Indian Standards (BIS) is the National Standards Body of India established under the BIS Act 2016, functioning under the aegis of the Ministry of Consumer Affairs, Food & Public Distribution, Government of India.',
    bis_context: 'Apex institutional body established by parliament responsible for national standardization, product certification marks, laboratory testing, and consumer rights.',
    key_facts: [
      'Historical Origin: Founded originally as the Indian Standards Institution (ISI) on 6 January 1947; converted into a statutory body as the Bureau of Indian Standards under the BIS Act 1986, and strengthened under the modern BIS Act 2016 (Act No. 11 of 2016).',
      'Statutory Objectives: Harmonious development of standardization, marking, and quality certification of goods, articles, processes, systems, and services across India.',
      'Headquarters: Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002.',
      'Regional Network: 5 Regional Offices located at Northern (Chandigarh), Southern (Chennai), Western (Mumbai), Eastern (Kolkata), and Central (Delhi).',
      'Branch Network: Operates 30+ Branch Offices across Indian states and union territories, directly handling applications, factory surveillance audits, and consumer outreach.',
      'Global Representation: Founder member of the International Organization for Standardization (ISO), active participant in the International Electrotechnical Commission (IEC), and representative of India in South Asian Regional Standards Organization (SARSO).',
      'Core Operational Wings: Standards Formulation, Product Certification (Domestic & FMCS), Hallmarking, Laboratory Services (LIMS), Management Systems Certification (MSCD), and National Institute of Training for Standardization (NITS).'
    ],
    keywords: [
      'about bis', 'what is bis', 'bureau of indian standards', 'national standards body',
      'isi', 'manak bhavan', 'regional offices', 'branch offices', 'ministry of consumer affairs',
      'headquarters', 'iso', 'iec', 'statutory body', 'functions of bis'
    ],
    source_url: 'https://www.bis.gov.in/the-bureau/about-bis/?lang=en',
    source_name: 'Bureau of Indian Standards Official Portal — About BIS',
    procedural_links: [
      { label: 'BIS Official Portal — About BIS', url: 'https://www.bis.gov.in/the-bureau/about-bis/?lang=en', note: 'Institutional overview, history, and statutory mandate' },
      { label: 'BIS Homes New Portal', url: 'https://www.bis.gov.in/homes-new/?lang=en', note: 'Central single window to all e-BIS initiatives' }
    ],
    next_steps: [
      { id: 'ns-abt-act', label: 'What are the legal powers under the BIS Act 2016?', prompt: 'What are the statutory powers, rules, and penalties under the BIS Act 2016?', capability: 'GENERAL_HELP' },
      { id: 'ns-abt-schemes', label: 'What certification schemes does BIS administer?', prompt: 'Which conformity assessment schemes are operated by BIS for manufacturers?', capability: 'SCHEME_GUIDANCE' },
      { id: 'ns-abt-apply', label: 'How does a manufacturer apply for an ISI license?', prompt: 'What is the step-by-step procedure to apply for an ISI mark license on Manakonline?', capability: 'PROCESS_WALKTHROUGH' }
    ]
  },

  // -------------------------------------------------------------------------
  // 12. BIS Mobile Apps & BIS Care Application
  // Source: https://www.bis.gov.in/bis-apps/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-apps-care',
    category: 'BIS_APPS',
    title: 'BIS Mobile Applications — BIS Care App for Consumers & Industry',
    summary: 'The official BIS Care mobile application (available on Google Play Store and Apple App Store) provides citizens, buyers, and surveillance teams with instant digital tools to verify ISI marks, Hallmarking HUID, and CRS registrations, and to report counterfeit goods.',
    bis_context: 'Consumer verification and public empowerment app on Android and iOS enabling instant verification of ISI CM/L licence numbers, HUID codes, and CRS registrations.',
    key_facts: [
      'Platform Availability: Published by the Bureau of Indian Standards for Android and iOS mobile operating systems.',
      'Verify License Details (ISI Mark): Consumers enter the 7 or 8-digit CM/L (Certification Marks / Licence) number visible below the ISI logo to verify manufacturer authenticity, factory address, brand name, scope of varieties, and licence validity status.',
      'Verify Hallmarking (HUID): Allows buyers to enter the 6-digit alphanumeric Hallmark Unique Identification (HUID) laser-engraved on gold jewellery. Displays jewellery type, karatage purity, date of hallmarking, and AHC registration details.',
      'Verify Registration (CRS): Allows verification of the R-number (e.g., R-XXXXXXXX) on electronics and IT products to confirm legitimate registration with BIS and approved brand/model numbers.',
      'Grievance & Counterfeit Reporting: Users can directly lodge consumer complaints regarding substandard certified goods, fake ISI monograms, misuse of standard marks, or misleading gold hallmarking with geo-tagged photographic evidence.',
      'Know Your Standards on Mobile: On-the-go search of Indian Standards, mandatory QCO lists, and recognized testing laboratories.'
    ],
    keywords: [
      'bis care app', 'bis apps', 'mobile app', 'verify cml', 'verify isi', 'verify huid',
      'verify crs', 'r-number', 'lodge complaint', 'fake isi', 'counterfeit reporting',
      'play store', 'app store', 'consumer verification', 'geo-tagged complaint'
    ],
    source_url: 'https://www.bis.gov.in/bis-apps/?lang=en',
    source_name: 'BIS Official Portal — Mobile Applications',
    procedural_links: [
      { label: 'Download & Explore BIS Care App', url: 'https://www.bis.gov.in/bis-apps/?lang=en', note: 'Official instructions for verification of ISI, HUID, and CRS' },
      { label: 'BIS Online Services Portal', url: 'https://services.bis.gov.in', note: 'Public search and verification web portal' }
    ],
    next_steps: [
      { id: 'ns-app-huid', label: 'How do I verify a 6-digit HUID code on BIS Care?', prompt: 'Step-by-step instructions to verify gold jewellery HUID on the BIS Care App', capability: 'HALLMARKING' },
      { id: 'ns-app-complaint', label: 'How to report a fake ISI mark on mobile?', prompt: 'How do I lodge a formal complaint against a counterfeit ISI mark using the BIS Care App?', capability: 'CONSUMER_QUERY' }
    ]
  },

  // -------------------------------------------------------------------------
  // 13. BIS Institutional Services & E-BIS Single Window
  // Source: https://www.bis.gov.in/homes-new/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-homes-services-hub',
    category: 'HOMES_SERVICES',
    title: 'BIS Institutional Services Hub & e-BIS Digital Infrastructure',
    summary: 'The BIS main portal (homes-new) serves as the unified gateway to the government e-BIS digital ecosystem, connecting manufacturers, testing laboratories, jewellers, and consumers to integrated regulatory workflows.',
    bis_context: 'National gateway linking all digital services: Manakonline, CRS-BIS, LIMS, Hallmarking, and NITS training under a unified architecture.',
    key_facts: [
      'Manakonline Portal: Centralized digital portal for electronic submission of domestic product certification applications (Scheme-I), renewals, endorsements, and fee payments.',
      'CRS Portal (crsbis.in): Automated self-declaration registration system for electronic and IT products notifying under MeitY Compulsory Registration Orders.',
      'LIMS Portal (lims.bis.gov.in): Unified Laboratory Information Management System governing sample dispatch, blind sample coding, test progress, and digital report generation across 250+ testing laboratories.',
      'Hallmarking Portal: End-to-end portal for jeweller registration, Assaying & Hallmarking Centre (AHC) licensing, and real-time generation of 6-digit HUID numbers.',
      'FMCS Gateway: Dedicated system for foreign manufacturers located in over 55+ countries exporting goods under Indian standards.',
      'National Institute of Training for Standardization (NITS): Training institute in Noida conducting regular capability-building programs for industry executives, testing technicians, and regulatory auditors.'
    ],
    keywords: [
      'homes-new', 'e-bis', 'manakonline', 'lims', 'hallmarking portal', 'crsbis',
      'nits', 'training institute', 'single window', 'digital infrastructure',
      'services hub', 'world standards day'
    ],
    source_url: 'https://www.bis.gov.in/homes-new/?lang=en',
    source_name: 'Bureau of Indian Standards Official Portal',
    procedural_links: [
      { label: 'BIS Main Portal Hub', url: 'https://www.bis.gov.in/homes-new/?lang=en', note: 'Central access to all institutional services and schemes' },
      { label: 'Manakonline e-BIS Portal', url: 'https://www.manakonline.in', note: 'Official single-window portal for manufacturing licences' }
    ],
    next_steps: [
      { id: 'ns-hub-portal', label: 'How to register on the Manakonline portal?', prompt: 'What are the steps to create an account and submit documents on Manakonline?', capability: 'PROCESS_WALKTHROUGH' },
      { id: 'ns-hub-lims', label: 'How does LIMS manage testing laboratory workflow?', prompt: 'Explain the function and workflow of the BIS Laboratory Information Management System (LIMS)', capability: 'LAB_FINDER' }
    ]
  },

  // -------------------------------------------------------------------------
  // 14. Apply for a License — Domestic Routes & Rules
  // Source: https://www.bis.gov.in/apply-for-a-license/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-apply-license-routes',
    category: 'APPLY_LICENSE',
    title: 'Applying for a BIS Product Certification Licence — Domestic Routes & Rules',
    summary: 'Manufacturers applying for the prestigious ISI mark under Scheme-I must submit online applications through Manakonline, selecting either the Simplified Route (Option 2) or Normal Route (Option 1).',
    bis_context: 'Core eligibility and procedural guidelines governing domestic factory applications, pre-requisites for in-house laboratories, and expedited vs standard review timelines.',
    key_facts: [
      'Who Can Apply: Only actual manufacturers possessing complete manufacturing and in-house testing facilities at the specified factory premises are eligible. Importers, traders, dealers, and marketing companies cannot hold a domestic manufacturing licence.',
      'Prerequisites Before Applying: Factory premises must be established with installed production machinery; in-house laboratory must be fully equipped per the Scheme of Inspection and Testing (SIT); measuring instruments must be calibrated by NABL-accredited labs; and qualified Quality Control personnel must be appointed.',
      'Option 1 — Normal Route (Traditional Procedure): Manufacturer applies on Manakonline with factory documents -> BIS technical officer visits factory for inspection -> Samples drawn and sealed during audit -> Samples tested in BIS National or Referral laboratory -> Licence granted in 60 to 90 working days post passing test reports.',
      'Option 2 — Simplified Route (Expedited Procedure): Manufacturer gets representative sample pre-tested in a BIS-recognized or empanelled commercial laboratory -> Submits passing test report (< 90 days old) with Form-V on Manakonline -> BIS officer conducts factory audit within 15 days -> Licence granted within 30 working days if in-house testing facilities and factory audit are satisfactory.',
      'Exclusions from Simplified Route: Products requiring long-term chemical or microbiological testing (e.g., packaged drinking water, packaged natural mineral water, cement) are restricted to the Normal Route.',
      'Application Fee: Statutory application fee of ₹1,000 + GST payable online at time of filing.'
    ],
    keywords: [
      'apply for a license', 'simplified route', 'normal route', 'option 1', 'option 2',
      'form-v', 'form-i', 'who can apply', 'manufacturer eligibility', 'prerequisites',
      'in-house testing', 'timeline for license', '30 days grant', 'manakonline application'
    ],
    source_url: 'https://www.bis.gov.in/apply-for-a-license/?lang=en',
    source_name: 'BIS Official Portal — Apply for a License',
    procedural_links: [
      { label: 'BIS Guide — Apply for a License', url: 'https://www.bis.gov.in/apply-for-a-license/?lang=en', note: 'Official procedural requirements, eligibility, and documentation' },
      { label: 'Manakonline Submission Portal', url: 'https://www.manakonline.in', note: 'Direct electronic submission for Form-I and Form-V' }
    ],
    next_steps: [
      { id: 'ns-app-simplified', label: 'How does the Simplified Route expedite approval?', prompt: 'Explain the benefits, documentation, and 30-day timeline of the Simplified Route for BIS certification.', capability: 'PROCESS_WALKTHROUGH' },
      { id: 'ns-app-docs', label: 'List all mandatory documents required for application', prompt: 'What documents must be uploaded when applying for an ISI license on Manakonline?', capability: 'PROCESS_WALKTHROUGH' }
    ]
  },

  // -------------------------------------------------------------------------
  // 15. Product Certification Fees & Concessions
  // Source: https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-certification-fees-structure',
    category: 'CERTIFICATION_FEES',
    title: 'BIS Product Certification Fee Structure & MSME/Startup Concessions',
    summary: 'The official fee structure for BIS Scheme-I domestic product certification includes application fees, audit charges, testing expenses, annual licence fees, and advance minimum marking fees, with substantial concessions for MSMEs and Startups.',
    bis_context: 'Official statutory fee schedules, auditor man-day charges, minimum advance marking fee calculations, and government-notified concessions for small and micro businesses.',
    key_facts: [
      'Application Fee: ₹1,000 + GST (non-refundable) payable upon online application submission on Manakonline.',
      'Factory Audit / Inspection Charges: Standard rate of ₹7,000 per man-day + actual travel and accommodation costs for the visiting BIS technical auditor.',
      'Annual Licence Fee: ₹1,000 per year payable upon grant and each subsequent year of operation.',
      'Annual Minimum Marking Fee: Advance fee payable at the time of grant and renewal. Varies by product category from ₹25,000 up to ₹1,00,000+ per annum.',
      'Unit Marking Fee Rate: Small charge per unit produced/marked (e.g., ₹0.05 per bulb or ₹1.50 per water heater). If the cumulative volume-based marking fee exceeds the minimum marking fee at the end of the operating year, the excess must be paid with the annual return.',
      'Independent Testing Charges: Charged as per actual commercial rates of the testing laboratory (BIS National Lab or empanelled commercial lab).',
      'Special Concessions for MSMEs, Startups & Women Entrepreneurs: Micro enterprises and DPIIT-recognized Startups receive a 50% concession on application fee, audit charges, and annual minimum marking fee for specified standards; Small enterprises receive a 20% concession under Government of India notifications.'
    ],
    keywords: [
      'product certification fee', 'bis fee structure', 'application fee', 'marking fee',
      'minimum marking fee', 'inspection charge', 'man day charge', 'msme concession',
      'startup concession', 'women entrepreneurs', 'cost of bis certification'
    ],
    source_url: 'https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en',
    source_name: 'BIS Official Portal — Product Certification Fees',
    procedural_links: [
      { label: 'BIS Product Certification Fee Schedule', url: 'https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en', note: 'Official gazette fee schedules, man-day rates, and marking fee rates' }
    ],
    next_steps: [
      { id: 'ns-fee-msme', label: 'What concessions are available for MSMEs and Startups?', prompt: 'What are the exact fee concessions for MSMEs and DPIIT recognized Startups for BIS certification?', capability: 'GENERAL_HELP' },
      { id: 'ns-fee-calc', label: 'How is the annual minimum marking fee calculated?', prompt: 'How does BIS calculate the minimum marking fee vs unit-based marking fee?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 16. Apply for Renewal of Licence & Scope Changes
  // Source: https://www.bis.gov.in/apply-for-renewal-of-license/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-renewal-scope-changes',
    category: 'RENEWAL_SCOPE_CHANGE',
    title: 'Licence Renewal Guidelines, Production Returns & Scope Endorsements',
    summary: 'BIS licences are granted initially for 1 to 2 years and must be renewed systematically on Manakonline, supported by production returns (Form-I), marking fee settlements, and quality records, with options for variety inclusion.',
    bis_context: 'Maintenance protocols for existing license holders, multi-year renewal options (1 to 5 years), late fee grace periods, and inclusion of new varieties (Form-VII).',
    key_facts: [
      'Renewal Window: Renewal application must be filed electronically on Manakonline at least 30 days prior to the date of licence expiry.',
      'Multi-Year Renewal: Licensees maintaining satisfactory surveillance audit records and no pending dues can choose to renew their licence for 1, 2, 3, 4, or up to 5 years in a single application.',
      'Mandatory Production Return (Form-I): Licensee must submit a certified statement of actual production and quantity of goods marked with the ISI logo during the preceding operating period.',
      'Financial Clearance: Remit the annual licence fee (₹1,000/year) + advance minimum marking fee for the requested renewal term, plus any volume marking dues.',
      'Grace Period & Late Fee: If filed within 90 days after the expiry date, renewal is considered with a statutory late fee. If not renewed within 90 days, the licence expires permanently and cannot be revived, requiring a brand new application.',
      'Inclusion of New Varieties / Scope Changes (Form-VII): To add new models, ratings, or varieties under an existing valid standard, the manufacturer files Form-VII with in-house test reports and pays the endorsement fee (approx ₹5,000 per variety) without undergoing a full new audit.'
    ],
    keywords: [
      'apply for renewal of license', 'license renewal', 'renew bis license', 'validity',
      'up to 5 years', 'form-i production return', 'late fee', 'grace period 90 days',
      'form-vii', 'inclusion of varieties', 'scope amendment', 'expired licence'
    ],
    source_url: 'https://www.bis.gov.in/apply-for-renewal-of-license/?lang=en',
    source_name: 'BIS Official Portal — Apply for Renewal of License',
    procedural_links: [
      { label: 'BIS Guide — Apply for Renewal of License', url: 'https://www.bis.gov.in/apply-for-renewal-of-license/?lang=en', note: 'Renewal timelines, documentation, and late fee guidelines' },
      { label: 'Manakonline License Renewal Portal', url: 'https://www.manakonline.in', note: 'File online renewal returns and pay marking fees' }
    ],
    next_steps: [
      { id: 'ns-rnw-steps', label: 'Step-by-step renewal process on Manakonline', prompt: 'What are the step-by-step instructions to file for renewal of a BIS licence on Manakonline?', capability: 'PROCESS_WALKTHROUGH' },
      { id: 'ns-rnw-variety', label: 'How to add new product models to an existing licence?', prompt: 'What is the procedure and fee to add new models or varieties to an existing BIS CM/L licence?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 17. Foreign Manufacturers Certification Scheme (FMCS)
  // Source: https://www.bis.gov.in/fmcs/certification-process/how-to-apply/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-fmcs-how-to-apply',
    category: 'FMCS',
    title: 'Foreign Manufacturers Certification Scheme (FMCS) — Application Process',
    summary: 'The Foreign Manufacturers Certification Scheme (FMCS) operates under Scheme-I of the BIS (Conformity Assessment) Regulations 2018, granting overseas manufacturing units permission to use the authentic ISI mark on products exported to India.',
    bis_context: 'Export conformity architecture governing foreign manufacturing sites across 55+ countries, mandatory Authorized Indian Representatives (AIR), and USD-denominated bank guarantees.',
    key_facts: [
      'Scope: Applies exclusively to manufacturing factories situated outside India producing goods subject to mandatory Indian Quality Control Orders (QCOs) or voluntary standards.',
      'Mandatory Appointment of Authorized Indian Representative (AIR): Overseas manufacturer must appoint an AIR who must be an Indian citizen or registered Indian corporate entity, legally authorized by power of attorney to represent the factory before BIS and Indian authorities.',
      'AIR Statutory Liability: The AIR is held legally responsible for compliance with the BIS Act 2016, Rules, and Regulations, and represents the foreign manufacturer in legal proceedings and consumer disputes.',
      'Performance Bank Guarantee (PBG): Prior to grant of licence, foreign applicants must furnish an irrevocable Performance Bank Guarantee from any RBI-approved bank in India (typically USD 10,000 for standard commodities).',
      'International Factory Audit: BIS technical auditors travel to the overseas factory premises to inspect production lines, witness testing in the factory laboratory, and draw duplicate test samples.',
      'Travel Cost Responsibility: All overseas travel, visa, accommodation, and per diem allowances for two BIS auditors are borne directly by the foreign applicant.'
    ],
    keywords: [
      'fmcs', 'foreign manufacturers certification scheme', 'how to apply fmcs', 'overseas manufacturer',
      'authorized indian representative', 'air', 'performance bank guarantee', 'pbg',
      'foreign factory audit', 'importing to india', 'overseas inspection'
    ],
    source_url: 'https://www.bis.gov.in/fmcs/certification-process/how-to-apply/?lang=en',
    source_name: 'BIS Official Portal — FMCS How to Apply',
    procedural_links: [
      { label: 'BIS FMCS Application Gateway', url: 'https://www.bis.gov.in/fmcs/certification-process/how-to-apply/?lang=en', note: 'Official guidelines, forms, and AIR appointment guidelines' },
      { label: 'FMCS Portal Registration', url: 'https://www.manakonline.in', note: 'Electronic application filing for overseas factories' }
    ],
    next_steps: [
      { id: 'ns-fmcs-air', label: 'What are the legal liabilities of an AIR under FMCS?', prompt: 'What are the legal responsibilities, qualifications, and liabilities of an Authorized Indian Representative (AIR)?', capability: 'GENERAL_HELP' },
      { id: 'ns-fmcs-cost', label: 'What is the total estimated cost of FMCS certification?', prompt: 'What are the application fees, PBG amounts, and audit expenses for FMCS certification?', capability: 'GENERAL_HELP' }
    ]
  },

  // -------------------------------------------------------------------------
  // 18. Consumer Protection & Grievance Redressal
  // Source: https://www.bis.gov.in/consumer-overview/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-consumer-overview-grievance',
    category: 'CONSUMER_OVERVIEW',
    title: 'Consumer Protection, Verification Services & Grievance Redressal',
    summary: 'The Consumer Affairs Department (CAD) of BIS empowers citizens with robust grievance handling mechanisms, compensation guarantees for substandard certified products, and transparent online verification portals.',
    bis_context: 'Citizen redressal mechanisms, complaint submission channels (BIS Care, complaints@bis.gov.in), sample drawing investigations, and statutory compensation guarantees.',
    key_facts: [
      'Consumer Right to Quality: Under the BIS Act 2016, consumers have the legal right to purchase genuine goods bearing authentic standard marks conforming to published Indian Standards.',
      'Grievance Channels: Complaints regarding substandard certified goods, defective ISI items, non-conforming hallmarked jewellery, or deceptive quality marks can be lodged via: (1) BIS Care Mobile App, (2) BIS online portal (services.bis.gov.in), (3) by email to complaints@bis.gov.in, or (4) in writing to the nearest Branch Office.',
      'Investigation Protocol: BIS technical officers investigate complaints, inspect manufacturer/dealer premises, draw test samples, and if found defective, instruct the manufacturer to replace the item or refund the consumer.',
      'Statutory Compensation: Where certified goods do not conform to standard specifications, the licensee is liable to compensate the consumer under Section 18 of the BIS Act 2016.',
      'Search Licensed Units: Consumers and procurement agencies can search active, cancelled, or suspended CM/L licences by product category, Indian Standard number, company name, or district on the public portal.'
    ],
    keywords: [
      'consumer overview', 'consumer rights', 'grievance redressal', 'complaints',
      'substandard products', 'compensation to consumer', 'complaints@bis.gov.in',
      'cad', 'consumer affairs department', 'search licensed units', 'section 18'
    ],
    source_url: 'https://www.bis.gov.in/consumer-overview/?lang=en',
    source_name: 'BIS Official Portal — Consumer Overview',
    procedural_links: [
      { label: 'BIS Consumer Overview & Portal', url: 'https://www.bis.gov.in/consumer-overview/?lang=en', note: 'Consumer rights, grievance procedures, and compensation guidelines' },
      { label: 'Online Grievance Submission Portal', url: 'https://services.bis.gov.in', note: 'Lodge and track complaints regarding substandard certified goods' }
    ],
    next_steps: [
      { id: 'ns-cns-lodge', label: 'How to file a formal complaint with BIS for defective goods?', prompt: 'What is the step-by-step procedure to file a formal grievance with BIS for a defective ISI product?', capability: 'CONSUMER_QUERY' },
      { id: 'ns-cns-search', label: 'How to verify whether a brand actually holds a valid BIS licence?', prompt: 'How can a consumer verify if a company has a valid BIS CM/L licence before buying?', capability: 'CONSUMER_QUERY' }
    ]
  },

  // -------------------------------------------------------------------------
  // 19. Resource Materials & Educational Outreach
  // Source: https://www.bis.gov.in/resource-materials/?lang=en
  // -------------------------------------------------------------------------
  {
    id: 'bis-resource-materials-standards-clubs',
    category: 'RESOURCE_MATERIALS',
    title: 'Resource Materials, Standards Clubs in Schools, and Standards Education',
    summary: 'BIS publishes extensive educational resources, technical guides, video lectures, and spearheads nationwide Standards Clubs in schools and engineering colleges to instill quality consciousness.',
    bis_context: 'Educational outreach, Standards Clubs in educational institutions, National Building Code (NBC), National Electrical Code (NEC), and professional training by NITS.',
    key_facts: [
      'Standards Clubs Initiative: Over 10,000+ Standards Clubs established in schools and colleges across India to teach students about standards, consumer rights, scientific testing, and quality consciousness through practical exposure visits to BIS laboratories and manufacturing plants.',
      'Standards in Curriculum: Collaboration with AICTE, IITs, and universities to incorporate Indian Standards and technical codes (such as National Building Code - NBC, National Electrical Code - NEC) into engineering curricula.',
      'World Standards Day: Celebrated annually on 14 October with dedicated international themes emphasizing environmental sustainability, smart cities, and technological innovation.',
      'Free Educational Publications: Downloadable brochures, technical guidelines, posters, and informative handbooks explaining ISI marks, Hallmarking, CRS, and laboratory testing protocols in multiple Indian languages.',
      'Training Programs by NITS: National Institute of Training for Standardization in Noida conducts specialized courses on ISO/IEC 17025, auditing, statistical quality control (SQC), and uncertainty of measurement for laboratory personnel and factory quality heads.'
    ],
    keywords: [
      'resource materials', 'standards clubs', 'schools', 'colleges', 'standards education',
      'nbc national building code', 'nec national electrical code', 'world standards day 14 october',
      'educational brochures', 'nits noida', 'quality consciousness'
    ],
    source_url: 'https://www.bis.gov.in/resource-materials/?lang=en',
    source_name: 'BIS Official Portal — Resource Materials',
    procedural_links: [
      { label: 'BIS Resource Materials Directory', url: 'https://www.bis.gov.in/resource-materials/?lang=en', note: 'Free downloadable guides, booklets, and standards club resources' },
      { label: 'NITS Training Calendar', url: 'https://www.bis.gov.in', note: 'Professional training programs on testing and quality auditing' }
    ],
    next_steps: [
      { id: 'ns-res-clubs', label: 'What are BIS Standards Clubs in schools and colleges?', prompt: 'Explain the BIS Standards Clubs initiative in schools and universities.', capability: 'GENERAL_HELP' },
      { id: 'ns-res-codes', label: 'What are the National Building Code (NBC) and National Electrical Code (NEC)?', prompt: 'What are the key provisions of the National Building Code (NBC) and National Electrical Code (NEC) published by BIS?', capability: 'STANDARD_QA' }
    ]
  }
];
