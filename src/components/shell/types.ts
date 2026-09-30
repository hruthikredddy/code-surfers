import { LucideIcon } from 'lucide-react';
import { UserProfile } from '../../types/index.ts';

export type NavViewId =
  | 'chat'
  | 'smart_finder'
  | 'copilot'
  | 'fee_calculator'
  | 'testing'
  | 'lab_finder'
  | 'hallmarking'
  | 'consumer'
  | 'catalog'
  | 'dashboard';

export interface NavItemConfig {
  id: NavViewId;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: 'lime' | 'sage' | 'forest';
  description?: string;
  section: 'main' | 'business' | 'consumer';
}

export interface ShellNavigationProps {
  activeView: NavViewId;
  onNavigate: (viewId: NavViewId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userProfile?: UserProfile | null;
  onOpenSettings?: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onOpenHelp?: () => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}
