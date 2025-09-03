import React, { useEffect, useState } from "react";
import { deleteWishList, getWishList } from "../../redux/Slice/wishListSlice/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { BiHeart } from "react-icons/bi";
import WishListViewProduct from "./WishListViewProduct";

import ReactLoading from "react-loading";

const WishList = () => {
  const navigate = useNavigate();
  const { getWishListProduct, getWishListLoading } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [deleteWishListLoading, seDeleteWishListLoading] = useState(false);
  const [wishListView, setWishListView] = useState({});
  const token = localStorage.getItem("usertoken")

  useEffect(() => {

   if(token){

    dispatch(getWishList());
   }

  }, [dispatch,token]);

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
      .catch((error) => {
        
      })
      .finally(() => {
        seDeleteWishListLoading(false);
      });
  };

  const viewWishListProduct = (pd) => {
    setWishListView(pd);
  };

  if (getWishListLoading) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="bars" color="black" />
    </div>


  }



  return (
    <>
      <div className="bg-[#F4F4F4] w-full h-52 flex justify-center items-center">
        <h1 className="text-4xl font-semibold">WishList</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="bg-white   overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold my-6 text-center md:text-left">
            My wishlist on OnlineNest  Shop
          </h1>

          {token && getWishListProduct.length ? (
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {getWishListProduct.map((product) => (
                <div key={product.details._id} className="border rounded-lg p-4 relative">
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
                  <h2 className="text-center font-semibold mt-2">{product.details.productName}</h2>
                  <p className="text-center text-xl mt-2">${product.details.price}</p>
                  <p className="text-center mt-2">{product.details.quantity >= 1 ? "In Stock" : "Out of Stock"}</p>
                  <div className="flex flex-col mt-4">
                    <button
                      onClick={() => {
                        viewWishListProduct(product.details);
                        document.getElementById("my_modal_2").showModal();
                      }}
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
            <table className="min-w-full bg-white hidden md:block">
              <thead className="text-black">
                <tr className="text-sm font-light">
                  <th className="px-4 py-2">Product</th>
                  <th></th>
                  <th></th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-6 py-2">Stock Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {getWishListProduct.map((product) => (
                  <tr key={product.details._id} className="border-b border-t">
                    <td className="px-4 py-9 flex items-center relative">
                      <img
                        src={product?.details?.images[0]}
                        alt={product.details.productName}
                        className="w-20 h-16 mr-4"
                      />
                      <div
                        onClick={() => removeFromWishList(product.details._id)}
                        className="flex items-center justify-center absolute top-7 left-2 w-5 h-5 bg-[#fffcfc] shadow-sm shadow-black rounded-full cursor-pointer"
                      >
                        <ImCross size={7} />
                      </div>
                    </td>
                    <td>
                      <h2 className="text-sm font-normal">{product.details.productName}</h2>
                    </td>
                    <td></td>
                    <td className="px-4 py-2">${product.details.price}</td>
                    <td className="px-6 py-2">{product.details.quantity >= 1 ? "In Stock" : "Out of Stock"}</td>
                    <td className="px-4 py-2">
                      <div className="flex xl:flex-row md:flex-col lg:flex-col xl:space-x-2 xl:space-y-0 md:space-y-2 space-y-2">
                        <button
                          onClick={() => {
                            viewWishListProduct(product.details);
                            document.getElementById("my_modal_2").showModal();
                          }}
                          className="px-4 py-2 w-40 h-[37px] bg-gray-50 text-black hover:text-white tracking-wider uppercase hover:bg-black duration-300 ease-in-out"
                        >
                          Quick View
                        </button>
                        {product.details.quantity >= 1 ? (
                          <button className="bg-black text-white text-sm hover:bg-black uppercase w-40 h-[37px]">
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSelectOption(product.details._id)}
                            className="w-40 h-[37px] text-sm tracking-wider hover:bg-[#343434] bg-black text-white uppercase"
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
                <p className="text-gray-500">No products added to the wishlist</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Section */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-full sm:w-[100%] md:w-3/4 lg:w-3/4 xl:max-w-5xl
        md:h-3/4 lg:h-3/4 xl:max-h-5xl   rounded-none">

          <WishListViewProduct wishListView={wishListView} />

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default WishList;
