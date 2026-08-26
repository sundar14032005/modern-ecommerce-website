import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const RatingStars = ({ rating = 0, reviewsCount, size = 16, showValue = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="d-inline-flex align-items-center gap-1">
      <div className="d-flex text-warning align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf key="half" size={size} fill="currentColor" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-secondary opacity-25" />
        ))}
      </div>
      {showValue && (
        <span className="small fw-semibold ms-1 text-body-secondary">
          {rating.toFixed(1)} {reviewsCount !== undefined && `(${reviewsCount})`}
        </span>
      )}
    </div>
  );
};
