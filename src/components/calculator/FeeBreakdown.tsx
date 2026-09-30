import { ShieldCheck, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { FeeInputState } from './FeeInputForm.tsx';
import { INDIAN_STANDARDS } from '../../data/standards.ts';

export interface FeeLineItem {
  id: string;
  name: string;
  basis: string;
  condition: string;
  type: 'FIXED' | 'CONDITIONAL' | 'ESTIMATED';
  baseAmount: number;
  concessionAmount: number;
  netAmount: number;
  notes?: string;
}

interface FeeBreakdownProps {
  inputs: FeeInputState;
}

export function FeeBreakdown({ inputs }: FeeBreakdownProps) {
  const standard = INDIAN_STANDARDS.find((s) => s.id === inputs.standardId) || INDIAN_STANDARDS[0];

  // Minimum marking fee map by standard ID
  const MARKING_FEE_MAP: Record<string, number> = {
    'IS-17803': 43000,
    'IS-17526': 48000,
    'IS-302-2-15': 53000,
    'IS-302-2-3': 38000,
    'IS-14543': 47000,
    'IS-13428': 49000,
    'IS-4151': 57000,
    'IS-1293': 41000,
    'IS-16102': 61000,
    'IS-15885-2-13': 52000,
    'IS-1786': 82000,
    'IS-8112': 94000,
    'IS-9873-1': 32000,
    'IS-9873-3': 32000,
    'IS-16046-2': 45000,
    'IS-13252-1': 50000
  };

  const baseMarkingFee = MARKING_FEE_MAP[standard.id] || 45000;

  // Concession percentage
  let concessionPct = 0;
  let concessionLabel = 'None (Standard Rate)';
  if (inputs.manufacturerType === 'MICRO_STARTUP') {
    concessionPct = 0.5; // 50%
    concessionLabel = '50% DPIIT / Micro Concession';
  } else if (inputs.manufacturerType === 'SMALL') {
    concessionPct = 0.2; // 20%
    concessionLabel = '20% Small Enterprise Concession';
  }

  const items: FeeLineItem[] = [];

  // 1. Application Fee
  if (inputs.activity === 'NEW_SIMPLIFIED' || inputs.activity === 'NEW_NORMAL') {
    const base = 1000;
    const con = base * concessionPct;
    items.push({
      id: 'fee-app',
      name: 'Statutory Application Fee (Form-V / Form-I)',
      basis: 'Per application submission on Manakonline',
      condition: concessionLabel,
      type: 'FIXED',
      baseAmount: base,
      concessionAmount: con,
      netAmount: base - con,
      notes: 'Non-refundable portal filing fee'
    });
  } else if (inputs.activity === 'SCOPE_CHANGE') {
    const base = 1000;
    const con = base * concessionPct;
    items.push({
      id: 'fee-app',
      name: 'Endorsement / Scope Extension Fee',
      basis: 'Per brand or variety addition request',
      condition: concessionLabel,
      type: 'FIXED',
      baseAmount: base,
      concessionAmount: con,
      netAmount: base - con
    });
  }

  // 2. Factory Inspection / Assessment Charge
  if (inputs.activity === 'NEW_SIMPLIFIED') {
    const days = 1;
    const base = 7000 * days;
    const con = base * concessionPct;
    items.push({
      id: 'fee-audit',
      name: 'Factory Audit & Verification Charge',
      basis: '₹7,000 per auditor man-day (1 day for Simplified Route)',
      condition: concessionLabel,
      type: 'FIXED',
      baseAmount: base,
      concessionAmount: con,
      netAmount: base - con,
      notes: 'Traveling & lodging expenses of auditor at actuals'
    });
  } else if (inputs.activity === 'NEW_NORMAL') {
    const days = 2;
    const base = 7000 * days;
    const con = base * concessionPct;
    items.push({
      id: 'fee-audit',
      name: 'Preliminary Factory Inspection & Sampling',
      basis: '₹7,000 per auditor man-day (2 days for Normal Route)',
      condition: concessionLabel,
      type: 'FIXED',
      baseAmount: base,
      concessionAmount: con,
      netAmount: base - con,
      notes: 'Includes verification of in-house testing & sample sealing'
    });
  } else if (inputs.activity === 'SCOPE_CHANGE') {
    const base = 7000;
    const con = base * concessionPct;
    items.push({
      id: 'fee-audit',
      name: 'Special Factory Verification (If Required)',
      basis: 'Applicable if new machinery or tests are introduced',
      condition: concessionLabel,
      type: 'CONDITIONAL',
      baseAmount: base,
      concessionAmount: con,
      netAmount: base - con
    });
  }

  // 3. Annual Licence Fee
  const licenceYears = inputs.activity === 'RENEWAL_2YR' ? 2 : 1;
  const baseLicence = 1000 * licenceYears;
  items.push({
    id: 'fee-licence',
    name: `Annual Licence Fee (${licenceYears} Year${licenceYears > 1 ? 's' : ''})`,
    basis: '₹1,000 per operative year (Section 13)',
    condition: 'Mandatory for all licensees',
    type: 'FIXED',
    baseAmount: baseLicence,
    concessionAmount: 0,
    netAmount: baseLicence,
    notes: 'Payable upon grant and at each annual renewal'
  });

  // 4. Minimum Marking Fee (Advance)
  const markingYears = inputs.activity === 'RENEWAL_2YR' ? 2 : 1;
  const baseMarking = baseMarkingFee * markingYears;
  const conMarking = baseMarking * concessionPct;
  items.push({
    id: 'fee-marking',
    name: `Annual Minimum Marking Fee (${standard.is_number})`,
    basis: `Advance marking fee for ${standard.common_products[0] || standard.category}`,
    condition: concessionLabel,
    type: 'FIXED',
    baseAmount: baseMarking,
    concessionAmount: conMarking,
    netAmount: baseMarking - conMarking,
    notes: 'Volume-based marking fees adjusted at end of operating year'
  });

  // 5. Independent Referral Lab Testing Estimate
  if (inputs.activity === 'NEW_SIMPLIFIED' || inputs.activity === 'NEW_NORMAL') {
    const estTesting = 18000;
    items.push({
      id: 'fee-testing',
      name: 'Independent Type Testing Charges (Reference Estimate)',
      basis: 'Paid directly to BIS-recognized or National Laboratory',
      condition: 'Variable by laboratory & test scope',
      type: 'ESTIMATED',
      baseAmount: estTesting,
      concessionAmount: 0,
      netAmount: estTesting,
      notes: 'Actual testing charges billed by testing lab per clause scope'
    });
  }

  // Calculations
  const subtotalGovt = items
    .filter((i) => i.id !== 'fee-testing')
    .reduce((sum, item) => sum + item.netAmount, 0);

  const gst18 = Math.round(subtotalGovt * 0.18);
  const totalGovtWithGst = subtotalGovt + gst18;

  const testingEst = items.find((i) => i.id === 'fee-testing')?.netAmount || 0;
  const grandTotal = totalGovtWithGst + testingEst;

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 sm:p-6 shadow-2xs space-y-4">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5]">
          Itemized Statutory Fee Breakdown
        </h3>
        <p className="text-xs text-[#AAA785]">
          Computed for <strong>{standard.is_number}</strong> with applicable concessions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] text-[#E1E1D5] font-semibold">
              <th className="py-2.5 px-3">Fee Component</th>
              <th className="py-2.5 px-3">Statutory Basis</th>
              <th className="py-2.5 px-3">Concession / Status</th>
              <th className="py-2.5 px-3 text-right">Base Fee</th>
              <th className="py-2.5 px-3 text-right">Net Payable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(170,167,133,0.15)] text-[#E1E1D5]">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#2A2E28] transition-colors">
                <td className="py-3 px-3">
                  <div className="font-bold text-[#FDFDF5]">{item.name}</div>
                  {item.notes && (
                    <div className="text-[10px] text-[#AAA785]">{item.notes}</div>
                  )}
                </td>
                <td className="py-3 px-3 text-[#E1E1D5] text-[11px]">{item.basis}</td>
                <td className="py-3 px-3">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      item.concessionAmount > 0
                        ? 'bg-[#233A23] text-[#E1E1D5]'
                        : item.type === 'ESTIMATED'
                        ? 'bg-[#233A23] text-[#E1E1D5]'
                        : 'bg-[#2A2E28] text-[#E1E1D5]'
                    }`}
                  >
                    {item.condition}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#AAA785]">
                  ₹{item.baseAmount.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#FDFDF5]">
                  ₹{item.netAmount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Summary */}
      <div className="pt-3 border-t border-[rgba(170,167,133,0.20)] space-y-1.5 text-xs text-[#E1E1D5]">
        <div className="flex justify-between py-1 px-3">
          <span>Subtotal (Statutory BIS Government Fees):</span>
          <span className="font-mono font-semibold">₹{subtotalGovt.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between py-1 px-3">
          <span>Goods and Services Tax (GST @ 18%):</span>
          <span className="font-mono font-semibold">₹{gst18.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between py-2 px-3 rounded-lg bg-[#2A2E28] font-bold text-[#FDFDF5] border border-[rgba(170,167,133,0.20)]">
          <span>Total Statutory Government Charges (Incl. GST):</span>
          <span className="font-mono text-sm text-[#FDFDF5]">
            ₹{totalGovtWithGst.toLocaleString('en-IN')}
          </span>
        </div>

        {testingEst > 0 && (
          <div className="flex justify-between py-2 px-3 rounded-lg bg-[#2A2E28]/70 border border-[rgba(170,167,133,0.25)] text-emerald-950 font-bold">
            <div>
              <span>Estimated All-Inclusive Total (Govt + Lab Testing):</span>
              <span className="text-[10px] block font-normal text-[#E1E1D5]">
                Includes sample testing charges payable to BIS empanelled laboratory
              </span>
            </div>
            <span className="font-mono text-base text-[#FDFDF5] self-center">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
