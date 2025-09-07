import React from "react";

const SearchSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center px-3 py-2">
          {/* Image Skeleton */}
          <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>

          {/* Text Skeleton */}
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Price Skeleton */}
          <div className="w-12 h-3 bg-gray-200 rounded ml-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
