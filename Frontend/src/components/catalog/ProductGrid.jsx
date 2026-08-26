import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductListItem } from './ProductListItem';
import { SkeletonCard } from '../feedback/SkeletonCard';
import { EmptyState } from '../feedback/EmptyState';

export const ProductGrid = ({
  products = [],
  loading = false,
  view = 'grid3',
  onQuickView,
  onResetFilters
}) => {
  if (loading) {
    const skeletonCount = view === 'grid4' ? 8 : 6;
    return (
      <div className="row g-4">
        {[...Array(skeletonCount)].map((_, i) => (
          <div
            key={i}
            className={
              view === 'list'
                ? 'col-12'
                : view === 'grid4'
                ? 'col-xl-3 col-lg-4 col-sm-6'
                : 'col-lg-4 col-sm-6'
            }
          >
            <SkeletonCard view={view} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="row g-4 mb-4">
      {products.map((product) => (
        <div
          key={product.id}
          className={
            view === 'list'
              ? 'col-12'
              : view === 'grid4'
              ? 'col-xl-3 col-lg-4 col-sm-6'
              : 'col-lg-4 col-sm-6'
          }
        >
          {view === 'list' ? (
            <ProductListItem product={product} onQuickView={onQuickView} />
          ) : (
            <ProductCard product={product} onQuickView={onQuickView} />
          )}
        </div>
      ))}
    </div>
  );
};
