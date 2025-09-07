import { useEffect, useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ProductDetails.scss";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Avatar, Button } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  getSingleProduct,
  getSimilarProducts,
} from "../../redux/Slice/ProductSlice/ProductSlice.js";
import {
  getReview,
  DeleteReview,
  addReview,
} from "../../redux/Slice/reviewSlice/ReviewSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Share/Loading.jsx";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice.js";
import toast from "react-hot-toast";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice.jsx";
import Products from "../Allproduct/Products.jsx";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Catslider from "../catSlider/Catslider.jsx";
import Skeleton from "../Skeleton/Skeleton.jsx";
import WishListViewSkeleton from "../Wishlist/WishListViewSkeleton.jsx";
import InnerImageZoom from "react-inner-image-zoom";
import OpneModalSkeleton from "../Wishlist/OpneModalSkeleton.jsx";
const ProductDetails = () => {
  const [newimage, setNewImage] = useState("");
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
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
    setActiveImage(index);
    detailsRef.current.slickGoTo(index);
  };

  var settings = {
    dots: false,

    speed: 500,
    infinite: false,
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
    <div className="container mx-auto sm:px-6 px-3">
      <Catslider />

      {productdetaillsLoading ? 
           <>
            <div className="sm:hidden block ">
              <WishListViewSkeleton width={"25px"} />
            </div>
          <div className="hidden md:block">
             <OpneModalSkeleton />
          </div>
           </>
       : (
        <div className="w-full pt-13">
          {/* Top Section (Image + Info) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image & Slider */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-3 max-h-[450px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                {productDetails?.images?.map((el, index) => (
                  <div
                    key={index}
                    onClick={() => imageHandler(el, index)}
                    className={`cursor-pointer border-2 rounded-md  transition-all duration-200 ${
                      activeImage === index ? "border-gray-500" : "border-gray-300"
                    }`}
                  >
                    <img
                      src={el}
                      alt={`Thumbnail ${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Main Zoom Image */}
              <div className="flex-1 border-2 border-gray-200 rounded-xl flex justify-center items-center w-full max-w-[400px] sm:max-w-[500px]">
                <InnerImageZoom
                  src={newimage}
                  zoomSrc={newimage}
                  zoomType="hover"
                  zoomPreload={true}
                  fullscreenOnMobile={true}
                  fadeDuration={200}
                  className="rounded-xl object-contain"
                />
              </div>

              {/* Mobile Slider for Thumbnails */}
              <div className="w-full md:hidden mt-4 gap-x-10">
                <Slider
                  ref={detailsRef}
                  {...settings}
                  className="details_slider"
                >
                  {productDetails?.images?.map((el, index) => (
                    <div
                      key={index}
                      onClick={() => imageHandler(el, index)}
                      className={`cursor-pointer border-2 rounded-md  transition-all duration-200 ${
                        activeImage === index ? "border-gray-500" : "border-gray-300"
                      }`}
                    >
                      <img
                        className="w-full h-20 object-cover rounded"
                        src={el}
                        alt={`Thumbnail ${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Product Info */}
            <div className="info p-3">
              <div className="bg-[#fde0e9] w-fit px-3 py-1 rounded text-[#f74b81]">
                <h2 className="uppercase">
                  <span className="mr-2">{productDetails?.type}</span>
                  {productDetails?.discount}%
                </h2>
              </div>

              <h3 className="text-lg sm:text-xl font-bold my-5">
                {productDetails.productName}
              </h3>

              <div className="flex items-center flex-wrap gap-2">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={ratingNumber()}
                  readOnly
                  itemStyles={myStyles}
                />
                {review?.length ? (
                  <span
                    onClick={scrollToReviews}
                    className="text-sm cursor-pointer text-gray-500"
                  >
                    ({review.length} reviews)
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">No reviews yet.</span>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-3 my-3">
                <h4 className="text-xl font-bold">
                  ${handleDiscount(productDetails?.price)}
                </h4>
                <div className="flex flex-col items-start">
                  <p className="text-red-600 text-sm">
                    {productDetails?.discount}% off
                  </p>
                  <span className="line-through text-gray-500 text-sm">
                    ${productDetails?.price}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700">
                {productDetails.description}
              </p>

              {/* Sizes */}
              {productDetails?.sizes?.length > 0 && (
                <div className="product_size flex flex-wrap items-center mt-6 mb-4">
                  <span className="mr-2">Size / Weight:</span>
                  <ul className="flex flex-wrap gap-2">
                    {productDetails.sizes.map((i, index) => (
                      <li key={index}>
                        <button
                          className={`px-3 py-1 border rounded ${
                            active === index
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                          onClick={() => isActive(index, i)}
                        >
                          {i}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock */}
              {productDetails?.quantity > 0 && (
                <div className="my-3">
                  <span className="text-sm">AVAILABILITY :</span>
                  <span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full ml-2 uppercase">
                    In stock
                  </span>
                </div>
              )}

              {/* Cart Section */}
              <div className="py-5 border-t border-b border-gray-300 my-7">
                <div className="flex flex-wrap items-center gap-3">
                  {productDetails?.quantity > 0 && (
                    <div className="flex h-10">
                      <button
                        onClick={decrease}
                        className={`border border-gray-300 px-3 ${
                          count === 1
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-gray-300"
                        }`}
                      >
                        -
                      </button>
                      <div className="border border-gray-300 px-4 flex items-center">
                        {count}
                      </div>
                      <button
                        disabled={count === 5}
                        onClick={increase}
                        className={`border border-gray-300 px-3 ${
                          count === 5
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-gray-300"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <div className="flex-1">
                    {productDetails?.quantity === 0 ? (
                      <button className="w-full bg-red-700 text-white py-2 rounded">
                        <ShoppingBagIcon className="w-5 h-5 inline-block mr-1" />
                        OUT OF STOCK
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
                        className={`px-3 py-2 rounded text-white ${
                          productDetails.sizes?.length > 0 && size === ""
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-black"
                        }`}
                      >
                        {isLoading && (
                          <span className="loading loading-spinner loading-sm mr-2" />
                        )}
                        <ShoppingBagIcon className="w-5 h-5 inline-block mr-1" />
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="container mt-10">
            <div className="border border-gray-300"></div>
            <h1 className="text-lg sm:text-2xl font-bold my-5">
              Similar products
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getsimilarproducts?.map((pd, index) =>
                getsimilarproductsLoading ? (
                  <Skeleton key={index} />
                ) : (
                  <Products key={index} data={pd} />
                )
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div
            ref={reviewSectionRef}
            className="w-full mt-5 p-4 sm:p-6 border border-gray-200 rounded-2xl"
          >
            <div className="customtabs">
              <ul className="flex gap-4 border-b pb-2 mb-4">
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

            {tabActive === 0 && (
              <div className="w-full">
                <p className="text-sm p-3">{productDetails.description}</p>
              </div>
            )}

            {tabActive === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side: Reviews */}
                <div>
                  <h3 className="text-lg sm:text-2xl mb-4">
                    Customers questions & Answers
                  </h3>
                  {DeleteReviewLoading || getReviewLoading ? (
                    <Loading />
                  ) : (
                    review.map((review, index) => (
                      <div
                        key={index}
                        className="w-full p-4 sm:p-6 border-2 border-gray-200 rounded-2xl mb-4"
                      >
                        <div className="flex gap-4">
                          <Avatar
                            alt="User"
                            src={review?.avatar}
                            sx={{ width: 50, height: 50 }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">
                                {formatCreatedAt(review.createdAt)}
                              </p>
                              <Rating
                                style={{ maxWidth: 80 }}
                                value={review?.rating}
                                readOnly
                                itemStyles={myStyles}
                              />
                            </div>
                            <p className="mt-2">{review.description}</p>
                          </div>
                        </div>
                        {localStorage.getItem("usertoken") && (
                          <div className="flex justify-end mt-2">
                            <MdOutlineDeleteForever
                              onClick={() => handleDeleteReview(review._id)}
                              className="cursor-pointer text-red-500"
                              size={22}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/* Add Review */}
                  <h2 className="text-lg sm:text-2xl mt-6 mb-2">
                    Add a Review
                  </h2>
                  <form>
                    <textarea
                      onChange={(e) => setDiscription(e.target.value)}
                      required
                      className="w-full outline-none border-2 border-gray-200 resize-none p-3 mb-3"
                      placeholder="Write a comment..."
                      rows="5"
                      value={description}
                    />
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={rating}
                      onChange={setRating}
                      isRequired
                    />
                    <input
                      value={userLoggedInData[0]?.firstname || ""}
                      required
                      className="w-full sm:w-[45%] my-2 border-2 border-gray-200 p-3"
                      placeholder="Name"
                      type="text"
                    />
                    <input
                      value={userLoggedInData[0]?.email || ""}
                      required
                      className="w-full sm:w-[45%] border-2 border-gray-200 p-3"
                      placeholder="Email"
                      type="email"
                    />
                    {reviewLoading ? (
                      <Loading />
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        sx={{ marginTop: "18px" }}
                        variant="contained"
                        color="success"
                      >
                        Submit
                      </Button>
                    )}
                  </form>
                </div>

                {/* Right side: Rating Breakdown */}
                <div>
                  <h2 className="text-lg sm:text-xl mb-3">Customers Review</h2>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-2">
                      <span className="w-12">{star} star</span>
                      <ProgressBar
                        className="ml-2 flex-1 max-w-[300px] sm:max-w-[400px]"
                        completed={ratingPercentageCalculation(star)}
                        bgColor="#FFB700"
                        height="16px"
                        borderRadius="4px"
                        isLabelVisible
                        labelColor="white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
