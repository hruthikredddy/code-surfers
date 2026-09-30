import { useState } from 'react';
import { HallmarkSearch } from './HallmarkSearch.tsx';
import { HallmarkInfoCard } from './HallmarkInfoCard.tsx';
import { HUIDVerification } from './HUIDVerification.tsx';
import { HallmarkProcess } from './HallmarkProcess.tsx';
import { HallmarkDetails } from './HallmarkDetails.tsx';
import { ContextualMiniBrain } from '../minibrain/ContextualMiniBrain.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  ArrowLeft,
  Award,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Flame,
  FlaskConical,
  Smartphone,
  ArrowRight
} from 'lucide-react';

interface HallmarkingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  onOpenLabFinder?: () => void;
  initialTopic?: string;
}

const CONSUMER_FAQS = [
  {
    q: 'What should I do if the HUID on my jewellery does not match my purchase bill or invoice?',
    a: 'Do not finalize the transaction. Under the Consumer Protection (Hallmarking) Rules, a jeweller cannot sell jewellery where the invoice description and purity do not match the physical HUID. If already purchased, immediately lodge a complaint through the BIS Care App. You are legally entitled to a full replacement or refund plus statutory compensation under Section 49 of the BIS Act, 2016.',
    prompt: 'What are my consumer rights and compensation if a jeweller sells gold with a mismatched or fake HUID?'
  },
  {
    q: 'Can a retail jeweller charge extra or separate arbitrary fees for hallmarking?',
    a: 'No. Hallmarking charges are statutory and strictly capped by the Government of India at ₹45 per article for gold and ₹35 per article for silver. Retail jewellers cannot levy arbitrary or inflated hallmarking charges on consumers.',
    prompt: 'What are the official maximum statutory hallmarking fees permitted by BIS for gold and silver jewellery?'
  },
  {
    q: 'Which gold jewellery items are legally exempt from mandatory hallmarking?',
    a: 'Articles weighing less than 2.0 grams, export consignments complying with foreign buyer specifications, international gold exhibitions, and industrial/medical gold are exempt from mandatory hallmarking under current Central Government notifications.',
    prompt: 'What items of gold jewellery are exempt from mandatory hallmarking under BIS regulations?'
  },
  {
    q: 'How can an individual consumer get old family gold tested for genuine purity?',
    a: 'Any citizen can walk into any BIS-recognized Assaying & Hallmarking Centre (AHC) across India with their personal jewellery. By paying the nominal statutory testing fee of ₹45 per gold article, the AHC will assay the metal using fire assay and issue an authentic government test report.',
    prompt: 'How can an individual consumer get old family gold tested at an Assaying and Hallmarking Centre (AHC)?'
  }
];

