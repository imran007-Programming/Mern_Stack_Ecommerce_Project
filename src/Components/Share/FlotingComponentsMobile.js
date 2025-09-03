import React, { useContext, useEffect } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { IoBagHandleOutline } from "react-icons/io5";

import "./FlotingComponentsMobile.scss"
import { CiUser } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '../../redux/Slice/Userauthslice/userAuthSlice';
import { getCart } from '../../redux/Slice/cartSlice/cartSlice';
import { NavOpenContex } from '../../Contexapi/NavopenContex';
const FlotingComponentsMobile = () => {
  const { userLoggedInData, userLogoutData, userLoginData } = useSelector((state) => state.user);
  const { navOpen, setNavOpen } = useContext(NavOpenContex);
  const { getCartProduct } = useSelector((state) => state.cart)
  const { getWishListProduct } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userLoggedIn())
  }, [userLoginData])

  useEffect(() => {
    dispatch(getCart())
  }, [userLoginData])
  const token = localStorage.getItem('usertoken')
  const Navigate = useNavigate()
  const gotohome = () => {
    Navigate("/")
  }
  const gotowishlist=()=>{
    Navigate("/wishlist")
   }

  return (
    <div className='lg:hidden  relative'>
      <div className='navbar'>
        <div onClick={gotohome} className='flex flex-col'>
          <IoHomeOutline className='' size={30} />
          <small className='uppercase'>Home</small>
        </div>

        <div onClick={() => setNavOpen(!navOpen)} className='flex flex-col'>
          <HiBars3 size={30} />
          <small className='uppercase'>category</small>
        </div>
        <div  className=' flex flex-col relative'>
          <IoIosHeartEmpty size={30} />
          <small className='uppercase'>wishlist</small>

          <div onClick={gotowishlist} className='absolute bottom-4 
              sm:right-[15px]
              md:right-[3.5rem]
              '>
            <span className='bg-red-700 rounded-full text-white pl-1 pr-1 text-center text-xs'> {userLoggedInData?.length > 0 ? getWishListProduct?.length : "0"}</span>
          </div>
        </div>
        <div>
          {

            token ? <Link to="/myaccount/dashboard"> <div className=' flex flex-col'>
              <CiUser size={30} className='' />
              <small className='uppercase'>Account</small>
            </div></Link> : <Link to="/login"> <div className=' flex flex-col'>
              <CiUser size={30} className='' />
              <small className='uppercase'>Account</small>
            </div></Link>
          }
        </div>

        <div className='relative'>

          <Link to="/Viewcart">

            <div className='flex flex-col '>
              <IoBagHandleOutline size={30} />
              <small className='uppercase'>cart</small>
              <div className='fixed bottom-4 
              sm:right-[14px]
              md:right-[3.2rem]
              
              
              '>
                <span className='bg-red-700 rounded-full text-white  pl-1 pr-1 text-center text-xs'>{userLoggedInData?.length >0 ? getCartProduct?.length :"0"}</span>
              </div>
            </div>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default FlotingComponentsMobile