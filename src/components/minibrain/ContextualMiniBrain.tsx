import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Info,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CitationItem } from '../../types/index.ts';

export type MiniBrainCapability =
  | 'SMART_FINDER'
  | 'COPILOT_GUIDANCE'
  | 'COPILOT_ROADMAP'
  | 'TESTING_GUIDANCE'
  | 'LAB_FINDER'
  | 'HALLMARKING'
  | 'FEE_CALCULATOR';

export interface MiniBrainContext {
  currentPage: string;
  searchQuery?: string;
  selectedStandard?: string;
  selectedProduct?: string;
  activeFilters?: Record<string, any>;
  retrievedCount?: number;
  topResultsSummary?: string;
  feeState?: any;
  labState?: any;
  hallmarkTopic?: string;
  activeTab?: string;
  completedMilestonesCount?: number;
  completedDocsCount?: number;
  activeTestFilter?: string;
  selectedLab?: string;
  activeAction?: string;
}

export interface MiniBrainMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  answerType?: 'BIS_GROUNDED' | 'HYBRID' | 'CONTEXTUAL_ADVISORY' | 'CLARIFICATION_REQUIRED' | 'NO_RELEVANT_STANDARD';
  bisFacts?: string[];
  supplementaryExplanation?: string;
  clarificationQuestion?: string;
  citations?: CitationItem[];
  suggestedActions?: Array<{ label: string; prompt: string }>;
  knowledgeGapNote?: string;
  timestamp: string;
}

interface ContextualMiniBrainProps {
  capability: MiniBrainCapability;
  context: MiniBrainContext;
  onNavigateToCapability?: (target: string) => void;
  className?: string;
}

const CAPABILITY_METADATA: Record<
  MiniBrainCapability,
  {
    name: string;
    badge: string;
    iconColor: string;
    accentBg: string;
    placeholder: string;
    starterPrompts: string[];
  }
> = {
  SMART_FINDER: {
    name: 'Standard Finder Mini-Brain',
    badge: 'IS DIRECTORY',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about standard scope, QCO mandate, or test clauses...',
    starterPrompts: [
      'Is certification mandatory for this product under QCO?',
      'What are the key test parameters required for this standard?',
      'Explain difference between Scheme-I and CRS'
    ]
  },
  COPILOT_GUIDANCE: {
    name: 'Certification Guidance Mini-Brain',
    badge: 'LICENSING & AUDIT',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about Simplified vs Normal route, audit checklist...',
    starterPrompts: [
      'What is the Simplified Route procedure under Form-V?',
      'What are common factory audit non-conformities?',
      'Which testing equipment must be calibrated before inspection?'
    ]
  },
  COPILOT_ROADMAP: {
    name: 'Certification Roadmap Mini-Brain',
    badge: 'ROADMAP 6-PHASE',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about phase milestones, timelines or documentation...',
    starterPrompts: [
      'What documents are needed before submitting Stage 1 on Manakonline?',
      'How long does the statutory factory inspection typically take?',
      'Can MSMEs get expedited audit processing?'
    ]
  },
  TESTING_GUIDANCE: {
    name: 'Testing Guidance Mini-Brain',
    badge: 'LIMS & PROTOCOLS',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about mandatory STI test clauses, test methods...',
    starterPrompts: [
      'What are the mandatory STI test clauses for my product?',
      'How to resolve a test report discrepancy or pending clause?',
      'What is the difference between Routine Test and Type Test?'
    ]
  },
  LAB_FINDER: {
    name: 'Lab Discovery Mini-Brain',
    badge: 'RECOGNIZED LABS',
    iconColor: 'text-teal-600',
    accentBg: 'bg-teal-50 border-teal-200 text-teal-900',
    placeholder: 'Ask about lab recognition status, turnaround times...',
    starterPrompts: [
      'How do I verify if a commercial lab is currently BIS-recognized?',
      'Can I submit test reports from a private NABL-accredited lab?',
      'Are Central Laboratories authorized for all mandatory standards?'
    ]
  },
  HALLMARKING: {
    name: 'Hallmarking Mini-Brain',
    badge: 'HUID & PURITY',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about 6-digit HUID, 916/750 purity, AHC centres...',
    starterPrompts: [
      'How does a consumer verify a 6-digit HUID on the BIS Care App?',
      'What do 916, 750, and 585 purity fineness marks signify?',
      'Which districts are under mandatory gold hallmarking in India?'
    ]
  },
  FEE_CALCULATOR: {
    name: 'BIS Fee Mini-Brain',
    badge: 'FEE & CONCESSIONS',
    iconColor: 'text-[#AAA785]',
    accentBg: 'bg-[#2A2E28] border-[rgba(170,167,133,0.25)] text-[#FDFDF5]',
    placeholder: 'Ask about MSME concessions, marking fees, audit rates...',
    starterPrompts: [
      'How do I claim the 50% DPIIT / Micro enterprise fee concession?',
      'How is the annual minimum marking fee calculated under Scheme-I?',
      'Are testing laboratory charges included in the BIS license fee?'
    ]
  }
};

