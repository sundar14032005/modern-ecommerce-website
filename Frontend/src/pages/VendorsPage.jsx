import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Star, Store, Search } from 'lucide-react';
import { getVendors } from '../services/vendorService';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    getVendors().then((data) => {
      if (isMounted) {
        setVendors(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVendors = vendors.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.bio.toLowerCase().includes(q) || v.location.toLowerCase().includes(q);
  });

  return (
    <div className="py-4">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Vendors' }]} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom gap-3">
          <div>
            <h2 className="fw-bold font-heading mb-1">Our Verified Vendors</h2>
            <p className="text-body-secondary small mb-0">
              {loading ? 'Loading storefronts…' : `${filteredVendors.length} vendor storefront${filteredVendors.length === 1 ? '' : 's'} on the marketplace`}
            </p>
          </div>

          <div className="position-relative" style={{ maxWidth: '320px', width: '100%' }}>
            <input
              type="text"
              className="form-control ps-4 pe-5 py-2 shadow-none"
              style={{
                borderRadius: 'var(--border-radius-pill)',
                border: '1px solid var(--line)',
                background: 'var(--surface-sunken)'
              }}
              placeholder="Search vendors by name or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search
              size={16}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ color: 'var(--ink-soft)' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="row g-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="card ledger-card border p-4 h-100">
                  <div className="skeleton-box rounded-circle mx-auto mb-3" style={{ width: '76px', height: '76px' }} />
                  <div className="skeleton-box mb-2 mx-auto" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton-box mb-2 mx-auto" style={{ height: '12px', width: '50%' }} />
                  <div className="skeleton-box mx-auto" style={{ height: '32px', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-5 glass-card my-4 p-5">
            <div className="rounded-circle bg-primary-light text-primary d-inline-flex p-4 mb-3">
              <Store size={48} />
            </div>
            <h4 className="font-heading fw-bold mb-2">No Vendors Found</h4>
            <p className="text-body-secondary max-width-400 mx-auto mb-4">
              Try a different search term to find the vendor you're looking for.
            </p>
            {query && (
              <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => setQuery('')}>
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="col-lg-3 col-md-6">
                <div className="card ledger-card border text-center p-4 h-100 hover-lift">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="rounded-circle object-fit-cover mx-auto mb-3"
                    style={{ width: '76px', height: '76px', border: '1px solid var(--line)' }}
                  />
                  <h6 className="fw-600 font-heading mb-1 d-flex align-items-center justify-content-center gap-1">
                    <span>{vendor.name}</span>
                    {vendor.verified && <CheckCircle size={16} className="fill-primary" style={{ color: 'var(--primary-color)' }} />}
                  </h6>
                  <div className="small fw-bold mb-2 font-mono d-flex align-items-center justify-content-center gap-1" style={{ color: 'var(--accent-color)' }}>
                    <Star size={14} fill="currentColor" />
                    {vendor.rating} ({vendor.salesCount} sales)
                  </div>
                  <div className="small d-flex align-items-center justify-content-center gap-1 mb-2" style={{ color: 'var(--ink-soft)' }}>
                    <MapPin size={12} />
                    {vendor.location}
                  </div>
                  <p className="small text-truncate-2 mb-3" style={{ color: 'var(--ink-soft)' }}>{vendor.bio}</p>
                  <Link
                    to={`/vendor/${vendor.id}`}
                    className="btn btn-sm btn-outline-ink rounded-pill px-4 mt-auto w-100 d-flex align-items-center justify-content-center"
                  >
                    <Store size={14} className="me-1" /> View Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
