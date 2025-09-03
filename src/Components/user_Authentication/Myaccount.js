import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./Myaccount.scss"
import { useDispatch } from "react-redux";
import { userLoggedIn, userLogout } from "../../redux/Slice/Userauthslice/userAuthSlice";
import withLayout from "../../layouts/withLayout";


const Myaccount = () => {
  const [active, setActive] = useState(1)

  const dashboardlink = [
   
    {
      name: "Dashboard",
      path: "/myaccount/dashboard"
    },
    {
      name: "Order History",
      path: "/myaccount/orderhistory"
    },
    {
      name: "Acount Details",
      path: "/myaccount/accountdetails"
    },
    {
      name: "Edit Address",
      path: "/myaccount/editaddress"
    },
  ]
  


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
  




  return (
    <div className="container">
      <div className="grid md:grid-cols-5 grid-cols-1 gap-10 my-5">
        <div className="col-span-1 bg-[#f6f6f8]  ">
          <div className="flex justify-start items-center p-[25px]">

            <div className=" flex flex-col  justify-center  text-xs">
              {
                dashboardlink.length !== 0 &&
                dashboardlink.map((link, index) => {
                  return (
                    <Link key={index} onClick={() => isActive(index)} to={`${link.path}`} className={`${active === index ? "active" : ""
                      } flex items-center mb-2`}>
                      <CiCirclePlus /> <p className="ml-2">{link.name}</p>
                    </Link>
                  )
                })

              }

            </div>
          </div>
        </div>
        <div className="col-span-3">

          {/* Dahboard content here */}
       
          <Outlet />
         

        </div>
      </div>
    </div>
  );
};

export default withLayout(Myaccount);
