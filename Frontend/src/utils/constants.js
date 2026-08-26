export const PROMO_CODES = {
  SAVE10: { code: 'SAVE10', discountPercent: 10, type: 'percent', label: '10% OFF Discount' },
  FREESHIP: { code: 'FREESHIP', discountShipping: true, type: 'shipping', label: 'Free Shipping' },
  NEX20: { code: 'NEX20', discountPercent: 20, type: 'percent', label: '20% Mega Savings' }
};

export const DEFAULT_FILTERS = {
  query: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  vendor: 'all',
  inStock: false,
  sort: 'featured', // 'featured' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest'
  view: 'grid3',   // 'grid3' | 'grid4' | 'list'
  page: 1
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured & Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Customer Rating: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' }
];
