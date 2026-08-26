import React from 'react';

export const Badge = ({ children, variant = 'primary', pill = false, className = '' }) => {
  return (
    <span className={`badge bg-${variant} ${pill ? 'rounded-pill' : 'rounded-2'} px-2 py-1 ${className}`}>
      {children}
    </span>
  );
};
