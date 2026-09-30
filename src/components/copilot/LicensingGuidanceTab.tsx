import { useState } from 'react';
import { ShieldCheck, HelpCircle, Sparkles, ExternalLink, Calculator, DollarSign, Award, Layers } from 'lucide-react';
import { LICENSING_SCHEME_COMPARISON } from '../../data/complianceCopilotData.ts';

interface LicensingGuidanceTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function LicensingGuidanceTab({ onQueryAssistant }: LicensingGuidanceTabProps) {
  const [selectedScheme, setSelectedScheme] = useState<'scheme1' | 'scheme2' | 'fmcs' | 'hallmarking'>('scheme1');

  const schemeDetails = {
    scheme1: {
      name: 'Scheme-I: Product Certification Scheme (ISI Mark)',
      code: 'ISI Mark',
      badge: 'Domestic Manufacturing Focus',
      description: 'The premier BIS licensing scheme authorizing the standard ISI mark on products. Requires complete on-site in-house testing equipment, factory audit by BIS technical officers, and referral sample testing.',
      whoApplies: 'Domestic Indian manufacturers producing products under mandatory Quality Control Orders (QCOs) or seeking voluntary certification.',
      feeSummary: '₹1,000 application fee + ₹7,000 inspection fee per man-day + sample testing charges + minimum annual marking fee (advance deposit). Micro-enterprises enjoy a 50% concession on application fee under Udyam.',
      timeline: '30 - 35 days under Simplified Route; 60 - 90 days under Normal Route.',
      validity: 'Initially granted for 1 to 2 years; renewable online for blocks of 1 to 5 years via Manakonline.',
      prompt: 'Explain the detailed licensing process, application fee structure, and factory audit requirements for Scheme-I ISI Mark.'
    },
    scheme2: {
      name: 'Scheme-II: Compulsory Registration Scheme (CRS)',
      code: 'CRS (R-Number)',
      badge: 'Electronics & IT Products',
      description: 'Operated primarily for electronic and IT products under notifications by MeitY and MNRE. Self-declaration of conformity based strictly on testing samples in BIS-recognized labs within India. No preliminary factory audit is required.',
      whoApplies: 'Domestic and foreign manufacturers of consumer electronics, computers, servers, LED lighting, and solar PV modules.',
      feeSummary: '₹1,000 application fee per report / model + testing charges in commercial BIS-recognized laboratory. No inspection fee required.',
      timeline: '15 - 25 working days from sample test report submission.',
      validity: 'Granted for 2 years; renewal applications submitted online at crsbis.in.',
      prompt: 'Explain the Compulsory Registration Scheme (CRS) requirements, testing validity, and R-number issuance for electronics.'
    },
    fmcs: {
      name: 'Foreign Manufacturers Certification Scheme (FMCS)',
      code: 'FMCS (ISI for Overseas)',
      badge: 'Overseas Factories',
      description: 'Enables overseas manufacturing units located outside India to obtain the ISI mark for products exported to India. Requires nomination of an Authorized Indian Representative (AIR) and on-site audit by visiting BIS officers.',
      whoApplies: 'Foreign factories exporting goods covered by Indian mandatory QCOs into India.',
      feeSummary: '$1,000 USD application fee + auditor travel expenses & per-diem allowances (~$4,000 - $8,000 USD) + testing charges + $10,000 USD Performance Bank Guarantee (PBG).',
      timeline: '120 - 180 working days.',
      validity: 'Initially 1 to 2 years, renewable upon surveillance verification.',
      prompt: 'What are the statutory requirements, AIR obligations, and bank guarantee rules under the Foreign Manufacturers Certification Scheme (FMCS)?'
    },
    hallmarking: {
      name: 'Hallmarking Scheme for Gold & Silver',
      code: 'HUID Hallmarking',
      badge: 'Precious Metals & Jewellery',
      description: 'Mandatory hallmarking of gold jewellery with 6-digit Hallmark Unique Identification (HUID). Retail jewellers register online; physical assaying and laser hallmarking are performed by certified Assaying & Hallmarking Centres (AHCs).',
      whoApplies: 'Retailers, wholesalers, and manufacturers of gold and silver jewellery selling in mandatory hallmarking districts.',
      feeSummary: 'Zero registration fee for micro-enterprises with turnover < ₹5 Crore; ₹7,500 to ₹80,000 based on turnover tiers. Assaying fee: ₹45 per gold article.',
      timeline: '1 to 2 working days (Instant automated registration certificate on Manakonline).',
      validity: '5 years validity.',
      prompt: 'What are the rules, turnover-based registration fees, and HUID guidelines for retail jewellers under the BIS Hallmarking Scheme?'
    }
  };

