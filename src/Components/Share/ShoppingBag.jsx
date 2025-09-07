import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CartopenContex } from '../../Contexapi/Cartopencontex';
import { useLocation } from 'react-router';
import { FaBagShopping } from 'react-icons/fa6';

const ShoppingBag = () => {

    const token = localStorage.getItem('usertoken')
    const [totalPrice, setTotalPrice] = useState(0);
    const { addToCartLoading,getCartProduct} = useSelector((state) => state.cart);
    const { cartopen, setCartopen } = useContext(CartopenContex);
    const cartopenbyclck=()=>{
      setCartopen(!cartopen)
    }
    const location = useLocation();
    useEffect(() => {
      if (location.pathname) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
  
      // Trigger jerk animation when routes change
      const cartElement = document.querySelector(".cart-container");
      cartElement.classList.add("animate-jerk");
  
      // Remove jerk animation class after a short delay
      setTimeout(() => {
        cartElement.classList.remove("animate-jerk");
      }, 1000); // Adjust the delay as needed
    }, [location]); 
   
    useEffect(() => {
      animateTotalPrice();
    }, [getCartProduct,location]);
    
    // Calculate total price whenever getCartProduct changes
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      getCartProduct.forEach((item) => {
        totalPrice += item.details.price * item.quantity;
      });
      return totalPrice;
    };
  
    // Animate total price increase
    const animateTotalPrice = () => {
      const interval = 50; // Adjust the interval for smoother animation
      const increment = Math.ceil(calculateTotalPrice() / 20); // Adjust the increment for desired speed
  
      let currentPrice = 0;
      const timer = setInterval(() => {
        currentPrice += increment;
        setTotalPrice(currentPrice);
        if (currentPrice >= calculateTotalPrice()) {
          clearInterval(timer);
          setTotalPrice(calculateTotalPrice());
        }
      }, interval);
    };
  return (
    <div className=''>
    <div 
   onClick={cartopenbyclck}
   className={`cart-container ${
    addToCartLoading ? "animate-jerk" : ""
   } cursor-pointer bg-[black] h-[80px] w-[70px] fixed top-[38%] right-0 z-10 flex flex-col items-center justify-center rounded-tl-xl rounded-b-xl `}>
     <div className="w-full h-[70%] flex flex-col items-center justify-center  ">
       <FaBagShopping size={33} color="white" />
       {
         token?<small className="text-[white]">{getCartProduct.length} items</small>:<small className="text-[white]">0 items</small>
       }
      
     </div>
     <div className="bg-white flex items-center justify-center rounded-bl-xl  w-full h-[30%]">
    {
     token ?  <p className="text-sm text-black">${totalPrice}</p>:<p className="text-sm text-black">$0</p>
    }
     
     </div>
   </div>
  </div>
  )
}

export default ShoppingBag