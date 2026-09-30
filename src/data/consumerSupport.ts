import { ConsumerTopic } from '../types/index.ts';

export const CONSUMER_TOPICS: ConsumerTopic[] = [
  {
    id: 'verify-isi',
    title: 'How to Verify a Genuine ISI Mark on Products',
    category: 'VERIFY_ISI',
    summary: 'A genuine ISI mark always carries two mandatory elements: the Indian Standard number (IS number) above the monogram and a 7 or 8-digit Certification of Manufacturer/Licence (CM/L) number directly below.',
    steps: [
      '1. Check the physical mark: Ensure the letters "IS" are printed inside the standard oval monogram.',
      '2. Inspect the IS number: Look for the relevant standard number on top (e.g. "IS 302-2-15" or "IS 14543").',
      '3. Locate the CM/L number: Verify that a 7 or 8-digit licence number is present at the bottom (e.g. "CM/L - 1234567"). A mark without a CM/L number is invalid and counterfeit.',
      '4. Open the BIS Care App or visit services.bis.gov.in -> "Verify Licence Details".',
      '5. Enter the CM/L number: The system displays manufacturer name, factory address, brand name, standard covered, and whether the licence is currently "Operative", "Suspended", or "Expired".'
    ],
    portal_url: 'https://services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/',
    portal_label: 'BIS Online Licence Verification Portal'
  },
  {
    id: 'verify-crs',
    title: 'How to Verify CRS (Compulsory Registration) on Electronics',
    category: 'VERIFY_CRS',
    summary: 'Electronic devices such as mobile phones, laptops, smartwatches, and LED bulbs carry the BIS CRS mark featuring "R-XXXXXXXX" and the relevant IS number.',
    steps: [
      '1. Locate the BIS Standard Mark on the device rating plate or carton.',
      '2. Look for the phrase "Self Declaration - Conforming to IS XXXXX" followed by the 8-digit registration number "R-XXXXXXXX".',
      '3. Open the BIS Care App and select "Verify R-Number under CRS".',
      '4. Alternatively, visit www.crsbis.in -> "Registration Status".',
      '5. The portal shows the registered brand, manufacturing location, model numbers authorized, and validity status.'
    ],
    portal_url: 'https://www.crsbis.in',
    portal_label: 'Official CRS Verification Portal'
  },
  {
    id: 'file-complaints',
    title: 'How to File a Complaint Against Defective Certified Products',
    category: 'COMPLAINTS',
    summary: 'Consumers who purchase a defective product bearing the ISI mark, substandard hallmarked gold, or discover misuse of BIS marks can lodge a formal grievance with BIS for investigation and compensation/replacement.',
    steps: [
      'Method 1: via BIS Care App: Tap on "File Complaint" tab. Choose complaint type (Quality of Product / Misuse of ISI mark / Fake Hallmark / Misleading advertisement). Upload photo of product with CM/L number and purchase receipt.',
      'Method 2: via BIS Consumer Portal: Visit www.bis.gov.in -> "Consumer Affairs" -> "Grievance Redressal" or email to complaints@bis.gov.in.',
      'Method 3: Toll-Free Grievance Helpline: Contact national consumer line or BIS headquarters at New Delhi.',
      'Investigation Procedure: A BIS technical enforcement officer investigates the complaint, collects test samples from the manufacturer or retailer, and if substantiated, initiates penal action under the BIS Act, 2016 while requiring the licensee to replace or refund the defective good.'
    ],
    portal_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/complaints',
    portal_label: 'BIS Grievance Redressal Portal'
  },
  {
    id: 'bis-care-app',
    title: 'BIS Care App — Complete Capabilities',
    category: 'BIS_CARE_APP',
    summary: 'The "BIS Care" app is the official mobile utility launched by the Ministry of Consumer Affairs and BIS to empower Indian citizens with real-time verification and grievance redressal.',
    steps: [
      'Verify ISI Mark: Enter CM/L number to verify brand and active validity.',
      'Verify Hallmarking (HUID): Enter 6-digit alphanumeric code to inspect jeweller and purity.',
      'Verify CRS Registration: Check electronic goods R-number authenticity.',
      'Search Indian Standards: Access standard catalogue and titles.',
      'Lodge Grievance / Misuse: Submit complaints with geotagged photographic evidence.',
      'Track Complaint Status: View investigation progress and closure notes online.'
    ],
    portal_url: 'https://play.google.com/store/apps/details?id=com.bis.biscareapp',
    portal_label: 'Download BIS Care App (Android & iOS)'
  }
];
