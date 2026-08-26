import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // BUG 7 fix: redirect already-logged-in users away from the login page.
  // Wait until auth state is resolved (isLoading=false) before deciding.
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await login(identifier, password);
    setIsSubmitting(false);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Login' }]} />

        <div className="glass-card rounded-4 p-4 p-md-5 shadow-sm mx-auto" style={{ maxWidth: '460px' }}>
          <h3 className="fw-bold font-heading mb-1">Welcome Back</h3>
          <p className="text-body-secondary mb-4">Log in to your A-Z Store account.</p>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email or Username</label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary"><Mail size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  required
                  autoFocus
                  placeholder="you@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary"><Lock size={16} /></span>
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                <LogIn size={18} />
              )}
              <span>{isSubmitting ? 'Logging In…' : 'Log In'}</span>
            </button>
          </form>

          <p className="text-center small text-body-secondary mt-4 mb-0">
            Don't have an account? <Link to="/register" className="fw-bold">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
