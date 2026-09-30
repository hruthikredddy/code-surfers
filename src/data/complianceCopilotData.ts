export interface RoadmapMilestone {
  id: string;
  phaseId: number;
  phaseTitle: string;
  title: string;
  description: string;
  estimatedTimeline: string;
  keyDeliverables: string[];
  mandatoryNote?: string;
  assistantPrompt: string;
  portalActionUrl?: string;
  portalActionLabel?: string;
}

export interface ProductAssessmentCategory {
  id: string;
  name: string;
  isNumber: string;
  standardTitle: string;
  scheme: 'Scheme-I (ISI Mark)' | 'Scheme-II (CRS)' | 'FMCS' | 'Hallmarking' | 'Scheme-IV';
  mandatoryStatus: 'MANDATORY (QCO)' | 'VOLUNTARY' | 'MANDATORY (DISTRICT WISE)';
  qcoDetails: string;
  estimatedTimeline: string;
  recommendedRoute: 'Simplified Route (Pre-tested sample)' | 'Normal Route (Audit first)' | 'CRS Online Self-Declaration' | 'FMCS (Foreign Manufacturer)';
  inHouseTestingNeeds: string[];
  keyRisksAndClauses: string;
  samplePrompt: string;
}

export interface DocumentChecklistItem {
  id: string;
  category: 'Legal & Administrative' | 'Manufacturing Plant' | 'Lab & Quality Control' | 'Raw Material & Suppliers';
  title: string;
  description: string;
  importance: 'Strictly Mandatory' | 'Required for Inspection' | 'If Applicable';
  auditTrapNote: string;
  samplePrompt: string;
}

export interface GapAnalysisQuestion {
  id: string;
  category: string;
  question: string;
  helpText: string;
  options: {
    label: string;
    points: number; // 0: None/Non-compliant, 1: Partial, 2: Fully Compliant
    feedback: string;
  }[];
}

export interface WorkflowGuide {
  id: string;
  title: string;
  targetAudience: string;
  totalEstimatedTime: string;
  suitability: string;
  sourceUrl?: string;
  sourceLabel?: string;
  steps: {
    step: number;
    title: string;
    action: string;
    documents: string[];
    tips: string;
  }[];
}

