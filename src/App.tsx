import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { AppShell, PageContainer, NavViewId } from './components/shell/index.ts';
import { MessageItem } from './components/MessageItem.tsx';
import { ChatInput } from './components/ChatInput.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { KnowledgeModal } from './components/KnowledgeModal.tsx';
import { FilePreviewModal } from './components/FilePreviewModal.tsx';
import { ComplianceCopilot, CopilotTabType } from './components/copilot/ComplianceCopilot.tsx';
import { TestingIntelligence, TestingTabType } from './components/testing/TestingIntelligence.tsx';
import { SmartStandardFinder } from './components/finder/SmartStandardFinder.tsx';
import { LaboratoryFinder } from './components/labs/LaboratoryFinder.tsx';
import { HallmarkingAssistant } from './components/hallmarking/HallmarkingAssistant.tsx';
import { FeeCalculator } from './components/calculator/FeeCalculator.tsx';
import { MyDashboard } from './components/dashboard/MyDashboard.tsx';
import { SettingsModal } from './components/settings/SettingsModal.tsx';
import { LanguageModal } from './components/LanguageModal.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import {
  getActiveUserProfile,
  setActiveUserProfile,
  signOutCurrentUser
} from './services/firebaseAuth.ts';
import { CONSUMER_TOPICS } from './data/consumerSupport.ts';
import {
  ChatMessage,
  QueryCapability,
  NextStepSuggestion,
  AttachedFile,
  UserProfile,
  UserSettings,
  RecentActivityItem,
  AnalyzedProductFile,
  ChatSession
} from './types/index.ts';
import {
  getSavedChatSessions,
  saveChatSessions,
  getSavedUserSettings,
  saveUserSettings,
  getSavedRecentActivities,
  addRecentActivity,
  INITIAL_ANALYZED_FILES,
  fetchLiveDashboardStats
} from './services/dashboardDataService.ts';
import { classifyAndRetrieve } from './services/classifierAndRetriever.ts';
import { useLanguage } from './i18n/LanguageContext.tsx';
import { SupportedLanguageCode } from './i18n/types.ts';
import { ArrowLeft, PlusCircle, LayoutDashboard, MessageSquare, X, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export type ActiveView =
  | 'dashboard'
  | 'chat'
  | 'copilot'
  | 'catalog'
  | 'testing'
  | 'smart_finder'
  | 'lab_finder'
  | 'hallmarking'
  | 'fee_calculator'
  | 'consumer';

export default function App() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  // Central User & Dashboard State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getActiveUserProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'switch_account' | 'add_account'>('signin');
  const [userSettings, setUserSettings] = useState<UserSettings>(() => getSavedUserSettings());
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>(() => getSavedRecentActivities());
  const [analyzedFiles, setAnalyzedFiles] = useState<AnalyzedProductFile[]>(INITIAL_ANALYZED_FILES);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => getSavedChatSessions());
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [dbStats, setDbStats] = useState<any>(null);

  // Sync live stats and audit activities from PostgreSQL database
  useEffect(() => {
    fetchLiveDashboardStats().then((data) => {
      if (data) {
        setDbStats(data);
        if (data.recentActivities && data.recentActivities.length > 0) {
          setRecentActivities(data.recentActivities);
        }
        if (data.analyzedFiles && data.analyzedFiles.length > 0) {
          setAnalyzedFiles(data.analyzedFiles);
        }
      }
    });
  }, []);

  // Modal Visibility States
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsModalTab, setSettingsModalTab] = useState<'preferences' | 'profile' | 'notifications'>('preferences');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Workspace Navigation & Chat State (Default to New Chat)
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [previousWorkspaceView, setPreviousWorkspaceView] = useState<'dashboard' | 'chat'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState(false);
  const [lastQueryPayload, setLastQueryPayload] = useState<{ query: string; attachments?: AttachedFile[] } | null>(null);
  const [currentCapability, setCurrentCapability] = useState<QueryCapability | null>(null);
  const [copilotTab, setCopilotTab] = useState<CopilotTabType>('roadmap');
  const [testingTab, setTestingTab] = useState<TestingTabType>('requirements');
  const [finderInitialQuery, setFinderInitialQuery] = useState('');
  const [labInitialStandard, setLabInitialStandard] = useState<string | undefined>(undefined);
  const [labInitialQuery, setLabInitialQuery] = useState<string | undefined>(undefined);
  const [hallmarkInitialTopic, setHallmarkInitialTopic] = useState<string | undefined>(undefined);
  const [feeStandardId, setFeeStandardId] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [previewFile, setPreviewFile] = useState<AttachedFile | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isLoading, activeView]);

  // Sync recent activities when storage changes
  const refreshActivities = () => {
    setRecentActivities(getSavedRecentActivities());
  };

  // Chat message submission with full session history persistence & activity logging
  const handleSendMessage = async (queryText: string, attachments?: AttachedFile[]) => {
    const hasText = Boolean(queryText.trim());
    const hasFiles = Boolean(attachments && attachments.length > 0);

    if ((!hasText && !hasFiles) || isLoading) return;

    // Ensure we are in chat view
    if (activeView !== 'chat') {
      setActiveView('chat');
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Determine or generate session ID
    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = `session-${Date.now()}`;
      setCurrentSessionId(sessionId);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: timeStr,
      attachments
    };

    const updatedHistory: ChatMessage[] = messages
      .map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
      .concat(userMessage);

    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      // Send query to server endpoint with attachments and selected language
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          history: updatedHistory,
          language: currentLanguage,
          attachments
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        capability: data.capability,
        capabilityLabel: data.capabilityLabel,
        groundingStatus: data.groundingStatus,
        confidenceScore: data.confidenceScore,
        citations: data.citations,
        proceduralLinks: data.proceduralLinks,
        nextSteps: data.nextSteps,
        isLowConfidence: data.isLowConfidence,
        isStreaming: true
      };

      const finalMessages = [...updatedHistory, assistantMessage];
      setMessages(finalMessages);
      setCurrentCapability(data.capability);

      // Persist session to history
      persistSession(sessionId, queryText, finalMessages, data.capability);

      // Record recent activity
      addRecentActivity({
        type: 'ai_query',
        title: queryText.length > 40 ? `${queryText.slice(0, 40)}...` : queryText,
        description: data.content.slice(0, 110).replace(/[*#`_]/g, '') + '...',
        statusBadge: data.groundingStatus === 'GROUNDED' ? 'Grounded' : 'Advisory',
        statusType: 'passed',
        actionTarget: { view: 'chat', sessionId }
      });
      refreshActivities();
    } catch (err) {
      console.warn('Backend query error or offline fallback, running local retrieval:', err);
      // Client-side fallback to the exact same classifyAndRetrieve engine
      const localResult = classifyAndRetrieve(queryText, updatedHistory, currentLanguage, attachments);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: localResult.plainLanguageExplanation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        capability: localResult.capability,
        capabilityLabel: localResult.capabilityLabel,
        groundingStatus: localResult.groundingStatus,
        confidenceScore: localResult.confidenceScore,
        citations: localResult.citations,
        proceduralLinks: localResult.proceduralLinks,
        nextSteps: localResult.nextSteps,
        isLowConfidence: localResult.groundingStatus === 'LOW_CONFIDENCE',
        isStreaming: true
      };

      const finalMessages = [...updatedHistory, assistantMessage];
      setMessages(finalMessages);
      setCurrentCapability(localResult.capability);

      // Persist session to history
      persistSession(sessionId, queryText, finalMessages, localResult.capability);

      // Record recent activity
      addRecentActivity({
        type: 'ai_query',
        title: queryText.length > 40 ? `${queryText.slice(0, 40)}...` : queryText,
        description: localResult.plainLanguageExplanation.slice(0, 110).replace(/[*#`_]/g, '') + '...',
        statusBadge: 'Advisory',
        statusType: 'info',
        actionTarget: { view: 'chat', sessionId }
      });
      refreshActivities();
    } finally {
      setIsLoading(false);
    }
  };

  const persistSession = (
    sessionId: string,
    firstPrompt: string,
    allMessages: ChatMessage[],
    capability?: QueryCapability | null
  ) => {
    setChatSessions((prevSessions) => {
      const existing = prevSessions.find((s) => s.id === sessionId);
      const title = existing ? existing.title : firstPrompt.slice(0, 50).trim() + (firstPrompt.length > 50 ? '...' : '');
      const summary =
        allMessages[allMessages.length - 1]?.content.slice(0, 110).replace(/[*#`_]/g, '') + '...';

      const updatedSession: ChatSession = {
        id: sessionId,
        title,
        createdAt: existing ? existing.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: allMessages,
        capability: capability || existing?.capability,
        summary
      };

      const nextSessions = [updatedSession, ...prevSessions.filter((s) => s.id !== sessionId)];
      saveChatSessions(nextSessions);
      return nextSessions;
    });
  };

  const handleStreamingComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, isStreaming: false } : msg))
    );
    if (activeView === 'chat') {
      scrollToBottom();
    }
  };

  const handleSelectNextStep = (suggestion: NextStepSuggestion) => {
    handleSendMessage(suggestion.prompt);
  };

  // Starting a fresh inquiry
  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setCurrentCapability(null);
    setPreviewFile(null);
    setActiveView('chat');
  };

  // Reopen a previous chat session
  const handleOpenSession = (sessionId: string) => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(session.id);
      setCurrentCapability(session.capability || null);
      setActiveView('chat');
    }
  };

  // Delete a previous chat session
  const handleDeleteSession = (sessionId: string) => {
    const nextSessions = chatSessions.filter((s) => s.id !== sessionId);
    setChatSessions(nextSessions);
    saveChatSessions(nextSessions);

    if (currentSessionId === sessionId) {
      setMessages([]);
      setCurrentSessionId(null);
      setCurrentCapability(null);
    }
  };

  // Open settings with specific tab
  const handleOpenSettings = (tab?: 'preferences' | 'profile' | 'notifications') => {
    setSettingsModalTab(tab || 'preferences');
    setIsSettingsModalOpen(true);
  };

  const handleOpenAuth = (mode?: 'signin' | 'switch_account' | 'add_account') => {
    setAuthModalMode(mode || 'signin');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsAuthModalOpen(false);
    addRecentActivity({
      type: 'ai_query',
      title: `Signed in: ${profile.name}`,
      description: `${profile.email} • ${profile.organization}`,
      statusBadge: 'AUTHENTICATED',
      statusType: 'passed'
    });
    refreshActivities();
  };

  // Profile logout
  const handleLogout = async () => {
    await signOutCurrentUser();
    setUserProfile(null);
    setMessages([]);
    setCurrentSessionId(null);
    setCurrentCapability(null);
    setActiveView('chat');
  };

  // Clicking an analyzed file in Recently Analyzed Files card
  const handleSelectAnalyzedFile = (file: AnalyzedProductFile) => {
    addRecentActivity({
      type: 'file_analysis',
      title: `Scrutinized ${file.name}`,
      description: `${file.standard} • ${file.summaryNote || 'Testing report evaluation'}`,
      statusBadge: file.status,
      statusType: file.status === 'PASSED' ? 'passed' : file.status === 'PENDING' ? 'pending' : 'failed',
      actionTarget: { view: 'testing', tab: 'reports' }
    });
    refreshActivities();
    handleOpenTestingWithTab('reports');
  };

  const handleOpenCopilotWithTab = (tab?: CopilotTabType) => {
    if (tab) {
      setCopilotTab(tab);
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('copilot');
  };

  const handleOpenTestingWithTab = (tab?: TestingTabType) => {
    if (tab) {
      setTestingTab(tab);
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('testing');
  };

  const handleOpenCatalog = () => {
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('catalog');
  };

  const handleOpenSmartFinder = (query?: string) => {
    if (query !== undefined) {
      setFinderInitialQuery(query);
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('smart_finder');
  };

  const handleOpenLabFinder = (standardOrQuery?: string) => {
    if (standardOrQuery) {
      if (standardOrQuery.toUpperCase().includes('IS')) {
        setLabInitialStandard(standardOrQuery);
      } else {
        setLabInitialQuery(standardOrQuery);
      }
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('lab_finder');
  };

  const handleOpenHallmarking = (topic?: string) => {
    if (topic) {
      setHallmarkInitialTopic(topic);
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('hallmarking');
  };

  const handleOpenFeeCalculator = (standardId?: string) => {
    if (standardId) {
      setFeeStandardId(standardId);
    }
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('fee_calculator');
  };

  const handleOpenConsumer = () => {
    if (activeView === 'dashboard' || activeView === 'chat') {
      setPreviousWorkspaceView(activeView);
    }
    setActiveView('consumer');
  };

  const handleNavigateFromShell = (viewId: NavViewId) => {
    switch (viewId) {
      case 'chat':
        handleNewChat();
        setActiveView('chat');
        break;
      case 'smart_finder':
        handleOpenSmartFinder();
        break;
      case 'copilot':
        handleOpenCopilotWithTab('roadmap');
        break;
      case 'fee_calculator':
        handleOpenFeeCalculator();
        break;
      case 'testing':
        handleOpenTestingWithTab('requirements');
        break;
      case 'lab_finder':
        handleOpenLabFinder();
        break;
      case 'hallmarking':
        handleOpenHallmarking();
        break;
      case 'consumer':
        handleOpenConsumer();
        break;
      case 'catalog':
        handleOpenCatalog();
        break;
      case 'dashboard':
        setActiveView('dashboard');
        break;
      default:
        setActiveView('chat');
    }
  };

  const handleReturnToWorkspace = () => {
    setActiveView(previousWorkspaceView || 'chat');
  };

  return (
    <AppShell
      activeView={activeView}
      onNavigate={handleNavigateFromShell}
      userProfile={userProfile}
      onOpenDashboard={() => setActiveView('dashboard')}
      onOpenCatalog={handleOpenCatalog}
      onOpenSettings={handleOpenSettings}
      onOpenHelp={() => {
        setActiveView('chat');
        handleSendMessage('Help & Support: How do I navigate BIS Sahayak, and what capabilities are available?');
      }}
      onLogout={handleLogout}
      onOpenAuth={handleOpenAuth}
      dockedBottom={
        activeView === 'chat' ? (
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            selectedLanguage={currentLanguage}
            onPreviewFile={(file) => setPreviewFile(file)}
          />
        ) : null
      }
    >
      {/* 1. Main Advisory Chat Stream Area inside PageContainer */}
      {activeView === 'chat' && (
        <PageContainer
          constrained={true}
          maxWidthClass="max-w-4xl lg:max-w-5xl"
          ariaLabel="BIS Sahayak Knowledge Stream"
        >
          {messages.length === 0 ? (
            <EmptyState
              onSelectPrompt={handleSendMessage}
              onOpenDirectory={handleOpenCatalog}
              onOpenCopilot={() => handleOpenCopilotWithTab('roadmap')}
              onOpenTesting={() => handleOpenTestingWithTab('requirements')}
            />
          ) : (
            <div className="mx-auto w-full max-w-3xl lg:max-w-4xl space-y-4 pb-10 sm:pb-12">
              {messages.map((msg) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  onSelectNextStep={handleSelectNextStep}
                  onStreamingComplete={handleStreamingComplete}
                  onScrollRequest={scrollToBottom}
                  onPreviewFile={(file) => setPreviewFile(file)}
                  onOpenStandard={handleOpenSmartFinder}
                />
              ))}

              {/* 4.5 AI Thinking State */}
              {isLoading && (
                <div className="flex justify-start py-2 animate-in fade-in duration-200">
                  <div className="rounded-xl border border-[rgba(170,167,133,0.22)] bg-[#232323] px-4 py-3 shadow-sm flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#AAA785] animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-[#AAA785] animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-[#AAA785] animate-bounce" />
                    </div>
                    <span className="text-xs font-semibold text-[#FDFDF5]">
                      BIS Sahayak is thinking...
                    </span>
                  </div>
                </div>
              )}

              {/* 4.6 AI Error State */}
              {chatError && !isLoading && (
                <div className="flex justify-start py-2 animate-in fade-in duration-200">
                  <div className="rounded-xl border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 px-4 py-3 text-xs text-[#FF6B6B] flex items-center justify-between gap-4 max-w-md w-full">
                    <span className="font-medium text-[#FDFDF5]">
                      Something went wrong while processing your request.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (lastQueryPayload) {
                          setChatError(false);
                          handleSendMessage(lastQueryPayload.query, lastQueryPayload.attachments);
                        }
                      }}
                      className="rounded-lg bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/30 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </PageContainer>
      )}

      {/* 2. Consumer Assistant Guidance inside PageContainer */}
      {activeView === 'consumer' && (
        <PageContainer
          constrained={true}
          maxWidthClass="max-w-5xl"
          ariaLabel="Consumer Assistant & Grievance Redressal"
        >
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2A3328] border border-[#AAA785]/30 text-[#AAA785]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-[#FDFDF5]">
                      Consumer Assistant & Grievance Redressal
                    </h2>
                    <span className="rounded-md bg-[#2A2E28] px-2 py-0.5 text-xs font-semibold text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                      BIS Act, 2016
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#E1E1D5] leading-relaxed">
                    Empowering Indian citizens to verify genuine ISI marks, validate CRS electronics registration, inspect 6-digit HUID hallmarked jewellery, and lodge formal consumer grievances.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('chat');
                        handleSendMessage('How do I verify if an ISI mark on a packaged drinking water bottle or electrical appliance is authentic?');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-3 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-[#AAA785]" />
                      <span>Verify ISI Mark Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('hallmarking');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-3 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-[#AAA785]" />
                      <span>Open Hallmarking Assistant</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('chat');
                        handleSendMessage('What is the procedure to lodge a consumer complaint with BIS against a manufacturer selling counterfeit ISI marked helmet?');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-3 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer"
                    >
                      <HelpCircle className="h-3.5 w-3.5 text-[#AAA785]" />
                      <span>Lodge Grievance Guidance</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Guidance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONSUMER_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4.5 flex flex-col justify-between hover:border-[rgba(170,167,133,0.30)] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] bg-[#2A3328] px-2 py-0.5 rounded border border-[#AAA785]/20">
                        {topic.category}
                      </span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-[#FDFDF5]">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#E1E1D5] leading-relaxed">
                      {topic.summary}
                    </p>

                    <div className="mt-3 space-y-1 bg-[#2A3328] p-2.5 rounded-lg border border-[rgba(170,167,133,0.18)]">
                      <div className="text-[10.5px] font-semibold text-[#AAA785] uppercase">
                        Action Steps
                      </div>
                      {topic.steps.slice(0, 3).map((st, i) => (
                        <div key={i} className="text-xs text-[#E1E1D5] flex items-start gap-1.5">
                          <span className="text-[#AAA785] font-bold text-[11px] shrink-0">•</span>
                          <span className="leading-snug">{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(170,167,133,0.20)] flex items-center justify-between gap-2 flex-wrap">
                    <a
                      href={topic.portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#AAA785] hover:underline font-medium"
                    >
                      <span>{topic.portal_label}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('chat');
                        handleSendMessage(`Explain ${topic.title} in detail and help me understand consumer protections.`);
                      }}
                      className="inline-flex items-center gap-1 rounded bg-[#2A2E28] px-2.5 py-1 text-xs font-semibold text-[#FDFDF5] hover:text-[#AAA785] transition-colors cursor-pointer"
                    >
                      <span>Ask AI Assistant</span>
                      <MessageSquare className="h-3 w-3 text-[#AAA785]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      )}

      {/* Full-Screen My Dashboard Workspace */}
      {activeView === 'dashboard' && (
        <div
          id="my-dashboard-fullscreen"
          aria-label="My Dashboard Workspace"
          className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#233A23] overflow-hidden animate-in fade-in duration-150"
        >
          {/* Top Bar with Arrow Back to Chat */}
          <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-2.5 shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              {/* Prominent Arrow Back to Chat button */}
              <button
                type="button"
                id="back-to-chat-button"
                onClick={() => setActiveView('chat')}
                className="inline-flex items-center gap-2 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3.5 py-1.5 text-xs font-bold text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer shadow-2xs shrink-0"
                title={t('dashboard.backToChat', 'Back to Chat')}
                aria-label={t('dashboard.backToChat', 'Back to Chat')}
              >
                <ArrowLeft className="h-4 w-4 text-[#AAA785]" />
                <span>{t('dashboard.backToChat', 'Back to Chat')}</span>
              </button>

              <div className="h-4 w-px bg-[rgba(170,167,133,0.20)]" />

              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-[#AAA785] hidden sm:inline" />
                <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                  {t('sidebar.my-dashboard', 'My Dashboard')}
                </h2>
                {userProfile ? (
                  <span className="hidden md:inline rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-semibold text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                    {userProfile.applicantId}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('signin')}
                    className="hidden md:inline rounded bg-[#AAA785] px-2 py-0.5 text-[10px] font-bold text-[#232323] hover:bg-[#E1E1D5] transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveView('chat')}
                className="rounded-lg p-1.5 text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
                title={t('dashboard.backToChat', 'Back to Chat')}
                aria-label={t('dashboard.backToChat', 'Back to Chat')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Dashboard Content */}
          <div className="flex-1 overflow-y-auto">
            <MyDashboard
              userProfile={userProfile}
              recentActivities={recentActivities}
              analyzedFiles={analyzedFiles}
              chatSessions={chatSessions}
              onOpenChat={(query) => {
                setActiveView('chat');
                if (query) {
                  handleNewChat();
                  setTimeout(() => handleSendMessage(query), 50);
                }
              }}
              onOpenSession={handleOpenSession}
              onNewChat={handleNewChat}
              onDeleteSession={handleDeleteSession}
              onOpenCatalog={(tab) => {
                handleOpenCatalog();
              }}
              onOpenCopilot={(tab) => {
                handleOpenCopilotWithTab(tab as CopilotTabType);
              }}
              onOpenTesting={(tab) => {
                handleOpenTestingWithTab(tab as TestingTabType);
              }}
              onOpenSettings={handleOpenSettings}
              onSelectAnalyzedFile={handleSelectAnalyzedFile}
              onOpenSmartFinder={handleOpenSmartFinder}
              onOpenLabFinder={handleOpenLabFinder}
              onOpenHallmarking={handleOpenHallmarking}
              onOpenFeeCalculator={handleOpenFeeCalculator}
              onOpenAuth={handleOpenAuth}
            />
          </div>
        </div>
      )}

      {/* Full-Screen Smart Standard Finder Workspace */}
      <SmartStandardFinder
        isOpen={activeView === 'smart_finder'}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
        onOpenLabs={(std) => handleOpenLabFinder(std)}
        onOpenFees={(stdId) => handleOpenFeeCalculator(stdId)}
        initialQuery={finderInitialQuery}
      />

      {/* Full-Screen Laboratory Finder Workspace */}
      <LaboratoryFinder
        isOpen={activeView === 'lab_finder'}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
        onOpenStandardFinder={(isNumber) => handleOpenSmartFinder(isNumber)}
        initialQuery={labInitialQuery}
        initialStandard={labInitialStandard}
      />

      {/* Full-Screen Hallmarking Assistant Workspace */}
      <HallmarkingAssistant
        isOpen={activeView === 'hallmarking'}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
        onOpenLabFinder={() => handleOpenLabFinder()}
        initialTopic={hallmarkInitialTopic}
      />

      {/* Full-Screen BIS Fee Calculator Workspace */}
      <FeeCalculator
        isOpen={activeView === 'fee_calculator'}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
        onOpenRoadmap={() => handleOpenCopilotWithTab('roadmap')}
        onOpenCopilotTab={(tab) => handleOpenCopilotWithTab(tab as CopilotTabType)}
        initialStandardId={feeStandardId}
      />

      {/* Full-Screen Certification Copilot Workspace */}
      <ComplianceCopilot
        isOpen={activeView === 'copilot'}
        initialTab={copilotTab}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
      />

      {/* Full-Screen Testing & Laboratory Intelligence Workspace */}
      <TestingIntelligence
        isOpen={activeView === 'testing'}
        initialTab={testingTab}
        onClose={handleReturnToWorkspace}
        onQueryAssistant={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
      />

      {/* Full-Screen Reference Knowledge Catalog */}
      <KnowledgeModal
        isOpen={activeView === 'catalog'}
        onClose={handleReturnToWorkspace}
        onSelectStandardPrompt={(prompt) => {
          setActiveView('chat');
          handleSendMessage(prompt);
        }}
      />

      {/* Rich File Preview Modal (Photos, Documents, Videos) */}
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onAskAboutFile={(file, customPrompt) => {
          setActiveView('chat');
          handleSendMessage(customPrompt || `Please analyze this attached file: ${file.name}`, [file]);
        }}
      />

      {/* Workspace Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userProfile={userProfile}
        userSettings={userSettings}
        onSaveProfile={(updated) => {
          setUserProfile(updated);
          setActiveUserProfile(updated);
        }}
        onSaveSettings={(updated) => {
          setUserSettings(updated);
          saveUserSettings(updated);
        }}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
      />

      {/* Language Selector Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      {/* Authentication Modal (Google / Gmail) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </AppShell>
  );
}
