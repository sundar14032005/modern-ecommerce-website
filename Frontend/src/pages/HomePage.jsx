import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Store, Star, TrendingUp } from 'lucide-react';
import { getProducts, getCategories } from '../services/productService';
import { getVendors } from '../services/vendorService';
import { ProductCard } from '../components/catalog/ProductCard';
import { QuickViewModal } from '../components/product-detail/QuickViewModal';
import { formatCurrency } from '../utils/formatters';
import { DEFAULT_FILTERS } from '../utils/constants';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealProduct, setDealProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getVendors().then(setVendors);

    getProducts({ ...DEFAULT_FILTERS, sort: 'featured', page: 1 }).then(({ products }) => {
      const featured = products.filter((p) => p.isFeatured).slice(0, 6);
      setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 6));

      const deal = products.find((p) => p.originalPrice && p.originalPrice > p.price);
      setDealProduct(deal || products[0] || null);
    });
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="position-relative overflow-hidden py-5" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="eyebrow mb-3" style={{ color: 'var(--accent-color)' }}>
                 VENDOR-VERIFIED MARKETPLACE
              </div>
              <h1 className="display-4 fw-600 font-heading mb-3" style={{ color: 'var(--paper)' }}>
                Find something <em style={{ fontStyle: 'italic', color: 'var(--accent-color)' }}>worth having</em> for.
              </h1>
              <p className="lead mb-4" style={{ color: 'rgba(238,239,231,0.72)', maxWidth: '480px' }}>
                Explore products from verified independent vendors, compare your options, and shop with confidence.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="btn btn-lg rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2"
                  style={{ background: 'var(--accent-color)', color: 'var(--ink)' }}
                >
                  <span>Start Shopping</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/vendors"
                  className="btn btn-lg rounded-pill px-4 py-3 fw-bold"
                  style={{ border: '1px solid rgba(238,239,231,0.3)', color: 'var(--paper)' }}
                >
                 Meet Our Vendors
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                  alt="A vendor's curated goods laid out for sale"
                  className="w-100 object-fit-cover hover-lift"
                  style={{ maxHeight: '420px', borderRadius: 'var(--border-radius-lg)', border: '1px solid rgba(238,239,231,0.15)' }}
                />
                {/* Floating ticket-stub deal card */}
                {dealProduct && (
                  <div
                    className="position-absolute bottom-0 start-0 m-4 p-3 d-none d-sm-block"
                    style={{
                      maxWidth: '260px',
                      background: 'var(--surface)',
                      color: 'var(--ink)',
                      borderRadius: 'var(--border-radius-md)',
                      boxShadow: 'var(--shadow-lift)',
                      border: '1px dashed var(--line)'
                    }}
                  >
                    <div className="eyebrow mb-2" style={{ color: 'var(--sale-color)', fontSize: '0.65rem' }}>
                      <Zap size={12} /> Deal of the day
                    </div>
                    <h6 className="fw-600 font-heading text-truncate mb-1">{dealProduct.title}</h6>
                    <div className="fw-bold font-mono" style={{ color: 'var(--primary-color)' }}>{formatCurrency(dealProduct.price)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="eyebrow mb-2 d-inline-flex">Browse by category</span>
              <h2 className="fw-600 font-heading mb-0">Many categories, one checkout</h2>
            </div>
            <Link to="/catalog" className="text-decoration-none fw-bold small d-flex align-items-center gap-1" style={{ color: 'var(--primary-color)' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {categories.map((cat, idx) => (
              <div key={cat.id} className="col-lg-4 col-md-6">
                <Link to={`/catalog?category=${cat.slug}`} className="text-decoration-none d-block h-100">
                  <div className="card ledger-card border overflow-hidden hover-lift h-100">
                    <div className="position-relative">
                      <img
                        src={cat.banner}
                        alt={cat.name}
                        className="w-100 object-fit-cover"
                        style={{ height: '160px' }}
                      />
                      <span
                        className="position-absolute top-0 start-0 m-2 font-mono px-2 py-1"
                        style={{ fontSize: '0.7rem', background: 'var(--surface)', color: 'var(--ink-soft)', borderRadius: 'var(--border-radius-sm)' }}
                      >
                        {String(idx + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-3">
                      <h5 className="fw-600 font-heading mb-1" style={{ color: 'var(--ink)' }}>{cat.name}</h5>
                      <small style={{ color: 'var(--ink-soft)' }}>{cat.description}</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Trending Products */}
      <section className="py-5" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="eyebrow mb-2 d-inline-flex">
                <TrendingUp size={14} /> Popular now
              </span>
              <h2 className="fw-600 font-heading mb-0">Trending this week</h2>
            </div>
            <Link to="/catalog?sort=featured" className="text-decoration-none fw-bold small d-flex align-items-center gap-1" style={{ color: 'var(--primary-color)' }}>
              View marketplace <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="col-lg-4 col-md-6">
                <ProductCard product={prod} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Verified Vendors Spotlight */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '560px' }}>
            <span className="eyebrow mb-2 justify-content-center">Multi-vendor marketplace</span>
            <h2 className="fw-600 font-heading mb-2">The sellers behind the storefront</h2>
            <p className="small" style={{ color: 'var(--ink-soft)' }}>
              Handpicked boutique creators, tech artisans, and official manufacturer storefronts — each one vetted before their first listing goes live.
            </p>
          </div>

          <div className="row g-4">
            {vendors.slice(0, 4).map((vendor) => (
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
                    {vendor.verified && <ShieldCheck size={16} style={{ color: 'var(--primary-color)' }} />}
                  </h6>
                  <div className="small fw-bold mb-2 font-mono d-flex align-items-center justify-content-center gap-1" style={{ color: 'var(--accent-color)' }}>
                    <Star size={14} fill="currentColor" />
                    {vendor.rating} ({vendor.salesCount} sales)
                  </div>
                  <p className="small text-truncate-2 mb-3" style={{ color: 'var(--ink-soft)' }}>{vendor.bio}</p>
                  <Link
                    to={`/vendor/${vendor.id}`}
                    className="btn btn-sm btn-outline-ink rounded-pill px-4 mt-auto w-100 d-flex align-items-center justify-content-center"
                  >
                    <Store size={14} className="me-1" /> Storefront
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
