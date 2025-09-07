import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import {
  MdLocalShipping,
  MdOutlineDashboardCustomize,
  MdCategory,
} from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import userlogo from "../../assest/585e4bcdcb11b227491c3396 (1).png";
import { CiLogin } from "react-icons/ci";

import "./Commonstyle.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminLoggedIn,
  adminLoggedout,
} from "../../redux/Slice/adminAuthslice/adminAuthslice";
import { jwtDecode } from "jwt-decode";

const AdminAccount = () => {
  const [closesidebar, setClosesidebar] = useState(false);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminLoggedINData } = useSelector((state) => state.Admin);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          navigate("/admin/login");
        } else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            navigate("/admin/login");
          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      } else {
        // Invalid token or missing expiration time, redirect to login page
        navigate("/admin/login");
      }
    } else {
      // No token found, redirect to login page
      navigate("/admin/login");
    }
  }, [navigate, adminLoggedINData]);

  const adminverify = () => {
    dispatch(AdminLoggedIn())
      .then((res) => {})
      .catch((error) => {});
  };

  const adminlogout = () => {
    dispatch(adminLoggedout())
      .then((res) => {
        navigate("/admin/login");
      })
      .catch((err) => {
        navigate("/admin/login");
      });
  };

  useEffect(() => {
    adminverify();
  }, []);

  // Get the current active link from localStorage
  useEffect(() => {
    const storedActive = localStorage.getItem("active");
    if (storedActive !== null) {
      setActive(parseInt(storedActive));
    }
  }, []);

  const isActive = (index) => {
    setActive(index);
    // Store the active link in localStorage
    localStorage.setItem("active", index);
  };

  const sidebarlink = [
    {
      name: "Dashboard",
      path: "/adminaccount/dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },

    {
      name: "ChangeWebBanner",
      path: "/adminaccount/bannerimages",
      icon: <MdOutlineDashboardCustomize />,
    },

    {
      name: "Add Categories",
      path: "/adminaccount/addcategories",
      icon: <MdCategory />,
    },
    {
      name: "Add Brands",
      path: "/adminaccount/addbrand",
      icon: <MdCategory />,
    },
    {
      name: "Add Products",
      path: "/adminaccount/addproducts",
      icon: <MdLocalShipping />,
    },
    {
      name: "All Products",
      path: "/adminaccount/products",
      icon: <FaShoppingCart />,
    },
    {
      name: "Orders",
      path: "/adminaccount/orders",
      icon: <LuShoppingBag />,
    },
    {
      name: "Settings",
      path: "/adminaccount/settings",
      icon: <IoSettings />,
    },
  ];

  return (
    <div className="">
      <div className={` flex`}>
        <div
          className={`${
            closesidebar
              ? "-translate-x-96  w-0 "
              : "translate-x-0 md:w-[17%] w-[11%]  "
          } bg-[#111827]  min-h-screen ease-in-out duration-500`}
        >
          <div className="flex flex-row items-center p-4 ">
            <FaRegUser className="text-2xl text-[#fff]" size={30} />
            <h2 className="text-2xl text-[#fff] hidden md:block ml-3 uppercase">
              {adminLoggedINData[0]?.name} Admin
            </h2>
          </div>
          <div className="admin-settings overflow-hidden">
            <ul className=" text-[#fff] overflow-hidden">
              {sidebarlink.length !== 0 &&
                sidebarlink.map((el, index) => {
                  return (
                    <Link
                      key={index}
                      onClick={() => isActive(index)}
                      to={el.path}
                    >
                      <li
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                          active === index
                            ? "bg-gray-700 text-white rounded-md"
                            : "hover:bg-gray-800"
                        }`}
                      >
                        <span>{el.icon}</span>
                        {el.name}
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className={`${closesidebar ? "w-[100%]" : "w-[100%]"}`}>
          <div className="nav h-auto bg-[#1f2937] flex items-center justify-between px-4 py-2">
            <div className="flex items-center text-white gap-3">
              <FaBars
                onClick={() => setClosesidebar(!closesidebar)}
                className="cursor-pointer"
                size={20}
              />
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group p-2 flex flex-row items-center rounded-md cursor-pointer">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-22 h-22 rounded-full overflow-hidden">
                    <img
                      src={adminLoggedINData[0]?.profile}
                      alt="admin"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Name */}
                <p className="text-white ml-2 uppercase">
                  {adminLoggedINData[0]?.name}
                </p>

                {/* Dropdown */}
                <ul
                  className="absolute right-0 top-full mt-2 bg-white text-black rounded-md shadow-lg 
               opacity-0 scale-95 transform transition-all duration-400 
               group-hover:opacity-100 group-hover:scale-100"
                >
                  <li
                    onClick={adminlogout}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <CiLogin size={20} /> Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>

         <div className="pt-8">
            <Outlet />
         </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
