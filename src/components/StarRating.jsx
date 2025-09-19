import React, { useState, useEffect } from 'react';

const StarRating = ({ rating, setRating, readOnly = false, size = 'md' }) => {
  const [hover, setHover] = useState(0);
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const handleClick = (value) => {
    if (!readOnly && setRating) {
      setRating(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readOnly) {
      setHover(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hover || rating) >= star;
        return (
          <button
            key={star}
            type="button"
            className={`${sizeClasses[size]} ${!readOnly ? 'cursor-pointer' : 'cursor-default'} ${
              isFilled ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            aria-label={`Rate ${star} out of 5`}
          >
            {isFilled ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
