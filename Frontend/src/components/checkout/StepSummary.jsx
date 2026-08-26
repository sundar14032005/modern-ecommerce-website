import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const StepSummary = ({ formData, onPlaceOrder, onPrev, isSubmitting, shippingFee: shippingFeeOverride, total: totalOverride }) => {
  const { cartItems, subtotal, discountAmount, shippingFee: cartShippingFee, estimatedTax, total: cartTotal, appliedPromo } = useCart();
  const shippingFee = shippingFeeOverride ?? cartShippingFee;
  const total = totalOverride ?? cartTotal;

  return (
    <div>
      <h5 className="fw-bold font-heading mb-4">3. Final Order Review & Confirmation</h5>

      {/* Shipping & Payment Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="p-3 border rounded-3 bg-body-tertiary">
            <h6 className="fw-bold small mb-2 d-flex align-items-center gap-1">
              <Truck size={16} className="text-primary" />
              <span>Deliver To</span>
            </h6>
            <div className="small fw-semibold">{formData.fullName}</div>
            <div className="small text-body-secondary">{formData.address}, {formData.city}, {formData.state} {formData.zip}</div>
            <div className="small text-body-secondary">{formData.email} • {formData.phone}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded-3 bg-body-tertiary">
            <h6 className="fw-bold small mb-2 d-flex align-items-center gap-1">
              <CreditCard size={16} className="text-primary" />
              <span>Payment Method</span>
            </h6>
            <div className="small text-uppercase fw-bold">{formData.paymentMethod}</div>
            {formData.paymentMethod === 'card' && (
              <div className="small text-body-secondary font-monospace">
                •••• •••• •••• {formData.cardNumber ? formData.cardNumber.slice(-4) : '8892'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items Summary Table */}
      <div className="border rounded-3 p-3 bg-body-tertiary mb-4">
        <h6 className="fw-bold small mb-3">Order Items ({cartItems.length})</h6>
        <div className="d-grid gap-2 mb-3">
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center small">
              <div className="d-flex align-items-center gap-2">
                <img src={item.images[0]} alt={item.title} className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                <div>
                  <span className="fw-bold d-block text-truncate" style={{ maxWidth: '240px' }}>{item.title}</span>
                  <span className="text-body-secondary">Qty: {item.quantity} × {formatCurrency(item.price)}</span>
                </div>
              </div>
              <span className="fw-bold">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-top pt-3 small d-grid gap-1">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="d-flex justify-content-between text-success">
              <span>Discount ({appliedPromo?.code})</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <span>Shipping {formData.shippingSpeed === 'express' ? '(Express)' : '(Standard)'}</span>
            <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Estimated Tax</span>
            <span>{formatCurrency(estimatedTax)}</span>
          </div>
          <div className="d-flex justify-content-between fs-5 fw-bold font-heading pt-2 border-top text-primary">
            <span>Grand Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center pt-2">
        <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={onPrev}>
          Back to Payment
        </button>
        <button
          type="button"
          className="btn btn-success px-5 py-3 rounded-pill fw-bold fs-6 shadow d-flex align-items-center gap-2"
          onClick={onPlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner-border spinner-border-sm" role="status" />
          ) : (
            <ShieldCheck size={20} />
          )}
          <span>{isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}</span>
        </button>
      </div>
    </div>
  );
};
