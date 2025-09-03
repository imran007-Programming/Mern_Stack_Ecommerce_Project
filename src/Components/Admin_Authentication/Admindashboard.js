import React from "react";
import userlogo from "../../assest/585e4bcdcb11b227491c3396 (1).png";
import nike from "../../assest/air-force-1-07-mens-shoes-jBrhbr.png"
const Admindashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 container-fluide">
      <div className=" grid md:grid-cols-4 grid-cols-1 mx-2  mt-4 gap-3">
        {/* TOtal Order */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total Order's</p>
              <h4 className="text-2xl">4</h4>
              <div className="flex items-center gap-2">
                <div className="bg-[#6EA6A1] rounded-full  w-6 h-6 "></div>
                <p className="text-sm">Up from yesterday</p>
              </div>
            </div>
            <div className="bg-[#96BBAC] rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>



        </div>
        {/* Total Products */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total Order's</p>
              <h4 className="text-2xl">4</h4>
              <div className="flex items-center gap-2">
                <div className="bg-[#6EA6A1] rounded-full  w-6 h-6 "></div>
                <p className="text-sm">Up from yesterday</p>
              </div>
            </div>
            <div className="bg-[#A1B6CC] rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>



        </div>
        {/* Totals User */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
          <div className="flex  items-center">
            <div>
              <p className="text-2xl">Total User's</p>
              <h4 className="text-2xl">4</h4>
              <div className="flex items-center gap-2">
                <div className="bg-[#6EA6A1] rounded-full  w-6 h-6 "></div>
                <p className="text-sm">Up from yesterday</p>
              </div>
            </div>
            <div className="bg-[#CCB88D] rounded-lg w-16 h-16 md:ml-5 ml-auto"></div>
          </div>



        </div>
        {/* Totals return */}
        <div className="w-auto bg-[#F6F6F8] shadow-lg h-auto p-6 rounded-lg">
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



        </div>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-2 ">
        <div className="col-span-4 bg-[#F6F6F8] w-auto shadow-2xl h-auto p-6 rounded-2xl ml-2">
        <div style={{
          boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }} className=" rounded-2xl p-3">
        <p className="text-2xl mb-3 ml-3 ">Recent Sells and User</p>
          <div className="overflow-x-auto">
         
            <table className="table">
              {/* head */}
              <thead>
                <tr>

                  <th>Id</th>
                  <th>Profile</th>
                  <th>FullName</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>
                    1
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userlogo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                  </td>
                  <td><div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Action</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div></td>

                </tr>
                {/* row 2 */}
                <tr>
                  <th>
                    2
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userlogo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td>
                    Carroll Group
                    <br />
                    <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                  </td>
                  <td><div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Action</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div></td>

                </tr>
                {/* row 3 */}
                <tr>
                  <th>
                    3
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userlogo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td>
                    Rowe-Schoen
                    <br />
                    <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                  </td>
                  <td><div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Action</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div></td>

                </tr>
                {/* row 4 */}
                <tr>
                  <th>
                    4
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userlogo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td>
                    Wyman-Ledner
                    <br />
                    <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                  </td>
                  <td><div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Action</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div></td>

                </tr>
              </tbody>
              {/* foot */}


            </table>
          </div>

        </div>
        </div>
      {/* Top selling products */}
        <div className="col-span-2 bg-[#F6F6F8] w-auto shadow-2xl h-auto p-6 rounded-2xl ml-2">
          <h1 className="text-2xl ">Top selling Product</h1>
          <div className="flex flex-row items-center justify-between">
            <img className="w-20 h-20 rounded-full" src={nike} alt="" />
            <p className="text-xl ml-3">Nike Air force showes</p>
            <p className="text-xl">Price:$13</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <img className="w-20 h-20 rounded-full" src={nike} alt="" />
            <p className="text-xl ml-3">Nike Air force showes</p>
            <p className="text-xl">Price:$13</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <img className="w-20 h-20 rounded-full" src={nike} alt="" />
            <p className="text-xl ml-3">Nike Air force showes</p>
            <p className="text-xl">Price:$13</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <img className="w-20 h-20 rounded-full" src={nike} alt="" />
            <p className="text-xl ml-3">Nike Air force showes</p>
            <p className="text-xl">Price:$13</p>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Admindashboard;
