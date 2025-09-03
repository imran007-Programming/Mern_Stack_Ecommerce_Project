import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { clearuserLogInData, clearuserLoggedInData, userLoggedIn, userLogout } from '../../redux/Slice/Userauthslice/userAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { clearCartData, getCart } from '../../redux/Slice/cartSlice/cartSlice';
import { clearWishListData } from '../../redux/Slice/wishListSlice/wishListSlice';


const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({})
  const { userLoggedInData } = useSelector((state) => state.user);

  const userverify = () => {
    dispatch(userLoggedIn());

  };
  const getCartProducts = () => {
    dispatch(getCart())
  }






  useEffect(() => {
    userverify();
  }, []);


  const userlogout = () => {
    dispatch(userLogout()).then((res) => {
      if (res.payload.message == "User successfully Logout") {
         // Remove product ID from local storage
       localStorage.removeItem("wishlist");
      
        dispatch(clearCartData());
        dispatch(clearuserLogInData());
        dispatch(clearuserLoggedInData());
        dispatch(clearWishListData());
        navigate("/login")
       
      }


    }).catch((err) => {
      localStorage.removeItem("wishlist");
      dispatch(clearCartData());
      dispatch(clearuserLogInData());
      dispatch(clearuserLoggedInData());
      dispatch(clearWishListData());
      navigate("/login");

    })
  }


  ///handle logout function///
  // const userlogout = () => {
  //   dispatch(userLogout()).then((res) => {
  //     if (res.payload.message == "User successfully Logout") {

  //       // navigate("/login")
  //       dispatch(clearCartData());
  //       // dispatch(clearuserLogInData());
  //       dispatch(clearuserLoggedInData());
  //     }


  //   }).catch((err) => {
  //     dispatch(clearCartData());
  //     // dispatch(clearuserLogInData());
  //     dispatch(clearuserLoggedInData());
  //     // navigate("/login");

  //   })
  // }








  useEffect(() => {
    const token = localStorage.getItem('usertoken');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          dispatch(clearuserLoggedInData());
          localStorage.removeItem('usertoken');
          navigate('/login');
      
        }

        else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            dispatch(clearuserLoggedInData());
            localStorage.removeItem('usertoken');
            navigate('/login');
      
          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      } 
    } 
  }, [navigate, userLoggedInData]);









  return (
    <div className='bg-[#f6f6f8] w-[full] min-h-[230px] p-[25px] '>
      <p className='font-[300] text-sm'>Hello <strong className='uppercase'>{userLoggedInData[0]?.firstname}</strong> <strong className='uppercase'>{userLoggedInData[0]?.lastname}</strong> --(not <strong className='mr-4'><strong className='uppercase'>{userLoggedInData[0]?.firstname}</strong> <strong className='uppercase'>{userLoggedInData[0]?.lastname}</strong></strong>?<span className='text-[#008eff] ml-3 cursor-pointer' onClick={userlogout}>Log out</span> )</p>
      <p className='font-[300] text-sm mt-3' >From your account dashboard you can view your <Link className='text-[#008eff]' href="">recent orders</Link>, <Link className='text-[#008eff]' href="">manage your shipping and billing addresses</Link>, and <Link className='text-[#008eff]' href="">edit your password and account details</Link>.</p>

      <h3 className='text-xl mt-3'>Account Information</h3>
      <p className='font-[300] text-sm mt-3' >You account is linked with your primary phone number 8801647153126</p>
    </div>
  )
}

export default Dashboard