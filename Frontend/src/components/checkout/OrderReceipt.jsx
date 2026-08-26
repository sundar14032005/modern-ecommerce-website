import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Printer, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const OrderReceipt = ({ order }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="text-center py-4">
      <div className="rounded-circle bg-success text-white d-inline-flex p-3 mb-3 shadow">
        <CheckCircle2 size={48} />
      </div>
      <h3 className="fw-bold font-heading mb-1">Order Placed Successfully!</h3>
      <p className="text-body-secondary mb-4">
        Thank you for your purchase, <strong>{order.customer.fullName}</strong>. A receipt has been sent to <strong>{order.customer.email}</strong>.
      </p>

      {/* Printable Receipt Card */}
      <div className="glass-card p-4 text-start max-width-600 mx-auto mb-4 border rounded-4 shadow-sm" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <div>
            <div className="small text-body-secondary">Order ID</div>
            <div className="fw-bold font-monospace text-primary fs-5">#{order.orderId}</div>
          </div>
          <div className="text-end">
            <div className="small text-body-secondary">Order Date</div>
            <div className="fw-semibold small">{formatDate(order.date)}</div>
          </div>
        </div>

        {/* Deliver To */}
        <div className="mb-3 small">
          <strong className="d-block mb-1">Shipping Address:</strong>
          <span className="text-body-secondary">{order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.zip}</span>
        </div>

        {/* Itemized Table */}
        <div className="table-responsive mb-3">
          <table className="table table-sm table-borderless small mb-0">
            <thead>
              <tr className="border-bottom">
                <th>Item</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.title}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-top pt-3 small d-grid gap-1">
          <div className="d-flex justify-content-between text-body-secondary">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="d-flex justify-content-between text-success">
              <span>Discount</span>
              <span>-{formatCurrency(order.discountAmount)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between text-body-secondary">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}</span>
          </div>
          <div className="d-flex justify-content-between fs-5 fw-bold font-heading pt-2 border-top text-primary">
            <span>Paid Amount</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handlePrint}>
          <Printer size={16} className="me-2" />
          Print Receipt
        </button>
        <Link to="/catalog" className="btn btn-primary-gradient rounded-pill px-4 fw-bold d-flex align-items-center gap-2">
          <ShoppingBag size={16} />
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
