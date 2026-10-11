'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'lg',
  showCloseButton = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || (!isOpen && !isVisible)) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9A84C]/30 overflow-hidden transform transition-all duration-200 z-10 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2'
        }`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B2A4A]/10 bg-white/50 backdrop-blur-xs">
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className="text-xl font-heading font-bold text-[#1B2A4A] tracking-tight"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-[#5A607F] mt-0.5">{description}</p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-[#1B2A4A]/60 hover:text-[#1B2A4A] hover:bg-[#1B2A4A]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 max-h-[calc(85vh-8rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
