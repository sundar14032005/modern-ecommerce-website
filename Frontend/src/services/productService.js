import { apiClient } from './apiClient';

// The Product model in Django is snake_case; every component in this app
// was built against the original camelCase mock data shape, so we map
// field names here in one place rather than touching every component.
const mapProduct = (p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  description: p.description,
  price: Number(p.price),
  originalPrice: p.original_price !== null && p.original_price !== undefined ? Number(p.original_price) : null,
  category: p.category_slug,
  vendorId: p.vendor_id,
  vendorName: p.vendor_name,
  images: p.images || [],
  tags: p.tags || [],
  attributes: p.attributes || {},
  stock: p.stock,
  rating: p.rating,
  reviewsCount: p.reviews_count,
  isFeatured: p.is_featured,
  isNew: p.is_new,
  // Individual written reviews aren't modeled on the backend yet — only the
  // aggregate rating/reviewsCount are. ReviewSection already renders an
  // empty-state message when this is [].
  reviews: [],
  createdAt: p.created_at
});

// 1. Get Products (with filtering, sorting, and pagination)
export const getProducts = async (filters) => {
  try {
    // Map React filters to Django query parameters
    const params = new URLSearchParams();
    if (filters.query) params.append('search', filters.query);
    if (filters.category && filters.category !== 'all') params.append('category__slug', filters.category);
    if (filters.vendor && filters.vendor !== 'all') params.append('vendor__id', filters.vendor);
    if (filters.minPrice > 0) params.append('min_price', filters.minPrice);
    if (filters.maxPrice < 1000) params.append('max_price', filters.maxPrice);
    if (filters.minRating > 0) params.append('min_rating', filters.minRating);
    if (filters.inStock) params.append('in_stock', 'true');

    // Map your React sort options to Django ORM ordering
    if (filters.sort === 'price_asc') params.append('ordering', 'price');
    else if (filters.sort === 'price_desc') params.append('ordering', '-price');
    else if (filters.sort === 'rating_desc') params.append('ordering', '-rating');
    else if (filters.sort === 'newest') params.append('ordering', '-created_at');

    if (filters.page) params.append('page', filters.page);

    const response = await apiClient.get('/products/', { params });

    // Django REST Framework pagination returns { count, next, previous, results }
    return {
      products: (response.data.results || []).map(mapProduct),
      total: response.data.count || 0,
      facets: response.data.facets || {} // Requires a custom response in Django
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0, facets: {} };
  }
};

// 2. Get Single Product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}/`);
    return mapProduct(response.data);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error('Product not found');
  }
};

// 3. Get Related Products
export const getRelatedProducts = async (categorySlug, currentId, limit = 4) => {
  try {
    const response = await apiClient.get('/products/', {
      params: {
        category__slug: categorySlug,
        exclude_id: currentId,
        page_size: limit
      }
    });
    return (response.data.results || []).map(mapProduct);
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    return [];
  }
};

// 4. Get Categories
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories/');
    // Handles both paginated and non-paginated Django responses
    return response.data.results || response.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};
