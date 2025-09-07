import Footer from "./Footer/Footer";
import Navbar2 from "./HeADER/Navbar2";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="mb-40">
        <Navbar2 />
      </div>

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
