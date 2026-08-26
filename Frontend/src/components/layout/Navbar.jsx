import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Sun, Moon, Search, User, LogOut, Package } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchInputValue, setSearchInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchInputValue.trim())}`);
    } else {
      navigate("/catalog");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-nav py-3">
      <div className="container navbar-restructured">
        {/* Brand Wordmark */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none me-4"
          to="/"
        >
          <span
            className="rounded-circle border d-flex align-items-center justify-content-center"
            style={{
              width: 34,
              height: 34,
              borderColor: "var(--ink)",
              borderWidth: 1.5,
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            A·Z
          </span>
          <span
            className="fs-4 font-heading fw-600"
            style={{ color: "var(--ink)" }}
          >
            A-Z{" "}
            <span
              style={{ fontStyle: "italic", color: "var(--primary-color)" }}
            >
              Store
            </span>
          </span>
        </Link>

        {/* Actions & Counters — ALWAYS visible (not hidden behind hamburger) */}
        <div className="d-flex align-items-center gap-2 navbar-actions-group">
          {/* Theme Toggle */}
          <button
            className="btn rounded-circle p-2 border-0"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            style={{ color: "var(--ink-soft)" }}
          >
            {theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} style={{ color: "var(--accent-color)" }} />
            )}
          </button>

          {/* Wishlist Icon */}
          <button
            className="btn rounded-circle p-2 border-0 position-relative"
            onClick={() => setIsWishlistOpen(true)}
            title="View Wishlist"
            style={{ color: "var(--ink-soft)" }}
          >
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill font-mono"
                style={{
                  fontSize: "0.65rem",
                  background: "var(--sale-color)",
                }}
              >
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            className="btn btn-ink rounded-pill px-3 py-2 d-flex align-items-center gap-2 ms-1"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span className="fw-bold d-none d-sm-inline">Cart</span>
            <span
              className="badge rounded-pill fw-bold font-mono"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              {totalItemsCount}
            </span>
          </button>

          {/* Account */}
          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn rounded-circle p-2 border-0 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title={user?.username}
                style={{ color: "var(--ink-soft)" }}
              >
                <User size={20} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                  <span className="dropdown-item-text small text-body-secondary">
                    Hi, {user?.first_name || user?.username}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center gap-2" to="/account">
                    <Package size={15} /> My Orders
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={handleLogout}>
                    <LogOut size={15} /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn rounded-circle p-2 border-0"
              title="Log In / Register"
              style={{ color: "var(--ink-soft)" }}
            >
              <User size={20} />
            </Link>
          )}
        </div>

        {/* Main Search Bar — ALWAYS visible (own row on mobile, centered on desktop) */}
        <form
          className="d-flex mx-auto my-2 my-lg-0 position-relative navbar-search-form"
          style={{ maxWidth: "440px", width: "100%" }}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="form-control ps-4 pe-5 py-2 shadow-none"
            style={{
              borderRadius: "var(--border-radius-pill)",
              border: "1px solid var(--line)",
              background: "var(--surface-sunken)",
            }}
            placeholder="Search products, brands, categories…"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
            style={{ color: "var(--ink-soft)" }}
          >
            <Search size={18} />
          </button>
        </form>

        {/* Nav Links — ALWAYS visible on every screen size, no hamburger needed
            (only 3 items, so hiding them behind a menu just adds friction) */}
        <div className="navbar-links-row">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 mb-0">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 fw-medium ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link px-3 fw-medium ${
                  location.pathname === "/catalog" ? "active" : ""
                }`}
                to="/catalog"
              >
                Marketplace
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link px-3 fw-medium ${
                  location.pathname.startsWith("/vendors") ? "active" : ""
                }`}
                to="/vendors"
              >
                Vendors
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