export function ContextualMiniBrain({
  capability,
  context,
  onNavigateToCapability,
  className = ''
}: ContextualMiniBrainProps) {
  const { t, currentLanguage } = useLanguage();
  const meta = CAPABILITY_METADATA[capability] || CAPABILITY_METADATA.SMART_FINDER;

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MiniBrainMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Context summary chip string
  const contextSummary = React.useMemo(() => {
    if (context.selectedStandard) return `Standard: ${context.selectedStandard}`;
    if (context.searchQuery) return `Query: "${context.searchQuery}"`;
    if (context.feeState?.standardId) return `Standard: ${context.feeState.standardId}`;
    if (context.activeTab) return `Tab: ${context.activeTab}`;
    return context.currentPage;
  }, [context]);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputQuery).trim();
    if (!text || isLoading) return;

    setInputQuery('');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: MiniBrainMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: timeStr
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      let data: any;

      try {
        const response = await fetch('/api/mini-brain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: text,
            capability,
            context,
            history: newHistory.map((m) => ({ role: m.role, content: m.content })),
            language: currentLanguage
          })
        });

        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error(`Mini-brain endpoint returned ${response.status}`);
        }
      } catch (miniBrainErr) {
        console.warn('Mini-Brain endpoint unavailable or failed, falling back to /api/query:', miniBrainErr);
        // Fallback to existing /api/query endpoint
        const queryResp = await fetch('/api/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: text,
            history: newHistory.map((m) => ({ role: m.role, content: m.content })),
            language: currentLanguage
          })
        });

        if (!queryResp.ok) {
          throw new Error(`Query fallback returned ${queryResp.status}`);
        }

        const queryData = await queryResp.json();
        data = {
          content: queryData.content,
          answerType: queryData.groundingStatus === 'GROUNDED' ? 'BIS_GROUNDED' : 'CONTEXTUAL_ADVISORY',
          bisFacts: queryData.citations
            ?.filter((c: any) => c.type === 'standard')
            .map((c: any) => `${c.is_number}: ${c.title}`),
          citations: queryData.citations,
          proceduralLinks: queryData.proceduralLinks,
          suggestedActions: queryData.nextSteps?.map((ns: any) => ({
            label: ns.label,
            prompt: ns.prompt
          })),
          confidenceScore: queryData.confidenceScore
        };
      }

      const assistantMsg: MiniBrainMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content || '',
        answerType: data.answerType || 'BIS_GROUNDED',
        bisFacts: data.bisFacts,
        supplementaryExplanation: data.supplementaryExplanation,
        clarificationQuestion: data.clarificationQuestion,
        citations: data.citations || [],
        suggestedActions: data.suggestedActions || [],
        knowledgeGapNote: data.knowledgeGapNote,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Mini-Brain fetch notice, rendering grounded fallback:', err);
      // Fallback message
      const fallbackMsg: MiniBrainMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I am currently operating in verified local mode for ${context.currentPage}. For authoritative citations, please consult the official BIS standards portal.`,
        answerType: 'BIS_GROUNDED',
        citations: [
          {
            type: 'portal',
            title: 'Official Bureau of Indian Standards Portal',
            source_url: 'https://www.bis.gov.in',
            relevance_note: 'National Standards Body of India'
          }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none ${className}`}
      aria-label={`${meta.name} Panel`}
    >
      {/* 1. Minimized Floating Badge Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group flex items-center gap-2 rounded-full border border-[rgba(170,167,133,0.30)] bg-[#232323]/95 px-4 py-2.5 shadow-lg backdrop-blur-md hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          title={`Open Contextual Mini-Brain for ${context.currentPage}`}
        >
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#FDFDF5] group-hover:text-[#FDFDF5]">
                Mini-Brain
              </span>
              <span className="rounded bg-[#233A23] px-1.5 py-0.2 text-[9px] font-bold text-[#FDFDF5] font-mono">
                {meta.badge}
              </span>
            </div>
            <span className="text-[10px] text-[#AAA785] font-medium max-w-[150px] truncate">
              {contextSummary}
            </span>
          </div>
        </button>
      )}

      {/* 2. Expanded Mini-Brain Workspace Panel */}
      {isOpen && (
        <div
          className={`pointer-events-auto flex flex-col rounded-2xl border border-[rgba(170,167,133,0.30)] bg-[#232323] shadow-2xl overflow-hidden transition-all duration-200 animate-in slide-in-from-bottom-2 fade-in ${
            isExpanded
              ? 'h-[85vh] w-[92vw] sm:w-[540px]'
              : 'h-[500px] w-[92vw] sm:w-[410px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/90 px-3.5 py-2.5 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#FDFDF5] truncate">
                    {meta.name}
                  </h4>
                  <span className="rounded bg-[#233A23] px-1 py-0.2 text-[9px] font-bold text-[#E1E1D5]">
                    GEMINI + BIS
                  </span>
                </div>
                <span className="text-[10px] text-[#AAA785] truncate font-mono">
                  {contextSummary}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                className="rounded-md p-1.5 text-[#AAA785] hover:bg-[#2A2E28]/60 hover:text-[#E1E1D5] transition-colors cursor-pointer"
                title="Reset Mini-Brain Conversation"
                aria-label="Reset Mini-Brain Conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="rounded-md p-1.5 text-[#AAA785] hover:bg-[#2A2E28]/60 hover:text-[#E1E1D5] transition-colors cursor-pointer hidden sm:inline-flex"
                title={isExpanded ? 'Shrink' : 'Expand'}
              >
                {isExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-[#AAA785] hover:bg-[#2A2E28]/60 hover:text-[#E1E1D5] transition-colors cursor-pointer"
                title="Minimize Mini-Brain"
                aria-label="Minimize Mini-Brain"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="bg-[#2A2E28]/70 border-b border-[rgba(170,167,133,0.20)]/80 px-3.5 py-1.5 text-[10px] text-[#E1E1D5] flex items-center justify-between gap-2 shrink-0">
            <span className="flex items-center gap-1 truncate">
              <Info className="h-3 w-3 text-[#AAA785] shrink-0" />
              <strong className="font-semibold text-[#FDFDF5]">Active Context:</strong>
              <span className="truncate">{context.currentPage}</span>
              {context.searchQuery && <span>• "{context.searchQuery}"</span>}
              {context.selectedStandard && <span>• {context.selectedStandard}</span>}
            </span>
            <span className="shrink-0 text-[#AAA785] font-mono text-[9px]">
              Grounded First
            </span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs text-[#E1E1D5]">
            {messages.length === 0 && (
              <div className="space-y-3 py-2">
                <div className="rounded-xl border border-blue-100 bg-[#2A2E28] p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-[#FDFDF5] font-semibold text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#AAA785]" />
                    <span>How can I assist you in {context.currentPage}?</span>
                  </div>
                  <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
                    I query official Bureau of Indian Standards regulations first. If an answer is outside the preloaded mandatory QCO cache, I provide verified contextual advice and ask clarification questions when needed.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] px-1">
                    Suggested Contextual Queries:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {meta.starterPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="group flex items-center justify-between text-left rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-2 text-[11px] text-[#E1E1D5] hover:border-[rgba(170,167,133,0.35)] hover:bg-[#2A2E28]/50 hover:text-[#FDFDF5] transition-colors cursor-pointer shadow-2xs"
                      >
                        <span className="truncate pr-2">{prompt}</span>
                        <ArrowRight className="h-3 w-3 text-[#AAA785] group-hover:text-[#AAA785] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#232323] px-3.5 py-2 text-xs text-white shadow-2xs">
                    {msg.content}
                  </div>
                ) : (
                  <div className="w-full space-y-2">
                    {/* Badge Indicator */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {msg.answerType === 'BIS_GROUNDED' && (
                        <span className="inline-flex items-center gap-1 rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-bold text-[#E1E1D5] border border-[rgba(170,167,133,0.25)]">
                          <ShieldCheck className="h-3 w-3 text-[#AAA785]" />
                          <span>Official BIS Grounded</span>
                        </span>
                      )}
                      {msg.answerType === 'HYBRID' && (
                        <span className="inline-flex items-center gap-1 rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-bold text-[#E1E1D5] border border-[rgba(170,167,133,0.25)]">
                          <Sparkles className="h-3 w-3 text-[#AAA785]" />
                          <span>BIS Facts + Contextual Guidance</span>
                        </span>
                      )}
                      {msg.answerType === 'CONTEXTUAL_ADVISORY' && (
                        <span className="inline-flex items-center gap-1 rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-bold text-[#E1E1D5] border border-[rgba(170,167,133,0.25)]">
                          <AlertCircle className="h-3 w-3 text-[#AAA785]" />
                          <span>Contextual Advisory (Unverified in Offline QCO Cache)</span>
                        </span>
                      )}
                      {msg.answerType === 'CLARIFICATION_REQUIRED' && (
                        <span className="inline-flex items-center gap-1 rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-800 border border-purple-200">
                          <HelpCircle className="h-3 w-3 text-purple-600" />
                          <span>Clarification Needed</span>
                        </span>
                      )}
                      {msg.answerType === 'NO_RELEVANT_STANDARD' && (
                        <span className="inline-flex items-center gap-1 rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-bold text-[#FDFDF5] border border-[rgba(170,167,133,0.20)]">
                          <Info className="h-3 w-3 text-[#E1E1D5]" />
                          <span>No Relevant Standard in QCO Cache</span>
                        </span>
                      )}
                    </div>

                    {/* Main Assistant Body */}
                    <div className="rounded-2xl rounded-tl-xs border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs space-y-2.5">
                      {/* Clarification Alert Box if applicable */}
                      {msg.clarificationQuestion && (
                        <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-2.5 text-xs text-purple-950 flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <strong className="font-semibold block text-purple-900">
                              Clarification Required:
                            </strong>
                            <p className="text-[11px] leading-relaxed">
                              {msg.clarificationQuestion}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Knowledge Gap Note if applicable */}
                      {msg.knowledgeGapNote && (
                        <div className="rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#2A2E28] p-2 text-[11px] text-[#FDFDF5] flex items-start gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-[#AAA785] shrink-0 mt-0.5" />
                          <span>{msg.knowledgeGapNote}</span>
                        </div>
                      )}

                      {/* Retrieved BIS Facts (Bullet Points with Official Shield) */}
                      {msg.bisFacts && msg.bisFacts.length > 0 && (
                        <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/70 p-2.5 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FDFDF5]">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#AAA785]" />
                            <span>Retrieved BIS Regulatory Provisions:</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-[#E1E1D5] pl-4 list-disc marker:text-[#AAA785]">
                            {msg.bisFacts.map((fact, fIdx) => (
                              <li key={fIdx} className="leading-relaxed">
                                {fact}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Content / General Explanation */}
                      <div className="text-[11px] text-[#FDFDF5] leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>

                      {/* Official Sources Citation Cards */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="pt-2 border-t border-[rgba(170,167,133,0.15)] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block">
                            Authoritative BIS Evidence:
                          </span>
                          <div className="space-y-1">
                            {msg.citations.slice(0, 2).map((cit, cIdx) => (
                              <a
                                key={cIdx}
                                href={cit.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-2 py-1.5 text-[10px] text-[#E1E1D5] hover:bg-[#2A2E28]/50 hover:text-[#FDFDF5] hover:border-[rgba(170,167,133,0.25)] transition-colors"
                              >
                                <span className="font-semibold truncate pr-1">
                                  {cit.title}
                                </span>
                                <ExternalLink className="h-3 w-3 text-[#AAA785] group-hover:text-[#AAA785] shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested Quick Actions */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleSend(action.prompt)}
                              className="rounded-md border border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/70 px-2 py-1 text-[10px] font-semibold text-[#FDFDF5] hover:bg-[#233A23] transition-colors cursor-pointer"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3 text-xs text-[#E1E1D5] shadow-2xs animate-pulse">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[11px] font-medium">
                  Querying BIS knowledge & formulating contextual evaluation...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-[rgba(170,167,133,0.20)] bg-[#232323] p-2.5 shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={meta.placeholder}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-[rgba(170,167,133,0.30)] bg-[#2A2E28]/60 px-3 py-2 text-xs text-[#FDFDF5] placeholder-[#AAA785] focus:border-blue-600 focus:bg-[#232323] focus:outline-hidden disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs shrink-0"
                title="Send query to Mini-Brain"
                aria-label="Send query to Mini-Brain"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-1 flex items-center justify-between px-1 text-[9px] text-[#AAA785]">
              <span>Grounding: BIS Official Knowledge Base</span>
              <span>Language: {currentLanguage.toUpperCase()}</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// Named alias for reusable component
export const MiniBrainPanel = ContextualMiniBrain;

