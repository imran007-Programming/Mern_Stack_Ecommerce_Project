import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assest/Daco_4162933.png"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { userForgotPasswordFinal, userForgotPasswordValidity } from "../../redux/Slice/Userauthslice/userAuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Resetpassword = () => {
  const [showpassword, setShowPassword] = useState(true);
  const [showConfirmpassword, setShowConfirmPassword] = useState(true);
  const { id, token } = useParams()
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  useEffect(() => {
    const data = {
      id, token
    }
    dispatch(userForgotPasswordValidity(data))
  }, [id, token])
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, confirmPassword } = inputValue
    if (password == "") {
      toast.success("please enter a new password")
    }
    else if (password !== confirmPassword) {
      toast.error("Password and ConfrimPassword doesn't match")
    }
    else {
      const data = {
        password: password,
        id: id,
        token: token
      }
      dispatch(userForgotPasswordFinal(data)).then((res) => {

        if (res.payload == undefined) {
          Navigate("/forgotpassword")
        }
        else if (res.payload.message == "New password updated successfully") {
          Navigate("/login")
          setInputValue({
            password: "",
            confirmPassword: ""
          })
        }

      }).catch((error) => {
      
        if (error) {
          toast.error(error)
          Navigate("/forgotpassword")
        }

      })
    }
  }


  return (



    <div className="overflow-x-hidden" >

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[95px] w-auto"
            src={logo}

          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">




            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                      <Link
                        to="/forgotpassword"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div> */}
              </div>
              <div className="mt-2 flex flex-row items-center relative">
                <input
                  value={inputValue.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={`${showpassword ? "password" : "text"}`}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex items-center absolute right-2 cursor-pointer">


                  {showpassword ? (<div class="tooltip">
                    <IoMdEye onClick={() => setShowPassword(!showpassword)} size={20} />
                    <span class="tooltiptext">Show password</span>
                  </div>) : (<div class="tooltip">
                    <IoMdEyeOff onClick={() => setShowPassword(!showpassword)} size={20} />
                    <span class="tooltiptext">Hide password</span>
                  </div>
                  )}

                </div>
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                {/* <div className="text-sm">
                      <Link
                        to="/forgotpassword"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div> */}
              </div>
              <div className="mt-2 flex flex-row items-center relative">
                <input
                  value={inputValue.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={`${showConfirmpassword ? "password" : "text"}`}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex items-center absolute right-2 cursor-pointer">


                  {showConfirmpassword ? (<div class="tooltip">
                    <IoMdEye onClick={() => setShowConfirmPassword(!showConfirmpassword)} size={20} />
                    <span class="tooltiptext">Show password</span>
                  </div>) : (<div class="tooltip">
                    <IoMdEyeOff onClick={() => setShowConfirmPassword(!showConfirmpassword)} size={20} />
                    <span class="tooltiptext">Hide password</span>
                  </div>
                  )}

                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>

  )
}

export default Resetpassword