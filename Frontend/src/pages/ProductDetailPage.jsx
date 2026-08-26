import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../services/productService';
import { getVendorById } from '../services/vendorService';
import { ImageGallery } from '../components/product-detail/ImageGallery';
import { ProductSpecs } from '../components/product-detail/ProductSpecs';
import { ReviewSection } from '../components/product-detail/ReviewSection';
import { VendorCard } from '../components/product-detail/VendorCard';
import { ProductCard } from '../components/catalog/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { RatingStars } from '../components/common/RatingStars';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, CheckCircle } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
        getVendorById(prod.vendorId).then((v) => setVendor(v)).catch(() => {});
        getRelatedProducts(prod.category, prod.id, 3).then((rel) => setRelated(rel));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-body-secondary">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product Not Found</h4>
        <Link to="/catalog" className="btn btn-primary rounded-pill mt-3">Return to Marketplace</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  return (
    <div className="py-4">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: 'Marketplace', link: '/catalog' },
            { label: product.category, link: `/catalog?category=${product.category}` },
            { label: product.title }
          ]}
        />

        {/* Main Product Info */}
        <div className="row g-5 mb-5">
          {/* Gallery */}
          <div className="col-lg-6">
            <ImageGallery images={product.images} />
          </div>

          {/* Details & Actions */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary-light text-primary rounded-pill px-3 py-1 text-uppercase fw-bold">
                {product.category}
              </span>
              <Link to={`/vendor/${product.vendorId}`} className="small text-body-secondary text-decoration-none d-flex align-items-center gap-1">
                <span>By {product.vendorName}</span>
                <CheckCircle size={12} className="text-primary fill-primary" />
              </Link>
            </div>

            <h1 className="display-6 fw-extrabold font-heading mb-3">{product.title}</h1>

            <div className="mb-3">
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={18} />
            </div>

            <div className="fs-2 fw-bold text-primary font-heading mb-3">
              {formatCurrency(product.price)}
              {product.originalPrice && (
                <span className="fs-5 text-body-secondary text-decoration-line-through ms-3 font-monospace">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="lead text-body-secondary mb-4 fs-6">{product.description}</p>

            {/* Stock status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill small">
                  In Stock ({product.stock} units available)
                </span>
              ) : (
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill small">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4 product-actions-row">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={product.stock || 99}
              />
              <button
                className="btn btn-primary-gradient px-4 py-3 rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-lg fw-bold product-add-to-cart-btn"
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              <button
                className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-secondary'} rounded-circle p-3 shadow-sm`}
                onClick={() => toggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust Perks */}
            <div className="glass-card p-3 rounded-3 d-grid gap-2 small">
              <div className="d-flex align-items-center gap-2">
                <Truck size={16} className="text-primary" />
                <span>Free Insured Shipping on orders over $150</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <RotateCcw size={16} className="text-success" />
                <span>30-Day Money Back Easy Return Policy</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-info" />
                <span>Verified Authentic Item from {product.vendorName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor & Specs Grid */}
        <div className="row g-4 mb-5">
          <div className="col-lg-4">
            <VendorCard vendor={vendor} />
          </div>
          <div className="col-lg-8">
            <ProductSpecs attributes={product.attributes} />
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-5">
          <ReviewSection
            reviews={product.reviews}
            rating={product.rating}
            totalReviews={product.reviewsCount}
          />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h4 className="fw-bold font-heading mb-4">You May Also Like</h4>
            <div className="row g-4">
              {related.map((rel) => (
                <div key={rel.id} className="col-lg-4 col-md-6">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