export const CERTIFICATION_ROADMAP: RoadmapMilestone[] = [
  {
    id: 'milestone-1',
    phaseId: 1,
    phaseTitle: 'Phase 1: Standard & Regulatory Scrutiny',
    title: 'Identify Indian Standard (IS) & Scheme Applicability',
    description: 'Pinpoint the exact Indian Standard number for your product scope. Verify whether the item falls under a mandatory Quality Control Order (QCO) issued by the Ministry of Commerce / DPIIT.',
    estimatedTimeline: '1 - 3 Days',
    keyDeliverables: [
      'Identified IS number and latest amendments',
      'Confirmed Scheme (Scheme-I ISI vs Scheme-II CRS)',
      'Verified mandatory QCO deadline & penalty clauses'
    ],
    mandatoryNote: 'Operating without valid certification for QCO-notified products attracts criminal liability under Section 29 of the BIS Act, 2016.',
    assistantPrompt: 'Which Indian Standard and BIS conformity assessment scheme applies to my manufactured product?',
    portalActionUrl: 'https://www.bis.gov.in/know-your-standard/?lang=en',
    portalActionLabel: 'Search Know Your Standard'
  },
  {
    id: 'milestone-2',
    phaseId: 1,
    phaseTitle: 'Phase 1: Standard & Regulatory Scrutiny',
    title: 'Acquire Scheme of Inspection and Testing (SIT)',
    description: 'Download and review the specific Scheme of Inspection and Testing (SIT) published by BIS for your product. The SIT outlines exact sampling levels, routine tests, and factory testing records required.',
    estimatedTimeline: '2 - 4 Days',
    keyDeliverables: [
      'Official SIT copy downloaded from BIS',
      'Identified mandatory in-house testing equipment checklist',
      'Defined Routine Tests vs Acceptance Tests'
    ],
    assistantPrompt: 'Explain the Scheme of Inspection and Testing (SIT) requirements and routine test frequencies for my product.',
    portalActionUrl: 'https://www.bis.gov.in/product-certification/product-specific-guidelines/?lang=en',
    portalActionLabel: 'Check BIS SIT Guidelines'
  },
  {
    id: 'milestone-3',
    phaseId: 2,
    phaseTitle: 'Phase 2: In-House Factory & Lab Preparation',
    title: 'Procure & Calibrate In-House Testing Equipment',
    description: 'Establish the in-house testing facility inside the factory boundary. Every gauge, meter, and testing apparatus must possess a valid calibration certificate from an NABL-accredited calibration laboratory.',
    estimatedTimeline: '2 - 4 Weeks',
    keyDeliverables: [
      'Complete set of in-house testing apparatus installed',
      'Traceable NABL calibration certificates (< 1 year old)',
      'Designated test bench area with safety earth grounding'
    ],
    mandatoryNote: 'Audit failure rate exceeds 40% when calibration certificates lack traceability or key SIT instruments are missing.',
    assistantPrompt: 'What in-house testing equipment and calibration certificates are strictly required before a BIS factory inspection?',
    portalActionUrl: 'https://www.bis.gov.in/product-certification/product-specific-information-2/?lang=en',
    portalActionLabel: 'Product Specific Information'
  },
  {
    id: 'milestone-4',
    phaseId: 2,
    phaseTitle: 'Phase 2: In-House Factory & Lab Preparation',
    title: 'Appoint Competent Quality Control Personnel',
    description: 'Designate at least one dedicated Quality Control In-Charge with relevant technical education (Diploma/Degree in Engineering or Science) and experience in standard testing methods.',
    estimatedTimeline: '1 - 2 Weeks',
    keyDeliverables: [
      'Appointment letter specifying QC responsibilities',
      'Degree / Diploma certificates of testing personnel',
      'Logbooks and test registers initiated per SIT'
    ],
    assistantPrompt: 'What qualifications and records must a factory Quality Control in-charge maintain for BIS certification?',
    portalActionUrl: 'https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en',
    portalActionLabel: 'Quality Personnel Guidelines'
  },
  {
    id: 'milestone-5',
    phaseId: 3,
    phaseTitle: 'Phase 3: Documentation & Portal Filing',
    title: 'Compile Technical Dossier & Factory Blueprint',
    description: 'Prepare the comprehensive application dossier including manufacturing machinery inventory, raw material test certificates, process flowchart, factory layout map, and brand authorization.',
    estimatedTimeline: '3 - 7 Days',
    keyDeliverables: [
      'Factory lease deed / proof of premises ownership',
      'Manufacturing machinery list with capacity ratings',
      'Raw material suppliers list and test certificates (MTC)',
      'Process flow diagram showing QC checkpoints'
    ],
    assistantPrompt: 'Provide the complete documentation checklist for BIS Scheme-I application on Manakonline.',
    portalActionUrl: 'https://www.bis.gov.in/apply-for-a-license/?lang=en',
    portalActionLabel: 'License Documentation Checklist'
  },
  {
    id: 'milestone-6',
    phaseId: 3,
    phaseTitle: 'Phase 3: Documentation & Portal Filing',
    title: 'Submit Application on Manakonline (e-BIS)',
    description: 'Create an account on manakonline.in. Fill out Form-I (or Form-V for simplified route), upload all required attachments, and remit the non-refundable statutory application fee of ₹1,000 + GST.',
    estimatedTimeline: '1 - 2 Days',
    keyDeliverables: [
      'Generated Application Number on Manakonline',
      'Payment receipt for application & inspection fees',
      'Completed Form-I / Form-V electronic submission'
    ],
    assistantPrompt: 'How do I submit Form-I on the Manakonline portal and what fees must be paid initially?',
    portalActionUrl: 'https://www.bis.gov.in/apply-for-a-license/?lang=en',
    portalActionLabel: 'Apply on Manakonline'
  },
  {
    id: 'milestone-7',
    phaseId: 4,
    phaseTitle: 'Phase 4: Factory Audit & Independent Testing',
    title: 'Host On-Site Factory Audit by BIS Technical Auditor',
    description: 'A designated BIS technical officer conducts physical inspection of factory machinery, verifies in-house testing competencies, examines raw material records, and witnesses live routine tests.',
    estimatedTimeline: 'Scheduled within 15 days of document approval',
    keyDeliverables: [
      'Satisfactory inspection report without major non-conformities',
      'Live demonstration of routine tests witnessed by auditor',
      'Signed Joint Inspection Report'
    ],
    mandatoryNote: 'Ensure the manufacturing line is in running operation on the inspection day so the auditor can witness actual production.',
    assistantPrompt: 'What occurs during a BIS factory inspection audit and what do auditors look for?',
    portalActionUrl: 'https://www.bis.gov.in/product-certification/product-certification-process/?lang=en',
    portalActionLabel: 'Factory Audit Process'
  },
  {
    id: 'milestone-8',
    phaseId: 4,
    phaseTitle: 'Phase 4: Factory Audit & Independent Testing',
    title: 'Independent Sample Drawing & Laboratory Testing',
    description: 'The auditor selects and seals random production samples. Under normal route, samples are dispatched to a BIS National Laboratory or NABL accredited referral laboratory for complete type testing.',
    estimatedTimeline: '15 - 35 Days (standard dependent)',
    keyDeliverables: [
      'Signed sample counter-sealing receipt',
      'LIMS test tracking slip',
      'Clearance of all passing test parameters in official test report'
    ],
    assistantPrompt: 'How are BIS factory samples drawn and tested in referral laboratories?',
    portalActionUrl: 'https://lims.bis.gov.in/',
    portalActionLabel: 'Track on BIS LIMS'
  },
  {
    id: 'milestone-9',
    phaseId: 5,
    phaseTitle: 'Phase 5: Grant of Licence (CM/L)',
    title: 'Scrutiny, Marking Fee Deposit & Licence Issuance',
    description: 'Upon verification of passing test reports and closure of inspection queries, the manufacturer deposits the annual minimum marking fee and performance security to receive the official CM/L number.',
    estimatedTimeline: '5 - 10 Days after test clearance',
    keyDeliverables: [
      'Official Grant of Licence Certificate (CM/L - XXXXXXX)',
      'Approved ISI Mark label design showing IS number and CM/L',
      'Receipt for advance minimum marking fee payment'
    ],
    assistantPrompt: 'What are the steps and minimum marking fees to secure the CM/L licence after passing test reports?',
    portalActionUrl: 'https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en',
    portalActionLabel: 'Check Marking Fee Schedule'
  },
  {
    id: 'milestone-10',
    phaseId: 6,
    phaseTitle: 'Phase 6: Post-Licence Compliance & Renewal',
    title: 'Implement ISI Marking & Surveillance Readiness',
    description: 'Affix the standard ISI mark on packaging and products strictly in accordance with BIS guidelines. Maintain routine test registers and prepare for unannounced surveillance audits and market sampling.',
    estimatedTimeline: 'Ongoing (Annual/Biennial Renewal)',
    keyDeliverables: [
      'Compliant packaging with ISI logo, IS number & CM/L code',
      'Daily routine testing logbooks maintained on site',
      'Timely online renewal filing before license expiry'
    ],
    assistantPrompt: 'What are the post-grant surveillance rules and how do I renew my BIS ISI licence?',
    portalActionUrl: 'https://www.bis.gov.in/apply-for-renewal-of-license/?lang=en',
    portalActionLabel: 'Licence Renewal Guidelines'
  }
];

