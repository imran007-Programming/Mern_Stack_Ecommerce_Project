import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./Commonstyle.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/Slice/Userauthslice/userAuthSlice";
import Loading from "../Share/Loading";

const Register = () => {
  const [show, setHide] = useState(true);
  const location = useLocation();
  const [file, setFile] = useState("");
  const [imgPreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputvalue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleImageupload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile("");
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
    else if (confirmPassword === "") toast.error("Enter confirmPassword");
    else if (password !== confirmPassword)
      toast.error("password doesn't match confirmPassword");
    else {
      const config = { "Content-Type": "multipart/form-data" };
      dispatch(
        userRegister({
          ...inputvalue,
          file,
          config,
        })
      )
        .then((res) => {
          if (res?.payload?.success) {
            setInputValue({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setFile("");
            setImagePreview("");
            navigate("/login");
          }
        })
        .catch((err) => toast.error(err));
    }
  };

  useEffect(() => {
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex min-h-full flex-1 flex-col justify-center ">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <form className="space-y-6" onSubmit={useRegister}>
              {/* First + Last name in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="firstname"
                    type="text"
                    value={inputvalue.firstname}
                    required
                    className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
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
                    value={inputvalue.lastname}
                    required
                    className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
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
                  value={inputvalue.email}
                  required
                  className="mt-2 block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>

              {/* Photo Upload */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Profile Photo
                </label>
                <div
                  className={`mt-2 flex flex-col items-center justify-center rounded-lg border 
                      border-dashed border-gray-900/25 px-6 py-10 cursor-pointer transition 
                      ${dragActive ? "bg-gray-100" : "bg-white"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imgPreview ? (
                    <div className="relative">
                      <img
                        src={imgPreview}
                        alt="Preview"
                        className="h-28 w-28 object-cover rounded-full"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UserCircleIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag & drop or{" "}
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer font-semibold text-black hover:underline"
                        >
                          browse
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageupload}
                            className="sr-only"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Password + Confirm Password in grid */}
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
                      value={inputvalue.password}
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() => setHide(!show)}
                    >
                      {show ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      onChange={handleChange}
                      name="confirmPassword"
                      type={show ? "password" : "text"}
                      value={inputvalue.confirmPassword}
                      required
                      className="block w-full px-3 py-2 border-0 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() => setHide(!show)}
                    >
                      {show ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full justify-center px-3 py-2 text-sm font-semibold 
                      leading-6 text-white shadow-sm focus-visible:outline-offset-2 
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-800"
                      }`}
                  >
                    {loading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              )}
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
    </>
  );
};

export default Register;
