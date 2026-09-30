import React from 'react';
import {
  ContextualMiniBrain,
  MiniBrainCapability,
  MiniBrainContext,
  MiniBrainMessage
} from './ContextualMiniBrain.tsx';

export interface MiniBrainPanelProps {
  capability: MiniBrainCapability;
  context: MiniBrainContext;
  onNavigateToCapability?: (target: string) => void;
  className?: string;
  defaultOpen?: boolean;
}

/**
 * Reusable MiniBrainPanel React component.
 * Renders a compact, scrollable contextual assistant panel within any sidebar or capability view.
 * Grounded in official BIS knowledge, queries the backend service, validates semantic relevance,
 * and seamlessly provides Gemini contextual fallback when no relevant BIS standard exists.
 */
export function MiniBrainPanel(props: MiniBrainPanelProps) {
  return <ContextualMiniBrain {...props} />;
}

export {
  ContextualMiniBrain,
  type MiniBrainCapability,
  type MiniBrainContext,
  type MiniBrainMessage
};

export default MiniBrainPanel;
