import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes';
import { useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

// BUG 1 & 2 fix: CartProvider and WishlistProvider now require a userId prop to
// scope their localStorage keys per-user. They must be rendered *inside*
// AuthProvider so they can read the current user from AuthContext via useAuth().
// This inner component bridges the two — it reads userId from AuthContext and
// passes it down as a prop, so the cart and wishlist always know whose data to
// load, and automatically swap to the correct dataset on login/logout.
const UserScopedProviders = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  return (
    <CartProvider userId={userId}>
      <WishlistProvider userId={userId}>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserScopedProviders>
            <Layout>
              <AppRoutes />
            </Layout>
          </UserScopedProviders>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
