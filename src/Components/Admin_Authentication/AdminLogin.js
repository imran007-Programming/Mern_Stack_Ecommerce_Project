import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assest/Daco_4162933.png";
import { useDispatch, useSelector } from "react-redux";
import { AdminauthLogin } from "../../redux/Slice/adminAuthslice/adminAuthslice";
import Loading from "../Share/Loading";

const Login = () => {
  const [show, setHide] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.Admin);
  const [inputvalue, setInputvalue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputvalue, [name]: value });
  };

  const adminlogin = (e) => {
    e.preventDefault();
    const { email, password } = inputvalue;
    if (email === "") {
      toast.error("please enter a valid email");
    } else if (!email.includes("@")) {
      toast.error("please enter a valid email");
    } else if (password === "") {
      toast.error("please enter your password");
    } else {
      dispatch(AdminauthLogin(inputvalue)).then((res) => {
        if (res.payload.token) {
          navigate("/adminaccount/dashboard");
        }
      }).catch((error) => {
       
      });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-[95px] w-auto" src={logo} alt="logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={show ? "password" : "text"}
                  autoComplete="current-password"
                  required
                  className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {show ? (
                    <IoMdEyeOff onClick={() => setHide(!show)} size={20} className="cursor-pointer" />
                  ) : (
                    <IoMdEye onClick={() => setHide(!show)} size={20} className="cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div>
                <button
                  onClick={adminlogin}
                  type="submit"
                  className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link to="/admin/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
