import { useState, useMemo } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileWarning
} from 'lucide-react';
import {
  SAMPLE_TEST_REPORTS,
  PRODUCT_TESTING_PROFILES
} from '../../data/testingIntelligenceData.ts';
import { SampleTestReport, ExtractedReportTest } from '../../types/index.ts';

interface TestReportIntelligenceTabProps {
  onQueryAssistant: (prompt: string) => void;
  onNavigateToGaps?: () => void;
}

export function TestReportIntelligenceTab({
  onQueryAssistant,
  onNavigateToGaps
}: TestReportIntelligenceTabProps) {
  const [selectedReportId, setSelectedReportId] = useState<string>('report-ss-bottle-partial');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedResult, setUploadedResult] = useState<{
    documentId: number;
    filename: string;
    standard: string;
    labName: string;
    reportNumber: string;
    sampleDescription: string;
    issueDate: string;
    overallConformity: 'PASS' | 'FAIL' | 'PARTIAL' | 'INCONCLUSIVE';
    passedCount: number;
    failedCount: number;
    pendingCount: number;
    parameters: Array<{
      testParameter: string;
      clause: string;
      requirementLimit: string;
      observedValue: string;
      result: 'PASS' | 'FAIL' | 'PENDING';
      remarks?: string;
    }>;
    gaps: string[];
    rawText: string;
  } | null>(null);

  // Active sample report (used when no custom upload is active)
  const activeSampleReport: SampleTestReport = useMemo(() => {
    return (
      SAMPLE_TEST_REPORTS.find((r) => r.id === selectedReportId) ||
      SAMPLE_TEST_REPORTS[0]
    );
  }, [selectedReportId]);

  // Handle sample report switch
  const handleSelectSample = (reportId: string) => {
    setSelectedReportId(reportId);
    setUploadedResult(null);
    setUploadError(null);
  };

  // Real backend file upload and automated scrutiny pipeline
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', '1');
    formData.append('documentType', 'TEST_REPORT');

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        throw new Error(errJson?.error || `Server error (${response.status})`);
      }

      const resData = await response.json();
      if (!resData.success || !resData.data) {
        throw new Error(resData.error || 'Failed to parse document analysis');
      }

      const { document: doc, analysis } = resData.data;

      setUploadedResult({
        documentId: doc.id,
        filename: doc.originalName,
        standard: analysis.standardDetected,
        labName: analysis.labDetected,
        reportNumber: analysis.reportNumber,
        sampleDescription: analysis.sampleDescription,
        issueDate: analysis.issueDate,
        overallConformity: analysis.overallConformity,
        passedCount: analysis.passedTestsCount,
        failedCount: analysis.failedTestsCount,
        pendingCount: analysis.pendingTestsCount,
        parameters: analysis.parametersExtracted,
        gaps: analysis.extractedGaps,
        rawText: analysis.rawAnalysisText
      });
    } catch (err) {
      console.error('File upload error:', err);
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  // Compute active display dataset (uploaded document takes precedence)
  const isUploadedActive = Boolean(uploadedResult);
  const displayStandard = uploadedResult ? uploadedResult.standard : activeSampleReport.extracted_data.standard;
  const displayProduct = uploadedResult ? uploadedResult.sampleDescription : activeSampleReport.extracted_data.product;
  const displayLab = uploadedResult ? uploadedResult.labName : activeSampleReport.lab_name;
  const displayReportNumber = uploadedResult ? uploadedResult.reportNumber : activeSampleReport.report_number;
  const displayConformity = uploadedResult ? uploadedResult.overallConformity : (activeSampleReport.id.includes('fail') ? 'FAIL' : activeSampleReport.id.includes('partial') ? 'PARTIAL' : 'PASS');
  const displayRawText = uploadedResult ? uploadedResult.rawText : activeSampleReport.raw_text;

  const isFailed = displayConformity === 'FAIL';
  const isPartial = displayConformity === 'PARTIAL';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(170,167,133,0.20)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                8. Test Report Intelligence
              </span>
              <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[11px] font-semibold px-2 py-0.5">
                {isUploadedActive ? 'Live Uploaded Report' : 'Automated Scrutiny'}
              </span>
              {isUploadedActive && (
                <span className="rounded bg-purple-100 text-purple-800 text-[11px] font-semibold px-2 py-0.5">
                  PostgreSQL Persisted
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-[#FDFDF5] mt-1">
              Upload or Select a Test Report for Immediate Scrutiny
            </h3>
            <p className="text-xs text-[#E1E1D5]">
              The AI engine parses laboratory test reports, extracts quantitative test results, maps observed parameters to BIS specification limits, and flags omitted mandatory clauses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {uploadedResult && (
              <a
                href={`/api/documents/${uploadedResult.documentId}/download`}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#232323] px-3 py-1.5 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors shadow-2xs"
              >
                <FileText className="h-3.5 w-3.5 text-[#AAA785]" />
                <span>Download Original</span>
              </a>
            )}
            <button
              type="button"
              onClick={() =>
                onQueryAssistant(
                  `Audit this test report for ${displayProduct} under ${displayStandard}:\n\n${displayRawText}`
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#232323] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Audit with Sahayak AI</span>
            </button>
          </div>
        </div>

        {/* Upload Loading & Error Notifications */}
        {isUploading && (
          <div className="mt-4 rounded-lg bg-[#2A2E28] border border-[rgba(170,167,133,0.25)] p-3 text-xs text-[#FDFDF5] flex items-center gap-2 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span className="font-medium">
              Uploading document to secure storage, parsing quantitative parameters & evaluating against BIS standard limits...
            </span>
          </div>
        )}

        {uploadError && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-900 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>Upload or Parsing Error: {uploadError}</span>
          </div>
        )}

        {/* Sample Report Loaders & File Selector */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-[#AAA785]">Quick-Load Authentic Sample Test Reports:</span>
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-emerald-400 bg-[#2A2E28] px-3 py-1 text-xs font-semibold text-[#FDFDF5] hover:bg-[#233A23] cursor-pointer transition-colors shadow-2xs">
              <Upload className="h-3.5 w-3.5 text-[#E1E1D5]" />
              <span>{uploadedResult ? `Uploaded: ${uploadedResult.filename}` : 'Upload Test Report (.pdf, .txt, .csv, doc)'}</span>
              <input type="file" onChange={handleFileUpload} accept=".txt,.json,.csv,.pdf,.doc,.docx,image/*" className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SAMPLE_TEST_REPORTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  !isUploadedActive && selectedReportId === sample.id
                    ? 'border-emerald-600 bg-[#2A2E28]/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 hover:bg-[#2A2E28] hover:border-[rgba(170,167,133,0.30)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#AAA785] uppercase tracking-wide">
                    {sample.standard_referenced}
                  </span>
                  {sample.id.includes('partial') ? (
                    <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[9px] font-bold px-1.5 py-0.2">
                      Missing Clause
                    </span>
                  ) : sample.id.includes('fail') ? (
                    <span className="rounded bg-red-100 text-red-800 text-[9px] font-bold px-1.5 py-0.2">
                      Failed Param
                    </span>
                  ) : (
                    <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[9px] font-bold px-1.5 py-0.2">
                      Full Pass
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-[#FDFDF5] mt-1 line-clamp-1">{sample.product_name}</div>
                <div className="text-[10px] text-[#AAA785] mt-0.5 truncate">{sample.lab_name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extracted Metadata Strip */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#AAA785] uppercase">Product & Sample Description</span>
            <p className="font-bold text-[#FDFDF5] mt-0.5 line-clamp-2">{displayProduct}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#AAA785] uppercase">Indian Standard Reference</span>
            <p className="font-bold text-[#E1E1D5] mt-0.5">{displayStandard}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#AAA785] uppercase">Testing Laboratory</span>
            <p className="font-semibold text-[#FDFDF5] mt-0.5 line-clamp-1">{displayLab}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#AAA785] uppercase">Report No. & Accreditation</span>
            <p className="font-semibold text-[#FDFDF5] mt-0.5">{displayReportNumber}</p>
            <p className="text-[10px] text-[#AAA785]">{uploadedResult?.issueDate || activeSampleReport.extracted_data.accreditation_ref}</p>
          </div>
        </div>
      </div>

      {/* Audit Outcome Banner */}
      <div
        className={`rounded-xl border p-4 ${
          isFailed
            ? 'border-red-200 bg-red-50/50'
            : isPartial
            ? 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/50'
            : 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/50'
        }`}
      >
        <div className="flex items-start gap-3">
          {isFailed ? (
            <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          ) : isPartial ? (
            <AlertTriangle className="h-5 w-5 text-[#AAA785] shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-[#AAA785] shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h4 className="text-sm font-bold text-[#FDFDF5]">
              {isFailed
                ? 'Technical Scrutiny: Non-Conformances Detected (Immediate CAPA Required)'
                : isPartial
                ? 'Technical Scrutiny: Incomplete Dossier (Mandatory Clauses Omitted)'
                : 'Technical Scrutiny: 100% Compliant with Mandatory BIS Standard'}
            </h4>
            <p className="text-xs text-[#E1E1D5] mt-1 leading-relaxed">
              {uploadedResult
                ? `Evaluation of ${displayReportNumber} complete: ${uploadedResult.passedCount} parameter(s) conforming, ${uploadedResult.failedCount} non-conforming, ${uploadedResult.pendingCount} pending/omitted.`
                : activeSampleReport.extracted_data.conclusion}
            </p>

            {uploadedResult && uploadedResult.gaps.length > 0 && (
              <div className="mt-2 text-xs font-semibold text-[#FDFDF5] bg-[#233A23]/80 p-2 rounded-md">
                <span>Flagged Gaps: </span>
                {uploadedResult.gaps.join('; ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Quantitative Line Items Table */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[rgba(170,167,133,0.15)] flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#E1E1D5]">
            Extracted Test Parameters & Verification Against Specification
          </h4>
          <span className="text-xs text-[#AAA785]">
            {uploadedResult
              ? `${uploadedResult.parameters.length} Clauses Extracted`
              : `${activeSampleReport.extracted_data.tests_performed.length} Clauses Extracted`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A2E28] border-b border-[rgba(170,167,133,0.20)] text-[#AAA785] uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Clause & Test Name</th>
                <th className="p-3">Observed Quantitative Value</th>
                <th className="p-3">Mandatory Permissible Limit</th>
                <th className="p-3 text-right">Scrutiny Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(170,167,133,0.15)]">
              {uploadedResult
                ? uploadedResult.parameters.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#2A2E28]">
                      <td className="p-3">
                        <div className="font-bold text-[#FDFDF5]">{item.testParameter}</div>
                        <span className="text-[10px] text-[#AAA785] font-semibold">{item.clause}</span>
                        {item.remarks && (
                          <div className="text-[10px] text-[#AAA785] font-medium mt-0.5">{item.remarks}</div>
                        )}
                      </td>
                      <td className="p-3 font-medium text-[#FDFDF5]">{item.observedValue}</td>
                      <td className="p-3 text-[#E1E1D5]">{item.requirementLimit}</td>
                      <td className="p-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            item.result === 'PASS'
                              ? 'bg-[#233A23] text-[#E1E1D5]'
                              : item.result === 'FAIL'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-[#233A23] text-[#E1E1D5]'
                          }`}
                        >
                          {item.result === 'PASS' ? 'Conforming' : item.result === 'FAIL' ? 'Non-Conforming' : 'Omitted / Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                : activeSampleReport.extracted_data.tests_performed.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#2A2E28]">
                      <td className="p-3">
                        <div className="font-bold text-[#FDFDF5]">{item.test_name}</div>
                        <span className="text-[10px] text-[#AAA785] font-semibold">{item.clause}</span>
                      </td>
                      <td className="p-3 font-medium text-[#FDFDF5]">{item.observed_value}</td>
                      <td className="p-3 text-[#E1E1D5]">{item.specified_limit}</td>
                      <td className="p-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            item.result === 'Pass'
                              ? 'bg-[#233A23] text-[#E1E1D5]'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.result === 'Pass' ? 'Conforming' : 'Non-Conforming'}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Report Transcript Accordion */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] p-4 text-xs">
        <h5 className="font-bold text-[#E1E1D5] mb-2">Original Test Report Text Transcript:</h5>
        <pre className="font-mono text-[11px] text-[#E1E1D5] bg-[#232323] p-3 rounded-lg border border-[rgba(170,167,133,0.20)] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
          {displayRawText}
        </pre>
      </div>
    </div>
  );
}
