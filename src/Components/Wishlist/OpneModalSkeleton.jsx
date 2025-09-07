import React from 'react'

const OpneModalSkeleton = () => {
  return (
    <div> 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6 animate-pulse">
      {/* Left: Image + Thumbs */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 sm:w-20 w-18">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 w-full bg-gray-300 rounded-md"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 border-2 border-[#80808016] rounded-2xl flex justify-center items-center">
          <div className="h-[400px] sm:w-[350px] w-[250px] bg-gray-300   rounded-md" />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="mt-4 md:mt-0 space-y-4">  
        {/* Badge */}
        <div className="h-6 w-24 bg-gray-300  rounded-md" />

        {/* Title */}
        <div className="h-6 w-2/3 bg-gray-300  rounded-md" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300  rounded-md" />
          <div className="h-4 w-5/6 bg-gray-300  rounded-md" />
        </div>

        {/* Sizes */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-16 bg-gray-300  rounded-md"
            />
          ))}
        </div>

        {/* Stock */}
        <div className="h-4 w-32 bg-gray-300  rounded-md" />

        {/* Rating */}
        <div className="h-5 w-28 bg-gray-300  rounded-md" />

        {/* Price */}
        <div className="flex gap-3 items-center">
          <div className="h-6 w-24 bg-gray-300  rounded-md" />
          <div className="h-4 w-16 bg-gray-300  rounded-md" />
        </div>

        {/* Quantity & Add to Cart */}
        <div className="border-t border-b py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300  rounded-md" />
            <div className="h-8 w-10 bg-gray-300  rounded-md" />
            <div className="h-8 w-8 bg-gray-300  rounded-md" />
          </div>
          <div className="flex-1">
            <div className="h-10 w-full bg-gray-300  rounded-md" />
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default OpneModalSkeleton