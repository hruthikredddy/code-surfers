import {
  ProductTestingProfile,
  BisLabItem,
  SampleTestReport,
  TestingRoadmapStage,
  TestingQAPair
} from '../types/index.ts';

export const BIS_RECOGNIZED_LABS: BisLabItem[] = [
  {
    id: 'lab-bis-cl-sahibabad',
    name: 'BIS Central Laboratory (CL Sahibabad)',
    type: 'Central Laboratory',
    location: 'Sahibabad Industrial Area, Ghaziabad, Uttar Pradesh (Delhi NCR)',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    region: 'Central',
    accreditation: 'NABL Accredited (ISO/IEC 17025:2017) & Apex Testing Facility of Bureau of Indian Standards',
    contact_info: {
      address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad - 201010',
      phone: '+91-120-4177100 / 4177101',
      email: 'cl@bis.gov.in',
      lims_id: 'BIS-CL-001',
      website: 'https://lims.bis.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 4151:2015',
      'IS 14543:2024',
      'IS 302-2-15:2009',
      'IS 1293:2019',
      'IS 9873 (Part 1 & 3)',
      'IS 1786:2008'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-handle-tensile',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-test-corrosion-salt',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'ss-vac-vacuum-drop',
      'ss-vac-leak-vapor',
      'helmet-test-impact-absorb',
      'helmet-test-retention-dynamic',
      'helmet-test-rigidity',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'pdw-test-pesticides',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'elec-test-dry-boil',
      'toy-test-mech-hazard',
      'toy-test-heavy-metals'
    ],
    turnaround_time: '10 to 18 Business Days',
    source_reference: 'BIS LIMS Master Directory / BIS CL Gazette S.O. 1044'
  },
  {
    id: 'lab-bis-nrl-mohali',
    name: 'BIS Northern Regional Laboratory (NRL Mohali)',
    type: 'Regional Laboratory',
    location: 'Phase VII, Industrial Focal Point, Mohali, Punjab',
    city: 'Mohali',
    state: 'Punjab',
    region: 'North',
    accreditation: 'NABL Accredited (Cert TC-5120) & Statutory BIS Regional Testing Lab',
    contact_info: {
      address: 'Plot No. 4-A, Sector 27-B, Industrial Area, Mohali - 160019',
      phone: '+91-172-2214300',
      email: 'nrl@bis.gov.in',
      lims_id: 'BIS-NRL-002',
      website: 'https://lims.bis.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 14543:2024',
      'IS 1786:2008',
      'IS 302-2-15:2009',
      'IS 1293:2019'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-handle-tensile',
      'ss-test-migration',
      'ss-test-corrosion-salt',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'tmt-test-tensile',
      'tmt-test-bend'
    ],
    turnaround_time: '12 to 20 Business Days',
    source_reference: 'BIS LRS Scheme & LIMS Northern Registry'
  },
  {
    id: 'lab-bis-srl-chennai',
    name: 'BIS Southern Regional Laboratory (SRL Chennai)',
    type: 'Regional Laboratory',
    location: 'CIT Campus, IV Cross Road, Taramani, Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    accreditation: 'NABL Accredited (Cert TC-5240) & Statutory BIS Southern Hub',
    contact_info: {
      address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
      phone: '+91-44-22541442 / 22541216',
      email: 'srl@bis.gov.in',
      lims_id: 'BIS-SRL-003',
      website: 'https://lims.bis.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 4151:2015',
      'IS 14543:2024',
      'IS 302-2-15:2009',
      'IS 1293:2019',
      'IS 15885 (Part 2/Sec 13)',
      'IS 16046-2:2018'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'helmet-test-impact-absorb',
      'helmet-test-retention-dynamic',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'batt-test-short-circuit',
      'batt-test-thermal-abuse'
    ],
    turnaround_time: '10 to 16 Business Days',
    source_reference: 'BIS LIMS Southern Division / NABL Directory'
  },
  {
    id: 'lab-bis-wrl-mumbai',
    name: 'BIS Western Regional Laboratory (WRL Mumbai)',
    type: 'Regional Laboratory',
    location: 'Manakalaya, E9, MIDC, Andheri (East), Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    accreditation: 'NABL Accredited (Cert TC-5310) & Statutory BIS Western Hub',
    contact_info: {
      address: 'Manakalaya, E9, Road No. 8, MIDC, Andheri East, Mumbai - 400093',
      phone: '+91-22-28329295 / 28327858',
      email: 'wrl@bis.gov.in',
      lims_id: 'BIS-WRL-004',
      website: 'https://lims.bis.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 14543:2024',
      'IS 302-2-15:2009',
      'IS 1293:2019',
      'IS 9873 (Part 1 & 3)',
      'IS 1786:2008'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-migration',
      'ss-vac-heat-retention',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'pdw-test-pesticides',
      'elec-test-hv-flash',
      'toy-test-mech-hazard',
      'toy-test-heavy-metals',
      'tmt-test-tensile'
    ],
    turnaround_time: '12 to 18 Business Days',
    source_reference: 'BIS Western Regional Directory / Manakonline'
  },
  {
    id: 'lab-bis-erl-kolkata',
    name: 'BIS Eastern Regional Laboratory (ERL Kolkata)',
    type: 'Regional Laboratory',
    location: '1/14, C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    accreditation: 'NABL Accredited (Cert TC-5420) & Statutory BIS Eastern Hub',
    contact_info: {
      address: '1/14, C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
      phone: '+91-33-23553243',
      email: 'erl@bis.gov.in',
      lims_id: 'BIS-ERL-005',
      website: 'https://lims.bis.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 1786:2008',
      'IS 14543:2024',
      'IS 302-2-15:2009'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'tmt-test-tensile',
      'tmt-test-bend',
      'pdw-test-microbio',
      'elec-test-hv-flash'
    ],
    turnaround_time: '14 to 22 Business Days',
    source_reference: 'BIS Eastern Regional Directory / LIMS ERL'
  },
  {
    id: 'lab-shriram-institute-delhi',
    name: 'Shriram Institute for Industrial Research (SIIR)',
    type: 'BIS Recognized Commercial Lab',
    location: '19, University Road, Delhi & Gurugram Complex',
    city: 'New Delhi',
    state: 'Delhi',
    region: 'North',
    accreditation: 'NABL ISO/IEC 17025 (Cert TC-5601) & Premier BIS Recognized Lab under LRS',
    contact_info: {
      address: '19, University Road, University Enclave, Delhi - 110007',
      phone: '+91-11-27667267 / 27667860',
      email: 'sridlhi@shriraminstitute.org',
      lims_id: 'SIIR-DEL-089',
      website: 'https://www.shriraminstitute.org'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 14543:2024',
      'IS 9873 (Part 1 & 3)',
      'IS 302-2-15:2009'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-handle-tensile',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-test-corrosion-salt',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'ss-vac-leak-vapor',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'pdw-test-pesticides',
      'toy-test-heavy-metals',
      'toy-test-mech-hazard'
    ],
    turnaround_time: '7 to 12 Business Days',
    source_reference: 'BIS LRS Recognized Lab List / NABL Certificate TC-5601'
  },
  {
    id: 'lab-nth-alipore-kolkata',
    name: 'National Test House (NTH Alipore)',
    type: 'Central Laboratory',
    location: 'Block CP, Sector V, Salt Lake & Alipore, Kolkata, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    accreditation: 'NABL Accredited (ISO/IEC 17025) & Government of India Premier Testing Organization',
    contact_info: {
      address: '11/1 Judges Court Road, Alipore, Kolkata - 700027',
      phone: '+91-33-24791550',
      email: 'dg-nth@gov.in',
      lims_id: 'NTH-ER-012',
      website: 'https://nth.gov.in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 1786:2008',
      'IS 14543:2024',
      'IS 1293:2019'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-drop-impact',
      'ss-test-corrosion-salt',
      'tmt-test-tensile',
      'tmt-test-bend',
      'pdw-test-microbio'
    ],
    turnaround_time: '10 to 18 Business Days',
    source_reference: 'NTH Ministry of Consumer Affairs / BIS LRS'
  },
  {
    id: 'lab-tuv-rheinland-bengaluru',
    name: 'TÜV Rheinland India Pvt. Ltd.',
    type: 'BIS Recognized Commercial Lab',
    location: 'Electronics City Phase 1, Hosur Road, Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    accreditation: 'NABL ISO/IEC 17025 (Cert TC-5880) & BIS LRS Recognized for Electronics & Materials',
    contact_info: {
      address: '27/B, Doddanakundi Industrial Area, Bengaluru - 560048',
      phone: '+91-80-46498000',
      email: 'info-ind@tuv.com',
      lims_id: 'TUV-BLR-045',
      website: 'https://www.tuv.com/india'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 15885 (Part 2/Sec 13)',
      'IS 16046-2:2018',
      'IS 302-2-15:2009',
      'IS 1293:2019'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'elec-test-dry-boil',
      'batt-test-short-circuit',
      'batt-test-thermal-abuse',
      'batt-test-drop'
    ],
    turnaround_time: '6 to 10 Business Days',
    source_reference: 'BIS LRS Recognition Gazette / NABL TC-5880'
  },
  {
    id: 'lab-tuv-sud-gurugram',
    name: 'TÜV SÜD South Asia Pvt. Ltd.',
    type: 'BIS Recognized Commercial Lab',
    location: 'Sector 34, Gurugram, Haryana (Delhi NCR)',
    city: 'Gurugram',
    state: 'Haryana',
    region: 'North',
    accreditation: 'NABL ISO/IEC 17025 & BIS Recognized Multi-Discipline Lab',
    contact_info: {
      address: 'Plot No. 373, Udyog Vihar Phase II, Gurugram - 122016',
      phone: '+91-124-6199699',
      email: 'info.in@tuvsud.com',
      lims_id: 'TUVSUD-GUR-067',
      website: 'https://www.tuvsud.com/en-in'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 9873 (Part 1 & 3)',
      'IS 302-2-15:2009',
      'IS 16046-2:2018'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-test-drop-impact',
      'ss-vac-heat-retention',
      'ss-vac-cold-retention',
      'toy-test-heavy-metals',
      'toy-test-mech-hazard',
      'batt-test-short-circuit'
    ],
    turnaround_time: '7 to 12 Business Days',
    source_reference: 'BIS LRS Recognized Directory'
  },
  {
    id: 'lab-intertek-mumbai',
    name: 'Intertek India Private Limited',
    type: 'BIS Recognized Commercial Lab',
    location: 'Marol Industrial Area, Andheri East, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    accreditation: 'NABL ISO/IEC 17025 (Cert TC-6102) & BIS LRS Recognized Laboratory',
    contact_info: {
      address: 'F-Wing, Tex Centre, Chandivali Farm Road, Andheri East, Mumbai - 400072',
      phone: '+91-22-42450100',
      email: 'labindia@intertek.com',
      lims_id: 'INTERTEK-MUM-104',
      website: 'https://www.intertek.com'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 9873 (Part 1 & 3)',
      'IS 14543:2024'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-test-corrosion-salt',
      'ss-vac-heat-retention',
      'toy-test-heavy-metals',
      'toy-test-mech-hazard',
      'pdw-test-microbio'
    ],
    turnaround_time: '7 to 11 Business Days',
    source_reference: 'BIS LRS Portal & NABL Scope Directory'
  },
  {
    id: 'lab-arai-pune',
    name: 'Automotive Research Association of India (ARAI Pune)',
    type: 'Central Laboratory',
    location: 'Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    accreditation: 'NABL Accredited & Apex Automotive & Helmet Testing Body under Ministry of Heavy Industries',
    contact_info: {
      address: 'Post Box No. 832, Vetal Hill, Pune - 411004',
      phone: '+91-20-30231111',
      email: 'director@araiindia.com',
      lims_id: 'ARAI-PUN-008',
      website: 'https://www.araiindia.com'
    },
    supported_standards: ['IS 4151:2015'],
    supported_test_ids: [
      'helmet-test-impact-absorb',
      'helmet-test-retention-dynamic',
      'helmet-test-retention-detach',
      'helmet-test-rigidity',
      'helmet-test-visor-optical'
    ],
    turnaround_time: '14 to 21 Business Days',
    source_reference: 'BIS CM/L Helmet Testing Approval & Gazette S.O. 529(E)'
  },
  {
    id: 'lab-cpri-bengaluru',
    name: 'Central Power Research Institute (CPRI Bengaluru)',
    type: 'Central Laboratory',
    location: 'Prof. Sir C.V. Raman Road, Sadashivanagar, Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    accreditation: 'NABL Accredited & Autonomous Society under Ministry of Power, Govt. of India',
    contact_info: {
      address: 'P.B. No. 8066, Sadashivanagar Sub P.O., Bengaluru - 560080',
      phone: '+91-80-22072222',
      email: 'cpri@cpri.in',
      lims_id: 'CPRI-BLR-009',
      website: 'https://cpri.res.in'
    },
    supported_standards: ['IS 1293:2019', 'IS 302-2-15:2009', 'IS 15885 (Part 2/Sec 13)'],
    supported_test_ids: [
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'elec-test-dry-boil',
      'plug-test-temp-rise',
      'plug-test-glow-wire'
    ],
    turnaround_time: '14 to 25 Business Days',
    source_reference: 'BIS LIMS Electrical Testing Directory'
  },
  {
    id: 'lab-vimta-labs-hyderabad',
    name: 'Vimta Labs Limited (Hyderabad Central Life Sciences & Testing Hub)',
    type: 'BIS Recognized Commercial Lab',
    location: 'IDA Phase II, Cherlapally, Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    accreditation: 'NABL Accredited (ISO/IEC 17025:2017) & BIS LRS Recognized Facility for Food, Water, Materials & Electrical Safety',
    contact_info: {
      address: 'Plot No. 142, IDA Phase II, Cherlapally, Hyderabad, Telangana - 500051',
      phone: '+91-40-67404040',
      email: 'testing@vimta.com',
      lims_id: 'VIMTA-HYD-033',
      website: 'https://www.vimta.com'
    },
    supported_standards: [
      'IS 17803:2022',
      'IS 17526:2021',
      'IS 14543:2024',
      'IS 13428:2024',
      'IS 302-2-15:2009',
      'IS 1293:2019',
      'IS 9873 (Part 1 & 3)',
      'IS 1786:2008'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'ss-test-migration',
      'ss-test-toxic-metals',
      'ss-test-corrosion-salt',
      'ss-vac-heat-retention',
      'pdw-test-microbio',
      'pdw-test-heavy-metals',
      'pdw-test-pesticides',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'elec-test-dry-boil',
      'toy-test-heavy-metals',
      'toy-test-mech-hazard'
    ],
    turnaround_time: '8 to 14 Business Days',
    source_reference: 'BIS LRS Southern Division / LIMS Directory Telangana'
  },
  {
    id: 'lab-nth-hyderabad',
    name: 'National Test House (NTH South - Hyderabad Laboratory)',
    type: 'Central Laboratory',
    location: 'Moula Ali Industrial Area, Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    accreditation: 'NABL Accredited (ISO/IEC 17025) & Central Govt Testing Laboratory under Department of Consumer Affairs',
    contact_info: {
      address: 'Moula Ali Industrial Area, Hyderabad, Telangana - 500040',
      phone: '+91-40-27121400',
      email: 'nth-hyd@gov.in',
      lims_id: 'NTH-HYD-019',
      website: 'https://nth.gov.in'
    },
    supported_standards: [
      'IS 1786:2008',
      'IS 1293:2019',
      'IS 302-2-15:2009',
      'IS 4151:2015',
      'IS 14543:2024',
      'IS 17803:2022'
    ],
    supported_test_ids: [
      'ss-test-chem-comp',
      'ss-test-dims',
      'ss-test-hydro-leak',
      'tmt-test-tensile',
      'tmt-test-bend',
      'elec-test-hv-flash',
      'elec-test-leakage-current',
      'pdw-test-microbio',
      'helmet-test-impact-absorb'
    ],
    turnaround_time: '10 to 18 Business Days',
    source_reference: 'NTH Department of Consumer Affairs / BIS LRS Registry'
  }
];

