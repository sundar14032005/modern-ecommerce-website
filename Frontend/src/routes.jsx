import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { VendorsPage } from './pages/VendorsPage';
import { VendorPage } from './pages/VendorPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/vendors" element={<VendorsPage />} />
      <Route path="/vendor/:id" element={<VendorPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* Checkout stays open to guests — the backend accepts guest orders too;
          logging in just links the order to your account for order history. */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<CatalogPage />} />
    </Routes>
  );
};
