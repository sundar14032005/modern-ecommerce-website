import React from 'react';

export const SkeletonCard = ({ view = 'grid3' }) => {
  if (view === 'list') {
    return (
      <div className="card glass-card border-0 mb-3 p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <div className="skeleton-box" style={{ height: '140px', width: '100%' }}></div>
          </div>
          <div className="col-md-9">
            <div className="skeleton-box mb-2" style={{ height: '20px', width: '70%' }}></div>
            <div className="skeleton-box mb-3" style={{ height: '14px', width: '40%' }}></div>
            <div className="skeleton-box mb-3" style={{ height: '14px', width: '90%' }}></div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="skeleton-box" style={{ height: '24px', width: '80px' }}></div>
              <div className="skeleton-box" style={{ height: '36px', width: '120px' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass-card border-0 h-100 p-3">
      <div className="skeleton-box mb-3" style={{ height: '200px', width: '100%', borderRadius: '12px' }}></div>
      <div className="skeleton-box mb-2" style={{ height: '14px', width: '40%' }}></div>
      <div className="skeleton-box mb-2" style={{ height: '20px', width: '85%' }}></div>
      <div className="skeleton-box mb-3" style={{ height: '14px', width: '60%' }}></div>
      <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
        <div className="skeleton-box" style={{ height: '24px', width: '70px' }}></div>
        <div className="skeleton-box" style={{ height: '36px', width: '90px' }}></div>
      </div>
    </div>
  );
};
