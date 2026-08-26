import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PROMO_CODES } from '../utils/constants';

const CartContext = createContext();

// BUG 1 & 2 fix: Scope the localStorage key by user ID so each user's cart is
// completely isolated. When userId is null (logged out / guest), we use the key
// 'nexstore_cart_guest'. When a different user logs in, the key changes and the
// cart state reinitialises from the new key — User B can never see User A's cart.
const getStorageKey = (userId) =>
  userId ? `nexstore_cart_${userId}` : 'nexstore_cart_guest';

export const CartProvider = ({ userId, children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const local = localStorage.getItem(getStorageKey(userId));
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // BUG 1 & 2 fix: When the logged-in user changes (login/logout/switch account),
  // reload cart state from the new user-scoped key. This means:
  //   • On logout: userId becomes null → reads 'nexstore_cart_guest' (empty)
  //   • On login as User A: userId becomes A's id → reads A's saved cart
  //   • On login as User B: userId becomes B's id → reads B's saved cart (not A's)
  useEffect(() => {
    try {
      const local = localStorage.getItem(getStorageKey(userId));
      setCartItems(local ? JSON.parse(local) : []);
    } catch {
      setCartItems([]);
    }
    setAppliedPromo(null);
    setIsCartOpen(false);
  }, [userId]);

  // Persist cart to the user-scoped key whenever cart changes.
  useEffect(() => {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(cartItems));
  }, [cartItems, userId]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ id: Date.now(), msg, type });
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock || 99);
        showToast(`Updated "${product.title}" quantity to ${newQty}`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        showToast(`Added "${product.title}" to cart`);
        return [...prev, { ...product, quantity: Math.min(quantity, product.stock || 99) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from cart', 'info');
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock || 99;
          return { ...item, quantity: Math.min(newQty, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (codeStr) => {
    const key = codeStr.toUpperCase().trim();
    if (PROMO_CODES[key]) {
      setAppliedPromo(PROMO_CODES[key]);
      showToast(`Promo Code "${key}" applied!`, 'success');
      return { success: true, message: PROMO_CODES[key].label };
    } else {
      showToast('Invalid promo code. Try SAVE10 or FREESHIP', 'danger');
      return { success: false, message: 'Invalid code' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Financial Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo || !appliedPromo.discountPercent) return 0;
    return (subtotal * appliedPromo.discountPercent) / 100;
  }, [subtotal, appliedPromo]);

  const rawShipping = subtotal > 150 || (appliedPromo && appliedPromo.discountShipping) || cartItems.length === 0 ? 0 : 15.0;

  const estimatedTax = useMemo(() => {
    return (subtotal - discountAmount) * 0.08; // 8% sales tax
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + rawShipping + estimatedTax);
  }, [subtotal, discountAmount, rawShipping, estimatedTax]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee: rawShipping,
        estimatedTax,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        setToastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
