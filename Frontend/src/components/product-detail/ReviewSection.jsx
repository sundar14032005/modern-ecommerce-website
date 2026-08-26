import React from 'react';
import { RatingStars } from '../common/RatingStars';
import { formatDate } from '../../utils/formatters';
import { UserCheck } from 'lucide-react';

export const ReviewSection = ({ reviews = [], rating = 4.8, totalReviews = 0 }) => {
  return (
    <div className="glass-card p-4 rounded-3">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between pb-4 border-bottom mb-4 gap-3">
        <div>
          <h5 className="fw-bold font-heading mb-1">Customer Reviews & Ratings</h5>
          <div className="d-flex align-items-center gap-2">
            <span className="fs-3 fw-bold text-primary font-heading">{rating.toFixed(1)}</span>
            <RatingStars rating={rating} reviewsCount={totalReviews} size={18} />
          </div>
        </div>
        <button className="btn btn-outline-primary rounded-pill px-4">Write a Review</button>
      </div>

      {reviews.length === 0 ? (
        <p className="text-body-secondary small mb-0">No written reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="d-grid gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="border-bottom pb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-primary-light text-primary fw-bold p-2 small">
                    {rev.user.charAt(0)}
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold small d-flex align-items-center gap-1">
                      {rev.user}
                      <UserCheck size={14} className="text-success" title="Verified Buyer" />
                    </h6>
                    <small className="text-body-secondary">{formatDate(rev.date)}</small>
                  </div>
                </div>
                <RatingStars rating={rev.rating} showValue={false} size={14} />
              </div>
              <h6 className="fw-bold small mb-1">{rev.title}</h6>
              <p className="small text-body-secondary mb-0">{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
