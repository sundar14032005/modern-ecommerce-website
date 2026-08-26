import React, { useEffect, useState } from 'react';
import { useFilterParams } from '../hooks/useFilterParams';
import { useDebounce } from '../hooks/useDebounce';
import { getProducts } from '../services/productService';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { ActiveChips } from '../components/catalog/ActiveChips';
import { ViewSwitcher } from '../components/catalog/ViewSwitcher';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { QuickViewModal } from '../components/product-detail/QuickViewModal';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SORT_OPTIONS } from '../utils/constants';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';

export const CatalogPage = () => {
  const { filters, setFilter, updateFilters, resetFilters, getShareableUrl } = useFilterParams();
  const debouncedQuery = useDebounce(filters.query, 250);

  const [products, setProducts] = useState([]);
  const [facetCounts, setFacetCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch filtered data when filters or debounced query changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const queryFilters = { ...filters, query: debouncedQuery };

    getProducts(queryFilters, 120).then((res) => {
      if (isMounted) {
        setProducts(res.products);
        setFacetCounts(res.facets);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [
    debouncedQuery,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.vendor,
    filters.inStock,
    filters.sort
  ]);

  const handleRemoveSingleChip = (key) => {
    if (key === 'priceRange') {
      updateFilters({ minPrice: 0, maxPrice: 1000 });
    } else {
      setFilter(key, null);
    }
  };

  return (
    <div className="py-4">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Marketplace Catalog' }]} />

        {/* Catalog Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom gap-3">
          <div>
            <h2 className="fw-bold font-heading mb-1">Vendor-verified marketplace</h2>
            <p className="text-body-secondary small mb-0">
              Showing <strong>{products.length}</strong> results for your search
            </p>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2 catalog-controls-row">
            {/* Mobile Filter Toggle Button */}
            <button
              className="btn btn-outline-secondary d-lg-none d-flex align-items-center gap-1 rounded-pill"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="d-flex align-items-center gap-2">
              <span className="small text-body-secondary d-none d-sm-inline">
                <ArrowDownUp size={14} className="me-1" /> Sort:
              </span>
              <select
                className="form-select form-select-sm rounded-pill border-secondary-subtle font-semibold catalog-sort-select"
                value={filters.sort}
                onChange={(e) => setFilter('sort', e.target.value)}
                style={{ width: 'auto' }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Layout View Switcher (3-col, 4-col, list) */}
            <ViewSwitcher
              currentView={filters.view}
              onViewChange={(v) => setFilter('view', v)}
            />
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        <ActiveChips
          filters={filters}
          onRemoveFilter={handleRemoveSingleChip}
          onResetAll={resetFilters}
          getShareableUrl={getShareableUrl}
          totalResults={products.length}
        />

        {/* Main Grid & Facet Sidebar Layout */}
        <div className="row g-4">
          {/* Desktop Filter Sidebar */}
          <div className={`col-lg-3 ${showMobileFilters ? 'd-block' : 'd-none d-lg-block'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              facetCounts={facetCounts}
            />
          </div>

          {/* Main Product Grid */}
          <div className="col-lg-9">
            <ProductGrid
              products={products}
              loading={loading}
              view={filters.view}
              onQuickView={setQuickViewProduct}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>

      {/* Quick View Overlay Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
