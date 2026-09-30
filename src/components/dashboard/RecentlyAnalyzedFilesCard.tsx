import { FileText, CheckCircle2, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { AnalyzedProductFile } from '../../types/index.ts';

interface RecentlyAnalyzedFilesCardProps {
  files: AnalyzedProductFile[];
  onSelectFile: (file: AnalyzedProductFile) => void;
}

export function RecentlyAnalyzedFilesCard({ files, onSelectFile }: RecentlyAnalyzedFilesCardProps) {
  const { t } = useLanguage();

  const getStatusBadge = (status: AnalyzedProductFile['status']) => {
    switch (status) {
      case 'PASSED':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#233A23] px-2 py-0.5 text-[11px] font-semibold text-[#AAA785] border border-[#AAA785]/25">
            <CheckCircle2 className="h-3 w-3" />
            {t('dashboard.statusPassed', 'PASSED')}
          </span>
        );
      case 'ACTION_REQUIRED':
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-500/15 px-2 py-0.5 text-[11px] font-semibold text-rose-400 border border-rose-500/30">
            <AlertTriangle className="h-3 w-3" />
            {t('dashboard.statusActionRequired', 'ACTION REQ')}
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#2A2E28]0/15 px-2 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-500/30">
            <Clock className="h-3 w-3" />
            {t('dashboard.statusPending', 'PENDING')}
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
            {t('dashboard.recentlyAnalyzedTitle', 'Recently Analyzed Products & Test Reports')}
          </h3>
          <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
            {t('dashboard.recentlyAnalyzedSubtitle', 'Multi-clause testing evaluation, chemical safety limits & certification status')}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[rgba(170,167,133,0.18)]">
        <table className="w-full text-left text-xs text-[#E1E1D5]">
          <thead className="bg-[#2A3328] text-[11px] font-semibold text-[#AAA785] border-b border-[rgba(170,167,133,0.18)]">
            <tr>
              <th className="py-2.5 px-3">{t('dashboard.productFile', 'Product & File')}</th>
              <th className="py-2.5 px-3">{t('dashboard.standardRef', 'Standard Ref')}</th>
              <th className="py-2.5 px-3">{t('dashboard.testClauses', 'Test Clauses')}</th>
              <th className="py-2.5 px-3">{t('dashboard.status', 'Status')}</th>
              <th className="py-2.5 px-3 text-right">{t('dashboard.date', 'Date')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(170,167,133,0.15)] bg-[#232323]">
            {files.map((file) => (
              <tr
                key={file.id}
                onClick={() => onSelectFile(file)}
                className="hover:bg-[#232323] transition-colors cursor-pointer group"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2A3328] text-[#AAA785] border border-[#AAA785]/25 shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[#FDFDF5] group-hover:text-[#AAA785] transition-colors block">
                        {file.name}
                      </span>
                      {file.labName && (
                        <span className="text-[10px] text-[#AAA785] block truncate max-w-xs">
                          {file.labName}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-[#FDFDF5] whitespace-nowrap font-mono">
                  {file.standard}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#AAA785] font-semibold">{file.passCount} pass</span>
                    {file.pendingCount > 0 && (
                      <>
                        <span className="text-[#AAA785]">•</span>
                        <span className="text-amber-400 font-semibold">{file.pendingCount} pend</span>
                      </>
                    )}
                    {file.failCount > 0 && (
                      <>
                        <span className="text-[#AAA785]">•</span>
                        <span className="text-rose-400 font-semibold">{file.failCount} fail</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {getStatusBadge(file.status)}
                </td>
                <td className="py-3 px-3 text-right text-[#AAA785] whitespace-nowrap font-mono text-[11px]">
                  {file.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
