import React from "react";

const WishListViewSkeleton = ({ width }) => {
  return (
    <div className="flex flex-col lg:flex-row animate-pulse">
      {/* Skeleton Product Image */}
      <div className="w-full lg:w-1/2 sm:w-full flex justify-center items-center">
        <div className="flex flex-col space-y-5 relative">
          <div className="bg-gray-200 rounded-md max-w-full h-[350px]"></div>

          {/* Skeleton Thumbnail Images */}
          <div className="flex flex-row">
            <div className="bg-gray-200 rounded-md w-32 h-32 mx-2"></div>
            <div className="bg-gray-200 rounded-md w-32 h-32 mx-2"></div>
            <div className="bg-gray-200 rounded-md w-32 h-32 mx-2"></div>
          </div>
        </div>
      </div>

      {/* Skeleton Product Details */}
      <div className="w-full lg:w-1/2 p-4 space-y-6">
        {/* Product Title */}
        <div className="bg-gray-200 rounded-md h-8 w-3/4"></div>

        {/* Reviews */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-md w-4 h-4"></div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-md h-4 w-32"></div>
        </div>

        {/* Price */}
        <div className="bg-gray-200 rounded-md h-6 w-1/4"></div>

        {/* Category + Availability */}
        <div className="space-y-2">
          <div className="bg-gray-200 rounded-md h-4 w-1/2"></div>
          <div className="bg-gray-200 rounded-md h-4 w-1/3"></div>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center border-gray-300 space-x-2">
            <div className="bg-gray-200 rounded-md w-10 h-10"></div>
            <div className="bg-gray-200 rounded-md w-12 h-10"></div>
            <div className="bg-gray-200 rounded-md w-10 h-10"></div>
          </div>
          <div className="bg-gray-200 rounded-md h-10 w-1/4"></div>
        </div>

        {/* Social Share + Wishlist */}
        {width ? (
          <div className="flex flex-col space-y-2 w-auto">
            <div className="bg-gray-200 rounded-md w-full h-2"></div>
            <div className="bg-gray-200 rounded-md w-full h-2"></div>
            <div className="bg-gray-200 rounded-md w-full h-2"></div>
            <div className="bg-gray-200 rounded-md w-full h-2"></div>
          </div>
        ) : (
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-md w-6 h-6"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListViewSkeleton;
