import React, { useEffect } from "react";
import "./NewarivalProducts.scss";
import Slider from "react-slick";
import { newarivalproduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NewarivalProducts = () => {
  const dispatch = useDispatch();

  const { newArivalProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(newarivalproduct());
  }, [dispatch]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
    ],
  };

  return (
    <div className="container-fluide home-slider flex items-center overflow-hidden">
      <div className="w-[100%]">
        <h1 className="text-2xl text-start my-3 ">
          Best Selling Products
        </h1>

        <Slider {...settings} className="pd_slider_main">
          {loading
            ? // Skeleton loader (show 5 placeholders)
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="p-4">
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-[250px] w-full rounded-md"></div>
                    <div className="mt-3 space-y-2">
                      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            : newArivalProduct?.slice(0, 8)?.map((el) => (
                <Link key={el._id} to={`/allproduct/${el._id}`}>
                  <div>
                    <figure className="p-4">
                      <img
                        src={el.images[0]}
                        alt={el?.productName || "Product"}
                        className="object-center h-[350px] rounded-xl"
                      />
                    </figure>
                  </div>
                </Link>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewarivalProducts;
