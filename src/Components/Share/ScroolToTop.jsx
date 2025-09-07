import React, { useEffect, useState } from 'react'
import "./ScroolToTop.scss"
import { FaArrowUp } from "react-icons/fa";

const ScroolToTop = () => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const topbuttonVisiblity = () => {
            if (window.scrollY > 900) {
                setVisible(true)
            } else {
                setVisible(false)

            }
        }

        window.addEventListener("scroll", topbuttonVisiblity)
        return () => {
            window.removeEventListener("scroll", topbuttonVisiblity)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };



    return (
        <div className='scroll-to-top'>
            {
                visible && <button className='scroll-to-top-btn' onClick={scrollToTop} ><FaArrowUp size={20}/></button>
            }

        </div>
    )
}

export default ScroolToTop