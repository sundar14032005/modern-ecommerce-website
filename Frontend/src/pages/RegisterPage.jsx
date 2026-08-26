import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // BUG 7 fix: redirect already-logged-in users away from the register page.
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.password2) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    const result = await register(form);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Create Account' }]} />

        <div className="glass-card rounded-4 p-4 p-md-5 shadow-sm mx-auto" style={{ maxWidth: '520px' }}>
          <h3 className="fw-bold font-heading mb-1">Create Your Account</h3>
          <p className="text-body-secondary mb-4">Join A-Z Store to check out faster and track your orders.</p>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Username *</label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary"><User size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="janedoe"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address *</label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary"><Mail size={16} /></span>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Password *</label>
                <div className="input-group">
                  <span className="input-group-text bg-body-tertiary"><Lock size={16} /></span>
                  <input
                    type="password"
                    className="form-control"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Confirm Password *</label>
                <div className="input-group">
                  <span className="input-group-text bg-body-tertiary"><Lock size={16} /></span>
                  <input
                    type="password"
                    className="form-control"
                    required
                    placeholder="••••••••"
                    value={form.password2}
                    onChange={(e) => handleChange('password2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary-gradient w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="spinner-border spinner-border-sm" role="status" />
              ) : (
                <UserPlus size={18} />
              )}
              <span>{isSubmitting ? 'Creating Account…' : 'Create Account'}</span>
            </button>
          </form>

          <p className="text-center small text-body-secondary mt-4 mb-0">
            Already have an account? <Link to="/login" className="fw-bold">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
