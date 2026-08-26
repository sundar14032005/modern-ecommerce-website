import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { WishlistDrawer } from '../cart/WishlistDrawer';
import { ToastContainer } from '../feedback/ToastContainer';

export const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <ToastContainer />
    </div>
  );
};
