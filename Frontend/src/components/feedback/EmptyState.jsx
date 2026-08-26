import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState = ({ title = 'No Products Found', message = 'Try adjusting your search terms or clearing active filters.', onReset }) => {
  return (
    <div className="text-center py-5 glass-card my-4 p-5">
      <div className="rounded-circle bg-primary-light text-primary d-inline-flex p-4 mb-3">
        <SearchX size={48} />
      </div>
      <h4 className="font-heading fw-bold mb-2">{title}</h4>
      <p className="text-body-secondary max-width-400 mx-auto mb-4" style={{ maxWidth: '450px' }}>
        {message}
      </p>
      {onReset && (
        <button className="btn btn-outline-primary rounded-pill px-4" onClick={onReset}>
          <RotateCcw size={16} className="me-2" />
          Clear All Filters
        </button>
      )}
    </div>
  );
};
