import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isAdminLogin = location.pathname === "/admin/login";
  const isAdminRegister = location.pathname === "/admin/register";

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4  h-auto pt-15">
      {/* Main card */}
      <div className="bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-[70%] lg:w-[60%] max-w-3xl">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b px-2">
          <button
            onClick={() => navigate("/login")}
            className={`flex-1 min-w-[120px] py-3 text-center font-semibold transition cursor-pointer rounded-t-lg ${
              isLogin
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className={`flex-1 min-w-[120px] py-3 text-center font-semibold transition cursor-pointer rounded-t-lg ${
              isRegister
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Register
          </button>

          <button
            onClick={() => navigate("/admin/login")}
            className={`flex-1 min-w-[120px] py-3 text-center font-semibold transition cursor-pointer rounded-t-lg ${
              isAdminLogin
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Admin Login
          </button>

          <button
            onClick={() => navigate("/admin/register")}
            className={`flex-1 min-w-[120px] py-3 text-center font-semibold transition cursor-pointer rounded-t-lg ${
              isAdminRegister
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Admin Register
          </button>
        </div>

        {/* Form container */}
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