export const PRODUCT_COMPLIANCE_ASSESSMENTS: ProductAssessmentCategory[] = [
  {
    id: 'geyser-appliances',
    name: 'Electric Storage Water Heaters (Geysers)',
    isNumber: 'IS 302 (Part 2/Sec 21)',
    standardTitle: 'Safety of Household and Similar Electrical Appliances - Stationary Storage Water Heaters',
    scheme: 'Scheme-I (ISI Mark)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Electrical Appliances (Quality Control) Order. Mandatory ISI mark required before sale, distribution, or import.',
    estimatedTimeline: '30 - 60 Days (Simplified Route) / 60 - 90 Days (Normal Route)',
    recommendedRoute: 'Simplified Route (Pre-tested sample)',
    inHouseTestingNeeds: [
      'High Voltage (Dielectric Strength) test bench (1500V/3750V)',
      'Earth continuity resistance tester (< 0.1 ohm)',
      'Leakage current measurement at operating temperature',
      'Hydrostatic pressure test rig (pressure withstanding up to 1.0 MPa)',
      'Power input and current measurement bench'
    ],
    keyRisksAndClauses: 'Clauses 8 (Protection against electric shock), 13 (Leakage current), 16 (Moisture resistance), and 22 (Pressure vessel construction).',
    samplePrompt: 'What are the mandatory compliance and in-house testing requirements for manufacturing electric storage water heaters under IS 302-2-21?'
  },
  {
    id: 'led-lighting',
    name: 'Self-Ballasted LED Bulbs for General Lighting',
    isNumber: 'IS 16102 (Part 1 & Part 2)',
    standardTitle: 'Self-Ballasted LED Lamps for General Lighting Services - Safety & Performance',
    scheme: 'Scheme-II (CRS)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Electronics & Information Technology Goods (Compulsory Registration Order). Mandatory BIS Registration (R-number) on Manakonline CRS portal.',
    estimatedTimeline: '15 - 30 Days (Direct Lab Testing + Online CRS Registration)',
    recommendedRoute: 'CRS Online Self-Declaration',
    inHouseTestingNeeds: [
      'Luminous flux integrating sphere or lux meter',
      'Electrical parameter analyzer (Wattage, Power Factor, THD)',
      'Insulation resistance & High voltage breakdown tester',
      'Torque wrench for lamp cap adhesion testing'
    ],
    keyRisksAndClauses: 'Part 1 Safety: Insulation resistance, thermal endurance, interchangeability. Part 2 Performance: Luminous efficacy (> 100 lm/W) and Power factor (> 0.90).',
    samplePrompt: 'How do I obtain BIS Compulsory Registration (CRS) for LED bulbs under IS 16102?'
  },
  {
    id: 'helmets-two-wheeler',
    name: 'Protective Helmets for Two-Wheeler Riders',
    isNumber: 'IS 4151',
    standardTitle: 'Protective Helmets for Motorcycle and Two-Wheeler Riders',
    scheme: 'Scheme-I (ISI Mark)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Ministry of Road Transport and Highways (MoRTH) QCO. Uncertified helmets cannot be sold, imported, or manufactured in India.',
    estimatedTimeline: '45 - 75 Days',
    recommendedRoute: 'Simplified Route (Pre-tested sample)',
    inHouseTestingNeeds: [
      'Impact absorption drop test apparatus with tri-axial accelerometer',
      'Dynamic retention system (chin strap elongation & slippage) rig',
      'Rigidity test bench',
      'Audibility testing setup and peripheral vision angle gauge'
    ],
    keyRisksAndClauses: 'Impact attenuation under four conditioning states (Ambient, Hot, Cold, Water immersion). Weight limits must not exceed 1.2 kg.',
    samplePrompt: 'What are the testing requirements and lab equipment needed for two-wheeler helmets under IS 4151?'
  },
  {
    id: 'toys-safety',
    name: 'Toys for Children under 14 Years',
    isNumber: 'IS 9873 (Parts 1-9) & IS 15644',
    standardTitle: 'Safety of Toys - Mechanical, Flammability, Heavy Metals & Electric Toys',
    scheme: 'Scheme-I (ISI Mark)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Toys (Quality Control) Order, 2020. Mandatory ISI mark for all domestic manufacturers and overseas suppliers (FMCS).',
    estimatedTimeline: '30 - 45 Days',
    recommendedRoute: 'Simplified Route (Pre-tested sample)',
    inHouseTestingNeeds: [
      'Torque and tension test apparatus for detachable parts',
      'Drop and impact test bench',
      'Small parts cylinder (choking hazard gauge for < 3 years)',
      'Sharp edge tester and sharp point tester'
    ],
    keyRisksAndClauses: 'IS 9873 Part 1 (Physical/Mechanical), Part 2 (Flammability), Part 3 (Migration of heavy metals: lead, cadmium, arsenic), IS 15644 (Electric toy safety).',
    samplePrompt: 'Explain the Toys Quality Control Order compliance and mandatory in-house testing under IS 9873.'
  },
  {
    id: 'packaged-water',
    name: 'Packaged Drinking Water (Other than Natural Mineral Water)',
    isNumber: 'IS 14543',
    standardTitle: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water)',
    scheme: 'Scheme-I (ISI Mark)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Mandatory under FSSAI and BIS Act. Commercial sale without dual BIS (ISI mark) and FSSAI license is strictly prohibited.',
    estimatedTimeline: '60 - 90 Days',
    recommendedRoute: 'Normal Route (Audit first)',
    inHouseTestingNeeds: [
      'Full in-house microbiological testing laboratory with laminar flow & autoclave',
      'Incubators for total coliform, E. coli, faecal streptococci, Pseudomonas aeruginosa',
      'Chemical test equipment: Spectrophotometer, turbidity meter, pH meter, TDS meter',
      'Full-time qualified Microbiologist and qualified Chemist'
    ],
    keyRisksAndClauses: 'Zero tolerance for microbial contaminants. Packaging tamper-evident cap requirements and chemical limits on heavy metals/pesticides.',
    samplePrompt: 'What in-house microbiology laboratory equipment and personnel are required for Packaged Drinking Water under IS 14543?'
  },
  {
    id: 'gold-jewellery',
    name: 'Gold Jewellery & Artifacts',
    isNumber: 'IS 1417 & IS 15820',
    standardTitle: 'Gold and Gold Alloys, Platings - Hallmarking Specification',
    scheme: 'Hallmarking',
    mandatoryStatus: 'MANDATORY (DISTRICT WISE)',
    qcoDetails: 'Mandatory Hallmarking Order covering 343+ districts across India. Every gold item must bear BIS logo, Purity/Fineness, and 6-digit HUID code.',
    estimatedTimeline: '1 - 2 Days (Instant Online Registration for Jewellers)',
    recommendedRoute: 'Normal Route (Audit first)',
    inHouseTestingNeeds: [
      'No in-house testing needed for jewellers; testing and laser marking conducted by BIS-recognized Assaying & Hallmarking Centres (AHCs)'
    ],
    keyRisksAndClauses: 'Mandatory 6-digit alphanumeric HUID (Hallmark Unique Identification). Karatages permitted: 14K (585), 18K (750), 20K (833), 22K (916), 23K (958), 24K (995).',
    samplePrompt: 'How does a retail jeweller register on Manakonline for mandatory gold hallmarking and HUID generation?'
  },
  {
    id: 'it-adapters-electronics',
    name: 'Power Adapters & IT Goods (Laptops/Mobiles)',
    isNumber: 'IS 13252 (Part 1)',
    standardTitle: 'Information Technology Equipment - Safety - General Requirements',
    scheme: 'Scheme-II (CRS)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'MeitY Compulsory Registration Scheme (CRS). All adapters, power banks, and IT equipment require CRS registration before import or domestic sale.',
    estimatedTimeline: '15 - 25 Days',
    recommendedRoute: 'CRS Online Self-Declaration',
    inHouseTestingNeeds: [
      'Testing completed by BIS-recognized NABL laboratory in India; sample testing report valid for 90 days for online submission'
    ],
    keyRisksAndClauses: 'Electrical safety, creepage and clearance distances, temperature rise test, abnormal operation protection.',
    samplePrompt: 'What is the step-by-step process for getting BIS CRS registration for power adapters under IS 13252-1?'
  },
  {
    id: 'steel-rebars',
    name: 'High Strength Deformed Steel Bars (TMT Rebars)',
    isNumber: 'IS 1786',
    standardTitle: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
    scheme: 'Scheme-I (ISI Mark)',
    mandatoryStatus: 'MANDATORY (QCO)',
    qcoDetails: 'Steel and Steel Products (Quality Control) Order. Mandatory ISI mark; sale of uncertified steel in construction is prohibited.',
    estimatedTimeline: '45 - 60 Days',
    recommendedRoute: 'Normal Route (Audit first)',
    inHouseTestingNeeds: [
      'Universal Testing Machine (UTM) for tensile, 0.2% proof stress, and elongation',
      'Bend and rebend test apparatus with specified mandrels',
      'Chemical spectrometer / optical emission spectrometer (OES) for Carbon, Sulphur, Phosphorus',
      'Mass per metre balance and weighing scale'
    ],
    keyRisksAndClauses: 'Yield stress verification for Fe 500D / Fe 550D grades, carbon equivalent (CE) calculation for weldability.',
    samplePrompt: 'What testing equipment is mandatory in-house for a steel rolling mill certifying TMT bars under IS 1786?'
  }
];

