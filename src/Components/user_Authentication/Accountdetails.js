import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from '../../redux/Slice/Userauthslice/userAuthSlice';

const Accountdetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({})
  const { userLoggedInData } = useSelector((state) => state.user);


  const userverify = () => {
    dispatch(userLoggedIn()).then((res) => {

    })

  };

  useEffect(() => {
    userLoggedInData.map((data) => {
      if (data) {
        setUserDetails(data)
      }
    })
  }, [userLoggedInData])




  useEffect(() => {
    userverify();
  }, [dispatch]);
  return (
    <div className='p-5'>
      <div className=''>
        <img className='w-36 rounded-full' src={userDetails.userprofile} alt="" />
        <div className="bg-gradient-to-r from-[#FF00D2] to-green-500 text-transparent bg-clip-text">
          <p className="text-4xl">
            FirstName: {userDetails.firstname}
          </p>
        </div>
        <hr />

        <div className="bg-gradient-to-r from-[#00CFCB] to-[#00CFCB] text-transparent bg-clip-text">
          <p className="text-4xl">
            LastName: {userDetails.lastname}
          </p>
        </div>
        <hr />
        <div className="bg-gradient-to-r from-[#FF00D2] to-green-500 text-transparent bg-clip-text">
          <p className="text-4xl">
            Email: {userDetails.email}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Accountdetails