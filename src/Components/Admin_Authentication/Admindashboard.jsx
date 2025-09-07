import React, { useEffect } from "react";
import userlogo from "../../assest/585e4bcdcb11b227491c3396 (1).png";
import nike from "../../assest/air-force-1-07-mens-shoes-jBrhbr.png";
import { useDispatch, useSelector } from "react-redux";
import { adminGetalluser } from "../../redux/Slice/adminAuthslice/adminAuthslice";
import { getAllReview } from "../../redux/Slice/reviewSlice/ReviewSlice";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
const Admindashboard = () => {
  const dispatch = useDispatch();
  const { getAllUserData, getAllUserLoading } = useSelector(
    (state) => state.Admin
  );
  const { allReviewData, allReviewLoading } = useSelector(
    (state) => state.reviews
  );
  const { AllProducts, loading } = useSelector(
    (state) => state.products
  );
 
// Extract product IDs from reviews
const productIds = allReviewData?.map((review) => review.productid) || [];

// All products
const products = AllProducts.products || [];


// Filter only products that match any of the productIds
const mostSellingProducts = products.filter((pd) => productIds.includes(pd._id));




  useEffect(() => {
    const data = {
      selectedCategory: "all",
    };
    dispatch(adminGetalluser());
    dispatch(getAllReview());
    dispatch(adminGetProducts(data));
  }, []);

  
 


  return (
    <div className="grid grid-cols-1 gap-4 container-fluide">
      <div className=" grid md:grid-cols-3 grid-cols-1 mx-2  mt-4 gap-3">
        {/* TOtal Order */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total Order's</p>
              <h4 className="text-2xl">4</h4>
              <div className="flex items-center gap-2">
                <div className="bg-purple-300 rounded-full  w-6 h-6 "></div>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="bg-purple-300 rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>
        </div>
        {/* TOtal producs */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total Products</p>
              <h4 className="text-2xl">{products?.length}</h4>
              <div className="flex items-center gap-2">
                <div className="bg-amber-200 rounded-full  w-6 h-6 "></div>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="bg-amber-200 rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>
        </div>
      
        {/* Totals User */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total User's</p>
              <h4 className="text-2xl">{getAllUserData.getalluser?.length}</h4>
              <div className="flex items-center gap-2">
                <div className="bg-pink-200 rounded-full  w-6 h-6 "></div>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="bg-pink-300 rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>
        </div>
        {/* Totals return */}
        {/* <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total Return</p>
              <h4 className="text-2xl">1114</h4>
              <div className="flex items-center gap-2">
                <div className="bg-[#C7ABAB] rounded-full  w-6 h-6 "></div>
                <p className="text-sm">Up from yesterday</p>
              </div>
            </div>
            <div className="bg-[#C7ABAB] rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>
        </div> */}
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-2 ">
        <div className="col-span-4 bg-[#F6F6F8] w-auto shadow-2xl h-auto p-6 rounded-2xl ml-2">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            className="rounded-2xl p-3"
          >
            <p className="text-2xl mb-5 ml-3 font-semibold">Recent Users</p>

            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {getAllUserLoading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    getAllUserData?.getalluser?.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-100 transition-colors duration-300"
                      >
                        {/* Id */}
                        <td className="px-4 py-3 font-medium">{index + 1}</td>

                        {/* Profile */}
                        <td className="px-4 py-3">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                              <img
                                src={user.userprofile || userlogo}
                                alt={user.firstname || "User"}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Fullname + Email */}
                        <td className="px-4 py-3">
                          <p className="font-semibold">
                            {user.firstname
                              ? `${user.firstname} ${user.lastname}`
                              : "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.email || user.mobileNumber || "No email"}
                          </p>
                        </td>

                        {/* Actions Dropdown */}
                        <td className="px-4 py-3">
                          <div className="relative inline-block text-left group">
                            {/* Action Button */}
                            <button className="btn btn-sm px-5 bg-black text-white hover:bg-gray-800 rounded">
                              Action
                            </button>

                            {/* Dropdown menu */}
                            <div
                              className="absolute right-0 mt-2 w-32 origin-top-right 
                 bg-white rounded-md shadow-lg opacity-0 invisible 
                 group-hover:opacity-100 group-hover:visible 
                 transition-all duration-300 z-10"
                            >
                              <ul className="py-1 text-sm text-gray-700">
                                <li>
                                  <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a className="block px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer">
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top selling products */}
        <div className="col-span-2 bg-[#F6F6F8] w-auto shadow-2xl h-auto p-6 rounded-2xl ml-2">
          <h1 className="text-2xl ">Top selling Product</h1>
           {
            mostSellingProducts && mostSellingProducts.map((pd)=>(
              <div className="flex flex-row items-center justify-betweens space-x-2.5 py-5 ">
            <img className="w-15 h-15 rounded object-fill" src={pd.images[0]} alt="" />
            <p className="text-sm ml-3">{pd.productName}</p>
            <p className="text-xl">${pd.price}</p>
          </div>
            ))
           }
          
          
         
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