export const DOCUMENTATION_CHECKLIST: DocumentChecklistItem[] = [
  {
    id: 'doc-1',
    category: 'Legal & Administrative',
    title: 'Proof of Factory Location & Premises Title',
    description: 'Registered lease deed, rent agreement (minimum 1-year remaining validity), or industrial land ownership allotment letter with factory map.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'Auditors immediately reject applications where factory address on lease differs by even a plot number from the Manakonline portal.',
    samplePrompt: 'What proof of factory location documents are acceptable for BIS Manakonline application?'
  },
  {
    id: 'doc-2',
    category: 'Legal & Administrative',
    title: 'Business Identity & Factory Registration',
    description: 'GST Certificate, Certificate of Incorporation / Partnership Deed, and MSME Udyam Registration (qualifies for 50% concession on application fee for micro-enterprises).',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'Ensure the manufacturing address is listed as the principal place of business or additional place of business in the GST registration.',
    samplePrompt: 'How do MSME benefits apply to BIS certification fees under Udyam registration?'
  },
  {
    id: 'doc-3',
    category: 'Legal & Administrative',
    title: 'Brand / Trademark Ownership Proof',
    description: 'Trademark Registration Certificate (TM certificate) issued by Registrar of Trademarks, or TM application form with trademark search report, or brand authorization letter from the brand owner.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'If manufacturing for a client or third-party brand, a formal brand authorization agreement on non-judicial stamp paper is required.',
    samplePrompt: 'What trademark and brand authorization documents does BIS require for ISI marking?'
  },
  {
    id: 'doc-4',
    category: 'Manufacturing Plant',
    title: 'Factory Layout Blueprint Plan',
    description: 'Scale layout drawing indicating raw material storage area, production machinery lines, quality control testing laboratory, quarantine area for non-conforming items, and finished goods storage.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'Must clearly show a segregated in-house laboratory room within the factory boundary.',
    samplePrompt: 'How should the factory layout plan be drafted for a BIS technical inspection?'
  },
  {
    id: 'doc-5',
    category: 'Manufacturing Plant',
    title: 'Comprehensive List of Manufacturing Machinery',
    description: 'Tabular inventory of all production equipment, indicating machine name, make, serial number, production capacity (e.g. units/hour), and date of installation.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'Every critical manufacturing step specified in the standard must correspond to an actual physical machine in the factory.',
    samplePrompt: 'What details should be included in the machinery list for BIS Form-I submission?'
  },
  {
    id: 'doc-6',
    category: 'Manufacturing Plant',
    title: 'Manufacturing Process Flowchart',
    description: 'Detailed stage-by-stage process diagram starting from raw material receiving, in-process inspection points, assembly, routine testing, packaging, to dispatch.',
    importance: 'Required for Inspection',
    auditTrapNote: 'Auditors look for explicit Stage Inspection Quality Checkpoints (QC1, QC2, QC3) marked on the diagram.',
    samplePrompt: 'How to prepare a process flowchart with quality inspection points for BIS audit?'
  },
  {
    id: 'doc-7',
    category: 'Lab & Quality Control',
    title: 'List of In-House Testing Equipment',
    description: 'Inventory of all testing apparatus required as per the Scheme of Inspection and Testing (SIT), listing instrument name, make, least count, range, and serial number.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'Missing even one instrument required by the SIT for routine tests will result in immediate non-conformity during the factory audit.',
    samplePrompt: 'How to map in-house testing equipment to the BIS Scheme of Inspection and Testing?'
  },
  {
    id: 'doc-8',
    category: 'Lab & Quality Control',
    title: 'Traceable NABL Calibration Certificates',
    description: 'Calibration certificates for all testing instruments issued by an NABL-accredited calibration laboratory, with calibration date within the preceding 12 months.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'In-house or non-accredited calibrations are not accepted. Certificates must bear the NABL hologram/symbol and clearly state measurement uncertainty.',
    samplePrompt: 'What are the calibration requirements and validity for testing instruments in a BIS factory audit?'
  },
  {
    id: 'doc-9',
    category: 'Lab & Quality Control',
    title: 'Appointment of Qualified Quality Control Personnel',
    description: 'Letter of appointment for QC Manager / Testing Technician, educational qualification certificates (Degree/Diploma in Engineering/Science), and consent letter.',
    importance: 'Strictly Mandatory',
    auditTrapNote: 'The QC personnel must be present during the audit and demonstrate complete familiarity with conducting standard tests.',
    samplePrompt: 'What qualifications must factory testing personnel have for BIS Scheme-I?'
  },
  {
    id: 'doc-10',
    category: 'Raw Material & Suppliers',
    title: 'Raw Material Test Certificates & Supplier Invoices',
    description: 'Mill test certificates (MTC) or supplier analysis reports for all major raw materials, verifying conformity to their respective Indian Standards.',
    importance: 'Required for Inspection',
    auditTrapNote: 'If raw materials are under mandatory BIS QCOs themselves (e.g. copper, steel, PVC resin), purchase invoices must show ISI-certified suppliers.',
    samplePrompt: 'How does raw material verification affect BIS certification approval?'
  }
];

