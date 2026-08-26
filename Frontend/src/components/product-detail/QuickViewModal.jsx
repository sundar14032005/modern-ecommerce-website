import React, { useState } from 'react';
import { ShoppingBag, Heart, CheckCircle, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { RatingStars } from '../common/RatingStars';
import { QuantitySelector } from '../common/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="row g-4">
        {/* Gallery */}
        <div className="col-md-6 text-center">
          <div className="rounded-3 overflow-hidden bg-body-tertiary mb-3 position-relative">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="w-100 object-fit-cover"
              style={{ maxHeight: '320px' }}
            />
          </div>
          {product.images.length > 1 && (
            <div className="d-flex justify-content-center gap-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`rounded-2 object-fit-cover cursor-pointer border ${selectedImage === idx ? 'border-primary border-2' : ''}`}
                  style={{ width: '50px', height: '50px' }}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary-light text-primary rounded-pill px-2 py-1 small text-uppercase">
              {product.category}
            </span>
            <span className="small text-body-secondary d-flex align-items-center gap-1">
              By <strong>{product.vendorName}</strong>
              <CheckCircle size={12} className="text-primary fill-primary" />
            </span>
          </div>

          <h4 className="fw-bold font-heading mb-2">{product.title}</h4>

          <div className="mb-3">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          <div className="fs-3 fw-bold text-primary font-heading mb-3">
            {formatCurrency(product.price)}
            {product.originalPrice && (
              <span className="fs-6 text-body-secondary text-decoration-line-through ms-2 font-monospace">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="small text-body-secondary mb-4">{product.description}</p>

          <div className="d-flex flex-wrap align-items-center gap-3 mb-4 product-actions-row">
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              max={product.stock || 99}
            />
            <button
              className="btn btn-primary-gradient px-4 py-2 rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow product-add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>
            <button
              className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-secondary'} rounded-circle p-2`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="pt-3 border-top small text-body-secondary d-grid gap-2">
            <div className="d-flex align-items-center gap-2">
              <Truck size={16} className="text-primary" />
              <span>Ships in 24 hours from {product.vendorName}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck size={16} className="text-success" />
              <span>Authenticity & 30-Day Money Back Guarantee</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-top text-end">
            <Link to={`/product/${product.id}`} className="small text-primary text-decoration-none fw-bold" onClick={onClose}>
              View Full Product Page & Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
