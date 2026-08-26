import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="py-4">
      <div className="container">
        <Breadcrumbs items={[{ label: 'My Saved Wishlist' }]} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom gap-3">
          <div>
            <h2 className="fw-bold font-heading mb-1 d-flex align-items-center gap-2">
              <Heart className="text-danger fill-danger" size={28} />
              <span>My Saved Wishlist</span>
            </h2>
            <p className="text-body-secondary small mb-0">
              You have <strong>{wishlistItems.length}</strong> saved items in your personal wishlist
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger rounded-pill px-3" onClick={clearWishlist}>
                <Trash2 size={16} className="me-1" /> Clear Wishlist
              </button>
              <button
                className="btn btn-primary-gradient rounded-pill px-4 fw-bold"
                onClick={() => {
                  wishlistItems.forEach((item) => addToCart(item));
                  clearWishlist();
                }}
              >
                <ShoppingBag size={16} className="me-1" /> Move All to Cart
              </button>
            </div>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-5 glass-card rounded-4 p-5 my-4">
            <Heart size={64} className="text-secondary opacity-25 mb-3" />
            <h4 className="fw-bold font-heading">Your Wishlist is Empty</h4>
            <p className="text-body-secondary max-width-400 mx-auto mb-4">
              Click the heart icon on any product in the marketplace to save it here for later!
            </p>
            <Link to="/catalog" className="btn btn-primary-gradient rounded-pill px-4 py-2 fw-bold">
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {wishlistItems.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
