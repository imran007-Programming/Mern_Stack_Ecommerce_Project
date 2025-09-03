import React, { useContext, useEffect, useState } from "react";
import "./Products.scss";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import LazyLoad from 'react-lazyload';

import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
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
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { ThemeContex } from "../../Contexapi/Themecontex";
import OpenCardModal from "./OpenCardModal.js";

import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice.js";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice.js";
import { BsBag } from "react-icons/bs";
import { addtoWishList, deleteWishList, getWishList } from "../../redux/Slice/wishListSlice/wishListSlice.js";
import ReactLoading from "react-loading";
import ImageSkeleton from "./ImageSkeleton.js";
const Products = ({ data, height }) => {
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const { theme } = useContext(ThemeContex);
  const [modalOpen, setModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [deleteWishListLoading, seDeleteWishListLoading] = useState(false);
  const [localWishlist, setLocalWishlist] = useState([]);
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(data.images[0]);




  ///add to cart Function///
  const token = localStorage.getItem("usertoken")
  const handleAddtoCart = (id, quantity) => {
    if (!token) {
      Navigate("/login")
    }
    else {
      setIsLoading(true);
      const data = {
        productid: id,
        quantity: quantity
      };
      dispatch(addtoCart(data))
        .then((res) => {
          if (res.payload) {

            // setCartopen(!cartopen);

          }
        })
        .catch((error) => {
         
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    const actualPrice = productPrice - (productPrice * discount / 100)
    return actualPrice
  }




  // Fetch wishlist data when the component mounts
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  // Get wishlist data from Redux store
  const { getWishListProduct } = useSelector((state) => state.wishlist);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalWishlist(getWishListProduct.map(product => product.details._id));
  }, [getWishListProduct]);

  // Function to check if the productId exists in the local wishlist state
  const isInWishlist = (productId) => {
    return localWishlist.includes(productId);
  };

  // Function to add a product to the wishlist
  const addToWishlistHandler = (id) => {
    if (token == null) {
      Navigate('/login');
    } else {

      setIsWishListLoading(true);
      setLocalWishlist(prevState => [...prevState, id]);
      const data = { productid: id };
      dispatch(addtoWishList(data))
        .then(() => {
          dispatch(getWishList()); // Fetch updated wishlist
        })
        .catch((error) => {
        
          setLocalWishlist(prevState => prevState.filter(item => item !== id));
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
    setLocalWishlist(prevState => prevState.filter(item => item !== id)); // Optimistic update
    const data = { productid: id };
    dispatch(deleteWishList(data))
      .then(() => {
        dispatch(getWishList()); // Fetch updated wishlist
      })
      .catch((error) => {
      
        setLocalWishlist(prevState => [...prevState, id]);
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
  setImageSrc(data.images[0]); // Reset to the original image
};




  return (
    <div className="product-card relative">


      <div
        className={`  product-details `}>
        {/* {data?.type !== null && data?.type !== undefined && (
          <div className="badgge"><span className={`badgee sm:z-[5]   ${data.type}`}>{data.type}</span></div>
        )} */}


        <div className={`imgwraper`}
           onMouseEnter={handleHover}
           onMouseLeave={handleMouseLeave}
        >
          <Link

            // onClick={() => sessionStorage.setItem("title", `${product_name}`)} 


            to={`/allproduct/${data._id}`}>
            <div className=" cursor-pointer  flex items-center justify-center ">
            <LazyLoad once placeholder={<ImageSkeleton />} debounce={100}>
                <img className="product-image" src={imageSrc} alt="" />
              </LazyLoad>

            </div>
          </Link>
          {/* Add to cart button for Desktop */}

          <div>
            {data?.quantity === 0 ?
              <button>
                <div className="hidden add-to-cart-button text-white text-sm bg-[#D64147] w-[100%] h-[40px] p-3 lg:flex items-center justify-center ">

                  OUT OF STOCK
                </div>

              </button> : <button onClick={() => handleAddtoCart(data._id, 1)}>

                <div className="text-sm hidden add-to-cart-button text-white bg-[black] w-auto p-3  lg:flex items-center justify-center ">
                  <>
                    {
                      isLoading ? (
                        <span className="loading loading-spinner loading-sm" />) :

                        <>
                          <div className="mr-1">
                            <BsBag size={15} />
                          </div>
                          <h1 className="mt-1">ADD TO CART</h1>
                        </>

                    }

                  </>



                </div>

              </button>

            }
          </div>
          {/* Add to cart button for mobile */}
          <div className="">
            {
              data.quantity === 0 ? <button className="w-[100%]">
                <div className=" lg:hidden add-to-cart-button-mobile  xl:hidden  text-white text-sm bg-[#D64147] w-[100%]   p-2 xs:flex items-center justify-center ">

                  OUT OF STOCK
                </div>

              </button> : <button className="w-[100%] " onClick={() => handleAddtoCart(data._id, 1)}>

                <div className="text-sm lg:hidden xl:hidden add-to-cart-button-mobile  text-white bg-[black] 
            w-[100%]   p-2 flex items-center justify-center  ">
                  {
                    isLoading ? (
                      <span className="loading loading-spinner loading-sm" />) : (<>

                        <div className="mr-1">
                          <BsBag size={15} />
                        </div>
                        <h1 className="mt-1">ADD TO CART</h1>
                      </>)
                  }


                </div>

              </button>
            }
          </div>

          <div className="overlay transition flex justify-center items-center">
            <ul className="pb-0 flex justify-center  ">
              <li className="">
                {isInWishlist(data._id) ? (
                  <div className="tooltip" data-tip="Remove Wishlist">
                    {deleteWishListLoading ? (
                      <ReactLoading type="spin" color="white" height={18} width={18} />
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
                      <ReactLoading type="spin" color="white" height={18} width={18} />
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


            to={`/allproduct/${data._id}`}>
            <span
              style={theme == "dark" ? { color: "white" } : { color: "black" }}
              className="block brand text-xs"
            >

              Brand:{data.brand}
            </span>
            <h4
              style={{ color: "" }}
              className="title text-sm h-[40px] my-3"
            >
              {
                data.productName.length > 20 ? data.productName.substring(0, 50) : data.productName}
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

            to={`/allproduct/${data._id}`}>
            <div className="flex items-center justify-stretch mt-6">
              <span className="text-xl">$</span>
              <h4 className="text-sm font-[700]">

                {handleDiscount(data?.price)}
              </h4>

              <span className="line-through text-xs   text-[gray] mx-5 font-thin">
                ${data?.price}

              </span>

              <p className=" text-[orange] text-xs  ">
                {data?.discount}%off
              </p>


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