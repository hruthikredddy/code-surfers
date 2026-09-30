import { LabGuidance } from '../types/index.ts';

export const LAB_FINDER_GUIDELINES: LabGuidance[] = [
  {
    discipline: 'Electrical & Electronics Testing Laboratory',
    products_covered: [
      'Immersion water heaters (IS 302-2-15)',
      'Electric irons (IS 302-2-3)',
      'Plugs and socket-outlets (IS 1293)',
      'LED lamps and drivers (IS 16102, IS 15885)',
      'IT equipment and batteries (IS 13252, IS 16046)'
    ],
    applicable_standards: ['IS 302 series', 'IS 1293', 'IS 16102', 'IS 15885', 'IS 13252', 'IS 16046'],
    official_directory_url: 'https://lims.bis.gov.in',
    accreditation_requirement: 'Must be accredited by NABL under ISO/IEC 17025 and formally recognized by BIS under the BIS Laboratory Recognition Scheme (LRS).',
    search_instructions: [
      '1. Open the official BIS Laboratory Information Management System (LIMS) portal at: https://lims.bis.gov.in',
      '2. Navigate to "Know Your Lab" or "BIS Recognized Labs Directory" tab on the main portal navigation.',
      '3. Search by Indian Standard Number: Enter the exact standard (e.g. "IS 302-2-15" or "IS 16102").',
      '4. Filter by Discipline: Select "Electrical & Electronics" from the testing discipline dropdown.',
      '5. Filter by Geography: Select your State or Region to locate Central Laboratory (CL Sahibabad), Regional Laboratories (Chennai, Kolkata, Mumbai, Chandigarh), or approved commercial labs.',
      '6. Verify Current Validity: Check that the lab status shows "Recognized / Valid" and that the specific IS number is listed in their approved scope before dispatching test samples.'
    ]
  },
  {
    discipline: 'Chemical & Microbiological Testing Laboratory',
    products_covered: [
      'Packaged drinking water (IS 14543)',
      'Packaged natural mineral water (IS 13428)',
      'Toy chemical safety & heavy metal migration (IS 9873 Part 3)'
    ],
    applicable_standards: ['IS 14543', 'IS 13428', 'IS 9873 (Part 3)'],
    official_directory_url: 'https://lims.bis.gov.in',
    accreditation_requirement: 'ISO/IEC 17025 accredited with cleanroom class 10000 / BSL-2 microbiology facilities and ICP-MS/GC-MS instrumentation recognized by BIS.',
    search_instructions: [
      '1. Visit https://lims.bis.gov.in and click on "Laboratory Network".',
      '2. Select discipline "Chemical" or "Microbiological".',
      '3. In the "Product / Standard" search box, input "IS 14543" for packaged drinking water or "IS 13428".',
      '4. The directory will generate the list of authorized government laboratories and recognized commercial testing laboratories with their active scope validity.'
    ]
  },
  {
    discipline: 'Mechanical, Physical & Metallurgical Testing Laboratory',
    products_covered: [
      'Protective helmets for two wheelers (IS 4151)',
      'TMT steel bars (IS 1786)',
      'LPG cylinders and regulators (IS 3196, IS 9798)',
      'Physical safety of toys (IS 9873 Part 1)'
    ],
    applicable_standards: ['IS 4151', 'IS 1786', 'IS 3196', 'IS 9798', 'IS 9873 (Part 1)'],
    official_directory_url: 'https://lims.bis.gov.in',
    accreditation_requirement: 'Equipped with calibrated Universal Testing Machines (UTM), impact test rigs, pneumatic burst chambers, and optical emission spectrometers.',
    search_instructions: [
      '1. Access https://lims.bis.gov.in (BIS LIMS Portal).',
      '2. Select "Mechanical & Physical Testing" under test discipline.',
      '3. Search by IS number (e.g. "IS 4151" for helmets or "IS 1786" for TMT steel).',
      '4. Review the BIS Recognized Labs with active valid scope.'
    ]
  },
  {
    discipline: 'Assaying & Hallmarking Centre (AHC)',
    products_covered: [
      'Gold jewellery and artefacts (IS 1417)',
      'Silver jewellery and silverware (IS 2112)'
    ],
    applicable_standards: ['IS 1417', 'IS 1418', 'IS 2112', 'IS 2113', 'IS 15820'],
    official_directory_url: 'https://www.bis.gov.in/hallmarking-overview',
    accreditation_requirement: 'Recognized under IS 15820 (General requirements for competence of Assaying and Hallmarking Centres).',
    search_instructions: [
      '1. Visit www.bis.gov.in -> "Hallmarking" -> "Assaying and Hallmarking".',
      '2. Click on "List of Recognized Assaying & Hallmarking Centres".',
      '3. Filter by State, District, and City to view the complete directory of over 1,500+ operational AHCs with contact details and active status.'
    ]
  }
];
