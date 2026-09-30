import { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Languages,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { TESTING_QA_ITEMS } from '../../data/testingIntelligenceData.ts';
import { TestingQAPair } from '../../types/index.ts';

interface TestingQATabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function TestingQATab({ onQueryAssistant }: TestingQATabProps) {
  const [expandedQaId, setExpandedQaId] = useState<string | null>('qa-test-2');
  const [activeLang, setActiveLang] = useState<'en' | 'hi'>('en');

  const multilingualPrompts = [
    {
      label: 'Stainless Steel Bottle Tests (IS 17803)',
      hindi: 'स्टेनलेस स्टील बोतल के लिए कौन से टेस्ट जरूरी हैं?',
      prompt: 'What tests are mandatory for stainless steel water bottles under IS 17803:2022 and how do I perform the migration test?'
    },
    {
      label: 'Locate Nearest BIS Lab',
      hindi: 'नजदीकी BIS मान्यता प्राप्त लैब कहाँ है?',
      prompt: 'Which BIS recognized laboratories near Delhi and Mumbai have accredited test benches for IS 17803?'
    },
    {
      label: 'Factory In-House Test Bench Setup',
      hindi: 'फैक्ट्री इन-हाउस टेस्टिंग लैब कैसे सेटअप करें?',
      prompt: 'What equipment is required to set up an in-house laboratory for stainless steel bottles under the BIS Scheme of Testing and Inspection?'
    },
    {
      label: 'Sample Failure Protocol & CAPA',
      hindi: 'सैंपल फेल होने पर क्या प्रक्रिया होती है?',
      prompt: 'What happens if a product sample fails during laboratory testing, and how to file a CAPA response with BIS?'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                11 & 12. Multilingual Testing Assistant & Q&A
              </span>
              <span className="rounded bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5">
                Regulatory Evidence & Traceability
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Testing Knowledge Base & Multilingual Assistant
            </h3>
            <p className="text-xs text-slate-600">
              Clear, grounded answers with statutory citations covering laboratory requirements, failure handling protocols, and STI clauses.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Languages className="h-3.5 w-3.5" />
              <span>Language:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveLang('en')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                activeLang === 'en'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveLang('hi')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                activeLang === 'hi'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Multilingual Quick Prompts */}
        <div className="pt-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Frequently Asked Testing Queries (Click to Ask Assistant):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {multilingualPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onQueryAssistant(item.prompt)}
                className="flex items-start justify-between gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/60 hover:border-emerald-300 text-left transition-all cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    {activeLang === 'hi' ? item.hindi : item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.prompt}</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Authoritative Testing Answers & Clause Interpretations
        </h4>

        {TESTING_QA_ITEMS.map((item) => {
          const isExpanded = expandedQaId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'border-emerald-300 bg-white shadow-xs ring-1 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div
                onClick={() => setExpandedQaId(isExpanded ? null : item.id)}
                className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-2">
                      {item.category}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 inline">
                      {activeLang === 'hi' && item.hindi_question ? item.hindi_question : item.question}
                    </h5>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-3 text-xs">
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {item.answer}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>
                        <strong className="text-slate-700">10. Evidence & Traceability:</strong>{' '}
                        {item.authoritative_source}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onQueryAssistant(
                          `Elaborate on the regulatory basis of: ${item.question}\nReference: ${item.authoritative_source}`
                        )
                      }
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>Ask Follow-up in Chat</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
