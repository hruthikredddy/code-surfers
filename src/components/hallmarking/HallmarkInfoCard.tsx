import { ShieldCheck, Award, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';

export function HallmarkInfoCard() {
  const PURITY_GRADES = [
    { karat: '24K', fineness: '995', purityPct: '99.5% Pure Gold', desc: 'Bullion, coins, minted bars & medals (Fine Gold)' },
    { karat: '23K', fineness: '958', purityPct: '95.8% Pure Gold', desc: 'Specialized traditional artisanal jewellery' },
    { karat: '22K', fineness: '916', purityPct: '91.6% Pure Gold', desc: 'Most popular Indian bridal, temple & daily jewellery' },
    { karat: '20K', fineness: '833', purityPct: '83.3% Pure Gold', desc: 'Intricate studded gold ornaments & settings' },
    { karat: '18K', fineness: '750', purityPct: '75.0% Pure Gold', desc: 'Diamond, gemstone & contemporary modern jewellery' },
    { karat: '14K', fineness: '585', purityPct: '58.5% Pure Gold', desc: 'Lightweight daily wear fashion jewellery' }
  ];

  const SILVER_GRADES = [
    { grade: '990', purityPct: '99.0% Fine Silver', application: 'Silver coins, bars, and presentation medals' },
    { grade: '925', purityPct: '92.5% Sterling Silver', application: 'Standard high-grade jewellery, utensils & silverware' },
    { grade: '900', purityPct: '90.0% Commercial Silver', application: 'Traditional jewellery and decorative artefacts' },
    { grade: '835', purityPct: '83.5% Alloyed Silver', application: 'Daily tableware and cutlery' },
    { grade: '800', purityPct: '80.0% Structural Silver', application: 'Heavy ornaments and statues' }
  ];

  return (
    <div className="space-y-5">
      {/* The 3 Mandatory Marks Card */}
      <div id="mandatory-marks" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#F5C451]" />
            <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
              The 3 Mandatory Marks on Authentic Gold Jewellery
            </h3>
          </div>
          <span className="rounded-md bg-[#292F22] px-2.5 py-0.5 text-[10.5px] font-bold text-[#F5C451] border border-[#F5C451]/20">
            IS 1417:2016
          </span>
        </div>
        <p className="text-xs text-[#C0C7B7] mb-4 leading-relaxed">
          Since the revised BIS Hallmarking notification, authentic gold jewellery must carry ONLY these 3 laser-inscribed marks. Old jeweller monograms or standalone stamps are illegal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 shadow-2xs flex flex-col justify-between hover:border-[#F5C451]/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C451] text-[#10150F] font-bold text-[10px] shrink-0">
                  1
                </span>
                <strong className="text-[#F1F4EA] font-bold text-xs sm:text-sm">BIS Standard Mark</strong>
              </div>
              <p className="text-[#C0C7B7] text-[11px] leading-relaxed">
                Official triangular logo representing the Bureau of Indian Standards, confirming statutory conformity to Indian Standard IS 1417.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(210,230,190,0.08)] text-[10px] text-[#858D7D] font-mono">
              Mark: BIS Triangle Logo
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 shadow-2xs flex flex-col justify-between hover:border-[#F5C451]/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C451] text-[#10150F] font-bold text-[10px] shrink-0">
                  2
                </span>
                <strong className="text-[#F1F4EA] font-bold text-xs sm:text-sm">Purity / Fineness Grade</strong>
              </div>
              <p className="text-[#C0C7B7] text-[11px] leading-relaxed">
                Indicates both Karatage and parts-per-thousand fineness, e.g. <strong className="text-[#F5C451]">22K916</strong> (91.6% pure gold) or <strong className="text-[#F5C451]">18K750</strong> (75.0% pure gold).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(210,230,190,0.08)] text-[10px] text-[#858D7D] font-mono">
              Mark: 24K995, 22K916, 18K750...
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 shadow-2xs flex flex-col justify-between hover:border-[#F5C451]/30 hover:-translate-y-0.5 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C451] text-[#10150F] font-bold text-[10px] shrink-0">
                  3
                </span>
                <strong className="text-[#F1F4EA] font-bold text-xs sm:text-sm">6-Digit HUID Code</strong>
              </div>
              <p className="text-[#C0C7B7] text-[11px] leading-relaxed">
                Completely unique laser alphanumeric code (e.g. <strong className="text-[#F5C451]">AB12CD</strong>) assigned by the central BIS server for digital traceability and verification.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(210,230,190,0.08)] text-[10px] text-[#858D7D] font-mono">
              Mark: 6 Alphanumeric Chars
            </div>
          </div>
        </div>
      </div>

      {/* Recognized Purity Grades Table */}
      <div id="purity-standards" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B8F23D]" />
            <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
              Official Karatage & Fineness Purity Standards (IS 1417:2016)
            </h3>
          </div>
          <span className="rounded bg-[#292F22] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#F5C451] border border-[#F5C451]/20">
            What does 916 mean?
          </span>
        </div>
        <p className="text-xs text-[#C0C7B7] mb-3 leading-relaxed">
          "916" indicates 916 parts of pure gold out of 1000 (91.6% purity), historically known as 22 Karat gold (22/24 = 91.67%). Pure 24 Karat gold is 995 parts per thousand.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#10150F]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(210,230,190,0.10)] bg-[#22291C] text-[#C0C7B7] font-semibold">
                <th className="py-2.5 px-3">Karatage</th>
                <th className="py-2.5 px-3">Fineness Mark</th>
                <th className="py-2.5 px-3">Pure Gold Content</th>
                <th className="py-2.5 px-3">Standard Usage & Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(210,230,190,0.06)] text-[#F1F4EA]">
              {PURITY_GRADES.map((g) => (
                <tr key={g.karat} className="hover:bg-[#292F22]/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#F5C451]">{g.karat}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#F1F4EA]">
                    <span className="bg-[#22291C] border border-[rgba(210,230,190,0.12)] px-2 py-0.5 rounded text-[11px]">
                      {g.karat}{g.fineness}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#B8F23D]">{g.purityPct}</td>
                  <td className="py-2.5 px-3 text-[#C0C7B7] text-[11px]">{g.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Silver Hallmarking Summary */}
        <div className="mt-4 pt-4 border-t border-[rgba(210,230,190,0.08)]">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-xs font-bold text-[#F1F4EA] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#C0C7B7]" />
              Silver Jewellery & Artefacts Hallmarking (IS 2112:2014)
            </span>
            <span className="text-[10.5px] text-[#858D7D] font-mono">Voluntary Scheme • Titration (IS 2113)</span>
          </div>
          <p className="text-[11px] text-[#858D7D] mb-3 leading-relaxed">
            Silver hallmarking is governed under IS 2112:2014. Hallmarked silver carries: (1) BIS Logo, (2) Purity Grade, (3) AHC Identification Mark, and (4) Jeweller Identification Mark.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {SILVER_GRADES.map((sg) => (
              <div key={sg.grade} className="rounded-lg border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-2.5 text-center">
                <div className="font-mono font-bold text-[#F1F4EA] text-xs">{sg.grade}</div>
                <div className="text-[10px] text-[#B8F23D] font-semibold">{sg.purityPct}</div>
                <div className="text-[9.5px] text-[#858D7D] mt-1 line-clamp-2 leading-tight">{sg.application}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Districts & Legal Enforcement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-4 text-xs space-y-2 shadow-2xs hover:border-[rgba(210,230,190,0.20)] transition-all">
          <div className="flex items-center gap-1.5 font-bold text-[#F1F4EA]">
            <Info className="h-4 w-4 text-[#B8F23D]" />
            <span>Phased Mandatory Coverage across 343+ Districts</span>
          </div>
          <p className="text-[11px] text-[#C0C7B7] leading-relaxed">
            Mandatory hallmarking has been rolled out across 343+ districts in India where at least one Assaying & Hallmarking Centre is active. In these districts, jewellers are legally barred from selling non-hallmarked gold articles of 14, 18, 20, 22, 23, or 24K.
          </p>
          <div className="text-[10px] text-[#858D7D]">
            Exemptions: Articles under 2 grams, export consignments, medical items, and industrial bullion.
          </div>
        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs space-y-2 shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-red-200">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span>Penalties for Deceptive Markings (Section 29)</span>
          </div>
          <p className="text-[11px] text-red-300 leading-relaxed">
            Selling un-hallmarked or fake-hallmarked gold in notified districts is punishable under Section 29 of the BIS Act, 2016 with a minimum fine of ₹1,00,000 up to five times the value of the article, or imprisonment up to 1 year.
          </p>
          <div className="text-[10px] text-red-400/80">
            Statutory enforcement managed by BIS Enforcement Officers & State Consumer Forums.
          </div>
        </div>
      </div>
    </div>
  );
}
