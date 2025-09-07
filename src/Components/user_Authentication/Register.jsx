import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/Slice/Userauthslice/userAuthSlice";
import Loading from "../Share/Loading";

const Register = () => {
  const [show, setHide] = useState(true);
  const location = useLocation();
  const [file, setFile] = useState("");
  const [imgPreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputvalue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleImageupload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const { loading } = useSelector((state) => state.user);

  const useRegister = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = inputvalue;
    if (firstname === "") toast.error("Enter your firstname");
    else if (lastname === "") toast.error("Enter your lastname");
    else if (email === "") toast.error("Enter your email");
    else if (!email.includes("@")) toast.error("Enter valid email");
    else if (password === "") toast.error("Enter your password");
    else if (confirmPassword === "") toast.error("Enter confirmPassword");
    else if (password !== confirmPassword)
      toast.error("password doesn't match confirmPassword");
    else {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      dispatch(
        userRegister({
          ...inputvalue,
          file,
          config,
        })
      )
        .then((res) => {
          if (res?.payload) {
            setInputValue({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            navigate("/login");
          }
          setFile("");
          setImagePreview("");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  useEffect(() => {
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-hidden">
          <div className="flex min-h-full flex-1 flex-col justify-center ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6 " action="#" method="POST">
                {/* Firstname */}
                <div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      name="firstname"
                      type="text"
                      autoComplete="text"
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Lastname */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      name="lastname"
                      type="text"
                      autoComplete="text"
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Photo upload */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className=" bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Cover photo */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:text-black"
                        >
                          <span>Upload a file</span>
                          <input
                            onChange={handleImageupload}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2 flex flex-row items-center relative">
                    <input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type={show ? "password" : "text"}
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <div className="flex items-center absolute right-2 cursor-pointer">
                      {show ? (
                        <div className="tooltip">
                          <IoMdEye onClick={() => setHide(!show)} size={20} />
                          <span className="tooltiptext">Show password</span>
                        </div>
                      ) : (
                        <div className="tooltip">
                          <IoMdEyeOff onClick={() => setHide(!show)} size={20} />
                          <span className="tooltiptext">Hide password</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                    Confirm Password
                  </label>
                  <div className="mt-2 flex flex-row items-center relative">
                    <input
                      onChange={handleChange}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={show ? "password" : "text"}
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <div className="flex items-center absolute right-2 cursor-pointer">
                      {show ? (
                        <div className="tooltip">
                          <IoMdEye
                            color="black"
                            onClick={() => setHide(!show)}
                            size={20}
                          />
                          <span className="tooltiptext">Show password</span>
                        </div>
                      ) : (
                        <div className="tooltip">
                          <IoMdEyeOff
                            color="black"
                            onClick={() => setHide(!show)}
                            size={20}
                          />
                          <span className="tooltiptext">Hide password</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    onClick={useRegister}
                    type="submit"
                    className="flex w-full justify-center bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-black hover:text-gray-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
