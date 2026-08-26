import React from 'react';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

export const StepPayment = ({ formData, onChange, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="fw-bold font-heading mb-4">2. Payment Details</h5>

      <div className="mb-4">
        <label className="form-label small fw-bold mb-3">Select Payment Method</label>
        <div className="row g-3">
          <div className="col-md-4">
            <div
              className={`p-3 border rounded-3 text-center cursor-pointer ${
                formData.paymentMethod === 'card' ? 'border-primary bg-primary-light text-primary fw-bold' : 'bg-body-tertiary'
              }`}
              onClick={() => onChange('paymentMethod', 'card')}
            >
              <CreditCard size={24} className="mb-2" />
              <div className="small">Credit / Debit Card</div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`p-3 border rounded-3 text-center cursor-pointer ${
                formData.paymentMethod === 'upi' ? 'border-primary bg-primary-light text-primary fw-bold' : 'bg-body-tertiary'
              }`}
              onClick={() => onChange('paymentMethod', 'upi')}
            >
              <ShieldCheck size={24} className="mb-2" />
              <div className="small">UPI / Instant Bank</div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`p-3 border rounded-3 text-center cursor-pointer ${
                formData.paymentMethod === 'paypal' ? 'border-primary bg-primary-light text-primary fw-bold' : 'bg-body-tertiary'
              }`}
              onClick={() => onChange('paymentMethod', 'paypal')}
            >
              <Lock size={24} className="mb-2" />
              <div className="small">PayPal Express</div>
            </div>
          </div>
        </div>
      </div>

      {formData.paymentMethod === 'card' && (
        <div className="row g-3 bg-body-tertiary p-3 rounded-3 border">
          <div className="col-12">
            <label className="form-label small fw-bold">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="John Doe"
              value={formData.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Card Number</label>
            <div className="input-group">
              <span className="input-group-text"><CreditCard size={16} /></span>
              <input
                type="text"
                className="form-control font-monospace"
                required
                maxLength="19"
                placeholder="4532 •••• •••• 8892"
                value={formData.cardNumber}
                onChange={(e) => onChange('cardNumber', e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 col-6">
            <label className="form-label small fw-bold">Expiry Date</label>
            <input
              type="text"
              className="form-control font-monospace"
              required
              placeholder="MM/YY"
              value={formData.cardExp}
              onChange={(e) => onChange('cardExp', e.target.value)}
            />
          </div>
          <div className="col-md-6 col-6">
            <label className="form-label small fw-bold">CVC / CVV</label>
            <input
              type="password"
              className="form-control font-monospace"
              required
              maxLength="4"
              placeholder="•••"
              value={formData.cardCvc}
              onChange={(e) => onChange('cardCvc', e.target.value)}
            />
          </div>
        </div>
      )}

      {formData.paymentMethod === 'upi' && (
        <div className="p-3 bg-body-tertiary rounded-3 border">
          <label className="form-label small fw-bold">Enter VPA / UPI ID</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="john@okaxis / 9876543210@paytm"
            value={formData.upiId || ''}
            onChange={(e) => onChange('upiId', e.target.value)}
          />
        </div>
      )}

      {formData.paymentMethod === 'paypal' && (
        <div className="p-4 bg-body-tertiary rounded-3 border text-center">
          <p className="small text-body-secondary mb-0">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
        <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={onPrev}>
          Back to Shipping
        </button>
        <button type="submit" className="btn btn-primary-gradient px-5 py-2 rounded-pill fw-bold">
          Review Order
        </button>
      </div>
    </form>
  );
};
