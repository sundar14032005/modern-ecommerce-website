import { apiClient } from './apiClient';

// The Vendor model in Django is snake_case; the vendor pages were built
// against camelCase mock data, so we map field names here in one place.
const mapVendor = (v) => ({
  id: v.id,
  name: v.name,
  slug: v.slug,
  logo: v.logo,
  banner: v.banner,
  bio: v.bio,
  rating: v.rating,
  reviewsCount: v.reviews_count,
  salesCount: v.sales_count,
  location: v.location,
  joinDate: v.join_date,
  verified: v.verified,
  responseRate: v.response_rate,
  badges: v.badges || []
});

export const getVendors = async () => {
  try {
    const response = await apiClient.get('/vendors/');
    const results = response.data.results || response.data || [];
    return results.map(mapVendor);
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    return [];
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await apiClient.get(`/vendors/${id}/`);
    const vendor = mapVendor(response.data);

    const productsResponse = await apiClient.get('/products/', {
      params: { vendor__id: vendor.id, page_size: 100 }
    });
    const products = productsResponse.data.results || [];

    return { ...vendor, products };
  } catch (error) {
    console.error(`Failed to fetch vendor ${id}:`, error);
    throw new Error('Vendor not found');
  }
};
