import { memo, ReactNode } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export const ModalWrapper = memo(function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: ModalWrapperProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-[#090d12] border border-[#00ff66]/40 p-6 rounded-sm shadow-2xl z-10`}
        style={{ boxShadow: '0 0 30px rgba(0, 255, 102, 0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 mb-4">
          {title && (
            <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider glow-text-green">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#00ff66] transition-colors font-mono text-sm px-2 py-1"
          >
            ✕ [ESC]
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
});
