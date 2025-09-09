import React, { Suspense, useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearuserLoggedInData } from "./redux/Slice/Userauthslice/userAuthSlice.js";
import { clearadminLoggedINData } from "./redux/Slice/adminAuthslice/adminAuthslice.js";
import { FaBagShopping } from "react-icons/fa6";

// Context Providers
import NavProvider from "./Contexapi/NavopenContex.jsx";

import ReactLoading from "react-loading";
// Shared Components
import Layout from "./layouts/Layout.jsx";
import ScroolToTop from "./Components/Share/ScroolToTop.jsx";
import ShoppingBag from "./Components/Share/ShoppingBag.jsx";

import UserProtectedRoutes from "./Components/ProtectRoutes/UserProtectedRoutes.jsx";
import AdminProtectedRoutes from "./Components/ProtectRoutes/AdminProtectRoutes.jsx";
import BreadcrumbProvider from "./Contexapi/BreadcrumbContext.jsx";

import AuthLayout from "./Components/user_Authentication/AuthLayout.jsx";
import Offer from "./Components/Offer/Offer.jsx";


// Lazy loading components
const Banner = React.lazy(() => import("./Components/Banner/Banner.jsx"));
const Home = React.lazy(() => import("./Pages/Home/Home.jsx"));
const ListingProductMain = React.lazy(() =>
  import("./Components/ListingPageMain/ListingProductMain.jsx")
);
const ProductDetails = React.lazy(() =>
  import("./Components/ProductDetails/ProductDetails.jsx")
);
const Notfound = React.lazy(() => import("./Components/Share/Notfound.jsx"));
const Viewcart = React.lazy(() =>
  import("./Components/carts/Viewcart/Viewcart.jsx")
);
const Checkout = React.lazy(() =>
  import("./Components/carts/Checkout/Checkout.jsx")
);
const Dashboard = React.lazy(() =>
  import("./Components/user_Authentication/Dashboard.jsx")
);
const Myaccount = React.lazy(() =>
  import("./Components/user_Authentication/Myaccount.jsx")
);
const Orderhistory = React.lazy(() =>
  import("./Components/user_Authentication/Orderhistory.jsx")
);
const Accountdetails = React.lazy(() =>
  import("./Components/user_Authentication/Accountdetails.jsx")
);
const Editaddress = React.lazy(() =>
  import("./Components/user_Authentication/Editaddress.jsx")
);
const Login = React.lazy(() =>
  import("./Components/user_Authentication/Login.jsx")
);
const Forgotpassword = React.lazy(() =>
  import("./Components/user_Authentication/Forgotpassword.jsx")
);
const Resetpassword = React.lazy(() =>
  import("./Components/user_Authentication/Resetpassword.jsx")
);
const Register = React.lazy(() =>
  import("./Components/user_Authentication/Register.jsx")
);
const Shipping = React.lazy(() => import("./Components/Shipping/Shipping.jsx"));
const AdminLogin = React.lazy(() =>
  import("./Components/Admin_Authentication/AdminLogin.jsx")
);
const AdminRegister = React.lazy(() =>
  import("./Components/Admin_Authentication/AdminRegister.jsx")
);
const AdminAccount = React.lazy(() =>
  import("./Components/Admin_Authentication/AdminAccount.jsx")
);
const Admindashboard = React.lazy(() =>
  import("./Components/Admin_Authentication/Admindashboard.jsx")
);
const AddBannerImages = React.lazy(() =>
  import("./Components/Admin_Authentication/AddBannerImages.jsx")
);
const Addproducts = React.lazy(() =>
  import("./Components/Admin_Authentication/Addproducts.jsx")
);
const Addcategories = React.lazy(() =>
  import("./Components/Admin_Authentication/Addcategories.jsx")
);
const Addbrand = React.lazy(() =>
  import("./Components/Admin_Authentication/Addbrand.jsx")
);
const Orders = React.lazy(() =>
  import("./Components/Admin_Authentication/Orders.jsx")
);
const Settings = React.lazy(() =>
  import("./Components/Admin_Authentication/Settings.jsx")
);
const Adminproducts = React.lazy(() =>
  import("./Components/Admin_Authentication/Adminproducts.jsx")
);
const UpdateProduct = React.lazy(() =>
  import("./Components/Admin_Authentication/UpdateProduct.jsx")
);
const WishList = React.lazy(() => import("./Components/Wishlist/WishList.jsx"));
const Contact = React.lazy(() => import("./Components/Contact/Contact.jsx"));
const Blogs = React.lazy(() => import("./Components/Blogs/Blogs.jsx"));
const Blogsdetails = React.lazy(() => import("./Components/Blogs/Blogsdetails.jsx"));
const Offers = React.lazy(() => import("./Components/Offer/Offer.jsx"))
const OrderSuccess = React.lazy(() => import("./Components/success/OrderSuccess.jsx"))


