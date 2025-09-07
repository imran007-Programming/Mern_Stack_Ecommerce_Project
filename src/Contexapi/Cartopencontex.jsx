import { createContext, useEffect, useRef, useState, } from "react";


export const CartopenContex = createContext();

const CartProvider = ({ children }) => {
  const [cartopen, setCartopen] = useState(false);

  const cartRef = useRef()

 



  useEffect(() => {
    const handler = (e) => {
      if (!cartRef?.current?.contains(e.target)) {

        setCartopen(false)

      }

    }
    document.addEventListener("mousedown", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);

    };
  }, [])

  if (cartopen === true) {
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  }
  else if (cartopen === false) {
    document.body.style.overflow = 'unset';
  }
  




  return (
    <CartopenContex.Provider value={{ cartopen, setCartopen, cartRef, }}>
      {children}
    </CartopenContex.Provider>
  );
};

export default CartProvider;