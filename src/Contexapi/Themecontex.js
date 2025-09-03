import { createContext, useEffect, useState } from "react";

export const ThemeContex = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const darktheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", darktheme);
    }, [theme]);

    const handlethemechange = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };




    return (
        <ThemeContex.Provider value={{ theme, setTheme, handlethemechange }}>
            {children}
        </ThemeContex.Provider>
    )
}

export default ThemeProvider;