export const GAP_ANALYSIS_QUESTIONS: GapAnalysisQuestion[] = [
  {
    id: 'gap-1',
    category: 'Testing Infrastructure',
    question: 'Do you possess the complete in-house testing apparatus mandated by the product SIT?',
    helpText: 'The Scheme of Inspection and Testing (SIT) requires specific equipment on-site for routine and acceptance testing.',
    options: [
      {
        label: 'Yes, 100% of SIT equipment is installed in our factory test lab.',
        points: 2,
        feedback: 'Excellent. Your in-house testing bench meets statutory prerequisite requirements.'
      },
      {
        label: 'Partially; we have major equipment but miss a few minor gauges or tests.',
        points: 1,
        feedback: 'Warning: Missing even one routine testing apparatus leads to audit non-conformance. Procure remaining apparatus before scheduling audit.'
      },
      {
        label: 'No, we rely on outside commercial laboratories for all testing.',
        points: 0,
        feedback: 'Critical Deficit: Scheme-I (ISI Mark) strictly prohibits 100% outsourcing of routine tests. In-house test facility is mandatory.'
      }
    ]
  },
  {
    id: 'gap-2',
    category: 'Instrument Calibration',
    question: 'Are all testing instruments and measuring devices calibrated with valid NABL certificates?',
    helpText: 'Every measuring tape, pressure gauge, voltmeter, scale, and sensor must have NABL calibration < 1 year old.',
    options: [
      {
        label: 'Yes, all instruments have valid NABL calibration certificates with full traceability.',
        points: 2,
        feedback: 'Compliant. Ensure calibration stickers with due dates are clearly affixed to every instrument.'
      },
      {
        label: 'Some certificates are expired (> 12 months) or calibrated by unaccredited vendors.',
        points: 1,
        feedback: 'Immediate Action: Re-calibrate expired instruments through an NABL-accredited laboratory before auditor arrival.'
      },
      {
        label: 'Instruments have not been calibrated since purchase.',
        points: 0,
        feedback: 'Critical Audit Failure: Uncalibrated equipment invalidates all test records. Immediate calibration campaign required.'
      }
    ]
  },
  {
    id: 'gap-3',
    category: 'Quality Personnel',
    question: 'Do you have a designated, technically qualified Quality Control in-charge?',
    helpText: 'Must hold a technical Degree or Diploma and be thoroughly trained on the applicable Indian Standard test methods.',
    options: [
      {
        label: 'Yes, full-time qualified QC in-charge appointed with engineering/science diploma.',
        points: 2,
        feedback: 'Compliant. Ensure QC in-charge is well-practiced in performing all tests in front of the BIS visiting officer.'
      },
      {
        label: 'We have production staff performing checks, but no dedicated qualified QC engineer.',
        points: 1,
        feedback: 'Gap Found: BIS requires designated personnel independent of production quotas to ensure impartial testing.'
      },
      {
        label: 'No designated testing staff.',
        points: 0,
        feedback: 'Critical Deficit: Appoint a qualified QC technician before submitting your application.'
      }
    ]
  },
  {
    id: 'gap-4',
    category: 'Raw Material Traceability',
    question: 'Do you maintain batch-wise raw material inspection registers and supplier test certificates?',
    helpText: 'Traceability from incoming raw material batch to finished product serial numbers is audited by BIS.',
    options: [
      {
        label: 'Yes, complete inward raw material register with supplier MTCs and batch numbers.',
        points: 2,
        feedback: 'Compliant. Traceability records will satisfy audit requirements.'
      },
      {
        label: 'We collect bills and invoices, but do not systematically test or log raw material batches.',
        points: 1,
        feedback: 'Action: Create a raw material acceptance logbook recording date, supplier, batch number, and test results.'
      },
      {
        label: 'No raw material records maintained.',
        points: 0,
        feedback: 'High Risk: Lack of traceability is a frequent cause of rejection during BIS scrutiny.'
      }
    ]
  },
  {
    id: 'gap-5',
    category: 'Rejection & Quarantine',
    question: 'Do you have a segregated, clearly labeled quarantine area for defective/rejected products?',
    helpText: 'Auditors inspect factory floors to verify non-conforming goods cannot accidentally be marked or mixed with good inventory.',
    options: [
      {
        label: 'Yes, physically barricaded/demarcated quarantine zone labeled "REJECTED GOODS".',
        points: 2,
        feedback: 'Compliant. Clear segregation demonstrates rigorous quality management.'
      },
      {
        label: 'We separate defective parts, but the area is not formally demarcated or labeled.',
        points: 1,
        feedback: 'Action: Paint floor markings or erect signage for "Rejected / Non-Conforming Goods" in your factory layout.'
      },
      {
        label: 'No separation; rejects are kept near normal inventory.',
        points: 0,
        feedback: 'High Risk: Mixing good and defective stock violates BIS factory hygiene and control protocols.'
      }
    ]
  },
  {
    id: 'gap-6',
    category: 'Pre-Testing & Product Conformity',
    question: 'Have you pre-tested your product against the Indian Standard in an independent NABL laboratory?',
    helpText: 'Pre-testing in a BIS-recognized lab allows application under the expedited "Simplified Route" (grant in ~30 days).',
    options: [
      {
        label: 'Yes, we have a passing test report (< 90 days old) from a BIS-recognized NABL lab.',
        points: 2,
        feedback: 'Outstanding! You are eligible for the Simplified Route, speeding up licence grant by up to 60 days.'
      },
      {
        label: 'We have tested internally, but haven’t obtained an external NABL test report.',
        points: 1,
        feedback: 'Moderate: You will follow the Normal Route (sample drawn during audit), taking 60–90 days.'
      },
      {
        label: 'No testing has been performed on the final design.',
        points: 0,
        feedback: 'High Risk: Always conduct preliminary testing before applying to avoid costly sample failures in BIS labs.'
      }
    ]
  }
];

