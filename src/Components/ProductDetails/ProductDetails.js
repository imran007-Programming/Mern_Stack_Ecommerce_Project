import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ProductDetails.scss";

import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Avatar, Button } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlineDeleteForever } from "react-icons/md";
import ReactImageMagnify from "react-image-magnify";

import {
  getSingleProduct,
  getSimilarProducts,
} from "../../redux/Slice/ProductSlice/ProductSlice";

import {
  getReview,
  DeleteReview,
  addReview,
} from "../../redux/Slice/reviewSlice/ReviewSlice.js";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Share/Loading";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";
import toast from "react-hot-toast";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice";
import Products from "../Allproduct/Products";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Catslider from "../catSlider/Catslider.js";
import Skeleton from "../Skeleton/Skeleton.js";
import WishListViewSkeleton from "../Wishlist/WishListViewSkeleton.js";
const ProductDetails = () => {
  const [newimage, setNewImage] = useState("");
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState("");

  const [tabActive, setTabActive] = useState(0);

  const [rating, setRating] = useState(0);
  const [description, setDiscription] = useState("");
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const {
    productDetails,
    productdetaillsLoading,

    getsimilarproducts,
    getsimilarproductsLoading,
  } = useSelector((state) => state.products);

  const { getReviewLoading, reviewLoading, DeleteReviewLoading } = useSelector(
    (state) => state.reviews
  );

  const [isLoading, setIsLoading] = useState(false);
  const { userLoggedInData } = useSelector((state) => state.user);
  const { getCartProduct } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Fetch product details and reviews
  useEffect(() => {
    const fetchProductDetailsAndReviews = async () => {
      const data = {
        productid: id,
      };
      try {
        setIsLoading(true);
        setReview([]);
        const [productRes, reviewRes] = await Promise.all([
          dispatch(getSingleProduct(data)),
          dispatch(getReview(data)),
        ]);

        setReview(reviewRes.payload);
        setNewImage(productRes.payload.images[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetailsAndReviews();
  }, [dispatch, id]);

  const Navigate = useNavigate();

  useEffect(() => {
    const data = {
      productid: id,
    };

    dispatch(getSimilarProducts(data));
  }, [productDetails]);

  ///Get current user///
  const userverify = () => {
    dispatch(userLoggedIn());
  };

  useEffect(() => {
    userverify();
  }, []);

  // Update image when product details change
  useEffect(() => {
    if (productDetails.images && productDetails.images.length > 0) {
      setNewImage(productDetails.images[0]);
    }
  }, [productDetails]);

  const detailsRef = useRef();

  const imageHandler = (i, index) => {
    setNewImage(i);

    detailsRef.current.slickGoTo(index);
  };
  var settings = {
    dots: false,

    speed: 500,
    infinite: false,
    speed: 500,
    slidesToShow: 3,

    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    fade: false,
  };

  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#FD5B5A",
    inactiveFillColor: "#686868",
  };

  const isActive = (i, index) => {
    setActive(i);
    setSize(index);
  };

  ////submit review data///
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("usertoken");

    if (token == null) {
      toast.error("please login before write a review");
      Navigate("/login");
    } else if (rating == "") {
      toast.error("please give me a rating");
    } else if (description === "") {
      toast.error("please write a description");
    } else {
      const data = {
        productid: productDetails._id,
        usermainid: userLoggedInData[0]?._id,
        username: userLoggedInData[0]?.firstname,
        avatar: userLoggedInData[0]?.userprofile,
        description,
        rating,
      };
      dispatch(addReview(data))
        .then((res) => {
          if (res.payload) {
            setReview((prevReviews) => [...prevReviews, res.payload]);
            setDiscription("");
            setRating(0);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const ratingPercentageCalculation = (starRating) => {
    const totalReviews = review.length;
    if (totalReviews === 0) {
      return 0;
    }
    const starReviews = review.filter(
      (review) => review.rating == starRating
    ).length;

    return (starReviews / totalReviews) * 100;
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);

    return date.toLocaleString();
  };

  ///deleteReview///
  const handleDeleteReview = (id) => {
    const data = {
      reviewid: id,
    };
    dispatch(DeleteReview(data))
      .then((res) => {
        if (res.payload) {
          setReview((prev) => prev.filter((r) => r._id !== id));
        }
      })
      .catch((error) => {});
  };
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the screen width meets the criteria for a mobile device
    const isMobileScreen = window.matchMedia("(max-width: 660px)").matches;
    setIsMobileDevice(isMobileScreen);
  }, []);

  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = productDetails?.discount;
    const actualPrice = productPrice - (productPrice * discount) / 100;
    return actualPrice;
  };

  ///add to cart Function///

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
    // Check if the product has size options
    const requiresSize = product.sizes && product.sizes.length > 0;
    try {
      if (token == null) {
        Navigate("/login");
        return;
      } else if (requiresSize && size === "") {
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

  const ratingNumber = () => {
    const numberofRating = review?.map((rw) => rw.rating);

    return numberofRating;
  };

  const reviewSectionRef = useRef(null);

  // Reset rating state when product details change
  useEffect(() => {
    setRating(0);
  }, [productDetails]);

  // Scroll to the review section
  const scrollToReviews = () => {
    reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Catslider />

      {productdetaillsLoading ? (
        <WishListViewSkeleton width={"25px"} />
      ) : (
        <div className="container-fluide">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-0">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[400px] h-[auto] ">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Product Image",
                      isFluidWidth: true,
                      src: newimage,
                    },
                    largeImage: {
                      src: newimage,
                      width: isMobileDevice ? 400 : 550,
                      height: isMobileDevice ? 1200 : 1800,
                    },
                    enlargedImageContainerStyle: {
                      zIndex: 9999,
                      width: isMobileDevice ? "100%" : 700, // Set width to 100% on mobile devices
                    },
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false,

                    enlargedImagePosition: isMobileDevice ? "over" : "side", // Set position to "over" on mobile devices

                    isActivatedOnTouch: false, // Enable inner zoom on touch devices
                    pressDuration: 200,
                    pressMoveThreshold: 9,
                    fadeDurationInMs: 700,
                  }}
                />

                {/* <InnerImageZoom
                  className="w-full h-full object-cover md:object-contain"
                  zoomScale={2}
                  zoomType="hover"
                  src={newimage}
                /> */}
              </div>

              <Slider
                ref={detailsRef}
                {...settings}
                className="details_slider w-full md:w-[70%] mb-0  "
              >
                {productDetails?.images &&
                  productDetails?.images?.map((el, index) => {
                    return (
                      <div onClick={() => imageHandler(el, index)}>
                        <img className="h-32 w-40" src={`${el}`} alt="" />
                      </div>
                    );
                  })}
              </Slider>
            </div>

            <div className="info p-3">
              <div className="badge bg-[#fde0e9] text-[#f74b81] p-[18px]">
                <h2 className="uppercase">
                  <span className="mr-2">{productDetails?.type}</span>
                  {productDetails?.discount}%
                </h2>
              </div>
              <h3 className="text-[20px] font-bold md:text-xl my-5">
                {productDetails.productName}
              </h3>

              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={ratingNumber()}
                  readOnly
                  itemStyles={myStyles}
                />
                <br /> <br />
                {review?.length ? (
                  <span
                    onClick={scrollToReviews}
                    className="pl-3 text-sm cursor-pointer text-gray-500"
                  >
                    ({review.length} reviews)
                  </span>
                ) : (
                  <span className="pl-3 text-sm text-gray-500">
                    There are no reviews yet.
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <h4 className="text-xl font-[900]">
                  ${handleDiscount(productDetails?.price)}
                </h4>
                <div className="pl-2 flex flex-col items-center">
                  <p className="text-[red] text-xl  ">
                    {productDetails?.discount}% off
                  </p>
                  <span className="line-through text-xl   text-[gray]">
                    ${productDetails?.price}
                  </span>
                </div>
              </div>

              <p className="text-black text-sm ">
                {productDetails.description}
              </p>
              <br />

              {/* size/weight chart */}

              <div className="product_size flex  items-center mb-6">
                <span>Size / Weight:</span>
                <ul className="list-items flex items-center pl-4">
                  {productDetails.sizes &&
                    productDetails.sizes.map((i, index) => {
                      return (
                        <li className="list">
                          <a
                            className={`tag ${
                              active === index
                                ? "bg-black text-white"
                                : " bg-white text-black"
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

              {productDetails?.quantity > 0 ? (
                <span className=" text-black  text-sm ">AVAILABILITY :</span>
              ) : null}

              <span className="text-black ">
                {productDetails?.quantity > 0 ? (
                  <span className="bg-[#218838] border-0 text-sm px-7 py-2 rounded-full text-white ml-2 uppercase">
                    In stock
                  </span>
                ) : null}
              </span>

              <div className=" py-5 border-t border-b my-7">
                <div className="flex items-center  mt-3 w-[100%]">
                  <div
                    className={`${
                      productDetails?.quantity === 0 ? "hidden" : "block"
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
                    {productDetails?.quantity === 0 ? (
                      <button>
                        <div className="text-white text-sm bg-[#D02128] w-[100%] h-[40px] p-3 flex items-center justify-center ">
                          <ShoppingBagIcon className="w-5 h-5 mr-1 " />
                          <h2 className="uppercase font-bold">OUT OF STOCK</h2>
                        </div>
                      </button>
                    ) : (
                      <button>
                        <div className="ml-3">
                          {productDetails?.quantity === 0 ? (
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
                                  productDetails._id,
                                  productDetails,
                                  count
                                )
                              }
                            >
                              <div
                                className={`text-md w-[100%] h-[40px] px-10 py-6 flex items-center justify-center ${
                                  productDetails.sizes &&
                                  productDetails.sizes.length > 0
                                    ? size === ""
                                      ? "text-white bg-[#858484] cursor-pointer"
                                      : "text-white bg-[black]"
                                    : "text-white bg-[black]"
                                }`}
                              >
                                {isLoading && (
                                  <span className="loading loading-spinner loading-sm" />
                                )}
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
            </div>
          </div>

          <div></div>

          {/* similar products show */}

          <div className="productrow">
            <hr />
            <h1 className="text-2xl font-[700] my-7">Similar products</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-6">
              {getsimilarproducts?.map((pd, index) => {
                return getsimilarproductsLoading ? (
                  <Skeleton />
                ) : (
                  <Products key={index} data={pd} />
                );
              })}
            </div>
          </div>

          <div
            ref={reviewSectionRef}
            className="w-[100%] mt-5 h-[60%] p-6 border-solid border-2 border-[#8080801c] rounded-2xl"
          >
            <div className="customtabs">
              <ul className="flex items-center ">
                <li>
                  <Button onClick={() => setTabActive(0)}>Description</Button>
                </li>
                <li>
                  <Button onClick={() => setTabActive(1)}>
                    Review({review?.length})
                  </Button>
                </li>
              </ul>
            </div>
            {tabActive === 0 ? (
              <div className="w-[100%] ">
                <p className="line-clamp-7 text-sm p-3">
                  {productDetails.description}
                </p>
              </div>
            ) : null}
            {tabActive === 1 ? (
              <div className=" grid grid-col-1 md:grid-cols-2 gap-x-6">
                <div className="">
                  <h3 className="text-2xl mt-3">
                    Customers questions & Answers
                  </h3>
                  <br />
                  <>
                    {DeleteReviewLoading || getReviewLoading ? (
                      <Loading />
                    ) : (
                      <>
                        {" "}
                        {review.map((review, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full p-6 border-solid border-2 border-[#8080801c] rounded-2xl"
                            >
                              <div className="flex gap-x-10">
                                <div className="flex flex-col gap-y-5">
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={review?.avatar}
                                    sx={{ width: 56, height: 56 }}
                                  />
                                  <h1 className="">{review.username}</h1>
                                </div>
                                <div className="w-full">
                                  <div className="flex">
                                    <p className="text-sm text-gray-500">
                                      {formatCreatedAt(review.createdAt)}
                                    </p>
                                    <div className="ml-auto">
                                      <Rating
                                        style={{ maxWidth: 80 }}
                                        value={review?.rating}
                                        readOnly
                                        itemStyles={myStyles}
                                      />
                                    </div>
                                  </div>
                                  <p className="mt-6 ">{review.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-end">
                                <div
                                  data-tip="delete review"
                                  className="tooltip flex"
                                >
                                  {localStorage.getItem("usertoken") ? (
                                    <MdOutlineDeleteForever
                                      onClick={() =>
                                        handleDeleteReview(review._id)
                                      }
                                      className=" cursor-pointer  "
                                      size={25}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>

                  <h2 className="text-2xl capitalize my-5">Add a Review</h2>
                  <form action="">
                    <div className="w-full">
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        required
                        className="w-[100%] md:w-[90%] outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="write Comment.."
                        id="description"
                        name="description"
                        rows="7"
                        cols="52"
                        type="text"
                        value={description}
                      />
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={rating}
                        onChange={setRating}
                        isRequired
                      />
                      <input
                        value={
                          userLoggedInData.length > 0
                            ? userLoggedInData[0]?.firstname
                            : ""
                        }
                        required
                        className="w-[100%] md:w-[40%] my-2 outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="Name"
                        type="text"
                      />
                      <input
                        value={
                          userLoggedInData.length > 0
                            ? userLoggedInData[0]?.email
                            : ""
                        }
                        required
                        className="w-[100%] md:w-[40%] outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="email"
                        type="text"
                      />
                    </div>
                    {reviewLoading ? (
                      <Loading />
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        type="Submit"
                        sx={{
                          marginTop: "18px",
                        }}
                        variant="contained"
                        color="success"
                      >
                        Submit
                      </Button>
                    )}
                  </form>
                </div>

                <div className="mt-4">
                  <h2>Customers Review</h2>
                  {/* <div className=' flex items-center gap-x-3 '>
                            <Rating
                                className=''
                                style={{ maxWidth: 80 }}
                                value={currentData?.rating?.rate}
                                readOnly
                                itemStyles={myStyles}
                            />
                            <span className='font-bold'>{currentData?.rating?.rate} out of 5</span>

                        </div> */}
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div key={index} className="flex items-center">
                      <span>{star} star</span>
                      <ProgressBar
                        className="ml-4 w-[200px] md:w-[400px]"
                        completed={ratingPercentageCalculation(star)}
                        bgColor="#FFB700"
                        height="20px"
                        width=""
                        borderRadius="0px"
                        isLabelVisible={true}
                        labelColor="white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
