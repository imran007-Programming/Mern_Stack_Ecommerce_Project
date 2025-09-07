import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assest/Daco_4162933.png"
import { userForgotPassword } from "../../redux/Slice/Userauthslice/userAuthSlice";
import toast from "react-hot-toast";
import Loading from "../Share/Loading";

const Forgotpassword = () => {
  const [email, setEmail] = useState({
    email: ""
  })

 
  const dispatch = useDispatch()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value })
  }


  const hadleSubmit = (e) => {
    e.preventDefault()

    dispatch(userForgotPassword(email)).then((res) => {
      if (res.payload) {
        // Reset email input
        setEmail({ email: "" });
      }
    }).catch((error) => {
    
    })

  }

  const { loading } = useSelector((state) => state.user)

  return (
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
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input

                onChange={handleChange}
                value={email?.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>



        </form>
        {loading ? <Loading /> : <div className="mt-4">
          <button
            onClick={hadleSubmit}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>}

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
  )
}

export default Forgotpassword