export const WORKFLOW_GUIDES: WorkflowGuide[] = [
  {
    id: 'simplified-route',
    title: 'Domestic Simplified Route (Recommended for Fast Approval)',
    targetAudience: 'Indian manufacturers who pre-test product samples before filing application.',
    totalEstimatedTime: '30 - 35 Working Days',
    suitability: 'Best for standard consumer products where sample testing is non-destructive or quick.',
    sourceUrl: 'https://www.bis.gov.in/apply-for-a-license/?lang=en',
    sourceLabel: 'BIS Apply for a License — Option 2 (Simplified)',
    steps: [
      {
        step: 1,
        title: 'Pre-Testing in BIS-Recognized Laboratory',
        action: 'Submit representative sample to a BIS-recognized or NABL-accredited third-party laboratory. Obtain an independent passing test report (report must be < 90 days old at time of application).',
        documents: ['Passing third-party laboratory test report', 'Internal factory routine test report'],
        tips: 'Confirm the commercial lab tests 100% of the clauses specified in the Indian Standard.'
      },
      {
        step: 2,
        title: 'Online Filing on Manakonline (Form-V)',
        action: 'Fill out Form-V on manakonline.in. Attach factory documents, calibration records, and the pre-tested laboratory test report. Pay ₹1,000 application fee + inspection fee.',
        documents: ['Form-V online form', 'Machinery & test equipment list', 'NABL calibration certificates'],
        tips: 'Double-check that the product model number on the test report exactly matches Form-V.'
      },
      {
        step: 3,
        title: 'Verification Factory Audit & Sample Draw',
        action: 'BIS officer inspects the plant within 15 days to verify in-house testing equipment, manufacturing capability, and draws verification samples for counter-testing.',
        documents: ['Factory layout plan', 'Raw material test certificates', 'Quality in-charge CV'],
        tips: 'Keep the manufacturing line running during the auditor visit so actual production is observed.'
      },
      {
        step: 4,
        title: 'Immediate Grant of Licence (CM/L)',
        action: 'If the factory audit is found satisfactory, the licence is granted immediately without waiting for verification sample test reports, provided an undertaking is submitted.',
        documents: ['Undertaking on non-judicial stamp paper', 'Advance minimum marking fee receipt'],
        tips: 'You can begin affixing the ISI mark immediately upon receipt of the CM/L number.'
      }
    ]
  },
  {
    id: 'normal-route',
    title: 'Domestic Normal Route (Traditional Procedure)',
    targetAudience: 'Manufacturers of complex machinery, cement, or products without pre-tested reports.',
    totalEstimatedTime: '60 - 90 Working Days',
    suitability: 'Required when pre-testing is not feasible or for sensitive products like packaged drinking water.',
    sourceUrl: 'https://www.bis.gov.in/certification-process-4/?lang=en',
    sourceLabel: 'BIS Certification Process 4 — Normal Route',
    steps: [
      {
        step: 1,
        title: 'Preparation & Form-I Submission',
        action: 'Ensure in-house testing equipment is fully commissioned and calibrated. Submit Form-I on Manakonline with factory and technical details.',
        documents: ['Form-I submission', 'Factory registration', 'List of machinery and in-house testing gear'],
        tips: 'Ensure your test bench is ready because an auditor can visit anytime after document clearance.'
      },
      {
        step: 2,
        title: 'Preliminary Factory Audit',
        action: 'BIS auditor visits the factory, verifies compliance with Scheme of Inspection and Testing (SIT), and witnesses routine testing in the factory lab.',
        documents: ['Calibrated instruments', 'Raw material register', 'QC personnel records'],
        tips: 'Auditor checks that testing staff can perform tests independently and accurately.'
      },
      {
        step: 3,
        title: 'Official Sample Drawing & Referral Lab Testing',
        action: 'Auditor seals sample packages and dispatches them to a BIS National Laboratory or designated referral lab for complete type testing.',
        documents: ['Sample counter-seal slip', 'LIMS dispatch note'],
        tips: 'Follow sample progress on BIS LIMS portal using your application number.'
      },
      {
        step: 4,
        title: 'Grant of Licence post Passing Report',
        action: 'Once the referral lab issues passing reports for all clauses, BIS issues the CM/L licence upon payment of the minimum marking fee.',
        documents: ['Marking fee payment voucher', 'Agreement for use of ISI mark'],
        tips: 'Initial validity is typically 1 to 2 years, renewable online.'
      }
    ]
  },
  {
    id: 'crs-route',
    title: 'Compulsory Registration Scheme (CRS) for Electronics & IT',
    targetAudience: 'Domestic & Foreign manufacturers of laptops, mobile phones, LED lights, adapters, and batteries.',
    totalEstimatedTime: '15 - 25 Working Days',
    suitability: 'Applicable to all electronic goods notified under MeitY Compulsory Registration Orders.',
    sourceUrl: 'https://www.bis.gov.in/product-certification/product-certification-process/?lang=en',
    sourceLabel: 'BIS Product Certification Process — Scheme-II',
    steps: [
      {
        step: 1,
        title: 'Sample Testing in India',
        action: 'Ship physical samples to a BIS-recognized laboratory within India for safety testing under IS 13252, IS 16102, or IS 16046.',
        documents: ['Test requisition form', 'Product circuit diagram', 'Component safety certificates'],
        tips: 'Test report is strictly valid for 90 days from issuance date for online CRS submission.'
      },
      {
        step: 2,
        title: 'Online CRS Portal Filing',
        action: 'Submit registration on the dedicated CRS portal (crsbis.in / manakonline.in) with test report, brand authorization, and AIR details (if foreign).',
        documents: ['Passing test report', 'Form-VI submission', 'Brand authorization / Trademark certificate', 'AIR affidavit'],
        tips: 'No factory audit is required for CRS registration.'
      },
      {
        step: 3,
        title: 'Grant of R-Number & Standard Marking',
        action: 'BIS grants an R-number (Registration number). The manufacturer affixes the standard BIS CRS Registration mark with the R-number on product and packaging.',
        documents: ['Official CRS Registration Letter (R-XXXXXXXX)'],
        tips: 'CRS Registration is granted for a block period of 2 years and is renewable online.'
      }
    ]
  },
  {
    id: 'fmcs-route',
    title: 'Foreign Manufacturers Certification Scheme (FMCS)',
    targetAudience: 'Overseas manufacturers outside India exporting goods to the Indian market.',
    totalEstimatedTime: '120 - 180 Working Days',
    suitability: 'Mandatory for all foreign factories manufacturing goods under Indian mandatory QCOs.',
    sourceUrl: 'https://www.bis.gov.in/fmcs/certification-process/how-to-apply/?lang=en',
    sourceLabel: 'BIS FMCS — How to Apply',
    steps: [
      {
        step: 1,
        title: 'Appoint Authorized Indian Representative (AIR)',
        action: 'Foreign manufacturer executes a nomination agreement with an Authorized Indian Representative who resides in India to represent them before BIS.',
        documents: ['AIR Agreement on Indian Stamp Paper', 'AIR KYC & Government ID proof'],
        tips: 'AIR is legally responsible for compliance and handling consumer complaints in India.'
      },
      {
        step: 2,
        title: 'Submit Application & Pay Foreign Inspection Charges',
        action: 'Submit Form-I on the FMCS portal. Pay $1,000 USD application fee plus auditor travel and daily allowances (per-diem) for overseas inspection.',
        documents: ['Factory license from foreign government', 'Process flow and test facility details in English'],
        tips: 'Arrange auditor visa and international logistics well in advance.'
      },
      {
        step: 3,
        title: 'Overseas Factory Audit & Sample Dispatch to India',
        action: 'BIS technical delegation travels to the overseas factory, audits production, and counter-seals samples which are shipped to India for laboratory testing.',
        documents: ['Joint inspection report', 'Customs import sample clearance documents'],
        tips: 'Samples must clear Indian customs and arrive safely at the designated BIS lab.'
      },
      {
        step: 4,
        title: 'Performance Bank Guarantee (PBG) & Grant of Licence',
        action: 'Upon passing test reports, manufacturer deposits a Performance Bank Guarantee (PBG) of $10,000 USD and pays annual marking fees to receive the CM/L licence.',
        documents: ['Irrevocable Performance Bank Guarantee ($10,000 USD)', 'Marking fee deposit'],
        tips: 'Foreign licenses are valid for 1 or 2 years, with periodic surveillance visits.'
      }
    ]
  }
];

