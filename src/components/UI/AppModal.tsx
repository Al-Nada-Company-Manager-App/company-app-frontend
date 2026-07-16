import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { FormInstance } from "antd";
import { useDirtyForm } from "@src/hooks/useDirtyForm";
import { useThemeContext } from "@src/contexts/theme";

export interface AppModalProps {
  open: boolean;
  onCancel: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  form?: FormInstance;
  isLoading?: boolean;
  width?: number | string;
  footer?: React.ReactNode;
  className?: string;
  centered?: boolean;
  zIndex?: number;
  style?: React.CSSProperties;
}

export const AppModal: React.FC<AppModalProps> = ({
  open,
  onCancel,
  title,
  children,
  form,
  isLoading,
  width = 800,
  footer,
  className = "",
  zIndex = 1000,
  style,
}) => {
  const { theme } = useThemeContext();
  const { confirmDiscard } = useDirtyForm(form);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleCancel = () => {
    if (isLoading) return;
    confirmDiscard(() => onCancel());
  };

  // Keyboard support for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isLoading, confirmDiscard, onCancel]);

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className={`relative flex flex-col w-full max-h-[100dvh] shadow-2xl rounded-2xl overflow-hidden ${className}`}
            style={{
              width: "100%",
              maxWidth: typeof width === "number" ? `${width}px` : width,
              background: theme?.modal?.background || "#ffffff",
              color: theme?.modal?.color || "#000000",
              border: `1px solid ${theme?.row?.borderColor || "#e5e7eb"}`,
              ...style,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          >
            {/* Header */}
            {title && (
              <div
                className="flex items-center justify-between px-6 py-4 border-b shrink-0"
                style={{ borderColor: theme?.row?.borderColor || "#e5e7eb" }}
              >
                <div className="text-xl font-bold tracking-wide">
                  {title}
                </div>
                {!isLoading && (
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 custom-scrollbar w-full">
              {children}
            </div>

            {/* Footer */}
            {footer !== null && (
              <div
                className="px-6 py-4 border-t shrink-0 flex items-center justify-end"
                style={{ borderColor: theme?.row?.borderColor || "#e5e7eb" }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
};

export default AppModal;
