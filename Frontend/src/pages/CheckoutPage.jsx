import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { StepShipping } from '../components/checkout/StepShipping';
import { StepPayment } from '../components/checkout/StepPayment';
import { StepSummary } from '../components/checkout/StepSummary';
import { OrderReceipt } from '../components/checkout/OrderReceipt';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Check } from 'lucide-react';
import { createOrder } from '../services/orderService';

const EXPRESS_SHIPPING_FEE = 19.99;

export const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, shippingFee, estimatedTax, total, appliedPromo, clearCart, showToast } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Guard: redirect to cart if user lands on checkout with empty cart
  useEffect(() => {
    if (cartItems.length === 0 && !completedOrder) {
      navigate('/cart', { replace: true });
    }
  }, [cartItems.length, completedOrder, navigate]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    shippingSpeed: 'standard',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    upiId: ''
  });

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Express shipping adds a flat surcharge on top of whatever the cart
  // already calculated (which may be free above the $150 threshold or
  // discounted via a FREESHIP promo). Standard shipping keeps the
  // cart's own calculated fee.
  const finalShippingFee =
    formData.shippingSpeed === 'express' ? shippingFee + EXPRESS_SHIPPING_FEE : shippingFee;
  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discountAmount + finalShippingFee + estimatedTax),
    [subtotal, discountAmount, finalShippingFee, estimatedTax]
  );

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const result = await createOrder({
        formData,
        cartItems,
        subtotal,
        discountAmount,
        shippingFee: finalShippingFee,
        tax: estimatedTax,
        total: finalTotal,
        promoCode: appliedPromo?.code
      });

      const order = {
        orderId: result.order_id,
        date: new Date().toISOString(),
        customer: formData,
        items: [...cartItems],
        subtotal,
        discountAmount,
        shippingFee: finalShippingFee,
        estimatedTax,
        total: finalTotal
      };
      setCompletedOrder(order);
      clearCart();
      setStep(4);
    } catch (error) {
      console.error('Failed to place order:', error);
      showToast('Could not place your order. Please check your details and try again.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 4 && completedOrder) {
    return (
      <div className="py-5">
        <div className="container">
          <OrderReceipt order={completedOrder} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

        {/* Wizard Progress Steps */}
        <div className="glass-card rounded-4 p-4 mb-4 shadow-sm">
          <div className="row text-center position-relative">
            {['1. Shipping & Contact', '2. Payment Details', '3. Order Summary'].map((label, idx) => {
              const stepNum = idx + 1;
              const isDone = step > stepNum;
              const isActive = step === stepNum;
              return (
                <div key={idx} className="col-4">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center fw-bold mb-2 ${
                        isDone
                          ? 'bg-success text-white'
                          : isActive
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-body-tertiary text-body-secondary'
                      }`}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {isDone ? <Check size={20} /> : stepNum}
                    </div>
                    <span className={`small ${isActive ? 'fw-bold text-primary' : 'text-body-secondary'}`}>
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Forms */}
        <div className="glass-card rounded-4 p-4 p-md-5 shadow-sm max-width-800 mx-auto" style={{ maxWidth: '800px' }}>
          {step === 1 && (
            <StepShipping
              formData={formData}
              onChange={handleFieldChange}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepPayment
              formData={formData}
              onChange={handleFieldChange}
              onNext={() => setStep(3)}
              onPrev={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepSummary
              formData={formData}
              onPlaceOrder={handlePlaceOrder}
              onPrev={() => setStep(2)}
              isSubmitting={isSubmitting}
              shippingFee={finalShippingFee}
              total={finalTotal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
