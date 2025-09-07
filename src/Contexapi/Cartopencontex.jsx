import { createContext, useEffect, useRef, useState } from "react";

export const CartopenContex = createContext();

const CartProvider = ({ children }) => {
  const [cartopen, setCartopen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    setMounted(true); // ensures hydration is done
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!cartRef?.current?.contains(e.target)) {
        setCartopen(false);
      }
    };

    document.addEventListener("mousedown", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = cartopen ? "hidden" : "unset";
    }
  }, [cartopen]);

  if (!mounted) return null; // ⬅️ prevents SSR/client mismatch

  return (
    <CartopenContex.Provider value={{ cartopen, setCartopen, cartRef }}>
      {children}
    </CartopenContex.Provider>
  );
};

export default CartProvider;
