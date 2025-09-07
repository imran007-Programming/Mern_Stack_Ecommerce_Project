import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import WishListViewSkeleton from "./WishListViewSkeleton";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook } from "react-icons/fa";
import { CiHeart, CiTwitter } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const WishListViewProduct = ({ wishListView }) => {
  const [img, setImg] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === wishListView.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wishListView.images.length - 1 : prevIndex - 1
    );
  };

  // Reset the img state and loading state when a new product is rendered
  useEffect(() => {
    setImg("");
    setCurrentIndex(0);
    setLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [wishListView]);

  const handleImageClick = (url) => {
    setImg(url);
  };

  const { CategoryData } = useSelector((state) => state.category);

  // Function to get category name by category ID
  const getCategoryNameById = (categoryId) => {
    const category = CategoryData.find(
      (category) => category._id === categoryId
    );

    return category ? category.categoryName : "Category Not Found";
  };

  //add to cart Function///

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const token = localStorage.getItem("usertoken");
  const handleAddtoCart = async (id, product, quantity) => {
    const requiresSize = product.sizes && product.sizes.length > 0;
    try {
      if (token == null) {
        Navigate("/login");
        return;
      }  else if (requiresSize && size === "") {
        toast.error("please select a size");
        return;
      } else {
        // Dispatch action to add product to Redux store
        dispatch(addtoCart({ productid: id, size, quantity }));

        // Optionally, dispatch action to refresh the cart state from localStorage
        dispatch(getCart());
      }
    } catch (error) {
      console.error(error);
    }
  };
////set sizes
  const isActive = (i, index) => {
    setActive(i);
    setSize(index);
  };


  return (
   <div className="webkit p-2">
  {loading ? (
    <WishListViewSkeleton />
  ) : (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="flex flex-col space-y-5 relative w-full">
          {wishListView?.images?.length > 0 && (
            <img
              src={
                wishListView.images[currentIndex] || wishListView.images[0]
              }
              alt="Product"
              className="w-full max-h-[350px] sm:max-h-[400px] object-contain rounded-md"
            />
          )}

          {/* Navigation */}
          <FaAngleLeft
            onClick={handlePrevImage}
            className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-white rounded-full shadow cursor-pointer p-1"
            size={28}
          />
          <FaAngleRight
            onClick={handleNextImage}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-white rounded-full shadow cursor-pointer p-1"
            size={28}
          />

          {/* Thumbnails */}
          {wishListView?.images?.length > 0 && (
            <div className="flex flex-row overflow-x-auto scrollbar-none gap-2 mt-2">
              {wishListView.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumb"
                  className={`w-16 h-16 object-cover rounded cursor-pointer flex-shrink-0 ${
                    currentIndex === index ? "border-2 border-black" : ""
                  }`}
                  onClick={() => {
                    handleImageClick(img);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 p-2 sm:p-4 space-y-4">
        {/* Title */}
        <h1 className="text-lg sm:text-2xl font-bold">
          {wishListView.productName}
        </h1>

        {/* Reviews */}
        <div className="flex items-center space-x-2">
          <div className="text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 inline"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
              </svg>
            ))}
          </div>
          <span className="text-xs sm:text-sm">(No reviews yet)</span>
        </div>

        {/* Price */}
        <div className="text-xl sm:text-2xl text-gray-800">
          $ {wishListView.price}
        </div>

        {/* Category & Stock */}
        <div className="text-sm sm:text-base text-gray-600 space-y-1">
          <div>
            Category:{" "}
            <span className="text-gray-800">
              {getCategoryNameById(wishListView.categoryid)}
            </span>
          </div>
          {wishListView.quantity >= 1 ? (
            <div>
              Availability:{" "}
              <span className="text-green-600 font-semibold">In Stock</span>
            </div>
          ) : (
            <div>
              Availability:{" "}
              <span className="text-red-600 font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Size/Weight */}
        {wishListView.sizes?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Size / Weight:</span>
            {wishListView.sizes.map((i, index) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded-md text-sm ${
                  active === index
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => isActive(index, i)}
              >
                {i}
              </button>
            ))}
          </div>
        )}

        {/* Quantity & Add to Cart */}
        <div className="py-4 border-t border-b border-gray-200 space-y-3">
          {wishListView?.quantity > 0 && (
            <div className="flex items-center gap-3">
              {/* Counter */}
              <div className="flex border rounded overflow-hidden">
                <button
                  onClick={decrease}
                  className="px-3 py-1 bg-gray-200 disabled:bg-gray-100"
                  disabled={count === 1}
                >
                  -
                </button>
                <div className="px-4 py-1 border-x">{count}</div>
                <button
                  onClick={increase}
                  className="px-3 py-1 bg-gray-200 disabled:bg-gray-100"
                  disabled={count === 5}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() =>
                  handleAddtoCart(wishListView._id, wishListView, count)
                }
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white text-sm sm:text-base ${
                  wishListView.sizes?.length > 0 && size === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black"
                }`}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          )}

          {wishListView?.quantity === 0 && (
            <div className="text-white text-sm bg-red-600 w-full h-10 flex items-center justify-center rounded">
              <ShoppingBagIcon className="w-5 h-5 mr-1" />
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <CiTwitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <IoMail size={20} />
          </a>
          <Link
            to="/wishlist"
            className="text-black flex items-center text-sm"
          >
            <IoIosHeart color="#DA5555" size={20} className="mr-1" /> Go to
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default WishListViewProduct;
