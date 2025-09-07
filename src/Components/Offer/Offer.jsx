import React from "react";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold">
            🎁 Special Offer: Get 30% OFF Your First Order!
          </h2>
          <p className="mt-4 text-lg">
            Don’t miss out on this limited-time deal. Shop now and enjoy amazing
            discounts on our best-selling products.
          </p>
        </div>
        <div className="md:w-auto">
          <Link
            to="/allproducts"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Offer;
