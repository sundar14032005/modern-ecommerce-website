import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, CheckCircle, Eye } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';

export const ProductListItem = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  return (
    <div className="card glass-card border-0 mb-3 overflow-hidden hover-lift p-3">
      <div className="row g-3 align-items-center">
        {/* Product Image */}
        <div className="col-md-3 col-sm-4 text-center">
          <div className="rounded-3 overflow-hidden bg-body-tertiary position-relative">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-100 object-fit-cover"
                style={{ height: '150px' }}
              />
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 col-sm-8">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <span className="badge bg-primary-light text-primary rounded-pill px-2 py-1 small text-uppercase">
              {product.category}
            </span>
            <Link
              to={`/vendor/${product.vendorId}`}
              className="small text-body-secondary text-decoration-none d-flex align-items-center gap-1 text-truncate"
              style={{ minWidth: 0 }}
            >
              <span className="text-truncate">{product.vendorName}</span>
              <CheckCircle size={12} className="text-primary fill-primary flex-shrink-0" />
            </Link>
          </div>

          <h5 className="fw-bold font-heading mb-2">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-body">
              {product.title}
            </Link>
          </h5>

          <p className="small text-body-secondary text-truncate-2 mb-2">
            {product.description}
          </p>

          <div className="d-flex align-items-center gap-3">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={14} />
            {product.tags && product.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="badge bg-body-tertiary text-body-secondary border rounded-pill small">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions & Price */}
        <div className="col-md-3 text-md-end border-start-md pt-3 pt-md-0 d-flex flex-column justify-content-between h-100">
          <div>
            <div className="fs-4 fw-bold text-primary font-heading">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && (
              <span className="small text-body-secondary text-decoration-line-through font-monospace">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <small className="text-danger fw-semibold d-block mt-1">Only {product.stock} left!</small>
            )}
          </div>

          <div className="d-flex gap-2 mt-3 justify-content-md-end">
            <button
              className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-secondary'} rounded-circle p-2`}
              onClick={() => toggleWishlist(product)}
              title="Save to Wishlist"
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            {onQuickView && (
              <button
                className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                onClick={() => onQuickView(product)}
                title="Quick View"
              >
                <Eye size={16} />
              </button>
            )}

            <button
              className="btn btn-primary-gradient rounded-pill px-3 py-2 d-flex align-items-center gap-1 shadow-sm"
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
            >
              <ShoppingBag size={16} />
              <span className="small fw-bold">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
