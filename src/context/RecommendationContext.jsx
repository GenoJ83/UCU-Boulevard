import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { useFavorites } from './FavoritesContext';
import { usePurchases } from './PurchasesContext';
import { mockListings } from '../data/listings';

const RecommendationContext = createContext(null);

// Simple content-based similarity function
const calculateSimilarity = (item1, item2) => {
  // Simple Jaccard similarity for categories
  const categories1 = new Set(item1.category.split(/\s*,\s*/));
  const categories2 = new Set(item2.category.split(/\s*,\s*/));
  const intersection = new Set([...categories1].filter(c => categories2.has(c)));
  const union = new Set([...categories1, ...categories2]);
  const categorySimilarity = intersection.size / union.size;
  
  // Price similarity (inverse of relative difference)
  const maxPrice = Math.max(item1.price, item2.price) || 1;
  const priceSimilarity = 1 - (Math.abs(item1.price - item2.price) / maxPrice);
  
  // Type similarity (1 if same type, 0 otherwise)
  const typeSimilarity = item1.type === item2.type ? 1 : 0;
  
  // Weighted sum of similarity scores
  return 0.5 * categorySimilarity + 0.3 * priceSimilarity + 0.2 * typeSimilarity;
};

export function RecommendationProvider({ children }) {
  const { user } = useAuth();
  const { favoriteIds } = useFavorites();
  const { purchases } = usePurchases();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate recommendations based on user's favorites and purchases
  const generateRecommendations = useMemo(() => {
    return () => {
      if (!user) return [];
      
      // Get all items that the user has interacted with
      const userItems = [
        ...mockListings.filter(item => favoriteIds.includes(item.id)),
        ...purchases.map(p => p.item)
      ];

      if (userItems.length === 0) {
        // If no interactions, return popular items (most favorited)
        const popularItems = [...mockListings]
          .sort((a, b) => (b.favorites || 0) - (a.favorites || 0))
          .slice(0, 5);
        return popularItems;
      }

      // Calculate similarity scores for all items
      const itemScores = {};
      
      mockListings.forEach(item => {
        // Skip items the user has already interacted with
        if (userItems.some(ui => ui.id === item.id)) return;
        
        // Calculate similarity to each of the user's items
        const score = userItems.reduce((total, userItem) => {
          return total + calculateSimilarity(userItem, item);
        }, 0) / userItems.length; // Average similarity
        
        itemScores[item.id] = score;
      });

      // Sort by score and return top 5
      return Object.entries(itemScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([id]) => mockListings.find(item => item.id === id))
        .filter(Boolean);
    };
  }, [user, favoriteIds, purchases]);

  // Update recommendations when user interactions change
  useEffect(() => {
    const updateRecommendations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const recs = generateRecommendations();
        setRecommendations(recs);
      } catch (error) {
        console.error('Error generating recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    updateRecommendations();
  }, [generateRecommendations]);

  const value = useMemo(() => ({
    recommendations,
    isLoading,
    refreshRecommendations: () => {
      const recs = generateRecommendations();
      setRecommendations(recs);
    }
  }), [recommendations, isLoading, generateRecommendations]);

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
}

export function useRecommendations() {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
}
