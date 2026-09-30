import { SchemeInfo } from '../types/index.ts';

export const BIS_SCHEMES: SchemeInfo[] = [
  {
    id: 'scheme-1',
    name: 'Scheme-I: Product Certification Scheme (ISI Mark)',
    code: 'Scheme-I',
    short_description: 'The premier BIS Product Certification Scheme for domestic manufacturers, granting the right to use the prestigious standard ISI Mark after factory audit and sample testing.',
    full_description: 'Scheme-I is the traditional and most widely utilized product certification scheme operated by BIS under Schedule II of BIS (Conformity Assessment) Regulations, 2018. It requires the manufacturer to possess comprehensive in-house testing facilities, follow a defined Scheme of Inspection and Testing (SIT), undergo preliminary factory inspection by BIS technical officers, and successfully test samples in BIS-approved laboratories before grant of license (CM/L number).',
    applicable_to: 'Domestic manufacturers producing goods covered under mandatory Quality Control Orders (QCOs) or voluntary Indian Standards (e.g. electrical appliances, cement, steel, toys, helmets, bottled water).',
    governing_regulations: 'BIS (Conformity Assessment) Regulations, 2018 - Schedule II, Scheme-I',
    who_needs_it: [
      'Domestic manufacturers of items under mandatory QCOs (toys, steel, helmets, geysers, etc.)',
      'Manufacturers wishing to bid on Government tenders (GeM portal requires valid ISI licenses)',
      'Brand owners who operate their own manufacturing plants in India'
    ],
    key_differences: 'Unlike CRS, Scheme-I requires a physical on-site factory audit by BIS officers and mandatory in-house testing equipment prior to grant of license. Unlike Scheme-IV, it grants an ongoing renewable license rather than lot-by-lot inspection.',
    source_url: 'https://www.bis.gov.in/product-certification/conformity-assessment-schemes',
    portal_name: 'Manakonline Portal (e-BIS)',
    portal_url: 'https://www.manakonline.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Preparation & In-House Lab Setup',
        description: 'Ensure the manufacturing facility meets the Scheme of Inspection and Testing (SIT) specified by BIS for the relevant Indian Standard. Install complete in-house testing equipment and appoint qualified technical personnel.',
        estimated_timeline: '2 - 4 weeks',
        required_documents: ['Factory registration / MSME Udyam certificate', 'Manufacturing machinery list', 'In-house test equipment list with valid calibration certificates', 'Layout plan of factory premises', 'Qualified testing personnel CVs']
      },
      {
        step_number: 2,
        title: 'Online Application on Manakonline',
        description: 'Submit Form-I on the official Manakonline portal (manakonline.in) with all technical documentation and pay the statutory application fee of Rs. 1,000/- plus inspection charges.',
        estimated_timeline: '3 - 7 days',
        required_documents: ['Form-I application', 'Proof of brand ownership / trademark authorization', 'Bank consent letter / KYC']
      },
      {
        step_number: 3,
        title: 'Factory Audit by BIS Technical Auditor',
        description: 'A designated BIS technical officer visits the manufacturing plant to verify manufacturing capabilities, in-house quality control, calibration of instruments, and testing competencies.',
        estimated_timeline: 'Within 15 days of document scrutiny',
        required_documents: ['Raw material test certificates', 'Production flow chart', 'Calibration certificates of gauges and balances']
      },
      {
        step_number: 4,
        title: 'Sample Drawing & Independent Lab Testing',
        description: 'During the factory audit, the BIS officer draws representative samples of the product. The samples are sealed and sent to a BIS laboratory or BIS-recognized NABL-accredited third-party laboratory.',
        estimated_timeline: '15 - 30 days (depends on standard test duration)',
        required_documents: ['Sample dispatch form signed by auditor and factory representative']
      },
      {
        step_number: 5,
        title: 'Grant of License (CM/L Number)',
        description: 'Upon receipt of passing test reports and satisfactory audit findings, BIS issues the Certificate of License with a unique 7 or 8-digit Certification of Manufacturer/License (CM/L) number. The manufacturer is then legally authorized to apply the ISI mark.',
        estimated_timeline: '7 - 10 days post test report clearance',
        required_documents: ['Marking fee deposit receipt', 'Signed performance undertaking']
      },
      {
        step_number: 6,
        title: 'Surveillance & Annual Renewal',
        description: 'Periodic surveillance audits and random market/factory sample testing are conducted. Licenses are initially valid for 1 to 2 years and can be renewed online via Manakonline.',
        estimated_timeline: 'Annually before expiry date',
        required_documents: ['Production and sales statements under ISI mark', 'Annual marking fee payment']
      }
    ]
  },
  {
    id: 'scheme-2',
    name: 'Scheme-II: Self Declaration of Conformity (SDoC)',
    code: 'Scheme-II',
    short_description: 'Allows manufacturers to self-declare conformity with an Indian Standard based on test reports from BIS-recognized labs, without routine pre-grant factory audits.',
    full_description: 'Scheme-II operates under Schedule II of BIS Conformity Assessment Regulations. It was designed to promote ease of doing business for low-to-medium risk consumer goods. The manufacturer assumes legal responsibility for conformity by maintaining certified test reports from BIS-recognized testing laboratories and submitting an official declaration of conformity to BIS.',
    applicable_to: 'Specific product categories notified by the Central Government or BIS where self-declaration is deemed appropriate.',
    governing_regulations: 'BIS (Conformity Assessment) Regulations, 2018 - Schedule II, Scheme-II',
    who_needs_it: [
      'Manufacturers in sectors specifically designated under Scheme-II guidelines',
      'Enterprises seeking rapid market entry where technical standards permit SDoC'
    ],
    key_differences: 'Does not require physical factory inspection prior to registration; relies primarily on valid lab test reports and post-market random surveillance.',
    source_url: 'https://www.bis.gov.in',
    portal_name: 'Manakonline Portal',
    portal_url: 'https://www.manakonline.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Product Testing in BIS Recognized Lab',
        description: 'Submit product models to a BIS-recognized testing laboratory for complete type testing against the relevant Indian Standard.',
        estimated_timeline: '2 - 3 weeks',
        required_documents: ['Product technical specification sheet', 'Circuit diagrams / engineering drawings']
      },
      {
        step_number: 2,
        title: 'Preparation of Self Declaration of Conformity',
        description: 'Draft the formal SDoC declaring that the manufactured items conform to every clause of the specified standard.',
        estimated_timeline: '2 - 4 days',
        required_documents: ['Passing test report from BIS recognized lab', 'Legal undertaking of manufacturer']
      },
      {
        step_number: 3,
        title: 'Registration & Acknowledgment by BIS',
        description: 'Submit the application on Manakonline with test report and SDoC. BIS verifies documents and issues a formal Certificate of Conformity.',
        estimated_timeline: '7 - 10 working days',
        required_documents: ['Udyam / Company Incorporation', 'Authorization letter']
      }
    ]
  },
  {
    id: 'scheme-4',
    name: 'Scheme-IV: Batch Certification Scheme',
    code: 'Scheme-IV',
    short_description: 'Lot-by-lot inspection and certification of a specific manufactured or imported batch of goods, without ongoing factory licensing.',
    full_description: 'Scheme-IV is designed for single-lot imports, custom job-order manufacturing, or low-volume specialized shipments where obtaining a long-term Scheme-I manufacturing license is impractical or commercially unfeasible. A designated BIS inspecting officer draws statistical samples from the specific physical lot (e.g. at customs warehouse or factory warehouse) and issues a Batch Certificate only for the quantity tested.',
    applicable_to: 'Specific consignments, imported batches at port of entry, or seasonal production runs of products under mandatory standard orders.',
    governing_regulations: 'BIS (Conformity Assessment) Regulations, 2018 - Schedule II, Scheme-IV',
    who_needs_it: [
      'Importers importing a finite shipment of goods covered under mandatory Indian Standards',
      'Small batch domestic producers fulfilling specialized non-recurring contracts',
      'Government agencies procuring single large capital lots'
    ],
    key_differences: 'Certificate applies strictly to the specified quantity/serial numbers in that single lot. No ongoing mark usage right is granted for future production.',
    source_url: 'https://www.bis.gov.in',
    portal_name: 'Manakonline Batch Portal',
    portal_url: 'https://www.manakonline.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Declaration of Lot / Batch',
        description: 'Notify BIS about the arrival of the batch, including exact quantity, batch numbers, serial ranges, and storage location (warehouse/customs bond).',
        estimated_timeline: '1 - 3 days before sampling',
        required_documents: ['Commercial invoice / Bill of Lading', 'Packing list with serial/batch numbers', 'Manufacturer test certificate']
      },
      {
        step_number: 2,
        title: 'Sampling by BIS Officer',
        description: 'A BIS inspecting officer inspects the lot and draws statistical samples in accordance with sampling guidelines in the standard.',
        estimated_timeline: '3 - 5 days',
        required_documents: ['Warehouse inspection permission', 'Customs clearance documents (if imported)']
      },
      {
        step_number: 3,
        title: 'Batch Testing & Certificate Issuance',
        description: 'Samples are tested in a BIS laboratory. Upon passing, a Batch Certificate of Conformity is issued for that specific lot quantity.',
        estimated_timeline: '10 - 20 days',
        required_documents: ['Official test report', 'Batch clearance certificate']
      }
    ]
  },
  {
    id: 'scheme-x',
    name: 'Scheme-X: Certification for Heavy Machinery & Capital Goods',
    code: 'Scheme-X',
    short_description: 'Tailored certification framework for capital goods, pumps, transformers, and complex industrial equipment with flexible modular compliance.',
    full_description: 'Scheme-X was introduced by BIS under the revised Conformity Assessment Regulations to cater specifically to heavy engineering goods, custom-built machinery, industrial pumps, and electrical transmission infrastructure where rigid mass-production inspection rules cannot apply. It offers flexible compliance paths based on design verification, component certification, and factory audits.',
    applicable_to: 'Manufacturers of capital machinery, heavy earth-moving equipment, high-capacity industrial pumps, and power transformers.',
    governing_regulations: 'BIS (Conformity Assessment) Regulations, 2018 - Schedule II, Scheme-X',
    who_needs_it: [
      'Heavy machinery manufacturers',
      'Makers of large custom power transformers and switchgear',
      'Industrial pump and turbine producers'
    ],
    key_differences: 'Permits design type approval, component-level testing, and modular witnessed testing at the manufacturer’s test bed rather than demanding destruction of massive capital units.',
    source_url: 'https://www.bis.gov.in',
    portal_name: 'Manakonline Scheme-X',
    portal_url: 'https://www.manakonline.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Design Appraisal & Technical File Submission',
        description: 'Submit comprehensive engineering design calculations, stress analysis, CAD drawings, and bill of materials to BIS technical committee.',
        estimated_timeline: '3 - 4 weeks',
        required_documents: ['Design calculation reports', 'Component compliance certificates', 'Quality plan']
      },
      {
        step_number: 2,
        title: 'Witnessed Factory Testing',
        description: 'BIS technical experts witness full-load type tests and safety interlock demonstrations on the manufacturer’s calibrated test bed.',
        estimated_timeline: '1 - 2 weeks',
        required_documents: ['Test bed calibration certificates', 'Witness testing protocols']
      },
      {
        step_number: 3,
        title: 'Grant of Scheme-X Certificate',
        description: 'BIS issues Scheme-X certificate authorizing identification marking for certified machinery families.',
        estimated_timeline: '2 weeks',
        required_documents: ['Final witnessed test report', 'Maintenance manual']
      }
    ]
  },
  {
    id: 'scheme-crs',
    name: 'Compulsory Registration Scheme (CRS) - IT & Electronics Goods',
    code: 'CRS',
    short_description: 'Mandatory registration scheme for IT, telecom, electronics, LED lighting, and solar PV goods notified by MeitY and MNRE.',
    full_description: 'The Compulsory Registration Scheme (CRS) is administered by BIS under the "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order" issued by the Ministry of Electronics and Information Technology (MeitY), as well as solar orders by MNRE. Products must be tested in BIS-recognized laboratories in India. Upon submission of test reports, BIS issues a unique Registration Number (R-XXXXXXXX) and the standard "Self Declaration - Conforming to IS XXXXX" mark.',
    applicable_to: 'Over 60+ notified electronic and IT product categories: mobile phones, laptops, tablets, LED bulbs, LED drivers, power banks, adapters, smartwatches, televisions, and solar inverters.',
    governing_regulations: 'BIS Act 2016, Section 13 & MeitY CRO Orders',
    who_needs_it: [
      'Domestic manufacturers of electronics, LED lighting, or IT hardware',
      'Foreign electronic brands selling smart devices, computers, and batteries in India (requires Authorized Indian Representative - AIR)',
      'Importers of telecom and electronic hardware'
    ],
    key_differences: 'CRS does NOT require a pre-grant factory inspection. Certification is granted purely on laboratory test reports submitted through the dedicated CRS portal (crsbis.in). Market surveillance is conducted periodically by drawing samples from retail shelves.',
    source_url: 'https://www.crsbis.in',
    portal_name: 'Dedicated CRS Portal',
    portal_url: 'https://www.crsbis.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Sample Testing in BIS-Recognized Lab in India',
        description: 'Generate a test request on the CRS portal and send product samples to a BIS-recognized testing laboratory situated in India for complete safety testing.',
        estimated_timeline: '2 - 4 weeks',
        required_documents: ['Sample submission letter', 'Product technical construction file', 'Circuit diagram and PCB layout']
      },
      {
        step_number: 2,
        title: 'User Profile Creation & AIR Appointment',
        description: 'Create an account on crsbis.in. Foreign manufacturers must appoint an Authorized Indian Representative (AIR) who is legally responsible for regulatory compliance in India.',
        estimated_timeline: '2 - 3 days',
        required_documents: ['AIR Agreement', 'AIR Indian ID / GST / KYC', 'Manufacturer factory registration']
      },
      {
        step_number: 3,
        title: 'Online Application Submission',
        description: 'Upload the official lab test report (valid for 90 days from date of issue) along with brand endorsement documents, Form-I, and fee payment.',
        estimated_timeline: '1 - 2 days',
        required_documents: ['Valid test report (issued within 90 days)', 'Trademark registration certificate', 'Brand authorization letter']
      },
      {
        step_number: 4,
        title: 'Grant of CRS Registration Number',
        description: 'BIS scrutinizes the application and test reports. Upon approval, BIS grants a unique Registration Number (R-XXXXXXXX) and approval letter.',
        estimated_timeline: '10 - 15 working days',
        required_documents: ['Registration approval letter from BIS']
      },
      {
        step_number: 5,
        title: 'Product Labeling with Standard Mark',
        description: 'Manufacturer applies the official BIS Standard Mark on the product packaging and body: "IS XXXXX:YYYY / R-XXXXXXXX / www.bis.gov.in".',
        estimated_timeline: 'Immediate post grant',
        required_documents: ['Affidavit of label design conformity']
      }
    ]
  },
  {
    id: 'scheme-fmcs',
    name: 'Foreign Manufacturers Certification Scheme (FMCS)',
    code: 'FMCS',
    short_description: 'Grants the prestigious ISI Mark to overseas manufacturers producing goods outside India intended for export to the Indian market.',
    full_description: 'Operated since 2000 under Scheme-I of BIS (Conformity Assessment) Regulations, FMCS enables foreign manufacturing facilities located anywhere across the world to obtain the standard ISI mark. It requires appointing an Authorized Indian Representative (AIR), hosting BIS inspecting officers for a physical overseas factory audit, and testing samples in India.',
    applicable_to: 'Any foreign manufacturing plant located outside the territory of India intending to export goods covered under mandatory Indian Standards or voluntary standards into India.',
    governing_regulations: 'BIS (Conformity Assessment) Regulations, 2018 - Scheme-I (Foreign)',
    who_needs_it: [
      'Global manufacturers of steel, tires, chemicals, toys, automotive components, and glass shipping goods to India',
      'Multinational enterprises supplying Indian infrastructure projects requiring ISI certification'
    ],
    key_differences: 'Requires physical factory visit by BIS officers to foreign country (applicant pays travel, boarding, per-diem and audit fees), and mandatory appointment of an Authorized Indian Representative (AIR).',
    source_url: 'https://www.bis.gov.in/foreign-manufacturers-certification-scheme',
    portal_name: 'Manakonline FMCS Portal',
    portal_url: 'https://www.manakonline.in',
    process_steps: [
      {
        step_number: 1,
        title: 'Nomination of Authorized Indian Representative (AIR)',
        description: 'The foreign manufacturer must execute an AIR agreement appointing an Indian citizen or corporate entity to represent them before BIS and accept legal accountability.',
        estimated_timeline: '1 week',
        required_documents: ['AIR appointment agreement', 'AIR proof of identity, address and PAN/GST', 'Power of Attorney']
      },
      {
        step_number: 2,
        title: 'Submission of Form-VI Application',
        description: 'Submit detailed application on Manakonline with factory manufacturing diagrams, in-house laboratory equipment, and pay statutory application fee in foreign currency (USD).',
        estimated_timeline: '1 - 2 weeks',
        required_documents: ['Business license of foreign country', 'Factory layout & manufacturing process flow', 'List of in-house testing equipment with calibration', 'Raw material test certificates']
      },
      {
        step_number: 3,
        title: 'Overseas Factory Audit by BIS Delegation',
        description: 'BIS officers travel to the overseas manufacturing facility to audit quality management, verify test capabilities, and witness testing of products.',
        estimated_timeline: 'Scheduled based on visa and itinerary (approx 4 - 8 weeks)',
        required_documents: ['Visa invitation letters', 'Travel and inspection fee deposits', 'Factory quality manual']
      },
      {
        step_number: 4,
        title: 'Sample Dispatch & Testing in India',
        description: 'Samples drawn during the overseas audit are sealed by BIS auditors and dispatched to a designated BIS laboratory in India for testing.',
        estimated_timeline: '3 - 6 weeks including customs clearance and transit',
        required_documents: ['Airway bill of sealed sample consignment', 'Customs duty exemption / import permit']
      },
      {
        step_number: 5,
        title: 'Grant of FMCS License & Performance Bank Guarantee',
        description: 'Upon successful test report, applicant submits a Performance Bank Guarantee (PBG) of USD 10,000 from an RBI-recognized bank in India, and pays annual marking fees. BIS grants the CM/L license.',
        estimated_timeline: '2 weeks post lab clearance',
        required_documents: ['Performance Bank Guarantee (PBG)', 'Signed agreement with BIS', 'Marking fee payment proof']
      }
    ]
  }
];
