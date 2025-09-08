import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnim from "../../assest/lottie/Success.json"; 

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center p-6">
      {/* Lottie Animation */}
      <div className="w-64 h-64">
        <Lottie animationData={successAnim} loop={false} />
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-bold text-green-600 mt-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-gray-600 mt-2">
        Thank you for your purchase. Redirecting to home page...
      </p>
    </div>
  );
};

export default OrderSuccess;
