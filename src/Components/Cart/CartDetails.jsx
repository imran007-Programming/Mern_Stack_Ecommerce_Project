import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsFillCartXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deletefulquantityCart,
  addtoCart,
  deleteCart,
} from "../../redux/Slice/cartSlice/cartSlice";
import toast from "react-hot-toast";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import ReactLoading from "react-loading";

const CartDetails = ({ getCartProduct }) => {
  const navigation = useNavigate();
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const { getCartLoading } = useSelector((state) => state.cart);

  const [price, setPrice] = useState("");
  const [cartProduct, setCartProduct] = useState();
  const [loadingProductId, setLoadingProductId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartProduct(getCartProduct);
  }, [getCartProduct]);

  const total = () => {
    let totalprice = 0;
    getCartProduct.map((el) => {
      totalprice = el.details?.price * el?.quantity + totalprice;
    });
    setPrice(totalprice);
  };

  const viewhandaler = () => {
    window.scrollTo(0, 0);
    navigation("/Viewcart", { state: price });
    setCartopen(false);
  };

  const checkhandaler = () => {
    window.scrollTo(0, 0);
    navigation("/Viewcart/Checkout", { state: price });
    setCartopen(false);
  };

  useEffect(() => {
    total();
  }, [getCartProduct]);

  const deleteSingleCartHandler = async (id) => {
    setLoadingProductId(id);
    const data = { productid: id };
    try {
      const res = await dispatch(deletefulquantityCart(data));
      if (res.payload) {
        toast.success("Product successfully removed from cart");
        dispatch(getCart());
      }
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddtoCart = async (id, quantity) => {
    setLoadingProductId(id);
    const requestData = {
      productid: id,
      quantity: quantity,
    };
    try {
      const res = await dispatch(addtoCart(requestData));
      if (res.payload) {
        dispatch(getCart());
      }
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleremovetoCart = async (id) => {
    setLoadingProductId(id);
    const requestData = {
      productid: id,
    };
    try {
      const res = await dispatch(deleteCart(requestData));
      if (res.payload) {
        dispatch(getCart());
      }
    } finally {
      setLoadingProductId(null);
    }
  };

  const increase = (id) => {
    handleAddtoCart(id, 1);
  };

  const decrease = (id) => {
    handleremovetoCart(id);
  };

  const Cartsingle = ({ data }) => {
    const isLoading = loadingProductId === data.productid;

    return (
      <div className="border-b border-gray-200 p-4 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 opacity-50 flex justify-center items-center z-10">
            <ReactLoading type="spin" color="black" height={25} width={25} />
          </div>
        )}

        <div className="w-full flex items-center">
          <div className="flex h-[40px]">
            <button
              onClick={() => decrease(data.productid)}
              disabled={data.quantity === 1 || isLoading}
              className={`border border-gray-200 p-[.5rem] cursor-pointer ${
                data.quantity === 1 || isLoading
                  ? "bg-[#FAFAFA] cursor-not-allowed"
                  : "bg-[#DADADA]"
              }`}
            >
              -
            </button>
            <div className="border border-gray-200 p-[.5rem]">{data.quantity}</div>
            <button
              onClick={() => increase(data.productid)}
              disabled={data.quantity === 5 || isLoading}
              className={`border border-gray-200 p-[.5rem] cursor-pointer ${
                data.quantity === 5 || isLoading
                  ? "bg-[#FAFAFA] cursor-not-allowed"
                  : "bg-[#DADADA]"
              }`}
            >
              +
            </button>
          </div>

          <img
            className="w-[50px] h-[50px] ml-2"
            src={data?.details?.images[0]}
            alt=""
          />

          <div className="mx-3 text-xs">
            <h1>
              {data?.details?.productName.length > 20
                ? data?.details?.productName.substring(0, 50)
                : data?.details?.productName}
            </h1>
            <h4 className="font-[400] flex items-center text-black">
              <span className="mr-3">${data?.details?.price}</span>
              <span className="font-[200]">
                <RxCross1 />
              </span>
              <span className="ml-1">{data.quantity}</span>
            </h4>
            <h4 className="pt-[3px] font-roboto text-black">
              $USD {data?.details?.price * data.quantity}
            </h4>
          </div>

          <div className="ml-auto cursor-pointer">
            <RxCrossCircled
              onClick={() => deleteSingleCartHandler(data.productid)}
              size={20}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="h-[60px] border-b border-gray-200">
        <div className="flex justify-center p-6 absolute top-0 bottom-0">
          <ShoppingBagIcon className="w-5 h-5 text-[#5F5F5F]" />
          <h5 className="pl-2 text-md">Shopping Cart</h5>
        </div>
        <div className="absolute top-6 right-1">
          <XMarkIcon
            onClick={() => setCartopen(false)}
            className="w-5 h-5 cursor-pointer text-[#5F5F5F]"
          />
        </div>
      </div>

      <br />
      {cartProduct?.length > 0 ? (
        <div className="w-full absolute top-20 bottom-0">
          {cartProduct.map((i, index) => (
            <Cartsingle key={index} data={i} />
          ))}
          <div className="flex justify-center items-center my-7">
            <h1 className="ml-3 text-sm uppercase font-[800]">Subtotal:</h1>
            <h1 className="ml-auto mr-3 text-sm uppercase font-[800]">
              $ {price}.00
            </h1>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div
              onClick={viewhandaler}
              className="text-white bg-black p-3 w-[70%] text-center text-sm uppercase cursor-pointer"
            >
              View Cart
            </div>
            <div
              onClick={checkhandaler}
              className="text-black bg-gray-200 p-3 w-[70%] text-center text-sm mt-3 uppercase cursor-pointer"
            >
              Checkout
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

export default CartDetails;
