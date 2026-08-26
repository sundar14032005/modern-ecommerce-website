import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const PromoCodeForm = () => {
  const [inputCode, setInputCode] = useState('');
  const { appliedPromo, applyPromoCode, removePromoCode } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) setInputCode('');
  };

  if (appliedPromo) {
    return (
      <div className="alert alert-success d-flex align-items-center justify-content-between py-2 px-3 mb-3 rounded-3 small">
        <div className="d-flex align-items-center gap-2">
          <Tag size={16} />
          <span>
            Code <strong>{appliedPromo.code}</strong> Applied ({appliedPromo.label})
          </span>
        </div>
        <button
          className="btn btn-sm btn-link text-danger p-0"
          onClick={removePromoCode}
          title="Remove Coupon"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group input-group-sm">
        <span className="input-group-text bg-body-tertiary border-end-0">
          <Tag size={14} />
        </span>
        <input
          type="text"
          className="form-control border-start-0 text-uppercase"
          placeholder="Promo code (SAVE10, FREESHIP)"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button className="btn btn-outline-primary fw-semibold" type="submit">
          Apply
        </button>
      </div>
    </form>
  );
};