export const PRODUCT_TESTING_PROFILES: ProductTestingProfile[] = [
  {
    id: 'ss-water-bottle-non-insulated',
    product_name: 'Stainless Steel Water Bottles (Non-Insulated)',
    product_aliases: [
      'stainless steel water bottles',
      'steel water bottle',
      'stainless steel bottle',
      'single wall bottle',
      'metal water bottle',
      'water bottle',
      'steel bottle'
    ],
    category: 'Cookware, Utensils & Beverage Containers',
    standard_id: 'IS-17803',
    is_number: 'IS 17803:2022',
    standard_title: 'Non-Insulated Stainless Steel Water Bottles - Specification',
    qco_reference: 'Cookware, Utensils and Cans for foods and beverages (Quality Control) Order, 2024 (Mandatory ISI Mark)',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 8 finished bottles with caps from same production batch (4 for complete testing + 4 for counter samples)',
    estimated_turnaround_days: '8 - 14 Business Days',
    required_tests: [
      {
        id: 'ss-test-chem-comp',
        test_name: 'Material Grade & Chemical Composition Analysis',
        category: 'Chemical & Material',
        purpose: 'Verifies body and neck are fabricated from authentic austenitic food-grade stainless steel (Grade 304 / X04Cr19Ni9) per IS 6911.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 5.1',
        required_test_method: 'Optical Emission Spectrometry (OES) / Wet chemical analysis in accordance with IS 228 (Parts 1 to 24)',
        important_conditions: 'Sample shavings taken from bottle body, neck, and threaded mouth area; surface oxide layer removed before excitation.',
        parameters: 'Chromium (Cr): 17.5% - 19.5%, Nickel (Ni): 8.0% - 10.5%, Carbon (C): Max 0.08%, Manganese (Mn): Max 2.0%, Sulfur (S): Max 0.030%',
        acceptance_criteria: 'All constituent elements must conform strictly to Grade 304 chemical limits; 200 series or non-food grade grades are strictly rejected.',
        traceability_source: 'BIS Scheme of Testing & Inspection (STI/17803/1, Cl 5.1)',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-rheinland-bengaluru',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-dims',
        test_name: 'Capacity, Dimensions & Wall Thickness Verification',
        category: 'Mechanical & Physical',
        purpose: 'Ensures accurate brimful liquid capacity, mouth diameter, uniform sheet thickness, and baseline mechanical rigidity.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 6 & Table 1',
        required_test_method: 'Volumetric gravimetric filling using distilled water at 27±2°C; ultrasonic wall thickness gauge or vernier micrometer.',
        important_conditions: 'Measurements taken at 5 points: base radius, lower cylindrical wall, mid-body, shoulder, and threaded neck.',
        parameters: 'Nominal volume tolerance: ±3% of declared capacity; minimum body sheet thickness: 0.45 mm; base thickness: min 0.50 mm.',
        acceptance_criteria: 'No localized thinning below 0.40 mm; declared capacity (e.g. 750 ml) within permissible ±3% tolerance.',
        traceability_source: 'IS 17803:2022 Clause 6.2 & STI/17803/1 Table 1',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-hydro-leak',
        test_name: 'Hydrostatic Pressure & Inversion Leakage Test',
        category: 'Mechanical & Physical',
        purpose: 'Evaluates hermetic seal integrity of the screw cap and silicone gasket under hydrostatic pressure and prolonged inversion.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 8.2',
        required_test_method: 'Bottle filled to 100% capacity, cap torqued to specified manufacturer rating (1.5 - 2.0 N·m). Inverted for 24 h at room temperature. Secondary test applies 20 kPa internal pneumatic/hydrostatic pressure for 10 min.',
        important_conditions: 'Testing conducted with room temperature water (27°C) and hot water (60°C); absorbent filter paper placed under inverted cap.',
        parameters: 'Applied internal pressure: 20 kPa (0.2 bar); duration: 10 minutes active pressure + 24 hours static inverted hold.',
        acceptance_criteria: 'Zero drop leakage, moisture staining on absorbent paper, or deformation of the neck/cap assembly.',
        traceability_source: 'IS 17803:2022 Clause 8.2 / STI/17803/1 Cl 8',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-drop-impact',
        test_name: 'Drop & Impact Resistance Test',
        category: 'Mechanical & Physical',
        purpose: 'Simulates accidental drops onto hard flooring to verify that the bottle does not fracture, rupture seam welds, or release liquid.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 9.1',
        required_test_method: 'Free-fall drop test apparatus with quick-release mechanism; steel/concrete impact floor slab (minimum 50 mm thickness).',
        important_conditions: 'Bottle filled to nominal volume with water at 27±2°C. Dropped from a height of 1.2 m at 3 distinct impact orientations: (1) flat on bottom base, (2) inverted vertically on cap, (3) tilted at 45° angle on bottom rim.',
        parameters: 'Drop height: 1.20 m (±10 mm); impact surface: solid concrete / 20 mm steel plate; 3 impacts per specimen.',
        acceptance_criteria: 'No water leakage, no structural rupture, no detachment of base or neck seams. Superficial cosmetic dents permitted provided seal remains liquid-tight.',
        traceability_source: 'IS 17803:2022 Clause 9.1 & Annexure B',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-sud-gurugram',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-handle-tensile',
        test_name: 'Handle & Loop Pull Strength Test',
        category: 'Mechanical & Physical',
        purpose: 'Verifies the mechanical integrity of carrying handles, loops, carabiner attachments, or lid straps under heavy load.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 9.3',
        required_test_method: 'Universal tensile testing machine or calibrated dead weight apparatus.',
        important_conditions: 'Dead load of 250 N (approx 25.5 kg) suspended from the handle/loop for a continuous duration of 5 minutes.',
        parameters: 'Tensile load: 250 N ± 5 N; duration: 300 seconds continuous hold.',
        acceptance_criteria: 'No breakage, detachment, shearing of hinge pins, or permanent elongation exceeding 5% of handle span.',
        traceability_source: 'IS 17803:2022 Clause 9.3',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-migration',
        test_name: 'Overall Migration & Food Contact Safety Test',
        category: 'Hygiene & Food Contact',
        purpose: 'Evaluates the safety of all food contact surfaces (interior stainless steel and cap silicone sealing ring) against leaching into beverages.',
        relevant_standard: 'IS 17803:2022 / IS 9845:1998',
        relevant_clause: 'Clause 10.1',
        required_test_method: 'Food simulant exposure method as specified in IS 9845 (Methods of analysis for overall migration of constituents of plastics and food contact articles).',
        important_conditions: 'Simulant A: Distilled water (40°C for 10 days or 70°C for 2 hours); Simulant B: 3% Acetic Acid (representing acidic beverages like juices); Simulant C: 50% Ethanol.',
        parameters: 'Overall migration limit: Maximum 10 mg/dm² of contact surface (or 60 mg/kg of simulant).',
        acceptance_criteria: 'Non-volatile residue extracted by 3% acetic acid and distilled water must not exceed 10 mg/dm².',
        traceability_source: 'IS 17803:2022 Clause 10 & IS 9845:1998',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-rheinland-bengaluru',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-toxic-metals',
        test_name: 'Specific Toxic Heavy Metals Leaching (Lead, Cadmium, Nickel)',
        category: 'Chemical & Material',
        purpose: 'Mandatory consumer health safety test to detect harmful heavy metal ions migrating from welded seams or alloy impurities into drinking water.',
        relevant_standard: 'IS 17803:2022',
        relevant_clause: 'Clause 10.3',
        required_test_method: 'Inductively Coupled Plasma Mass Spectrometry (ICP-MS) or Flame Atomic Absorption Spectrophotometry (AAS).',
        important_conditions: 'Bottle filled with 4% acetic acid simulant and conditioned at 22±2°C for 24 hours under light-excluded chamber.',
        parameters: 'Lead (Pb) limit: Max 0.01 mg/l; Cadmium (Cd) limit: Max 0.005 mg/l; Nickel (Ni) limit: Max 0.1 mg/l.',
        acceptance_criteria: 'Concentration of heavy metal ions in simulant extract must be strictly below maximum permissible thresholds.',
        traceability_source: 'IS 17803:2022 Clause 10.3 / FSSAI Food Contact Regulation harmonization',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi',
          'lab-tuv-rheinland-bengaluru',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      },
      {
        id: 'ss-test-corrosion-salt',
        test_name: 'Corrosion Resistance Neutral Salt Spray (NSS) Test',
        category: 'Durability & Performance',
        purpose: 'Verifies external and internal corrosion protection against perspiration, saline air, and cleaning detergents.',
        relevant_standard: 'IS 17803:2022 / IS 9844',
        relevant_clause: 'Clause 11',
        required_test_method: 'Continuous 5% NaCl salt spray fog chamber operated at 35±2°C for 24 hours per IS 9844.',
        important_conditions: 'Specimen cleaned, dried, and inspected under 10x magnification after chamber exposure.',
        parameters: 'Salt concentration: 50 ± 5 g/l NaCl; pH of collected solution: 6.5 - 7.2; duration: 24 hours continuous exposure.',
        acceptance_criteria: 'Zero pitting, rust spots, blistering of exterior powder coating, or discoloration on inner/outer stainless surfaces.',
        traceability_source: 'IS 17803:2022 Clause 11 & IS 9844',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi',
          'lab-intertek-mumbai',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'ss-water-bottle-vacuum-insulated',
    product_name: 'Stainless Steel Vacuum Flasks & Insulated Bottles',
    product_aliases: [
      'vacuum flask',
      'insulated bottle',
      'thermo flask',
      'double wall stainless steel bottle',
      'hot and cold bottle',
      'vacuum insulated bottle'
    ],
    category: 'Cookware, Utensils & Beverage Containers',
    standard_id: 'IS-17526',
    is_number: 'IS 17526:2021',
    standard_title: 'Stainless Steel Vacuum Flasks / Insulated Water Bottles - Specification',
    qco_reference: 'Cookware, Utensils and Cans for foods and beverages (Quality Control) Order, 2024',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 6 double-walled vacuum flasks with stoppers from commercial batch',
    estimated_turnaround_days: '10 - 15 Business Days',
    required_tests: [
      {
        id: 'ss-vac-heat-retention',
        test_name: 'Thermal Insulation Efficiency / Heat Retention Test',
        category: 'Thermal & Safety',
        purpose: 'Validates that the double-walled vacuum chamber maintains hot beverages above safe drinking temperature over 6 and 24 hour intervals.',
        relevant_standard: 'IS 17526:2021',
        relevant_clause: 'Clause 6.2 & Table 2',
        required_test_method: 'Flask filled with boiling distilled water (>98°C) to brimful capacity minus 10 mm. Stopper tightened to recommended torque. Placed in draft-free temperature-controlled room at 20±2°C.',
        important_conditions: 'Thermocouple probe inserted at centroid of liquid volume; ambient room recorded continuously.',
        parameters: 'Initial water temperature: ≥98.0°C; 6-Hour threshold: minimum 70.0°C; 24-Hour threshold: minimum 45.0°C.',
        acceptance_criteria: 'Liquid temperature after 6 hours must be ≥70°C and after 24 hours ≥45°C. Outer casing must remain at room temperature (no heat bridging).',
        traceability_source: 'IS 17526:2021 Clause 6.2',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-rheinland-bengaluru',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      },
      {
        id: 'ss-vac-cold-retention',
        test_name: 'Cold Beverage Temperature Retention Test',
        category: 'Thermal & Safety',
        purpose: 'Ensures cold beverages remain chilled without condensation forming on the outer stainless steel wall.',
        relevant_standard: 'IS 17526:2021',
        relevant_clause: 'Clause 6.3',
        required_test_method: 'Flask filled with ice water at 4±1°C. Placed in environmental test chamber at 27±2°C and 65% RH for 12 hours.',
        important_conditions: 'Recorded after 6 and 12 hours duration.',
        parameters: 'Initial temperature: 4.0°C; 12-Hour maximum threshold: 10.0°C.',
        acceptance_criteria: 'Liquid temperature must remain below 10°C after 12 hours; zero sweat condensation beads on outer shell.',
        traceability_source: 'IS 17526:2021 Clause 6.3',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi',
          'lab-tuv-rheinland-bengaluru'
        ],
        mandatory: true
      },
      {
        id: 'ss-vac-vacuum-drop',
        test_name: 'Vacuum Integrity Drop Test',
        category: 'Mechanical & Physical',
        purpose: 'Verifies that mechanical shock from dropping does not compromise the inner glass/steel vacuum seal or weld joints.',
        relevant_standard: 'IS 17526:2021',
        relevant_clause: 'Clause 7.4',
        required_test_method: 'Flask filled with room temperature water dropped from 0.8 m onto concrete base, followed immediately by repeat heat retention test.',
        important_conditions: 'One drop on base, one drop on side at 45° angle.',
        parameters: 'Drop height: 0.80 m; post-drop thermal insulation test.',
        acceptance_criteria: 'No loss of vacuum insulation efficiency; thermal retention must not degrade by more than 2°C compared to pre-drop value.',
        traceability_source: 'IS 17526:2021 Clause 7.4',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi'
        ],
        mandatory: true
      },
      {
        id: 'ss-vac-leak-vapor',
        test_name: 'Stopper Vapor Pressure & Inversion Seal Test',
        category: 'Mechanical & Physical',
        purpose: 'Ensures hot beverage vapors do not blow out the lid or cause scalding liquid leakage when tilted.',
        relevant_standard: 'IS 17526:2021',
        relevant_clause: 'Clause 8.1',
        required_test_method: 'Filled with 95°C hot water, stopper tightened and inverted for 10 minutes.',
        important_conditions: 'Inverted over dry indicator paper.',
        parameters: 'Water temperature: 95°C; holding time: 10 minutes inverted.',
        acceptance_criteria: 'No droplet leakage or pressure blowout.',
        traceability_source: 'IS 17526:2021 Clause 8.1',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'helmet-two-wheeler',
    product_name: 'Protective Helmets for Two-Wheeler Riders',
    product_aliases: ['helmet', 'motorcycle helmet', 'two wheeler helmet', 'rider helmet', 'safety helmet'],
    category: 'Personal Safety & Transportation',
    standard_id: 'IS-4151',
    is_number: 'IS 4151:2015',
    standard_title: 'Protective Helmets for Two Wheeler Riders - Specification',
    qco_reference: 'Two-Wheeler Helmets (Quality Control) Order, 2020 (Mandatory ISI Mark)',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 10 complete helmets conditioned under heat, cold, and ambient humidity',
    estimated_turnaround_days: '14 - 21 Business Days',
    required_tests: [
      {
        id: 'helmet-test-impact-absorb',
        test_name: 'Impact Absorption Test (Guided Free Fall onto Flat and Kerbstone Anvils)',
        category: 'Mechanical & Physical',
        purpose: 'Measures deceleration transmitted to the rider’s skull under severe crash collision impacts.',
        relevant_standard: 'IS 4151:2015',
        relevant_clause: 'Clause 9.1',
        required_test_method: 'Guided free-fall impact rig with tri-axial accelerometer fitted inside magnesium headform.',
        important_conditions: 'Conditioning: (a) Ambient 25°C, (b) Heat 50°C for 4h, (c) Cold -10°C for 4h, (d) Water immersion for 4h. Impact velocity: 7.5 m/s onto flat steel anvil and 5.5 m/s onto kerbstone anvil.',
        parameters: 'Peak acceleration threshold: Maximum 300 g (g-force); Head Injury Criterion (HIC) < 2400.',
        acceptance_criteria: 'Peak headform acceleration shall not exceed 300 g at any impact point; helmet shell must not crack open completely.',
        traceability_source: 'IS 4151:2015 Clause 9.1 & Annex C',
        capable_lab_ids: ['lab-bis-cl-sahibabad', 'lab-bis-srl-chennai', 'lab-arai-pune'],
        mandatory: true
      },
      {
        id: 'helmet-test-retention-dynamic',
        test_name: 'Retention System Dynamic & Static Strength Test',
        category: 'Mechanical & Physical',
        purpose: 'Ensures the chin strap and buckle do not break or slip excessively under crash jerk loads.',
        relevant_standard: 'IS 4151:2015',
        relevant_clause: 'Clause 9.2',
        required_test_method: 'Drop weight impact apparatus applying dynamic shock load of 10 kg from 750 mm drop height to chin strap rollers.',
        important_conditions: 'Initial preload of 50 N applied before dynamic drop.',
        parameters: 'Dynamic extension limit: Max 35 mm; Residual permanent extension limit: Max 25 mm.',
        acceptance_criteria: 'Chin strap and micro-metric buckle mechanism must remain fully intact and operational after shock load.',
        traceability_source: 'IS 4151:2015 Clause 9.2',
        capable_lab_ids: ['lab-bis-cl-sahibabad', 'lab-bis-srl-chennai', 'lab-arai-pune'],
        mandatory: true
      },
      {
        id: 'helmet-test-retention-detach',
        test_name: 'Retention System Detachment Test (Roll-Off Test)',
        category: 'Mechanical & Physical',
        purpose: 'Verifies helmet does not roll off the rider’s head from behind during an accident.',
        relevant_standard: 'IS 4151:2015',
        relevant_clause: 'Clause 9.3',
        required_test_method: 'Forward rotational shock load of 10 kg applied to the rear rim of the helmet.',
        important_conditions: 'Mounted on compliant dummy headform.',
        parameters: 'Drop load: 10 kg from 0.5 m; rotational displacement measured.',
        acceptance_criteria: 'Helmet must not pivot or roll forward off the headform.',
        traceability_source: 'IS 4151:2015 Clause 9.3',
        capable_lab_ids: ['lab-bis-cl-sahibabad', 'lab-arai-pune'],
        mandatory: true
      },
      {
        id: 'helmet-test-rigidity',
        test_name: 'Transverse Rigidity Test',
        category: 'Mechanical & Physical',
        purpose: 'Measures structural resistance to lateral crushing when pinned under a vehicle.',
        relevant_standard: 'IS 4151:2015',
        relevant_clause: 'Clause 9.4',
        required_test_method: 'Quasi-static compressive loading at 20 mm/min between two parallel plates.',
        important_conditions: 'Initial 30 N preload increased in steps to 630 N.',
        parameters: 'Deformation at 630 N: Max 40 mm; residual deformation after unloading: Max 15 mm.',
        acceptance_criteria: 'No severe transverse deformation or localized fracture.',
        traceability_source: 'IS 4151:2015 Clause 9.4',
        capable_lab_ids: ['lab-bis-cl-sahibabad', 'lab-arai-pune'],
        mandatory: true
      }
    ]
  },
  {
    id: 'packaged-drinking-water',
    product_name: 'Packaged Drinking Water (Other than Natural Mineral Water)',
    product_aliases: ['packaged drinking water', 'mineral water plant', 'drinking water', 'bottled water', 'water jar', 'ro water plant'],
    category: 'Packaged Water & Food Products',
    standard_id: 'IS-14543',
    is_number: 'IS 14543:2024',
    standard_title: 'Packaged Drinking Water - Specification',
    qco_reference: 'Food Safety and Standards Act (FSSAI) & Mandatory BIS Scheme-I Certification',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 24 bottles of 1 Litre or 4 jars of 20 Litre sealed under sterile conditions',
    estimated_turnaround_days: '10 - 16 Business Days',
    required_tests: [
      {
        id: 'pdw-test-microbio',
        test_name: 'Microbiological Safety & Pathogen Screening',
        category: 'Microbiological',
        purpose: 'Guarantees total absence of water-borne pathogens, coliforms, and bacterial contaminants.',
        relevant_standard: 'IS 14543:2024',
        relevant_clause: 'Clause 6 & Table 3',
        required_test_method: 'Membrane filtration method culture testing on selective media per IS 15185, IS 5887, IS 15187.',
        important_conditions: 'Sample incubated under aerobic conditions for 24h to 72h at 37°C and 44°C.',
        parameters: 'Escherichia coli: 0 in 250 ml; Coliform bacteria: 0 in 250 ml; Faecal streptococci: 0 in 250 ml; Pseudomonas aeruginosa: 0 in 250 ml; Yeast & Mould: 0 in 250 ml.',
        acceptance_criteria: 'Strict zero count across all pathogen indicators; any single colony constitutes immediate failure.',
        traceability_source: 'IS 14543:2024 Clause 6 Table 3',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-intertek-mumbai',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'pdw-test-heavy-metals',
        test_name: 'Toxic Heavy Metals & Elemental Contaminants',
        category: 'Chemical & Material',
        purpose: 'Quantifies trace toxic heavy metals migrating from groundwater or processing filters.',
        relevant_standard: 'IS 14543:2024',
        relevant_clause: 'Clause 7.2 & Table 2',
        required_test_method: 'ICP-MS / Hydride Generation AAS in accordance with IS 3025.',
        important_conditions: 'Sample acidified with ultra-pure nitric acid.',
        parameters: 'Lead (Pb) max 0.01 mg/l; Arsenic (As) max 0.01 mg/l; Cadmium (Cd) max 0.003 mg/l; Mercury (Hg) max 0.001 mg/l; Total Chromium max 0.05 mg/l.',
        acceptance_criteria: 'All values must remain below permissible limits.',
        traceability_source: 'IS 14543:2024 Clause 7.2',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-shriram-institute-delhi'
        ],
        mandatory: true
      },
      {
        id: 'pdw-test-pesticides',
        test_name: 'Pesticide Residues Screening (Organochlorine & Organophosphorus)',
        category: 'Chemical & Material',
        purpose: 'Detects agricultural pesticide runoff penetrating source borewells.',
        relevant_standard: 'IS 14543:2024',
        relevant_clause: 'Clause 7.3 & Table 2',
        required_test_method: 'Gas Chromatography Mass Spectrometry (GC-MS/MS) and Liquid Chromatography Mass Spectrometry (LC-MS/MS).',
        important_conditions: 'Solid phase extraction (SPE) pre-concentration.',
        parameters: 'Individual pesticide residue limit: Max 0.0001 mg/l (0.1 ppb); Total pesticide residues: Max 0.0005 mg/l (0.5 ppb).',
        acceptance_criteria: 'No detected pesticide exceeding 0.0001 mg/l.',
        traceability_source: 'IS 14543:2024 Clause 7.3',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'electric-liquid-heaters',
    product_name: 'Electric Kettles & Portable Immersion Water Heaters',
    product_aliases: ['immersion water heater', 'water heater', 'immersion rod', 'electric kettle', 'geyser rod'],
    category: 'Household Electrical Appliances',
    standard_id: 'IS-302-2-15',
    is_number: 'IS 302-2-15:2009',
    standard_title: 'Safety of Household and Similar Electrical Appliances - Heating Liquids',
    qco_reference: 'Electrical Appliances (Quality Control) Order, 2023 (Mandatory ISI Mark)',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 5 samples with power cords and user manuals',
    estimated_turnaround_days: '10 - 15 Business Days',
    required_tests: [
      {
        id: 'elec-test-hv-flash',
        test_name: 'High Voltage Dielectric Flash Test (Electric Strength)',
        category: 'Electrical & Electronics',
        purpose: 'Verifies insulation breakdown does not occur under elevated line transient voltages.',
        relevant_standard: 'IS 302-2-15:2009',
        relevant_clause: 'Clause 13.3 & Clause 16.3',
        required_test_method: 'Calibrated High Voltage breakdown tester applying AC test voltage for 60 seconds.',
        important_conditions: 'Applied between live conductors and external earth / exposed metallic sheathing.',
        parameters: 'Test voltage: 1250 V AC for Class 0I/I appliances (or 3750 V for reinforced insulation) for 60 seconds.',
        acceptance_criteria: 'No dielectric puncture, flashover, or breakdown.',
        traceability_source: 'IS 302-2-15 Clause 13.3 & Clause 16',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-bis-wrl-mumbai',
          'lab-tuv-rheinland-bengaluru',
          'lab-cpri-bengaluru'
        ],
        mandatory: true
      },
      {
        id: 'elec-test-leakage-current',
        test_name: 'Leakage Current at Operating Temperature',
        category: 'Electrical & Electronics',
        purpose: 'Ensures consumer cannot experience an electrical shock while touching the appliance.',
        relevant_standard: 'IS 302-2-15:2009',
        relevant_clause: 'Clause 13.2',
        required_test_method: 'Appliance operated at 1.15 times rated wattage until steady state.',
        important_conditions: 'Measured using precision true RMS mA meter connected between poles and earth.',
        parameters: 'Maximum permissible leakage current: 0.75 mA for portable Class I heating appliances.',
        acceptance_criteria: 'Leakage current must not exceed 0.75 mA under full boiling conditions.',
        traceability_source: 'IS 302-2-15 Clause 13.2',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-srl-chennai',
          'lab-tuv-rheinland-bengaluru',
          'lab-cpri-bengaluru'
        ],
        mandatory: true
      },
      {
        id: 'elec-test-dry-boil',
        test_name: 'Abnormal Operation & Boil-Dry Thermal Cutoff Test',
        category: 'Thermal & Safety',
        purpose: 'Validates that safety thermal cutoffs trip to prevent fire when operated without water.',
        relevant_standard: 'IS 302-2-15:2009',
        relevant_clause: 'Clause 19.101',
        required_test_method: 'Kettle operated empty with lid closed at 1.15 times rated voltage.',
        important_conditions: 'Repeated 100 consecutive cycles.',
        parameters: 'Thermal limiter must trip within 30 seconds; enclosure temperature must not exceed flame thresholds.',
        acceptance_criteria: 'No ignition of surrounding tissue paper, no molten plastic dripping, insulation intact.',
        traceability_source: 'IS 302-2-15 Clause 19.101',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-srl-chennai',
          'lab-tuv-rheinland-bengaluru',
          'lab-cpri-bengaluru'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'tmt-steel-bars',
    product_name: 'High Strength Deformed Steel Bars (TMT Bars)',
    product_aliases: ['tmt bar', 'tmt steel', 'reinforcement steel', 'sariya', 'steel rod', 'fe 500d', 'fe 550d'],
    category: 'Civil & Structural Metals',
    standard_id: 'IS-1786',
    is_number: 'IS 1786:2008',
    standard_title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
    qco_reference: 'Steel and Steel Products (Quality Control) Order, 2020 (Mandatory ISI Mark)',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 3 test pieces of 1-meter length from each diameter size',
    estimated_turnaround_days: '5 - 9 Business Days',
    required_tests: [
      {
        id: 'tmt-test-tensile',
        test_name: 'Tensile Strength, 0.2% Proof Stress & Elongation Test',
        category: 'Mechanical & Physical',
        purpose: 'Verifies yield strength and ductility for seismic safety in construction.',
        relevant_standard: 'IS 1786:2008',
        relevant_clause: 'Clause 8.1 & Table 3',
        required_test_method: 'Universal Testing Machine (UTM) loading per IS 1608 (Part 1).',
        important_conditions: 'Grip gauge length 5.65√So.',
        parameters: 'Fe 500D: Yield stress min 500 N/mm²; Tensile strength min 565 N/mm²; Elongation min 16.0%; TS/YS ratio min 1.10.',
        acceptance_criteria: 'All mechanical parameters meet or exceed grade specification.',
        traceability_source: 'IS 1786:2008 Clause 8.1',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-erl-kolkata',
          'lab-bis-wrl-mumbai',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      },
      {
        id: 'tmt-test-bend',
        test_name: 'Bend and Rebend Ductility Test',
        category: 'Mechanical & Physical',
        purpose: 'Ensures bar can be bent on construction sites without cracking.',
        relevant_standard: 'IS 1786:2008',
        relevant_clause: 'Clause 8.3 & Clause 8.4',
        required_test_method: 'Mandrel bending through 180° (bend test) or 135° followed by 100°C boil aging and 15.7° reverse bend (rebend test).',
        important_conditions: 'Mandrel diameter chosen per bar diameter and grade.',
        parameters: 'Bending angle: 180° / 135° + 15.7°; boiling water aging: 100°C for 30 minutes.',
        acceptance_criteria: 'No transverse ruptures, surface cracks, or fractures visible to normal vision.',
        traceability_source: 'IS 1786:2008 Clause 8.3 & 8.4',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-nrl-mohali',
          'lab-bis-erl-kolkata',
          'lab-nth-alipore-kolkata'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'toys-mechanical-chemical',
    product_name: 'Safety of Toys (Mechanical, Physical & Chemical Safety)',
    product_aliases: ['toy', 'children toys', 'plastic toy', 'wooden toy', 'stuffed toy', 'electric toy'],
    category: 'Consumer Products & Toys',
    standard_id: 'IS-9873',
    is_number: 'IS 9873 (Part 1 & 3)',
    standard_title: 'Safety of Toys - Mechanical Hazards & Migration of Certain Elements',
    qco_reference: 'Toys (Quality Control) Order, 2020 (Mandatory Scheme-I ISI Mark)',
    scheme: 'Scheme-I (ISI Mark)',
    sample_size_requirement: 'Minimum 6 retail packaged toy samples',
    estimated_turnaround_days: '8 - 14 Business Days',
    required_tests: [
      {
        id: 'toy-test-mech-hazard',
        test_name: 'Mechanical & Physical Hazards (Small Parts, Sharp Points & Drop Test)',
        category: 'Mechanical & Physical',
        purpose: 'Prevents choking, asphyxiation, cuts, and puncture injuries in infants and children.',
        relevant_standard: 'IS 9873 (Part 1):2019',
        relevant_clause: 'Clause 4.3, 4.4, 4.5 & Clause 5',
        required_test_method: 'Small parts cylinder (31.7 mm diameter truncating to 57.1 mm height) and sharp edge test clamp.',
        important_conditions: 'Drop test 5 times from 850 mm onto steel plate; tension test 90 N.',
        parameters: 'No detached component fitting completely into small parts cylinder for toys under 36 months.',
        acceptance_criteria: 'No small parts, sharp points, or accessible pinch points after abuse testing.',
        traceability_source: 'IS 9873 (Part 1):2019 Clause 4',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      },
      {
        id: 'toy-test-heavy-metals',
        test_name: 'Toxic Heavy Metal Migration (8 Elements in Toy Paints & Plastics)',
        category: 'Chemical & Material',
        purpose: 'Protects children from toxic chemical poisoning caused by mouthing or ingestion.',
        relevant_standard: 'IS 9873 (Part 3):2020',
        relevant_clause: 'Clause 4 & Table 1',
        required_test_method: 'Acid extraction in 0.07 M HCl followed by ICP-OES / ICP-MS analysis.',
        important_conditions: 'Sample scraped from coatings, polymers, textiles, and paperboards.',
        parameters: 'Lead (Pb) max 90 mg/kg; Cadmium (Cd) max 75 mg/kg; Arsenic (As) max 25 mg/kg; Mercury (Hg) max 60 mg/kg; Chromium (Cr) max 60 mg/kg; Barium (Ba) max 1000 mg/kg; Selenium (Se) max 500 mg/kg; Antimony (Sb) max 60 mg/kg.',
        acceptance_criteria: 'Migration of each element must remain strictly below permissible limit.',
        traceability_source: 'IS 9873 (Part 3):2020 Table 1',
        capable_lab_ids: [
          'lab-bis-cl-sahibabad',
          'lab-bis-wrl-mumbai',
          'lab-shriram-institute-delhi',
          'lab-tuv-sud-gurugram',
          'lab-intertek-mumbai'
        ],
        mandatory: true
      }
    ]
  },
  {
    id: 'lithium-ion-batteries',
    product_name: 'Secondary Lithium Cells and Batteries',
    product_aliases: ['lithium battery', 'li ion battery', 'mobile battery', 'powerbank battery', 'lithium ion cell', 'ev battery cell'],
    category: 'Electronics & Information Technology Goods',
    standard_id: 'IS-16046-2',
    is_number: 'IS 16046 (Part 2):2018',
    standard_title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes',
    qco_reference: 'CRO / MeitY Compulsory Registration Scheme (CRS)',
    scheme: 'Compulsory Registration Scheme (CRS)',
    sample_size_requirement: 'Minimum 25 cells or 15 battery packs in original packaging',
    estimated_turnaround_days: '14 - 21 Business Days',
    required_tests: [
      {
        id: 'batt-test-short-circuit',
        test_name: 'External Short-Circuit Test at 55°C',
        category: 'Electrical & Electronics',
        purpose: 'Verifies safety protection circuitry prevents thermal runaway or explosion under short-circuit.',
        relevant_standard: 'IS 16046 (Part 2):2018',
        relevant_clause: 'Clause 7.3.2',
        required_test_method: 'Battery conditioned at 55±5°C, external short circuit applied using <80 mΩ resistance until case temperature cools.',
        important_conditions: 'Monitored continuously for 24 hours.',
        parameters: 'Short circuit loop resistance: 80 ± 20 mΩ; ambient chamber: 55°C.',
        acceptance_criteria: 'No fire, explosion, or chemical casing rupture.',
        traceability_source: 'IS 16046 (Part 2):2018 Clause 7.3.2',
        capable_lab_ids: ['lab-bis-srl-chennai', 'lab-tuv-rheinland-bengaluru', 'lab-tuv-sud-gurugram'],
        mandatory: true
      },
      {
        id: 'batt-test-thermal-abuse',
        test_name: 'Thermal Abuse / Oven Test (130°C Exposure)',
        category: 'Thermal & Safety',
        purpose: 'Evaluates separator stability against melting under extreme internal temperature.',
        relevant_standard: 'IS 16046 (Part 2):2018',
        relevant_clause: 'Clause 7.3.4',
        required_test_method: 'Oven temperature ramped from 20°C to 130±2°C at 5°C/min and held for 10 minutes.',
        important_conditions: 'Conducted in explosion-proof thermal chamber.',
        parameters: 'Temperature: 130°C; soak time: 10 minutes.',
        acceptance_criteria: 'No fire or explosion during or after heating cycle.',
        traceability_source: 'IS 16046 (Part 2):2018 Clause 7.3.4',
        capable_lab_ids: ['lab-bis-srl-chennai', 'lab-tuv-rheinland-bengaluru'],
        mandatory: true
      }
    ]
  }
];

export const SAMPLE_TEST_REPORTS: SampleTestReport[] = [
  {
    id: 'report-ss-bottle-partial',
    title: 'Sample Report 1: Stainless Steel Bottle 750ml (Mechanical & Physical - Passed, Chemical Leaching Missing)',
    product_name: 'Stainless Steel Water Bottle 750ml (Single Wall)',
    standard_referenced: 'IS 17803:2022',
    lab_name: 'National Testing & Inspection Laboratory, Gurugram (NABL TC-7821)',
    report_number: 'NTL/2026/MECH-SS-9042',
    issue_date: '14 August 2026',
    raw_text: `TEST REPORT: NTL/2026/MECH-SS-9042
Product: Stainless Steel Single Wall Water Bottle 750ml
Model: HydroSteel-750 (Grade 304 Body)
Reference Standard: IS 17803:2022 Non-Insulated Stainless Steel Water Bottles

SUMMARY OF TEST RESULTS:
1. Chemical Composition (OES Spectrometry per IS 228):
   - Chromium (Cr): 18.42% (Specified: 17.5% - 19.5%) -> PASS
   - Nickel (Ni): 8.16% (Specified: 8.0% - 10.5%) -> PASS
   - Carbon (C): 0.045% (Specified: Max 0.08%) -> PASS
2. Capacity & Dimensions (IS 17803 Cl 6):
   - Measured Capacity: 755 ml (Declared 750 ml ±3% / 727.5 - 772.5 ml) -> PASS
   - Body Sheet Thickness: 0.48 mm (Specified Min: 0.45 mm) -> PASS
3. Hydrostatic Leakage Test (IS 17803 Cl 8.2):
   - 20 kPa internal pressure held 10 min -> PASS (Zero leakage)
   - 24h inversion hold -> PASS (No staining on filter paper)
4. Drop Impact Resistance Test (IS 17803 Cl 9.1):
   - 1.2 m drop onto concrete (base, cap, 45°) -> PASS (Zero rupture, seal intact)
5. Handle / Loop Tensile Strength (IS 17803 Cl 9.3):
   - 250 N static tensile pull for 5 min -> PASS (No detachment)
6. Corrosion Resistance (IS 17803 Cl 11 / IS 9844):
   - 24h Neutral Salt Spray -> PASS (No pitting or rust)

NOTE: Overall Migration Test (IS 9845) and Toxic Heavy Metals Leaching (Lead, Cadmium, Nickel per Cl 10.3) were NOT requested by applicant and NOT performed under this job sheet.`,
    extracted_data: {
      product: 'Stainless Steel Water Bottle 750ml',
      standard: 'IS 17803:2022',
      tests_performed: [
        {
          test_name: 'Material Grade & Chemical Composition',
          clause: 'Clause 5.1',
          result: 'Pass',
          parameter: 'Cr: 18.42%, Ni: 8.16%, C: 0.045%',
          observed_value: 'Grade 304 Conformant',
          specified_limit: 'Cr: 17.5-19.5%, Ni: 8-10.5%'
        },
        {
          test_name: 'Capacity & Dimensions',
          clause: 'Clause 6',
          result: 'Pass',
          parameter: 'Brimful capacity & thickness',
          observed_value: '755 ml, 0.48 mm',
          specified_limit: '750 ml ±3%, min 0.45 mm'
        },
        {
          test_name: 'Hydrostatic Leakage Test',
          clause: 'Clause 8.2',
          result: 'Pass',
          parameter: 'Internal pressure hold (20 kPa) & 24h inversion',
          observed_value: 'No liquid leakage',
          specified_limit: 'Zero droplet leakage'
        },
        {
          test_name: 'Drop Impact Resistance Test',
          clause: 'Clause 9.1',
          result: 'Pass',
          parameter: '1.2 m free-fall drop onto concrete',
          observed_value: 'No rupture, seal intact',
          specified_limit: 'No rupture or water escape'
        },
        {
          test_name: 'Handle & Loop Tensile Strength',
          clause: 'Clause 9.3',
          result: 'Pass',
          parameter: '250 N static tensile load for 5 min',
          observed_value: 'No detachment or fracture',
          specified_limit: 'No breakage or permanent deformation'
        },
        {
          test_name: 'Corrosion Resistance (Salt Spray)',
          clause: 'Clause 11',
          result: 'Pass',
          parameter: '24-hour 5% NaCl salt spray chamber',
          observed_value: 'No rust or surface corrosion',
          specified_limit: 'Zero pitting or corrosion'
        }
      ],
      methods: ['IS 228 (OES Spectrometry)', 'IS 17803 Cl 8.2', 'IS 17803 Cl 9.1', 'IS 9844'],
      dates: 'Testing: 08 Aug 2026 to 14 Aug 2026',
      accreditation_ref: 'NABL TC-7821',
      conclusion: 'Partially Compliant. 6 mechanical and material tests passed, but 2 MANDATORY food contact safety tests (IS 17803 Clause 10: Overall Migration and Heavy Metal Leaching) are completely missing!'
    }
  },
  {
    id: 'report-helmet-full-pass',
    title: 'Sample Report 2: Protective Two-Wheeler Helmet (IS 4151:2015 - Complete Test Pass)',
    product_name: 'Two-Wheeler Full-Face Helmet (Size L 580-600mm)',
    standard_referenced: 'IS 4151:2015',
    lab_name: 'Automotive Research Association of India (ARAI Pune)',
    report_number: 'ARAI/AED/2026/HLM-4151-8841',
    issue_date: '02 September 2026',
    raw_text: `TEST REPORT: ARAI/AED/2026/HLM-4151-8841
Product: Protective Helmet for Two Wheeler Riders
Brand / Model: SafeRide Pro-580
Standard: IS 4151:2015 (Fourth Revision)

TEST FINDINGS:
1. Impact Absorption Test (Clause 9.1):
   - Ambient Condition (25°C): Peak Deceleration = 185 g (Limit: Max 300 g) -> PASS
   - Heat Conditioned (50°C): Peak Deceleration = 210 g (Limit: Max 300 g) -> PASS
   - Cold Conditioned (-10°C): Peak Deceleration = 224 g (Limit: Max 300 g) -> PASS
   - Water Immersion: Peak Deceleration = 192 g (Limit: Max 300 g) -> PASS
   - Kerbstone Anvil: Peak Deceleration = 238 g (Limit: Max 300 g) -> PASS
2. Retention System Dynamic Shock (Clause 9.2):
   - Dynamic Elongation: 22.4 mm (Limit: Max 35.0 mm) -> PASS
   - Residual Elongation: 14.2 mm (Limit: Max 25.0 mm) -> PASS
3. Retention Detachment / Roll-Off (Clause 9.3):
   - 10 kg Drop load applied -> PASS (Zero helmet detachment)
4. Transverse Rigidity Test (Clause 9.4):
   - Max Lateral Deformation at 630 N: 28 mm (Limit: Max 40 mm) -> PASS
   - Residual Deformation: 8 mm (Limit: Max 15 mm) -> PASS
5. Visor Optical & Scratch Resistance (Clause 9.5):
   - Light transmission: 86.4% (Limit: Min 85.0%) -> PASS

FINAL CONCLUSION: The helmet model conforms in all tested clauses to IS 4151:2015. Eligible for BIS Scheme-I license filing.`,
    extracted_data: {
      product: 'Two-Wheeler Full-Face Helmet (Size L)',
      standard: 'IS 4151:2015',
      tests_performed: [
        {
          test_name: 'Impact Absorption Test',
          clause: 'Clause 9.1',
          result: 'Pass',
          parameter: 'Peak deceleration across 4 conditioning states',
          observed_value: 'Max 238 g (Ambient: 185g, Heat: 210g, Cold: 224g)',
          specified_limit: 'Max 300 g'
        },
        {
          test_name: 'Retention System Dynamic Shock',
          clause: 'Clause 9.2',
          result: 'Pass',
          parameter: 'Dynamic and residual strap elongation',
          observed_value: 'Dynamic: 22.4 mm, Residual: 14.2 mm',
          specified_limit: 'Max 35 mm dyn, max 25 mm res'
        },
        {
          test_name: 'Retention Detachment / Roll-Off',
          clause: 'Clause 9.3',
          result: 'Pass',
          parameter: 'Roll-off rotational displacement under 10 kg',
          observed_value: 'No detachment from headform',
          specified_limit: 'Zero detachment'
        },
        {
          test_name: 'Transverse Rigidity Test',
          clause: 'Clause 9.4',
          result: 'Pass',
          parameter: 'Crush deformation at 630 N lateral load',
          observed_value: '28 mm at 630 N, 8 mm residual',
          specified_limit: 'Max 40 mm at load, max 15 mm residual'
        }
      ],
      methods: ['IS 4151:2015 Guided Fall Impact Rig', 'ARAI Calibration ISO/IEC 17025'],
      dates: 'Testing: 24 Aug 2026 to 01 Sep 2026',
      accreditation_ref: 'ARAI NABL Scope / BIS Approved Apex Body',
      conclusion: 'Fully Compliant. All mandatory clauses of IS 4151:2015 satisfied with zero non-conformances.'
    }
  },
  {
    id: 'report-water-microbio-fail',
    title: 'Sample Report 3: Packaged Drinking Water 1L (Microbiological Non-Compliance: Pseudomonas Detected)',
    product_name: 'Packaged Drinking Water 1 Litre Bottle',
    standard_referenced: 'IS 14543:2024',
    lab_name: 'Regional Food & Water Testing Laboratory, Jaipur',
    report_number: 'RFWL/2026/WAT-14543-3291',
    issue_date: '28 July 2026',
    raw_text: `TEST REPORT: RFWL/2026/WAT-14543-3291
Sample: 1 Litre Sealed Pet Bottle Packaged Drinking Water
Batch No: B-20260718
Standard: IS 14543:2024 Packaged Drinking Water

TEST FINDINGS:
1. Physical Parameters:
   - Turbidity: 0.6 NTU (Limit: Max 2.0 NTU) -> PASS
   - Total Dissolved Solids (TDS): 142 mg/l (Limit: Max 500 mg/l) -> PASS
   - pH: 7.2 (Limit: 6.5 to 8.5) -> PASS
2. Toxic Heavy Metals (ICP-MS):
   - Lead (Pb): <0.002 mg/l (Limit: Max 0.01 mg/l) -> PASS
   - Arsenic (As): <0.002 mg/l (Limit: Max 0.01 mg/l) -> PASS
3. Microbiological Examination (Membrane Filtration):
   - Escherichia coli: Absent in 250 ml (Limit: Absent) -> PASS
   - Coliform Bacteria: Absent in 250 ml (Limit: Absent) -> PASS
   - Faecal Streptococci: Absent in 250 ml (Limit: Absent) -> PASS
   - Pseudomonas aeruginosa: DETECTED (3 CFU/250 ml) (Limit: Absent in 250 ml) -> FAIL

FINAL CONCLUSION: FAILED due to presence of Pseudomonas aeruginosa (3 CFU/250 ml) in violation of Table 3 of IS 14543:2024. Plant ozonation and bottling line sterilisation must be re-audited.`,
    extracted_data: {
      product: 'Packaged Drinking Water 1 Litre Bottle',
      standard: 'IS 14543:2024',
      tests_performed: [
        {
          test_name: 'Organoleptic & Physical Parameters',
          clause: 'Clause 5',
          result: 'Pass',
          parameter: 'TDS, pH, Turbidity',
          observed_value: 'TDS: 142 mg/l, pH: 7.2, Turbidity: 0.6 NTU',
          specified_limit: 'TDS max 500 mg/l, pH 6.5-8.5'
        },
        {
          test_name: 'Heavy Metals Leaching',
          clause: 'Clause 7.2',
          result: 'Pass',
          parameter: 'Lead and Arsenic ICP-MS',
          observed_value: 'Lead <0.002 mg/l, Arsenic <0.002 mg/l',
          specified_limit: 'Max 0.01 mg/l each'
        },
        {
          test_name: 'Microbiological Safety Test (Coliforms & E. coli)',
          clause: 'Clause 6',
          result: 'Pass',
          parameter: 'E. coli and Coliform bacteria',
          observed_value: 'Zero CFU in 250 ml',
          specified_limit: 'Absent in 250 ml'
        },
        {
          test_name: 'Pseudomonas Aeruginosa Pathogen Screen',
          clause: 'Clause 6 Table 3',
          result: 'Fail',
          parameter: 'Pseudomonas aeruginosa culture',
          observed_value: '3 CFU / 250 ml',
          specified_limit: 'Strictly Absent in 250 ml'
        }
      ],
      methods: ['IS 3025 (Physical/Chemical)', 'IS 15187 (Pseudomonas aeruginosa Membrane Filtration)'],
      dates: 'Testing: 19 July 2026 to 27 July 2026',
      accreditation_ref: 'NABL TC-6311',
      conclusion: 'NON-COMPLIANT / FAILED. Presence of Pseudomonas aeruginosa (3 CFU/250 ml) violates mandatory microbiological criteria. Immediate ozonation dosage adjustment and filter replacement required before re-testing.'
    }
  }
];

export const TESTING_ROADMAP_STEPS: TestingRoadmapStage[] = [
  {
    step_number: 1,
    stage_name: 'Identify Applicable Standard & Scheme',
    short_description: 'Determine exact Indian Standard, revision year, and whether mandatory QCO applies.',
    details: [
      'Search product classification in BIS catalogue or Sahayak AI database.',
      'Check if product is covered under mandatory QCO (e.g. Cookware QCO for stainless steel bottles, Electrical Appliances QCO, Toys QCO).',
      'Identify governing certification scheme: Scheme-I (ISI Mark) for domestic manufacture, FMCS for foreign manufacturers, or CRS for electronics.',
      'Retrieve official Scheme of Testing & Inspection (STI) document from BIS portal.'
    ],
    key_deliverable: 'Verified IS Standard Number, QCO Notification Gazetted Reference & Applicable STI Document',
    timeline: 'Day 1 - 2',
    official_portal: 'https://standards.bis.gov.in',
    tips: 'Never test against an outdated standard version. E.g., for non-insulated stainless steel bottles, specify IS 17803:2022 rather than generic steel standards.'
  },
  {
    step_number: 2,
    stage_name: 'Map All Required Tests & Set Up In-House Lab',
    short_description: 'Extract every mandatory clause, test method, and in-house laboratory equipment requirement.',
    details: [
      'Divide tests into two categories: (A) Factory In-House Tests (routine STI quality checks) vs (B) Independent Third-Party Laboratory Tests.',
      'Procure and calibrate mandatory factory test equipment (e.g. hydrostatic pressure bench, drop impact apparatus, micrometer, vernier callipers).',
      'Designate qualified testing personnel (Degree/Diploma in Engineering or Science) to maintain testing logbooks.'
    ],
    key_deliverable: 'Complete Testing Checklist & Factory In-House Test Bench Readiness Record',
    timeline: 'Day 3 - 10',
    tips: 'BIS technical auditors will inspect your in-house laboratory and ask your chemist/technician to perform tests in their presence.'
  },
  {
    step_number: 3,
    stage_name: 'Select & Coordinate with BIS-Recognized Lab',
    short_description: 'Choose a lab with verified scope on BIS LIMS portal and reserve testing capacity.',
    details: [
      'Consult the BIS LIMS portal (https://lims.bis.gov.in) to verify active accreditation and scope for your exact IS standard.',
      'Compare turnaround times, regional proximity, and sample forwarding logistics between BIS Regional Labs and Recognized Commercial Labs.',
      'Request formal Quotation and Sample Forwarding Letter specifying required clauses.'
    ],
    key_deliverable: 'Lab Booking Confirmation & LIMS Job Code',
    timeline: 'Day 11 - 15',
    official_portal: 'https://lims.bis.gov.in',
    tips: 'Commercial labs like Shriram Institute, TÜV, and Intertek often provide faster turnaround (7-12 days) compared to statutory regional labs during peak audit seasons.'
  },
  {
    step_number: 4,
    stage_name: 'Sample Drawing, Sealing & Independent Testing',
    short_description: 'Draw representative production samples, apply tamper-evident seals, and dispatch to laboratory.',
    details: [
      'Draw required number of finished articles from commercial manufacturing lot (e.g. 8 bottles for IS 17803 or 10 helmets for IS 4151).',
      'For formal factory audit: BIS inspecting officer will draw samples randomly, seal with lead/security tape, and generate Test Request Form (TRF).',
      'Dispatch under temperature and transit protection to prevent damage during courier.'
    ],
    key_deliverable: 'Sample Dispatch Receipt, Sealed Sample Counter-Check & Lab Inward Acknowledgment',
    timeline: 'Day 16 - 30',
    tips: 'Always maintain identical sealed "Counter Samples" in your factory store. If the lab reports an ambiguous test result, counter samples can be used for referee testing.'
  },
  {
    step_number: 5,
    stage_name: 'Review Test Report Against BIS STI Requirements',
    short_description: 'Audit the laboratory test report clause-by-clause to ensure zero non-conformances.',
    details: [
      'Verify lab report carries NABL accreditation logo, QR code, and explicit citation of the Indian Standard.',
      'Check that every required clause has been evaluated; ensure no test parameter has been left out as "not tested".',
      'Verify that observed quantitative values comply with permissible numerical limits (e.g. wall thickness ≥0.45 mm, migration <10 mg/dm²).'
    ],
    key_deliverable: 'Certified Lab Test Report (Passing All Mandatory Clauses)',
    timeline: 'Day 31 - 38',
    tips: 'Use our Test Report Intelligence feature to upload the report and automatically verify that all mandatory clauses are present.'
  },
  {
    step_number: 6,
    stage_name: 'Upload to Manakonline & Continue Certification',
    short_description: 'Submit passing test report with application on BIS Manakonline to receive grant of licence.',
    details: [
      'Upload verified test report to the BIS Manakonline portal (or CRS portal for electronics).',
      'Link test report reference number with the factory inspection audit file.',
      'Pay requisite marking fees and obtain formal Grant of Licence (CML number) to print ISI mark on products.'
    ],
    key_deliverable: 'BIS License Grant Letter & CM/L Number for Standard ISI Mark Application',
    timeline: 'Day 39 - 50',
    official_portal: 'https://www.manakonline.in',
    tips: 'Once license is granted, factory must perform regular in-house testing at frequencies defined in STI Table 1 (e.g. every batch or every 1000 units).'
  }
];

export const TESTING_QA_ITEMS: TestingQAPair[] = [
  {
    id: 'qa-test-1',
    question: 'Why is testing mandatory before applying for a BIS license?',
    hindi_question: 'BIS लाइसेंस के लिए आवेदन करने से पहले टेस्टिंग क्यों अनिवार्य है?',
    category: 'Regulatory Basis',
    answer: 'Under the Bureau of Indian Standards Act, 2016 and BIS (Conformity Assessment) Regulations, 2018, a license to use the Standard Mark (ISI mark) can only be granted after authoritative laboratory testing confirms that the product complies with all mandatory clauses of the relevant Indian Standard. Testing provides independent, traceable scientific evidence that the product is safe for consumers and meets performance thresholds.',
    authoritative_source: 'BIS (Conformity Assessment) Regulations, 2018 Regulation 6 & Regulation 7'
  },
  {
    id: 'qa-test-2',
    question: 'What tests are mandatory for stainless steel water bottles under IS 17803:2022?',
    hindi_question: 'IS 17803:2022 के तहत स्टेनलेस स्टील पानी की बोतलों के लिए कौन से टेस्ट अनिवार्य हैं?',
    category: 'Product Specific',
    answer: 'Under IS 17803:2022 and the Cookware and Utensils (Quality Control) Order, 2024, mandatory tests include: (1) Chemical composition analysis of steel (Grade 304 austenitic SS with min 17.5% Cr and 8% Ni per Cl 5.1), (2) Nominal capacity and sheet thickness measurement (min 0.45 mm body per Cl 6), (3) Hydrostatic pressure and 24-hour inversion leakage test (20 kPa for 10 min per Cl 8.2), (4) 1.2-meter drop impact test onto concrete (Cl 9.1), (5) Handle and loop 250 N tensile pull test (Cl 9.3), (6) Overall food contact migration test in 3% acetic acid simulant (<10 mg/dm² per Cl 10), (7) Toxic heavy metals leaching (Lead <0.01 mg/l, Cadmium <0.005 mg/l per Cl 10.3), and (8) 24-hour salt spray corrosion resistance (Cl 11).',
    authoritative_source: 'IS 17803:2022 Clauses 5, 6, 8, 9, 10 & 11',
    relevant_standard: 'IS 17803:2022'
  },
  {
    id: 'qa-test-3',
    question: 'What is the difference between an In-House Laboratory and a BIS Recognized Third-Party Laboratory?',
    hindi_question: 'फैक्ट्री इन-हाउस लैब और BIS मान्यता प्राप्त थर्ड-पार्टी लैब में क्या अंतर है?',
    category: 'Lab Operations',
    answer: 'A factory In-House Laboratory is maintained inside the manufacturing plant to perform daily, routine batch testing according to the BIS Scheme of Testing & Inspection (STI). It must be equipped with essential calibrated equipment (such as pressure testers, gauges, and scales). In contrast, a BIS Recognized Third-Party Laboratory (such as BIS Central Lab Sahibabad or NABL-accredited labs recognized under the BIS Laboratory Recognition Scheme) is an independent facility that performs initial type testing for grant of license, annual verification testing, and sample testing drawn during surprise market surveillance audits.',
    authoritative_source: 'BIS Scheme of Testing & Inspection (STI) General Guidelines & BIS LRS Scheme, 2020'
  },
  {
    id: 'qa-test-4',
    question: 'How do I verify if a private testing lab is officially authorized by BIS?',
    hindi_question: 'मैं कैसे सत्यापित करूं कि कोई प्राइवेट टेस्टिंग लैब आधिकारिक तौर पर BIS से मान्यता प्राप्त है?',
    category: 'Lab Verification',
    answer: 'Do not rely on verbal claims or general NABL certificates alone. Visit the official BIS Laboratory Information Management System (LIMS) portal at https://lims.bis.gov.in. Navigate to "Directory of BIS Recognized Laboratories", enter the Indian Standard Number (e.g. "IS 17803" or "IS 4151"), and verify: (1) The lab status is "Active / Recognized", (2) The specific IS number is explicitly listed in their approved scope of recognition, and (3) The recognition validity date has not expired.',
    authoritative_source: 'BIS Laboratory Information Management System (LIMS) Portal'
  },
  {
    id: 'qa-test-5',
    question: 'What happens if our factory product sample fails a test during testing?',
    hindi_question: 'यदि टेस्टिंग के दौरान हमारा उत्पाद सैंपल फेल हो जाता है तो क्या होता है?',
    category: 'Failure Protocol',
    answer: 'If a sample fails testing: (1) For pre-license application testing, you must investigate root cause, adjust production parameters/materials, and submit fresh samples for complete re-testing. (2) For statutory audit samples drawn by BIS officers, BIS issues a "Discrepancy Letter". You are given a stipulated time (typically 30 days) to submit a Corrective and Preventive Action (CAPA) report, recalibrate in-house quality controls, and request testing of sealed counter-samples. If failure persists, the application is rejected or license suspended.',
    authoritative_source: 'BIS Conformity Assessment Regulations, 2018 Regulation 10'
  },
  {
    id: 'qa-test-6',
    question: 'Are tests conducted outside India accepted for BIS certification under FMCS?',
    hindi_question: 'क्या FMCS के तहत भारत के बाहर किए गए टेस्ट BIS प्रमाणन के लिए स्वीकार्य हैं?',
    category: 'Foreign Manufacturers (FMCS)',
    answer: 'Under the Foreign Manufacturers Certification Scheme (FMCS, Scheme-I), initial license grant requires factory audit by a BIS officer who draws samples from the foreign manufacturing line and dispatches them directly to a BIS-recognized laboratory located in India (such as BIS CL Sahibabad). Test reports from non-recognized foreign labs are NOT accepted for Scheme-I ISI Mark grant. However, under the Compulsory Registration Scheme (CRS) for electronics, test reports from BIS-recognized overseas labs are accepted under mutual recognition frameworks.',
    authoritative_source: 'BIS Foreign Manufacturers Certification Scheme (FMCS) Manual Section 4'
  }
];
