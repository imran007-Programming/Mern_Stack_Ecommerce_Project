import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./OpenCardModal.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import ReactImageMagnify from "react-image-magnify";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import WishListViewSkeleton from "../Wishlist/WishListViewSkeleton";

const OpenCardModal = ({ setModalOpen, data }) => {
  const [count, setCount] = useState(1);
  const [skeloading, setSkeletonLoading] = useState(false);
  const [active, setActive] = useState(0);

  const { getCartProduct, addToCartLoading } = useSelector(
    (state) => state.cart
  );
  const [newimage, setNewImage] = useState(
    data?.images ? data?.images[0] : data?.image
  );
  const [size, setSize] = useState("");

  const detailsRef = useRef();
  const imageHandler = (i, index) => {
    setNewImage(i);
    detailsRef.current.slickGoTo(index);
  };

  const isActive = (i, index) => {
    setActive(i);
    setSize(index);
  };

  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  ////Slider setings///

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

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    const actualPrice = productPrice - (productPrice * discount) / 100;
    return actualPrice;
  };

  ///handle Add to cart///
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  ///add to cart Function///
  const token = localStorage.getItem("usertoken");

  ///add to cart Function///

  const handleAddtoCartforModal = async (id, product, quantity) => {
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
        dispatch(addtoCart({ productid: id, quantity, size }));

        // Optionally, dispatch action to refresh the cart state from localStorage
        dispatch(getCart());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlecount = (id) => {
    const product = getCartProduct.find((pd) => pd.productid === id);
    return product ? product?.quantity : 0;
  };

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the screen width meets the criteria for a "mobile" device
    const isMobileScreen = window.matchMedia("(max-width: 660px)").matches;
    setIsMobileDevice(isMobileScreen);
  }, []);

  useEffect(() => {
    setSkeletonLoading(true);
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [data]);

  console.log(skeloading);
  return (
    <div className="">

      
      {data ? (
        <div className="fixed inset-0 bg-[#80808034] z-100 flex items-center justify-center px-2 sm:px-4">
          <div className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto">
            {/* Close button */}
            <RxCross1
              onClick={() => setModalOpen(false)}
              size={26}
              className="absolute right-3 top-3 z-10 cursor-pointer"
            />
            {
              skeloading? <div className="min-h-screen pt-15">
                
                <WishListViewSkeleton/>
                </div>: <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6">
              {/* Left: Product Image */}
              <div>
                <div className="border-2 border-[#80808016] rounded-2xl overflow-hidden">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Product Image",
                        isFluidWidth: true,
                        src: newimage,
                      },
                      largeImage: {
                        src: newimage,
                        width: isMobileDevice ? 400 : 700,
                        height: isMobileDevice ? 800 : 1200,
                      },
                      enlargedImageContainerStyle: {
                        zIndex: 9999,
                        width: isMobileDevice ? "100%" : 600,
                      },
                      enlargedImagePosition: isMobileDevice ? "over" : "side",
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                    }}
                  />
                </div>

                {/* Thumbnail Slider */}
                <Slider
                  ref={detailsRef}
                  {...settings}
                  className="details_slider w-full mt-3"
                >
                  {data.images &&
                    data.images.map((el, index) => (
                      <div
                        key={index}
                        onClick={() => imageHandler(el, index)}
                        className="cursor-pointer"
                      >
                        <img
                          className="h-20 sm:h-28 w-full object-contain"
                          src={el}
                          alt=""
                        />
                      </div>
                    ))}
                </Slider>
              </div>

              {/* Right: Product Info */}
              <div className="mt-4 md:mt-0">
                {/* Badge */}
                <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-md text-sm mb-2">
                  <span className="mr-2">{data?.type}</span>
                  {data?.discount}%
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {data.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {data.description.length > 140
                    ? data.description.slice(0, 140) + "..."
                    : data.description}
                </p>

                {/* Sizes */}
                {data.sizes?.length > 0 && (
                  <div className="flex items-center mb-4 flex-wrap gap-2">
                    <span className="text-sm font-medium">Size / Weight:</span>
                    <ul className="flex gap-2">
                      {data.sizes.map((i, index) => (
                        <li key={index}>
                          <button
                            className={`px-3 py-1 border rounded-md text-sm ${
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
                <p className="text-sm text-gray-600 mb-2">
                  Items left:{" "}
                  <span className="font-medium">{data?.quantity}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={data?.rating?.rate}
                    readOnly
                    itemStyles={myStyles}
                  />
                  <span className="pl-2 text-sm text-gray-700">
                    {data?.rating?.rate}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <h4 className="text-2xl font-bold text-gray-900">
                    ${handleDiscount(data.price)}
                  </h4>
                  <div className="pl-3">
                    <p className="text-red-600 text-sm">
                      {data?.discount}% off
                    </p>
                    <span className="line-through text-gray-500">
                      ${data?.price}
                    </span>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="border-t border-b py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  {data?.quantity > 0 && (
                    <div className="flex items-center">
                      <button
                        onClick={decrease}
                        className={`px-3 py-1 border rounded-l ${
                          count === 1
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-gray-200"
                        }`}
                      >
                        -
                      </button>
                      <div className="px-4 py-1 border">{count}</div>
                      <button
                        disabled={count === 5}
                        onClick={increase}
                        className={`px-3 py-1 border rounded-r ${
                          count === 5
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-gray-200"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <div className="flex-1">
                    {data?.quantity === 0 ? (
                      <button className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center">
                        <ShoppingBagIcon className="w-5 h-5 mr-2" />
                        OUT OF STOCK
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleAddtoCartforModal(data._id, data, count)
                        }
                        className={`w-full py-2 rounded-md flex items-center justify-center ${
                          data.sizes?.length > 0 && size === ""
                            ? "bg-gray-400 text-white"
                            : "bg-black text-white"
                        }`}
                      >
                        {isLoading && (
                          <span className="loading loading-spinner loading-sm mr-2" />
                        )}
                        <ShoppingBagIcon className="w-5 h-5 mr-2" />
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            }

           
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenCardModal;
