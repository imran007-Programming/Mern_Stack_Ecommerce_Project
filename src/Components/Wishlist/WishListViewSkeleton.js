import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const WishListViewSkeleton = ({width}) => {
  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Skeleton Product Image */}
      <div className="w-full lg:w-1/2 sm:w-[100%] flex justify-center items-center">
        <div className="flex flex-col space-y-5 relative">
          <div className="skeleton rounded-none max-w-full h-[350px]"></div>
         
          {/* Skeleton Thumbnail Images */}
          <div className="flex flex-row" >
          <div className={`skeleton rounded-none w-32 mx-2 h-32`}></div>
          <div className="skeleton rounded-none w-32 h-32 mx-2"></div>
          <div className="skeleton rounded-none w-32 h-32 mx-2"></div>
          

          </div>
        </div>
      </div>

      {/* Skeleton Product Details */}
      <div className="w-full lg:w-1/2 p-4 space-y-6">
        {/* Skeleton Product Title */}
        <div className="skeleton rounded-none h-8 w-3/4"></div>

        {/* Skeleton Reviews */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`skeleton rounded-none w-4 h-4`}></div>
            ))}
          </div>
          <div className="skeleton rounded-none h-4 w-32"></div>
        </div>

        {/* Skeleton Price */}
        <div className="skeleton rounded-none h-6 w-1/4"></div>

        {/* Skeleton Category and Availability */}
        <div className="space-y-2">
          <div className="skeleton rounded-none h-4 w-1/2"></div>
          <div className="skeleton rounded-none h-4 w-1/3"></div>
        </div>

        {/* Skeleton Quantity and Add to Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center  border-gray-300">
            <div className="skeleton rounded-none w-10 h-10"></div>
            <div className="skeleton rounded-none w-12 h-10"></div>
            <div className="skeleton rounded-none w-10 h-10"></div>
          </div>
          <div className="skeleton rounded-none h-10 w-1/4"></div>
        </div>

        {/* Skeleton Social Share and Wishlist */}

        {
           width?
           <div className='flex flex-col space-y-2 w-auto '>
           <div  className="skeleton rounded-none w-full h-2"></div>
           <div  className="skeleton rounded-none w-full h-2"></div>
           <div  className="skeleton rounded-none w-full h-2"></div>
           <div  className="skeleton rounded-none w-full h-2"></div>
           
           </div>
           :
           <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (

            
            <div key={i} className="skeleton rounded-none w-6 h-6"></div>
             
          
            
          ))}
        </div>
        }
        
      </div>
    </div>
  );
};

export default WishListViewSkeleton;
