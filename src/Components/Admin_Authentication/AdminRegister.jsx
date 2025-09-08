import React, { useEffect, useState, useCallback } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Share/Loading";
import { adminRegisterSlice } from "../../redux/Slice/adminAuthslice/adminAuthslice";
import { XCircleIcon } from "@heroicons/react/24/outline";

const AdminRegister = () => {
  const [show, setHide] = useState(true);
  const [file, setFile] = useState(null);
  const [imgPreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.Admin);

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
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview("");
  };

  const useRegister = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = inputvalue;

    if (firstname === "") toast.error("Enter your firstname");
    else if (lastname === "") toast.error("Enter your lastname");
    else if (email === "") toast.error("Enter your email");
    else if (!email.includes("@")) toast.error("Enter valid email");
    else if (password === "") toast.error("Enter your password");
    else if (confirmPassword === "") toast.error("Enter confirm password");
    else if (password !== confirmPassword)
      toast.error("Password doesn't match confirm password");
    else {
      const config = { "Content-Type": "multipart/form-data" };

      dispatch(
        adminRegisterSlice({
          ...inputvalue,
          file,
          config,
        })
      )
        .then((res) => {
          if (res?.payload?.success) {
            // toast.success("Registration successful!");
            setInputValue({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setFile(null);
            setImagePreview("");
            navigate("/admin/login");
          } else {
            // toast.error(res?.payload?.response?.data?.error || "Registration failed");
          }
        })
        .catch((err) => {
          // toast.error(err?.message || "Something went wrong");
        });
    }
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex min-h-full flex-1 flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <form className="space-y-6" onSubmit={useRegister}>
              {/* Grid layout for Firstname & Lastname */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="firstname"
                    type="text"
                    required
                    className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="lastname"
                    type="text"
                    required
                    className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  required
                  className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>

              {/* Drag & Drop Image Upload */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="mt-2 flex justify-center rounded-lg border border-dashed 
                  border-gray-900/25 px-6 py-10 relative"
              >
                {imgPreview ? (
                  <div className="relative">
                    <img
                      src={imgPreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                    >
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Drag & drop your photo here, or{" "}
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer font-semibold text-black underline"
                      >
                        browse
                      </label>
                      <input
                        onChange={handleImageupload}
                        id="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Password */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    onChange={handleChange}
                    name="password"
                    type={show ? "password" : "text"}
                    required
                    className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={() => setHide(!show)}
                  >
                    {show ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    onChange={handleChange}
                    name="confirmPassword"
                    type={show ? "password" : "text"}
                    required
                    className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={() => setHide(!show)}
                  >
                    {show ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </div>
                </div>
              </div>

              </div>
           

              {/* Submit button */}
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center bg-black px-3 py-2 
                    text-sm font-semibold leading-6 text-white shadow-sm 
                    hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign up
                </button>
              )}
            </form>

            {/* Login link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/admin/login"
                className="font-semibold leading-6 text-black hover:text-gray-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
