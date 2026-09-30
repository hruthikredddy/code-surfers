import { ArrowRight, CheckCircle2, ShieldCheck, Flame, Cpu, Smartphone } from 'lucide-react';

interface ProcessStepItem {
  stepNumber: number;
  title: string;
  subhead: string;
  description: string;
  icon: typeof ShieldCheck;
  standard: string;
}

const HALLMARKING_STEPS: ProcessStepItem[] = [
  {
    stepNumber: 1,
    title: 'Article Reception & Homogeneity',
    subhead: 'Registration & Sampling',
    description: 'Jeweller registers on Manakonline and submits gold/silver articles to a BIS recognized Assaying & Hallmarking Centre (AHC). The AHC weighs and inspects the lot for homogeneity.',
    icon: ShieldCheck,
    standard: 'IS 1417:2016'
  },
  {
    stepNumber: 2,
    title: 'Assaying & Purity Testing',
    subhead: 'Fire Assay & XRF Spectrometry',
    description: 'Non-destructive preliminary XRF screening is followed by fire assay cupellation (IS 1418), the statutory referee method to determine precious metal content down to 0.1 parts per thousand.',
    icon: Flame,
    standard: 'IS 1418 / IS 2113'
  },
  {
    stepNumber: 3,
    title: 'HUID Allocation on Central BIS Server',
    subhead: 'Central Secure Generation',
    description: 'Upon passing purity limits, the AHC submits test certificates to the secure BIS portal, which dynamically generates a completely unique 6-digit alphanumeric Hallmark Unique Identification (HUID).',
    icon: Cpu,
    standard: 'BIS Hallmarking Regs 2018'
  },
  {
    stepNumber: 4,
    title: 'Laser Engraving of 3 Marks',
    subhead: 'Triangular Logo, Fineness & HUID',
    description: 'The AHC micro-lasers the 3 mandatory marks onto each article: (1) BIS Logo, (2) Purity Grade (e.g. 22K916), and (3) 6-digit HUID code (e.g. AB12CD).',
    icon: CheckCircle2,
    standard: 'IS 1417 Clause 6'
  },
  {
    stepNumber: 5,
    title: 'Consumer Verification on BIS Care App',
    subhead: 'End-to-End Purity Confirmation',
    description: 'Buyer inspects the 6-digit HUID on the jewellery, enters it into the official "BIS Care App" on mobile, and confirms jeweller registration, AHC name, article type, purity, and hallmarking date.',
    icon: Smartphone,
    standard: 'BIS Care Portal'
  }
];

export function HallmarkProcess() {
  return (
    <div id="hallmarking-process" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5C451] bg-[#292F22] px-2.5 py-0.5 rounded border border-[#F5C451]/20">
          Official 5-Stage Lifecycle
        </span>
        <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA] mt-1.5">
          The Statutory Gold Hallmarking Process
        </h3>
        <p className="text-xs text-[#C0C7B7] mt-0.5">
          Step-by-step regulatory journey from manufacturing to laser engraving and public verification
        </p>
      </div>

      <div className="relative space-y-4 before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-[rgba(210,230,190,0.10)] hidden md:block">
        {HALLMARKING_STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.stepNumber} className="relative flex items-start gap-4 pl-12">
              <div className="absolute left-2.5 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5C451] text-[#10150F] text-xs font-bold ring-4 ring-[#1A2016]">
                {step.stepNumber}
              </div>
              <div className="flex-1 rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 hover:border-[rgba(184,242,61,0.25)] hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#F5C451]" />
                    <span className="font-bold text-[#F1F4EA] text-xs sm:text-sm">
                      {step.title}
                    </span>
                    <span className="text-[11px] text-[#858D7D] hidden sm:inline">
                      ({step.subhead})
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-[#858D7D] bg-[#10150F] border border-[rgba(210,230,190,0.10)] px-2 py-0.5 rounded">
                    {step.standard}
                  </span>
                </div>
                <p className="text-xs text-[#C0C7B7] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile view of steps */}
      <div className="space-y-3 md:hidden">
        {HALLMARKING_STEPS.map((step) => (
          <div
            key={step.stepNumber}
            className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-3.5 text-xs"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C451] text-[#10150F] font-bold text-[10px]">
                {step.stepNumber}
              </span>
              <strong className="text-[#F1F4EA]">{step.title}</strong>
            </div>
            <p className="text-[#C0C7B7] leading-relaxed text-[11px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
