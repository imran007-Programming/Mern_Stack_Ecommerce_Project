import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.scss"
import slide1 from "../../assest/Cover-Photo--Summer-T-Shirt.webp";
import slide2 from "../../assest/Website-Landing-Image-Kids.webp";
import slide3 from "../../assest/Website-Slider-Joggers.webp";
import { useDispatch, useSelector } from "react-redux";
import { GetBanner } from "../../redux/Slice/bannerSlice/bannerSlice";


const Banner = () => {
   const { GetBannerImages, loading, error } = useSelector((state) => state.banner)
   const dispatch = useDispatch()
   const [images, setImages] = useState([])
   useEffect(() => {
      dispatch(GetBanner())
   }, [dispatch])
  

   useEffect(() => {
      if (GetBannerImages) {
         GetBannerImages.map((image) => setImages(image.images))
      }
   }, [GetBannerImages]);

   var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true

   };
   return (
      <div className="home-slider flex justify-center items-center ">

         <div className="w-[100%]  
          ">
            <Slider className="slider_main"  {...settings}>
               {
                  images && images.map((image) => {
                     return (
                        <div key={image} className="item flex items-center justify-center overflow-hidden relative ">
                           <img className="md:w-full md:h-[420px] md:object-fill h-[280px] object-cover transition duration-[3s] transform hover:scale-110 " src={image} alt="" />
                        </div>
                     )
                  })
               }



            </Slider>
         </div>

      </div>
   )
}

export default Banner