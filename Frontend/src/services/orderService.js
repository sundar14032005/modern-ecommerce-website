import { apiClient } from './apiClient';

// Builds the payload the Django OrderSerializer expects out of the
// checkout form state + cart contents.
export const createOrder = async ({ formData, cartItems, subtotal, discountAmount, shippingFee, tax, total, promoCode }) => {
  const payload = {
    customer_name: formData.fullName,
    customer_email: formData.email,
    customer_phone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zip_code: formData.zip,
    subtotal: subtotal.toFixed(2),
    discount_amount: discountAmount.toFixed(2),
    shipping_fee: shippingFee.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    promo_code: promoCode || '',
    items: cartItems.map((item) => ({
      product_id: item.id,
      product_title: item.title,
      quantity: item.quantity,
      price: item.price,
      vendor_name: item.vendorName || ''
    }))
  };

  const response = await apiClient.post('/orders/create/', payload);
  return response.data; // { success, order_id, message }
};

export const getMyOrders = async () => {
  try {
    const response = await apiClient.get('/orders/mine/');
    return response.data.results || [];
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error; // Re-throw so AccountPage can catch and show an error state.
  }
};
