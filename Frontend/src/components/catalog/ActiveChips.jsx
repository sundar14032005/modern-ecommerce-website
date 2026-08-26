import React, { useEffect, useState } from 'react';
import { X, RotateCcw, Share2, Check } from 'lucide-react';
import { getCategories } from '../../services/productService';
import { getVendors } from '../../services/vendorService';

export const ActiveChips = ({ filters, onRemoveFilter, onResetAll, getShareableUrl, totalResults }) => {
  const [copied, setCopied] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    getVendors().then(setVendors);
  }, []);

  const chips = [];

  if (filters.query) {
    chips.push({ key: 'query', label: `Search: "${filters.query}"` });
  }
  if (filters.category && filters.category !== 'all') {
    const categoryName = categories.find((c) => c.slug === filters.category)?.name || filters.category;
    chips.push({ key: 'category', label: `Category: ${categoryName}` });
  }
  if (filters.minPrice > 0 || filters.maxPrice < 1000) {
    chips.push({ key: 'priceRange', label: `Price: $${filters.minPrice} - $${filters.maxPrice}` });
  }
  if (filters.minRating > 0) {
    chips.push({ key: 'minRating', label: `Rating: ${filters.minRating}★ & above` });
  }
  if (filters.vendor && filters.vendor !== 'all') {
    const vendorName = vendors.find((v) => String(v.id) === String(filters.vendor))?.name || filters.vendor;
    chips.push({ key: 'vendor', label: `Vendor: ${vendorName}` });
  }
  if (filters.inStock) {
    chips.push({ key: 'inStock', label: 'In Stock Only' });
  }

  const handleCopyLink = () => {
    const url = getShareableUrl ? getShareableUrl() : window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (chips.length === 0) return null;

  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-3 p-3 glass-card rounded-3">
      <span className="small fw-bold text-body-secondary me-1">
        Active Filters ({totalResults} matches):
      </span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="badge bg-body-tertiary text-body border d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill small fw-normal"
        >
          {chip.label}
          <X
            size={14}
            className="ms-1 cursor-pointer text-danger hover-scale"
            onClick={() => onRemoveFilter(chip.key)}
          />
        </span>
      ))}

      <button
        className="btn btn-sm btn-link text-danger text-decoration-none ms-auto p-0 small fw-semibold d-flex align-items-center gap-1"
        onClick={onResetAll}
      >
        <RotateCcw size={14} />
        Clear All
      </button>

      <button
        className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-primary'} rounded-pill px-3 ms-2 small d-flex align-items-center gap-1`}
        onClick={handleCopyLink}
        title="Copy shareable URL with active filters"
      >
        {copied ? <Check size={14} /> : <Share2 size={14} />}
        <span>{copied ? 'Link Copied!' : 'Share Filtered URL'}</span>
      </button>
    </div>
  );
};
