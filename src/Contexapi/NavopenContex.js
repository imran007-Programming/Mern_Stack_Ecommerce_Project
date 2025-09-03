import { createContext, useState } from "react";


export const NavOpenContex=createContext();

 const NavProvider=({children})=>{
    const [navOpen, setNavOpen] = useState(false)
 
    return (
        <NavOpenContex.Provider value={{ navOpen, setNavOpen}}>
          {children}
        </NavOpenContex.Provider>
      );
    };

     export default NavProvider;