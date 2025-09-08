import CouponBanner from "../Components/CuponBanner/CuponBanner";
import Footer from "./Footer/Footer";
import Navbar2 from "./HeADER/Navbar2";


const Layout = ({ children }) => {
  return (
    <div>
       <CouponBanner />

      {/* Navbar */}
      <div className="sm:mb-40 mb-30">
        <Navbar2 />
      </div>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
