import React from 'react';
import { Trash2 } from 'lucide-react';
import { QuantitySelector } from '../common/QuantitySelector';
import { formatCurrency } from '../../utils/formatters';

export const CartItem = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="d-flex gap-3 p-3 border-bottom align-items-center">
      <img
        src={item.images[0]}
        alt={item.title}
        className="rounded-3 object-fit-cover flex-shrink-0"
        style={{ width: '72px', height: '72px' }}
      />
      <div className="flex-grow-1 overflow-hidden">
        <h6 className="small fw-bold text-truncate mb-1">{item.title}</h6>
        <div className="small text-body-secondary mb-2">
          Vendor: <span className="fw-semibold text-body">{item.vendorName}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(newQty) => onUpdateQty(item.id, newQty)}
            max={item.stock || 99}
            size="sm"
          />
          <div className="text-end">
            <div className="fw-bold text-primary">{formatCurrency(item.price * item.quantity)}</div>
            {item.quantity > 1 && (
              <small className="text-body-secondary font-monospace">
                ({formatCurrency(item.price)} ea)
              </small>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-sm btn-link text-secondary p-1 ms-1 hover-scale"
        onClick={() => onRemove(item.id)}
        title="Remove Item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