  const active = schemeDetails[selectedScheme];

  return (
    <div className="space-y-4">
      {/* Scheme Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#2A2E28] p-1.5 rounded-xl">
        {(
          [
            { id: 'scheme1', label: 'Scheme-I (ISI)' },
            { id: 'scheme2', label: 'Scheme-II (CRS)' },
            { id: 'fmcs', label: 'FMCS (Foreign)' },
            { id: 'hallmarking', label: 'Hallmarking' }
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedScheme(item.id)}
            className={`rounded-lg py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer text-center ${
              selectedScheme === item.id
                ? 'bg-[#232323] text-[#FDFDF5] shadow-2xs'
                : 'text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#2A2E28]/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Active Scheme Profile */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] bg-[#2A2E28] px-2 py-0.5 rounded border border-blue-100">
            {active.badge}
          </span>
          <span className="text-xs font-mono font-bold text-[#E1E1D5] bg-[#2A2E28] px-2 py-0.5 rounded">
            {active.code}
          </span>
        </div>

        <h3 className="text-sm font-bold text-[#FDFDF5] leading-snug">
          {active.name}
        </h3>

        <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
          {active.description}
        </p>

        {/* Detailed Breakdown */}
        <div className="space-y-2 text-xs border-t border-[rgba(170,167,133,0.15)] pt-2.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-0.5">
              Target Applicability:
            </span>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed bg-[#2A2E28] p-2 rounded border border-[rgba(170,167,133,0.15)]">
              {active.whoApplies}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-0.5">
              Fee Structure & Financial Outlay:
            </span>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed bg-[#2A2E28] p-2 rounded border border-[rgba(170,167,133,0.15)]">
              {active.feeSummary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-lg bg-[#2A2E28] p-2 border border-[rgba(170,167,133,0.15)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-0.5">
                Timeline
              </span>
              <span className="font-semibold text-[#FDFDF5] text-[11px] block">
                {active.timeline}
              </span>
            </div>
            <div className="rounded-lg bg-[#2A2E28] p-2 border border-[rgba(170,167,133,0.15)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-0.5">
                Licence Validity
              </span>
              <span className="font-semibold text-[#FDFDF5] text-[11px] block">
                {active.validity}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onQueryAssistant(active.prompt)}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs mt-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Ask Sahayak for Guidance on this Scheme</span>
        </button>
      </div>

      {/* Comparative Matrix */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E1E1D5] mb-2">
          Schemes Comparison Matrix
        </h4>
        <div className="overflow-x-auto -mx-3.5 px-3.5">
          <table className="w-full min-w-[520px] text-left text-[11px]">
            <thead>
              <tr className="border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] text-[10px] uppercase font-bold text-[#AAA785]">
                <th className="py-2 px-2">Parameter</th>
                <th className="py-2 px-2">Scheme-I (ISI)</th>
                <th className="py-2 px-2">Scheme-II (CRS)</th>
                <th className="py-2 px-2">FMCS (Foreign)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(170,167,133,0.15)]">
              {LICENSING_SCHEME_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#2A2E28]">
                  <td className="py-2 px-2 font-semibold text-[#FDFDF5]">{row.feature}</td>
                  <td className="py-2 px-2 text-[#E1E1D5]">{row.scheme1}</td>
                  <td className="py-2 px-2 text-[#E1E1D5]">{row.scheme2}</td>
                  <td className="py-2 px-2 text-[#E1E1D5]">{row.fmcs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
