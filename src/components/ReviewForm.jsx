import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ listingId, onReviewSubmit, onCancel, userHasReviewed }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userHasReviewed) {
      setError('You have already reviewed this listing');
      return;
    }

    if (!comment.trim()) {
      setError('Please provide a review comment');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onReviewSubmit({
        listingId,
        rating,
        comment: comment.trim()
      });
      
      // Reset form
      setComment('');
      setRating(5);
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userHasReviewed) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md">
        You have already reviewed this listing.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <h3 className="text-lg font-medium">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Rating
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Review
        </label>
        <textarea
          id="comment"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
