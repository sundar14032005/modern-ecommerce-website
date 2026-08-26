import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setOrdersError('Could not load your orders. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="py-4">
      <div className="container">
        <Breadcrumbs items={[{ label: 'My Account' }]} />

        <div className="glass-card rounded-4 p-4 mb-4 shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center bg-primary-light text-primary"
              style={{ width: 56, height: 56 }}
            >
              <User size={26} />
            </div>
            <div>
              <h5 className="fw-bold font-heading mb-0">
                {user?.first_name ? `${user.first_name} ${user.last_name}`.trim() : user?.username}
              </h5>
              <div className="small text-body-secondary">{user?.email}</div>
            </div>
          </div>
          <button className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} /> Log Out
          </button>
        </div>

        <h5 className="fw-bold font-heading mb-3 d-flex align-items-center gap-2">
          <Package size={20} /> Order History
        </h5>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : ordersError ? (
          <div className="alert alert-danger rounded-4">{ordersError}</div>
        ) : orders.length === 0 ? (
          <div className="glass-card rounded-4 p-5 text-center text-body-secondary">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="d-grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="glass-card rounded-4 p-3 p-md-4 shadow-sm">
                <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                  <div>
                    <div className="small text-body-secondary">Order #{order.id}</div>
                    <div className="fw-bold">{formatDate(order.created_at)}</div>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-primary-light text-primary text-uppercase rounded-pill px-3 py-2">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="small text-body-secondary mb-2">
                  {order.items.length} item{order.items.length === 1 ? '' : 's'} • Shipping to {order.city}, {order.state}
                </div>
                <div className="fw-bold text-primary">{formatCurrency(order.total)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
