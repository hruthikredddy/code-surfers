import React from 'react';
import { UserProfileHeader } from './UserProfileHeader.tsx';
import { QuickActionsGrid } from './QuickActionsGrid.tsx';
import { CertificationProgressCard } from './CertificationProgressCard.tsx';
import { ComplianceStatusChart } from './ComplianceStatusChart.tsx';
import { RecentlyAnalyzedFilesCard } from './RecentlyAnalyzedFilesCard.tsx';
import { RecentActivitySection } from './RecentActivitySection.tsx';
import { PreviousChatsSection } from './PreviousChatsSection.tsx';
import {
  UserProfile,
  RecentActivityItem,
  AnalyzedProductFile,
  ChatSession
} from '../../types/index.ts';

interface MyDashboardProps {
  userProfile?: UserProfile | null;
  recentActivities: RecentActivityItem[];
  analyzedFiles: AnalyzedProductFile[];
  chatSessions: ChatSession[];
  onOpenChat: (initialPrompt?: string) => void;
  onOpenSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession?: (sessionId: string) => void;
  onOpenCatalog: (tab?: 'STANDARDS' | 'SCHEMES' | 'HALLMARKING' | 'PORTALS') => void;
  onOpenCopilot: (tab?: string) => void;
  onOpenTesting: (tab?: string) => void;
  onOpenSettings: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onSelectAnalyzedFile: (file: AnalyzedProductFile) => void;
  onOpenSmartFinder: () => void;
  onOpenLabFinder: () => void;
  onOpenHallmarking: () => void;
  onOpenFeeCalculator: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}

export function MyDashboard({
  userProfile,
  recentActivities,
  analyzedFiles,
  chatSessions,
  onOpenChat,
  onOpenSession,
  onNewChat,
  onDeleteSession,
  onOpenCatalog,
  onOpenCopilot,
  onOpenTesting,
  onOpenSettings,
  onSelectAnalyzedFile,
  onOpenSmartFinder,
  onOpenLabFinder,
  onOpenHallmarking,
  onOpenFeeCalculator,
  onOpenAuth
}: MyDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. User Profile Header */}
      <UserProfileHeader
        userProfile={userProfile}
        onOpenSettings={() => onOpenSettings('profile')}
        onOpenCopilot={() => onOpenCopilot('roadmap')}
        onOpenAuth={onOpenAuth}
      />

      {/* 2. Workspace Quick Actions */}
      <QuickActionsGrid
        onOpenChat={onOpenChat}
        onOpenCatalog={onOpenCatalog}
        onOpenCopilot={onOpenCopilot}
        onOpenTesting={onOpenTesting}
        onOpenSmartFinder={onOpenSmartFinder}
        onOpenLabFinder={onOpenLabFinder}
        onOpenHallmarking={onOpenHallmarking}
        onOpenFeeCalculator={onOpenFeeCalculator}
      />

      {/* 3. Progress and Status Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CertificationProgressCard
          onOpenCopilot={onOpenCopilot}
          onOpenTesting={onOpenTesting}
        />
        <ComplianceStatusChart />
      </div>

      {/* 4. Recently Analyzed Files & Test Reports */}
      <RecentlyAnalyzedFilesCard
        files={analyzedFiles}
        onSelectFile={onSelectAnalyzedFile}
      />

      {/* 5. Recent Activity & Previous Chats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivitySection
          activities={recentActivities}
          onNavigate={(target) => {
            if (target.view === 'chat') {
              onOpenChat(target.query);
            } else if (target.view === 'copilot') {
              onOpenCopilot(target.tab);
            } else if (target.view === 'testing') {
              onOpenTesting(target.tab);
            } else if (target.view === 'smart_finder') {
              onOpenSmartFinder();
            } else if (target.view === 'lab_finder') {
              onOpenLabFinder();
            } else if (target.view === 'hallmarking') {
              onOpenHallmarking();
            } else if (target.view === 'fee_calculator') {
              onOpenFeeCalculator();
            }
          }}
        />

        <PreviousChatsSection
          sessions={chatSessions}
          onOpenSession={onOpenSession}
          onNewChat={onNewChat}
          onDeleteSession={onDeleteSession}
        />
      </div>
    </div>
  );
}
