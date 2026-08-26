import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', zIndex: 1065 }}
      onClick={onClose}
    >
      <div
        className={`modal-dialog modal-${size} modal-dialog-centered`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content glass-card border-0 shadow-lg overflow-hidden">
          <div className="modal-header border-0 pb-0 pt-3 px-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title font-heading fw-bold">{title}</h5>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary border-0 rounded-circle p-1"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          <div className="modal-body p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
