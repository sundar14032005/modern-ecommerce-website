import React from 'react';
import { User, Mail, Phone, MapPin, Truck } from 'lucide-react';

export const StepShipping = ({ formData, onChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="fw-bold font-heading mb-4">1. Shipping & Contact Information</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label small fw-bold">Full Name *</label>
          <div className="input-group">
            <span className="input-group-text bg-body-tertiary"><User size={16} /></span>
            <input
              type="text"
              className="form-control"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold">Email Address *</label>
          <div className="input-group">
            <span className="input-group-text bg-body-tertiary"><Mail size={16} /></span>
            <input
              type="email"
              className="form-control"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold">Phone Number *</label>
          <div className="input-group">
            <span className="input-group-text bg-body-tertiary"><Phone size={16} /></span>
            <input
              type="tel"
              className="form-control"
              required
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold">Street Address *</label>
          <div className="input-group">
            <span className="input-group-text bg-body-tertiary"><MapPin size={16} /></span>
            <input
              type="text"
              className="form-control"
              required
              placeholder="123 Market St, Suite 400"
              value={formData.address}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-bold">City *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="San Francisco"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-bold">State / Province *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="CA"
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-bold">ZIP / Postal Code *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="94103"
            value={formData.zip}
            onChange={(e) => onChange('zip', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-top">
        <label className="form-label small fw-bold mb-3 d-flex align-items-center gap-2">
          <Truck size={18} className="text-primary" />
          <span>Shipping Speed</span>
        </label>
        <div className="d-grid gap-2">
          <div className="form-check p-3 border rounded-3 bg-body-tertiary">
            <input
              className="form-check-input ms-0 me-3"
              type="radio"
              name="shippingSpeed"
              id="standardShip"
              checked={formData.shippingSpeed === 'standard'}
              onChange={() => onChange('shippingSpeed', 'standard')}
            />
            <label className="form-check-label d-flex justify-content-between w-100" htmlFor="standardShip">
              <div>
                <strong className="d-block">Standard Delivery (3-5 Business Days)</strong>
                <small className="text-body-secondary">Free on orders over $150</small>
              </div>
              <span className="fw-bold">FREE</span>
            </label>
          </div>
          <div className="form-check p-3 border rounded-3 bg-body-tertiary">
            <input
              className="form-check-input ms-0 me-3"
              type="radio"
              name="shippingSpeed"
              id="expressShip"
              checked={formData.shippingSpeed === 'express'}
              onChange={() => onChange('shippingSpeed', 'express')}
            />
            <label className="form-check-label d-flex justify-content-between w-100" htmlFor="expressShip">
              <div>
                <strong className="d-block">Express Air Shipping (1-2 Business Days)</strong>
                <small className="text-body-secondary">Priority courier dispatch</small>
              </div>
              <span className="fw-bold text-primary">$19.99</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 text-end">
        <button type="submit" className="btn btn-primary-gradient px-5 py-2 rounded-pill fw-bold">
          Continue to Payment
        </button>
      </div>
    </form>
  );
};
