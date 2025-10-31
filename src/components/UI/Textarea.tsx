/**
 * Componente Textarea - Campo de texto multi-linha
 */

import { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      autoResize = false,
      showCharCount = false,
      maxLength,
      value,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    
    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [value, autoResize]);
    
    const charCount = typeof value === 'string' ? value.length : 0;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className={cn(
            'w-full px-4 py-2 bg-dark-800 border rounded-lg text-gray-100 placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors resize-none',
            error && 'border-red-500 focus:ring-red-500',
            !error && 'border-dark-600',
            className
          )}
          {...props}
        />
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
          
          {showCharCount && maxLength && (
            <p className="text-sm text-gray-500 ml-2">
              {charCount} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

