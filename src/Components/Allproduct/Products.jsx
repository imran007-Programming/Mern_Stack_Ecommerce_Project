import React, { useContext, useEffect, useState } from "react";
import "./Products.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import { Eye, ShoppingCart } from "lucide-react"; // sleek icons

import { Link, useNavigate } from "react-router-dom";
import { CartopenContex } from "../../Contexapi/Cartopencontex.jsx";
import OpenCardModal from "./OpenCardModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice.jsx";
import { getWishList, addtoWishList, deleteWishList } from "../../redux/Slice/wishListSlice/wishListSlice.js";
import ReactLoading from "react-loading";
import ImageSkeleton from "./ImageSkeleton.jsx";

const Products = ({ data }) => {
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [deleteWishListLoading, seDeleteWishListLoading] = useState(false);
  const [localWishlist, setLocalWishlist] = useState([]);
  const [imageSrc, setImageSrc] = useState(data.images[0]);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const token = localStorage.getItem("usertoken");

  /// Add to cart
  const handleAddtoCart = (id, quantity) => {
    if (!token) {
      Navigate("/login");
    } else {
      setIsLoading(true);
      const payload = { productid: id, quantity };
      dispatch(addtoCart(payload))
        .finally(() => setIsLoading(false));
    }
  };

  /// Calculate discount
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    return productPrice - (productPrice * discount) / 100;
  };

  // Wishlist sync
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  const { getWishListProduct } = useSelector((state) => state.wishlist);

  useEffect(() => {
    setLocalWishlist(getWishListProduct.map((p) => p.details._id));
  }, [getWishListProduct]);

  const isInWishlist = (id) => localWishlist.includes(id);

  const addToWishlistHandler = (id) => {
    if (!token) {
      Navigate("/login");
    } else {
      setIsWishListLoading(true);
      setLocalWishlist((prev) => [...prev, id]);
      dispatch(addtoWishList({ productid: id }))
        .then(() => dispatch(getWishList()))
        .catch(() => setLocalWishlist((prev) => prev.filter((i) => i !== id)))
        .finally(() => setIsWishListLoading(false));
    }
  };

  const removeFromWishlistHandler = (id) => {
    seDeleteWishListLoading(true);
    setLocalWishlist((prev) => prev.filter((i) => i !== id));
    dispatch(deleteWishList({ productid: id }))
      .then(() => dispatch(getWishList()))
      .catch(() => setLocalWishlist((prev) => [...prev, id]))
      .finally(() => seDeleteWishListLoading(false));
  };

  // Image hover effect
  const handleHover = () => setTimeout(() => setImageSrc(data.images[1]), 200);
  const handleMouseLeave = () => setImageSrc(data.images[0]);

  return (
    <div className="product-card relative pt-10">
      
      <div className="product-details border rounded-xl border-gray-200 overflow-hidden group">
        {/* Discount Badge */}
        {data?.discount > 0 && (
          <div className="absolute top-2 left-2 px-3 py-1 text-white text-sm rounded-md bg-purple-600 z-10">
            {data?.discount}% OFF
          </div>
        )}

       
        
        {/* Image + Hover Overlay */}

        <div
          className="relative"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          
            <LazyLoad once placeholder={<ImageSkeleton />} debounce={100}>
              <img
                className="product-image sm:h-[280px] h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={imageSrc}
                alt={data.productName}
              />
            </LazyLoad>
        

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {/* Wishlist Button */}
            {isInWishlist(data._id) ? (
              <button
                onClick={() => removeFromWishlistHandler(data._id)}
                className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
              >
                {deleteWishListLoading ? (
                  <ReactLoading type="spin" height={18} width={18} color="red" />
                ) : (
                  <FaHeart size={20} className="text-red-500" />
                )}
              </button>
            ) : (
              <button
                onClick={() => addToWishlistHandler(data._id)}
                className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
              >
                {isWishListLoading ? (
                  <ReactLoading type="spin" height={18} width={18} color="black" />
                ) : (
                  <FaRegHeart  size={20} className="text-gray-700 cursor-pointer" />
                )}
              </button>
            )}

            {/* Add to Cart */}
            {data.quantity === 0 ? (
              <button className="p-3 bg-gray-400 text-white rounded-full cursor-not-allowed">
                OUT
              </button>
            ) : (
              <button
                onClick={() => handleAddtoCart(data._id, 1)}
                className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
              >
                {isLoading ? (
                  <ReactLoading type="spin" height={18} width={18} color="black" />
                ) : (
                  <ShoppingCart className="cursor-pointer" size={20} />
                )}
              </button>
            )}

            {/* Quick View */}
            <button
              onClick={() => setModalOpen(true)}
              className="p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              <Eye className="cursor-pointer" size={20} />
            </button>
          </div>
        </div>
       <Link to={`/allproduct/${data._id}`}>
        {/* Product Info */}
        <div className="info p-3">
          <Link to={`/allproduct/${data._id}`}>
            <span className="block text-xs text-gray-500">Brand: {data.brand}</span>
            <h4 className="title text-sm font-medium truncate">
              {data.productName.length > 30
                ? data.productName.substring(0, 30) + "..."
                : data.productName}
            </h4>
          </Link>

          <div className="flex justify-between items-center h-12 mt-2">
            <h4 className="text-sm font-bold">${handleDiscount(data?.price)}</h4>
            <div className="flex items-center space-x-2">
              <span className="line-through text-xs text-gray-400">${data?.price}</span>
              <p className="text-red-500 text-xs">{data?.discount}% off</p>
            </div>
          </div>
        </div>
        </Link>
      </div>
  
      {modalOpen && <OpenCardModal setModalOpen={setModalOpen} data={data} />}
    </div>
  );
};

export default Products;
