import React from 'react';

const Skeleton = ({ className = '', ...props }) => (
  <div 
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

export { Skeleton };
