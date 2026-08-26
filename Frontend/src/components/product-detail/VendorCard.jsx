import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Star, Store, ArrowRight } from 'lucide-react';

export const VendorCard = ({ vendor }) => {
  if (!vendor) return null;

  return (
    <div className="glass-card p-4 rounded-3 mb-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="rounded-circle object-fit-cover shadow-sm"
          style={{ width: '60px', height: '60px' }}
        />
        <div>
          <h6 className="fw-bold font-heading mb-1 d-flex align-items-center gap-1">
            <span>{vendor.name}</span>
            {vendor.verified && <CheckCircle size={14} className="text-primary fill-primary" />}
          </h6>
          <div className="d-flex align-items-center gap-3 small text-body-secondary">
            <span className="d-flex align-items-center gap-1">
              <Star size={14} className="text-warning fill-warning" />
              <strong>{vendor.rating}</strong> ({vendor.reviewsCount})
            </span>
            <span className="d-flex align-items-center gap-1">
              <MapPin size={14} />
              {vendor.location}
            </span>
          </div>
        </div>
      </div>

      <p className="small text-body-secondary mb-3">{vendor.bio}</p>

      <div className="d-flex justify-content-between align-items-center pt-2 border-top">
        <div className="small">
          <span className="text-body-secondary">Response Rate: </span>
          <span className="fw-bold text-success">{vendor.responseRate}</span>
        </div>
        <Link
          to={`/vendor/${vendor.id}`}
          className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1"
        >
          <Store size={14} />
          <span>Visit Store</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
