import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';

const vendorInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card ledger-card ticket-card border h-100 position-relative overflow-hidden hover-lift">
      {/* Product Image Box */}
      <div className="product-image-container text-center position-relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-100 object-fit-cover"
            style={{ height: '220px' }}
            loading="lazy"
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="position-absolute top-0 start-0 p-3 d-flex flex-column gap-1 align-items-start z-1">
          {product.isNew && (
            <span
              className="badge rounded-pill px-2 py-1 small fw-bold font-mono"
              style={{ background: 'var(--ink)', color: 'var(--paper)', fontSize: '0.65rem' }}
            >
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span
              className="badge rounded-pill px-2 py-1 small fw-bold font-mono"
              style={{ background: 'var(--sale-color)', color: '#fff', fontSize: '0.65rem' }}
            >
              −{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className="btn btn-sm rounded-circle position-absolute top-0 end-0 m-3 p-2 border-0 shadow-sm z-1"
          onClick={() => toggleWishlist(product)}
          title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            background: isLiked ? 'var(--sale-color)' : 'var(--surface)',
            color: isLiked ? '#fff' : 'var(--ink-soft)'
          }}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button Overlay */}
        {onQuickView && (
          <div className="position-absolute bottom-0 start-0 end-0 p-2 d-flex justify-content-center opacity-0 hover-opacity-100 transition-normal" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
            <button
              className="btn btn-sm rounded-pill px-3 py-1 fw-semibold shadow-sm d-flex align-items-center gap-1"
              onClick={() => onQuickView(product)}
              style={{ background: 'var(--surface)', color: 'var(--ink)' }}
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        )}
      </div>

      {/* Perforated ticket-tear divider */}
      <div className="ticket-divider mx-1" />

      {/* Card Body */}
      <div className="card-body d-flex flex-column p-3">
        {/* Vendor stamp + category tag */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link
            to={`/vendor/${product.vendorId}`}
            className="text-decoration-none d-flex align-items-center gap-2 text-truncate"
            style={{ minWidth: 0 }}
          >
            <span className="vendor-stamp">{vendorInitials(product.vendorName)}</span>
            <span className="small fw-medium text-truncate" style={{ color: 'var(--ink-soft)' }}>{product.vendorName}</span>
          </Link>
          <span className="font-mono text-uppercase flex-shrink-0 ms-2" style={{ fontSize: '0.65rem', letterSpacing: '0.06em', color: 'var(--ink-faint)' }}>
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h6 className="card-title font-heading fw-600 text-truncate-2 mb-2" style={{ minHeight: '40px' }}>
          <Link to={`/product/${product.id}`} className="text-decoration-none" style={{ color: 'var(--ink)' }}>
            {product.title}
          </Link>
        </h6>

        {/* Ratings */}
        <div className="mb-2">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={14} />
        </div>

        {/* Price & Stock */}
        <div className="mt-auto pt-3 rule d-flex align-items-center justify-content-between">
          <div>
            <div className="d-flex align-items-baseline gap-2">
              <span className="fs-5 fw-bold font-mono" style={{ color: 'var(--primary-color)' }}>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="small font-mono text-decoration-line-through" style={{ color: 'var(--ink-faint)' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <small className="fw-semibold d-block" style={{ fontSize: '0.7rem', color: 'var(--sale-color)' }}>
                Only {product.stock} left in stock!
              </small>
            )}
          </div>

          <button
            className="btn btn-ink rounded-pill px-3 py-2 d-flex align-items-center gap-1"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
          >
            <ShoppingBag size={16} />
            <span className="small fw-bold d-none d-sm-inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