export function HallmarkingAssistant({
  isOpen,
  onClose,
  onQueryAssistant,
  onOpenLabFinder,
  initialTopic = 'mandatory-marks'
}: HallmarkingAssistantProps) {
  const { t } = useLanguage();
  const [activeAction, setActiveAction] = useState<string>(initialTopic);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalTopic, setModalTopic] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickAction = (actionId: string) => {
    setActiveAction(actionId);
    const element = document.getElementById(actionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchSubmit = (q: string) => {
    if (!q.trim()) return;
    // Pass query directly to AI assistant
    onQueryAssistant(`Regarding BIS Gold Hallmarking & HUID: ${q}`);
  };

  return (
    <div
      id="hallmarking-assistant-panel"
      aria-label="Hallmarking Assistant Workspace"
      className="fixed inset-0 z-50 flex flex-col min-h-full min-h-[100dvh] w-full bg-[#10150F] text-[#F1F4EA] overflow-y-auto animate-in fade-in duration-150"
    >
      {/* 1. Top Workspace Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[rgba(210,230,190,0.10)] bg-[#171C13]/95 backdrop-blur-md px-4 sm:px-6 py-2.5 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors cursor-pointer shadow-2xs shrink-0"
            title={t('copilot.backToChat', 'Back to chat')}
            aria-label={t('copilot.backToChat', 'Back to chat')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[rgba(210,230,190,0.10)]" />

          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#F5C451] hidden sm:inline" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#F1F4EA] leading-snug">
                  Hallmarking Assistant
                </h2>
                <span className="rounded bg-[#292F22] px-2 py-0.5 text-[10px] font-bold text-[#F5C451] border border-[#F5C451]/30">
                  HUID VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[#858D7D] font-normal leading-normal hidden sm:block">
                Authoritative guidance on gold & silver hallmarking, 6-digit HUID tracking, purity grades & AHC centres
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.bis.gov.in/hallmarking-overview/?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] px-2.5 py-1.5 text-[11px] font-medium text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors"
          >
            <span>Live Hallmarking Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 w-full min-h-0 p-4 sm:p-6 lg:p-8 pb-28 sm:pb-32">
        <div className="mx-auto max-w-5xl space-y-6 pb-8">
          {/* 1. Prominent Search and Quick Actions Bar (Overview) */}
          <HallmarkSearch
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearch={handleSearchSubmit}
            onQuickAction={handleQuickAction}
            activeQuickAction={activeAction}
          />

          {/* 2 & 4. Understand Hallmark & 3 Mandatory Marks + Purity Standards */}
          <HallmarkInfoCard />

          {/* 3. Interactive HUID Verification */}
          <HUIDVerification />

          {/* 5. Statutory 5-Stage Hallmarking Process */}
          <HallmarkProcess />

          {/* 6. Jeweller Registration & Compliance Section */}
          <div id="jeweller-registration" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#F5C451]" />
                <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
                  Jeweller BIS Registration & Regulatory Compliance
                </h3>
              </div>
              <span className="rounded bg-[#292F22] px-2.5 py-0.5 text-[10px] font-bold text-[#B8F23D] border border-[rgba(210,230,190,0.12)]">
                ZERO STATUTORY FEE
              </span>
            </div>
            <p className="text-xs text-[#C0C7B7] leading-relaxed">
              Under the Government of India's Ease of Doing Business mandate, statutory BIS registration for gold and silver jewellers is 100% free of charge and granted with lifetime validity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 space-y-2">
                <span className="font-bold text-[#F1F4EA] flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#B8F23D]" />
                  4-Step Digital Registration on Manakonline:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[#C0C7B7] text-[11px] leading-relaxed">
                  <li>Log onto the official portal: <strong className="text-[#F1F4EA]">manakonline.in</strong>.</li>
                  <li>Click on "Hallmarking" and select "Register as Jeweller".</li>
                  <li>Submit Firm Details (GSTIN or Udyam Aadhar), PAN card, and outlet address proof.</li>
                  <li>Instant electronic issuance of the statutory Certificate of Registration.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 space-y-2">
                <span className="font-bold text-[#F1F4EA] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#F5C451]" />
                  Mandatory Retail Counter Obligations:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#C0C7B7] text-[11px] leading-relaxed">
                  <li><strong className="text-[#F1F4EA]">Prominent Certificate Display:</strong> Registration certificate must be visibly framed at the retail entrance or billing desk.</li>
                  <li><strong className="text-[#F1F4EA]">10X Magnifying Glass:</strong> Jewellers must keep a clean magnifying lens (min. 10X) accessible to all customers to inspect the 6-digit HUID.</li>
                  <li><strong className="text-[#F1F4EA]">HUID on Invoices:</strong> Every jewellery invoice must specify the individual HUID and exact Karatage of each purchased item.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5C451] px-3.5 py-1.5 text-xs font-bold text-[#10150F] hover:bg-[#FADB6A] transition-colors"
                >
                  <span>Open Manakonline Registration</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => onQueryAssistant('What are the exact step-by-step registration requirements and documents needed for a jeweller to register with BIS on Manakonline?')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] px-3 py-1.5 text-xs font-medium text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#B8F23D]" />
                  <span>Ask AI about Jeweller Registration</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setModalTopic('registration')}
                className="text-xs text-[#858D7D] hover:text-[#F1F4EA] transition-colors cursor-pointer underline underline-offset-2"
              >
                View Regulatory Norms
              </button>
            </div>
          </div>

          {/* 7. Assaying & Hallmarking Centres (AHC) Section */}
          <div id="assaying-centres" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#B8F23D]" />
                <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
                  Assaying & Hallmarking Centres (AHC) Network & Facilities
                </h3>
              </div>
              <span className="rounded bg-[#292F22] px-2.5 py-0.5 text-[10px] font-bold text-[#B8F23D] border border-[rgba(210,230,190,0.12)]">
                IS 15820 ACCREDITED
              </span>
            </div>
            <p className="text-xs text-[#C0C7B7] leading-relaxed">
              BIS operates a nationwide network of over 1,500+ recognized Assaying & Hallmarking Centres (AHCs) and Off-site Collection Centres (OSCs). These are independent third-party laboratories responsible for testing precious metal purity before laser engraving.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 space-y-2">
                <span className="font-bold text-[#F1F4EA] flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-[#F5C451]" />
                  Mandatory Testing Equipment under IS 15820:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#C0C7B7] text-[11px] leading-relaxed">
                  <li><strong className="text-[#F1F4EA]">Fire Assay Cupellation Furnace:</strong> Operates at 1050°C conforming to IS 1418 to measure gold purity down to 0.1 parts per thousand.</li>
                  <li><strong className="text-[#F1F4EA]">Precision Microbalance:</strong> Ultra-sensitive balance with accuracy of 0.001 mg (1 microgram).</li>
                  <li><strong className="text-[#F1F4EA]">X-Ray Fluorescence (XRF) Spectrometer:</strong> Fast non-destructive elemental mapping across gold alloys.</li>
                  <li><strong className="text-[#F1F4EA]">Micro-Laser Marking Unit:</strong> Class-1 safe enclosure laser unit for inscribing the 3 marks and 6-digit HUID.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-[rgba(184,242,61,0.20)] bg-[#26351D]/40 p-4 space-y-2">
                <span className="font-bold text-[#B8F23D] flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#B8F23D]" />
                  Personal Jewellery Testing for Consumers:
                </span>
                <p className="text-[11px] text-[#C0C7B7] leading-relaxed">
                  Any consumer can take their personal, family, or unhallmarked gold jewellery to any BIS-recognized Assaying & Hallmarking Centre across India to test its genuine purity.
                </p>
                <div className="p-2.5 rounded-lg bg-[#10150F] border border-[rgba(210,230,190,0.08)] text-[11px] space-y-1">
                  <div className="flex justify-between text-[#F1F4EA]">
                    <span>Statutory Testing Fee (Gold):</span>
                    <strong className="text-[#F5C451]">₹45 per article</strong>
                  </div>
                  <div className="flex justify-between text-[#F1F4EA]">
                    <span>Statutory Testing Fee (Silver):</span>
                    <strong className="text-[#C0C7B7]">₹35 per article</strong>
                  </div>
                  <p className="text-[10px] text-[#858D7D] pt-0.5">
                    The AHC issues an official assay test report detailing the exact Karatage and fineness.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                {onOpenLabFinder && (
                  <button
                    type="button"
                    onClick={onOpenLabFinder}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#B8F23D] px-3.5 py-1.5 text-xs font-bold text-[#10150F] hover:bg-[#C8FF52] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Open Laboratory Finder</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
                <a
                  href="https://www.bis.gov.in/hallmarking-overview/?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] px-3 py-1.5 text-xs font-medium text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors"
                >
                  <span>View BIS AHC Directory</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => onQueryAssistant('How do I find a BIS recognized Assaying and Hallmarking Centre (AHC) in my district and how can I get my family jewellery tested?')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] px-3 py-1.5 text-xs font-medium text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#B8F23D]" />
                  <span>Ask AI about AHC Facilities</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setModalTopic('centres')}
                className="text-xs text-[#858D7D] hover:text-[#F1F4EA] transition-colors cursor-pointer underline underline-offset-2"
              >
                View Equipment Norms
              </button>
            </div>
          </div>

          {/* 8. Consumer Guidance & FAQ */}
          <div id="consumer-guidance" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#F5C451]" />
                <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
                  Consumer Guidance & Frequently Asked Questions
                </h3>
              </div>
              <span className="rounded bg-[#292F22] px-2.5 py-0.5 text-[10px] font-bold text-[#F5C451] border border-[#F5C451]/20">
                CONSUMER PROTECTION
              </span>
            </div>
            <p className="text-xs text-[#C0C7B7] leading-relaxed">
              Important consumer advisory regarding your rights under the Bureau of Indian Standards Act, 2016 and the Central Consumer Protection Authority.
            </p>

            <div className="space-y-3">
              {CONSUMER_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 text-xs transition-all duration-200 hover:border-[rgba(210,230,190,0.18)]"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <strong className="text-[#F1F4EA] text-xs sm:text-sm font-semibold">
                      {faq.q}
                    </strong>
                    <button
                      type="button"
                      onClick={() => onQueryAssistant(faq.prompt)}
                      className="inline-flex items-center gap-1 rounded bg-[#292F22] px-2 py-1 text-[11px] text-[#B8F23D] hover:bg-[#343B2B] transition-colors cursor-pointer shrink-0 font-medium"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                  <p className="text-[#C0C7B7] leading-relaxed text-[11px]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(210,230,190,0.08)]">
              <div className="text-[11px] text-[#858D7D]">
                Have an unresolved grievance or suspect counterfeit hallmarking?
              </div>
              <a
                href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/complaints"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#20271B] px-3 py-1.5 text-xs font-semibold text-[#FF6B6B] hover:border-red-500/40 hover:bg-red-500/10 transition-colors"
              >
                <span>Lodge Formal Grievance with BIS</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* 9. Common Regulatory Citations Card */}
          <div id="regulatory-citations" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-[#F1F4EA] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#B8F23D]" />
                <span>Statutory Evidence & Regulatory Orders</span>
              </h4>
              <span className="text-[10px] text-[#858D7D] font-mono">Government Gazette & Standards</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-3.5 text-xs">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#B8F23D] mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-[#F1F4EA]">IS 1417:2016 — Gold Purity & Hallmarking Specification</span>
                    <span className="rounded bg-[#292F22] px-1.5 py-0.2 text-[10px] font-medium text-[#F5C451]">Bureau of Indian Standards</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#C0C7B7] leading-relaxed">
                    National standard specifying recognized fineness grades (24K, 22K916, 20K, 18K750, 14K) and mandatory 3 marks.
                  </p>
                  <a
                    href="https://standards.bis.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-medium text-[#B8F23D] hover:underline text-xs"
                  >
                    <span>Verify on standards.bis.gov.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-3.5 text-xs">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#B8F23D] mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-[#F1F4EA]">BIS Official Hallmarking Portal & Notified Districts List</span>
                    <span className="rounded bg-[#292F22] px-1.5 py-0.2 text-[10px] font-medium text-[#F5C451]">Dept of Consumer Affairs</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#C0C7B7] leading-relaxed">
                    Directory of 343+ mandatory districts, statutory gazette notifications, and consumer compensation mechanisms.
                  </p>
                  <a
                    href="https://www.bis.gov.in/hallmarking-overview/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-medium text-[#B8F23D] hover:underline text-xs"
                  >
                    <span>Open bis.gov.in Hallmarking Directory</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal for Registration and Centres */}
      <HallmarkDetails
        isOpen={Boolean(modalTopic)}
        topicId={modalTopic || ''}
        onClose={() => setModalTopic(null)}
        onOpenLabFinder={onOpenLabFinder}
      />

      {/* Lightweight Contextual Mini-Brain for Hallmarking */}
      <ContextualMiniBrain
        capability="HALLMARKING"
        context={{
          currentPage: 'Hallmarking Assistant',
          activeAction,
          searchQuery
        }}
      />
    </div>
  );
}
