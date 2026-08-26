import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { PromoCodeForm } from '../components/cart/PromoCodeForm';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { formatCurrency } from '../utils/formatters';
import { ShoppingBag, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    total,
    totalItemsCount
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="py-4">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h2 className="fw-bold font-heading mb-0 d-flex align-items-center gap-2">
            <ShoppingBag className="text-primary" size={28} />
            <span>Shopping Cart ({totalItemsCount} items)</span>
          </h2>
          {cartItems.length > 0 && (
            <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={clearCart}>
              <Trash2 size={14} className="me-1" /> Empty Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5 glass-card rounded-4 p-5 my-4">
            <ShoppingBag size={64} className="text-secondary opacity-25 mb-3" />
            <h4 className="fw-bold font-heading">Your Cart is Currently Empty</h4>
            <p className="text-body-secondary max-width-400 mx-auto mb-4">
              Explore our multi-vendor marketplace to discover tech gear, fashion, home decor, and gaming products.
            </p>
            <Link to="/catalog" className="btn btn-primary-gradient rounded-pill px-4 py-3 fw-bold">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {/* Items List */}
            <div className="col-lg-8">
              <div className="glass-card rounded-4 p-3 overflow-hidden">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQty={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="col-lg-4">
              <div className="glass-card rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                <h5 className="fw-bold font-heading mb-3">Order Summary</h5>

                <PromoCodeForm />

                <div className="d-grid gap-2 small mb-4">
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
                    <span>Shipping</span>
                    <span className="fw-semibold text-body">
                      {shippingFee === 0 ? <span className="text-success fw-bold">FREE</span> : formatCurrency(shippingFee)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between text-body-secondary">
                    <span>Estimated Tax (8%)</span>
                    <span className="fw-semibold text-body">{formatCurrency(estimatedTax)}</span>
                  </div>
                  <div className="d-flex justify-content-between fs-4 fw-bold font-heading pt-3 border-top text-primary">
                    <span>Grand Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  className="btn btn-primary-gradient w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-lg mb-3"
                  onClick={() => navigate('/checkout')}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div className="d-flex align-items-center justify-content-center gap-1 text-center small text-body-secondary">
                  <ShieldCheck size={16} className="text-success" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
