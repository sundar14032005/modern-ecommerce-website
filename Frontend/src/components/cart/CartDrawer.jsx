import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { PromoCodeForm } from './PromoCodeForm';
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer = () => {
  const { 
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    total,
    totalItemsCount
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1070, backdropFilter: 'blur(4px)' }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="position-fixed top-0 end-0 h-100 glass-card rounded-0 border-0 shadow-lg d-flex flex-column"
        style={{ maxWidth: '440px', width: '100%', zIndex: 1071 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h5 className="mb-0 font-heading fw-bold">Shopping Cart</h5>
            <span className="badge bg-primary rounded-pill">{totalItemsCount}</span>
          </div>
          <button className="btn btn-sm btn-outline-secondary rounded-circle border-0" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow-1 overflow-auto p-0">
          {cartItems.length === 0 ? (
            <div className="text-center py-5 px-4">
              <div className="rounded-circle bg-primary-light text-primary d-inline-flex p-4 mb-3">
                <ShoppingBag size={48} />
              </div>
              <h5 className="fw-bold mb-2">Your Cart is Empty</h5>
              <p className="small text-body-secondary mb-4">
                Looks like you haven't added any products yet. Explore our multi-vendor marketplace!
              </p>
              <button
                className="btn btn-primary-gradient px-4 rounded-pill"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/catalog');
                }}
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Financial Summary & Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 border-top bg-body-tertiary">
            <PromoCodeForm />

            <div className="d-grid gap-1 mb-3 small">
              <div className="d-flex justify-content-between text-body-secondary">
                <span>Subtotal</span>
                <span className="fw-semibold text-body">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="d-flex justify-content-between text-success">
                  <span>Promo Discount</span>
                  <span className="fw-semibold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between text-body-secondary">
                <span>Estimated Shipping</span>
                <span className="fw-semibold text-body">
                  {shippingFee === 0 ? <span className="text-success fw-bold">FREE</span> : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="d-flex justify-content-between text-body-secondary">
                <span>Estimated Tax (8%)</span>
                <span className="fw-semibold text-body">{formatCurrency(estimatedTax)}</span>
              </div>
              <div className="d-flex justify-content-between fs-5 fw-bold font-heading pt-2 border-top mt-1">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary-gradient w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow"
              onClick={handleCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="d-flex align-items-center justify-content-center gap-1 text-center mt-2 small text-body-secondary" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} className="text-success" />
              <span>Encrypted 256-Bit SSL Mock Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
