import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import React, { useContext, useEffect, useRef, useState } from "react";
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

const OpenCardModal = ({ setModalOpen, data }) => {
  const [count, setCount] = useState(1);

  const [active, setActive] = useState(0);

  const { getCartProduct, addToCartLoading } = useSelector((state) => state.cart)
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
    speed: 500,
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
    const actualPrice = productPrice - (productPrice * discount / 100)
    return actualPrice
  }

  ///handle Add to cart///
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  ///add to cart Function///
  const token = localStorage.getItem("usertoken")

  ///add to cart Function///

  const handleAddtoCartforModal = async (id, product, quantity) => {
    // Check if the product has size options
    const requiresSize = product.sizes && product.sizes.length > 0;
    try {
      if (token == null) {
        Navigate('/login');
        return;

      }
      else if (requiresSize && size === "") {
        toast.error("please select a size")
        return;
      }

      else {


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

    const product = getCartProduct.find((pd) => pd.productid === id)
    return product ? product?.quantity : 0




  }


  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the screen width meets the criteria for a "mobile" device
    const isMobileScreen = window.matchMedia("(max-width: 660px)").matches;
    setIsMobileDevice(isMobileScreen);
  }, []);




  return (
    <div className="">
      {data ? (
        <div className="fixed w-full h-screen top-0 right-0 bg-[#80808034] z-50 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[95vh] overflow-y-scroll md:h-[70vh] bg-[white] rounded-2xl shadow-2xl relative px-4 flex items-center justify-center  ">
            <RxCross1
              onClick={() => setModalOpen(false)}
              size={30}
              className="absolute right-3 top-3 z-10"
            />

            <div className="mt-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 ">
                <div className="">
                  <div className="border-solid border-2 border-[#80808016] rounded-2xl  ">
                    <div className="">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Product Image",
                            isFluidWidth: true,
                            src: newimage,
                            width: 400,
                            height: 500,

                          },
                          largeImage: {
                            src: newimage,
                            width: isMobileDevice ? 400 : 550,
                            height: isMobileDevice ? 1200 : 1800,


                          },
                          enlargedImageContainerStyle: {
                            zIndex: 9999,
                            width: isMobileDevice ? "100%" : 700 // Set width to 100% on mobile devices
                          },
                          isHintEnabled: true,
                          shouldHideHintAfterFirstActivation: false,

                          enlargedImagePosition: isMobileDevice ? "over" : "side", // Set position to "over" on mobile devices

                          isActivatedOnTouch: false, // Enable inner zoom on touch devices
                          pressDuration: 200,
                          pressMoveThreshold: 9,
                          fadeDurationInMs: 700

                        }}
                      />


                    </div>

                  </div>

                  <Slider
                    ref={detailsRef}
                    {...settings}
                    className="details_slider w-full md:w-full p-0 "
                  >
                    {data.images &&
                      data.images.map((el, index) => {
                        return (
                          <div
                            onClick={() => imageHandler(el, index)}
                            className=""
                          >
                            <img className="h-32 w-40" src={`${el}`} alt="" />
                          </div>
                        );
                      })}
                  </Slider>
                </div>

                <div className="info mt-8 ">
                  <div className="badge bg-[green] text-[white] ">
                    <h2 className=""><span className="mr-2">{data?.type}</span> {data?.discount}%</h2>
                  </div>
                  <h3 className=" text-2xl ">{data.title}</h3>
                  <p className="text-sm">
                    {data.description.length > 140
                      ? data.description.slice(0, 340) + "..."
                      : data.description}
                  </p>
                  <br />

                  {/* size/weight chart */}

                  <div className="product_size flex  items-center">
                    <span>Size / Weight:</span>
                    <ul className="list-items flex items-center pl-4">
                      {data.sizes &&
                        data.sizes.map((i, index) => {
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
                  <p>items left : {data?.quantity}</p>
                  <div className="flex items-center ">
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={data?.rating?.rate}
                      readOnly
                      itemStyles={myStyles}
                    />
                    <br /> <br />
                    <span className="pl-3">{data?.rating?.rate}</span>
                  </div>
                  <div className="flex items-center">
                    <h4 className=" text-2xl font-[900]">${handleDiscount(data.price)}</h4>
                    <div className="pl-2 flex flex-col items-center">
                      <p className="text-[red] text-sm ">{data?.discount}% off</p>
                      <span className="line-through text-lg  font-[500]  text-[gray]">
                        ${data?.price}
                      </span>
                    </div>
                  </div>

                  {/* inc and dec and button add to cart */}
                  <div className=" py-5 border-t border-b my-7" >
                    <div className="flex items-center  mt-3 w-[100%]">
                      <div className={`${data?.quantity === 0 ? "hidden" : "block"}`}>
                        {/* inc and dec and button add to cart */}
                        <div className='flex  h-[40px]  '>

                          <button
                            onClick={decrease}
                            className={` border p-[.5rem] cursor-pointer ${count == 1 ? 'bg-[#FAFAFA] cursor-not-allowed' : "bg-[#DADADA]"}`}>-</button>
                          <div className='border p-[.5rem]'>{count}</div>
                          <button
                            disabled={count == 5}
                            onClick={increase}
                            className={`border  p-[.5rem] cursor-pointer ${count == 5 ? 'bg-[#FAFAFA] cursor-not-allowed' : "bg-[#DADADA]"}`}>+</button>
                        </div>
                      </div>

                      <div className="ml-3">

                        {data?.quantity === 0 ?
                          <button>
                            <div className="text-white text-sm bg-[#D02128] w-[100%] h-[40px] p-3 flex items-center justify-center ">
                              <ShoppingBagIcon className="w-5 h-5 mr-1 " />
                              <h2 className="uppercase font-bold">OUT OF STOCK</h2>
                            </div>

                          </button> : <button onClick={() => handleAddtoCartforModal(data._id, data, count)}>

                            <div
                              className={`text-md w-[100%] h-[40px] px-10 py-6 flex items-center justify-center ${data.sizes &&
                                  data.sizes.length > 0
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

                        }






                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenCardModal;
