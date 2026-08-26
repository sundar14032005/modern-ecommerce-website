import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVendorById } from '../services/vendorService';
import { ProductCard } from '../components/catalog/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CheckCircle, MapPin, Star, Calendar, ShieldCheck, Award, MessageSquare } from 'lucide-react';

export const VendorPage = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getVendorById(id)
      .then((v) => {
        setVendor(v);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-body-secondary">Loading Vendor Storefront...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="container py-5 text-center">
        <h4>Vendor Storefront Not Found</h4>
        <Link to="/catalog" className="btn btn-primary rounded-pill mt-3">Return to Marketplace</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="position-relative bg-dark" style={{ height: '220px' }}>
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-100 h-100 object-fit-cover opacity-50"
        />
        <div className="position-absolute bottom-0 start-0 w-100 bg-gradient-dark p-4"></div>
      </div>

      <div className="container position-relative" style={{ marginTop: '-60px' }}>
        {/* Vendor Header Card */}
        <div className="glass-card p-4 rounded-4 mb-5 shadow-lg">
          <div className="row align-items-center g-4">
            <div className="col-md-auto text-center text-md-start">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="rounded-circle object-fit-cover shadow border border-3 border-white"
                style={{ width: '110px', height: '110px' }}
              />
            </div>

            <div className="col-md">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2 justify-content-center justify-content-md-start">
                <h2 className="fw-bold font-heading mb-0">{vendor.name}</h2>
                {vendor.verified && (
                  <span className="badge bg-primary rounded-pill px-3 py-1 small d-flex align-items-center gap-1">
                    <CheckCircle size={14} /> VERIFIED SELLER
                  </span>
                )}
              </div>

              <p className="text-body-secondary mb-3 max-width-600">{vendor.bio}</p>

              <div className="d-flex flex-wrap gap-3 small text-body-secondary justify-content-center justify-content-md-start">
                <span className="d-flex align-items-center gap-1 text-warning fw-bold">
                  <Star size={16} fill="currentColor" /> {vendor.rating} ({vendor.reviewsCount} reviews)
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Award size={16} className="text-primary" /> {vendor.salesCount} Sales
                </span>
                <span className="d-flex align-items-center gap-1">
                  <MapPin size={16} /> {vendor.location}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Calendar size={16} /> Member since {vendor.joinDate}
                </span>
              </div>
            </div>

            <div className="col-md-auto text-center text-md-end">
              <button className="btn btn-outline-primary rounded-pill px-4 mb-2 d-flex align-items-center justify-content-center gap-2 w-100">
                <MessageSquare size={16} /> Contact Seller
              </button>
              <div className="small text-body-secondary">
                Response rate: <strong className="text-success">{vendor.responseRate}</strong>
              </div>
            </div>
          </div>

          {/* Badges Bar */}
          {vendor.badges && (
            <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
              {vendor.badges.map((b, idx) => (
                <span key={idx} className="badge bg-primary-light text-primary rounded-pill px-3 py-1 small fw-semibold">
                  <ShieldCheck size={12} className="me-1" /> {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Vendor Catalog */}
        <Breadcrumbs items={[{ label: 'Vendors', link: '/vendors' }, { label: vendor.name }]} />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold font-heading mb-0">Store Catalog ({vendor.products?.length || 0} Items)</h4>
        </div>

        <div className="row g-4 mb-5">
          {vendor.products?.map((prod) => (
            <div key={prod.id} className="col-lg-4 col-md-6">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
