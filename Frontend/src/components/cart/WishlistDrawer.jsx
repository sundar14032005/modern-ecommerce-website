import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export const WishlistDrawer = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1070, backdropFilter: 'blur(4px)' }}
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        className="position-fixed top-0 end-0 h-100 glass-card rounded-0 border-0 shadow-lg d-flex flex-column"
        style={{ maxWidth: '420px', width: '100%', zIndex: 1071 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Heart size={20} className="text-danger fill-danger" />
            <h5 className="mb-0 font-heading fw-bold">My Saved Wishlist</h5>
            <span className="badge bg-danger rounded-pill">{wishlistItems.length}</span>
          </div>
          <button className="btn btn-sm btn-outline-secondary rounded-circle border-0" onClick={() => setIsWishlistOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-grow-1 overflow-auto p-3">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-5">
              <Heart size={48} className="text-secondary opacity-25 mb-3" />
              <h6 className="fw-bold">Your Wishlist is Empty</h6>
              <p className="small text-body-secondary">Save your favorite items here to purchase later.</p>
            </div>
          ) : (
            <div className="d-grid gap-3">
              {wishlistItems.map((item) => (
                <div key={item.id} className="d-flex gap-3 p-2 border rounded-3 align-items-center bg-body-tertiary">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="rounded-2 object-fit-cover"
                    style={{ width: '64px', height: '64px' }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="small fw-bold text-truncate mb-1">{item.title}</h6>
                    <div className="fw-bold text-primary small">{formatCurrency(item.price)}</div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <button
                      className="btn btn-sm btn-primary-gradient px-2 py-1 small"
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                      title="Move to Cart"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger border-0 px-2 py-1"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-3 border-top d-flex gap-2">
            <button className="btn btn-outline-secondary w-50" onClick={clearWishlist}>
              Clear All
            </button>
            <button
              className="btn btn-primary-gradient w-50"
              onClick={() => {
                wishlistItems.forEach((item) => addToCart(item));
                clearWishlist();
                setIsWishlistOpen(false);
              }}
            >
              Move All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
