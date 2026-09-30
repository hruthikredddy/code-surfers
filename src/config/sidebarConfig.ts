import {
  SquarePen,
  Search,
  Compass,
  Calculator,
  FlaskConical,
  Building2,
  Award,
  Library
} from 'lucide-react';
import { CopilotTabType } from '../components/copilot/ComplianceCopilot.tsx';
import { TestingTabType } from '../components/testing/TestingIntelligence.tsx';

export type SidebarAction =
  | { type: 'new_chat' }
  | { type: 'open_smart_finder'; initialQuery?: string }
  | { type: 'open_copilot'; tab?: CopilotTabType }
  | { type: 'open_fee_calculator'; standardId?: string }
  | { type: 'open_testing'; tab?: TestingTabType }
  | { type: 'open_lab_finder'; initialStandard?: string }
  | { type: 'open_hallmarking'; initialTopic?: string }
  | { type: 'open_catalog' };

export interface SidebarItem {
  id: string;
  label: string;
  icon: typeof SquarePen;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'blue' | 'slate' | 'violet';
  description?: string;
  action: SidebarAction;
}

/**
 * Sidebar navigation items:
 * AI Assistant, Smart Standard Finder, Certificate Compliance, BIS Fee Calculator,
 * Testing Intelligence, Laboratory Finder, Hallmarking Assistant, Standards Library.
 * Note: Dashboard is located in the top header section.
 */
export const SIDEBAR_NAV_ITEMS: SidebarItem[] = [
  {
    id: 'new-chat',
    label: 'AI Assistant',
    icon: SquarePen,
    description: 'Start a fresh standards inquiry or advisory session',
    action: { type: 'new_chat' }
  },
  {
    id: 'smart-standard-finder',
    label: 'Smart Standard Finder',
    icon: Search,
    badge: 'AI SEARCH',
    badgeColor: 'blue',
    description: 'Semantic & keyword search across 21,000+ Indian Standards by product description or IS number',
    action: { type: 'open_smart_finder' }
  },
  {
    id: 'certification-copilot',
    label: 'Certificate Compliance',
    icon: Compass,
    badge: 'COPILOT',
    badgeColor: 'amber',
    description: 'Interactive roadmap, licensing guide, checklist & audit readiness',
    action: { type: 'open_copilot' }
  },
  {
    id: 'fee-calculator',
    label: 'BIS Fee Calculator',
    icon: Calculator,
    badge: 'MSME 50%',
    badgeColor: 'emerald',
    description: 'Transparent statutory fee breakdown, MSME concessions & marking fees',
    action: { type: 'open_fee_calculator' }
  },
  {
    id: 'testing-intelligence',
    label: 'Testing & Laboratory Intelligence',
    icon: FlaskConical,
    badge: 'LIMS',
    badgeColor: 'emerald',
    description: 'Test protocols, mandatory clauses, test report scrutiny & gap analysis',
    action: { type: 'open_testing' }
  },
  {
    id: 'lab-finder',
    label: 'Laboratory Finder',
    icon: Building2,
    badge: '250+ LABS',
    badgeColor: 'blue',
    description: 'Locate BIS recognized and empanelled laboratories by product, standard & state',
    action: { type: 'open_lab_finder' }
  },
  {
    id: 'hallmarking-assistant',
    label: 'Hallmarking Assistant',
    icon: Award,
    badge: 'HUID',
    badgeColor: 'amber',
    description: 'Gold & silver hallmarking guide, 3 mandatory marks, purity 916/750 & HUID verification',
    action: { type: 'open_hallmarking' }
  },
  {
    id: 'standards-library',
    label: 'Standards Library',
    icon: Library,
    badge: 'DIRECTORY',
    badgeColor: 'slate',
    description: 'Browse Indian Standards directory, clauses, and QCO mandates',
    action: { type: 'open_catalog' }
  }
];
