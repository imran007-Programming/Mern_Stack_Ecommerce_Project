import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import LazyLoad from "react-lazyload";
import ImageSkeleton from "./ImageSkeleton";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addtoWishList, deleteWishList, getWishList } from "../../redux/Slice/wishListSlice/wishListSlice";
import ReactLoading from "react-loading"
import OpenCardModal from "./OpenCardModal";
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice";
const Products = ({ data }) => {
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [loadingWishlistId, setLoadingWishlistId] = useState(null); 
  const [activeId, setActiveId] = useState(null);

  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("usertoken");

  const { getWishListProduct } = useSelector((state) => state.wishlist);

  // ✅ Get wishlist on mount
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  // ✅ Check if product is in wishlist
  const isInWishlist = getWishListProduct?.some(
    (item) => item.productid===data._id
  );
  

  // ✅ Add to Cart
  const handleAddtoCart = (id, quantity) => {
    if (!token) return navigate("/login");

    setIsLoading(true);
    dispatch(addtoCart({ productid: id, quantity }))
      .finally(() => setIsLoading(false));
  };

  // ✅ Add / Remove Wishlist
  const toggleWishlist = (id) => {
    if (!token) return navigate("/login");

    setLoadingWishlistId(id);
    

    const action = isInWishlist
      ? deleteWishList({ productid: id })
      : addtoWishList({ productid: id });

    dispatch(action)
      .then(() => dispatch(getWishList()))
      .finally(() => setLoadingWishlistId(null));
  };

  return (
    <div className="product-card relative pt-10">
      <div className="product-details border rounded-xl border-gray-200 overflow-hidden group">
        {/* Image + Overlay */}
        <div
          className="relative overflow-hidden"
          onClick={() => setActiveId(activeId === data._id ? null : data._id)}
        >
          <LazyLoad once placeholder={<ImageSkeleton />} debounce={100}>
            <img
              className="product-image sm:h-[280px] h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={data.images[0]}
              alt={data.productName}
            />
          </LazyLoad>

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center  justify-center gap-2 sm:gap-3
              ${
                activeId === data._id
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }
            `}
          >
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(data._id);
              }}
              className="p-2 sm:p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              
              {loadingWishlistId === data._id ? (
                <ReactLoading type="spin" height={16} width={16} color="black" />
              ) : isInWishlist ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} className="text-gray-700" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddtoCart(data._id, 1);
              }}
              className="p-2 sm:p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <ReactLoading type="spin" height={14} width={14} color="black" />
              ) : (
                <ShoppingCart className="cursor-pointer" size={16} />
              )}
            </button>

            {/* Quick View */}
            <button
              onClick={() => setModalOpen(true)}
              className="p-2 sm:p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              <Eye className="cursor-pointer" size={16} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <Link to={`/allproduct/${data._id}`}>
          <div className="info p-3">
            <span className="block text-xs text-gray-500">
              Brand: {data.brand}
            </span>
            <h4 className="title text-sm font-medium truncate">
              {data.productName}
            </h4>
            <div className="flex justify-between items-center h-12 mt-2">
              <h4 className="text-sm font-bold">${data.price}</h4>
              {data.discount > 0 && (
                <p className="text-red-500 text-xs">{data.discount}% off</p>
              )}
            </div>
          </div>
        </Link>
      </div>

      {modalOpen && <OpenCardModal setModalOpen={setModalOpen} data={data} />}
    </div>
  );
};

export default Products;