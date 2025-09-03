import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";

const Orders = () => {
  return (
    <div className=''>
      <div className="overflow-x-auto ">
        <table className="table container-fluide">
          {/* head */}
          <thead>
            <tr>

              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>

              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th className="dropdown">
               <HiOutlineDotsVertical tabIndex={0}  className="cursor-pointer" size={25}/>
                  
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                    <button className='btn btn-xs btn-primary '>Processing</button>
                    <button className='btn bg-[crimson] hover:bg-[crimson] btn-xs mt-1 '>Delevered</button>
                  </ul>
           
              </th>
            </tr>




            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br />
              <span className="badge badge-ghost badge-sm">Office Assistant I</span>
            </td>
            <td>Crimson</td>
            <th className="dropdown">
               <HiOutlineDotsVertical tabIndex={0}  className="cursor-pointer" size={25}/>
                  
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                    <button className='btn btn-xs btn-primary '>Processing</button>
                    <button className='btn bg-[crimson] hover:bg-[crimson] btn-xs mt-1 '>Delevered</button>
                  </ul>
           
              </th>


          </tbody>


        </table>
      </div>
    </div>
  )
}

export default Orders