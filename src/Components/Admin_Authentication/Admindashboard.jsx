import React, { useEffect } from "react";
import userlogo from "../../assest/585e4bcdcb11b227491c3396 (1).png";
import { useDispatch, useSelector } from "react-redux";
import { adminGetalluser } from "../../redux/Slice/adminAuthslice/adminAuthslice";
import { getAllReview } from "../../redux/Slice/reviewSlice/ReviewSlice";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

const Admindashboard = () => {
  const dispatch = useDispatch();
  const { getAllUserData, getAllUserLoading } = useSelector(
    (state) => state.Admin
  );
  const { allReviewData } = useSelector((state) => state.reviews);
  const { AllProducts } = useSelector((state) => state.products);

  // Inside your component
  const [openMenu, setOpenMenu] = useState(null);

  // Extract product IDs from reviews
  const productIds = allReviewData?.map((review) => review.productid) || [];

  // All products
  const products = AllProducts.products || [];

  // Filter only products that match any of the productIds
  const mostSellingProducts = products.filter((pd) =>
    productIds.includes(pd._id)
  );

  // ✅ Prepare Bar chart data (Top 5 selling products)
  const barChartData = mostSellingProducts.slice(0, 5).map((pd) => ({
    name: pd.productName,
    sales: allReviewData.filter((r) => r.productid === pd._id).length,
  }));

  // ✅ Prepare Pie chart data (Users vs Reviews)
  const pieData = [
    { name: "Users", value: getAllUserData?.getalluser?.length || 0 },
    { name: "Reviews", value: allReviewData?.length || 0 },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  useEffect(() => {
    const data = { selectedCategory: "all" };
    dispatch(adminGetalluser());
    dispatch(getAllReview());
    dispatch(adminGetProducts(data));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-4 container-fluide px-5 bg-gray-200">
      {/* Stats Cards */}
      <div className=" grid md:grid-cols-3 grid-cols-1 mx-2  mt-4 gap-3">
        {/* Total Products */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <p className="text-2xl">Total Products</p>
          <h4 className="text-2xl">{products?.length}</h4>
        </div>
        {/* Total Users */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <p className="text-2xl">Total Users</p>
          <h4 className="text-2xl">{getAllUserData?.getalluser?.length}</h4>
        </div>
        {/* Total Reviews */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <p className="text-2xl">Total Reviews</p>
          <h4 className="text-2xl">{allReviewData?.length}</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Users vs Reviews</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-6 grid-cols-1 gap-2 ">
        {/* Recent Users Table */}
        <div className="col-span-4 bg-[#F6F6F8] w-auto shadow-2xl h-auto p-6 rounded-2xl ml-2">
          <p className="text-2xl mb-5 font-semibold">Recent Users</p>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Profile</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Full Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {getAllUserLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 border border-gray-300"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : (
                  getAllUserData?.getalluser?.slice(0, 5).map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100 relative">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          src={user.userprofile || userlogo}
                          alt={user.firstname || "User"}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user._id ? null : user._id)
                          }
                          className="p-2 rounded hover:bg-gray-200"
                        >
                          <FiMoreVertical size={18} />
                        </button>

                        {/* Dropdown */}
                        {openMenu === user._id && (
                          <div className="absolute right-4 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() =>
                                alert(`Edit user: ${user.firstname}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() =>
                                alert(`Delete user: ${user.firstname}`)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling + Charts */}
        <div className="col-span-2 bg-[#F6F6F8] shadow-2xl h-auto p-6 rounded-2xl ml-2">
          <h1 className="text-xl font-semibold mb-4">Top Selling Products</h1>
          {mostSellingProducts.slice(0, 3).map((pd) => (
            <div
              key={pd._id}
              className="flex items-center justify-between py-3"
            >
              <img
                className="w-12 h-12 rounded object-cover"
                src={pd.images[0]}
                alt={pd.productName}
              />
              <p className="text-sm">{pd.productName}</p>
              <p className="text-lg">${pd.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
