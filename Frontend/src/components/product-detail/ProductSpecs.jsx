import React from 'react';

export const ProductSpecs = ({ attributes = {} }) => {
  const entries = Object.entries(attributes);

  if (entries.length === 0) return null;

  return (
    <div className="glass-card p-4 rounded-3 mb-4">
      <h5 className="fw-bold font-heading mb-3">Product Specifications</h5>
      <div className="table-responsive">
        <table className="table table-striped table-borderless small mb-0">
          <tbody>
            {entries.map(([key, val]) => (
              <tr key={key}>
                <td className="fw-bold text-capitalize text-body-secondary" style={{ width: '35%' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </td>
                <td className="fw-semibold text-body">{String(val)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
