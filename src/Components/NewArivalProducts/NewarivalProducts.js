import React, { useEffect } from "react";
import "./NewarivalProducts.scss"
import Slider from "react-slick";
import productimg1 from "../../assest/Purple-Rose.webp"
import { newarivalproduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NewarivalProducts = () => {
  const dispatch = useDispatch()

  ///fetch newarival product///

  const { newArivalProduct } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(newarivalproduct())
  }, [dispatch])


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
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        }
      }
    ]







  };




  return (
    <div className="container-fluide home-slider flex items-center overflow-hidden">
      <div className="w-[100%]">
        <h1 className=" text-3xl text-center font-semibold">Best Selling Products</h1>
        <Slider {...settings} className="pd_slider_main" >

          {
            newArivalProduct?.length !== 0 &&
            newArivalProduct?.slice(0, 8)?.map((el) => {
              return (
                <Link key={el._id} to={`/allproduct/${el._id}`}>


                  <div key={el._id}>

                    <div >
                      <figure className="p-4">
                        <img
                          src={el.images[0]}
                          // alt={el.images[0]}
                          className="object-contain h-[350px]"
                        />
                      </figure>
                      <div className="card-body">


                        <div className="flex">
                          {/* <p>price:${el.price}</p>
                          <p className="">{el.discount}% off</p> */}
                        </div>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              )
            })
          }


        </Slider>
        <h2 className="text-4xl">OUR LOCATIONS</h2>
      </div>

    </div>
  );
};

export default NewarivalProducts;
