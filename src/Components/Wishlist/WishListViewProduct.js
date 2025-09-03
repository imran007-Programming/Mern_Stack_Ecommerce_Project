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
        <div className="flex flex-col lg:flex-row ">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 sm:w-[100%] flex justify-center items-center">
            <div className="flex flex-col space-y-5 relative">
              {wishListView &&
                wishListView.images &&
                wishListView.images.length > 0 && (
                  <img
                    src={
                      wishListView.images[currentIndex] ||
                      wishListView.images[0]
                    }
                    alt="Product Image"
                    className="max-w-full h-[350px]"
                  />
                )}

              <FaAngleLeft
                onClick={handlePrevImage}
                className="absolute bottom-1/2 transform -translate-y-1/2 left-0"
                size={23}
              />
              <FaAngleRight
                onClick={handleNextImage}
                className="absolute bottom-1/2 transform -translate-y-1/2 right-0"
                size={23}
              />

              {/* THumb nail imagess */}
              {wishListView &&
                wishListView.images &&
                wishListView.images.length > 0 && (
                  <div
                    className="flex flex-row overflow-x-auto scrollbar-none"
                    style={{ maxHeight: "160px" }}
                  >
                    {wishListView.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Product Image"
                        className={`w-20  h-26 mx-2 cursor-pointer ${
                          currentIndex === index ? "border border-blue-500" : ""
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
          <div className="w-full lg:w-1/2 p-4 space-y-6">
            {/* Product Title */}
            <h1 className="text-2xl font-bold">{wishListView.productName}</h1>

            {/* Reviews */}
            <div className="flex items-center space-x-2">
              <div className="text-yellow-400">
                {/* Star icons */}
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
              <span className="text-sm">(There is no review yet.)</span>
            </div>

            {/* Price */}
            <div className="text-xl text-gray-800 ">$ {wishListView.price}</div>

            {/* Category and Availability */}
            <div className="text-sm text-gray-600">
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
                  {" "}
                  Availability:{" "}
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

           {/* size/weight chart */}


           <div className="product_size flex  items-center mb-6">
                <span>Size / Weight:</span>
                <ul className="list-items flex items-center pl-4">
                  {wishListView.sizes &&
                    wishListView.sizes.map((i, index) => {
                      return (
                        <li className="list">
                          <a
                            className={`tag ${active === index ? "bg-black text-white" : " bg-white text-black"
                              }`}
                            onClick={() => isActive(index, i)}
                          >
                            {i}
                          </a>
                        </li>
                      );
                    })}
                </ul>

              </div>



            {/* Quantity and Add to Cart */}

            <div className=" py-5 border-t border-b my-7">
              <div className="flex items-center  mt-3 w-[100%]">
                <div
                  className={`${
                    wishListView?.quantity === 0 ? "hidden" : "block"
                  }`}
                >
                  {/* inc and dec and button add to cart */}
                  <div className="flex  h-[40px]  ">
                    <button
                      onClick={decrease}
                      className={` border p-[.5rem] cursor-pointer ${
                        count == 1
                          ? "bg-[#FAFAFA] cursor-not-allowed"
                          : "bg-[#DADADA]"
                      }`}
                    >
                      -
                    </button>
                    <div className="border p-[.5rem]">{count}</div>
                    <button
                      disabled={count == 5}
                      onClick={increase}
                      className={`border  p-[.5rem] cursor-pointer ${
                        count == 5
                          ? "bg-[#FAFAFA] cursor-not-allowed"
                          : "bg-[#DADADA]"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="ml-3">
                  {wishListView?.quantity === 0 ? (
                    <button>
                      <div className="text-white text-sm bg-[#D02128] w-[100%] h-[40px] p-3 flex items-center justify-center ">
                        <ShoppingBagIcon className="w-5 h-5 mr-1 " />
                        <h2 className="uppercase font-bold">OUT OF STOCK</h2>
                      </div>
                    </button>
                  ) : (
                    <button>
                      <div className="ml-3">
                        {wishListView?.quantity === 0 ? (
                          <button>
                            <div className="text-white text-sm bg-[#D02128] w-[100%] h-[40px] p-3 flex items-center justify-center ">
                              <ShoppingBagIcon className="w-5 h-5 mr-1 " />
                              <h2 className="uppercase font-bold">
                                OUT OF STOCK
                              </h2>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleAddtoCart(
                                wishListView._id,
                                wishListView,
                                count
                              )
                            }
                          >
                            <div
                                className={`text-md w-[100%] h-[40px] px-10 py-6 flex items-center justify-center ${
                                  wishListView.sizes &&
                                  wishListView.sizes.length > 0
                                    ? size === ""
                                      ? "text-white bg-[#858484] cursor-pointer"
                                      : "text-white bg-[black]"
                                    : "text-white bg-[black]"
                                }`}
                              >
                              <ShoppingBagIcon className="w-5 h-5 mr-1 " />
                              <h2 className="uppercase font-bold">
                                Add to cart
                              </h2>
                            </div>
                          </button>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Social Share and Wishlist */}
            <div className="flex space-x-2">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaFacebook size={23} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <CiTwitter size={23} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin size={23} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <IoMail size={23} />
              </a>
              <Link
                to="/wishlist"
                className="text-black  flex justify-center items-center"
              >
                <IoIosHeart color="#DA5555" size={23} /> Go to Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListViewProduct;
