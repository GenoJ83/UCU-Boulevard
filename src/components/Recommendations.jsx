import React from 'react';
import { useRecommendations } from '../context/RecommendationContext';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';

const Recommendations = ({ title = 'Recommended for You', maxItems = 5 }) => {
  const { recommendations, isLoading } = useRecommendations();
  
  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null; // Don't show anything if no recommendations
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recommendations.slice(0, maxItems).map((item) => (
          <ProductCard 
            key={item.id} 
            item={item} 
            onView={() => {}} 
            onContact={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
