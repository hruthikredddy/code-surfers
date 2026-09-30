import { useState } from 'react';
import { FlaskConical, CheckCircle2, AlertCircle, ExternalLink, Sparkles, Scale, Gauge, Building } from 'lucide-react';

interface TestingRequirementsTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function TestingRequirementsTab({ onQueryAssistant }: TestingRequirementsTabProps) {
  const [activeTestTab, setActiveTestTab] = useState<'levels' | 'calibration' | 'labs'>('levels');

  return (
    <div className="space-y-4">
      {/* Sub-nav switcher */}
      <div className="flex rounded-xl bg-[#2A2E28] p-1">
        {[
          { id: 'levels', label: 'Test Hierarchy (Routine vs Type)' },
          { id: 'calibration', label: 'In-House Bench & Calibration' },
          { id: 'labs', label: 'BIS LIMS & External Labs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTestTab(tab.id as any)}
            className={`flex-1 rounded-lg py-1.5 px-2 text-center text-xs font-semibold transition-all cursor-pointer ${
              activeTestTab === tab.id
                ? 'bg-[#232323] text-[#FDFDF5] shadow-2xs'
                : 'text-[#E1E1D5] hover:text-[#FDFDF5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTestTab === 'levels' && (
        <div className="space-y-3">
          {/* Routine Tests Card */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                100% In-House Testing Required
              </span>
              <span className="text-[10px] font-bold text-[#AAA785]">Level 1</span>
            </div>
            <h4 className="text-xs font-bold text-[#FDFDF5]">
              Routine Tests (Factory Assembly Line)
            </h4>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
              Mandatory non-destructive tests performed by the manufacturer on <strong>every single unit or continuous length</strong> produced before passing down the assembly line.
            </p>
            <div className="rounded bg-[#2A2E28] p-2 text-[11px] text-[#E1E1D5] border border-[rgba(170,167,133,0.15)]">
              <strong>Common Examples:</strong> High Voltage (Dielectric) breakdown test, Earth continuity test, Hydrostatic leak test for pressure vessels, Dimensional tolerance check.
            </div>
          </div>

          {/* Acceptance Tests Card */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] bg-[#2A2E28] px-2 py-0.5 rounded border border-amber-100">
                Batch Sample Testing
              </span>
              <span className="text-[10px] font-bold text-[#AAA785]">Level 2</span>
            </div>
            <h4 className="text-xs font-bold text-[#FDFDF5]">
              Acceptance Tests (Lot-by-Lot Release)
            </h4>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
              Tests carried out on samples selected at random from a manufacturing lot/batch to determine whether the entire consignment conforms to Indian Standards for dispatch.
            </p>
            <div className="rounded bg-[#2A2E28] p-2 text-[11px] text-[#E1E1D5] border border-[rgba(170,167,133,0.15)]">
              <strong>Common Examples:</strong> Tensile strength, Elongation, Moisture content, Drop test from 1.2 meters, Ingress protection seal tests.
            </div>
          </div>

          {/* Type Tests Card */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] bg-[#2A2E28] px-2 py-0.5 rounded border border-blue-100">
                Comprehensive Independent Testing
              </span>
              <span className="text-[10px] font-bold text-[#AAA785]">Level 3</span>
            </div>
            <h4 className="text-xs font-bold text-[#FDFDF5]">
              Type Tests (Full Specification Qualification)
            </h4>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
              Exhaustive testing covering all clauses of the Indian Standard, including destructive, accelerated aging, flammability, and environmental endurance tests. Conducted during initial licensing and whenever product design or materials change.
            </p>
            <div className="rounded bg-[#2A2E28] p-2 text-[11px] text-[#E1E1D5] border border-[rgba(170,167,133,0.15)]">
              <strong>Where Performed:</strong> BIS Central Laboratory (Sahibabad), BIS Regional Labs (Chennai, Kolkata, Mumbai, Chandigarh), or BIS-recognized NABL accredited commercial labs.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onQueryAssistant('What are the differences between Routine Tests, Acceptance Tests, and Type Tests in Indian Standards, and which ones must I conduct in my factory laboratory?')}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Ask Sahayak about Testing Rules for your Product</span>
          </button>
        </div>
      )}

      {activeTestTab === 'calibration' && (
        <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-2xs space-y-3 text-xs">
          <div className="flex items-start gap-2 text-[#FDFDF5] font-bold">
            <Gauge className="h-4 w-4 text-[#AAA785] shrink-0 mt-0.5" />
            <span>Calibration & In-House Lab Readiness Mandate</span>
          </div>

          <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
            BIS auditing officers strictly scrutinize the factory test bench. If instruments lack valid NABL calibration certificates or if the least count is insufficient, the audit will fail immediately.
          </p>

          <div className="space-y-2">
            <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)]">
              <span className="font-semibold text-[#FDFDF5] block text-[11px] mb-0.5">
                1. Accreditation Requirement
              </span>
              <p className="text-[11px] text-[#E1E1D5]">
                Calibration must be performed by an <strong>NABL-accredited calibration laboratory</strong> (ISO/IEC 17025). The calibration report must display the NABL symbol and certificate number.
              </p>
            </div>

            <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)]">
              <span className="font-semibold text-[#FDFDF5] block text-[11px] mb-0.5">
                2. Calibration Frequency & Due Dates
              </span>
              <p className="text-[11px] text-[#E1E1D5]">
                All certificates must be less than <strong>12 months old</strong> on the inspection date. Every instrument must carry a visible calibration sticker stating calibration date, due date, and certificate number.
              </p>
            </div>

            <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)]">
              <span className="font-semibold text-[#FDFDF5] block text-[11px] mb-0.5">
                3. Ambient Environmental Control
              </span>
              <p className="text-[11px] text-[#E1E1D5]">
                The laboratory room must maintain controlled temperature and relative humidity (e.g., 27°C ± 2°C and 65% ± 5% RH for electrical and textile standards) with calibrated thermo-hygrometers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onQueryAssistant('What are the strict calibration guidelines and NABL accreditation requirements for instruments used in a BIS factory audit?')}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Ask Sahayak for In-House Lab Setup Advice</span>
          </button>
        </div>
      )}

      {activeTestTab === 'labs' && (
        <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-2xs space-y-3 text-xs">
          <div className="flex items-start gap-2 text-[#FDFDF5] font-bold">
            <Building className="h-4 w-4 text-[#AAA785] shrink-0 mt-0.5" />
            <span>BIS Recognized Testing Laboratories (LIMS)</span>
          </div>

          <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
            All official sample testing for Scheme-I, Scheme-II (CRS), and simplified route verification is governed through the official <strong>Laboratory Information Management System (LIMS)</strong>.
          </p>

          <div className="space-y-2 text-[11px]">
            <div className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] p-2.5">
              <span className="font-bold text-[#FDFDF5] block mb-0.5">BIS Central & Regional Laboratories:</span>
              <ul className="space-y-0.5 text-[#E1E1D5] list-disc list-inside">
                <li>Central Laboratory: Sahibabad (Ghaziabad, NCR)</li>
                <li>Western Regional Laboratory: Mumbai (Andheri)</li>
                <li>Southern Regional Laboratory: Chennai (Taramani)</li>
                <li>Eastern Regional Laboratory: Kolkata</li>
                <li>Northern Regional Laboratory: Mohali / Chandigarh</li>
              </ul>
            </div>

            <div className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] p-2.5">
              <span className="font-bold text-[#FDFDF5] block mb-0.5">BIS Recognized Commercial & Institutional Labs:</span>
              <p className="text-[#E1E1D5]">
                Over 200+ NABL accredited private laboratories recognized under the BIS Laboratory Recognition Scheme (LRS) across India (CPRI, ERDA, Shriram Institute, TUV, UL, Intertek, etc.).
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[rgba(170,167,133,0.15)] flex flex-col gap-2">
            <a
              href="https://www.lims.bis.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-2.5 text-xs font-medium text-[#FDFDF5] hover:bg-[#2A2E28] hover:border-[rgba(170,167,133,0.30)] transition-colors"
            >
              <span>BIS LIMS Portal (Laboratory Information System)</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#AAA785]" />
            </a>

            <button
              type="button"
              onClick={() => onQueryAssistant('How do I locate a BIS-recognized laboratory for testing my product under the Laboratory Recognition Scheme (LRS)?')}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Ask Sahayak to Find a Recognized Lab</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
