import { DEFAULT_FILTERS } from './constants';

export const filterProducts = (products, filters = DEFAULT_FILTERS) => {
  if (!products || !Array.isArray(products)) return [];

  return products.filter((product) => {
    // 1. Text Search Query Filter
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchVendor = product.vendorName.toLowerCase().includes(q);
      const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));
      const matchBrand = product.attributes?.brand?.toLowerCase().includes(q);

      if (!matchTitle && !matchDesc && !matchCategory && !matchVendor && !matchTags && !matchBrand) {
        return false;
      }
    }

    // 2. Category Filter
    if (filters.category && filters.category !== 'all') {
      if (product.category !== filters.category) return false;
    }

    // 3. Price Range Filter
    const minP = Number(filters.minPrice) || 0;
    const maxP = Number(filters.maxPrice) || 1000;
    if (product.price < minP || product.price > maxP) return false;

    // 4. Minimum Rating Filter
    const minR = Number(filters.minRating) || 0;
    if (minR > 0 && product.rating < minR) return false;

    // 5. Vendor Filter
    if (filters.vendor && filters.vendor !== 'all') {
      if (product.vendorId !== filters.vendor && product.vendorName.toLowerCase() !== filters.vendor.toLowerCase()) {
        return false;
      }
    }

    // 6. In-Stock Filter
    if (filters.inStock && product.stock <= 0) return false;

    return true;
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating_desc':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewsCount - a.reviewsCount;
    }
  });
};

export const calculateFacetCounts = (products, currentFilters) => {
  if (!products) return { categories: {}, vendors: {}, ratings: {} };

  // Helper to filter ignoring a specific facet key
  const filterExcept = (exceptKey) => {
    const filtersCopy = { ...currentFilters, [exceptKey]: DEFAULT_FILTERS[exceptKey] };
    return filterProducts(products, filtersCopy);
  };

  // Category counts (ignoring current category filter)
  const productsForCategory = filterExcept('category');
  const categoryCounts = {};
  productsForCategory.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  // Vendor counts (ignoring current vendor filter)
  const productsForVendor = filterExcept('vendor');
  const vendorCounts = {};
  productsForVendor.forEach((p) => {
    vendorCounts[p.vendorId] = (vendorCounts[p.vendorId] || 0) + 1;
  });

  // Rating counts (4+, 4.5+, etc.)
  const productsForRating = filterExcept('minRating');
  const ratingCounts = { 4.5: 0, 4.0: 0, 3.5: 0 };
  productsForRating.forEach((p) => {
    if (p.rating >= 4.5) ratingCounts[4.5]++;
    if (p.rating >= 4.0) ratingCounts[4.0]++;
    if (p.rating >= 3.5) ratingCounts[3.5]++;
  });

  return {
    categories: categoryCounts,
    vendors: vendorCounts,
    ratings: ratingCounts
  };
};

export const getActiveFilterCount = (filters) => {
  let count = 0;
  if (filters.query && filters.query.trim() !== '') count++;
  if (filters.category && filters.category !== 'all') count++;
  if (filters.minPrice > 0 || filters.maxPrice < 1000) count++;
  if (filters.minRating > 0) count++;
  if (filters.vendor && filters.vendor !== 'all') count++;
  if (filters.inStock) count++;
  return count;
};
