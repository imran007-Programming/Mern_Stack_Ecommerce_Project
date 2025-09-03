import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss"
import { Link, unstable_HistoryRouter, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assest/Daco_4162933.png"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/Slice/Userauthslice/userAuthSlice";
import Loading from "../Share/Loading";
import { getCart } from "../../redux/Slice/cartSlice/cartSlice";

const Login = () => {
  const [show, setHide] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 






  const [inputvalue, setInputValue] = useState({
    email: "",
    password: ""
  })

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value })
  }

  const { loading } = useSelector((state) => state.user)

  const handleuserLogin = (e) => {
    e.preventDefault()
    const { email, password } = inputvalue;
    if (email === "") toast.error("Enter your Email")
    else if (!email.includes("@")) toast.error("Enter valid Email")
    else if (password === "") toast.error("Enter your password")
    else {
      dispatch(userLogin(inputvalue)).then((res) => {
        if (res.payload.token) {
          // dispatch(getCart())
          navigate("/");
          

        }
      }).catch((error) => {
        toast.error(error)
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handlechange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 flex flex-row items-center relative">
                <input
                  onChange={handlechange}
                  id="password"
                  name="password"
                  type={`${show ? "password" : "text"}`}
                  autoComplete="current-password"
                  required
                  className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
                <div className="flex items-center absolute right-2 cursor-pointer">
 

                  {show ? (<div class="tooltip">
                    <IoMdEye color="black" onClick={() => setHide(!show)} size={20} />
                    <span class="tooltiptext">Show password</span>
                  </div>) : (<div class="tooltip">
                    <IoMdEyeOff color="black" onClick={() => setHide(!show)} size={20} />
                    <span class="tooltiptext">Hide password</span>
                  </div>
                  )}

                </div>
              </div>
            </div>

            {
              loading ? <Loading /> : <div>
                <button
                  onClick={handleuserLogin}
                  type="submit"
                  className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            }
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link to="/register"
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};
export default Login;
