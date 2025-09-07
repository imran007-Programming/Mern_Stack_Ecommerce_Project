import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { LoaderIcon } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => setIsOpen(true); // Open dropdown
  const handleMouseLeave = () => setIsOpen(false); // Close dropdown

  const { userLoggedInData, loading: userloading } = useSelector(
    (state) => state.user
  );
  const token = localStorage.getItem("usertoken");
  const { getCartProduct } = useSelector((state) => state.cart);
  const { getWishListProduct } = useSelector((state) => state.wishlist);
  const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);

  const { CategoryData = [], loading } = useSelector((state) => state.category);

  return (
    <div
     
      className="container mx-auto sm:flex justify-between items-center py-4 px-6 hidden "
    >
      {/* Left Side: Dropdown Category */}
      <div
        className="relative"
         onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter} // Opens dropdown when hovering over button or menu
        // Closes dropdown when the mouse leaves both button and menu
      >
        {/* Dropdown Button */}
        <button className="py-2 px-4 text-black rounded-md flex items-center">
          Browse Category
          {/* Arrow Icon (rotate when the dropdown is open) */}
          <ChevronDownIcon
            className={`h-5 w-5 ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute  bg-white rounded-md shadow-lg w-48">
            <ul>
              {CategoryData?.map((cate, index) => (
                <Link
                  key={index}
                  to={`/allproducts?categoryId=${cate?._id}`}
                >
                  <li className="py-2 px-4 hover:bg-gray-200">
                    {cate.categoryName}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Center: 3 Icons */}
      <div className="flex space-x-4 font-clash">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/allproducts" className="">
          Shop
        </Link>
        <Link to="/contact" className="">
          Contacts
        </Link>
        <Link to="/blogs" className="">
          Blogs
        </Link>
        <Link to="/offers" className="">
          Offers
        </Link>
      </div>

      {/* Right Side: User & Cart Icons */}
      <div className="flex flex-row justify-center items-center space-x-6">
        {/* User Icon */}
        {/* User Icon (only show when NOT logged in) */}
        {!token ? (
          <Link
            to="/login"
            className="relative flex items-center justify-center text-gray-700 hover:text-gray-900"
          >
            <UserIcon className="h-6 w-6" />
          </Link>
        ) : null}

        {/* Wishlist Icon */}
        <Link
          to="/wishlist"
          className="relative flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <HeartIcon className="h-6 w-6" />
          <span
            className="absolute -top-1.5 -right-2 flex items-center justify-center 
                 w-4 h-4 text-[10px] font-medium text-white bg-black rounded-full"
          >
            {userLoggedInData?.length > 0 ? getWishListProduct?.length : "0"}
          </span>
        </Link>

        {/* Cart Icon */}
        <button
          onClick={() => setCartopen(true)}
          className="relative flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <ShoppingBagIcon className="h-6 w-6" />
          <span
            className="absolute -top-1.5 -right-2 flex items-center justify-center 
                 w-4 h-4 text-[10px] font-medium text-white bg-black rounded-full"
          >
            {getCartProduct.length}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
