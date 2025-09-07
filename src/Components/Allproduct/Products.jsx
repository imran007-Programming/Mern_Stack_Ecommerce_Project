import React, { useContext, useEffect, useState } from "react";
import "./Products.scss";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import LazyLoad from "react-lazyload";

import { Rating } from "@smastrom/react-rating";
import {
  ShoppingCartIcon,
  HeartIcon,
  EyeIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
// import {HeartIcon} from "@heroicons/react/24/solid";

import "@smastrom/react-rating/style.css";
import { Link, useNavigate } from "react-router-dom";
import { CartopenContex } from "../../Contexapi/Cartopencontex.jsx";

import OpenCardModal from "./OpenCardModal.jsx";

import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice.jsx";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice.js";
import { BsBag } from "react-icons/bs";
import {
  addtoWishList,
  deleteWishList,
  getWishList,
} from "../../redux/Slice/wishListSlice/wishListSlice.js";
import ReactLoading from "react-loading";
import ImageSkeleton from "./ImageSkeleton.jsx";
const Products = ({ data }) => {
  const { cartopen, setCartopen } = useContext(CartopenContex);

  const [modalOpen, setModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [deleteWishListLoading, seDeleteWishListLoading] = useState(false);
  const [localWishlist, setLocalWishlist] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(data.images[0]);

  ///add to cart Function///
  const token = localStorage.getItem("usertoken");
  const handleAddtoCart = (id, quantity) => {
    if (!token) {
      Navigate("/login");
    } else {
      setIsLoading(true);
      const data = {
        productid: id,
        quantity: quantity,
      };
      dispatch(addtoCart(data))
        .then((res) => {
          if (res.payload) {
            // setCartopen(!cartopen);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    const actualPrice = productPrice - (productPrice * discount) / 100;
    return actualPrice;
  };

  // Fetch wishlist data when the component mounts
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  // Get wishlist data from Redux store
  const { getWishListProduct } = useSelector((state) => state.wishlist);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalWishlist(getWishListProduct.map((product) => product.details._id));
  }, [getWishListProduct]);

  // Function to check if the productId exists in the local wishlist state
  const isInWishlist = (productId) => {
    return localWishlist.includes(productId);
  };

  // Function to add a product to the wishlist
  const addToWishlistHandler = (id) => {
    if (token == null) {
      Navigate("/login");
    } else {
      setIsWishListLoading(true);
      setLocalWishlist((prevState) => [...prevState, id]);
      const data = { productid: id };
      dispatch(addtoWishList(data))
        .then(() => {
          dispatch(getWishList()); // Fetch updated wishlist
        })
        .catch((error) => {
          setLocalWishlist((prevState) =>
            prevState.filter((item) => item !== id)
          );
        })
        .finally(() => {
          setIsWishListLoading(false);
        });
    }
  };

  // Function to remove a product from the wishlist
  const removeFromWishlistHandler = (id) => {
    setClick(!click);
    seDeleteWishListLoading(true);
    setLocalWishlist((prevState) => prevState.filter((item) => item !== id)); // Optimistic update
    const data = { productid: id };
    dispatch(deleteWishList(data))
      .then(() => {
        dispatch(getWishList()); // Fetch updated wishlist
      })
      .catch((error) => {
        setLocalWishlist((prevState) => [...prevState, id]);
      })
      .finally(() => {
        seDeleteWishListLoading(false);
      });
  };
  // Function to handle hover effect with delay
  const handleHover = () => {
    // Set a timeout to delay the image change
    setTimeout(() => {
      setImageSrc(data.images[1]);
    }, 200);
  };

  // Reset image source on mouse leave
  const handleMouseLeave = () => {
    setImageSrc(data.images[0]);
  };

  return (
    <div className="product-card relative pt-10">
      <div className={`product-details border rounded-xl border-gray-200`}>
        {data?.discount > 0 && (
          <div className="discount-badge absolute top-2 left-2 px-3 py-1 text-white text-sm rounded-md bg-purple-600 font-thin z-[9999]">
            {data?.discount}% OFF
          </div>
        )}

        <div
          className={`imgwraper`}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            // onClick={() => sessionStorage.setItem("title", `${product_name}`)}

            to={`/allproduct/${data._id}`}
          >
            <div className=" ">
              <LazyLoad once placeholder={<ImageSkeleton />} debounce={100}>
                <img
                  className="product-image sm:h-[280px] h-[180px]"
                  src={imageSrc}
                  alt=""
                />
              </LazyLoad>
            </div>
          </Link>
          {/* Add to cart button for Desktop */}

          <div>
            {data?.quantity === 0 ? (
              <button>
                <div className="hidden add-to-cart-button text-white text-sm bg-[#D64147] w-full h-[36px] px-4 py-2 lg:flex items-center justify-center">
                  OUT OF STOCK
                </div>
              </button>
            ) : (
              <button onClick={() => handleAddtoCart(data._id, 1)}>
                <div className="text-sm hidden add-to-cart-button text-white bg-black w-auto px-5 h-[36px] lg:flex items-center justify-center rounded-md">
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      height={19}
                      width={19}
                      color="white"
                    />
                  ) : (
                    <>
                      <div className="mr-1">
                        <BsBag size={15} />
                      </div>
                      <h1 className="mt-1">ADD TO CART</h1>
                    </>
                  )}
                </div>
              </button>
            )}
          </div>

          {/* Add to cart button for mobile */}
          <div className="">
            {data.quantity === 0 ? (
              <button className="w-[100%]">
                <div className="  lg:hidden add-to-cart-button-mobile  xl:hidden  text-white text-sm bg-[#D64147] w-[100%]   p-2 xs:flex items-center justify-center ">
                  OUT OF STOCK
                </div>
              </button>
            ) : (
              <button
                className="w-[100%] absolute top-0 left-0 h-full 
      bg-gradient-to-r from-transparent via-white/40 to-transparent
      -translate-x-full rotate-25 group-hover:animate-shine  "
                onClick={() => handleAddtoCart(data._id, 1)}
              >
                <div
                  className="text-sm lg:hidden xl:hidden add-to-cart-button-mobile  text-white bg-[black] 
            w-[100%]   p-2 flex items-center justify-center  "
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <div className="mr-1">
                        <BsBag size={15} />
                      </div>
                      <h1 className="mt-1">ADD TO CART</h1>
                    </>
                  )}
                </div>
              </button>
            )}
          </div>

          {/* Over lay for product view ,addToWhishlict and compare */}
          <div className="overlay transition flex justify-center items-center">
            <ul className="pb-0 flex flex-col ">
              <li className="">
                {isInWishlist(data._id) ? (
                  <div className="tooltip" data-tip="Remove Wishlist">
                    {deleteWishListLoading ? (
                      <ReactLoading
                        type="spin"
                        color="white"
                        height={18}
                        width={18}
                      />
                    ) : (
                      <FaHeart
                        size={19}
                        onClick={() => removeFromWishlistHandler(data._id)}
                        className="w-5 cursor-pointer"
                        color="red"
                      />
                    )}
                  </div>
                ) : (
                  <div className="tooltip" data-tip="Add Wishlist">
                    {isWishListLoading ? (
                      <ReactLoading
                        type="spin"
                        color="white"
                        height={18}
                        width={18}
                      />
                    ) : (
                      <FaRegHeart
                        size={19}
                        onClick={() => addToWishlistHandler(data._id)}
                        className="w-5 cursor-pointer"
                        color="white"
                      />
                    )}
                  </div>
                )}
              </li>

              <div className="tooltip " data-tip="View">
                <li className="cursor-pointer">
                  <EyeIcon
                    onClick={() => setModalOpen(!modalOpen)}
                    className="w-5"
                  />
                </li>
              </div>

              <div className="tooltip  " data-tip="Compare">
                <li className="">
                  <ArrowPathIcon className="w-5 " />
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="info p-3 ">
          <Link
            // onClick={() => sessionStorage.setItem("title", `${product_name}`)}

            to={`/allproduct/${data._id}`}
          >
            <span className="block brand text-xs">Brand:{data.brand}</span>
            <h4 style={{ color: "" }} className="title text-sm">
              {data.productName.length > 20
                ? data.productName.substring(0, 30)
                : data.productName}
            </h4>
          </Link>
          {/* <div className="flex items-center">
            <Rating
              style={{ maxWidth: 80 }}
              value={data?.rating?.rate}
              readOnly
              itemStyles={myStyles}
            />
            <span className="pl-3">{data?.rating?.rate}</span>
          </div> */}
          <Link
            // onClick={() => sessionStorage.setItem("title", `${product_name}`)}

            to={`/allproduct/${data._id}`}
          >
            <div className="flex justify-between items-center h-20">
              {/* Price on the left side */}
              <h4 className="text-sm font-[700]">
                ${handleDiscount(data?.price)} {/* Discounted Price */}
              </h4>

              {/* Discount Price and Discount Percentage on the right side */}
              <div className="flex items-center space-x-2">
                <span className="line-through text-xs text-[gray] font-thin">
                  ${data?.price} {/* Original Price */}
                </span>

                <p className="text-[red] text-xs">
                  {data?.discount}% off {/* Discount Percentage */}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* </div> */}

      {modalOpen ? (
        <OpenCardModal setModalOpen={setModalOpen} data={data} />
      ) : null}
    </div>
  );
};

export default Products;
