import React from 'react';
import { LayoutGrid, Grid, List } from 'lucide-react';

export const ViewSwitcher = ({ currentView, onViewChange }) => {
  return (
    <div className="btn-group btn-group-sm" role="group" aria-label="Grid layout toggle">
      <button
        type="button"
        className={`btn btn-outline-secondary ${currentView === 'grid3' ? 'active' : ''}`}
        onClick={() => onViewChange('grid3')}
        title="3-Column Grid"
      >
        <LayoutGrid size={16} />
      </button>
      <button
        type="button"
        className={`btn btn-outline-secondary ${currentView === 'grid4' ? 'active' : ''}`}
        onClick={() => onViewChange('grid4')}
        title="4-Column Compact Grid"
      >
        <Grid size={16} />
      </button>
      <button
        type="button"
        className={`btn btn-outline-secondary ${currentView === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        title="Detailed List View"
      >
        <List size={16} />
      </button>
    </div>
  );
};
