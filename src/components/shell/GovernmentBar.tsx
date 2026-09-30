import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export function GovernmentBar() {
  const { t } = useLanguage();

  return (
    <div
      role="banner"
      aria-label="Government of India & BIS Institutional Banner"
      className="shrink-0 bg-[#2A3328] border-b border-[rgba(170,167,133,0.18)] px-3 sm:px-5 py-1 text-[11px] text-[#E1E1D5] flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 select-none leading-normal transition-colors"
    >
      {/* Left side: Official Authority */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-[#FDFDF5] tracking-wide text-[10.5px] uppercase">
          {t('header.goi', 'GOVERNMENT OF INDIA')}
        </span>
        <span className="text-[#AAA785] font-light" aria-hidden="true">
          |
        </span>
        <span className="text-[#E1E1D5] tracking-wide text-[10.5px] uppercase font-medium">
          {t('header.bis', 'BUREAU OF INDIAN STANDARDS (BIS)')}
        </span>
      </div>

      {/* Right side: Verification Accent & Headquarter Context */}
      <div className="flex items-center gap-2 text-[#AAA785] text-[10.5px]">
        <span className="inline-flex items-center gap-1 text-[#E1E1D5] font-medium">
          <ShieldCheck className="h-3 w-3 text-[#AAA785] shrink-0" aria-hidden="true" />
          <span>{t('header.demoNotice', 'Verified BIS Standards')}</span>
        </span>
        <span className="text-[rgba(170,167,133,0.3)]" aria-hidden="true">
          •
        </span>
        <span className="text-[#AAA785] hidden xs:inline">
          {t('header.manakBhawan', 'Manak Bhawan, New Delhi')}
        </span>
      </div>
    </div>
  );
}
