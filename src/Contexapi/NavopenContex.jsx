import { createContext, useEffect, useState } from "react";

export const NavOpenContex = createContext();

const NavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ✅ only render after client mounts
  }, []);

  if (!mounted) return null;

  return (
    <NavOpenContex.Provider value={{ navOpen, setNavOpen }}>
      {children}
    </NavOpenContex.Provider>
  );
};

export default NavProvider;
