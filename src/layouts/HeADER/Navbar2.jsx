import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { IoSearchCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assest/Orange and Gray Tag Cart Virtual Shop Logo.png";
import CartDetails from "../../Components/Cart/CartDetails";
import { useDispatch, useSelector } from "react-redux";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";
import { searchProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { NavOpenContex } from "../../Contexapi/NavopenContex";
import Loading from "../../Components/Share/Loading";

import ShoppingBag from "../../Components/Share/ShoppingBag";
import { getWishList } from "../../redux/Slice/wishListSlice/wishListSlice";
import Navbar from "./Navbar";
import SearchSkeleton from "../../Components/Share/SearchSkeleton";

const Navbar2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isTransition, setIsTransition] = useState(false);
  const { getCartProduct, addtoCart } = useSelector((state) => state.cart);
  const {
    searchProductsData: { searchproduct, results },
    searchLoading,
  } = useSelector((state) => state.products);
  const { userLoggedInData, userLoginData } = useSelector(
    (state) => state.user
  );
  const { CategoryData } = useSelector((state) => state.category);
  const { getWishListProduct, addtoWishList } = useSelector(
    (state) => state.wishlist
  );
  const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);
  const { navOpen, setNavOpen } = useContext(NavOpenContex);
  const navRef = useRef();
  const searchRef = useRef();
  const dispatch = useDispatch();
  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowSearchBar(false);
      } else {
        setShowSearchBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartopen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef, searchRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  useEffect(() => {
    dispatch(userLoggedIn());
  }, [userLoginData]);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getWishList());
  }, [addtoCart, addtoWishList, userLoginData]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    dispatch(searchProducts({ productName: term }));
    setShowSearchResults(true);
  };

  useEffect(() => {
    setSearchData(searchproduct);
  }, [searchproduct]);

  ///Fetch the category data//
  useEffect(() => {
    let array = [];
    if (CategoryData && CategoryData.length) {
      CategoryData.map((cat) => {
        array.push(cat);
      });
    }

    setCategories(array);
  }, [CategoryData]);

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const closeMobileNavbar = () => {
    setNavOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    closeMobileNavbar();
  };
  const handleRegister = () => {
    navigate("/register");
    closeMobileNavbar();
  };

  const handleUserAccount = () => {
    navigate("/myaccount/dashboard");
    closeMobileNavbar();
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > window.innerHeight / 2) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  ///navbar transition ///

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true); // Set to true if scroll is more than 400px
      } else {
        setIsVisible(false); // Set to false otherwise
      }
    };

    // Listen to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-100 left-0 w-full bg-white  shadow-sm">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Left: Logo + Menu Icon */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavOpen(true)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden"
            >
              <Bars3Icon className="h-6 w-6 mr-2" />
            </button>

            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Online Nest Logo" className="h-14 md:h-20" />
            </Link>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* User Icon */}
            {!token && (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 flex items-center justify-center"
              >
                <UserIcon className="h-6 w-6" />
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-gray-900 flex items-center justify-center"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
                {userLoggedInData?.length > 0
                  ? getWishListProduct?.length
                  : "0"}
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartopen(true)}
              className="relative text-gray-700 hover:text-gray-900 flex items-center justify-center"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
                {getCartProduct.length}
              </span>
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex justify-center items-center flex-grow">
            <div className="relative w-1/2">
              {" "}
              {/* wrapper with relative & same width */}
              <input
                type="text"
                className="py-2 px-4 w-full rounded border border-gray-300 focus:outline-none placeholder:text-sm font-thin"
                placeholder="Search for products"
                onChange={handleSearch}
                value={search}
                onFocus={() => setShowSearchResults(true)}
              />
              <IoSearchCircleOutline className="h-6 w-6 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
              {/* Search Results Dropdown */}
              {search && showSearchResults && (
                <div
                  ref={searchRef}
                  className="absolute top-full left-0 w-full bg-white max-h-64 overflow-y-auto shadow-lg rounded mt-1 z-30"
                >
                  {searchLoading ? (
                   
                      <SearchSkeleton />
                  
                  ) : searchData?.length > 0 ? (
                    searchData.map((i, index) => (
                      <Link
                        key={index}
                        to={`/allproduct/${i._id}`}
                        onClick={() => setSearch("")}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-100"
                      >
                        {/* Product Info */}
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 mr-3 object-cover rounded"
                            src={i.images[0]}
                            alt={i.productName}
                          />
                          <span className="text-sm">
                            {i.productName.slice(0, 50)}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-sm font-medium text-gray-700">
                          ${i.price}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-gray-600">
                      Sorry! No product found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop User / Support */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <Link
                to="/myaccount/dashboard"
                className="text-gray-700 hover:text-gray-900 flex items-center"
              >
                <UserIcon className="h-10 w-10 mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm font-thin">Welcome</span>
                  <span className="uppercase">
                    {userLoggedInData[0]?.firstname}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-x-2 text-sm">
                <BsWhatsapp color="green" size={28} />
                <span>Support +880 1647153126</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
    
          <div className="md:hidden relative px-4 pb-2">
            <div className="flex items-center">
              <input
                type="text"
                className="py-2 px-4 w-full rounded sm:border lg:border border-gray-300 focus:outline-none placeholder:text-sm font-thin"
                placeholder="Search for products"
                onChange={handleSearch}
                value={search}
                onFocus={() => setShowSearchResults(true)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-2" />
            </div>

            {/* Mobile Search Results */}
            {search && showSearchResults && (
              <div
                ref={searchRef}
                className="absolute top-full left-0 w-full bg-white max-h-64 overflow-y-auto shadow-lg rounded mt-1 z-30"
              >
                {searchLoading ? (
                 
                       <SearchSkeleton />
                 
                ) : searchData?.length > 0 ? (
                  searchData.map((i, index) => (
                    <Link
                      key={index}
                      to={`/allproduct/${i._id}`}
                      onClick={() => setSearch("")}
                      className="flex items-center px-3 py-2 hover:bg-gray-100"
                    >
                      <img
                        className="w-10 h-10 mr-3 object-cover rounded"
                        src={i.images[0]}
                        alt={i.productName}
                      />
                      <span className="text-sm">
                        {i.productName.slice(0, 50)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="py-4 text-center text-sm text-gray-600">
                    Sorry! No product found
                  </div>
                )}
              </div>
            )}
          </div>
      

        {/* Navbar Links */}
        <div
          className={`${
            isVisible ? "hidden" : "block  "
          }`}
        >
          <Navbar />
        </div>
      </nav>

      {/* side navbar for mobile */}
      {navOpen && (
        <div className="fixed inset-0 z-50 bg-black opacity-50 "></div>
      )}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-[58%] h-full bg-white shadow-md transition-transform duration-700 ease-in-out ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Online Nest Logo" className="h-10" />
          </Link>
          <button
            onClick={() => setNavOpen(false)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-start p-4 space-y-4 w-full text-sm font-thin">
          <Link
            to="/home"
            className="text-gray-700 hover:text-gray-900 w-full border-b py-2"
          >
            HOME
          </Link>

          <button
            onClick={() => toggleSubMenu("categories")}
            className={`w-full ${
              expandedMenu === "categories"
                ? "bg-red-700 text-white ease-in-out duration-700"
                : ""
            }  text-left text-gray-700  flex justify-between items-center border-b py-2`}
          >
            CATEGORIES{" "}
            {expandedMenu === "categories" ? (
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            ) : (
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            )}
          </button>
          {expandedMenu === "categories" && (
            <div className="pl-4 space-y-1 flex flex-col w-full border-b">
              {categories.length &&
                categories.map((cat, index) => (
                  <Link
                    key={index}
                    onClick={() => setNavOpen(!navOpen)}
                    to={`/allproducts?categoryId=${cat._id}`}
                    className="text-gray-700 hover:text-gray-900 w-full border-b py-2 text-sm"
                  >
                    {cat.categoryName}
                  </Link>
                ))}
            </div>
          )}

          <button
            onClick={() => toggleSubMenu("OnlineNest")}
            className={`${
              expandedMenu === "OnlineNest"
                ? "bg-red-700 text-white ease-in-out duration-700"
                : ""
            }  w-full text-left text-gray-700  flex justify-between items-center border-b py-2`}
          >
            Online Nest{" "}
            {expandedMenu === "OnlineNest" ? (
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            )}
          </button>
          {expandedMenu === "OnlineNest" && (
            <div className="pl-4 space-y-1 flex flex-col border-b">
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 border-b py-2"
              >
                Subcategory A
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 border-b py-2"
              >
                Subcategory B
              </Link>
            </div>
          )}

          <Link
            href="#"
            className="text-gray-700 hover:text-gray-900 border-b py-2 w-full"
          >
            Contuct Us
          </Link>
          <div className="flex space-x-4 my-4 w-full">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-black text-white "
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-red-500 text-white "
            >
              Register
            </button>
          </div>
          <div className="flex justify-center space-x-4 w-full py-4 border-t">
            <Link href="#" className="text-blue-600">
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-red-600">
              <BsYoutube className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-pink-600">
              <BsInstagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {cartopen && (
        <div className="fixed inset-0 z-50 bg-black opacity-50 "></div>
      )}
      <div
        className={`fixed top-0  right-0 h-full bg-white shadow-md transition-transform duration-700 ease-in-out transform ${
          cartopen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto w-80 z-50`}
        ref={cartRef}
      >
        {/* Cart items should be mapped here */}
        <CartDetails getCartProduct={getCartProduct} />
      </div>
      {/* second nav */}
    </>
  );
};

export default Navbar2;
