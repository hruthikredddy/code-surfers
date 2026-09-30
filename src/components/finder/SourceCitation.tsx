import { ExternalLink, ShieldCheck } from 'lucide-react';

interface SourceCitationProps {
  title: string;
  url: string;
  sourceName?: string;
  relevanceNote?: string;
}

export function SourceCitation({
  title,
  url,
  sourceName = 'Bureau of Indian Standards',
  relevanceNote
}: SourceCitationProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/70 p-2.5 text-xs text-[#E1E1D5]">
      <ShieldCheck className="h-4 w-4 shrink-0 text-[#AAA785] mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#FDFDF5] truncate">{title}</span>
          <span className="rounded bg-[#31362E] px-1.5 py-0.2 text-[10px] font-medium text-[#E1E1D5]">
            {sourceName}
          </span>
        </div>
        {relevanceNote && (
          <p className="mt-0.5 text-[11px] text-[#E1E1D5] leading-relaxed">
            {relevanceNote}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 font-medium text-[#AAA785] hover:text-[#FDFDF5] hover:underline"
        >
          <span>Verify on official BIS portal</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
