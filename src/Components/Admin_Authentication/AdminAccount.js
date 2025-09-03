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
import { AdminLoggedIn, adminLoggedout } from "../../redux/Slice/adminAuthslice/adminAuthslice";
import { jwtDecode } from "jwt-decode";


const AdminAccount = () => {
    const [closesidebar, setClosesidebar] = useState(false);
    const [active, setActive] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminLoggedINData } = useSelector((state) => state.Admin);



    useEffect(() => {
        const token = localStorage.getItem('admintoken');

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken && decodedToken.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                const expirationTime = decodedToken.exp;

                if (expirationTime < currentTime) {
                    // Token expired, redirect to login page
                    navigate('/admin/login');
                } 
                
                else {
                    // Calculate time until token expiration
                    const timeUntilExpiration = (expirationTime - currentTime) * 1000;

                    // Set a timer to redirect the user when the token expires
                    const expirationTimer = setTimeout(() => {
                        navigate('/admin/login');
                    }, timeUntilExpiration);

                    // Clean up the timer when the component unmounts or when the token changes
                    return () => clearTimeout(expirationTimer);
                }
            } else {
                // Invalid token or missing expiration time, redirect to login page
                navigate('/admin/login');
            }
        } else {
            // No token found, redirect to login page
            navigate('/admin/login');
        }
    }, [navigate, adminLoggedINData]);


    const adminverify = () => {
        dispatch(AdminLoggedIn()).then((res) => {
          
        }).catch((error) => {
            
        })

    };


    const adminlogout = () => {
        dispatch(adminLoggedout()).then((res) => {
            navigate("/admin/login")
        }).catch((err) => {
            navigate("/admin/login")
        })

    }

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
    }



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
            <div className={` flex    `}>
                <div
                    className={`${closesidebar
                        ? "-translate-x-96  w-0 "
                        : "translate-x-0 md:w-[17%] w-[11%] h-screen "
                        } bg-[#4D2DB7]  h-screen    ease-in-out duration-500   `}
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
                                        <Link key={index} onClick={() => isActive(index)} to={el.path}>
                                            <li
                                                className={
                                                    active === index ? "bg-[#fff] text-[black]" : ""
                                                }
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
                    <div className={` nav h-auto `}>
                        {/* left */}
                        <div className="flex items-center">
                            <FaBars
                                onClick={() => setClosesidebar(!closesidebar)}
                                className="ml-3 cursor-pointer"
                                size={20}
                            />
                            <h2>Dashboard</h2>
                        </div>

                        {/* Right */}
                        <input type="text" />
                        <div className="dropdown dropdown-bottom bg-[#1D2B53] p-4 flex flex-row items-center mr-2 ">
                            <div tabIndex={0} className="avatar cursor-pointer ">
                                <div className="w-14 rounded-full">
                                    <img src={adminLoggedINData[0]?.profile} />
                                </div>

                            </div>
                            <p tabIndex={0} className="text-white ml-2 uppercase cursor-pointer">{adminLoggedINData[0]?.name}</p>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-auto">
                                <li onClick={adminlogout} ><a><CiLogin size={20} /> Logout</a></li>

                            </ul>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;