export const LICENSING_SCHEME_COMPARISON = [
  {
    feature: 'Official Name',
    scheme1: 'Scheme-I: Product Certification (ISI Mark)',
    scheme2: 'Scheme-II: Compulsory Registration (CRS)',
    fmcs: 'FMCS (Foreign Manufacturers Certification Scheme)',
    hallmarking: 'Hallmarking Scheme (HUID)'
  },
  {
    feature: 'Primary Target Products',
    scheme1: 'Domestic appliances, steel, cement, toys, helmets, cables, automotive glass',
    scheme2: 'Laptops, mobile phones, LED lights, power adapters, batteries, smart watches',
    fmcs: 'All overseas goods imported into India under mandatory QCOs',
    hallmarking: 'Gold and Silver jewellery & artifacts'
  },
  {
    feature: 'Factory Audit Mandatory?',
    scheme1: 'YES - Physical on-site inspection by BIS technical officer prior to grant',
    scheme2: 'NO - Factory audit is not conducted; based purely on independent lab testing',
    fmcs: 'YES - On-site audit of foreign plant by visiting Indian BIS officers',
    hallmarking: 'NO - Jewellers register online; assaying done at certified AHC centres'
  },
  {
    feature: 'In-House Lab Required?',
    scheme1: 'YES - Complete testing bench per Scheme of Inspection and Testing (SIT)',
    scheme2: 'NO - Rely on BIS-recognized third-party NABL labs in India',
    fmcs: 'YES - Complete in-house testing facility at foreign plant',
    hallmarking: 'NO - Tested at third-party Assaying & Hallmarking Centres'
  },
  {
    feature: 'Statutory Application Fee',
    scheme1: '₹1,000 + GST (50% concession for Micro-enterprises)',
    scheme2: '₹1,000 + GST per report / model',
    fmcs: '$1,000 USD + Auditor Travel/Per-diem (~$5,000+ USD)',
    hallmarking: '₹7,500 - ₹80,000 depending on annual business turnover tier'
  },
  {
    feature: 'Typical Grant Timeline',
    scheme1: '30 days (Simplified) to 90 days (Normal)',
    scheme2: '15 to 25 working days',
    fmcs: '120 to 180 days',
    hallmarking: '1 to 2 working days (Instant online)'
  },
  {
    feature: 'Mark / Identification',
    scheme1: 'Standard ISI Mark + IS Number + CM/L (7 or 8 digits)',
    scheme2: 'Standard CRS Mark + IS Number + R-XXXXXXXX',
    fmcs: 'Standard ISI Mark + IS Number + CM/L (Foreign factory code)',
    hallmarking: 'BIS Logo + Purity Grade (e.g. 22K916) + 6-digit HUID code'
  },
  {
    feature: 'Initial Licence Validity',
    scheme1: '1 to 2 Years (Renewable up to 5 years)',
    scheme2: '2 Years (Renewable)',
    fmcs: '1 to 2 Years (Renewable)',
    hallmarking: '5 Years'
  }
];
