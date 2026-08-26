import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

// BUG 1 & 2 fix: Scope the localStorage key by user ID so each user's wishlist
// is completely isolated. Guest wishlist lives under 'nexstore_wishlist_guest'.
const getStorageKey = (userId) =>
  userId ? `nexstore_wishlist_${userId}` : 'nexstore_wishlist_guest';

export const WishlistProvider = ({ userId, children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const local = localStorage.getItem(getStorageKey(userId));
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // BUG 1 & 2 fix: When the logged-in user changes (login/logout/switch account),
  // reload wishlist state from the new user-scoped key so:
  //   • On logout: shows an empty wishlist (guest key)
  //   • On login as User A: shows A's saved wishlist
  //   • On login as User B: shows B's saved wishlist, NOT A's
  useEffect(() => {
    try {
      const local = localStorage.getItem(getStorageKey(userId));
      setWishlistItems(local ? JSON.parse(local) : []);
    } catch {
      setWishlistItems([]);
    }
    setIsWishlistOpen(false);
  }, [userId]);

  // Persist wishlist to the user-scoped key whenever it changes.
  useEffect(() => {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(wishlistItems));
  }, [wishlistItems, userId]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
