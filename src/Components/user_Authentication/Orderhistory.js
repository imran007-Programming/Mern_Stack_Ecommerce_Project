import React from 'react'
import  "./Myaccount.scss"
import logo from"../../assest/Purple-Rose-Close-Shoot.webp"
import { Button } from '@mui/material'
const Orderhistory = () => {
  return (
    <div><div className='bg-[#f6f6f8]'>
    <h1 className='font-bold text-[20px] p-3'>Your Orders</h1>
     <div className='Order-details'>
    
      <div className='order_detail '>
        <img src={logo} alt="" />
        <div className='order-des  '>
          <h1>Purpel T shirt</h1>
          <p>discount:- <span>15%</span> </p>
          <p>price:- <span>$12</span> </p>
          <p>Order-Date:- <span>12/05/2023</span> </p>
          <p className='ml-auto'>Total:- <span>$12</span></p>
        </div>
      </div>
     </div>
    
     
    </div></div>
  )
}

export default Orderhistory