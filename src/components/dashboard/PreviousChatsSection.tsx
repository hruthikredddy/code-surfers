import { useState } from 'react';
import { MessageSquare, ArrowRight, Trash2, Search, PlusCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { ChatSession } from '../../types/index.ts';

interface PreviousChatsSectionProps {
  sessions: ChatSession[];
  onOpenSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession?: (sessionId: string) => void;
}

export function PreviousChatsSection({
  sessions,
  onOpenSession,
  onNewChat,
  onDeleteSession
}: PreviousChatsSectionProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredSessions = sessions.filter((s) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return s.title.toLowerCase().includes(query) || (s.summary && s.summary.toLowerCase().includes(query));
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4 gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
            {t('dashboard.previousChatsTitle', 'Previous Advisory Sessions')}
          </h3>
          <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
            {t('dashboard.previousChatsSubtitle', 'Continue previous compliance conversations with full contextual history')}
          </p>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#232323] text-[#AAA785] border border-[#AAA785]/30 px-3 py-1.5 text-xs font-semibold hover:bg-[#2A2E28] transition-colors cursor-pointer"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>{t('dashboard.startFreshChat', 'New Inquiry')}</span>
        </button>
      </div>

      {/* Search Filter */}
      {sessions.length > 2 && (
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#AAA785]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('dashboard.searchChatsPlaceholder', 'Search previous conversations by topic or standard...')}
            className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] pl-8 pr-3 py-1.5 text-xs text-[#FDFDF5] placeholder-[#AAA785] focus:bg-[#232323] focus:border-[#AAA785]/40 focus:outline-hidden transition-colors"
          />
        </div>
      )}

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSessions.map((session) => {
          const messageCount = session.messages.length;
          return (
            <div
              key={session.id}
              onClick={() => onOpenSession(session.id)}
              className="group flex flex-col justify-between p-3.5 rounded-xl border border-[rgba(170,167,133,0.18)] bg-[#232323] hover:bg-[#232323] hover:border-[rgba(170,167,133,0.30)] hover:shadow-xs transition-all cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 rounded bg-[#2A3328] px-2 py-0.5 text-[10px] font-semibold text-[#AAA785] border border-[#AAA785]/20">
                    <MessageSquare className="h-3 w-3 text-[#AAA785]" />
                    {messageCount} {messageCount === 1 ? 'message' : 'messages'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#AAA785] font-mono">
                      {formatDate(session.updatedAt)}
                    </span>
                    {onDeleteSession && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#AAA785] hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all cursor-pointer"
                        title="Delete conversation"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#FDFDF5] leading-snug group-hover:text-[#AAA785] transition-colors line-clamp-2">
                  {session.title}
                </h4>

                {session.summary && (
                  <p className="text-[11px] text-[#E1E1D5] leading-relaxed mt-1 line-clamp-2">
                    {session.summary}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-[rgba(170,167,133,0.18)] flex items-center justify-between text-xs text-[#AAA785] font-semibold group-hover:text-[#D2F870]">
                <span>{t('dashboard.resumeChat', 'Resume conversation')}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}

        {filteredSessions.length === 0 && (
          <div className="col-span-full py-8 text-center text-xs text-[#AAA785]">
            {t('dashboard.noMatchingChats', 'No previous chat sessions found.')}
          </div>
        )}
      </div>
    </div>
  );
}