const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLoggedInData } = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  // User automatic logout when token expired
  useEffect(() => {
    const token = localStorage.getItem("usertoken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          dispatch(clearuserLoggedInData());
          localStorage.removeItem("usertoken");
          navigate("/login");
        } else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            dispatch(clearuserLoggedInData());
            localStorage.removeItem("usertoken");
            navigate("/login");
          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      }
    }
  }, [navigate, userLoggedInData]);

  // Admin automatic logout when token expired
  useEffect(() => {
    const token = localStorage.getItem("admintoken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          dispatch(clearadminLoggedINData());
          localStorage.removeItem("admintoken");
          navigate("/");
        } else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            dispatch(clearadminLoggedINData());
            localStorage.removeItem("admintoken");
            navigate("/");
          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      }
    }
  }, [navigate, userLoggedInData]);

  const token = localStorage.getItem("admintoken");

  return (
    <div className="">
      <BreadcrumbProvider>
       

            
          {/* Wrap Routes with Suspense for lazy loading */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <ReactLoading type="spin" color="black" />
              </div>
            }
          >
            <Routes>
              {/* Admin Router */}

              {/* Admin account Nested Route */}
              <Route
                path="adminaccount"
                element={<AdminProtectedRoutes Components={AdminAccount} />}
              >
                <Route path="dashboard" element={<Admindashboard />} />
                <Route path="bannerimages" element={<AddBannerImages />} />
                <Route path="addproducts" element={<Addproducts />} />
                <Route path="updateproduct/:id" element={<UpdateProduct />} />
                <Route path="addcategories" element={<Addcategories />} />
                <Route path="addbrand" element={<Addbrand />} />
                <Route path="orders" element={<Orders />} />
                <Route path="settings" element={<Settings />} />
                <Route path="products" element={<Adminproducts />} />
              </Route>

              {/* User Router */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/allproducts"
                element={
                  <Layout>
                    <ListingProductMain />
                  </Layout>
                }
              />
              <Route
                path="/allproduct/:id"
                element={
                  <Layout>
                    <ProductDetails />
                  </Layout>
                }
              />
              <Route
                path="/viewcart"
                element={
                  <Layout>
                    <Viewcart />
                  </Layout>
                }
              />
              <Route
                path="/viewcart/checkout"
                element={
                  <Layout>
                    <Checkout />
                  </Layout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Layout>
                    <WishList />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/blogs"
                element={
                  <Layout>
                    <Blogs />
                  </Layout>
                }
              />
              <Route
                path="/blogs/:blogid"
                element={
                  <Layout>
                    <Blogsdetails />
                  </Layout>
                }
              />


              <Route
                path="/offers"
                element={
                  <Layout>
                    <Offers />
                  </Layout>
                }
              />

              {/* User account Nested Route */}
              <Route
                path="myaccount"
                element={<UserProtectedRoutes Components={Myaccount} />}
              >
                <Route index path="dashboard" element={<Dashboard />} />
                <Route path="orderhistory" element={<Orderhistory />} />
                <Route path="accountdetails" element={<Accountdetails />} />
                <Route path="editaddress" element={<Editaddress />} />
              </Route>

              <Route
                element={
                  <Layout>
                    <AuthLayout />
                  </Layout>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<Forgotpassword />} />
                <Route
                  path="/resetpassword/:id/:token"
                  element={<Resetpassword />}
                />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
              </Route>

              <Route
                path="/shipping"
                element={
                  <Layout>
                    <Shipping />
                  </Layout>
                }
              />

              <Route
                path="/ordersuccess/:userid"
                element={
                 
                    <OrderSuccess />
                 
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <Notfound />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>

          <Toaster position="bottom-right" reverseOrder={true} />
       
        <ScroolToTop />
      </BreadcrumbProvider>
    </div>
  );
};

export default App;
