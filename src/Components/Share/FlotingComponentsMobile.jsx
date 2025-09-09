import React, { useContext, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";
import { getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { NavOpenContex } from "../../Contexapi/NavopenContex";

const FlotingComponentsMobile = () => {
  const { userLoggedInData, userLoginData } = useSelector(
    (state) => state.user
  );
  const { navOpen, setNavOpen } = useContext(NavOpenContex);
  const { getCartProduct } = useSelector((state) => state.cart);
  const { getWishListProduct } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  
      




  useEffect(() => {
    dispatch(userLoggedIn());
  }, [userLoginData]);

  useEffect(() => {
    dispatch(getCart());
  }, [userLoginData]);

  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();

  const gotoHome = () => navigate("/");
  const gotoWishlist = () => navigate("/wishlist");

  return (
    <div className="sm:hidden block fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50">
      <div className="flex justify-around items-center py-2">
        {/* Home */}
        <button onClick={gotoHome} className="flex flex-col items-center">
          <IoHomeOutline size={28} />
          <span className="text-[10px] uppercase">Home</span>
        </button>

        {/* Category */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="flex flex-col items-center"
        >
          <HiBars3 size={28} />
          <span className="text-[10px] uppercase">Category</span>
        </button>

        {/* Wishlist */}
        <div className="relative flex flex-col items-center">
          <button onClick={gotoWishlist} className="flex flex-col items-center">
            <IoIosHeartEmpty size={28} />
            <span className="text-[10px] uppercase">Wishlist</span>
          </button>
          {userLoggedInData?.length > 0 && getWishListProduct?.length > 0 && (
           <span
            className="absolute -top-1.5 right-1 flex items-center justify-center 
                 w-4 h-4 text-[10px] font-medium text-white bg-black rounded-full"
          >
            {userLoggedInData?.length > 0 ? getWishListProduct?.length : "0"}
          </span>
          )}
        </div>

        {/* Account */}
        {token ? (
          <Link
            to="/myaccount/dashboard"
            className="flex flex-col items-center"
          >
            <CiUser size={28} />
            <span className="text-[10px] uppercase">Account</span>
          </Link>
        ) : (
          <Link to="/login" className="flex flex-col items-center">
            <CiUser size={28} />
            <span className="text-[10px] uppercase">Account</span>
          </Link>
        )}

        {/* Cart */}
        <div className="relative flex flex-col items-center">
          <Link to="/Viewcart" className="flex flex-col items-center">
            <IoBagHandleOutline size={28} />
            <span className="text-[10px] uppercase">Cart</span>
          </Link>
          {userLoggedInData?.length > 0 && getCartProduct?.length > 0 && (
             <span
            className="absolute -top-1.5 -right-2 flex items-center justify-center 
                 w-4 h-4 text-[10px] font-medium text-white bg-black rounded-full"
          >
            {getCartProduct.length}
          </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlotingComponentsMobile;
