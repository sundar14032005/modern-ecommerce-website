import React, { useEffect, useState } from 'react';
import { Filter, Star, CheckCircle, RotateCcw } from 'lucide-react';
import { getCategories } from '../../services/productService';
import { getVendors } from '../../services/vendorService';

export const FilterSidebar = ({ filters, onFilterChange, onResetFilters, facetCounts = {} }) => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    getVendors().then(setVendors);
  }, []);

  return (
    <div className="glass-card p-4 h-100">
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
        <div className="d-flex align-items-center gap-2 fw-bold font-heading fs-5">
          <Filter size={20} className="text-primary" />
          <span>Faceted Search</span>
        </div>
        <button
          className="btn btn-sm btn-link text-body-secondary text-decoration-none p-0"
          onClick={onResetFilters}
          title="Reset all filters"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* 1. Category Facet */}
      <div className="mb-4">
        <h6 className="fw-bold small text-uppercase tracking-wider text-body-secondary mb-3">
          Product Category
        </h6>
        <div className="d-grid gap-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id="cat-all"
              checked={filters.category === 'all'}
              onChange={() => onFilterChange('category', 'all')}
            />
            <label className="form-check-label d-flex justify-content-between w-100 small fw-medium" htmlFor="cat-all">
              <span>All Categories</span>
            </label>
          </div>
          {categories.map((cat) => {
            const count = facetCounts.categories?.[cat.slug] || 0;
            return (
              <div key={cat.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id={`cat-${cat.slug}`}
                  checked={filters.category === cat.slug}
                  onChange={() => onFilterChange('category', cat.slug)}
                />
                <label className="form-check-label d-flex justify-content-between w-100 small" htmlFor={`cat-${cat.slug}`}>
                  <span className={filters.category === cat.slug ? 'fw-bold text-primary' : ''}>
                    {cat.name}
                  </span>
                  <span className="badge bg-body-tertiary text-body-secondary rounded-pill">{count}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Slider Facet */}
      <div className="mb-4 pt-3 border-top">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold small text-uppercase tracking-wider text-body-secondary mb-0">
            Price Range
          </h6>
          <span className="small fw-bold text-primary font-monospace">
            ${filters.minPrice} - ${filters.maxPrice}
          </span>
        </div>
        <div className="d-flex gap-2 align-items-center mb-3">
          <div className="input-group input-group-sm">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', Number(e.target.value))}
              min="0"
              max="1000"
            />
          </div>
          <span className="text-secondary">-</span>
          <div className="input-group input-group-sm">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
              min="0"
              max="1000"
            />
          </div>
        </div>
        <input
          type="range"
          className="form-range"
          min="0"
          max="1000"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
        />
      </div>

      {/* 3. Customer Rating Facet */}
      <div className="mb-4 pt-3 border-top">
        <h6 className="fw-bold small text-uppercase tracking-wider text-body-secondary mb-3">
          Minimum Rating
        </h6>
        <div className="d-grid gap-2">
          {[4.5, 4.0, 3.5].map((ratingVal) => {
            const count = facetCounts.ratings?.[ratingVal] || 0;
            return (
              <div key={ratingVal} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="minRating"
                  id={`rating-${ratingVal}`}
                  checked={filters.minRating === ratingVal}
                  onChange={() =>
                    onFilterChange('minRating', filters.minRating === ratingVal ? 0 : ratingVal)
                  }
                />
                <label className="form-check-label d-flex justify-content-between align-items-center w-100 small" htmlFor={`rating-${ratingVal}`}>
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-bold">{ratingVal}</span>
                    <Star size={14} className="text-warning fill-warning" />
                    <span>& above</span>
                  </div>
                  <span className="badge bg-body-tertiary text-body-secondary rounded-pill">{count}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Multi-Vendor Facet */}
      <div className="mb-4 pt-3 border-top">
        <h6 className="fw-bold small text-uppercase tracking-wider text-body-secondary mb-3">
          Verified Vendors
        </h6>
        <div className="d-grid gap-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vendor"
              id="vendor-all"
              checked={filters.vendor === 'all'}
              onChange={() => onFilterChange('vendor', 'all')}
            />
            <label className="form-check-label small fw-medium" htmlFor="vendor-all">
              All Vendors
            </label>
          </div>
          {vendors.map((v) => {
            const count = facetCounts.vendors?.[v.id] || 0;
            return (
              <div key={v.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="vendor"
                  id={`vendor-${v.id}`}
                  checked={filters.vendor === v.id}
                  onChange={() => onFilterChange('vendor', v.id)}
                />
                <label className="form-check-label d-flex justify-content-between align-items-center w-100 small" htmlFor={`vendor-${v.id}`}>
                  <span className="d-flex align-items-center gap-1">
                    {v.name}
                    {v.verified && <CheckCircle size={12} className="text-primary fill-primary" />}
                  </span>
                  <span className="badge bg-body-tertiary text-body-secondary rounded-pill">{count}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. In-Stock Availability Toggle */}
      <div className="pt-3 border-top">
        <div className="form-check form-switch d-flex justify-content-between ps-0 align-items-center">
          <label className="form-check-label small fw-bold" htmlFor="inStockSwitch">
            In-Stock Items Only
          </label>
          <input
            className="form-check-input ms-auto"
            type="checkbox"
            role="switch"
            id="inStockSwitch"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};
