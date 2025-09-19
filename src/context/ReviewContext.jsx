import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState({});

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('ucu_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(reviews).length > 0) {
      localStorage.setItem('ucu_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (listingId, rating, comment) => {
    if (!user) throw new Error('You must be logged in to leave a review');
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    
    const newReview = {
      id: Date.now().toString(),
      listingId,
      userId: user,
      userName: user.split('@')[0], // Extract username from email
      rating,
      comment: comment.trim(),
      date: new Date().toISOString()
    };

    setReviews(prev => ({
      ...prev,
      [listingId]: [...(prev[listingId] || []), newReview]
    }));

    return newReview;
  };

  const getListingReviews = (listingId) => {
    return reviews[listingId] || [];
  };

  const getAverageRating = (listingId) => {
    const listingReviews = reviews[listingId] || [];
    if (listingReviews.length === 0) return 0;
    
    const sum = listingReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / listingReviews.length).toFixed(1);
  };

  const hasUserReviewed = (listingId, userId) => {
    const listingReviews = reviews[listingId] || [];
    return listingReviews.some(review => review.userId === userId);
  };

  const value = useMemo(() => ({
    reviews,
    addReview,
    getListingReviews,
    getAverageRating,
    hasUserReviewed,
  }), [reviews]);

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}
