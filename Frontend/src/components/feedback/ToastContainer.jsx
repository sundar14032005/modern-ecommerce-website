import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastContainer = () => {
  const { toastMessage, setToastMessage } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  const getIcon = () => {
    switch (toastMessage.type) {
      case 'danger':
        return <AlertCircle className="text-danger flex-shrink-0" size={20} />;
      case 'info':
        return <Info className="text-info flex-shrink-0" size={20} />;
      case 'success':
      default:
        return <CheckCircle2 className="text-success flex-shrink-0" size={20} />;
    }
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090, maxWidth: '400px' }}
    >
      <div className="toast show align-items-center border-0 shadow-lg glass-card p-3 d-flex justify-content-between gap-3 rounded-3">
        <div className="d-flex align-items-center gap-2">
          {getIcon()}
          <span className="small fw-semibold text-body">{toastMessage.msg}</span>
        </div>
        <button
          type="button"
          className="btn-close btn-close-white ms-auto flex-shrink-0"
          onClick={() => setToastMessage(null)}
        />
      </div>
    </div>
  );
};
