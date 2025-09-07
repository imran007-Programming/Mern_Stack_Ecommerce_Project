import React, { useEffect, useState } from "react";
import {
  deleteWishList,
  getWishList,
} from "../../redux/Slice/wishListSlice/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { BiHeart } from "react-icons/bi";
import WishListViewProduct from "./WishListViewProduct";
import ReactLoading from "react-loading";

const WishList = () => {
  const navigate = useNavigate();
  const { getWishListProduct, getWishListLoading } = useSelector(
    (state) => state.wishlist
  );
  const dispatch = useDispatch();
  const [deleteWishListLoading, seDeleteWishListLoading] = useState(false);
  const [wishListView, setWishListView] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("usertoken");

  useEffect(() => {
    if (token) {
      dispatch(getWishList());
    }
  }, [dispatch, token]);

  const handleSelectOption = (id) => {
    navigate(`/allproduct/${id}`);
  };

  const removeFromWishList = (id) => {
    seDeleteWishListLoading(true);
    const data = { productid: id };
    dispatch(deleteWishList(data))
      .then(() => {
        dispatch(getWishList());
      })
      .catch(() => {})
      .finally(() => {
        seDeleteWishListLoading(false);
      });
  };

  const viewWishListProduct = (pd) => {
    setWishListView(pd);
    setIsModalOpen(true);
  };

  if (getWishListLoading) {
    return (
      <div className="flex justify-center items-center">
        <ReactLoading type="bars" color="black" />
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className="bg-[#F4F4F4] w-full h-52 flex justify-center items-center">
        <h1 className="text-4xl font-semibold">WishList</h1>
      </div>

      <div className="w-full container mx-auto px-10">
        <div className="bg-white">
          <h1 className="text-2xl md:text-3xl font-bold my-6 text-center md:text-left">
            My wishlist on Easy Mart
          </h1>

          {/* Mobile view */}
          {token && getWishListProduct.length ? (
            <div className="w-full grid grid-cols-1 gap-4 sm:hidden">
              {getWishListProduct.map((product) => (
                <div
                  key={product.details._id}
                  className="border rounded-lg p-4 relative"
                >
                  <img
                    src={product?.details?.images[0]}
                    alt={product.details.productName}
                    className="w-20 h-20 mx-auto"
                  />
                  <div
                    onClick={() => removeFromWishList(product.details._id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-[#fffcfc] shadow-sm shadow-black rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <ImCross size={10} />
                  </div>
                  <h2 className="text-center font-semibold mt-2">
                    {product.details.productName}
                  </h2>
                  <p className="text-center text-xl mt-2">
                    ${product.details.price}
                  </p>
                  <p className="text-center mt-2">
                    {product.details.quantity >= 1
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>
                  <div className="flex flex-col mt-4">
                    <button
                      onClick={() => viewWishListProduct(product.details)}
                      className="bg-gray-50 text-black hover:text-white tracking-wider uppercase hover:bg-black duration-300 ease-in-out py-2 mb-2"
                    >
                      Quick View
                    </button>
                    {product.details.quantity >= 1 ? (
                      <button className="bg-black text-white text-sm hover:bg-gray-800 uppercase py-2">
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelectOption(product.details._id)}
                        className="bg-black text-white text-sm hover:bg-gray-800 uppercase py-2"
                      >
                        Select Option
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Desktop and tablet view */}
          {token && getWishListProduct.length ? (
            <table className="min-w-full table-fixed bg-white hidden sm:table">
              <thead className="text-black bg-gray-50">
                <tr className="text-sm font-medium text-left">
                  <th className="px-4 py-2 w-[30%]">Product</th>
                  <th className="px-4 py-2 w-[20%]">Price</th>
                  <th className="px-4 py-2 w-[20%]">Stock Status</th>
                  <th className="px-4 py-2 w-[30%]">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {getWishListProduct.map((product) => (
                  <tr key={product.details._id} className="border-b">
                    {/* Product */}
                    <td className="px-4 py-4 flex items-center relative">
                      <img
                        src={product?.details?.images[0]}
                        alt={product.details.productName}
                        className="w-20 h-16 mr-4"
                      />
                      <div
                        onClick={() => removeFromWishList(product.details._id)}
                        className="flex items-center justify-center absolute top-4 left-2 w-5 h-5 bg-white shadow-sm shadow-black rounded-full cursor-pointer"
                      >
                        <ImCross size={7} />
                      </div>
                      <span className="text-sm font-medium">
                        {product.details.productName}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-2">${product.details.price}</td>

                    {/* Stock Status */}
                    <td className="px-4 py-2">
                      {product.details.quantity >= 1
                        ? "In Stock"
                        : "Out of Stock"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2">
                      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        <button
                          onClick={() => viewWishListProduct(product.details)}
                          className="px-4 py-2 w-40 h-[37px] bg-gray-50 text-black 
                         hover:text-white uppercase hover:bg-black 
                         duration-300 ease-in-out"
                        >
                          Quick View
                        </button>
                        {product.details.quantity >= 1 ? (
                          <button className="bg-black text-white text-sm uppercase w-40 h-[37px] hover:bg-gray-800">
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleSelectOption(product.details._id)
                            }
                            className="bg-black text-white text-sm uppercase w-40 h-[37px] hover:bg-gray-800"
                          >
                            Select Option
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <BiHeart className="opacity-10" size={150} />
                <p className="text-gray-500">
                  No products added to the wishlist
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Tailwind Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-lg rounded-lg p-6 z-50">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ❌
            </button>

            {/* Your product view */}
            <WishListViewProduct wishListView={wishListView} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
