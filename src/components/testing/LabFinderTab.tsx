import { useState, useMemo } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Scale,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import {
  BIS_RECOGNIZED_LABS,
  PRODUCT_TESTING_PROFILES
} from '../../data/testingIntelligenceData.ts';
import { BisLabItem, ProductTestingProfile, TestRequirementItem } from '../../types/index.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface LabFinderTabProps {
  initialTestFilter?: string;
  onQueryAssistant: (prompt: string) => void;
}

export function LabFinderTab({ initialTestFilter, onQueryAssistant }: LabFinderTabProps) {
  const { t } = useLanguage();
  const [selectedProfileId, setSelectedProfileId] = useState<string>('ss-water-bottle-non-insulated');
  const [selectedTestId, setSelectedTestId] = useState<string>(initialTestFilter || 'all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonMatrix, setShowComparisonMatrix] = useState<boolean>(false);

  const profile: ProductTestingProfile = useMemo(() => {
    return (
      PRODUCT_TESTING_PROFILES.find((p) => p.id === selectedProfileId) ||
      PRODUCT_TESTING_PROFILES[0]
    );
  }, [selectedProfileId]);

  // Selected test requirement
  const selectedTest: TestRequirementItem | undefined = useMemo(() => {
    if (selectedTestId === 'all') return undefined;
    return profile.required_tests.find((t) => t.id === selectedTestId);
  }, [profile, selectedTestId]);

  // Filter laboratories based on criteria
  const matchingLabs = useMemo(() => {
    return BIS_RECOGNIZED_LABS.filter((lab) => {
      // Standard filter
      const matchesStandard = lab.supported_standards.some((std) =>
        std.includes(profile.is_number.split(':')[0]) || profile.is_number.includes(std.split(':')[0])
      );
      if (!matchesStandard) return false;

      // Test filter (Capability 5: Test → Lab Matching)
      if (selectedTestId !== 'all') {
        const matchesTest = lab.supported_test_ids.includes(selectedTestId);
        if (!matchesTest) return false;
      }

      // Region filter
      if (regionFilter !== 'all' && lab.region !== regionFilter) {
        return false;
      }

      // Lab type filter
      if (typeFilter !== 'all' && lab.type !== typeFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          lab.name.toLowerCase().includes(q) ||
          lab.city.toLowerCase().includes(q) ||
          lab.state.toLowerCase().includes(q) ||
          lab.accreditation.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [profile, selectedTestId, regionFilter, typeFilter, searchQuery]);

  const handleToggleCompare = (labId: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(labId)) {
        return prev.filter((id) => id !== labId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 laboratories at a time.');
        return prev;
      }
      return [...prev, labId];
    });
  };

  const comparisonLabs = useMemo(() => {
    return BIS_RECOGNIZED_LABS.filter((lab) => selectedForComparison.includes(lab.id));
  }, [selectedForComparison]);

  return (
    <div className="space-y-6">
      {/* Top Banner: Lab Finder & Reasoning */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(170,167,133,0.20)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                4. Laboratory Finder & Matching
              </span>
              <span className="rounded bg-[#2A2E28] text-[#E1E1D5] text-[11px] font-medium px-2 py-0.5">
                BIS Recognized Laboratories
              </span>
            </div>
            <h3 className="text-base font-bold text-[#FDFDF5] mt-1">
              Find Laboratories for {profile.product_name} ({profile.is_number})
            </h3>
            <p className="text-xs text-[#E1E1D5]">
              Authoritative recommendation based on verified testing scope in the BIS LIMS portal (Laboratory Information Management System).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedForComparison.length > 0 && (
              <button
                type="button"
                onClick={() => setShowComparisonMatrix(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#232323] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-2xs"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>Compare Labs ({selectedForComparison.length}/3)</span>
              </button>
            )}

            <a
              href="https://lims.bis.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors shadow-2xs"
            >
              <span>BIS LIMS Portal</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#AAA785]" />
            </a>
          </div>
        </div>

        {/* Product & Specific Test Filter Row (Capability 5: Test → Lab Matching) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#AAA785] uppercase tracking-wide mb-1">
              Select Product:
            </label>
            <select
              value={selectedProfileId}
              onChange={(e) => {
                setSelectedProfileId(e.target.value);
                setSelectedTestId('all');
              }}
              className="w-full rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] px-3 py-2 text-xs font-semibold text-[#FDFDF5] focus:border-[#AAA785] focus:bg-[#232323] focus:outline-hidden"
            >
              {PRODUCT_TESTING_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name} ({p.is_number})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#AAA785] uppercase tracking-wide mb-1">
              5. Test → Laboratory Matching (Filter by Specific Test Requirement):
            </label>
            <select
              value={selectedTestId}
              onChange={(e) => setSelectedTestId(e.target.value)}
              className="w-full rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#2A2E28]/50 px-3 py-2 text-xs font-semibold text-[#FDFDF5] focus:border-emerald-600 focus:bg-[#232323] focus:outline-hidden"
            >
              <option value="all">Any / Complete Product Standard Testing Scope</option>
              {profile.required_tests.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.relevant_clause}: {t.test_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Test Notification Banner */}
        {selectedTest && (
          <div className="mt-3 rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#2A2E28] p-3 text-xs flex items-start gap-2.5">
            <Info className="h-4 w-4 text-[#E1E1D5] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#FDFDF5]">
                Matching Laboratories with Calibrated Benches for: {selectedTest.test_name} ({selectedTest.relevant_clause})
              </p>
              <p className="text-[#E1E1D5] text-[11px] mt-0.5">
                Method: {selectedTest.required_test_method} • Acceptance Limit: {selectedTest.acceptance_criteria}
              </p>
            </div>
          </div>
        )}

        {/* Region & Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-[rgba(170,167,133,0.15)]">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-[#AAA785] mr-1">{t('testing.filterRegion', 'Region')}:</span>
            {['all', 'North', 'South', 'West', 'East', 'Central'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegionFilter(r)}
                className={`rounded px-2 py-0.5 text-xs font-medium cursor-pointer ${
                  regionFilter === r
                    ? 'bg-[#233A23] text-[#FDFDF5]'
                    : 'bg-[#2A2E28] text-[#E1E1D5] hover:bg-[#2A2E28]'
                }`}
              >
                {r === 'all' ? t('testing.allRegions', 'All Regions') : r}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#AAA785]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('testing.searchLabs', 'Search laboratories by city, state, or name...')}
                className="rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] pl-8 pr-3 py-1 text-xs text-[#FDFDF5] placeholder-[#AAA785] focus:border-[#AAA785] focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#AAA785]" />
          <h4 className="text-sm font-bold text-[#FDFDF5]">
            {matchingLabs.length} Authorized Laboratories Available
          </h4>
        </div>
        <span className="text-xs text-[#AAA785]">
          Click checkbox to add lab to side-by-side comparison
        </span>
      </div>

      {/* Laboratory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchingLabs.map((lab) => {
          const isComparing = selectedForComparison.includes(lab.id);

          return (
            <div
              key={lab.id}
              className={`rounded-xl border p-4 bg-[#232323] transition-all flex flex-col justify-between ${
                isComparing
                  ? 'border-[#AAA785] ring-2 ring-[#AAA785]/20 shadow-sm'
                  : 'border-[rgba(170,167,133,0.20)] hover:border-[rgba(170,167,133,0.30)] shadow-2xs'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          lab.type === 'Central Laboratory'
                            ? 'bg-purple-100 text-purple-800'
                            : lab.type === 'Regional Laboratory'
                            ? 'bg-[#233A23] text-[#E1E1D5]'
                            : 'bg-[#233A23] text-[#E1E1D5]'
                        }`}
                      >
                        {lab.type}
                      </span>
                      <span className="rounded bg-[#2A2E28] px-1.5 py-0.5 text-[10px] font-semibold text-[#E1E1D5]">
                        {lab.region} Region
                      </span>
                      <span className="text-[11px] font-bold text-[#AAA785]">
                        LIMS: {lab.contact_info.lims_id || 'ACTIVE'}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-[#FDFDF5] mt-1">{lab.name}</h5>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleCompare(lab.id)}
                    className={`rounded px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                      isComparing
                        ? 'bg-[#233A23] text-[#FDFDF5]'
                        : 'border border-[rgba(170,167,133,0.30)] bg-[#232323] text-[#E1E1D5] hover:bg-[#2A2E28]'
                    }`}
                  >
                    {isComparing ? '✓ Comparing' : '+ Compare'}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1.5 text-xs text-[#E1E1D5] mb-2">
                  <MapPin className="h-3.5 w-3.5 text-[#AAA785] shrink-0 mt-0.5" />
                  <span>{lab.contact_info.address}</span>
                </div>

                {/* Accreditation & Scope */}
                <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)] mb-3 text-[11px] space-y-1">
                  <div>
                    <strong className="text-[#E1E1D5]">Accreditation:</strong>{' '}
                    <span className="text-[#E1E1D5]">{lab.accreditation}</span>
                  </div>
                  <div>
                    <strong className="text-[#E1E1D5]">Turnaround Time:</strong>{' '}
                    <span className="text-[#E1E1D5] font-semibold">{lab.turnaround_time}</span>
                  </div>
                  <div>
                    <strong className="text-[#E1E1D5]">Authoritative Source:</strong>{' '}
                    <span className="text-[#AAA785]">{lab.source_reference}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Contacts & Action */}
              <div className="pt-2 border-t border-[rgba(170,167,133,0.15)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[#E1E1D5]">
                  {lab.contact_info.phone && (
                    <span className="flex items-center gap-1 text-[11px]" title={lab.contact_info.phone}>
                      <Phone className="h-3 w-3 text-[#AAA785]" />
                      <span className="truncate max-w-[120px]">{lab.contact_info.phone}</span>
                    </span>
                  )}
                  {lab.contact_info.email && (
                    <span className="flex items-center gap-1 text-[11px]" title={lab.contact_info.email}>
                      <Mail className="h-3 w-3 text-[#AAA785]" />
                      <span className="truncate max-w-[120px]">{lab.contact_info.email}</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onQueryAssistant(
                      `Draft a sample forwarding letter to ${lab.name} for testing ${profile.product_name} under ${profile.is_number}.`
                    )
                  }
                  className="inline-flex items-center gap-1 text-[#FDFDF5] font-semibold text-[11px] hover:text-[#E1E1D5] hover:underline cursor-pointer"
                >
                  <span>Forwarding Letter</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capability 6: Side-by-Side Laboratory Comparison Matrix Modal */}
      {showComparisonMatrix && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-5xl rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(170,167,133,0.20)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                    6. Laboratory Comparison Matrix
                  </span>
                  <span className="rounded bg-[#2A2E28] text-[#E1E1D5] text-[11px] font-medium px-2 py-0.5">
                    Authoritative Side-by-Side View
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#FDFDF5] mt-1">
                  Side-by-Side Laboratory Evaluation
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowComparisonMatrix(false)}
                className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#2A2E28] hover:text-[#E1E1D5]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28]">
                    <th className="p-3 font-bold text-[#AAA785] uppercase tracking-wide w-1/4">
                      Evaluation Parameter
                    </th>
                    {comparisonLabs.map((lab) => (
                      <th key={lab.id} className="p-3 font-bold text-[#FDFDF5] border-l border-[rgba(170,167,133,0.20)]">
                        <div className="font-bold text-sm text-[#FDFDF5]">{lab.name}</div>
                        <span className="text-[10px] font-medium text-[#AAA785]">{lab.city}, {lab.state}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(170,167,133,0.15)]">
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Laboratory Classification</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] font-semibold text-[#FDFDF5]">
                        {lab.type}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Accreditation & ISO Scope</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] text-[#E1E1D5]">
                        {lab.accreditation}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Estimated Turnaround Time</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] font-bold text-[#E1E1D5]">
                        {lab.turnaround_time}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Address & Physical Location</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] text-[#E1E1D5]">
                        {lab.contact_info.address}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Direct Contact Details</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] text-[#E1E1D5] space-y-1">
                        <div>Tel: {lab.contact_info.phone || 'N/A'}</div>
                        <div>Email: {lab.contact_info.email || 'N/A'}</div>
                        <div>LIMS Code: {lab.contact_info.lims_id || 'N/A'}</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E1E1D5] bg-[#2A2E28]">Authoritative Source Reference</td>
                    {comparisonLabs.map((lab) => (
                      <td key={lab.id} className="p-3 border-l border-[rgba(170,167,133,0.20)] text-[#AAA785] text-[11px]">
                        {lab.source_reference}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowComparisonMatrix(false)}
                className="rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#232323] px-4 py-2 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28]"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
