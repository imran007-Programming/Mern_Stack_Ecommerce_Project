import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation - 1702200728330.json";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearuserLoggedInData } from "./redux/Slice/Userauthslice/userAuthSlice.js";
import { clearadminLoggedINData } from "./redux/Slice/adminAuthslice/adminAuthslice.js";
import { FaBagShopping } from "react-icons/fa6";

// Context Providers
import ThemeProvider from "./Contexapi/Themecontex.js";
import NavProvider from "./Contexapi/NavopenContex.js";
import CartProvider, { CartopenContex } from "./Contexapi/Cartopencontex.js";
import ReactLoading from "react-loading";
// Shared Components
import Layout from "./layouts/Layout.js";
import ScroolToTop from "./Components/Share/ScroolToTop.js";
import ShoppingBag from "./Components/Share/ShoppingBag.js";
import FlotingComponentsMobile from "./Components/Share/FlotingComponentsMobile.js";
import UserProtectedRoutes from "./Components/ProtectRoutes/UserProtectedRoutes.js";
import AdminProtectedRoutes from "./Components/ProtectRoutes/AdminProtectRoutes.js";
import BreadcrumbProvider from "./Contexapi/BreadcrumbContext.js";
import Breadcrumb from "./Components/Share/Breadcrumb.js";

// Lazy Loaded Components
const Banner = lazy(() => import("./Components/Banner/Banner.js"));
const Home = lazy(() => import("./Pages/Home/Home.js"));
const ListingProductMain = lazy(() =>
  import("./Components/ListingPageMain/ListingProductMain.js")
);
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails.js")
);
const Notfound = lazy(() => import("./Components/Share/Notfound.js"));
const Viewcart = lazy(() => import("./Components/carts/Viewcart/Viewcart.js"));
const Checkout = lazy(() => import("./Components/carts/Checkout/Checkout.js"));
const Dashboard = lazy(() =>
  import("./Components/user_Authentication/Dashboard.js")
);
const Myaccount = lazy(() =>
  import("./Components/user_Authentication/Myaccount.js")
);
const Orderhistory = lazy(() =>
  import("./Components/user_Authentication/Orderhistory.js")
);
const Accountdetails = lazy(() =>
  import("./Components/user_Authentication/Accountdetails.js")
);
const Editaddress = lazy(() =>
  import("./Components/user_Authentication/Editaddress.js")
);
const Login = lazy(() => import("./Components/user_Authentication/Login.js"));
const Forgotpassword = lazy(() =>
  import("./Components/user_Authentication/Forgotpassword.js")
);
const Resetpassword = lazy(() =>
  import("./Components/user_Authentication/Resetpassword.js")
);
const Register = lazy(() =>
  import("./Components/user_Authentication/Register.js")
);
const Shipping = lazy(() => import("./Components/Shipping/Shipping.js"));
const AdminLogin = lazy(() =>
  import("./Components/Admin_Authentication/AdminLogin.js")
);
const AdminRegister = lazy(() =>
  import("./Components/Admin_Authentication/AdminRegister.js")
);
const AdminAccount = lazy(() =>
  import("./Components/Admin_Authentication/AdminAccount.js")
);
const Admindashboard = lazy(() =>
  import("./Components/Admin_Authentication/Admindashboard.js")
);
const AddBannerImages = lazy(() =>
  import("./Components/Admin_Authentication/AddBannerImages.js")
);
const Addproducts = lazy(() =>
  import("./Components/Admin_Authentication/Addproducts.js")
);
const Addcategories = lazy(() =>
  import("./Components/Admin_Authentication/Addcategories.js")
);
const Addbrand = lazy(() =>
  import("./Components/Admin_Authentication/Addbrand.js")
);
const Orders = lazy(() =>
  import("./Components/Admin_Authentication/Orders.js")
);
const Settings = lazy(() =>
  import("./Components/Admin_Authentication/Settings.js")
);
const Adminproducts = lazy(() =>
  import("./Components/Admin_Authentication/Adminproducts.js")
);
const UpdateProduct = lazy(() =>
  import("./Components/Admin_Authentication/UpdateProduct.js")
);
const WishList = lazy(() => import("./Components/Wishlist/WishList.js"));

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
    <div className="webkit">
      <BreadcrumbProvider>
        <ThemeProvider>
          <NavProvider>
            {token ? null : (
              <>
                {/* <ShoppingBag /> */}
                <FlotingComponentsMobile />
              </>
            )}

            <Suspense
              fallback={
                <div className="flex h-[100vh] items-center justify-center">
                  <ReactLoading type="spin" color="black" />
                </div>
              }
            >
              <Routes>
                {/* Admin Router */}
                <Route
                  exact={true}
                  path="/admin/login"
                  element={
                    <Layout>
                      <AdminLogin />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/admin/register"
                  element={
                    <Layout>
                      <AdminRegister />
                    </Layout>
                  }
                />

                {/* Admin account Nested Route */}
                <Route
                  path="adminaccount"
                  element={<AdminProtectedRoutes Components={AdminAccount} />}
                >
                  <Route
                    exact={true}
                    path="dashboard"
                    element={<Admindashboard />}
                  />
                  <Route
                    exact={true}
                    path="bannerimages"
                    element={<AddBannerImages />}
                  />
                  <Route
                    exact={true}
                    path="addproducts"
                    element={<Addproducts />}
                  />
                  <Route
                    exact={true}
                    path="updateproduct/:id"
                    element={<UpdateProduct />}
                  />
                  <Route
                    exact={true}
                    path="addcategories"
                    element={<Addcategories />}
                  />
                  <Route exact={true} path="addbrand" element={<Addbrand />} />
                  <Route exact={true} path="orders" element={<Orders />} />
                  <Route exact={true} path="settings" element={<Settings />} />
                  <Route
                    exact={true}
                    path="products"
                    element={<Adminproducts />}
                  />
                </Route>

                {/* User Router */}
                <Route
                  exact={true}
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/products-filter"
                  element={
                    <Layout>
                      <ListingProductMain />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/allproduct/:id"
                  element={
                    <Layout>
                      <ProductDetails />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/viewcart"
                  element={
                    <Layout>
                      <Viewcart />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/viewcart/checkout"
                  element={
                    <Layout>
                      <Checkout />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
                  path="/wishlist"
                  element={
                    <Layout>
                      <WishList />
                    </Layout>
                  }
                />

                {/* User account Nested Route */}
                <Route
                  path="myaccount"
                  element={<UserProtectedRoutes Components={Myaccount} />}
                >
                  <Route index path="dashboard" element={<Dashboard />} />
                  <Route index path="orderhistory" element={<Orderhistory />} />
                  <Route path="accountdetails" element={<Accountdetails />} />
                  <Route path="editaddress" element={<Editaddress />} />
                </Route>

                <Route
                  path="/login"
                  element={
                    <Layout>
                      <Login />
                    </Layout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Layout>
                      <Register />
                    </Layout>
                  }
                />
                <Route
                  path="/forgotpassword"
                  element={
                    <Layout>
                      <Forgotpassword />
                    </Layout>
                  }
                />
                <Route
                  path="/resetpassword/:id/:token"
                  element={
                    <Layout>
                      <Resetpassword />
                    </Layout>
                  }
                />
                <Route
                  path="/shipping"
                  element={
                    <Layout>
                      <Shipping />
                    </Layout>
                  }
                />
                <Route
                  exact={true}
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
          </NavProvider>
        </ThemeProvider>
        <ScroolToTop />
      </BreadcrumbProvider>
    </div>
  );
};

export default App;
