import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  /**
   * If true, enables maximum width reading container (max-w-7xl).
   * Default: true.
   */
  constrained?: boolean;
  /**
   * Optional custom max-width (e.g. 'max-w-5xl', 'max-w-7xl', 'max-w-none').
   */
  maxWidthClass?: string;
  /**
   * Optional additional class names for inner container
   */
  className?: string;
  /**
   * Optional custom scroll container class names
   */
  scrollable?: boolean;
  /**
   * Accessible landmark role or aria label
   */
  ariaLabel?: string;
}

export function PageContainer({
  children,
  constrained = true,
  maxWidthClass = 'max-w-7xl',
  className = '',
  scrollable = true,
  ariaLabel = 'Main Content Area'
}: PageContainerProps) {
  return (
    <main
      role="main"
      aria-label={ariaLabel}
      className={`flex-1 w-full min-w-0 min-h-0 ${
        scrollable ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden flex flex-col'
      }`}
    >
      <div
        className={`w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16 transition-all ${
          constrained ? `${maxWidthClass} mx-auto` : ''
        } ${className}`}
      >
        {children}
      </div>
    </main>
  );
}
