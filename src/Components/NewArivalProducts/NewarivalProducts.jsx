import React, { useEffect, useState } from "react";
import "./NewarivalProducts.scss";
import Slider from "react-slick";
import { newarivalproduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react"; // icons
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice.jsx";

const NewarivalProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState(null); // ✅ for mobile toggle
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newArivalProduct, loading } = useSelector((state) => state.products);
  const token = localStorage.getItem("usertoken");

  const handleAddtoCart = (id, quantity) => {
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(true);
      const data = {
        productid: id,
        quantity: quantity,
      };
      dispatch(addtoCart(data))
        .then((res) => {
          if (res.payload) {
            // setCartopen(!cartopen);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="container-fluide home-slider flex items-center overflow-hidden">
      <div className="w-[100%]">
        <h1 className="text-2xl font-semibold text-start my-3">
          Best Selling Products
        </h1>

        <Slider {...settings} className="pd_slider_main">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
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
                <div key={el._id} className="p-4 group relative">
                  <figure
                    className="relative overflow-hidden rounded-xl shadow-md"
                    onClick={() =>
                      setActiveId(activeId === el._id ? null : el._id)
                    } // ✅ toggle overlay on tap
                  >
                    <img
                      src={el.images[0]}
                      alt={el?.productName || "Product"}
                      className="object-cover h-[350px] w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover + Mobile overlay */}
                    <div
                      className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center gap-3
                        ${
                          activeId === el._id
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    >
                      <button className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition">
                        <ShoppingCart
                          className="cursor-pointer"
                          onClick={() => handleAddtoCart(el._id, 1)}
                          size={20}
                        />
                      </button>
                      <Link to={`/allproduct/${el._id}`}>
                        <button className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition">
                          <Eye className="cursor-pointer" size={20} />
                        </button>
                      </Link>
                    </div>
                  </figure>

                  {/* Product info */}
                  <div className="mt-2 text-center">
                    <h2 className="text-base font-medium truncate">
                      {el.productName}
                    </h2>
                    <p className="text-sm text-gray-500">${el.price}</p>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewarivalProducts;
