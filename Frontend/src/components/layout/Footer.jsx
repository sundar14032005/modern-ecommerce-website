import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Headphones, Github, Twitter, Linkedin } from 'lucide-react';

const VALUE_PROPS = [
  { icon: Truck, title: 'Free global shipping', desc: 'On all orders over $150' },
  { icon: ShieldCheck, title: 'Verified vendors', desc: '100% buyer protection' },
  { icon: RotateCcw, title: '30-day easy returns', desc: 'Hassle-free guarantee' },
  { icon: Headphones, title: '24/7 priority support', desc: 'Dedicated live agent help' }
];

export const Footer = () => {
  return (
    <footer className="mt-auto pt-5 pb-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        {/* Value Props */}
        <div className="row g-4 mb-5 pb-4 rule text-center text-md-start">
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <div className="col-md-3 col-sm-6" key={title}>
              <div className="footer-benefit-item">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: 'var(--primary-soft)', color: 'var(--primary-color)' }}>
                  <Icon size={22} />
                </div>
                <div className="text-start">
                  <h6 className="fw-600 font-heading mb-0">{title}</h6>
                  <small style={{ color: 'var(--ink-soft)' }}>{desc}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="row g-4 mb-4 text-center text-md-start">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
              <span
                className="rounded-circle border d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32, borderColor: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--ink)' }}
              >
                N·S
              </span>
              <span className="fs-5 font-heading fw-600">A-Z Store Marketplace</span>
            </div>
            <p className="small pe-lg-4" style={{ color: 'var(--ink-soft)' }}>
              A multi-vendor catalog with URL-shareable filters, live facet counts, and a cart that never loses your place.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-2">
              <a href="#" className="btn btn-sm btn-outline-ink rounded-circle"><Github size={16} /></a>
              <a href="#" className="btn btn-sm btn-outline-ink rounded-circle"><Twitter size={16} /></a>
              <a href="#" className="btn btn-sm btn-outline-ink rounded-circle"><Linkedin size={16} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="eyebrow mb-3 justify-content-center justify-content-md-start">Categories</h6>
            <ul className="list-unstyled small d-grid gap-2">
              <li><Link to="/catalog?category=electronics" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Electronics & Tech</Link></li>
              <li><Link to="/catalog?category=fashion" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Fashion & Apparel</Link></li>
              <li><Link to="/catalog?category=home" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Home & Living</Link></li>
              <li><Link to="/catalog?category=gaming" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Gaming & Gear</Link></li>
              <li><Link to="/catalog?category=beauty" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Beauty & Wellness</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="eyebrow mb-3 justify-content-center justify-content-md-start">Marketplace</h6>
            <ul className="list-unstyled small d-grid gap-2">
              <li><Link to="/catalog" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>All products</Link></li>
              <li><Link to="/vendors" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>All vendors</Link></li>
              <li><Link to="/catalog?sort=newest" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>New arrivals</Link></li>
              <li><Link to="/catalog?sort=rating_desc" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>Top-rated sellers</Link></li>
              <li><Link to="/cart" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>View cart</Link></li>
              <li><Link to="/wishlist" className="text-decoration-none" style={{ color: 'var(--ink-soft)' }}>My wishlist</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h6 className="eyebrow mb-3 justify-content-center justify-content-md-start">Subscribe to offers</h6>
            <p className="small" style={{ color: 'var(--ink-soft)' }}>Get exclusive coupons (like SAVE10) and new-vendor alerts, once in a while — never a flood.</p>
            <div className="input-group">
              <input type="email" className="form-control" style={{ border: '1px solid var(--line)' }} placeholder="Enter your email address" />
              <button className="btn btn-ink" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 rule small" style={{ color: 'var(--ink-faint)' }}>
          <p className="mb-0">© 2026 NexStore Marketplace.</p>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <a href="#" className="text-decoration-none" style={{ color: 'var(--ink-faint)' }}>Privacy Policy</a>
            <a href="#" className="text-decoration-none" style={{ color: 'var(--ink-faint)' }}>Terms of Service</a>
            <a href="#" className="text-decoration-none" style={{ color: 'var(--ink-faint)' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
