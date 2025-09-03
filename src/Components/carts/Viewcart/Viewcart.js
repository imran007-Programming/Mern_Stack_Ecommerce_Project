import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsArrowBarRight, BsFillCartXFill } from "react-icons/bs";
import ReactLoading from "react-loading";
import {
  addtoCart,
  deleteCart,
  deletefulquantityCart,
  getCart,
} from "../../../redux/Slice/cartSlice/cartSlice";
import toast from "react-hot-toast";

const Viewcart = () => {
  const navigate = useNavigate();
  const { getCartProduct } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Calculate total price
  const calculateTotal = () => {
    const totalprice = getCartProduct.reduce(
      (acc, item) => acc + item.details.price * item.quantity,
      0
    );
    setPrice(totalprice);
  };

  useEffect(() => {
    calculateTotal();
  }, [getCartProduct]);

  // Handle add to cart (increase quantity)
  const handleAddToCart = (id, quantity) => {
    setIsLoading(true); // Show loading state
    const requestData = {
      productid: id,
      quantity: quantity,
    };
    dispatch(addtoCart(requestData))
      .then(() => dispatch(getCart()))
      .catch((error) => {})
      .finally(() => setIsLoading(false)); 
  };

  // Handle remove from cart (decrease quantity)
  const handleRemoveFromCart = (id) => {
    setIsLoading(true); 
    dispatch(deleteCart({ productid: id }))
      .then(() => dispatch(getCart()))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false)); 
  };

  // Handle delete single cart item
  const handleDeleteSingleCart = (id) => {
    setIsLoading(true); // Show loading state
    toast.success("Product successfully removed from cart");
    dispatch(deletefulquantityCart({ productid: id })).then(() => {
      dispatch(getCart());
      setIsLoading(false); 
    });
  };

  const CartItem = ({ data }) => {
    const increaseQuantity = () => {
      if (data.quantity < 5  ) {
        handleAddToCart(data.productid, 1);
      }
    };

    const decreaseQuantity = () => {
      if (data.quantity > 1 ) {
        handleRemoveFromCart(data.productid);
      }
    };

    return (
      <tr className="border-t">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="relative flex items-center space-x-4">
            <img
              className="w-20 h-20 object-cover"
              src={data.details.images[0]}
              alt={data.details.productName}
            />
            <div className="absolute top-0 -left-9 flex items-center justify-center">
              <ImCross
                onClick={() => handleDeleteSingleCart(data.productid)}
                size={20}
                className="cursor-pointer w-5 h-5 bg-white rounded-full shadow-[0px_4px_6px_2px_rgba(0,0,0,0.3)] p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-medium text-gray-900">
                {data.details.productName.length > 20
                  ? `${data.details.productName.substring(0, 50)}...`
                  : data.details.productName}
              </h1>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${data.details.price}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex h-[40px]">
            <button
              onClick={() => decreaseQuantity(data.productid)}
              className={`border p-[.5rem] cursor-pointer ${
                data.quantity === 1 || isLoading
                  ? "bg-[#FAFAFA] cursor-not-allowed"
                  : "bg-[#DADADA]"
              }`}
              disabled={isLoading} // Disable while loading
            >
              -
            </button>
            <div className="border p-[.5rem]">{data.quantity}</div>
            <button
              disabled={data.quantity === 5 || isLoading} // Disable while loading or at max quantity
              onClick={() => increaseQuantity(data.productid, data.quantity)}
              className={`border p-[.5rem] cursor-pointer ${
                data.quantity === 5 || isLoading
                  ? "bg-[#FAFAFA] cursor-not-allowed"
                  : "bg-[#DADADA]"
              }`}
            >
              +
            </button>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          ${data.details.price * data.quantity}
        </td>
      </tr>
    );
  };

  return (
    <div className="">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          {/* Spinner */}
         <ReactLoading type="spin" color="black" />
        </div>
      )}

      {getCartProduct?.length > 0 ? (
        <div className="grid md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 xl:grid-cols-3">
          <div className="p-6 shadow-lg col-span-2">
            <h2 className="text-2xl font-bold">
              Shopping Cart ({getCartProduct.length})
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getCartProduct.map((item, index) => (
                    <CartItem key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 shadow-lg mt-4 xl:mt-0 col-span-1">
            <p className="text-lg text-center font-semibold">CART TOTALS</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm">Subtotal:</p>
              <p className="ml-auto text-sm">${price}</p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <p className="text-sm">Total amount (including VAT)</p>
              <p className="ml-auto text-sm">${price}</p>
            </div>
            <div className="flex items-center justify-center mt-12">
              <button
                onClick={() => navigate("/viewcart/checkout")}
                className="text-white bg-black p-3 text-center text-sm mt-3 uppercase cursor-pointer flex justify-center items-center w-auto"
              >
                <BsArrowBarRight size={25} />
                <span> Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-9">
          <BsFillCartXFill className="opacity-20" size={130} />
          <p className="font-bold text-xl">No products in the cart</p>
        </div>
      )}
    </div>
  );
};

export default Viewcart;
