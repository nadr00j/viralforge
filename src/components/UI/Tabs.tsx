/**
 * Componente Tabs - Navegação por abas
 */

'use client';

import { HTMLAttributes, ReactNode, useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// Context para gerenciar estado das tabs
type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within Tabs');
  }
  return context;
}

// ============================================================================
// Tabs Container
// ============================================================================

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const activeTab = value !== undefined ? value : internalValue;
  
  const setActiveTab = (tab: string) => {
    if (value === undefined) {
      setInternalValue(tab);
    }
    onValueChange?.(tab);
  };
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ============================================================================
// TabsList - Container dos botões
// ============================================================================

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pills' | 'underline';
}

export function TabsList({
  children,
  className,
  variant = 'default',
  ...props
}: TabsListProps) {
  const baseStyles = 'flex items-center gap-1';
  
  const variantStyles = {
    default: 'bg-dark-800 p-1 rounded-lg',
    pills: 'gap-2',
    underline: 'border-b border-dark-700',
  };
  
  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// TabsTrigger - Botão individual
// ============================================================================

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export function TabsTrigger({
  value,
  children,
  className,
  disabled,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;
  
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-md transition-all',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================================================
// TabsContent - Conteúdo de cada tab
// ============================================================================

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: TabsContentProps) {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) return null;
  
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn('mt-4 animate-fadeIn', className)}
      {...props}
    >
      {children}
    </div>
  );
}

