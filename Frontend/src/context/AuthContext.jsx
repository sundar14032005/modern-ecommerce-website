import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';
import { tokenStorage } from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (tokenStorage.getAccess()) {
      authService.getCurrentUser().then((u) => {
        if (isMounted) {
          // BUG 4 fix: getCurrentUser() already clears stale tokens internally
          // when /me/ fails (see authService.js). Here we just update user state.
          // If u is null the tokens were already cleared in authService — no
          // half-authenticated state with invalid tokens surviving in localStorage.
          setUser(u);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (identifier, password) => {
    const result = await authService.login({ identifier, password });
    if (result.success) setUser(result.user);
    return result;
  };

  const register = async (payload) => {
    const result = await authService.register(payload);
    if (result.success) setUser(result.user);
    return result;
  };

  const logout = async () => {
    // BUG 2 & 6 fix: authService.logout() now also calls the backend /auth/logout/
    // endpoint to blacklist the refresh token server-side. Setting user to null
    // causes App.jsx's UserScopedProviders to pass userId=null to CartProvider
    // and WishlistProvider, which automatically re-initializes them from the
    // guest key — effectively clearing the cart and wishlist UI instantly.
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: Boolean(user), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
