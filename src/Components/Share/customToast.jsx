import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartopenContex } from "../../Contexapi/Cartopencontex";

const CustomToast = ({ t, productImage, productName, price }) => {

  const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);

  return (
    <div
      ref={cartRef}
      className={`toast-container flex items-center bg-white p-4 rounded-lg shadow-md w-72 transform transition-all duration-500 ${
        t.visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <img src={productImage[0]} alt={productName} className="w-12 h-12 mr-3" />
      <div className="flex flex-col">
        <span className="font-semibold">
          {productName.length > 20 ? productName.substring(0, 50) : productName}
        </span>

        <span className="text-sm text-gray-500">${price}</span>
        <div className="flex space-x-2 mt-2">
          <Link to="/Viewcart">
            <button className="bg-black text-white p-2 uppercase text-sm">
              View Cart
            </button>
          </Link>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-600 text-white p-2 uppercase text-sm cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
