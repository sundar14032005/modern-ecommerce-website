import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ quantity, onQuantityChange, max = 99, min = 1, size = 'md' }) => {
  const isSm = size === 'sm';

  return (
    <div className={`input-group input-group-${size} rounded-pill overflow-hidden border`} style={{ width: isSm ? '110px' : '130px' }}>
      <button
        className="btn btn-outline-secondary border-0 px-2"
        type="button"
        onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
      >
        <Minus size={isSm ? 14 : 16} />
      </button>
      <span className="input-group-text border-0 bg-transparent text-center fw-bold flex-grow-1 px-1 justify-content-center">
        {quantity}
      </span>
      <button
        className="btn btn-outline-secondary border-0 px-2"
        type="button"
        onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        <Plus size={isSm ? 14 : 16} />
      </button>
    </div>
  );
};
