import { useState, useEffect, ReactNode } from 'react';
import { GovernmentBar } from './GovernmentBar.tsx';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import { MobileNavigation } from './MobileNavigation.tsx';
import { NavViewId } from './types.ts';
import { UserProfile } from '../../types/index.ts';

interface AppShellProps {
  activeView: NavViewId;
  onNavigate: (viewId: NavViewId) => void;
  pageTitle?: string;
  userProfile?: UserProfile | null;
  onOpenDashboard?: () => void;
  onOpenCatalog?: () => void;
  onOpenSettings?: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onOpenHelp?: () => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
  /**
   * Primary page content rendered inside the shell
   */
  children: ReactNode;
  /**
   * Optional docked bottom container (e.g. persistent ChatInput bar)
   */
  dockedBottom?: ReactNode;
}

export function AppShell({
  activeView,
  onNavigate,
  pageTitle,
  userProfile,
  onOpenDashboard,
  onOpenCatalog,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onOpenAuth,
  children,
  dockedBottom
}: AppShellProps) {
  // Sidebar collapsed state for desktop/tablet
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Default collapsed on small screens / tablet
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Mobile drawer slide-over state (< 1024px)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Auto-collapse on resize if window drops below desktop breakpoint
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    // If on mobile screen, toggle mobile drawer
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileNavOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] w-full flex-col overflow-hidden bg-[#10150F] text-[#F1F4EA] font-sans antialiased selection:bg-[#B8F23D]/20 selection:text-[#B8F23D]">
      {/* 1. TOP GOVERNMENT & BIS STRIP */}
      <GovernmentBar />

      {/* 2. BODY: FIXED/STICKY SIDEBAR + SCROLLABLE MAIN CONTENT AREA */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Desktop / Tablet Sidebar */}
        <div className="hidden lg:block shrink-0 h-full">
          <Sidebar
            activeView={activeView}
            onNavigate={onNavigate}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            userProfile={userProfile}
            onOpenSettings={onOpenSettings}
            onOpenHelp={onOpenHelp}
            onLogout={onLogout}
            onOpenAuth={onOpenAuth}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileNavigation
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          activeView={activeView}
          onNavigate={onNavigate}
          isCollapsed={false}
          onToggleCollapse={() => {}}
          userProfile={userProfile}
          onOpenSettings={onOpenSettings}
          onOpenHelp={onOpenHelp}
          onLogout={onLogout}
          onOpenAuth={onOpenAuth}
        />

        {/* MAIN AREA */}
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden bg-[#10150F]">
          {/* Main Reusable Header */}
          <Header
            activeView={activeView}
            pageTitle={pageTitle}
            onToggleSidebar={handleToggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            onOpenDashboard={onOpenDashboard}
            onOpenCatalog={onOpenCatalog}
            userProfile={userProfile}
            onOpenSettings={onOpenSettings}
            onLogout={onLogout}
            onOpenAuth={onOpenAuth}
          />

          {/* Page Body Container & Docked Bottom */}
          <div className="flex flex-1 flex-col min-h-0 overflow-hidden relative">
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              {children}
            </div>
            {dockedBottom && (
              <div className="shrink-0 w-full z-20">
                {dockedBottom}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
