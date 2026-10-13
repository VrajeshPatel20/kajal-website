import { useEffect, useRef, type ReactNode } from "react";
/** Native dialog provides modal semantics, focus containment, and Escape support. */
export function Modal({
  children,
  onClose,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const prior = document.activeElement as HTMLElement;
    const el = ref.current!;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = old;
      prior?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={label.startsWith("Look ") ? "look-modal" : undefined}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close dialog"
      >
        Close <span>×</span>
      </button>
      {children}
    </dialog>
  );
}
