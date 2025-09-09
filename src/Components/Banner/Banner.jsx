import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetBanner } from "../../redux/Slice/bannerSlice/bannerSlice";

const Banner = () => {
  const { GetBannerImages, loading } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(GetBanner());
  }, [dispatch]);

  useEffect(() => {
    if (GetBannerImages?.length > 0) {
      // Flatten all banner images into one array
      const allImages = GetBannerImages.flatMap((item) => item.images || []);
      setImages(allImages);
    }
  }, [GetBannerImages]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    arrows: false,
  };

  return (
    <div className="rounded-3xl w-full sm:pt-6 ">
      {loading ? (
        // Skeleton Loader
        <div className="animate-pulse w-full rounded-3xl overflow-hidden">
          <div className="w-full h-[200px] sm:h-[420px] lg:h-[520px] bg-gray-200 rounded-3xl"></div>
        </div>
      ) : (
        <Slider className="slider_main w-full" {...settings}>
          {images &&
            images.reverse().map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl w-full h-[200px] sm:h-[420px] lg:h-[520px]"
              >
                <img
                  className="w-full h-full sm:object-cover rounded-3xl transition duration-700 transform hover:scale-105"
                  src={image}
                  alt="Banner"
                />
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default Banner;
