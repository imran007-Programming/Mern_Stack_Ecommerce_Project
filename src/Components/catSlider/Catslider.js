import React, { useEffect, useState } from "react";
import "./Catslider.scss";
import Slider from "react-slick";
import icon1 from "../../assest/png-icon/laundry.png";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import Skeleton from "../Skeleton/Skeleton";
const Catslider = () => {
  const [bgColor, setBgColor] = useState([
    "#F2FCE4",
    "#FFFCEB",
    "#ECFFEC",
    "#FEEFEA",
    "#FFF3EB",
    "#FFF3FF",

    "#F2FCE4",

    "#FEEFEA",
    "#FFFCEB",
    "#feefea",
    "#fff3eb",
    "#fffceb",
    "#f2fce4",
  ]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows:false
        }
      },

      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows:false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots:false,
          arrows:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots:false,
          arrows:false
        }
      }
    ]

    
  };




  const { CategoryData,loading } = useSelector((state) => state.category);

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(adminGetCategory());
  }, []);






  return (
    <>
      {loading?null: <div className="catSlideSection">
        <div className="container-fluide">
          <h1 className=" text-3xl text-center font-semibold ">
         Shop By Categories
          </h1>
          <Slider {...settings} className="cat_slider_main ">
            {CategoryData.length !== 0 &&
              CategoryData.map((item, index) => {
                return (
                  <Link key={index} to={`/products-filter?categoryId=${item._id}`}>
                    <div key={index} className="item h-[250px]">
                      <div
                        style={{ backgroundColor: bgColor[index % bgColor.length] }}
                        className="info"
                      >
                        <img
                          className="object-contain h-20 rounded-full"
                          src={item.catimage}
                          alt=""
                        />
                        <h5 className="text-sm pt-3">{item.categoryName}</h5>
                        {
                          item.products?.length > 1 ? <p className="mx-2 text-sm"> {item.products.length}<span>(items)</span></p> : <p className="text-sm" >
                            {item.products?.length}<span >(item)</span>
                          </p>

                        }
                      </div>
                    </div>
                  </Link>
                );
              })}

          </Slider>
        </div>
      </div>}
      <br />

    </>
  );
};

export default Catslider;
